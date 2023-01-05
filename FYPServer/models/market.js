const mongoose = require('mongoose')
const Market = new mongoose.Schema({
    name: { type: String, required: true },
    nameen: { type: String, required: true },
    marketIcon: { type: String, required: true },
    marketLocation: { type: String, required: true },
    positionGuidelines: { type: String, require: true },
    brief: { type: String, require: true },
    introduction: { type: String, require: true },
    foodList: { Array: [] },
    shopList: { Array: [] },
    rating: { type: Number, default: "" },
    lat: { type: Number },
    lng: { type: Number },
})

module.exports = mongoose.model('market', Market);