const mongoose = require('mongoose')

const Market = new mongoose.Schema({
    name: { type: String, required: true },
    nameen: { type: String, required: true },
    marketIcon: { type: String, required: true },
    marketLocation: { type: String, required: true },
    positionGuidelines: { type: String, require: true },
    brief: { type: String, require: true },
    introduction: { type: String, require: true },
    foodList: { type: Array, default: [] },
    shopList: { type: Array, default: [] },
    rating: { type: Number, default: 4.8 },
    lat: { type: Number },
    lng: { type: Number },
})

module.exports = mongoose.model('market', Market);