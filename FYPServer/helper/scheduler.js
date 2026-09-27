const cron = require('node-cron');
const { syncAllNightMarketShops, getSyncStats } = require('./googleMapsSync');

let scheduledTask = null;

/**
 * 啟動定期排程同步工作
 * 預設：每天凌晨 04:00 自動執行 Google Maps 店家資訊同步
 * 可透過環境變數 SYNC_CRON_SCHEDULE 自訂，如：'0 4 * * *'
 */
function initScheduledSync() {
    const cronExpression = process.env.SYNC_CRON_SCHEDULE || '0 4 * * *';

    if (scheduledTask) {
        scheduledTask.stop();
    }

    console.log(`[Scheduler] Initializing periodic Google Maps sync with schedule: "${cronExpression}"`);

    scheduledTask = cron.schedule(cronExpression, async () => {
        console.log(`[Scheduler] Periodic trigger fired at ${new Date().toISOString()}`);
        try {
            await syncAllNightMarketShops({ triggeredBy: 'cron' });
        } catch (err) {
            console.error('[Scheduler] Periodic sync encountered an error:', err.message);
        }
    });

    // 伺服器啟動時，若資料庫中尚無店家或需初始化，延遲 3 秒執行一次初始同步
    setTimeout(async () => {
        try {
            console.log('[Scheduler] Running initial startup check & sync...');
            await syncAllNightMarketShops({ triggeredBy: 'startup' });
        } catch (err) {
            console.warn('[Scheduler] Startup sync deferred or failed:', err.message);
        }
    }, 3000);

    return scheduledTask;
}

function stopScheduledSync() {
    if (scheduledTask) {
        scheduledTask.stop();
        scheduledTask = null;
        console.log('[Scheduler] Periodic sync stopped.');
    }
}

async function triggerManualSync(options = {}) {
    console.log('[Scheduler] Manual sync requested via API/Admin.');
    return await syncAllNightMarketShops({ ...options, triggeredBy: 'manual' });
}

module.exports = {
    initScheduledSync,
    stopScheduledSync,
    triggerManualSync,
    getSyncStats
};
