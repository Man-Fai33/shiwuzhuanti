const mongoose = require('mongoose');

const Shop = new mongoose.Schema({
    shopIcon: { type: String, default: "" },
    shopYeShi: { type: String, required: true },
    shopName: { type: String, required: true },
    shopNameEN: { type: String, default: "" },
    shopNumber: { type: String, required: true },
    shopType: { type: String, required: true },
    shopLocation: { type: String, required: true },
    shopManager: { type: String, required: true },
    shopManagerID: { type: String, required: true },
    shopIntroduction: { type: String, required: true },
    shopShortIntroduction: { type: String, required: true },
    isSale: { type: Boolean, default: true },
    rank: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    food: { type: Array, default: [] },
    status: { type: String, default: "Applying" },
    googlePlaceUrl: { type: String, default: "" },
    googleRating: { type: Number, default: 4.6 },
    googleReviewCount: { type: Number, default: 0 },
    lastSyncAt: { type: Date, default: Date.now },

    // 商戶登記與詳細資料擴充 (Merchant Details)
    phone: { type: String, default: "0912-345-678" },
    businessHours: { type: String, default: "週二至週日 17:00 - 00:00 (週一固定公休)" },
    address: { type: String, default: "" },
    specialties: { type: Array, default: [] }, // 招牌推薦
    paymentMethods: { type: Array, default: ["現金", "LINE Pay", "街口支付"] }
});

Shop.index({ shopYeShi: 1 });
Shop.index({ shopName: 1 });
Shop.index({ rank: -1 });
Shop.index({ shopManagerID: 1 });

module.exports = mongoose.model('Shop', Shop);