const mongoose = require('mongoose')
const Bulletin = module.exports = new mongoose.Schema({
    owner: { type: String, default: "" },
    context: { type: String, required: true },
    imgUrl: { type: String, required: true },
    date: { type: Date, required: true }
})
module.exports = mongoose.model('bulletin', Bulletin)
