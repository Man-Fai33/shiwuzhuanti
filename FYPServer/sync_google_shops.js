const mongoose = require('mongoose');
require('dotenv').config();

const { syncAllNightMarketShops } = require('./helper/googleMapsSync');
const Shop = require('./models/shop');
const Food = require('./models/food');
const Market = require('./models/market');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fyp';

async function main() {
    console.log('=====================================================');
    console.log('🏮 台灣夜市 Google Maps 店家與美食資料批次同步工具 🏮');
    console.log('=====================================================');
    console.log(`Connecting to MongoDB at: ${mongoURI}...`);

    try {
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB 連線成功！\n');

        const startTime = Date.now();
        const res = await syncAllNightMarketShops({ triggeredBy: 'cli' });
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        console.log('\n-----------------------------------------------------');
        console.log(`🎉 同步完成！耗時: ${duration} 秒`);
        console.log(`🏪 總計處理店家 (Shops): ${res.shopsCount} 間`);
        console.log(`🍢 總計處理必吃美食 (Foods): ${res.foodsCount} 道`);
        console.log(`📍 涵蓋夜市: ${res.syncedMarkets.join(', ')}`);
        console.log('-----------------------------------------------------');

        // 統計目前各夜市擁有的店家數量
        console.log('\n📊 各夜市最新店家數量統計：');
        for (const mName of res.syncedMarkets) {
            const count = await Shop.countDocuments({ shopYeShi: mName });
            console.log(`   • ${mName}: ${count} 間人氣攤位`);
        }

        console.log('\n✅ 所有資料已安全 Upsert 寫入 MongoDB。');
    } catch (err) {
        console.error('❌ 同步失敗:', err);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 MongoDB 連線已關閉。');
        process.exit(0);
    }
}

main();
