const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');
const Market = require('./models/market');
const Shop = require('./models/shop');
const Food = require('./models/food');
const Bulletin = require('./models/bulletin');
const Feedback = require('./models/feedback');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fyp';

async function seed() {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(mongoURI);
    console.log('Connected!');

    // 1. Seed Users
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
        await new User({
            username: '系統管理員',
            email: 'admin@example.com',
            password: 'admin',
            role: 'admin',
            phone: '0900000000',
            gender: true,
            introduction: '平台管理人員',
            location: 'Taipei'
        }).save();
        console.log('[Seed] Admin user created: admin@example.com / admin');
    }

    const existingUser = await User.findOne({ email: 'user@example.com' });
    let testUserId = null;
    if (!existingUser) {
        const u = await new User({
            username: '夜市小達人',
            email: 'user@example.com',
            password: 'user123',
            role: 'user',
            phone: '0912345678',
            gender: true,
            introduction: '熱愛台灣在地夜市小吃！',
            location: 'Taipei'
        }).save();
        testUserId = u._id;
        console.log('[Seed] Regular user created: user@example.com / user123');
    } else {
        testUserId = existingUser._id;
    }

    // 2. Seed Night Markets
    const marketsData = [
        {
            name: '士林觀光夜市',
            nameen: 'Shilin Night Market',
            marketLocation: 'tp',
            positionGuidelines: '捷運淡水信義線至劍潭站 1 號出口，步行約 3 分鐘即可抵達。',
            brief: '台北市規模最大的觀光夜市，集結全台傳統小吃與潮流服飾。',
            introduction: '士林夜市是台北市最具代表性的夜市之一，涵蓋文林路、大東路、大南路等街區。著名美食包括豪大大雞排、士林大香腸、生煎包、辛發亭雪花冰等，每日吸引海內外遊客前來朝聖。',
            rating: 4.8,
            lat: 25.088,
            lng: 121.524,
            marketIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: '逢甲夜市',
            nameen: 'Fengjia Night Market',
            marketLocation: 'tz',
            positionGuidelines: '台中市西屯區逢甲路與福星路口，鄰近逢甲大學正門。',
            brief: '全台創意夜市小吃發源地，擁有豐富多元的創新美食與商場。',
            introduction: '逢甲夜市為台中知名商圈，以創新且引領潮流的小吃聞名全台。大腸包小腸、明倫蛋餅、章魚小丸子等經典美食發跡於此，是前往台中的必訪勝地。',
            rating: 4.9,
            lat: 24.179,
            lng: 120.649,
            marketIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: '花園夜市',
            nameen: 'Garden Night Market',
            marketLocation: 'tn',
            positionGuidelines: '台南市北區海安路三段與和緯路三段交叉路口，每週四、六、日營業。',
            brief: '南台灣知名大型流動夜市，滿滿的旗幟與壯觀攤位陣容。',
            introduction: '花園夜市以旗海飄揚的特色名聞遐邇，上百攤道地台南美食匯聚，包括二師兄古味滷味、麻辣鴨血、統大碳烤香雞排等，是品嚐府城夜間小吃的殿堂。',
            rating: 4.7,
            lat: 23.011,
            lng: 120.200,
            marketIcon: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
        }
    ];

    for (const mData of marketsData) {
        const exist = await Market.findOne({ name: mData.name });
        if (!exist) {
            await new Market(mData).save();
            console.log(`[Seed] Night market created: ${mData.name}`);
        }
    }

    // 3. Seed Foods
    const foodsData = [
        {
            foodName: '豪大脆皮雞排',
            foodPrice: 90,
            foodType: ['炸物', '人氣必吃'],
            foodInfo: '外皮金黃酥脆，肉質厚實多汁，經典椒鹽調味令人垂涎。',
            foodInfoEN: 'Large crispy fried chicken cutlet, crunchy outside and juicy inside.',
            foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
            rating: 4.9,
            isSale: true
        },
        {
            foodName: '古早味珍珠奶茶',
            foodPrice: 55,
            foodType: ['飲品', '甜品'],
            foodInfo: '特選紅茶搭配濃郁鮮奶與每日現煮Q彈黑糖珍珠。',
            foodInfoEN: 'Classic Taiwanese bubble milk tea with chewy tapioca pearls.',
            foodIcon: 'https://images.unsplash.com/photo-1558857563-b37cf5b7a151?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            isSale: true
        },
        {
            foodName: '炭烤大腸包小腸',
            foodPrice: 70,
            foodType: ['烤物', '傳統小吃'],
            foodInfo: '嚴選糯米腸包裹特製炭烤香腸，佐以酸菜、小黃瓜與蒜頭。',
            foodInfoEN: 'Taiwanese sausage wrapped in a glutinous rice sausage.',
            foodIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
            rating: 4.7,
            isSale: true
        }
    ];

    for (const fData of foodsData) {
        const exist = await Food.findOne({ foodName: fData.foodName });
        if (!exist) {
            await new Food(fData).save();
            console.log(`[Seed] Food created: ${fData.foodName}`);
        }
    }

    // 4. Seed Shops
    const existShop = await Shop.findOne({ shopName: '豪大大雞排士林旗艦店' });
    if (!existShop) {
        await new Shop({
            shopName: '豪大大雞排士林旗艦店',
            shopYeShi: '士林觀光夜市',
            shopNumber: 'A-12',
            shopType: '炸物熟食',
            shopLocation: '基河路 115 號攤位',
            shopManager: '張老闆',
            shopManagerID: String(testUserId),
            shopIntroduction: '自民國88年創立以來，以比臉還大的香酥雞排風靡全台，每天堅持現點現炸。',
            shopShortIntroduction: '全台知名比臉大雞排',
            shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            food: [
                { foodName: '豪大脆皮雞排', foodPrice: 90, foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80' }
            ]
        }).save();
        console.log('[Seed] Shop created: 豪大大雞排士林旗艦店');
    }

    // 5. Seed Bulletin
    const existBulletin = await Bulletin.findOne({ title: '【重要公告】夜市夏日觀光季開幕活動' });
    if (!existBulletin) {
        await new Bulletin({
            owner: '管理處',
            title: '【重要公告】夜市夏日觀光季開幕活動',
            context: '夜市夏日美食節於本週末正式開跑！消費滿額即可參加摸彩，歡迎所有遊客踴躍參與。',
            imgUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
            date: new Date()
        }).save();
        console.log('[Seed] Bulletin created');
    }

    // 6. Seed Feedback
    const existFeedback = await Feedback.findOne({ opinion: '網站夜市資訊很完整，地圖導航很方便！' });
    if (!existFeedback) {
        await new Feedback({
            owner: '遊客陳小姐',
            id: String(testUserId),
            contact: '0988776655',
            email: 'visitor@example.com',
            opinion: '網站夜市資訊很完整，地圖導航很方便！希望能多推薦附近的公共廁所位置。',
            isMember: 'true',
            date: new Date()
        }).save();
        console.log('[Seed] Feedback created');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
}

seed().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});
