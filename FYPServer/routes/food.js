const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const { enrichFoodData, searchFoodImagesOnline, getBestFoodImage } = require('../helper/webScraperEngine');

/**
 * GET /foods/search-images
 * 網上搜尋特定美食之高清照片候選清單（供使用者/攤商一鍵選擇或自動配圖）
 */
router.get('/search-images', async (req, res) => {
    try {
        const query = req.query.query || req.query.name || '';
        const images = await searchFoodImagesOnline(query);
        res.json({
            status: 'success',
            images
        });
    } catch (err) {
        console.error('[Food:SearchImages] Error:', err);
        res.status(500).json({ status: 'fail', message: '搜尋美食照片失敗: ' + err.message });
    }
});

/**
 * GET /foods/search-web
 * 網上搜尋特定美食之深度營養、歷史典故與風味資訊
 */
router.get('/search-web', (req, res) => {
    try {
        const query = req.query.query || req.query.name || '';
        if (!query) {
            return res.status(400).json({ status: 'fail', message: '請提供欲搜尋之美食名稱' });
        }
        const enriched = enrichFoodData(query);
        res.json({
            status: 'success',
            data: enriched
        });
    } catch (err) {
        console.error('[Food:SearchWeb] Error:', err);
        res.status(500).json({ status: 'fail', message: '聯網檢索失敗: ' + err.message });
    }
});

/**
 * POST /foods/enrich/:id
 * 針對特定美食觸發網路大數據深度補全 (補全熱量、故事、食材、過敏原、口感與照片)
 */
router.post('/enrich/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ status: 'fail', message: '找不到該美食項目' });
        }

        const enrichedData = enrichFoodData(food.foodName, food.toObject());
        
        // 更新並儲存至資料庫
        Object.assign(food, enrichedData);
        food.onlineEnriched = true;
        const updatedFood = await food.save();

        res.json({
            status: 'success',
            message: '🎉 成功自網路擷取並補全該美食之深度資料與高清照片！',
            food: updatedFood
        });
    } catch (err) {
        console.error('[Food:Enrich] Error:', err);
        res.status(500).json({ status: 'fail', message: '美食資料補全失敗: ' + err.message });
    }
});

/**
 * POST /foods/enrich-all
 * 批次補全全站所有美食的深度熱量、故事與工法 (後台或自動化維運使用)
 */
router.post('/enrich-all', async (req, res) => {
    try {
        const allFoods = await Food.find();
        let updatedCount = 0;

        for (const f of allFoods) {
            // 若尚無文化故事、熱量或美食照片，執行智慧補全
            if (!f.culturalStory || !f.onlineEnriched || !f.calories || !f.foodIcon || f.foodIcon.trim() === '') {
                const enriched = enrichFoodData(f.foodName, f.toObject());
                Object.assign(f, enriched);
                f.onlineEnriched = true;
                await f.save();
                updatedCount += 1;
            }
        }

        res.json({
            status: 'success',
            message: `🎉 全站美食深度資料與照片批次聯網補全完成！共更新 ${updatedCount} 道特色小吃。`,
            total: allFoods.length,
            updatedCount
        });
    } catch (err) {
        console.error('[Food:EnrichAll] Error:', err);
        res.status(500).json({ status: 'fail', message: '批次補全失敗: ' + err.message });
    }
});

/**
 * POST /foods/seed-all
 * 全量導入台灣夜市美食大百科
 */
