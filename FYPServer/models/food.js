const mongoose = require('mongoose')
const Food = new mongoose.Schema({
    foodName: { type: String, required: true },
    foodLocation: { type: String, required: true },
    foodPrice: { type: Number, require: 0.00 },
    foodInfo: { type: String, default: "" },
    foodIcon: { type: String, default: "" },
    isSale: { type: Boolean, default: "false" },
    rank: { type: Number, default: 0 },
    rating: { type: Number }
})
// Food.add({ food: [Food] })
module.exports = mongoose.model('food', Food)