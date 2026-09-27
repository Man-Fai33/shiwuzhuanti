const express = require('express');
const router = express.Router();
const FeedBack = require('../models/feedback');
const { commentRateLimiter, cleanNoSql } = require('../helper/securityShield');

/**
 * POST /feedback
 * 提交用戶意見反饋 (防洗版限速與內容清洗)
 */
router.post('/', commentRateLimiter, async (req, res) => {
    try {
        let data = req.body.feedback;
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ status: "fail", message: "無效的意見反饋內容" });
        }

        data = cleanNoSql(data);
        data.date = new Date();

        if (data.context && typeof data.context === 'string') {
            data.context = data.context.trim().slice(0, 2000);
        }

        const feedback = new FeedBack(data);
        feedback.id = feedback._id;
        const savedFeedback = await feedback.save();

        res.json({
            status: "success",
            feedback: savedFeedback
        });
    } catch (err) {
        console.error('[Security] Feedback save error:', err.message);
        res.status(500).json({
            status: "fail",
            message: "意見反饋提交失敗，請稍候再試"
        });
    }
});

/**
 * GET /feedback
 * 取得用戶反饋列表
 */
router.get('/', async (req, res) => {
    try {
        const feedbacks = await FeedBack.find().lean().exec();
        res.json({ status: "success", feedback: feedbacks });
    } catch (err) {
        console.error('[Security] Feedback load error:', err.message);
        res.status(500).json({ status: "fail", message: "讀取反饋失敗" });
    }
});

module.exports = router;