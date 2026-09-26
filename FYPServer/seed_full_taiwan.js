const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');
const Market = require('./models/market');
const Shop = require('./models/shop');
const Food = require('./models/food');
const Bulletin = require('./models/bulletin');
const Feedback = require('./models/feedback');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fyp';

async function seedFull() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected!');

    // 1. 清理測試產生的殘留資料（包含含有 "測試" 的夜市與攤位）
    const delRes = await Market.deleteMany({ name: { $regex: /測試/ } });
    const delShop = await Shop.deleteMany({ shopYeShi: { $regex: /測試/ } });
    console.log(`Cleaned up ${delRes.deletedCount} test markets and ${delShop.deletedCount} test shops.`);

    // 2. 建立/更新管理員與會員帳號
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
        admin = await new User({
            username: '夜市管理處',
            email: 'admin@example.com',
            password: 'admin',
            role: 'admin',
            phone: '02-23888888',
            gender: true,
            introduction: '台灣夜市好好行平台總管理處，致力推廣在地夜市美食文化。',
            location: '台北市'
        }).save();
        console.log('Admin account created.');
    }

    let regularUser = await User.findOne({ email: 'user@example.com' });
    if (!regularUser) {
        regularUser = await new User({
            username: '夜市饕客小當家',
            email: 'user@example.com',
            password: 'user123',
            role: 'user',
            phone: '0912-345-678',
            gender: true,
            introduction: '迺夜市是生活最大的樂趣！目標是吃遍全台灣每一間排隊名攤！',
            location: '台中市'
        }).save();
        console.log('Regular user account created.');
    }

    // 3. 台灣全台代表性夜市資料
    const fullMarkets = [
        {
            name: '士林觀光夜市',
            nameen: 'Shilin Night Market',
            marketLocation: 'tp',
            positionGuidelines: '捷運淡水信義線至「劍潭站」1號出口，步行約3分鐘即可抵達。',
            brief: '台北市規模最大且名聞遐邇的國際觀光夜市，集合各式傳統經典小吃與流行服飾。',
            introduction: '士林夜市範圍涵蓋基河路、大東路、大南路與文林路一帶。歷史悠久，擁有比臉大炸雞排、辛發亭雪花冰、老士林大香腸、生煎包等經典名產，是國內外遊客指名必訪的美食天堂。',
            rating: 4.8,
            lat: 25.088,
            lng: 121.524,
            marketIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: '逢甲夜市',
            nameen: 'Fengjia Night Market',
            marketLocation: 'tz',
            positionGuidelines: '台中市西屯區文華路、福星路與逢甲路口，緊鄰逢甲大學校門口。',
            brief: '全台創意夜市美食的搖籃與潮流商圈，物美價廉、驚喜不斷。',
            introduction: '逢甲夜市是全台灣最具活力與創新小吃發源地，大腸包小腸的排隊盛況、明倫蛋餅的甜辣古早味、日船章魚小丸子的焦香酥脆均發跡於此，每天傍晚起人潮洶湧、熱鬧非凡。',
            rating: 4.9,
            lat: 24.179,
            lng: 120.649,
            marketIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: '花園夜市',
            nameen: 'Tainan Garden Night Market',
            marketLocation: 'tn',
            positionGuidelines: '台南市北區海安路三段與和緯路三段交岔路口（營業時間：每週四、六、日 17:00-24:00）。',
            brief: '南台灣規模最浩大的流動型夜市，旗海飄揚的壯麗景象與百攤府城珍饈。',
            introduction: '花園夜市為台南「大大武花大武花」夜市文化之首，各攤高懸特色長旗引導食客。著名必吃包含二師兄古味滷味、統大碳烤香雞排、陳記麻辣鴨血魚蛋、現炒拔絲地瓜，滿溢府城人情味。',
            rating: 4.8,
            lat: 23.011,
            lng: 120.200,
            marketIcon: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: '饒河街觀光夜市',
            nameen: 'Raohe Street Night Market',
            marketLocation: 'tp',
            positionGuidelines: '捷運松山新店線至「松山站」1號或5號出口，松山慈祐宮正前方牌樓進入。',
            brief: '台北市最早設立的觀光夜市之一，牌樓雄偉古色古香，街道筆直好逛。',
            introduction: '饒河夜市全長約600公尺，以慈祐宮為起點。入夜後燈火通明，米其林必比登推薦的福州世祖胡椒餅肉汁爆發、陳董藥燉排骨湯濃肉甜，以及東發號百年麵線，是老台北人最愛的宵夜好去處。',
            rating: 4.7,
            lat: 25.050,
            lng: 121.577,
            marketIcon: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: '寧夏夜市',
            nameen: 'Ningxia Night Market',
            marketLocation: 'tp',
            positionGuidelines: '捷運雙連站1號出口或中山站5號出口，沿民生西路步行約8分鐘。',
            brief: '千歲宴與老字號傳統小吃重鎮，素有「台北人的胃」之美稱。',
            introduction: '寧夏夜市雖然街道長度適中，但攤位密度與老字號密度居全台之冠。劉美麗蚵仔煎、圓環邊蚵仔煎、環記麻油雞、方家雞肉飯與知高飯，道道傳承三代以上，獲選為國際環保夜市典範。',
            rating: 4.9,
            lat: 25.055,
            lng: 121.515,
            marketIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: '六合國際觀光夜市',
            nameen: 'Liuhe Tourist Night Market',
            marketLocation: 'tn',
            positionGuidelines: '高雄捷運紅橘線交會「美麗島站」11號出口步行1分鐘。',
            brief: '南台灣知名老字號海港夜市，海鮮鮮美、木瓜牛奶醇香濃郁。',
            introduction: '六合夜市自1950年代發跡，是高雄歷史最悠久的觀光夜市。整條街道劃為行人徒步區，必喝濃純鄭老牌木瓜牛奶、鮮甜莊記海產粥、碳烤烏魚腱與胡椒餅，深受海內外觀光客喜愛。',
            rating: 4.6,
            lat: 22.632,
            lng: 120.301,
            marketIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
        },
        {
            name: '羅東觀光夜市',
            nameen: 'Luodong Night Market',
            marketLocation: 'tz',
            positionGuidelines: '宜蘭縣羅東鎮中山公園周邊，自羅東火車站步行約8分鐘。',
            brief: '宜蘭蘭陽平原最繁華的夜市聚落，以三星蔥系列美食與當歸羊肉聞名。',
            introduction: '圍繞羅東中山公園四周而設，必吃名店首推排隊人潮綿延數十公尺的「阿灶伯當歸羊肉湯」、現煎焦香爆漿的「義豐蔥油派」、晶瑩剔透的「魏姐包心粉圓」與卜肉糕渣。',
            rating: 4.8,
            lat: 24.677,
            lng: 121.767,
            marketIcon: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
        }
    ];

    for (const m of fullMarkets) {
        const exist = await Market.findOne({ name: m.name });
        if (!exist) {
            await new Market(m).save();
            console.log(`[Seed] Created Market: ${m.name}`);
        } else {
            await Market.updateOne({ name: m.name }, { $set: m });
            console.log(`[Seed] Updated Market: ${m.name}`);
        }
    }

    // 4. 代表性經典美食
    const fullFoods = [
        {
            foodName: '豪大脆皮大雞排',
            foodPrice: 95,
            foodType: ['Fried', 'snack'],
            foodInfo: '比臉還大的香脆外皮，肉汁飽滿厚實，經典特調中藥椒鹽提味，排隊人手一片！',
            foodInfoEN: 'Extra-large crispy fried chicken cutlet, juicy inside with special pepper salt.',
            foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
            rating: 4.9,
            isSale: true
        },
        {
            foodName: '炭火大腸包小腸',
            foodPrice: 75,
            foodType: ['snack', 'Fried'],
            foodInfo: '手工炭烤黑豬肉香腸搭配香Q糯米腸，佐以酸菜、爽脆小黃瓜、九層塔與蒜泥，香氣逼人。',
            foodInfoEN: 'Juicy pork sausage wrapped in grilled sticky rice with pickles and garlic.',
            foodIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            isSale: true
        },
        {
            foodName: '黑糖波霸鮮奶茶',
            foodPrice: 65,
            foodType: ['Dessert', 'snack'],
            foodInfo: '每日古法手炒黑糖珍珠，搭配濃郁高大鮮乳，溫熱波霸與冰涼鮮奶交融的極致口感。',
            foodInfoEN: 'Brown sugar boba pearls with fresh farm milk, rich and chewy.',
            foodIcon: 'https://images.unsplash.com/photo-1558857563-b37cf5b7a151?auto=format&fit=crop&w=600&q=80',
            rating: 4.9,
            isSale: true
        },
        {
            foodName: '福州窯烤胡椒餅',
            foodPrice: 60,
            foodType: ['snack'],
            foodInfo: '貼在特製炭火貼爐烘烤，外皮香酥帶炭香，內餡滿滿赤肉鮮蔥與辛辣黑胡椒湯汁。',
            foodInfoEN: 'Clay oven baked pork pepper bun with crispy sesame crust.',
            foodIcon: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            isSale: true
        },
        {
            foodName: '阿灶伯當歸羊肉湯',
            foodPrice: 90,
            foodType: ['Pasta', 'snack'],
            foodInfo: '頂級當歸中藥熬煮溫補高湯，羊肉片份量澎湃軟嫩無羶味，搭配特製豆瓣腐乳醬一絕。',
            foodInfoEN: 'Herbal angelica mutton soup, nourishing and flavorful.',
            foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80',
            rating: 4.9,
            isSale: true
        },
        {
            foodName: '老牌正宗蚵仔煎',
            foodPrice: 80,
            foodType: ['snack'],
            foodInfo: '嘉義東石新鮮直送肥美鮮蚵，粉漿煎得外圈微焦香酥，淋上特製酸甜紅醬最對味。',
            foodInfoEN: 'Traditional Taiwanese oyster omelet with sweet & savory sauce.',
            foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
            rating: 4.7,
            isSale: true
        },
        {
            foodName: '二師兄古味三杯滷味',
            foodPrice: 50,
            foodType: ['snack', 'Fried'],
            foodInfo: '台南花園夜市排隊神店！現場大鐵鍋現炒三杯雞翅、小鳥蛋與米血，焦糖色澤醬香入骨。',
            foodInfoEN: 'Braised chicken wings and rice cakes cooked in savory three-cup sauce.',
            foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            isSale: true
        },
        {
            foodName: '辛發亭綿綿雪花冰',
            foodPrice: 90,
            foodType: ['Dessert'],
            foodInfo: '如絲綢般層疊片片的特濃雪花冰，搭配新鮮愛文芒果或濃黑芝麻，夏日夜市消暑聖品。',
            foodInfoEN: 'Silky smooth Taiwanese shaved snow ice with mango and condensed milk.',
            foodIcon: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            isSale: true
        }
    ];

    for (const f of fullFoods) {
        const exist = await Food.findOne({ foodName: f.foodName });
        if (!exist) {
            await new Food(f).save();
            console.log(`[Seed] Created Food: ${f.foodName}`);
        } else {
            await Food.updateOne({ foodName: f.foodName }, { $set: f });
            console.log(`[Seed] Updated Food: ${f.foodName}`);
        }
    }

    // 5. 代表性夜市攤位店家
    const fullShops = [
        {
            shopName: '士林豪大大雞排',
            shopYeShi: '士林觀光夜市',
            shopNumber: 'A-01',
            shopType: '炸物熟食',
            shopLocation: '基河路 115 號（陽明戲院對面門面）',
            shopManager: '林老闆',
            shopManagerID: String(regularUser._id),
            shopIntroduction: '創立於民國88年，每天堅持新鮮現裹粉、高溫油炸，以超大份量與鮮嫩肉汁征服全球饕客。',
            shopShortIntroduction: '全台知名比臉大雞排始祖！',
            shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
            rating: 4.9,
            food: [
                { foodName: '豪大脆皮大雞排', foodPrice: 95, foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80' }
            ]
        },
        {
            shopName: '逢甲官芝霖大腸包小腸',
            shopYeShi: '逢甲夜市',
            shopNumber: 'B-08',
            shopType: '傳統小吃',
            shopLocation: '逢甲路 20 巷口（逢甲大學正門前熱區）',
            shopManager: '官老闆',
            shopManagerID: String(regularUser._id),
            shopIntroduction: '電視媒體與老饕瘋狂爭相報導，配料豐富多達六種口味，每逢週末人潮擠爆街道。',
            shopShortIntroduction: '逢甲夜市指標性排隊天王！',
            shopIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            food: [
                { foodName: '炭火大腸包小腸', foodPrice: 75, foodIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80' }
            ]
        },
        {
            shopName: '花園夜市二師兄滷味',
            shopYeShi: '花園夜市',
            shopNumber: '第 3 橫排 05 攤',
            shopType: '經典小吃',
            shopLocation: '台南市海安路花園夜市美食街第三排',
            shopManager: '陳主廚',
            shopManagerID: String(regularUser._id),
            shopIntroduction: '大黑鐵鍋現場熱氣翻騰翻炒，甜中帶香的純正府城風味，雞爪、米血、鳥蛋必買必吃！',
            shopShortIntroduction: '花園夜市旗海下的大鍋現炒滷味！',
            shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            food: [
                { foodName: '二師兄古味三杯滷味', foodPrice: 50, foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' }
            ]
        },
        {
            shopName: '福州世祖胡椒餅松山總店',
            shopYeShi: '饒河街觀光夜市',
            shopNumber: '入口第 1 攤',
            shopType: '傳統烤餅',
            shopLocation: '慈祐宮側饒河夜市主牌樓入口',
            shopManager: '吳老闆',
            shopManagerID: String(regularUser._id),
            shopIntroduction: '米其林必比登推薦！剛出爐外皮熱氣蒸騰，黑胡椒與豬後腿赤肉香氣四溢，令人回味無窮。',
            shopShortIntroduction: '榮獲米其林必比登推薦排隊烤餅！',
            shopIcon: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
            rating: 4.8,
            food: [
                { foodName: '福州窯烤胡椒餅', foodPrice: 60, foodIcon: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80' }
            ]
        }
    ];

    for (const s of fullShops) {
        const exist = await Shop.findOne({ shopName: s.shopName });
        if (!exist) {
            await new Shop(s).save();
            console.log(`[Seed] Created Shop: ${s.shopName}`);
        } else {
            await Shop.updateOne({ shopName: s.shopName }, { $set: s });
            console.log(`[Seed] Updated Shop: ${s.shopName}`);
        }
    }

    // 6. 最新公告
    const bulletins = [
        {
            owner: '夜市管理處',
            title: '🏮 2026 台灣夏夜美食節！全台七大夜市聯名打卡優惠開跑',
            context: '為推廣台灣夜市文化，自即日起至 10 月底，於合作夜市消費滿 NT$ 200 即可索取數位摸彩券，有機會抽中台灣在地農特產大禮包與夜市抵用金！歡迎大家相揪來迺夜市！',
            imgUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            date: new Date()
        },
        {
            owner: '夜市管理處',
            title: '🥢 環保愛地球：推廣自備環保餐具與電子支付全面上線',
            context: '響應綠色永續生活，士林、逢甲、寧夏與花園夜市全面導入 LINE Pay / 台灣 Pay / 街口支付。自備環保杯與餐盒更享有特定攤位現金折扣，讓我們一起做個綠色饕客！',
            imgUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
            date: new Date()
        }
    ];

    for (const b of bulletins) {
        const exist = await Bulletin.findOne({ title: b.title });
        if (!exist) {
            await new Bulletin(b).save();
            console.log(`[Seed] Created Bulletin: ${b.title}`);
        }
    }

    console.log('=== FULL TAIWAN NIGHT MARKET SEEDING COMPLETED ===');
    process.exit(0);
}

seedFull().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});
