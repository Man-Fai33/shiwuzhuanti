const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Food = require('../models/food')
const Shop = require('../models/shop')
router.post('/', async (req, res) => {
    let requesterid = req.body.requesterid
    let target = req.body.shop
    // check if the email is duplicated
    let id = target.shopManager
    let error = false
    let resp = {}
    let foods = target.food
    let shop = null

    try {
        shop = await Shop.findOne({ shopManager: id }).exec()
        if (shop != null) {
            resp.message = "Shop manager already registered"
            error = true
        }
    }
    catch (err) {
        // if the shop cannot be found, do nothing
    }

    if (error) {
        resp.status = "fail"
        res.json(resp)
        return
    }

    if (Array.isArray(foods)) {
        for (const element of foods) {
            try {
                await new Food(element).save();
            } catch (foodErr) {
                console.error('Error saving nested food:', foodErr.message);
            }
        }
    }

    shop = new Shop(target)
    try {
        resp.shop = await shop.save()
    }
    catch (err) {
        error = true
        resp.message = "Shop cannot be added"
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
router.get('/', (req, res) => {

    Shop.find().exec().then(result => {
        res.json({ status: "success", shop: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
const { searchShopOnline } = require('../helper/webScraperEngine');

/**
 * GET /shops/search-web
 * 網上智能檢索店家資料（支援店家註冊時一鍵從網路撈取資料自動填表）
 */
router.get('/search-web', (req, res) => {
    try {
        const query = req.query.query || req.query.name || '';
        const market = req.query.market || '士林觀光夜市';
        const data = searchShopOnline(query, market);
        res.json({
            status: 'success',
            data: data
        });
    } catch (err) {
        console.error('[Shop:SearchWeb] Error:', err);
        res.status(500).json({ status: 'fail', message: '聯網檢索失敗: ' + err.message });
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id
    Shop.findById(id).exec().then(result => {
        res.json({ status: "success", shop: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
router.put('/:id', async (req, res) => {

    let id = req.params.id

    let target = req.body.shop

    Shop.findByIdAndUpdate(target._id || id, target, { new: true }).exec().then(updatedShop => {
        res.json({ status: "success", shop: updatedShop })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Shop.findByIdAndDelete(id).exec().then(result => {
        res.json({ status: "success", shop: result });
    }).catch(err => {
        res.json({ status: "fail", message: err });
    });
});

module.exports = router;