const mongoose = require('mongoose')

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
    rating: { type: Number, default: 0 },
    food: { type: Array, default: [] },
    status: { type: String, default: "" },
    googlePlaceUrl: { type: String, default: "" },
    googleRating: { type: Number, default: 0 },
    googleReviewCount: { type: Number, default: 0 },
    lastSyncAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Shop', Shop);