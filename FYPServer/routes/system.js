const express = require('express');
const router = express.Router();
const os = require('os');
const fs = require('fs');
const mongoose = require('mongoose');

// Models
const Market = require('../models/market');
const Shop = require('../models/shop');
const Food = require('../models/food');
const User = require('../models/user');
const Bulletin = require('../models/bulletin');
const Feedback = require('../models/feedback');
const DailyAnalytics = require('../models/analytics');

// Helpers
const scheduler = require('../helper/scheduler');
const loggerBuffer = require('../helper/loggerBuffer');
const { syncAllNightMarketShops } = require('../helper/googleMapsSync');

/**
 * 格式化秒數為 D日 H小時 M分 S秒
 */
function formatUptime(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const parts = [];
    if (d > 0) parts.push(`${d} 天`);
    if (h > 0) parts.push(`${h} 小時`);
    if (m > 0) parts.push(`${m} 分`);
    parts.push(`${s} 秒`);
    return parts.join(' ');
}

/**
 * GET /system/status
 * 取得伺服器、Docker 容器環境與 MongoDB 狀態指標
 */
router.get('/status', async (req, res) => {
    try {
        const mem = process.memoryUsage();
        const sysTotalMem = os.totalmem();
        const sysFreeMem = os.freemem();

        const dbStateMap = {
            0: 'Disconnected',
            1: 'Connected',
            2: 'Connecting',
            3: 'Disconnecting'
        };

        const isDocker = fs.existsSync('/.dockerenv') || process.env.IS_DOCKER === 'true';

        // 統計各資料庫集合筆數
        const [
            marketCount,
            shopCount,
            foodCount,
            userCount,
            bulletinCount,
            feedbackCount,
            analyticsCount
        ] = await Promise.all([
            Market.countDocuments().catch(() => 0),
            Shop.countDocuments().catch(() => 0),
            Food.countDocuments().catch(() => 0),
            User.countDocuments().catch(() => 0),
            Bulletin.countDocuments().catch(() => 0),
            Feedback.countDocuments().catch(() => 0),
            DailyAnalytics.countDocuments().catch(() => 0)
        ]);

        res.json({
            status: 'success',
            data: {
                server: {
                    platform: os.platform(),
                    arch: os.arch(),
                    nodeVersion: process.version,
                    uptimeSeconds: Math.floor(process.uptime()),
                    uptimeFormatted: formatUptime(process.uptime()),
                    isDocker,
                    environment: process.env.NODE_ENV || 'development',
                    port: process.env.PORT || 7788
                },
                memory: {
                    heapUsedMb: (mem.heapUsed / 1024 / 1024).toFixed(1),
                    heapTotalMb: (mem.heapTotal / 1024 / 1024).toFixed(1),
                    rssMb: (mem.rss / 1024 / 1024).toFixed(1),
                    sysTotalMemMb: (sysTotalMem / 1024 / 1024).toFixed(0),
                    sysFreeMemMb: (sysFreeMem / 1024 / 1024).toFixed(0),
                    memUsagePercent: (((sysTotalMem - sysFreeMem) / sysTotalMem) * 100).toFixed(1)
                },
                database: {
                    connection: dbStateMap[mongoose.connection.readyState] || 'Unknown',
                    dbName: mongoose.connection.name || 'test',
                    collections: {
                        markets: marketCount,
                        shops: shopCount,
                        foods: foodCount,
                        users: userCount,
                        bulletins: bulletinCount,
                        feedbacks: feedbackCount,
                        dailyAnalytics: analyticsCount
                    }
                }
            }
        });
    } catch (err) {
        console.error('[System] Status error:', err);
        res.status(500).json({ status: 'fail', message: err.message });
    }
});

/**
 * GET /system/schedulers
 * 取得當前所有後台動態排程設定與狀態
 */