router.post('/seed-all', async (req, res) => {
    try {
        const { GRAND_TAIWAN_FOODS } = require('../helper/taiwanGrandFoodData');
        const { ALL_NIGHT_MARKET_SHOPS } = require('../helper/taiwanNightMarketShopsData');

        let createdCount = 0;
        let updatedCount = 0;

        for (const item of GRAND_TAIWAN_FOODS) {
            const enriched = enrichFoodData(item);
            let existing = await Food.findOne({ foodName: item.foodName });

            if (existing) {
                existing.foodNameEN = enriched.foodNameEN || existing.foodNameEN;
                existing.foodPrice = enriched.foodPrice || existing.foodPrice;
                existing.foodType = Array.from(new Set([...(existing.foodType || []), ...(enriched.foodType || [])]));
                existing.foodInfo = enriched.foodInfo || existing.foodInfo;
                existing.foodInfoEN = enriched.foodInfoEN || existing.foodInfoEN;
                existing.foodIcon = enriched.foodIcon || existing.foodIcon;
                existing.calories = enriched.calories || existing.calories;
                existing.culturalStory = enriched.culturalStory || existing.culturalStory;
                existing.texture = enriched.texture || existing.texture;
                existing.ingredients = enriched.ingredients || existing.ingredients;
                existing.allergens = enriched.allergens || existing.allergens;
                existing.cookingMethod = enriched.cookingMethod || existing.cookingMethod;
                existing.bestPairing = enriched.bestPairing || existing.bestPairing;
                existing.priceRange = enriched.priceRange || existing.priceRange;
                existing.tags = Array.from(new Set([...(existing.tags || []), ...(enriched.tags || [])]));
                existing.nutrition = enriched.nutrition || existing.nutrition;
                existing.onlineEnriched = true;
                existing.isSale = true;
                await existing.save();
                updatedCount++;
            } else {
                const newFood = new Food({
                    ...enriched,
                    onlineEnriched: true,
                    isSale: true
                });
                await newFood.save();
                createdCount++;
            }
        }

        for (const s of ALL_NIGHT_MARKET_SHOPS) {
            if (Array.isArray(s.food)) {
                for (const sf of s.food) {
                    let existing = await Food.findOne({ foodName: sf.foodName });
                    if (!existing) {
                        const enriched = enrichFoodData(sf);
                        const newFood = new Food({
                            ...enriched,
                            onlineEnriched: true,
                            isSale: true
                        });
                        await newFood.save();
                        createdCount++;
                    }
                }
            }
        }

        const totalFoods = await Food.countDocuments();
        res.json({
            status: 'success',
            message: `🎉 全台灣夜市美食大百科導入完畢！新增 ${createdCount} 道，更新 ${updatedCount} 道，全站目前共計 ${totalFoods} 種美食。`,
            stats: { createdCount, updatedCount, totalFoods }
        });
    } catch (err) {
        console.error('[Food:SeedAll] Error:', err);
        res.status(500).json({ status: 'fail', message: '全量導入美食失敗: ' + err.message });
    }
});

/**
 * GET /foods
 * 取得全部美食清單
 */
router.get('/', (req, res) => {
    Food.find().exec().then(result => {
        res.json({ status: "success", food: result });
    }).catch(err => {
        res.status(500).json({ status: "fail", message: "讀取美食清單失敗" });
    });
});

/**
 * GET /foods/:id
 * 取得單一美食詳細資訊 (若尚無深度資訊，自動於讀取時智慧補全)
 */
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "fail", message: "無效的美食識別碼" });
        }

        let food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ status: "fail", message: "找不到該美食" });
        }

        // 若尚無文化故事、熱量或美食照片，即時進行聯網大數據深度補充並異步存檔
        if (!food.culturalStory || !food.texture || !food.onlineEnriched || !food.foodIcon || food.foodIcon.trim() === '') {
            const enriched = enrichFoodData(food.foodName, food.toObject());
            Object.assign(food, enriched);
            food.onlineEnriched = true;
            food.save().catch(e => console.error('Auto save enriched food failed:', e.message));
        }

        res.json({ status: "success", food: food });
    } catch (err) {
        console.error('[Food:GetById] Error:', err.message);
        res.status(500).json({ status: "fail", message: "讀取美食詳細資料失敗" });
    }
});

/**
 * POST /foods
 * 新增美食
 */
router.post('/', async (req, res) => {
    let target = req.body.food;
    if (!target) {
        return res.status(400).json({ status: "fail", message: "請提供美食資料" });
    }

    // 自動進行美食數據聯網補全
    const enriched = enrichFoodData(target.foodName || '', target);
    let food = new Food(enriched);

    try {
        let result = await food.save();
        res.json({ status: "success", food: result });
    } catch (err) {
        console.error('[Food:Post] Error:', err.message);
        res.status(500).json({ status: "fail", message: "新增美食失敗" });
    }
});

/**
 * PUT /foods/:id
 * 更新美食
 */
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let target = req.body.food;

    Food.findByIdAndUpdate(target._id || id, target, { new: true }).exec().then(updatedFood => {
        res.json({ status: "success", food: updatedFood });
    }).catch(err => {
        res.status(500).json({ status: "fail", message: "更新美食失敗" });
    });
});

/**
 * DELETE /foods/:id
 * 刪除美食
 */
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Food.findByIdAndDelete(id).exec().then(result => {
        res.json({ status: "success", food: result });
    }).catch(err => {
        res.status(500).json({ status: "fail", message: "刪除美食失敗" });
    });
});

module.exports = router;
