/**
 * 全台灣 29 大夜市真實名攤與美食資料庫 (Authentic Night Market Stalls & Foods)
 * 涵蓋全台灣北、中、南、東、離島 29 所夜市之必吃排隊名店與經典特色料理
 */

const ALL_NIGHT_MARKET_SHOPS = [
    // ==========================================
    // 1. 士林觀光夜市 (台北市)
    // ==========================================
    {
        shopYeShi: '士林觀光夜市',
        shopName: '忠誠號蚵仔煎',
        shopNameEN: 'Zhongcheng Oyster Omelet',
        shopNumber: '大東路 15-32 號',
        shopType: '傳統熱炒小吃',
        shopLocation: '士林公有市場外側大東路段',
        shopIntroduction: '士林夜市五十年排隊老字號！嘉義東石每日清晨低溫直送肥美鮮蚵，粉漿煎得邊緣金黃酥脆，生炒花枝羹更是鑊氣撲鼻，勾芡酸甜順口。',
        shopShortIntroduction: '士林五十年老字號！東石鮮蚵與鑊氣生炒花枝羹。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3820,
        googlePlaceUrl: 'https://maps.google.com/?q=忠誠號蚵仔煎',
        specialties: ['招牌雞蛋蚵仔煎', '生炒花枝羹', '基隆廟口天婦羅'],
        food: [
            {
                foodName: '招牌雞蛋蚵仔煎',
                foodNameEN: 'Classic Oyster Omelet with Egg',
                foodPrice: 85,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '東石肥美鮮蚵搭配土雞蛋與有機小白菜，特調地瓜粉漿邊緣金黃焦脆，淋上鹹甜甘醇的獨門紅醬。',
                foodInfoEN: 'Fresh plump Dongshi oysters pan-fried with free-range egg, crispy batter edges, and sweet savory pink gravy.',
                rating: 4.8
            },
            {
                foodName: '生炒花枝羹',
                foodNameEN: 'Stir-Fried Thick Squid Stew',
                foodPrice: 90,
                foodType: ['海鮮鍋物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '生鮮厚切花枝以猛火大鼎快炒逼出焦香鑊氣，搭配鮮脆竹筍與五印醋，酸甜鮮香回甘。',
                foodInfoEN: 'Fresh thick-cut tender squid wok-charred on high flame with bamboo shoots and aromatic black vinegar broth.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '士林觀光夜市',
        shopName: '豪大大雞排',
        shopNameEN: 'Hot Star Large Fried Chicken',
        shopNumber: '基河路 115 號',
        shopType: '酥脆炸物',
        shopLocation: '陽明戲院斜對面基河路口',
        shopIntroduction: '風靡全球的士林排隊傳奇！堅持每日嚴選大規格溫體雞胸肉，以秘製中藥五香粉浸漬12小時，現炸起鍋比臉還大，鎖住豐沛肉汁。',
        shopShortIntroduction: '比臉還大的炸雞排始祖！外酥內嫩多汁豪邁。',
        shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 4210,
        googlePlaceUrl: 'https://maps.google.com/?q=豪大大雞排',
        specialties: ['豪大大特大雞排', '香酥魷魚鬚'],
        food: [
            {
                foodName: '豪大大特大雞排',
                foodNameEN: 'Hot Star XL Crispy Chicken Cutlet',
                foodPrice: 95,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                foodInfo: '比臉還大的金黃香脆多汁雞排，厚實肉質醃漬入味，撒上香濃白胡椒粉與特級辣椒粉。',
                foodInfoEN: 'Iconic oversized fried chicken breast, super crispy outer coating with bursting aromatic juices.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '士林觀光夜市',
        shopName: '海友十全排骨',
        shopNameEN: 'Hai You Herbal Pork Ribs',
        shopNumber: '大東路 107 號',
        shopType: '米其林必比登',
        shopLocation: '大東路中段 (慈諴宮媽祖廟旁)',
        shopIntroduction: '連續多年榮獲米其林必比登推薦！四十年堅持以熟地、枸杞、當歸等十五味天然中藥材，長時間大鍋文火慢燉豬肋骨，湯頭黑亮回甘不上火。',
        shopShortIntroduction: '米其林必比登推薦！四十年清甜甘潤十全藥燉排骨。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 5120,
        googlePlaceUrl: 'https://maps.google.com/?q=海友十全排骨',
        specialties: ['十全藥燉排骨', '古早味乾拌麵線'],
        food: [
            {
                foodName: '十全藥燉排骨',
                foodNameEN: 'Herbal Pork Ribs Soup',
                foodPrice: 110,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '15味嚴選漢方中藥材文火慢煨精選豬肋骨，湯色深邃黑金甘甜濃郁，排骨肉質軟嫩骨肉分離。',
                foodInfoEN: 'Slow-simmered pork ribs in a restorative herbal broth of 15 traditional Chinese roots and spices.',
                rating: 4.9
            }
        ]
    },

    // ==========================================
    // 2. 饒河街觀光夜市 (台北市)
    // ==========================================
    {
        shopYeShi: '饒河街觀光夜市',
        shopName: '福州世祖胡椒餅',
        shopNameEN: 'Fuzhou Ancestral Pepper Pork Bun',
        shopNumber: '饒河街 249 號攤位 (慈祐宮入口前)',
        shopType: '米其林必比登',
        shopLocation: '饒河夜市東側慈祐宮大牌坊正下方第一攤',
        shopIntroduction: '饒河夜市最具代表性的鎮街神店！炭烤赤肉餡搭配新鮮宜蘭三星蔥，現包現貼於近400度圓型炭火窯爐壁內烘烤，外皮香脆焦香、肉汁滾燙噴射。',
        shopShortIntroduction: '饒河街第一名排隊名物！炭火窯烤爆汁黑胡椒豬肉餡餅。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 6540,
        googlePlaceUrl: 'https://maps.google.com/?q=福州世祖胡椒餅',
        specialties: ['窯烤胡椒餅'],
        food: [
            {
                foodName: '窯烤胡椒餅',
                foodNameEN: 'Charcoal-Baked Black Pepper Pork Bun',
                foodPrice: 65,
                foodType: ['烤物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '高溫炭火泥窯現烤，表皮撒滿白芝麻金黃酥脆，內餡為大塊黑胡椒梅花肉與鮮甜青蔥。',
                foodInfoEN: 'Crispy charcoal-baked pastry stuffed with succulent black-peppercorn seasoned pork and green scallions.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '饒河街觀光夜市',
        shopName: '陳董藥燉排骨',
        shopNameEN: 'Chen Dong Herbal Pork Ribs',
        shopNumber: '饒河街 160 號',
        shopType: '米其林必比登',
        shopLocation: '饒河街夜市中段',
        shopIntroduction: '多次榮獲米其林必比登推薦，湯頭溫潤甘美，不帶絲毫苦味。排骨肉燉煮得軟嫩入味，沾上特製豆瓣辣椒醬油更是靈魂搭配。',
        shopShortIntroduction: '米其林必比登名店！藥燉排骨與藥燉羊肉湯。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 4500,
        googlePlaceUrl: 'https://maps.google.com/?q=陳董藥燉排骨',
        specialties: ['藥燉排骨', '藥燉羊肉', '香菇滷肉飯'],
        food: [
            {
                foodName: '陳董藥燉排骨',
                foodNameEN: 'Chen Dong Signature Herbal Pork Ribs',
                foodPrice: 95,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '特調漢方補湯長時間燉煮豬肋骨，湯頭溫潤清甜回甘，冬天暖胃、夏天溫補。',
                foodInfoEN: 'Tender pork ribs simmered in fragrant sweet herbal soup brewed with goji berries and angelica root.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 3. 寧夏夜市 (台北市)
    // ==========================================
    {
        shopYeShi: '寧夏夜市',
        shopName: '圓環邊蚵仔煎',
        shopNameEN: 'Roundabout Oyster Omelet',
        shopNumber: '寧夏路 46 號',
        shopType: '米其林必比登',
        shopLocation: '寧夏路中段 (靠近平陽街口)',
        shopIntroduction: '創立於1965年的老牌名攤，榮獲米其林必比登推薦！堅持嚴選台南七股與嘉義東石每日現採鮮蚵，搭配頂級土雞蛋與濃郁甘甜醬汁，蛋香與蚵香完美結合。',
        shopShortIntroduction: '傳承近六十年！米其林必比登推薦圓環邊鮮蚵煎。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 4890,
        googlePlaceUrl: 'https://maps.google.com/?q=圓環邊蚵仔煎',
        specialties: ['圓環邊雞蛋蚵仔煎', '蛤蜊湯'],
        food: [
            {
                foodName: '圓環邊雞蛋蚵仔煎',
                foodNameEN: 'Classic Michelin Bib Gourmand Oyster Omelet',
                foodPrice: 85,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '粒粒肥美的鮮蚵與紅殼土雞蛋大火煎香，粉漿焦脆Q彈，特調蒜蓉甜辣紅醬甜香無比。',
                foodInfoEN: 'Selected fresh coastal oysters pan-seared with farm eggs and greens, dressed in a signature sweet chili sauce.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '寧夏夜市',
        shopName: '劉芋仔蛋黃芋餅',
        shopNameEN: 'Liu Yu Zai Taro Balls',
        shopNumber: '寧夏夜市第 91 號攤位',
        shopType: '米其林必比登',
        shopLocation: '寧夏夜市人行徒步區中段',
        shopIntroduction: '寧夏夜市傳奇排隊王者！純手工採用高雄甲仙特產檳榔心芋頭，慢火蒸熟後壓成綿密芋泥，裹入黑豬肉肉鬆與金黃鹹蛋黃油炸，外酥內軟、鹹甜交織。',
        shopShortIntroduction: '米其林必比登推薦！甲仙純芋泥包鹹蛋黃肉鬆香酥芋餅。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3980,
        googlePlaceUrl: 'https://maps.google.com/?q=劉芋仔蛋黃芋餅',
        specialties: ['蛋黃芋餅', '香酥芋丸'],
        food: [
            {
                foodName: '蛋黃肉鬆芋餅',
                foodNameEN: 'Deep-Fried Taro Ball with Salted Egg Yolk & Pork Floss',
                foodPrice: 35,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '嚴選甲仙檳榔心芋純手工打泥，包入半顆紅土鹹鴨蛋黃與香濃黑豬肉脯，外皮金黃酥薄，內餡濃香。',
                foodInfoEN: 'Silky whipped Taiwanese taro paste wrapped around savory pork floss and rich salted duck egg yolk, fried to golden perfection.',
                rating: 4.9
            }
        ]
    },

    // ==========================================
    // 4. 南機場夜市 (台北市)
    // ==========================================
    {
        shopYeShi: '南機場夜市',
        shopName: '阿男麻油雞',
        shopNameEN: 'A-Nan Sesame Oil Chicken',
        shopNumber: '中華路二段 311 巷 34 號',
        shopType: '米其林必比登',
        shopLocation: '南機場夜市主街後段巷內',
        shopIntroduction: '南機場夜市公認人氣最高！多年米其林必比登推薦。每日現熬老薑與純黑麻油湯底，酒香清雅、湯頭甘甜順口不燥熱。整隻巨無霸仿土雞腿肉質彈牙細嫩，撕開肉汁四溢。',
        shopShortIntroduction: '米其林必比登推薦！甘甜溫潤去骨麻油雞腿湯與麻油麵線。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.8,
        googleReviewCount: 5200,
        googlePlaceUrl: 'https://maps.google.com/?q=阿男麻油雞',
        specialties: ['麻油雞腿湯', '麻油乾麵線', '麻油豬肝湯'],
        food: [
            {
                foodName: '招牌麻油雞腿湯',
                foodNameEN: 'Sesame Oil Chicken Drumstick Soup',
                foodPrice: 150,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '巨大仿土雞大雞腿肉質緊實Q彈，黑麻油與老薑慢火煸香，湯頭酒香清甜不嗆口。',
                foodInfoEN: 'Jumbo chicken leg simmered in pure black sesame oil, rice wine, and browned ginger slices.',
                rating: 4.9
            },
            {
                foodName: '手工麻油乾麵線',
                foodNameEN: 'Tossed Noodles in Sesame Oil',
                foodPrice: 40,
                foodType: ['傳統小吃'],
                foodIcon: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
                foodInfo: '手工日曬麵線燙得恰到好處，拌入香濃雞油、純黑麻油與油蔥酥，香氣撲鼻。',
                foodInfoEN: 'Handmade sun-dried wheat noodles tossed with aromatic chicken essence, golden shallots, and fragrant sesame oil.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '南機場夜市',
        shopName: '山內雞肉',
        shopNameEN: 'Shannaui Chicken Rice',
        shopNumber: '中華路二段 307 巷 20 號 (夜市牌坊入口)',
        shopType: '米其林必比登',
        shopLocation: '南機場夜市中華路主要入口第一家',
        shopIntroduction: '南機場門神！米其林必比登常勝軍。白斬雞肉皮脆肉滑帶有肉凍，淋上特製甜鹹蔥薑醬油膏，配上一碗澆了甘甜雞油的白米飯與下水湯，堪稱南機場最銷魂的平民盛宴。',
        shopShortIntroduction: '南機場門神名店！皮脆肉嫩白斬土雞肉飯與下水湯。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 4600,
        googlePlaceUrl: 'https://maps.google.com/?q=山內雞肉',
        specialties: ['山內雞肉飯', '蔥烤嫩土雞肉', '桂竹筍排骨湯'],
        food: [
            {
                foodName: '山內招牌雞肉飯',
                foodNameEN: 'Shannaui Poached Chicken Rice',
                foodPrice: 100,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '鮮美白斬放山土雞肉，肉質緊緻外皮晶亮帶凍，淋上古早味黑醬油，附香噴噴雞油飯。',
                foodInfoEN: 'Succulent poached farm chicken with collagen-rich skin, served with aromatic chicken-fat steamed rice and sweet soy sauce.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 5. 師大夜市 (台北市)
    // ==========================================
    {
        shopYeShi: '師大夜市',
        shopName: '師園鹽酥雞',
        shopNameEN: 'Shiyuan Fried Chicken',
        shopNumber: '師大路 39 巷 14 號',
        shopType: '酥脆炸物',
        shopLocation: '師大路美食街核心巷道內',
        shopIntroduction: '創立於1984年的師大三十年老牌鹹酥雞！首創加入大把生蒜碎與九層塔一同調味的蒜味鹹酥雞鼻祖。雞肉鮮嫩多汁，炸魷魚、甜不辣與四季豆也是必點絕配。',
        shopShortIntroduction: '師大四十年傳奇！蒜香九層塔鹹酥雞與炸魷魚圈。',
        shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.7,
        googleReviewCount: 6800,
        googlePlaceUrl: 'https://maps.google.com/?q=師園鹽酥雞',
        specialties: ['蒜香無骨鹽酥雞', '深海炸魷魚', '酥炸甜不辣'],
        food: [
            {
                foodName: '蒜香無骨鹽酥雞',
                foodNameEN: 'Signature Garlic Popcorn Chicken',
                foodPrice: 70,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                foodInfo: '嚴選去骨雞腿肉以特製蒜醬浸漬，高溫油炸後拌入大量雲林生蒜碎與九層塔，蒜香爆發。',
                foodInfoEN: 'Boneless tender chicken bites deep-fried to golden crunch, heavily tossed with fresh minced garlic and Taiwanese basil.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '師大夜市',
        shopName: '燈籠滷味',
        shopNameEN: 'Lantern Heated Braised Food',
        shopNumber: '師大路 43 號',
        shopType: '傳統熱炒小吃',
        shopLocation: '師大路主幹道醒目大紅燈籠店面',
        shopIntroduction: '師大學生多年來共同的宵夜回憶！滿滿幾十種食材排滿攤位，客人夾取後以甘醇老滷汁滾水燙熱，起鍋淋上特製蒜蓉沙茶醬汁、撒上大量酸菜與蔥花，香辣過癮。',
        shopShortIntroduction: '師大學生最愛！獨特中藥甘醇熱加熱滷味與王子麵。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 4100,
        googlePlaceUrl: 'https://maps.google.com/?q=燈籠滷味',
        specialties: ['熱滷味綜合拼盤', '秘製王子麵', '滷麻辣鴨血'],
        food: [
            {
                foodName: '秘醬熱滷味拼盤',
                foodNameEN: 'Heated Braised Delicacy Platter with Prince Noodles',
                foodPrice: 120,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '豆干、百頁、滷蛋、甜不辣與王子麵在漢方老滷中燙熱，淋上蒜蓉沙茶與客家酸菜，香濃誘人。',
                foodInfoEN: 'Assorted tofu, eggs, fishcakes, and noodles simmered fresh in rich herbal broth with pickled mustard and scallions.',
                rating: 4.7
            }
        ]
    },

    // ==========================================
    // 6. 臨江街觀光夜市 (通化夜市) (台北市)
    // ==========================================
    {
        shopYeShi: '臨江街觀光夜市 (通化夜市)',
        shopName: '梁記滷味',
        shopNameEN: 'Liang Ji Cold Braised Treats',
        shopNumber: '臨江街 39 巷 50 號',
        shopType: '米其林必比登',
        shopLocation: '通化夜市中段',
        shopIntroduction: '五十年老字號米其林必比登冷滷味名攤！以祖傳數十年老滷汁文火浸滷，食材色澤焦糖油亮、入味深邃。鴨翅、脆腸、海帶與百頁豆腐淋上微辣香油與酸菜，下酒配茶絕品。',
        shopShortIntroduction: '米其林必比登推薦！五十年祖傳焦糖香冷滷味。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3750,
        googlePlaceUrl: 'https://maps.google.com/?q=通化街梁記滷味',
        specialties: ['脆腸拼盤', '五香鴨翅', '百頁豆腐'],
        food: [
            {
                foodName: '祖傳秘製冷滷拼盤',
                foodNameEN: 'Heritage Cold Braised Platter',
                foodPrice: 130,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '嚴選鴨翅、脆腸與香Q米血，以中藥老滷浸透冷卻，淋上香濃辣油與特製酸菜，鹹香爽口。',
                foodInfoEN: 'Slow-marinated duck wings, crisp pork intestines, and rice cakes tossed with chili sesame oil and pickled greens.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '臨江街觀光夜市 (通化夜市)',
        shopName: '御品元冰火湯圓',
        shopNameEN: 'Yu Pin Yuan Fire & Ice Tangyuan',
        shopNumber: '通化街 39 巷 50 弄 31 號',
        shopType: '米其林必比登',
        shopLocation: '臨江街夜市巷弄內',
        shopIntroduction: '米其林必比登推薦必吃甜品！熱騰騰現煮的手工黑芝麻與花生大湯圓，鋪在綿密手挫碎冰上，淋上天然桂花蜜或酒釀，冰火雙重交融的極致口感令人驚艷。',
        shopShortIntroduction: '米其林必比登推薦！現煮熱湯圓配桂花挫冰之冰火雙重享受。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 6100,
        googlePlaceUrl: 'https://maps.google.com/?q=御品元冰火湯圓',
        specialties: ['桂花綜合冰火湯圓', '酒釀蛋花湯圓'],
        food: [
            {
                foodName: '桂花綜合冰火湯圓',
                foodNameEN: 'Fire & Ice Tangyuan with Osmanthus Honey',
                foodPrice: 90,
                foodType: ['甜點飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '滾燙現煮爆漿花生與芝麻湯圓，置於綿密刨冰上，淋滿自熬清香桂花蜜與檸檬汁，酸甜Q彈。',
                foodInfoEN: 'Piping hot sesame and peanut glutinous rice balls laid atop shaved ice, drizzled with fragrant floral osmanthus honey.',
                rating: 4.9
            }
        ]
    },

    // ==========================================
    // 7. 樂華夜市 (新北市)
    // ==========================================
    {
        shopYeShi: '樂華夜市',
        shopName: '阿爸の芋圓',
        shopNameEN: 'A-Ba Taro Balls',
        shopNumber: '保平路 18 巷 1 號',
        shopType: '甜品冰品',
        shopLocation: '樂華夜市保平路入口旁',
        shopIntroduction: '永和樂華夜市排隊打卡天王！首創以炭燒蔗糖製成獨特薄脆「蔗片冰」，鋪上滿滿綿密大甲芋泥、芋圓、白玉湯圓與黑糖粉圓，每一口都是濃郁的炭焙蔗香與芋頭甘甜。',
        shopShortIntroduction: '全台首創炭燒蔗片冰！極致大甲芋泥與白玉芋圓瀑布。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 7800,
        googlePlaceUrl: 'https://maps.google.com/?q=阿爸の芋圓',
        specialties: ['芋見泥蔗片冰', '芋頭白玉綜合湯圓'],
        food: [
            {
                foodName: '芋見泥綜合蔗片冰',
                foodNameEN: 'Taro Puree Charcoal Cane Shaved Ice',
                foodPrice: 145,
                foodType: ['甜點飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '一片片薄片狀炭燒蔗片冰，淋上厚實絲滑芋泥漿、手工芋球、Q彈芋圓與嫩仙草，甘甜爽脆。',
                foodInfoEN: 'Crispy charcoal-roasted cane sugar ice flakes crowned with thick taro puree, boba pearls, and chewy taro balls.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '樂華夜市',
        shopName: '郭記麻辣臭豆腐',
        shopNameEN: 'Guo Ji Spicy Stinky Tofu',
        shopNumber: '永平路 180 號',
        shopType: '傳統熱炒小吃',
        shopLocation: '樂華夜市中後段',
        shopIntroduction: '三十年老店，以純天然發酵臭豆腐與新鮮純鴨血，加入數十味漢方香料、小魚乾與香菇慢火熬煮麻辣湯底，豆腐孔洞吸飽湯汁，招牌油飯也是每桌必點。',
        shopShortIntroduction: '三十年麻辣名攤！孔洞飽滿麻辣臭豆腐鴨血與招牌油飯。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 3600,
        googlePlaceUrl: 'https://maps.google.com/?q=郭記麻辣臭豆腐',
        specialties: ['麻辣臭豆腐鴨血煲', '古早味招牌油飯'],
        food: [
            {
                foodName: '麻辣臭豆腐鴨血煲',
                foodNameEN: 'Spicy Stinky Tofu & Duck Blood Claypot',
                foodPrice: 90,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '多孔臭豆腐與滑嫩如果凍般的純鴨血，在麻辣醇厚的香菇小魚乾高湯中沸騰，香辣噴汁。',
                foodInfoEN: 'Porous stinky tofu and silky duck blood curd stewed in rich Sichuan peppercorn broth with dried anchovies.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 8. 三和夜市 (新北市)
    // ==========================================
    {
        shopYeShi: '三和夜市',
        shopName: '萬粒肉圓',
        shopNameEN: 'Wan Li Crispy Ba-Wan',
        shopNumber: '長元街 63 號',
        shopType: '傳統小吃',
        shopLocation: '三和夜市中央橫向巷道口',
        shopIntroduction: '三重在地人一致推崇的四十年老店！純米漿與地瓜粉打製外皮，低溫油泡至微脆Q彈，內餡包入大塊紮實紅糟胛心肉與鮮脆筍絲，淋上特製黑甜醬油與白甜醬，銅板價份量超實在。',
        shopShortIntroduction: '三重四十年古早味！低溫油泡香Q手工肉圓與貢丸湯。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 2900,
        googlePlaceUrl: 'https://maps.google.com/?q=萬粒肉圓',
        specialties: ['古早味香Q肉圓', '新竹貢丸湯'],
        food: [
            {
                foodName: '古早味油泡香Q肉圓',
                foodNameEN: 'Traditional Taiwanese Braised Pork Ba-Wan',
                foodPrice: 45,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '外皮晶瑩剔透彈牙，內餡包裹鮮嫩黑豬肉丁與爽脆筍丁，淋上雙色古法甘甜醬汁與蒜泥。',
                foodInfoEN: 'Translucent chewy tapioca dough filled with savory pork chunks and bamboo shoots, covered in sweet savory glaze.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '三和夜市',
        shopName: '朱記花枝羹米粉炒',
        shopNameEN: 'Zhu Ji Cuttlefish Stew & Fried Rice Noodles',
        shopNumber: '正義北路 51 號',
        shopType: '傳統熱炒小吃',
        shopLocation: '三和夜市周邊正義北路口',
        shopIntroduction: '只賣兩樣東西就紅遍三重近五十年！厚切生鮮大花枝手工裹上薄薄旗魚漿，湯頭以大骨與蘿蔔清甜熬煮，勾薄芡灑烏醋與芹菜；配上一盤淋滿油蔥肉燥的古早味米粉炒，百吃不厭。',
        shopShortIntroduction: '三重近半世紀傳奇！厚切彈牙花枝羹與香噴噴古法炒米粉。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3100,
        googlePlaceUrl: 'https://maps.google.com/?q=朱記花枝羹',
        specialties: ['生鮮花枝羹', '古早味炒米粉'],
        food: [
            {
                foodName: '鮮美厚切花枝羹',
                foodNameEN: 'Thick Cuttlefish Paste Soup',
                foodPrice: 90,
                foodType: ['海鮮鍋物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '咬得到整塊鮮脆花枝肉塊，清爽白蘿蔔高湯清甜無負擔，淋上一勺五印烏醋提鮮。',
                foodInfoEN: 'Plump chunky cuttlefish dumplings in clear radish broth spiced with fragrant Taiwanese black vinegar.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 9. 基隆廟口夜市 (基隆市)
    // ==========================================
    {
        shopYeShi: '基隆廟口夜市',
        shopName: '天一香肉羹順',
        shopNameEN: 'Tian Yi Xiang Braised Pork Rice & Pork Stew',
        shopNumber: '基隆廟口第 31 號攤位',
        shopType: '傳統小吃',
        shopLocation: '奠濟宮正前方精華地段第31號',
        shopIntroduction: '基隆廟口百年傳奇！被譽為基隆最強滷肉飯。細切帶皮五花肉丁長時間煨煮至膠質黏唇，澆在熱騰騰白飯上油亮甘醇，搭配一碗傳統清湯赤肉羹，是基隆人世代相傳的早點與宵夜。',
        shopShortIntroduction: '基隆百年殿堂級名攤！膠質爆棚古早味滷肉飯與手工肉羹。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 8200,
        googlePlaceUrl: 'https://maps.google.com/?q=天一香肉羹順',
        specialties: ['天一香百年滷肉飯', '手工赤肉羹湯', '滷鴨蛋'],
        food: [
            {
                foodName: '天一香百年滷肉飯',
                foodNameEN: 'Centennial Braised Minced Pork Rice',
                foodPrice: 35,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '帶皮黑豬五花肉切丁慢火煸油慢熬，醬色黑亮晶瑩，入口即化油脂黏嘴，配上滷透的鴨蛋絕頂美味。',
                foodInfoEN: 'Melt-in-your-mouth pork belly diced and simmered for hours in aged soy reduction over fragrant steamed rice.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '基隆廟口夜市',
        shopName: '阿華炒麵',
        shopNameEN: 'A-Hua Curry Fried Noodles',
        shopNumber: '愛四路 1-3 號',
        shopType: '特色麵食',
        shopLocation: '愛四路夜市尾端',
        shopIntroduction: '通宵排隊到凌晨六點的炒麵霸主！招牌什錦咖哩炒麵以港式咖哩粉與新鮮大骨高湯大火熱炒，配料包含肥嫩赤肉片、鮮蝦、蛤蜊與豬肝，咖哩醬汁濃郁稠滑包裹每一根油麵。',
        shopShortIntroduction: '全台最狂深夜排隊炒麵！鑊氣什錦咖哩烏龍炒麵。',
        shopIcon: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 7500,
        googlePlaceUrl: 'https://maps.google.com/?q=阿華炒麵',
        specialties: ['什錦咖哩炒麵', '肉絲咖哩烏龍麵', '豬肝蛤蜊湯'],
        food: [
            {
                foodName: '招牌什錦咖哩炒麵',
                foodNameEN: 'Seafood & Pork Curry Fried Noodles',
                foodPrice: 90,
                foodType: ['特色麵食', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
                foodInfo: '大火快炒特調黃咖哩醬，放入鮮蝦、蛤蜊、豬肝與肉片，香濃微辛醬汁均勻吸附在麵條上。',
                foodInfoEN: 'Wok-tossed noodles in rich savory yellow curry gravy loaded with fresh prawns, pork liver, and clams.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '基隆廟口夜市',
        shopName: '廟口營養三明治',
        shopNameEN: 'Keelung Nutritional Crispy Sandwich',
        shopNumber: '基隆廟口第 58 號攤位',
        shopType: '酥脆炸物',
        shopLocation: '廟口主街第58號攤',
        shopIntroduction: '基隆廟口叫號抽號碼牌的代表性名物！長條麵包裹上麵包粉炸至金黃酥脆，剪開夾入新鮮切片牛番茄、清脆小黃瓜、滷蛋與黑橋牌火腿，再擠入滿滿特調古早味香甜沙拉醬。',
        shopShortIntroduction: '廟口抽號碼牌名物！炸金黃脆皮長麵包包火腿滷蛋沙拉。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 5600,
        googlePlaceUrl: 'https://maps.google.com/?q=基隆廟口營養三明治',
        specialties: ['黃金營養三明治'],
        food: [
            {
                foodName: '黃金炸皮營養三明治',
                foodNameEN: 'Deep-Fried Golden Crispy Sandwich',
                foodPrice: 60,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '外皮金黃酥脆、麵包體鬆軟，夾入五香滷蛋、火腿、番茄與小黃瓜，搭配特調沙拉醬，甜香爽口。',
                foodInfoEN: 'Crumb-coated fried baguette filled with braised egg wedges, ham, fresh cucumber slices, and sweet mayonnaise.',
                rating: 4.7
            }
        ]
    },

    // ==========================================
    // 10. 中原夜市 (桃園市)
    // ==========================================
    {
        shopYeShi: '中原夜市',
        shopName: '御冠園鮮肉湯包',
        shopNameEN: 'Yu Guan Yuan Soup Dumplings',
        shopNumber: '實踐路 88 號 (實踐路與大仁五街口)',
        shopType: '特色麵食',
        shopLocation: '中原夜市十字核心轉角',
        shopIntroduction: '中原大學學生與在地饕客的最愛！透明櫥窗內十多位師傅現擀麵皮現包現蒸。外皮吹彈可破，一口咬下滾燙濃郁的黑豬肉湯汁瞬間噴射，沾點薑絲與特製辣椒醬油更是極致享受。',
        shopShortIntroduction: '中原夜市排隊王！皮薄如紙現蒸爆汁純手工鮮肉湯包。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 5300,
        googlePlaceUrl: 'https://maps.google.com/?q=御冠園鮮肉湯包',
        specialties: ['現蒸爆汁鮮肉湯包', '清甜冬瓜茶'],
        food: [
            {
                foodName: '現蒸爆汁手工鮮肉湯包',
                foodNameEN: 'Handmade Steamed Juicy Pork Xiao Long Bao',
                foodPrice: 70,
                foodType: ['特色麵食', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '一籠七顆現蒸出籠，薄皮透光，滿載三星蔥花與鮮甜溫體黑豬肉湯汁，鮮美無比。',
                foodInfoEN: 'Seven delicate steamed dumplings filled with savory pork broth and ground tenderloin, burst with every bite.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '中原夜市',
        shopName: '開運屋手工地瓜球',
        shopNameEN: 'Lucky Sweet Potato Balls',
        shopNumber: '日新路 99 號',
        shopType: '酥脆炸物',
        shopLocation: '中原夜市日新路上',
        shopIntroduction: '大鍋現炸地瓜球！老闆以巨大鐵網反覆下壓擠出空氣，炸出顆顆如乒乓球般巨大、外殼香脆金黃、內餡軟Q富彈性的雙色地瓜球，提供椒鹽、甘梅、起司多種調味粉自由搭配。',
        shopShortIntroduction: '乒乓球般巨大香脆！純手工大鐵網反覆壓炸雙色地瓜球。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3400,
        googlePlaceUrl: 'https://maps.google.com/?q=開運屋手工地瓜球',
        specialties: ['手工雙色巨無霸地瓜球'],
        food: [
            {
                foodName: '手工現壓雙色巨無霸地瓜球',
                foodNameEN: 'Crispy Chew Jumbo Sweet Potato Balls',
                foodPrice: 50,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '黃金地瓜與紫薯雙色調配，現炸酥脆空心帶有嚼勁，撒上酸甜梅子粉一口接一口停不下來。',
                foodInfoEN: 'Giant hollow crispy golden and purple sweet potato balls with a delightfully chewy center, dusted with plum powder.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 11. 新竹城隍廟夜市 (新竹市)
    // ==========================================
    {
        shopYeShi: '新竹城隍廟夜市',
        shopName: '阿城號米粉貢丸',
        shopNameEN: 'A-Cheng Centennial Rice Vermicelli & Meatballs',
        shopNumber: '中山路 75 號 (城隍廟戲台正下方)',
        shopType: '傳統小吃',
        shopLocation: '新竹城隍廟廟埕正中央',
        shopIntroduction: '自清末傳承五代的百年殿堂級老店！使用新竹九降風風乾純米粉，蒸得根根分明富嚼勁，淋上特製黑豬肉燥與蒜泥；新竹純手工捶打大貢丸咬下肉汁四溢，脆彈扎實全台第一。',
        shopShortIntroduction: '五代百年老字號！九降風新竹炊米粉與彈牙黑豬大摃丸。',
        shopIcon: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 6200,
        googlePlaceUrl: 'https://maps.google.com/?q=阿城號米粉',
        specialties: ['新竹炒炊米粉', '手工大摃丸湯', '紅糟肉圓'],
        food: [
            {
                foodName: '新竹九降風古早味炊米粉',
                foodNameEN: 'Hsinchu Sun-Dried Rice Vermicelli',
                foodPrice: 45,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
                foodInfo: '遵循古法風乾米粉，拌上油蔥香菇肉燥與新鮮豆芽菜，口感Q韌不軟爛，米香四溢。',
                foodInfoEN: 'Traditional Hsinchu wind-dried rice vermicelli topped with savory pork gravy, crispy shallots, and bean sprouts.',
                rating: 4.9
            },
            {
                foodName: '新竹手工爆汁大摃丸湯',
                foodNameEN: 'Handmade Springy Pork Meatball Soup',
                foodPrice: 50,
                foodType: ['傳統小吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '100%溫體黑豬後腿肉打漿製成，入口脆彈無粉感，骨高湯撒上芹菜與白胡椒粉，鮮甜爽口。',
                foodInfoEN: 'Extra-springy pork meatballs made from premium pork leg, served in clear bone broth with celery and white pepper.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '新竹城隍廟夜市',
        shopName: '郭家潤餅',
        shopNameEN: 'Guo Family Popiah Scallion Roll',
        shopNumber: '中山路 75 號城隍廟入口外',
        shopType: '傳統小吃',
        shopLocation: '新竹城隍廟大門口右手邊第一家',
        shopIntroduction: '創立於清末光緒年間，超過百年歷史的手工潤餅名店！自製超薄透富韌性的麵皮，捲入咖哩燜煮高麗菜、紅糟肉、豆干、香脆蛋酥與特製花生粉糖粉，清爽又飽足。',
        shopShortIntroduction: '百年傳承！現做超薄餅皮包咖哩高麗菜與香脆蛋酥潤餅。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 4500,
        googlePlaceUrl: 'https://maps.google.com/?q=郭家潤餅',
        specialties: ['百年古法手工潤餅捲'],
        food: [
            {
                foodName: '百年古法手工潤餅捲',
                foodNameEN: 'Century-Old Traditional Taiwanese Spring Roll',
                foodPrice: 45,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '薄韌手拉餅皮，包覆咖哩燉高麗菜、豆干絲、現炸蛋酥、紅糟肉與花生糖粉，鹹甜爽脆層次豐富。',
                foodInfoEN: 'Paper-thin wheat crepe wrapped around curry-stewed cabbage, crispy egg crisp, seasoned pork, and fragrant peanut sugar.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 12. 逢甲夜市 (台中市)
    // ==========================================
    {
        shopYeShi: '逢甲夜市',
        shopName: '明倫蛋餅',
        shopNameEN: 'Ming Lun Egg Pancake',
        shopNumber: '福星路 546 號',
        shopType: '傳統小吃',
        shopLocation: '逢甲福星路人行熱點',
        shopIntroduction: '彰化員林1978年創立紅到逢甲的排隊神話！以獨家調配粉漿現倒於鐵板上旋轉攤開，打上一顆新鮮土雞蛋與大把三星蔥花，淋上招牌特調甜辣醬，餅皮外脆內軟、蔥香撲鼻。',
        shopShortIntroduction: '逢甲排隊傳奇！特調古早味現煎粉漿甜辣蔥花蛋餅。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 6300,
        googlePlaceUrl: 'https://maps.google.com/?q=明倫蛋餅',
        specialties: ['明倫招牌甜辣蛋餅', '胡椒蔥花蛋餅'],
        food: [
            {
                foodName: '明倫招牌特製甜辣蛋餅',
                foodNameEN: 'Ming Lun Traditional Batter Scallion Egg Pancake',
                foodPrice: 50,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '古法粉漿高溫鐵板慢煎，捲入鮮甜青蔥花與雞蛋，淋上獨門甘甜微辣紅醬，軟嫩帶微脆。',
                foodInfoEN: 'Soft and crispy freshly griddled batter pancake rolled with scallions and egg, coated in signature sweet-chili relish.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '逢甲夜市',
        shopName: '官芝霖大腸包小腸',
        shopNameEN: 'Guan Zhi Lin Sausage in Rice Sausage',
        shopNumber: '逢甲路 20 巷口',
        shopType: '炭烤串燒',
        shopLocation: '逢甲大學正門口主幹道轉角',
        shopIntroduction: '逢甲夜市大腸包小腸創始老牌！炭火慢烤飽滿厚實黑豬肉香腸與手工炭烤糯米腸，縱向切開夾入蒜頭、小黃瓜絲、酸菜、菜脯與黑胡椒醬，一口咬下多層次肉汁四溢。',
        shopShortIntroduction: '逢甲名氣最響排隊店！炭烤糯米腸包爆汁香腸加配料。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.5,
        googleReviewCount: 7100,
        googlePlaceUrl: 'https://maps.google.com/?q=官芝霖大腸包小腸',
        specialties: ['原味大腸包小腸', '黑胡椒蒜香大腸包小腸'],
        food: [
            {
                foodName: '黑胡椒蒜香大腸包小腸',
                foodNameEN: 'Charcoal Pork Sausage in Sticky Rice Sausage',
                foodPrice: 65,
                foodType: ['烤物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '炭火慢烤香Q糯米腸包夾多汁黑豬肉香腸，夾入新鮮大蒜片、酸菜與小黃瓜絲，淋上黑胡椒醬。',
                foodInfoEN: 'Smoky grilled Taiwanese pork sausage tucked inside a charred glutinous rice sausage, stuffed with pickled cabbage and raw garlic.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '逢甲夜市',
        shopName: '日船章魚小丸子',
        shopNameEN: 'Japan Boat Takoyaki',
        shopNumber: '文華路 13 號 (逢甲旗艦總店)',
        shopType: '酥脆炸物',
        shopLocation: '逢甲夜市旗艦廣場入口處',
        shopIntroduction: '全台日船章魚小丸子的創始旗艦總店！門口巨大金黃章魚立體雕塑是逢甲地標。大鐵板上快速翻轉燒烤，外殼金黃酥脆，內餡包裹鮮嫩深海章魚塊，淋上特製芥末美乃滋與跳動柴魚片。',
        shopShortIntroduction: '全台日船旗艦總店！外酥內嫩彈牙深海章魚燒與跳舞柴魚。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 5900,
        googlePlaceUrl: 'https://maps.google.com/?q=日船章魚小丸子逢甲總店',
        specialties: ['招牌芥末章魚燒', '原味柴魚章魚小丸子'],
        food: [
            {
                foodName: '招牌芥末柴魚章魚小丸子',
                foodNameEN: 'Crispy Takoyaki Octopus Balls with Wasabi & Bonito',
                foodPrice: 55,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '金黃圓滾章魚球包入彈脆章魚丁，刷上醇厚蒲燒醬，擠上微嗆芥末美乃滋，撒上舞動柴魚片。',
                foodInfoEN: 'Golden crispy batter spheres stuffed with diced octopus, brushed with sweet tare sauce, wasabi mayo, and bonito flakes.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 13. 一中街夜市 (台中市)
    // ==========================================
    {
        shopYeShi: '一中街夜市',
        shopName: '一中豪大雞排',
        shopNameEN: 'Yizhong Hao Da Fried Chicken',
        shopNumber: '一中街 49 號 (水利大樓前)',
        shopType: '酥脆炸物',
        shopLocation: '一中水利大樓正前方廣場',
        shopIntroduction: '台中學子回憶殺！比臉大超厚雞排，金黃酥脆的外皮裹著鮮嫩滾燙的雞汁，咬下去咔滋作響，是逛一中商圈人手一份的標配。',
        shopShortIntroduction: '一中商圈地標排隊王！咔滋超脆厚切大雞排。',
        shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 5400,
        googlePlaceUrl: 'https://maps.google.com/?q=一中豪大雞排',
        specialties: ['香酥大雞排', '甘梅地瓜條'],
        food: [
            {
                foodName: '一中香酥特大雞排',
                foodNameEN: 'Yizhong Signature Giant Fried Chicken Cutlet',
                foodPrice: 90,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                foodInfo: '溫體厚切雞胸肉以特製香料醃漬，外層地瓜粉酥脆不油膩，肉汁充沛。',
                foodInfoEN: 'Thick marinated chicken cutlet double-dredged and deep-fried to maximum crunchiness with juicy interior.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '一中街夜市',
        shopName: '豐味綠豆沙牛乳專門店',
        shopNameEN: 'Feng Wei Mung Bean Smoothie Milk',
        shopNumber: '太平路 63 巷 1 號',
        shopType: '甜品飲品',
        shopLocation: '一中街主要巷道內',
        shopIntroduction: '一中街必喝排隊手搖第一名！綠豆慢火細熬後以高速冰沙機打成極致細緻綿密的冰沙，倒入大量紐西蘭純鮮奶或純黑糖珍珠，沁涼濃醇解暑。',
        shopShortIntroduction: '一中街最強消暑聖品！絲滑綿密純鮮奶綠豆沙冰沙。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 6100,
        googlePlaceUrl: 'https://maps.google.com/?q=豐味綠豆沙牛乳專門店',
        specialties: ['純鮮奶綠豆沙', '珍珠綠豆沙牛乳'],
        food: [
            {
                foodName: '純鮮奶綠豆沙冰沙',
                foodNameEN: 'Silky Mung Bean Smoothie with Fresh Milk',
                foodPrice: 55,
                foodType: ['飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '天然綠豆熬煮打成如冰淇淋般綿密的細緻冰沙，融合香濃純鮮乳，濃郁順口。',
                foodInfoEN: 'Velvety smooth mung bean slush blended with rich whole fresh milk, creamy and refreshing.',
                rating: 4.9
            }
        ]
    },

    // ==========================================
    // 14. 旱溪夜市 (台中市)
    // ==========================================
    {
        shopYeShi: '旱溪夜市',
        shopName: '方臉師傅蒜香豆干',
        shopNameEN: 'Master Square Face Garlic Braised Tofu',
        shopNumber: '旱溪夜市第一排核心攤位',
        shopType: '傳統熱炒小吃',
        shopLocation: '旱溪夜市入口第一排最亮眼攤位',
        shopIntroduction: '旱溪夜市公認排隊排到天荒地老的冠軍名攤！大鍋熱滾滾的特厚大黑豆干切出菱格花紋，充分吸收中藥滷汁，起鍋淋上濃烈爆香蒜泥、蔥花與特製沙茶辣醬，一咬滾燙噴汁。',
        shopShortIntroduction: '旱溪夜市最強排隊王！吸飽滷汁爆汁大蒜沙茶黑豆干。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 4800,
        googlePlaceUrl: 'https://maps.google.com/?q=方臉師傅蒜香豆干',
        specialties: ['蒜香大黑豆干', '三合一綜合滷味 (豆干米血百頁)'],
        food: [
            {
                foodName: '招牌蒜香熱滷黑豆干',
                foodNameEN: 'Garlic Savory Braised Black Tofu',
                foodPrice: 65,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '多孔大黑豆干在漢方大鍋滷得透徹入味，盛碗淋上滿滿特濃生蒜泥、九層塔與特製紅辣油，鹹香濃郁。',
                foodInfoEN: 'Chunky braised black tofu cubes drenched in fragrant garlic puree, chili oil, and savory herb broth.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '旱溪夜市',
        shopName: '善導寺炭烤玉米',
        shopNameEN: 'Charcoal Roasted Sweet Corn',
        shopNumber: '旱溪夜市美食第二排',
        shopType: '炭烤串燒',
        shopLocation: '旱溪夜市中段美食街',
        shopIntroduction: '純天然木炭慢火旋轉慢烤！精選雲林產地直送甜白玉米，刷上厚厚四層祖傳沙茶醬、花生芝麻醬與古法純釀醬油，炭烤香氣隔三條街都能聞到。',
        shopShortIntroduction: '純木炭現烤！多層次沙茶花生芝麻醬古早味烤玉米。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3100,
        googlePlaceUrl: 'https://maps.google.com/?q=旱溪夜市烤玉米',
        specialties: ['炭烤沙茶甜玉米', '椒鹽辣味烤玉米'],
        food: [
            {
                foodName: '祖傳沙茶炭烤甜玉米',
                foodNameEN: 'Charcoal Grilled Corn with Shacha Peanut Glaze',
                foodPrice: 70,
                foodType: ['烤物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '白玉米粒粒飽滿Q彈，炭火慢烤翻滾刷醬，醬香濃郁焦香誘人。',
                foodInfoEN: 'Whole fresh sweet corn on cob roasted over glowing charcoal and generously glazed with savory shacha sesame sauce.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 15. 精誠夜市 (高貴林夜市) (彰化縣)
    // ==========================================
    {
        shopYeShi: '精誠夜市 (高貴林夜市)',
        shopName: '祥旺地瓜球',
        shopNameEN: 'Xiang Wang Sweet Potato Balls',
        shopNumber: '精誠夜市正門入口第一排',
        shopType: '酥脆炸物',
        shopLocation: '精誠夜市林森路入口旁',
        shopIntroduction: '彰化在地人無人不知的地瓜球神攤！巨型大油鍋內師傅使勁壓油，炸出比一般地瓜球大上一倍的香酥地瓜球，香甜天然地瓜香氣，外皮極酥、內餡帶Q彈軟心。',
        shopShortIntroduction: '彰化夜市地瓜球天花板！大鍋現炸巨無霸酥脆地瓜球。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 3800,
        googlePlaceUrl: 'https://maps.google.com/?q=祥旺地瓜球精誠夜市',
        specialties: ['手工巨無霸地瓜球'],
        food: [
            {
                foodName: '金黃超酥脆手工地瓜球',
                foodNameEN: 'Golden Extra-Crisp Sweet Potato Balls',
                foodPrice: 50,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '大鍋現壓油炸，外殼金黃極致酥脆，內心彈牙軟Q，滿滿天然地瓜甘甜。',
                foodInfoEN: 'Freshly deep-pressed giant sweet potato balls, ultra-crispy exterior with delightfully chewy center.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '精誠夜市 (高貴林夜市)',
        shopName: '松林現烤蔥油餅',
        shopNameEN: 'Song Lin Scallion Pancake',
        shopNumber: '精誠夜市中央美食街',
        shopType: '傳統小吃',
        shopLocation: '精誠夜市中心走道',
        shopIntroduction: '大張圓形蔥油餅在平底大油鍋上翻煎，滿滿彰化在地新鮮脆蔥，餅皮半煎炸得層次分明、金黃香酥，撒上特調椒鹽粉，熱呼呼咬下滿嘴蔥香。',
        shopShortIntroduction: '手工現擀現煎！層層薄酥噴香千層青蔥蔥油餅。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 2600,
        googlePlaceUrl: 'https://maps.google.com/?q=松林蔥油餅精誠夜市',
        specialties: ['香酥千層蔥油餅', '現加土雞蛋九層塔蔥油餅'],
        food: [
            {
                foodName: '香酥千層九層塔蔥油餅',
                foodNameEN: 'Flaky Scallion & Basil Pancake with Egg',
                foodPrice: 55,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '手工揉擀千層麵皮，夾入現摘九層塔葉與滑嫩雞蛋，外皮金黃焦香，胡椒鹽提味極佳。',
                foodInfoEN: 'Multi-layered flaky griddled flatbread stuffed with fresh green scallions, egg, and fragrant Taiwanese basil leaves.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 16. 草鞋墩人文觀光夜市 (南投縣)
    // ==========================================
    {
        shopYeShi: '草鞋墩人文觀光夜市',
        shopName: '阿里山鐵道紅茶',
        shopNameEN: 'Alishan Railway Black Tea',
        shopNumber: '草鞋墩夜市入口廣場',
        shopType: '甜品飲品',
        shopLocation: '草鞋墩夜市演藝場旁',
        shopIntroduction: '以南投在地與阿里山特級大麥蜜香紅茶葉現熬茶湯，遵循古法添加天然二砂糖，茶香厚實回甘不苦澀，搭配新鮮光泉鮮乳做成鮮奶茶，是草鞋墩夜市最受歡迎的人氣手搖飲。',
        shopShortIntroduction: '南投高山茶香！古早味大麥蜜香紅茶與濃醇鮮奶茶。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 2400,
        googlePlaceUrl: 'https://maps.google.com/?q=阿里山鐵道紅茶草鞋墩',
        specialties: ['古早味蜜香紅茶', '高山鐵道鮮奶茶'],
        food: [
            {
                foodName: '古法大麥蜜香紅茶',
                foodNameEN: 'Traditional Malted Alishan Black Tea',
                foodPrice: 35,
                foodType: ['飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '高山焙火紅茶結合大麥香氣，天然蔗糖調製微甜，清涼生津解渴。',
                foodInfoEN: 'Slow-brewed high-mountain black tea infused with roasted barley and natural cane sugar, refreshing and aromatic.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '草鞋墩人文觀光夜市',
        shopName: '草屯大排檔蒙古烤肉',
        shopNameEN: 'Caotun Mongolian BBQ Stir-Fry',
        shopNumber: '草鞋墩夜市後端熱炒區',
        shopType: '傳統熱炒小吃',
        shopLocation: '草鞋墩夜市後方座位區',
        shopIntroduction: '巨型圓形大鐵板上多把長筷飛舞快炒！客人自己夾取堆得像小山一樣的高麗菜、空心菜、豆芽菜與牛羊豬肉片，加上特調沙茶醬、蒜泥與九層塔，大火翻炒香氣逼人，白飯熱湯冬瓜茶無限暢飲。',
        shopShortIntroduction: '大鐵板翻飛快炒！牛羊豬肉蔬菜隨你夾熱炒蒙古烤肉。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 2100,
        googlePlaceUrl: 'https://maps.google.com/?q=草鞋墩蒙古烤肉',
        specialties: ['蒙古烤肉大拼盤', '白飯湯品無限享用'],
        food: [
            {
                foodName: '大鼎鐵板現炒蒙古烤肉',
                foodNameEN: 'Round Iron Griddle Mongolian Stir-Fried Beef & Greens',
                foodPrice: 170,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '圓型鐵板高溫爆炒肉片與大量鮮蔬，淋上蒜辣沙茶醬，鑊氣十足超下飯。',
                foodInfoEN: 'Heaping bowl of tender sliced beef, pork, and mountain greens sizzled over a giant round hot griddle with shacha garlic sauce.',
                rating: 4.7
            }
        ]
    },

    // ==========================================
    // 17. 斗六人文夜市 (雲林縣)
    // ==========================================
    {
        shopYeShi: '斗六人文夜市',
        shopName: '雅淳水果茶',
        shopNameEN: 'Ya Chun Fresh Fruit Tea',
        shopNumber: '斗六人文夜市主要走道中央',
        shopType: '甜品飲品',
        shopLocation: '斗六夜市大排長龍的核心攤位',
        shopIntroduction: '斗六人文夜市最具代表性的熱帶水果茶！現場大銅鍋內以新鮮金鑽鳳梨切塊與砂糖長時間熬煮，熱氣蒸騰出濃郁無比的果香。搭配蘋果、百香果與現泡高山綠茶，每一口都喝得到真材實料的鳳梨果肉。',
        shopShortIntroduction: '大銅鍋現場熬煮！金鑽鳳梨現熬天然果茶與鳳梨冰茶。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.8,
        googleReviewCount: 4200,
        googlePlaceUrl: 'https://maps.google.com/?q=雅淳水果茶斗六',
        specialties: ['現熬金鑽鳳梨水果茶', '鳳梨冰茶'],
        food: [
            {
                foodName: '現熬金鑽鳳梨水果茶',
                foodNameEN: 'Hand-Brewed Fresh Pineapple Fruit Tea',
                foodPrice: 60,
                foodType: ['飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '整鍋金鑽鳳梨現煮果醬，調和百香果與綠茶，果香酸甜濃郁，消暑解膩第一名。',
                foodInfoEN: 'Fresh Taiwanese pineapples slow-cooked in copper pots with natural cane sugar, mixed with green tea and passion fruit pulp.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '斗六人文夜市',
        shopName: '豆乳雞翅大王',
        shopNameEN: 'Fermented Bean Curd Chicken Wings',
        shopNumber: '斗六人文夜市美食第三街',
        shopType: '酥脆炸物',
        shopLocation: '斗六夜市炸物集中區',
        shopIntroduction: '雲林傳統甘甜豆腐乳醃漬特製！雞翅醃得透骨香，金黃酥脆的薄麵衣包裹著燙口軟嫩的雞肉，咬下去散發淡淡豆乳甘香，連骨頭都香酥有味。',
        shopShortIntroduction: '古法甘醇豆腐乳醃漬！金黃酥脆爆汁豆乳雞翅與雞米花。',
        shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 2900,
        googlePlaceUrl: 'https://maps.google.com/?q=斗六夜市豆乳雞翅',
        specialties: ['酥脆豆乳雞翅', '無骨豆乳雞米花'],
        food: [
            {
                foodName: '古早味爆汁豆乳雞翅',
                foodNameEN: 'Fermented Bean Curd Marinated Crispy Chicken Wings',
                foodPrice: 25,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                foodInfo: '以台灣在地陳年豆腐乳浸漬溫體雞翅，起鍋外皮極脆，肉質軟嫩甘甜帶汁。',
                foodInfoEN: 'Chicken wings soaked in sweet savory fermented bean curd marinade and fried golden crisp with aromatic finish.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 18. 嘉義文化路夜市 (嘉義市)
    // ==========================================
    {
        shopYeShi: '嘉義文化路夜市',
        shopName: '林聰明沙鍋魚頭',
        shopNameEN: 'Smart Fish Head Casserole',
        shopNumber: '中正路 361 號 (文化路轉角)',
        shopType: '米其林必比登',
        shopLocation: '文化路夜市中正路交叉口',
        shopIntroduction: '揚名國際躍上Netflix紀錄片的嘉義代表作！傳承三代七十年老店，大鍋慢熬十小時大骨濃湯，加入大量大白菜、金針、豆皮、黑木耳與厚切三層肉，拌入特製沙茶醬與微甜辣醬，炸得金黃酥脆的大頭活鰱魚頭吸飽濃郁湯汁，鮮香無匹。',
        shopShortIntroduction: 'Netflix登上國際！七十年老字號沙茶大骨濃湯沙鍋魚頭。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 15200,
        googlePlaceUrl: 'https://maps.google.com/?q=林聰明沙鍋魚頭',
        specialties: ['經典沙鍋菜加魚肉', '太陽蛋滷肉飯', '冬菜蝦仁蛋湯'],
        food: [
            {
                foodName: '林聰明經典沙鍋菜魚肉煲',
                foodNameEN: 'Smart Fish Classic Fish Head & Veggie Claypot',
                foodPrice: 130,
                foodType: ['海鮮鍋物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '高湯慢煨甘甜大白菜與豆皮，融入自製香濃沙茶醬，搭配酥炸大頭鰱魚排，鮮甜香辣回味無窮。',
                foodInfoEN: 'Rich slow-braised napa cabbage, tofu skin, and deep-fried fresh carp fillet in rich pork bone shacha broth.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '嘉義文化路夜市',
        shopName: '郭家火雞肉飯',
        shopNameEN: 'Guo Family Turkey Rice',
        shopNumber: '文化路 148 號',
        shopType: '傳統小吃',
        shopLocation: '文化路夜市核心正中央',
        shopIntroduction: '百年傳承的嘉義道地火雞肉飯！手撕新鮮鮮嫩火雞肉片肉丁，鋪在粒粒分明熱騰騰白米飯上，淋上香濃醇厚火雞油與特調甘醇醬油露，油亮誘人，配上一碗招牌手工糯米大腸與下水湯，純樸美味。',
        shopShortIntroduction: '嘉義百年正宗！手撕鮮嫩火雞肉飯與手工糯米腸。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 8800,
        googlePlaceUrl: 'https://maps.google.com/?q=郭家火雞肉飯',
        specialties: ['道地火雞肉飯', '古早味糯米大腸', '鮮脆下水湯'],
        food: [
            {
                foodName: '正宗嘉義火雞肉飯',
                foodNameEN: 'Authentic Chiayi Shredded Turkey Rice',
                foodPrice: 50,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '多汁火雞腿肉丁與胸肉絲，淋上特製雞蔥油與古法醬汁，香氣撲鼻油而不膩。',
                foodInfoEN: 'Steamed premium rice topped with hand-pulled succulent turkey meat, rendered turkey fat, and aromatic shallot glaze.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '嘉義文化路夜市',
        shopName: '源興御香屋',
        shopNameEN: 'Yu Hsiang Wu Grapefruit Green Tea',
        shopNumber: '中山路 321 號 (文化路噴水池圓環旁)',
        shopType: '甜品飲品',
        shopLocation: '嘉義噴水池圓環文化路口第一家',
        shopIntroduction: '全台灣名氣最響亮的在地手搖排隊王！招牌紅鑽葡萄柚綠茶以純手工現挖大量新鮮紅柚果肉，搭配天然梅子與回甘高山綠茶，酸甜果肉爆汁，每一口都是滿滿果粒。',
        shopShortIntroduction: '全台手搖傳奇！手工現挖滿杯紅鑽葡萄柚綠茶加梅子。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.8,
        googleReviewCount: 9600,
        googlePlaceUrl: 'https://maps.google.com/?q=源興御香屋',
        specialties: ['紅鑽葡萄柚綠茶', '柳丁翡翠綠茶'],
        food: [
            {
                foodName: '招牌紅鑽葡萄柚綠茶',
                foodNameEN: 'Signature Ruby Grapefruit Green Tea with Plum',
                foodPrice: 65,
                foodType: ['飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '半杯滿滿新鮮現挖紅寶石葡萄柚果粒，調和嚴選高山綠茶與酸甜梅子，甘甜爽口不苦澀。',
                foodInfoEN: 'Freshly peeled ruby red grapefruit pulp loaded into premium mountain green tea with a preserved sour plum.',
                rating: 4.9
            }
        ]
    },

    // ==========================================
    // 19. 花園夜市 (台南市)
    // ==========================================
    {
        shopYeShi: '花園夜市',
        shopName: '二師兄古早味滷味',
        shopNameEN: 'Second Senior Brother Traditional Braised Meats',
        shopNumber: '花園夜市排隊第一排',
        shopType: '傳統熱炒小吃',
        shopLocation: '花園夜市海安路端大入口正中央',
        shopIntroduction: '台南花園夜市招牌門面！多只大鐵鍋在現場冒著濃郁甜香蒸氣，以三杯醬汁大火翻炒熱滾三杯米血、甘蔗老滷蜜汁雞胗、小棒棒腿與鳥蛋，色澤深邃油亮，甜鹹鑊氣迷人無比。',
        shopShortIntroduction: '花園夜市無敵排隊王！大鐵鍋現場翻炒鑊氣三杯米血與蜜汁雞爪。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 6800,
        googlePlaceUrl: 'https://maps.google.com/?q=二師兄古早味滷味',
        specialties: ['三杯熱滷米血', '蜜汁雞胗', '醬燒鳥蛋', '香辣棒棒腿'],
        food: [
            {
                foodName: '二師兄三杯古早味米血',
                foodNameEN: 'Three-Cup Basil Glazed Rice Blood Cake',
                foodPrice: 50,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '手工純米血軟糯Q彈，在大鍋中以黑麻油、老薑、九層塔與特製焦糖三杯醬熱炒裹醬，香濃入味。',
                foodInfoEN: 'Soft chewy Taiwanese sticky rice cake chunks stir-fried in cast-iron pots with sesame oil, ginger, basil, and caramelized soy glaze.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '花園夜市',
        shopName: '統大炭烤香雞排',
        shopNameEN: 'Tong Da Charcoal Glazed Fried Chicken',
        shopNumber: '花園夜市第二排美食區',
        shopType: '酥脆炸物',
        shopLocation: '花園夜市美食街第二條走道',
        shopIntroduction: '台南炭烤雞排始祖！大塊雞排裹上地瓜粉炸至金黃半熟，隨即浸入特調台南甘甜烤醬，再移至炭火烤爐上雙面炭烤，外皮裹上焦糖炭香微甜醬汁，肉汁滾燙誘人。',
        shopShortIntroduction: '先炸後炭烤！裹上焦糖蜜醬與胡椒香炭烤大雞排。',
        shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 5200,
        googlePlaceUrl: 'https://maps.google.com/?q=統大炭烤香雞排',
        specialties: ['炭烤香雞排', '炭烤香酥甜不辣'],
        food: [
            {
                foodName: '統大蜜汁炭烤香雞排',
                foodNameEN: 'Charcoal Honey Glazed Fried Chicken Cutlet',
                foodPrice: 85,
                foodType: ['烤物', '炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                foodInfo: '高溫炸酥後浸入台南特製甜醬，炭火翻烤逼出炭焙焦香，撒上檸檬汁與胡椒，酸甜鹹香肉汁四溢。',
                foodInfoEN: 'Deep-fried chicken breast dipped in sweet Tainan barbecue glaze and finished over live charcoal grill.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '花園夜市',
        shopName: '陳記麻辣鴨血',
        shopNameEN: 'Chen Ji Spicy Duck Blood & Fish Balls',
        shopNumber: '花園夜市美食第一排',
        shopType: '傳統小吃',
        shopLocation: '花園夜市第一條美食街中段',
        shopIntroduction: '花園夜市最醒目的大紅招牌排隊神攤！數十個大鐵鍋沸騰著秘製四川麻辣湯頭，滑嫩如果不見孔洞的新鮮鴨血吸飽麻香湯底，配上彈牙港式魚蛋與黃金魚豆腐，湯鮮麻香而不嗆辣。',
        shopShortIntroduction: '大鍋沸騰麻香！滑嫩如果凍之純麻辣鴨血與港式魚蛋。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 4600,
        googlePlaceUrl: 'https://maps.google.com/?q=陳記麻辣鴨血花園夜市',
        specialties: ['綜合麻辣鴨血魚蛋煲', '麻辣魚豆腐煲'],
        food: [
            {
                foodName: '綜合麻辣鴨血魚蛋煲',
                foodNameEN: 'Spicy Duck Blood & Fishball Medley',
                foodPrice: 90,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '如果凍般滑順的大塊純鴨血，搭配彈脆小魚蛋與嫩豆腐，在花椒紅油中滾燙入味，香辣微麻。',
                foodInfoEN: 'Silky smooth duck blood curd and springy fish balls simmered in aromatic Sichuan peppercorn red broth.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 20. 大東夜市 (台南市)
    // ==========================================
    {
        shopYeShi: '大東夜市',
        shopName: '紅妃香腸大腸',
        shopNameEN: 'Hong Fei Sausage & Intestine Stir-Fry',
        shopNumber: '大東夜市第一條美食大道',
        shopType: '傳統熱炒小吃',
        shopLocation: '大東夜市主要入口醒目攤位',
        shopIntroduction: '大東夜市永遠大排長龍的招牌熱炒攤！整根手工炭烤黑豬肉香腸與糯米腸斜切後，丟入大鐵板上與大把九層塔、大蒜、洋蔥與辣椒大火快炒，起鍋撒上黑胡椒與特調甜醬油膏，配上醃小黃瓜解膩，下酒神物。',
        shopShortIntroduction: '大鐵板九層塔爆炒！香腸切塊炒大腸配蒜頭小黃瓜。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 4300,
        googlePlaceUrl: 'https://maps.google.com/?q=紅妃香腸大腸大東夜市',
        specialties: ['鐵板熱炒大腸包小腸', '香脆醃小黃瓜'],
        food: [
            {
                foodName: '鐵板九層塔熱炒大腸香腸',
                foodNameEN: 'Sizzling Stir-Fried Sausage & Sticky Rice Intestine',
                foodPrice: 100,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '炭火慢烤香腸糯米腸切片，與大量大蒜片、九層塔與特製醬油膏在大平底鍋上大火爆炒，鑊氣十足。',
                foodInfoEN: 'Sliced Taiwanese pork sausage and glutinous rice sausage flash-fried on hot plate with heaps of fresh basil, garlic, and savory glaze.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '大東夜市',
        shopName: '膳品香酥排骨',
        shopNameEN: 'Shan Pin Crispy Boneless Spare Ribs',
        shopNumber: '大東夜市第二美食排',
        shopType: '酥脆炸物',
        shopLocation: '大東夜市美食中段',
        shopIntroduction: '無骨排骨酥名攤！精選新鮮軟嫩豬小排去骨切丁，特製中藥蒜汁深層醃入味，裹上地瓜粉現炸起鍋，外殼金黃酥香咬下無渣無骨，肉香四溢，是邊逛夜市邊吃的不沾手點心。',
        shopShortIntroduction: '去骨好咬無骨渣！特製蒜香醃汁金黃現炸香酥排骨。',
        shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3200,
        googlePlaceUrl: 'https://maps.google.com/?q=膳品香酥排骨大東夜市',
        specialties: ['現炸無骨香酥排骨', '酥炸杏鮑菇'],
        food: [
            {
                foodName: '蒜香無骨金黃排骨酥',
                foodNameEN: 'Crispy Boneless Garlic Marinated Pork Riblets',
                foodPrice: 70,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                foodInfo: '精選去骨豬排切塊浸漬蒜味中藥，炸至金黃焦香，肉質扎實多汁，撒上白胡椒鹽極其過癮。',
                foodInfoEN: 'Tender boneless pork rib bites marinated in spiced garlic brine and fried to an extra-crunchy texture.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 21. 武聖夜市 (台南市)
    // ==========================================
    {
        shopYeShi: '武聖夜市',
        shopName: '三輪車炭烤大腸包小腸',
        shopNameEN: 'Tricycle Charcoal Sausage in Rice Sausage',
        shopNumber: '武聖夜市主要通道前排',
        shopType: '炭烤串燒',
        shopLocation: '武聖夜市入口處旁三輪車造型攤位',
        shopIntroduction: '台南四十年歷史的武聖夜市老字號！復古傳統三輪車造型，純木炭慢火烤出油亮香腸與黏糯手工米腸，包入大蒜、特炒酸菜與薑片，肉汁甘醇肉香撲鼻。',
        shopShortIntroduction: '復古三輪車老攤！木炭烘烤手工糯米大腸與蒜味香腸。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3500,
        googlePlaceUrl: 'https://maps.google.com/?q=武聖夜市大腸包小腸',
        specialties: ['古早味炭火大腸包小腸', '炭烤黑豬肉香腸'],
        food: [
            {
                foodName: '三輪車炭烤大腸包小腸',
                foodNameEN: 'Tricycle Charcoal Grilled Taiwanese Sausage Combo',
                foodPrice: 65,
                foodType: ['烤物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '炭烤飽滿大糯米腸夾入肥瘦適中黑豬香腸，配上新鮮蒜瓣與醃甜酸菜，層次分明。',
                foodInfoEN: 'Authentic Taiwanese grilled pork sausage nested in rice intestine sausage with pickled mustard greens and fresh garlic.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '武聖夜市',
        shopName: '拔絲地瓜大王',
        shopNameEN: 'Candied Pulling Sweet Potato & Taro',
        shopNumber: '武聖夜市甜品街',
        shopType: '甜品冰品',
        shopLocation: '武聖夜市甜品排中段',
        shopIntroduction: '現炸金黃地瓜與芋頭滾裹高溫金黃焦糖糖漿，起鍋迅速拉出金黃細絲，浸入冰水冷卻瞬間外皮形成一層薄脆糖衣，內餡依然滾燙綿密，外脆內軟甜而不膩。',
        shopShortIntroduction: '拉出金黃糖絲！冰水脆化外糖衣綿密拔絲地瓜與芋頭。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 2800,
        googlePlaceUrl: 'https://maps.google.com/?q=武聖夜市拔絲地瓜',
        specialties: ['招牌雙拼拔絲地瓜芋頭'],
        food: [
            {
                foodName: '冰鎮脆皮拔絲地瓜雙拼',
                foodNameEN: 'Candied Crispy Pulling Sweet Potato & Taro',
                foodPrice: 50,
                foodType: ['甜點飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '現炸香軟地瓜與大甲芋頭包裹薄脆糖衣，冰水淬鍊咬下薄脆如琉璃，內餡鬆軟香甜。',
                foodInfoEN: 'Golden fried sweet potato and taro cubes tossed in hot caramelized sugar, flash-chilled to create glass-like crunchy glaze.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 22. 六合國際觀光夜市 (高雄市)
    // ==========================================
    {
        shopYeShi: '六合國際觀光夜市',
        shopName: '鄭老牌木瓜牛奶',
        shopNameEN: 'Zheng Old Brand Papaya Milk',
        shopNumber: '六合二路 1 號 (中山一路口)',
        shopType: '甜品飲品',
        shopLocation: '六合夜市中山一路大牌樓入口第一家',
        shopIntroduction: '各國元首名人格鬥天王來台指名必喝！五十年老字號。攤位前擺滿名人簽名看板。嚴選屏東與台東網室日照紅肉木瓜，搭配高牧純濃鮮奶，不加一滴水現打出極致濃稠、香甜絲滑的頂級木瓜牛奶。',
        shopShortIntroduction: '五十年名人簽名名店！屏東紅肉木瓜加純鮮奶濃醇木瓜牛奶。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 8900,
        googlePlaceUrl: 'https://maps.google.com/?q=鄭老牌木瓜牛奶',
        specialties: ['招牌濃郁木瓜牛奶', '酪梨布丁牛奶'],
        food: [
            {
                foodName: '鄭老牌招牌濃郁木瓜牛奶',
                foodNameEN: 'Zheng Signature Creamy Papaya Milk',
                foodPrice: 70,
                foodType: ['飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '成熟甜美紅肉木瓜與特濃純鮮奶黃金比例現打，綿密滑順無渣感，奶香與果香交融。',
                foodInfoEN: 'Sun-ripened red-flesh Taiwanese papayas blended fresh with local whole milk, velvety thick and naturally sweet.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '六合國際觀光夜市',
        shopName: '莊記海產粥',
        shopNameEN: 'Zhuang Ji Seafood Congee',
        shopNumber: '六合二路 130 號',
        shopType: '海鮮鍋物',
        shopLocation: '六合夜市自立路段中後方',
        shopIntroduction: '六合夜市三十年海鮮殿堂！攤位上排滿新鮮肥美白蝦、大文蛤、現剝蚵仔、鮮透抽與蟹肉。南部傳統「飯湯」作法，以大骨柴魚高湯大火滾煮，鮮甜海味完全釋放於湯頭中，鮮美無匹。',
        shopShortIntroduction: '三十年新鮮海味！現煮肥蝦文蛤鮮蚵透抽澎湃海產粥。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 5600,
        googlePlaceUrl: 'https://maps.google.com/?q=莊記海產粥六合夜市',
        specialties: ['澎湃招牌海產粥', '現燙鮮甜白蝦', '原汁鹽蒸蛤蜊'],
        food: [
            {
                foodName: '澎湃豪華招牌海產粥',
                foodNameEN: 'Deluxe Southern Taiwan Seafood Rice Soup',
                foodPrice: 130,
                foodType: ['海鮮鍋物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '碗中滿載鮮甜大白蝦、大蛤蜊、肥美鮮蚵、透抽切片與蟹管肉，米粒吸飽海鮮高湯精華。',
                foodInfoEN: 'Generous bowl of seafood rice soup brimming with fresh prawns, juicy clams, oysters, squid rings, and crab meat.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 23. 瑞豐夜市 (高雄市)
    // ==========================================
    {
        shopYeShi: '瑞豐夜市',
        shopName: '天使雞排',
        shopNameEN: 'Angel Fried Chicken',
        shopNumber: '瑞豐夜市第 12 排核心攤位',
        shopType: '酥脆炸物',
        shopLocation: '瑞豐夜市美食排大轉角',
        shopIntroduction: '高雄發跡紅遍全台的雞排霸主！標榜超厚切達三公分厚的厚切雞胸肉，裹上特調酥脆金黃外衣，咬開時滾燙的肉汁瞬間噴發，外皮甜脆咔滋、肉質軟嫩無比。',
        shopShortIntroduction: '全台三公分極厚雞排始祖！爆汁金黃甜脆天使雞排。',
        shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 8100,
        googlePlaceUrl: 'https://maps.google.com/?q=天使雞排瑞豐夜市',
        specialties: ['超厚切爆汁天使雞排', '辣味天使雞排'],
        food: [
            {
                foodName: '超厚切金黃爆汁天使雞排',
                foodNameEN: 'Angel Ultra-Thick Juicy Fried Chicken Cutlet',
                foodPrice: 100,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                foodInfo: '整塊厚度驚人的多汁雞排，酥脆麵衣帶微甜風味，咬下即噴出燙口鮮甜肉汁。',
                foodInfoEN: 'Monumentally thick 3cm chicken breast fried to sweet golden crunchiness, retaining extraordinary juiciness inside.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '瑞豐夜市',
        shopName: '萬國牛排',
        shopNameEN: 'Wan Guo Sizzling Night Market Steak',
        shopNumber: '瑞豐夜市第二排大排檔',
        shopType: '傳統熱炒小吃',
        shopLocation: '瑞豐夜市中段超大座位區',
        shopIntroduction: '瑞豐夜市最具規模的鐵板牛排老店！高溫鑄鐵盤滋滋作響，厚切原肉牛排煎得鮮嫩多汁，鋪上份量十足的黃金鐵板麵、打上一顆半熟土雞蛋，淋上自熬黑胡椒醬與蘑菇洋蔥醬，紅茶玉米濃湯無限暢飲。',
        shopShortIntroduction: '高雄夜市牛排王者！高溫滋滋鐵板厚切牛排加鐵板麵蛋。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 6500,
        googlePlaceUrl: 'https://maps.google.com/?q=萬國牛排瑞豐夜市',
        specialties: ['特厚沙朗牛排', '脆皮雞腿排', '鐵板麵全餐'],
        food: [
            {
                foodName: '鐵板特厚沙朗牛排套餐',
                foodNameEN: 'Sizzling Hot Plate Sirloin Steak with Noodles & Egg',
                foodPrice: 160,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '高溫鐵板炙燒厚切嫩肩沙朗牛排，配上Q彈烏龍麵與太陽蛋，黑胡椒雙醬香濃惹味。',
                foodInfoEN: 'Tender sirloin steak served sizzling on cast-iron platter with noodles, sunny-side egg, and dual black pepper mushroom sauce.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 24. 墾丁大街夜市 (屏東縣)
    // ==========================================
    {
        shopYeShi: '墾丁大街夜市',
        shopName: '勇伯現烤大魷魚',
        shopNameEN: 'Uncle Yong Grilled Giant Squid',
        shopNumber: '墾丁路 145 號對面',
        shopType: '炭烤串燒',
        shopLocation: '墾丁大街前段主要步道',
        shopIntroduction: '墾丁大街人手一串的招牌海味！遠洋捕撈巨無霸阿根廷大魷魚，整隻鋪在大炭火爐上現烤，刷上特調日式照燒甜鹹醬汁，烤得焦香捲曲，肉質肥厚彈牙多汁，撒上厚厚芥末胡椒鹽極其過癮。',
        shopShortIntroduction: '墾丁人手一串！巨無霸深海阿根廷烤大魷魚。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3900,
        googlePlaceUrl: 'https://maps.google.com/?q=墾丁大街烤魷魚',
        specialties: ['深海巨無霸炭烤大魷魚', '椒鹽芥末烤魷魚'],
        food: [
            {
                foodName: '深海巨無霸照燒烤大魷魚',
                foodNameEN: 'Giant Charcoal Grilled Teriyaki Whole Squid',
                foodPrice: 150,
                foodType: ['烤物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '整隻深海鮮大魷魚炭火現烤，厚實肉質焦香Q彈，抹上秘製甜甘醬油，海味十足。',
                foodInfoEN: 'Whole colossal squid skewered and flame-kissed over hot coals, glazed with savory sweet soy and white sesame.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '墾丁大街夜市',
        shopName: '一品滷味',
        shopNameEN: 'Yi Pin Heated Braised Food',
        shopNumber: '墾丁路 187 號',
        shopType: '傳統熱炒小吃',
        shopLocation: '墾丁大街中段大招牌店面',
        shopIntroduction: '墾丁大街五十年元老級滷味老字號！以三十多種珍貴中藥材熬製滷湯，客人自選食材現煮加熱，淋上獨門「斷魂辣醬」，香麻過癮，在海風吹拂的墾丁之夜是消夜的最佳夥伴。',
        shopShortIntroduction: '墾丁五十年老店！中藥加熱滷味配傳奇斷魂辣醬。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 4200,
        googlePlaceUrl: 'https://maps.google.com/?q=一品滷味墾丁店',
        specialties: ['招牌熱滷拼盤', '秘製斷魂辣椒醬'],
        food: [
            {
                foodName: '墾丁一品中藥熱滷味拼盤',
                foodNameEN: 'Kenting Herbal Braised Deluxe Platter',
                foodPrice: 150,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '大腸、豆皮、海帶、香菇與手工魚丸在熱滷汁中滾熱吸香，淋上特製辣油爽辣開胃。',
                foodInfoEN: 'Heated braised pork delicacies, bean curd sheets, and seafood dumplings infused with Kenting fragrant herb broth.',
                rating: 4.7
            }
        ]
    },

    // ==========================================
    // 25. 羅東觀光夜市 (宜蘭縣)
    // ==========================================
    {
        shopYeShi: '羅東觀光夜市',
        shopName: '阿灶伯當歸羊肉湯',
        shopNameEN: 'Uncle Chao Angelica Herbal Mutton Soup',
        shopNumber: '羅東夜市第 1094 號攤位',
        shopType: '傳統小吃',
        shopLocation: '羅東夜市中山公園正門前',
        shopIntroduction: '羅東夜市排隊排到轉三個彎的最狂傳奇！滿滿一整碗堆得像小山一樣的新鮮羊肉片，以溫補當歸高湯現燙至軟嫩無羊羶味，搭配一盤沙茶空心菜羊肉炒麵與特製豆腐乳沾醬，甘甜無比。',
        shopShortIntroduction: '羅東夜市排隊王者！肉片爆滿甘甜溫補當歸羊肉湯。',
        shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 9800,
        googlePlaceUrl: 'https://maps.google.com/?q=阿灶伯當歸羊肉湯',
        specialties: ['當歸羊肉湯', '沙茶羊肉炒麵', '黃金脆皮臭豆腐'],
        food: [
            {
                foodName: '爆量鮮嫩當歸羊肉湯',
                foodNameEN: 'Overflowing Angelica Herbal Mutton Soup',
                foodPrice: 90,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                foodInfo: '薄切鮮嫩羊肉片滿到溢出碗緣，當歸清香甘甜溫潤，沾上自製甘醇豆腐乳醬絕頂銷魂。',
                foodInfoEN: 'Heaping bowl of tender sliced mutton flash-cooked in rich sweet angelica herbal soup, served with bean curd dipping sauce.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '羅東觀光夜市',
        shopName: '義豐蔥油派',
        shopNameEN: 'Yi Feng Scallion Pie',
        shopNumber: '民生路 98 號 (夜市入口旁郵局前)',
        shopType: '傳統小吃',
        shopLocation: '羅東夜市郵局旁民生路口',
        shopIntroduction: '宜蘭三星蔥油派始祖！四十年堅持使用宜蘭新鮮契作三星蔥，層層手工盤旋折疊派皮，半煎炸至外層金黃千層爆酥，內部包著青翠多汁的滿滿三星蔥段，打上一顆半熟蛋噴香撲鼻。',
        shopShortIntroduction: '宜蘭三星蔥派始祖！千層爆酥滿滿翠綠三星蔥油派。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 6500,
        googlePlaceUrl: 'https://maps.google.com/?q=義豐蔥油派',
        specialties: ['三星蔥油派', '蔥油派加蛋'],
        food: [
            {
                foodName: '宜蘭三星蔥金黃酥脆蔥油派',
                foodNameEN: 'Yilan Sanxing Scallion Crispy Flaky Pie with Egg',
                foodPrice: 50,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '多層次手工酥皮包裹鮮甜多汁的宜蘭三星蔥段，油炸至外皮千層酥化，加顆土雞蛋更完美。',
                foodInfoEN: 'Spiral layered flaky pie packed with sweet aromatic Yilan Sanxing green scallions, pan-fried to crisp perfection.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '羅東觀光夜市',
        shopName: '小春糕渣卜肉',
        shopNameEN: 'Xiao Chun Gaozha & Bu-Rou Pork',
        shopNumber: '公園路 100 號 (羅東夜市中段)',
        shopType: '傳統小吃',
        shopLocation: '羅東夜市公園路核心熱點',
        shopIntroduction: '蘭陽國宴二重奏！宜蘭傳統名菜代表。「糕渣」以老母雞、蝦仁與高湯熬煮凝固，高溫油炸後外溫涼內燙口，入口即化鮮美無匹；「卜肉」嚴選豬里肌肉裹蛋糊酥炸，外酥內甜。',
        shopShortIntroduction: '蘭陽國宴雙絕！入口即化高湯炸糕渣與外酥肉嫩卜肉。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 5100,
        googlePlaceUrl: 'https://maps.google.com/?q=小春糕渣卜肉',
        specialties: ['國宴糕渣卜肉雙拼', '照燒皮蛋'],
        food: [
            {
                foodName: '蘭陽國宴糕渣卜肉雙拼',
                foodNameEN: 'Yilan State Banquet Gaozha & Deep-Fried Pork Fritters',
                foodPrice: 120,
                foodType: ['傳統小吃', '炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '金黃方塊糕渣外脆內熱融如濃湯，配上甜嫩酥脆里肌卜肉，品嚐最道地的蘭陽古早味手藝。',
                foodInfoEN: 'Historic Yilan delicacy: molten chicken broth jelly cubes fried crisp alongside tender sweet pork loin fritters.',
                rating: 4.7
            }
        ]
    },

    // ==========================================
    // 26. 宜蘭東門觀光夜市 (宜蘭縣)
    // ==========================================
    {
        shopYeShi: '宜蘭東門觀光夜市',
        shopName: '彭記蔥油餅',
        shopNameEN: 'Peng Ji Scallion Pancake',
        shopNumber: '聖後街入口第一攤',
        shopType: '傳統小吃',
        shopLocation: '東門夜市高架橋下入口處',
        shopIntroduction: '宜蘭東門夜市排隊指標！手工現擀揉麵，半煎炸至膨脹金黃酥脆，刷上特製甜辣醬與胡椒鹽，打入一顆滑嫩荷包蛋，一口咬下外酥脆內多汁，滿嘴蔥香。',
        shopShortIntroduction: '東門夜市排隊第一家！金黃膨脆半煎炸三星蔥油餅。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3800,
        googlePlaceUrl: 'https://maps.google.com/?q=彭記蔥油餅東門夜市',
        specialties: ['招牌雙蛋蔥油餅'],
        food: [
            {
                foodName: '東門招牌香脆三星蔥油餅加蛋',
                foodNameEN: 'Dongmen Crispy Scallion Pancake with Egg',
                foodPrice: 40,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '香酥外皮金黃蓬鬆，融入滿滿宜蘭三星蔥花，搭配半熟蛋與特製蒜蓉甜辣醬。',
                foodInfoEN: 'Golden puffed flatbread loaded with local sweet green scallions, pan-fried with farm fresh egg.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '宜蘭東門觀光夜市',
        shopName: '東門嘟好燒',
        shopNameEN: 'Dongmen Du-Hao-Shao Sweet Pastry',
        shopNumber: '和睦路口處',
        shopType: '甜品點心',
        shopLocation: '東門夜市和睦路橋下',
        shopIntroduction: '宜蘭獨有傳承百年的街頭小點心！「嘟好燒」台語意指剛炸好熱騰騰剛剛好。手工麵皮裹入紅豆、芋頭與雞蛋香餡，現切成小段投入油鍋炸至金黃酥香，外脆內軟香甜可口。',
        shopShortIntroduction: '宜蘭百年特色名產！熱騰騰外酥內鬆紅豆芋泥嘟好燒。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        googleRating: 4.5,
        googleReviewCount: 2900,
        googlePlaceUrl: 'https://maps.google.com/?q=東門嘟好燒',
        specialties: ['古早味手工嘟好燒'],
        food: [
            {
                foodName: '百年古早味現炸嘟好燒',
                foodNameEN: 'Centennial Crispy Sweet Taro & Red Bean Puffs',
                foodPrice: 50,
                foodType: ['甜點飲品', '炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '宜蘭百年特色一口甜點，麵衣炸至金黃香脆，內裹芋泥紅豆餡甜香鬆軟。',
                foodInfoEN: 'Bite-sized sweet pastry puffs filled with taro and adzuki bean paste, deep-fried to piping hot perfection.',
                rating: 4.7
            }
        ]
    },

    // ==========================================
    // 27. 花蓮東大門國際觀光夜市 (花蓮縣)
    // ==========================================
    {
        shopYeShi: '花蓮東大門國際觀光夜市',
        shopName: '第一家烤肉串',
        shopNameEN: 'Number One Charcoal Skewers',
        shopNumber: '原住民一條街 E28 號',
        shopType: '炭烤串燒',
        shopLocation: '東大門夜市原住民一條街最醒目攤位',
        shopIntroduction: '花蓮東大門排隊第一名！領號碼牌需等上兩小時的人氣神攤。琳瑯滿目的串燒以炭火現烤，厚切豬肉蔥卷、烤甜不辣、香菇與大魷魚，刷上代代相傳的濃醇焦糖蜜汁醬，炭香濃烈。',
        shopShortIntroduction: '花蓮排隊第一神店！炭香逼人祖傳蜜醬肉卷與綜合烤串。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 8500,
        googlePlaceUrl: 'https://maps.google.com/?q=花蓮第一家烤肉串',
        specialties: ['秘汁青蔥豬肉卷', '香烤大魷魚', '炭烤香脆甜不辣'],
        food: [
            {
                foodName: '秘汁炭烤青蔥豬肉卷',
                foodNameEN: 'Charcoal Pork Scallion Rolls with Secret Glaze',
                foodPrice: 65,
                foodType: ['烤物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '多汁黑豬五花肉片緊裹整束鮮甜青蔥，炭火慢烤逼出油脂，刷上濃郁甘甜老醬。',
                foodInfoEN: 'Pork belly slices tightly wrapped around crisp sweet spring onions, charred over wood embers with savory sweet glaze.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '花蓮東大門國際觀光夜市',
        shopName: '原香嘟論竹筒飯',
        shopNameEN: 'Aboriginal Bamboo Sticky Rice',
        shopNumber: '原住民一條街 D21 號',
        shopType: '傳統小吃',
        shopLocation: '東大門夜市原住民一條街',
        shopIntroduction: '正宗花蓮阿美族傳統風味！天然高山新竹砍伐之竹筒，填入花蓮富麗米、圓糯米、香菇、芋頭與黑豬肉，經蒸烤後劈開竹筒，竹膜緊緊包覆著米飯，散發清雅竹香，再配上一顆手搗阿美麻糬（嘟論），體驗最地道的部落美食。',
        shopShortIntroduction: '阿美族原鄉手藝！劈竹現吃清甜竹筒香糯米飯與手搗麻糬。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 4600,
        googlePlaceUrl: 'https://maps.google.com/?q=原香嘟論竹筒飯',
        specialties: ['原住民香濃竹筒飯', '手工阿美嘟論麻糬'],
        food: [
            {
                foodName: '原住民古法炭蒸香糯竹筒飯',
                foodNameEN: 'Traditional Indigenous Bamboo Tube Sticky Rice',
                foodPrice: 70,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '取自天然新竹筒，香糯米飯吸附天然竹膜與竹香，口感軟Q清香，帶有淡淡香菇豬肉鹹香。',
                foodInfoEN: 'Fragrant glutinous rice steamed inside natural green bamboo stems with wild mushrooms and seasoned pork.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '花蓮東大門國際觀光夜市',
        shopName: '蔣家花蓮創意官財板',
        shopNameEN: 'Jiang Creative Coffin Bread',
        shopNumber: '自強夜市區第 38 號',
        shopType: '酥脆炸物',
        shopLocation: '自強夜市區與原住民街交會處',
        shopIntroduction: '花蓮自強夜市招牌名物！厚片吐司裹蛋液炸至金黃酥脆，切開吐司上蓋，填入黑椒牛肉、糖醋鮮蝦、奶油鳳梨海鮮等多種熱騰騰豐富餡料，外脆內軟香濃無比，內用還享免費紅茶奶茶暢飲。',
        shopShortIntroduction: '花蓮名物創始名店！現炸金黃厚吐司包爆料黑椒牛肉官財板。',
        shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 6200,
        googlePlaceUrl: 'https://maps.google.com/?q=蔣家花蓮創意官財板',
        specialties: ['黑椒牛肉官財板', '鳳梨蝦球官財板'],
        food: [
            {
                foodName: '黑椒牛肉黃金脆皮官財板',
                foodNameEN: 'Black Pepper Beef Golden Coffin Toast',
                foodPrice: 75,
                foodType: ['炸物', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                foodInfo: '炸至金黃酥脆的厚片土司盒，填入大火快炒黑胡椒嫩牛肉與高麗菜絲，外酥內爆漿。',
                foodInfoEN: 'Deep-fried thick toast box hollowed and generously stuffed with sizzling black pepper beef and crisp cabbage.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 28. 台東觀光夜市 (台東縣)
    // ==========================================
    {
        shopYeShi: '台東觀光夜市',
        shopName: '林家臭豆腐',
        shopNameEN: 'Lin Family Stinky Tofu',
        shopNumber: '正氣路 130 號 (夜市正氣路主要路段)',
        shopType: '酥脆炸物',
        shopLocation: '台東夜市正氣路熱鬧街道上',
        shopIntroduction: '台東人氣最高排隊美食！純天然植物發酵臭豆腐，大油鍋高低溫兩道油炸搶酥，外殼薄脆有如餅乾，內部豆腐吸飽特製蒜蓉甜醬汁，最特別的是搭配大量新鮮細切九層塔絲與台式脆酸泡菜，香氣層次全台獨家。',
        shopShortIntroduction: '全台獨創九層塔絲！雙重油炸酥脆餅乾外皮臭豆腐。',
        shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 6900,
        googlePlaceUrl: 'https://maps.google.com/?q=台東林家臭豆腐',
        specialties: ['九層塔香酥臭豆腐', '台式爽脆泡菜'],
        food: [
            {
                foodName: '九層塔香脆黃金臭豆腐',
                foodNameEN: 'Ultra-Crisp Stinky Tofu with Shredded Basil & Pickled Slaw',
                foodPrice: 65,
                foodType: ['炸物', '傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                foodInfo: '外皮如脆餅般酥香，孔隙灌入甘甜蒜香醬汁，頂層鋪滿新鮮九層塔絲與酸甜泡菜，風味絕倫。',
                foodInfoEN: 'Crispy deep-fried fermented tofu cubes laced with garlic sauce, garnished with fresh shredded Thai basil and tart slaw.',
                rating: 4.8
            }
        ]
    },
    {
        shopYeShi: '台東觀光夜市',
        shopName: '寶桑豆花',
        shopNameEN: 'Bao Sang Traditional Douhua',
        shopNumber: '正氣路 115 號',
        shopType: '甜品飲品',
        shopLocation: '台東觀光夜市正氣路旁',
        shopIntroduction: '傳承四十年古早味傳統豆花！遵循純手工研磨非基改黃豆，以鹽鹵點製，豆花質地滑嫩如絲、豆香濃郁。搭配慢火熬煮綿密的蜜紅豆、軟花生與香Q粉圓，淋上古早味焦糖蔗糖水，純樸甜蜜。',
        shopShortIntroduction: '四十年老字號！手工古法鹽鹵滑嫩豆花與蜜紅豆粉圓。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 3800,
        googlePlaceUrl: 'https://maps.google.com/?q=台東寶桑豆花',
        specialties: ['古早味綜合豆花', '冰糖花生粉圓湯'],
        food: [
            {
                foodName: '古法鹽鹵綜合手工豆花',
                foodNameEN: 'Artisanal Douhua Tofu Pudding with Red Beans & Tapioca',
                foodPrice: 45,
                foodType: ['甜點飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '細緻絲滑入口即化的純手工鹽鹵豆花，配上慢火軟花生與黑糖粉圓，焦糖甜水清香。',
                foodInfoEN: 'Silken handmade tofu pudding topped with soft stewed peanuts, sweet adzuki beans, and chewy boba pearls.',
                rating: 4.8
            }
        ]
    },

    // ==========================================
    // 29. 馬公中正路商圈夜市 (澎湖縣)
    // ==========================================
    {
        shopYeShi: '馬公中正路商圈夜市',
        shopName: '澎湖郵局蔥油餅',
        shopNameEN: 'Penghu Post Office Scallion Pancake',
        shopNumber: '惠民一路 36 號 (原中正路老郵局旁)',
        shopType: '傳統小吃',
        shopLocation: '馬公中正路商圈惠民路口',
        shopIntroduction: '澎湖無人不知無人不曉的傳奇排隊名店！麵團現桿投入大油鍋中半煎炸至膨脹金黃酥脆，撈起打上一顆荷包蛋，最靈魂之處是免費無限量加入自製清脆爽口小黃瓜絲，再抹上蒜泥甜辣醬，酥脆清爽不油膩。',
        shopShortIntroduction: '澎湖排隊傳奇！金黃酥膨蔥油餅包小黃瓜絲與荷包蛋。',
        shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        googleRating: 4.7,
        googleReviewCount: 6700,
        googlePlaceUrl: 'https://maps.google.com/?q=澎湖郵局蔥油餅',
        specialties: ['招牌小黃瓜雙蛋蔥油餅'],
        food: [
            {
                foodName: '澎湖招牌膨脆蔥油餅夾小黃瓜',
                foodNameEN: 'Penghu Crispy Scallion Pancake with Shredded Cucumber & Egg',
                foodPrice: 50,
                foodType: ['傳統小吃', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                foodInfo: '半炸半煎得蓬鬆香脆，夾入現煎半熟荷包蛋與大量脆爽小黃瓜絲，刷上蒜辣醬，層次豐富。',
                foodInfoEN: 'Fluffy blistered fried scallion flatbread filled with sunny egg and mountains of fresh crisp julienned cucumbers.',
                rating: 4.9
            }
        ]
    },
    {
        shopYeShi: '馬公中正路商圈夜市',
        shopName: '仙人掌冰城',
        shopNameEN: 'Penghu Cactus Ice Castle',
        shopNumber: '中正路 32-5 號',
        shopType: '甜品飲品',
        shopLocation: '馬公中正路主要商業徒步街',
        shopIntroduction: '澎湖菊島專屬的鮮豔美味！嚴選澎湖天然無污染海邊野生仙人掌果實，純天然手作萃取鮮紅果肉汁液，製成酸甜爽口、果香撲鼻的仙人掌冰淇淋與雪花冰，搭配澎湖黑糖糕與風茹茶，是遊客必吃的海島甜品。',
        shopShortIntroduction: '澎湖菊島特產！天然野生鮮紅仙人掌果實冰淇淋與雪花冰。',
        shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        googleRating: 4.6,
        googleReviewCount: 4100,
        googlePlaceUrl: 'https://maps.google.com/?q=澎湖仙人掌冰城',
        specialties: ['天然野生仙人掌冰淇淋', '仙人掌八寶雪花冰'],
        food: [
            {
                foodName: '澎湖天然野生仙人掌果實冰淇淋',
                foodNameEN: 'Wild Penghu Cactus Fruit Sorbet Ice Cream',
                foodPrice: 50,
                foodType: ['甜點飲品', '人氣必吃'],
                foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                foodInfo: '鮮紅如紅寶石般的野生仙人掌果泥，天然酸甜清爽，帶有獨特果香與花青素營養。',
                foodInfoEN: 'Vibrant ruby sorbet made from hand-harvested wild coastal Penghu cactus fruit, tangy, sweet, and revitalizing.',
                rating: 4.8
            }
        ]
    }
];

module.exports = {
    ALL_NIGHT_MARKET_SHOPS
};
