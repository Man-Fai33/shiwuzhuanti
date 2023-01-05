const mongoose = require('mongoose')
const Feedback = module.exports = new mongoose.Schema({
    owner: { type: String, required: true },
    id: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    opinion: { type: String, required: true },
    isMember: { type: String, require: true },
    date: { type: Date, required: true }
})
module.exports = mongoose.model('feedback', Feedback)
