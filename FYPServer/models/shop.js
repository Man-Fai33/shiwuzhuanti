const mongoose = require('mongoose')
const Food = require('./food')
const Shop = new mongoose.Schema({
    shopIcon: { type: String, default: "" },
    shopYeShi: { type: String, required: true },
    shopName: { type: String, required: true },
    shopNumber: { type: String, required: true },
    shopType: { type: String, required: true },
    shopLocation: { type: String, required: true },
    shopManager: { type: String, required: true },
    shopManagerID: { type: String, required: true },
    shopIntroduction: { type: String, required: true },
    shopShortIntroduction: { type: String, required: true },
    isSale: { type: Boolean },
    rank: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    food: { type: Array, default: [] },
    status: { type: String, default: "" }
    // Possible values for role include the following:
    // 1. "Application"
    // 2. "Reject"
})
module.exports = mongoose.model('Shop', Shop);