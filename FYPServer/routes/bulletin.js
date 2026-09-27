const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Bulletin = require('../models/bulletin');
const { cleanNoSql } = require('../helper/securityShield');

/**
 * POST /bulletin
 * 發布系統或夜市公告
 */
router.post('/', async (req, res) => {
    try {
        let data = req.body.bulletin;
        if (!data || typeof data !== 'object') {
            return res.status(400).json({ status: "fail", message: "無效的公告資料" });
        }

        data = cleanNoSql(data);
        data.date = new Date();

        const bulletin = new Bulletin(data);
        const savedBulletin = await bulletin.save();

        res.json({
            status: "success",
            bulletin: savedBulletin
        });
    } catch (err) {
        console.error('[Security] Bulletin save error:', err.message);
        res.status(500).json({ status: "fail", message: "發布公告失敗" });
    }
});

/**
 * GET /bulletin
 * 取得最新公告列表
 */
router.get('/', async (req, res) => {
    try {
        const bulletins = await Bulletin.find().sort({ date: -1 }).lean().exec();
        res.json({ status: "success", bulletin: bulletins });
    } catch (err) {
        console.error('[Security] Bulletin load error:', err.message);
        res.status(500).json({ status: "fail", message: "載入公告失敗" });
    }
});

/**
 * DELETE /bulletin/:id
 * 刪除指定公告
 */
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "fail", message: "無效的公告 ID" });
        }

        const result = await Bulletin.findByIdAndDelete(id).lean().exec();
        if (!result) {
            return res.status(404).json({ status: "fail", message: "找不到欲刪除的公告" });
        }

        res.json({ status: "success", bulletin: result });
    } catch (err) {
        console.error('[Security] Bulletin delete error:', err.message);
        res.status(500).json({ status: "fail", message: "刪除公告失敗" });
    }
});

module.exports = router;