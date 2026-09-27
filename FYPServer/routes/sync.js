const express = require('express');
const router = express.Router();
const { triggerManualSync, getSyncStats } = require('../helper/scheduler');
const { GOOGLE_MAPS_NIGHT_MARKET_DATA } = require('../helper/googleMapsSync');

/**
 * GET /api/sync/status
 * 查詢定期排程與當前同步狀態
 */
router.get('/status', (req, res) => {
    const stats = getSyncStats();
    res.json({
        status: 'success',
        data: {
            ...stats,
            schedule: process.env.SYNC_CRON_SCHEDULE || '0 4 * * *',
            scheduleDescription: '每天凌晨 04:00 自動定期同步 (Daily at 04:00 AM)'
        }
    });
});

/**
 * POST /api/sync/trigger
 * 手動觸發一次 Google Maps 店家與美食資料同步
 */
router.post('/trigger', async (req, res) => {
    try {
        const result = await triggerManualSync(req.body || {});
        res.json({
            status: 'success',
            message: 'Google Maps 店家與美食資料批次同步完成！',
            result
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: '同步過程發生錯誤',
            error: err.message
        });
    }
});

/**
 * GET /api/sync/preview
 * 預覽各大夜市的 Google Maps 名店與美食數據
 */
router.get('/preview', (req, res) => {
    res.json({
        status: 'success',
        totalMarkets: GOOGLE_MAPS_NIGHT_MARKET_DATA.length,
        markets: GOOGLE_MAPS_NIGHT_MARKET_DATA
    });
});

module.exports = router;
