const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { commentRateLimiter, cleanNoSql } = require('../helper/securityShield');

/**
 * POST /comment
 * 發表夜市/美食即時留言評論 (防洗版限速與內容清洗)
 */
router.post('/', commentRateLimiter, async (req, res) => {
    try {
        let target = req.body.comment;
        if (!target || typeof target !== 'object') {
            return res.status(400).json({ status: "fail", message: "無效的評論資料" });
        }

        target = cleanNoSql(target);
        
        // 確保留言內容不為空，且不超過 1000 字
        if (target.text && typeof target.text === 'string') {
            target.text = target.text.trim().slice(0, 1000);
        }

        const comment = new Comment(target);
        const savedComment = await comment.save();

        res.json({
            status: "success",
            comment: savedComment
        });
    } catch (err) {
        console.error('[Security] Comment save error:', err.message);
        res.status(500).json({
            status: "fail",
            message: "無法儲存評論，請稍候再試"
        });
    }
});

/**
 * GET /comment
 * 取得公開評論列表
 */
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().lean().exec();
        res.json({ status: "success", comment: comments });
    } catch (err) {
        console.error('[Security] Comment load error:', err.message);
        res.status(500).json({ status: "fail", message: "讀取評論失敗" });
    }
});

module.exports = router;