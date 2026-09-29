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
    city: { type: String },
    cityEn: { type: String },
    region: { type: String }, // 'north', 'central', 'south', 'east'
    openDays: { type: String },
    lat: { type: Number },
    lng: { type: Number },
});

Market.index({ name: 1 });
Market.index({ nameen: 1 });

module.exports = mongoose.model('market', Market);