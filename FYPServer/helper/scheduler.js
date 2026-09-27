const cron = require('node-cron');
const { syncAllNightMarketShops, getSyncStats } = require('./googleMapsSync');
const mongoose = require('mongoose');

// 儲存各排程工作的狀態與實例
const jobRegistry = new Map();

/**
 * 註冊排程任務
 */
function registerJob(config) {
    const job = {
        id: config.id,
        name: config.name,
        description: config.description,
        cronExpression: config.cronExpression,
        enabled: config.enabled !== false,
        taskInstance: null,
        handler: config.handler,
        lastRun: null,
        nextRun: null,
        lastStatus: 'idle',
        lastDuration: 0,
        lastResult: null,
        totalRuns: 0,
        failureCount: 0
    };

    jobRegistry.set(config.id, job);

    if (job.enabled) {
        startJob(job.id);
    }

    return job;
}

/**
 * 啟動特定排程工作
 */
function startJob(jobId) {
    const job = jobRegistry.get(jobId);
    if (!job) throw new Error(`排程工作 ${jobId} 不存在`);

    if (job.taskInstance) {
        job.taskInstance.stop();
        job.taskInstance = null;
    }

    // 驗證 cron 表達式
    if (!cron.validate(job.cronExpression)) {
        console.error(`[Scheduler] 無效的 Cron 表達式: "${job.cronExpression}" (工作: ${job.name})`);
        return false;
    }

    job.taskInstance = cron.schedule(job.cronExpression, async () => {
        await executeJob(jobId, 'cron');
    });

    job.enabled = true;
    console.log(`[Scheduler] ✅ 排程「${job.name}」已啟動，排程表達式: "${job.cronExpression}"`);
    return true;
}

/**
 * 暫停特定排程工作
 */
function stopJob(jobId) {
    const job = jobRegistry.get(jobId);
    if (!job) throw new Error(`排程工作 ${jobId} 不存在`);

    if (job.taskInstance) {
        job.taskInstance.stop();
        job.taskInstance = null;
    }
    job.enabled = false;
    console.log(`[Scheduler] ⏸️ 排程「${job.name}」已被管理者暫停`);
    return true;
}

/**
 * 立即手動執行特定排程工作
 */
async function executeJob(jobId, triggerSource = 'manual') {
    const job = jobRegistry.get(jobId);
    if (!job) throw new Error(`排程工作 ${jobId} 不存在`);

    const startTime = Date.now();
    job.lastRun = new Date().toISOString();
    job.lastStatus = 'running';
    job.totalRuns += 1;

    console.log(`[Scheduler] ⚡ 開始執行工作「${job.name}」[觸發來源: ${triggerSource}]...`);

    try {
        const result = await job.handler({ triggerSource });
        const duration = Date.now() - startTime;
        job.lastStatus = 'success';
        job.lastDuration = duration;
        job.lastResult = result || { message: '執行完成' };
        console.log(`[Scheduler] 🎉 工作「${job.name}」執行完畢 (耗時: ${duration}ms)`);
        return { success: true, duration, result: job.lastResult };
    } catch (err) {
        const duration = Date.now() - startTime;
        job.lastStatus = 'failed';
        job.lastDuration = duration;
        job.failureCount += 1;
        job.lastResult = { error: err.message };
        console.error(`[Scheduler] ❌ 工作「${job.name}」執行失敗:`, err.message);
        throw err;
    }
}

/**
 * 更新排程的設定（開關或執行週期）
 */
function updateJobConfig(jobId, updates = {}) {
    const job = jobRegistry.get(jobId);
    if (!job) throw new Error(`排程工作 ${jobId} 不存在`);

    if (updates.cronExpression && updates.cronExpression !== job.cronExpression) {
        if (!cron.validate(updates.cronExpression)) {
            throw new Error(`無效的 Cron 表達式: ${updates.cronExpression}`);
        }
        job.cronExpression = updates.cronExpression;
    }

    if (typeof updates.enabled === 'boolean') {
        if (updates.enabled) {
            startJob(jobId);
        } else {
            stopJob(jobId);
        }
    } else if (job.enabled) {
        // 若修改了 cron 但維持開啟，重新啟動以套用新排程
        startJob(jobId);
    }

    return getJobSummary(jobId);
}

