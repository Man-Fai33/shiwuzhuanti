const mongoose = require('mongoose')
const Food = new mongoose.Schema({
    foodName: { type: String, required: true },
    foodPrice: { type: Number, require: 0.00 },
    foodType: { type: Array, require: true },
    foodInfo: { type: String, default: "" },
    foodInfoEN: { type: String, default: "" },
    foodIcon: { type: String, default: "" },
    isSale: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    isLike: { type: Array }
});

Food.index({ foodName: 1 });
Food.index({ rank: -1 });
Food.index({ rating: -1 });

module.exports = mongoose.model('food', Food);