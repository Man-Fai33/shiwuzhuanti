/**
 * 全台灣夜市美食大百科全量擴充腳本 (Grand Taiwan Foods Seeder)
 * 導入 150+ ~ 200+ 種全台夜市道地美食到資料庫
 */

const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { GRAND_TAIWAN_FOODS } = require('../helper/taiwanGrandFoodData');
const { ADDITIONAL_TAIWAN_FOODS } = require('../helper/taiwanGrandFoodPart2');
const { ALL_NIGHT_MARKET_SHOPS } = require('../helper/taiwanNightMarketShopsData');
const { enrichFoodData, getBestFoodImage } = require('../helper/webScraperEngine');

const Food = require('../models/food');
const Shop = require('../models/shop');

const TARGET_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fyp';

const ALL_MERGED_FOODS = [...GRAND_TAIWAN_FOODS, ...ADDITIONAL_TAIWAN_FOODS];

async function seedGrandFoods() {
    console.log('========================================================');
    console.log('🍢 全台灣夜市美食大百科全量擴充引擎');
    console.log('========================================================');
    console.log(`📌 目標資料庫: ${TARGET_URI.replace(/\/\/.*@/, '//***:***@')}`);
    console.log(`📚 擴充電庫待導入美食: ${ALL_MERGED_FOODS.length} 種`);
    console.log('========================================================\n');

    try {
        await mongoose.connect(TARGET_URI);
        console.log('✅ 成功連線至 MongoDB 資料庫\n');

        let createdCount = 0;
        let updatedCount = 0;

        // 1. 導入 ALL_MERGED_FOODS
        for (const item of ALL_MERGED_FOODS) {
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

        // 2. 確保 ALL_NIGHT_MARKET_SHOPS 的每一道菜色也都收錄
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

        console.log('========================================================');
        console.log(`🎉 美食全量導入完畢！`);
        console.log(`✨ 新增美食: ${createdCount} 道`);
        console.log(`🔄 更新美食: ${updatedCount} 道`);
        console.log(`🍲 目前資料庫美食總數達到: ${totalFoods} 種美食！`);
        console.log('========================================================\n');

    } catch (err) {
        console.error('❌ 導入失敗:', err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedGrandFoods();
