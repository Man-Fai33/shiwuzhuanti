const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Market = require('../models/market');



router.post('/', async (req, res) => {

    let data = req.body.market

    let marketName = data.name
    let error = false
    let resp = {}
    let market = null
    try {
        market = await Market.findOne({ name: marketName }).exec()
        if (market != null) {
            resp.message = "Market already existed"
            error = true
        }
    } catch (error) {

        if (error) {
            resp.status = "fail"
            res.json(resp)
            return
        }
    }

    market = new Market(data)
    try {

        resp.market = await market.save()
    }
    catch (err) {
        error = true
        resp.message = "Market cannot be added"
        resp.err = err
        console.log(err);
    }

    if (error) {
        resp.status = "fail"
        res.json(resp)
        return
    }

    resp.status = "success"
    res.json(resp)
})

const { ALL_TAIWAN_NIGHT_MARKETS } = require('../helper/taiwanNightMarketsData');

/**
 * POST /market/seed-all
 * 批次補全全台灣29大觀光夜市
 */
router.post('/seed-all', async (req, res) => {
    try {
        let added = 0;
        let updated = 0;
        for (const mData of ALL_TAIWAN_NIGHT_MARKETS) {
            const existing = await Market.findOne({ name: mData.name });
            if (existing) {
                Object.assign(existing, mData);
                await existing.save();
                updated++;
            } else {
                await new Market(mData).save();
                added++;
            }
        }
        const total = await Market.countDocuments();
        res.json({
            status: "success",
            message: `🎉 全台灣夜市資料庫更新完成！共新增 ${added} 座、更新 ${updated} 座，全台共計 ${total} 座觀光夜市。`,
            total,
            added,
            updated
        });
    } catch (e) {
        res.status(500).json({ status: "fail", message: e.message });
    }
});

router.get('/', (req, res) => {

    Market.find().exec().then(result => {
        res.json({ status: "success", market: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
router.get('/:id', (req, res) => {
    let targetid = req.params.id
    Market.findById(targetid).exec().then(result => {
        res.json({ status: "success", market: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
router.post('/:id', (req, res) => {
    let targetid = req.params.id
    Market.findById(targetid).exec().then(result => {

        res.json({ status: "success", market: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})





router.put('/:id', (req, res) => {
    let targetid = req.params.id;
    let data = req.body.market || req.body;
    Market.findByIdAndUpdate(targetid, data, { new: true }).exec().then(result => {
        res.json({ status: "success", market: result });
    }).catch(err => {
        res.json({ status: "fail", message: err });
    });
});

router.delete('/:id', (req, res) => {
    let targetid = req.params.id;
    Market.findByIdAndDelete(targetid).exec().then(result => {
        res.json({ status: "success", market: result });
    }).catch(err => {
        res.json({ status: "fail", message: err });
    });
});

module.exports = router;

