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
    });
});

const { searchShopOnline, searchShopImagesOnline, getBestShopImage } = require('../helper/webScraperEngine');

/**
 * GET /shops/search-images
 * 網上搜尋特定攤位之高清店面照片候選清單
 */
router.get('/search-images', async (req, res) => {
    try {
        const query = req.query.query || req.query.name || '';
        const type = req.query.type || '';
        const images = await searchShopImagesOnline(query, type);
        res.json({
            status: 'success',
            images
        });
    } catch (err) {
        console.error('[Shop:SearchImages] Error:', err);
        res.status(500).json({ status: 'fail', message: '搜尋攤位照片失敗: ' + err.message });
    }
});

/**
 * POST /shops/enrich-all-images
 * 批次補全全站所有缺少招牌照片的攤位 (後台或自動化維運使用)
 */
router.post('/enrich-all-images', async (req, res) => {
    try {
        const shops = await Shop.find();
        let updatedCount = 0;
        for (const s of shops) {
            if (!s.shopIcon || s.shopIcon.trim() === '') {
                s.shopIcon = getBestShopImage(s.shopName, s.shopType);
                await s.save();
                updatedCount += 1;
            }
        }
        res.json({
            status: 'success',
            message: `🎉 全站攤位招牌照片批次聯網補全完成！共更新 ${updatedCount} 家攤商。`,
            total: shops.length,
            updatedCount
        });
    } catch (err) {
        console.error('[Shop:EnrichAllImages] Error:', err);
        res.status(500).json({ status: 'fail', message: '批次補全店家照片失敗: ' + err.message });
    }
});

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

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await Shop.findById(id).exec();
        if (result && (!result.shopIcon || result.shopIcon.trim() === '')) {
            result.shopIcon = getBestShopImage(result.shopName, result.shopType);
            result.save().catch(e => console.error('Auto save shop icon failed:', e.message));
        }
        res.json({ status: "success", shop: result });
    } catch (err) {
        res.json({ status: "fail", message: err });
    }
});
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