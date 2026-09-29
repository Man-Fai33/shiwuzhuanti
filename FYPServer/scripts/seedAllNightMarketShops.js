/**
 * 全台灣 29 大夜市商店與特色美食全量導入腳本
 * 用法: node scripts/seedAllNightMarketShops.js
 */

const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { ALL_NIGHT_MARKET_SHOPS } = require('../helper/taiwanNightMarketShopsData');
const { enrichFoodData, getBestFoodImage, getBestShopImage } = require('../helper/webScraperEngine');

const Shop = require('../models/shop');
const Food = require('../models/food');
const Market = require('../models/market');

const TARGET_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fyp';
const DEFAULT_MANAGER_ID = '6ab82ad42c46eb89a14991ae'; // 系統 Admin 預設代管

async function seedAllShopsAndFoods() {
    console.log('========================================================');
    console.log('🍜 全台灣 29 大夜市商店與美食全量導入引擎');
    console.log('========================================================');
    console.log(`📌 目標資料庫: ${TARGET_URI.replace(/\/\/.*@/, '//***:***@')}`);
    console.log(`📦 待處理商店總數: ${ALL_NIGHT_MARKET_SHOPS.length} 間`);
    console.log('========================================================\n');

    try {
        await mongoose.connect(TARGET_URI);
        console.log('✅ 成功連線至 MongoDB 資料庫\n');

        let createdShops = 0;
        let updatedShops = 0;
        let createdFoods = 0;
        let updatedFoods = 0;

        for (const shopData of ALL_NIGHT_MARKET_SHOPS) {
            console.log(`🏪 處理夜市 [${shopData.shopYeShi}] ➔ 店家: ${shopData.shopName}`);

            // 1. 處理該店家所販售的美食清單
            const processedFoods = [];
            if (Array.isArray(shopData.food)) {
                for (const fItem of shopData.food) {
                    let existingFood = await Food.findOne({ foodName: fItem.foodName });
                    
                    // 豐富化美食大數據維度
                    const enriched = enrichFoodData({
                        foodName: fItem.foodName,
                        foodPrice: fItem.foodPrice,
                        foodType: fItem.foodType || ['傳統小吃'],
                        foodInfo: fItem.foodInfo || '',
                        foodInfoEN: fItem.foodInfoEN || '',
                        foodIcon: fItem.foodIcon || getBestFoodImage(fItem.foodName),
                        rating: fItem.rating || 4.8
                    });

                    if (existingFood) {
                        // 更新既有美食
                        existingFood.foodPrice = enriched.foodPrice;
                        existingFood.foodIcon = enriched.foodIcon;
                        existingFood.foodInfo = enriched.foodInfo;
                        existingFood.foodInfoEN = enriched.foodInfoEN;
                        existingFood.calories = enriched.calories;
                        existingFood.culturalStory = enriched.culturalStory;
                        existingFood.texture = enriched.texture;
                        existingFood.ingredients = enriched.ingredients;
                        existingFood.allergens = enriched.allergens;
                        existingFood.cookingMethod = enriched.cookingMethod;
                        existingFood.bestPairing = enriched.bestPairing;
                        existingFood.priceRange = enriched.priceRange;
                        existingFood.tags = enriched.tags;
                        existingFood.nutrition = enriched.nutrition;
                        existingFood.onlineEnriched = true;
                        existingFood.isSale = true;
                        await existingFood.save();
                        updatedFoods++;
                        processedFoods.push({
                            _id: existingFood._id,
                            foodName: existingFood.foodName,
                            foodPrice: existingFood.foodPrice,
                            foodIcon: existingFood.foodIcon,
                            rating: existingFood.rating || 4.8
                        });
                    } else {
                        // 新建美食
                        const newFood = new Food({
                            ...enriched,
                            onlineEnriched: true,
                            isSale: true
                        });
                        const savedFood = await newFood.save();
                        createdFoods++;
                        processedFoods.push({
                            _id: savedFood._id,
                            foodName: savedFood.foodName,
                            foodPrice: savedFood.foodPrice,
                            foodIcon: savedFood.foodIcon,
                            rating: savedFood.rating || 4.8
                        });
                    }
                }
            }

            // 2. 尋找或新建該商店
            let existingShop = await Shop.findOne({
                shopName: shopData.shopName,
                shopYeShi: shopData.shopYeShi
            });

            const shopIcon = shopData.shopIcon || getBestShopImage(shopData.shopName, shopData.shopType);

            if (existingShop) {
                existingShop.shopNameEN = shopData.shopNameEN || existingShop.shopNameEN;
                existingShop.shopNumber = shopData.shopNumber || existingShop.shopNumber;
                existingShop.shopType = shopData.shopType || existingShop.shopType;
                existingShop.shopLocation = shopData.shopLocation || existingShop.shopLocation;
                existingShop.shopIntroduction = shopData.shopIntroduction || existingShop.shopIntroduction;
                existingShop.shopShortIntroduction = shopData.shopShortIntroduction || existingShop.shopShortIntroduction;
                existingShop.shopIcon = shopIcon;
                existingShop.rating = shopData.rating || existingShop.rating;
                existingShop.googleRating = shopData.googleRating || existingShop.googleRating;
                existingShop.googleReviewCount = shopData.googleReviewCount || existingShop.googleReviewCount;
                existingShop.googlePlaceUrl = shopData.googlePlaceUrl || existingShop.googlePlaceUrl;
                existingShop.specialties = shopData.specialties || existingShop.specialties;
                existingShop.status = 'approved';
                existingShop.isSale = true;
                existingShop.food = processedFoods;
                await existingShop.save();
                updatedShops++;
                console.log(`   🔄 已更新店家資料與所屬美食 (${processedFoods.length} 道美食)`);
            } else {
                const newShop = new Shop({
                    shopName: shopData.shopName,
                    shopNameEN: shopData.shopNameEN || '',
                    shopYeShi: shopData.shopYeShi,
                    shopNumber: shopData.shopNumber || '01',
                    shopType: shopData.shopType || '傳統小吃',
                    shopLocation: shopData.shopLocation || '夜市美食街',
                    shopManager: '特約店長',
                    shopManagerID: DEFAULT_MANAGER_ID,
                    shopIntroduction: shopData.shopIntroduction || '',
                    shopShortIntroduction: shopData.shopShortIntroduction || '',
                    shopIcon: shopIcon,
                    rating: shopData.rating || 4.8,
                    googleRating: shopData.googleRating || 4.6,
                    googleReviewCount: shopData.googleReviewCount || 2500,
                    googlePlaceUrl: shopData.googlePlaceUrl || '',
                    specialties: shopData.specialties || [],
                    status: 'approved',
                    isSale: true,
                    food: processedFoods
                });
                await newShop.save();
                createdShops++;
                console.log(`   ✨ 已新增名攤與關聯美食 (${processedFoods.length} 道美食)`);
            }
        }

        console.log('\n========================================================');
        console.log('🎉 全台 29 夜市名店與美食資料導入完畢！');
        console.log('========================================================');
        console.log(`🏪 商店統計: 新增 ${createdShops} 間，更新 ${updatedShops} 間，總計處理 ${ALL_NIGHT_MARKET_SHOPS.length} 間`);
        console.log(`🍲 美食統計: 新增 ${createdFoods} 項，更新 ${updatedFoods} 項`);
        console.log('========================================================\n');

    } catch (err) {
        console.error('❌ 導入失敗:', err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedAllShopsAndFoods();
