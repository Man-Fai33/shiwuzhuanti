const mongoose = require('mongoose');

const DailyAnalyticsSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
    pv: { type: Number, default: 0 },                     // 每日總瀏覽次數 (Page Views)
    uv: { type: Number, default: 0 },                     // 每日獨立訪客人數 (Unique Visitors)
    visitorKeys: { type: [String], default: [] },         // 每日造訪者標識，用於計算 UV
    pages: { type: Map, of: Number, default: {} },        // 頁面瀏覽分佈
    deviceTypes: {
        desktop: { type: Number, default: 0 },
        mobile: { type: Number, default: 0 }
    },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailyAnalytics', DailyAnalyticsSchema);