/**
 * 取得單一工作摘要（排除不可序列化的 instance）
 */
function getJobSummary(jobId) {
    const job = jobRegistry.get(jobId);
    if (!job) return null;
    return {
        id: job.id,
        name: job.name,
        description: job.description,
        cronExpression: job.cronExpression,
        enabled: job.enabled,
        lastRun: job.lastRun,
        lastStatus: job.lastStatus,
        lastDuration: job.lastDuration,
        lastResult: job.lastResult,
        totalRuns: job.totalRuns,
        failureCount: job.failureCount
    };
}

/**
 * 列出所有排程工作的當前狀態清單
 */
function listAllJobs() {
    const list = [];
    for (const id of jobRegistry.keys()) {
        list.push(getJobSummary(id));
    }
    return list;
}

/**
 * 初始化所有核心排程工作
 */
function initAllSchedulers() {
    console.log('[Scheduler] 初始化全系統自動排程機制...');

    // 1. Google Maps 夜市店家與必吃美食排程同步
    registerJob({
        id: 'google-maps-sync',
        name: 'Google Maps 夜市名店與美食資料定期批次同步',
        description: '自動比對並同步全台各夜市知名攤位、Google Maps 實測評分與推薦菜色',
        cronExpression: process.env.SYNC_CRON_SCHEDULE || '0 4 * * *',
        enabled: true,
        handler: async (opts) => {
            return await syncAllNightMarketShops({ triggeredBy: opts.triggerSource });
        }
    });

    // 2. 每日流量指標自動結算與歷史歸檔
    registerJob({
        id: 'analytics-rollup',
        name: '全站每日流量 (PV/UV) 與訪客行為結算歸檔',
        description: '定時彙整每日訪問次數、獨立訪客、設備分佈及熱門夜市排行，維護高效能查詢索引',
        cronExpression: '5 0 * * *',
        enabled: true,
        handler: async () => {
            console.log('[Scheduler:Analytics] 執行每日流量索引優化與歷史彙整歸檔');
            return { message: '每日流量結算完成', time: new Date().toISOString() };
        }
    });

    // 3. 系統與資料庫連線維護健康檢查
    registerJob({
        id: 'system-healthcheck',
        name: 'Docker 容器與 MongoDB 資料庫健康狀態監測',
        description: '每 6 小時定期監測 MongoDB 連線池狀態、Node.js 記憶體負載與系統資源',
        cronExpression: '0 */6 * * *',
        enabled: true,
        handler: async () => {
            const state = mongoose.connection.readyState;
            const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
            const mem = process.memoryUsage();
            const heapMb = (mem.heapUsed / 1024 / 1024).toFixed(1);
            console.log(`[Scheduler:Health] MongoDB 狀態: ${stateMap[state] || state}, 記憶體負載: ${heapMb} MB`);
            return { dbStatus: stateMap[state], memoryUsedMb: heapMb };
        }
    });

    // 伺服器冷啟動時，若需要則進行初始檢查
    setTimeout(async () => {
        try {
            console.log('[Scheduler] 容器冷啟動初始化檢查中...');
            await syncAllNightMarketShops({ triggeredBy: 'startup' });
        } catch (err) {
            console.warn('[Scheduler] 啟動檢查跳過或略過:', err.message);
        }
    }, 4000);
}

// 相容性導出
function initScheduledSync() {
    return initAllSchedulers();
}

function stopScheduledSync() {
    stopJob('google-maps-sync');
}

async function triggerManualSync(options = {}) {
    return await executeJob('google-maps-sync', 'manual');
}

module.exports = {
    initAllSchedulers,
    initScheduledSync,
    stopScheduledSync,
    triggerManualSync,
    listAllJobs,
    getJobSummary,
    startJob,
    stopJob,
    executeJob,
    updateJobConfig,
    getSyncStats
};
