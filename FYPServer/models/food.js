const mongoose = require('mongoose');

const Food = new mongoose.Schema({
    foodName: { type: String, required: true },
    foodPrice: { type: Number, default: 60.00 },
    foodType: { type: Array, default: [] },
    foodInfo: { type: String, default: "" },
    foodInfoEN: { type: String, default: "" },
    foodIcon: { type: String, default: "" },
    isSale: { type: Boolean, default: true },
    rank: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    isLike: { type: Array, default: [] },
    
    // 深度美食維度 (Rich Culinary Dimensions)
    calories: { type: Number, default: 350 }, // 預估熱量 (kcal)
    culturalStory: { type: String, default: "" }, // 歷史文化淵源與夜市故事
    ingredients: { type: Array, default: [] }, // 主要原料配方清單
    texture: { type: String, default: "" }, // 口感特點 (e.g. 外酥內嫩、鮮甜多汁)
    allergens: { type: Array, default: [] }, // 過敏原警示 (e.g. 含麩質、含花生)
    cookingMethod: { type: String, default: "" }, // 料理工法 (e.g. 炭火慢烤、現點現炸)
    bestPairing: { type: String, default: "" }, // 推薦絕配飲品或搭配吃法
    priceRange: { type: String, default: "NT$ 50 - 80" }, // 夜市常見價格區間
    spiceLevel: { type: Number, default: 0 }, // 辣度 (0=不辣, 1=微辣, 2=中辣, 3=大辣)
    nutrition: {
        protein: { type: String, default: "15g" },
        fat: { type: String, default: "12g" },
        carbs: { type: String, default: "38g" },
        sodium: { type: String, default: "420mg" }
    },
    tags: { type: Array, default: [] }, // 特色標籤 (e.g. 米其林推薦、排隊名物、銅板小吃)
    onlineEnriched: { type: Boolean, default: false } // 是否已由網路大數據補充
});

Food.index({ foodName: 1 });
Food.index({ rank: -1 });
Food.index({ rating: -1 });

module.exports = mongoose.model('food', Food);