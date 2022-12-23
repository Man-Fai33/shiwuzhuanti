const mongoose = require('mongoose')
const Comment= module.exports = new mongoose.Schema({
    owner: { type: String, required: true },
    shop: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, required: true }
})
module.exports = mongoose.model('comment', Comment)