router.get('/schedulers', (req, res) => {
    try {
        const jobs = scheduler.listAllJobs();
        res.json({
            status: 'success',
            data: {
                totalJobs: jobs.length,
                jobs
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
});

/**
 * POST /system/schedulers/:jobId/toggle
 * 開啟或暫停指定排程
 */
router.post('/schedulers/:jobId/toggle', (req, res) => {
    try {
        const { jobId } = req.params;
        const job = scheduler.getJobSummary(jobId);
        if (!job) {
            return res.status(404).json({ status: 'fail', message: `找不到排程工作 ${jobId}` });
        }

        const newStatus = !job.enabled;
        const updated = scheduler.updateJobConfig(jobId, { enabled: newStatus });
        res.json({
            status: 'success',
            message: `排程「${updated.name}」已${newStatus ? '啟動' : '暫停'}`,
            data: updated
        });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
});

/**
 * POST /system/schedulers/:jobId/update
 * 更新排程的 Cron 表達式或頻率
 */
router.post('/schedulers/:jobId/update', (req, res) => {
    try {
        const { jobId } = req.params;
        const { cronExpression, enabled } = req.body;

        const updated = scheduler.updateJobConfig(jobId, { cronExpression, enabled });
        res.json({
            status: 'success',
            message: `排程「${updated.name}」設定已更新`,
            data: updated
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

/**
 * POST /system/schedulers/:jobId/trigger
 * 立即手動執行指定排程
 */
router.post('/schedulers/:jobId/trigger', async (req, res) => {
    try {
        const { jobId } = req.params;
        const execution = await scheduler.executeJob(jobId, 'web_admin');
        res.json({
            status: 'success',
            message: `排程 ${jobId} 手動執行完畢`,
            data: execution
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: `排程執行失敗: ${err.message}`,
            error: err.message
        });
    }
});

/**
 * GET /system/logs
 * 取得最近後端容器與排程日誌
 */
router.get('/logs', (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 100;
        const logs = loggerBuffer.getLogs(limit);
        res.json({
            status: 'success',
            total: logs.length,
            logs
        });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
});

/**
 * POST /system/logs/clear
 * 清除暫存日誌
 */
router.post('/logs/clear', (req, res) => {
    try {
        loggerBuffer.clearLogs();
        res.json({ status: 'success', message: '日誌已清空' });
    } catch (err) {
        res.status(500).json({ status: 'fail', message: err.message });
    }
});

/**
 * GET /system/backup/export
 * 全量匯出所有資料庫為 JSON 格式 (提供網站一鍵下載備份)
 */
router.get('/backup/export', async (req, res) => {
    try {
        console.log('[System:Backup] 正在產生全資料庫備份 JSON 快照...');
        const [markets, shops, foods, users, bulletins, feedbacks, analytics] = await Promise.all([
            Market.find().lean(),
            Shop.find().lean(),
            Food.find().lean(),
            User.find({}, '-password').lean(), // 安全起見，匯出時遮蔽使用者密碼
            Bulletin.find().lean(),
            Feedback.find().lean(),
            DailyAnalytics.find().lean()
        ]);

        const backupData = {
            exportDate: new Date().toISOString(),
            version: '1.0.0',
            system: {
                platform: os.platform(),
                node: process.version
            },
            counts: {
                markets: markets.length,
                shops: shops.length,
                foods: foods.length,
                users: users.length,
                bulletins: bulletins.length,
                feedbacks: feedbacks.length,
                analytics: analytics.length
            },
            data: {
                markets,
                shops,
                foods,
                users,
                bulletins,
                feedbacks,
                analytics
            }
        };

        const filename = `nightmarket_backup_${new Date().toISOString().slice(0, 10)}.json`;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(JSON.stringify(backupData, null, 2));
    } catch (err) {
        console.error('[System:Backup] 匯出失敗:', err);
        res.status(500).json({ status: 'fail', message: '匯出備份失敗: ' + err.message });
    }
});

/**
 * POST /system/backup/import
 * 從 JSON 檔案還原或匯入資料庫
 */
router.post('/backup/import', async (req, res) => {
    try {
        const payload = req.body;
        if (!payload || !payload.data) {
            return res.status(400).json({ status: 'fail', message: '無效的備份 JSON 結構 (缺少 data 欄位)' });
        }

        const { markets, shops, foods, bulletins, feedbacks } = payload.data;
        const stats = { importedMarkets: 0, importedShops: 0, importedFoods: 0, importedBulletins: 0, importedFeedbacks: 0 };

        if (Array.isArray(markets) && markets.length > 0) {
            for (const m of markets) {
                const id = m._id;
                delete m._id;
                await Market.findOneAndUpdate({ name: m.name }, m, { upsert: true, new: true });
                stats.importedMarkets += 1;
            }
        }

        if (Array.isArray(shops) && shops.length > 0) {
            for (const s of shops) {
                delete s._id;
                await Shop.findOneAndUpdate({ shopName: s.shopName }, s, { upsert: true, new: true });
                stats.importedShops += 1;
            }
        }

        if (Array.isArray(foods) && foods.length > 0) {
            for (const f of foods) {
                delete f._id;
                await Food.findOneAndUpdate({ foodName: f.foodName }, f, { upsert: true, new: true });
                stats.importedFoods += 1;
            }
        }

        if (Array.isArray(bulletins) && bulletins.length > 0) {
            for (const b of bulletins) {
                delete b._id;
                await Bulletin.findOneAndUpdate({ title: b.title }, b, { upsert: true, new: true });
                stats.importedBulletins += 1;
            }
        }

        if (Array.isArray(feedbacks) && feedbacks.length > 0) {
            for (const fb of feedbacks) {
                delete fb._id;
                await Feedback.create(fb).catch(() => {});
                stats.importedFeedbacks += 1;
            }
        }

        console.log('[System:Restore] 還原完成:', stats);
        res.json({
            status: 'success',
            message: '資料庫還原/匯入成功！',
            stats
        });
    } catch (err) {
        console.error('[System:Restore] 還原失敗:', err);
        res.status(500).json({ status: 'fail', message: '還原失敗: ' + err.message });
    }
});

/**
 * POST /system/database/seed
 * 一鍵初始化全台夜市標準數據庫（適合 Docker 容器首次啟動時在網頁上一鍵建立資料）
 */
router.post('/database/seed', async (req, res) => {
    try {
        console.log('[System:Seed] 管理者觸發全台夜市標準資料初始化...');

        // 1. 初始化標準 8 大夜市聚落
        const defaultMarkets = [
            {
                name: '士林觀光夜市',
                nameen: 'Shilin Night Market',
                marketLocation: 'tp',
                positionGuidelines: '捷運淡水信義線「劍潭站」1號出口步行約 3 分鐘即達',
                brief: '全台北最具國際知名度的指標型觀光夜市，歷史逾百年，集結各式台式經典小吃。',
                introduction: '士林夜市為台北市最具規模的夜市之一，以陽明戲院與大東路、基河路為中心展開，無論是藥燉排骨、豪大雞排或大腸包小腸，都是海內外旅客的必訪勝地。',
                rating: 4.8,
                lat: 25.088,
                lng: 121.524,
                marketIcon: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800'
            },
            {
                name: '逢甲夜市',
                nameen: 'Fengjia Night Market',
                marketLocation: 'tz',
                positionGuidelines: '台中火車站搭乘 25、35、45 路公車至逢甲大學站',
                brief: '全台創新小吃發源地，鄰近逢甲大學，各類潮流平價美食與創意料理層出不窮。',
                introduction: '逢甲夜市素有「台灣創意美食搖籃」之美稱，許多風靡全台的夜市小吃均源於此處，商圈腹地廣大，逛街購物與美食探店兼具。',
                rating: 4.85,
                lat: 24.178,
                lng: 120.646,
                marketIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800'
            },
            {
                name: '花園夜市',
                nameen: 'Garden Night Market',
                marketLocation: 'tn',
                positionGuidelines: '台南市北區海安路三段與和緯路口，每週四、六、日營業',
                brief: '台南規模最大也是最具代表性的流動型夜市，高聳壯觀的旗海為其招牌特色。',
                introduction: '花園夜市擁有數百個攤位，攤位上飄揚的各色識別旗幟是其最大特色。牛肉湯、現烤生蠔、麻辣鴨血等經典台南味一應俱全。',
                rating: 4.8,
                lat: 23.011,
                lng: 120.200,
                marketIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
            },
            {
                name: '饒河街觀光夜市',
                nameen: 'Raohe Street Night Market',
                marketLocation: 'tp',
                positionGuidelines: '捷運松山新店線「松山站」1號或2號出口旁，鄰近松山慈祐宮',
                brief: '台北市最早的觀光夜市之一，牌樓雄偉壯麗，米其林必比登胡椒餅聞名遐邇。',
                introduction: '全長約600公尺，街道兩側攤販林立，古色古香的慈祐宮在入口處守護，胡椒餅、藥燉排骨、滷肉飯均享有極高聲譽。',
                rating: 4.75,
                lat: 25.050,
                lng: 121.577,
                marketIcon: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800'
            },
            {
                name: '羅東夜市',
                nameen: 'Luodong Night Market',
                marketLocation: 'yl',
                positionGuidelines: '羅東火車站步行約 10 分鐘，羅東中山公園周圍',
                brief: '宜蘭最熱鬧的美食核心聚落，當歸羊肉湯、三星蔥多餅與卜肉老店薈萃。',
                introduction: '羅東夜市圍繞中山公園形成口字形商圈，在地農特產如三星蔥、鴨賞融入小吃，每逢週末人潮摩肩擦踵。',
                rating: 4.7,
                lat: 24.676,
                lng: 121.767,
                marketIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800'
            }
        ];

        let createdMarkets = 0;
        for (const mData of defaultMarkets) {
            const exists = await Market.findOne({ name: mData.name });
            if (!exists) {
                await Market.create(mData);
                createdMarkets += 1;
            }
        }

        // 2. 觸發 Google Maps 排程同步名店與美食
        const syncResult = await syncAllNightMarketShops({ triggeredBy: 'admin_seed' });

        // 3. 確保官方公告
        const bulletinCount = await Bulletin.countDocuments();
        if (bulletinCount === 0) {
            await Bulletin.create([
                {
                    owner: '夜市全端管理處',
                    title: '🏮 歡迎使用全台夜市美食數位導覽系統',
                    context: '系統已成功初始化，包含各大夜市真實評分、精選名店與必吃美食指南。祝您美食探索愉快！',
                    date: new Date(),
                    imgUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
                },
                {
                    owner: '管理員公告',
                    title: '🚀 容器自動排程已啟用：每日定期更新 Google Maps 評價',
                    context: '系統已配置定時任務，將每日自動比對最新星級與饕客評論，確保即時推薦最真實的夜市排隊好滋味。',
                    date: new Date(),
                    imgUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800'
                }
            ]);
        }

        const [finalMarkets, finalShops, finalFoods] = await Promise.all([
            Market.countDocuments(),
            Shop.countDocuments(),
            Food.countDocuments()
        ]);

        res.json({
            status: 'success',
            message: '🎉 數據庫初始化完成！已匯入全台代表夜市、名店、美食與初始公告。',
            summary: {
                totalMarkets: finalMarkets,
                totalShops: finalShops,
                totalFoods: finalFoods,
                syncResult
            }
        });
    } catch (err) {
        console.error('[System:Seed] 初始化錯誤:', err);
        res.status(500).json({ status: 'fail', message: '初始化失敗: ' + err.message });
    }
});

module.exports = router;
