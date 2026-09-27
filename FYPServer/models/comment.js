const mongoose = require('mongoose')
const Comment = module.exports = new mongoose.Schema({
    ownerId: { type: String, required: true },
    ownerName: { type: String, required: true },
    shop: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true }
});

Comment.index({ shop: 1, date: -1 });

module.exports = mongoose.model('comment', Comment);
