const mongoose = require('mongoose')
const Bulletin = module.exports = new mongoose.Schema({
    owner: { type: String, default: "" },
    title: { type: String, required: true },
    context: { type: String, required: true },
    imgUrl: { type: String, default: "" },
    date: { type: Date, required: true }
})
module.exports = mongoose.model('bulletin', Bulletin)
