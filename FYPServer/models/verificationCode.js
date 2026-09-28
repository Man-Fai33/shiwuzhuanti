const mongoose = require('mongoose');

const VerificationCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    code: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'signup', // 'signup' | 'reset_password' | 'verify_email'
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // 10 分鐘自動過期並由 MongoDB TTL 機制自動清理
    }
});

// 建立聯合索引提升查詢效率
VerificationCodeSchema.index({ email: 1, type: 1 });

module.exports = mongoose.model('VerificationCode', VerificationCodeSchema);
