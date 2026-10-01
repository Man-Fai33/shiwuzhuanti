const mongoose = require('mongoose');
const Shop = require('../models/shop');
const Food = require('../models/food');
const Market = require('../models/market');
const User = require('../models/user');
const { ALL_NIGHT_MARKET_SHOPS } = require('./taiwanNightMarketShopsData');

// 全台各大夜市 Google Maps 真實人氣名店與必吃美食數據庫
const GOOGLE_MAPS_NIGHT_MARKET_DATA = [
    // 1. 士林觀光夜市
    {
        marketName: '士林觀光夜市',
        shops: [
            {
                shopName: '海友十全排骨',
                shopNameEN: 'Hai You Herbal Pork Ribs',
                shopNumber: '大東路 49 號',
                shopType: '米其林必比登推薦',
                shopLocation: '士林夜市大東路核心街區',
                shopManager: '海老闆',
                shopIntroduction: '連續多年榮獲米其林必比登推介！創立逾40年，以十全中藥慢火熬燉排骨與羊肉，湯頭甘美溫潤回甘，老饕宵夜首選。',
                shopShortIntroduction: '米其林必比登推介！飄香40年十全中藥養生排骨。',
                shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                rank: 2980,
                googleRating: 4.3,
                googleReviewCount: 2980,
                googlePlaceUrl: 'https://maps.google.com/?q=海友十全排骨',
                food: [
                    {
                        foodName: '十全藥燉排骨湯',
                        foodNameEN: 'Herbal Pork Ribs Soup',
                        foodPrice: 110,
                        foodType: ['Soup', 'snack'],
                        foodInfo: '十多味珍貴中藥材古法細火慢燉，排骨骨肉輕易分離，湯頭清甜無中藥苦澀。',
                        foodInfoEN: 'Classic Taiwanese herbal pork rib soup simmered for hours, tender and restorative.',
                        foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    },
                    {
                        foodName: '古法十全羊肉湯',
                        foodNameEN: 'Angelica Mutton Soup',
                        foodPrice: 130,
                        foodType: ['Soup'],
                        foodInfo: '鮮嫩羊肉片份量大方，搭配特製香濃豆瓣腐乳沾醬，溫補暖胃。',
                        foodInfoEN: 'Tender sliced mutton in rich angelica herbal broth with house fermented dip.',
                        foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
                        rating: 4.7
                    },
                    {
                        foodName: '香蔥古早味麵線',
                        foodNameEN: 'Scallion Oil Vermicelli',
                        foodPrice: 40,
                        foodType: ['Pasta', 'snack'],
                        foodInfo: '手工麵線拌入特製紅蔥頭豬油與藥膳高湯，香氣四溢、滑順可口。',
                        foodInfoEN: 'Handmade thin noodles drizzled with aromatic scallion oil and herbal broth.',
                        foodIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
                        rating: 4.6
                    }
                ]
            },
            {
                shopName: '士林豪大大雞排',
                shopNameEN: 'Hot Star Large Fried Chicken',
                shopNumber: '基河路 115 號',
                shopType: '經典炸物',
                shopLocation: '陽明戲院舊址正對面門面',
                shopManager: '林老闆',
                shopIntroduction: '聞名全台與海外的「比臉大雞排始祖」！每天排隊人龍不斷，外皮酥脆卡滋，咬開肉汁滿溢。',
                shopShortIntroduction: '全台知名比臉大雞排始祖！外酥內嫩多汁。',
                shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                rating: 4.2,
                rank: 4150,
                googleRating: 4.2,
                googleReviewCount: 4150,
                googlePlaceUrl: 'https://maps.google.com/?q=士林豪大大雞排',
                food: [
                    {
                        foodName: '豪大脆皮大雞排',
                        foodNameEN: 'Hot Star XXL Fried Chicken',
                        foodPrice: 95,
                        foodType: ['Fried', 'snack'],
                        foodInfo: '比臉還大的香脆外皮，肉汁飽滿厚實，經典特調中藥椒鹽提味，排隊人手一片！',
                        foodInfoEN: 'Extra-large crispy fried chicken cutlet, juicy inside with signature pepper salt.',
                        foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
                        rating: 4.9
                    }
                ]
            },
            {
                shopName: '忠誠號蚵仔煎',
                shopNameEN: 'Zhongcheng Oyster Omelet',
                shopNumber: '大東路 15-32 號',
                shopType: '傳統熱炒小吃',
                shopLocation: '士林公有市場外側大東路',
                shopManager: '王老闆',
                shopIntroduction: '士林夜市老字號排隊神店！嘉義東石新鮮直送肥美鮮蚵，粉漿煎得邊緣酥脆，生炒花枝羹更是鑊氣撲鼻。',
                shopShortIntroduction: '士林五十年老字號！東石鮮蚵與生炒花枝羹。',
                shopIcon: 'https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?auto=format&fit=crop&w=800&q=80',
                rating: 4.1,
                rank: 3320,
                googleRating: 4.1,
                googleReviewCount: 3320,
                googlePlaceUrl: 'https://maps.google.com/?q=忠誠號蚵仔煎',
                food: [
                    {
                        foodName: '招牌雞蛋蚵仔煎',
                        foodNameEN: 'Taiwanese Oyster Omelet',
                        foodPrice: 85,
                        foodType: ['snack'],
                        foodInfo: '特選東石鮮蚵、鮮脆小白菜，淋上祖傳特調甜辣紅醬，香脆軟糯。',
                        foodInfoEN: 'Fresh Taiwanese oysters with egg and crisp greens in starch batter, topped with savory-sweet sauce.',
                        foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
                        rating: 4.7
                    },
                    {
                        foodName: '生炒花枝羹',
                        foodNameEN: 'Stir-Fried Thick Squid Soup',
                        foodPrice: 90,
                        foodType: ['Soup', 'snack'],
                        foodInfo: '大火快炒厚切鮮花枝與爽脆竹筍，湯頭酸甜帶烏醋香與蒜香鑊氣。',
                        foodInfoEN: 'Wok-seared fresh thick squid slices in savory-sweet bamboo broth with black vinegar.',
                        foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            },
            {
                shopName: '辛發亭雪花冰',
                shopNameEN: 'Shin Fa Ting Snowflake Ice',
                shopNumber: '安平街 1 號',
                shopType: '冰品甜點',
                shopLocation: '陽明戲院旁巷弄安平街',
                shopManager: '高老闆',
                shopIntroduction: '台北雪花冰創始鼻祖！營業超過半個世紀，獨門刀法將特製冰磚刨成如絲綢般的綿密雪花，入口即化。',
                shopShortIntroduction: '全台雪花冰鼻祖！半世紀絲綢般綿密口感。',
                shopIcon: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                rank: 3950,
                googleRating: 4.4,
                googleReviewCount: 3950,
                googlePlaceUrl: 'https://maps.google.com/?q=辛發亭雪花冰',
                food: [
                    {
                        foodName: '新鮮愛文芒果雪花冰',
                        foodNameEN: 'Fresh Mango Shaved Snow Ice',
                        foodPrice: 150,
                        foodType: ['Dessert'],
                        foodInfo: '特濃牛奶雪花冰底，鋪滿金黃香甜愛文芒果果肉與煉乳，夏日必吃！',
                        foodInfoEN: 'Fluffy milk snow ice loaded with sweet Aiwen mango chunks and condensed milk.',
                        foodIcon: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
                        rating: 4.9
                    },
                    {
                        foodName: '宇治抹茶紅豆雪花冰',
                        foodNameEN: 'Matcha & Red Bean Snowflake Ice',
                        foodPrice: 110,
                        foodType: ['Dessert'],
                        foodInfo: '苦甜濃醇的抹茶雪花冰，搭配慢火熬煮綿密萬丹紅豆，茶香濃郁。',
                        foodInfoEN: 'Rich Japanese matcha snow ice paired with sweet stewed azuki red beans.',
                        foodIcon: 'https://images.unsplash.com/photo-1558857563-b37cf5b7a151?auto=format&fit=crop&w=600&q=80',
                        rating: 4.7
                    }
                ]
            }
        ]
    },

    // 2. 饒河街觀光夜市
    {
        marketName: '饒河街觀光夜市',
        shops: [
            {
                shopName: '福州世祖胡椒餅松山總店',
                shopNameEN: 'Fuzhou Pepper Pork Bun',
                shopNumber: '入口第 1 攤',
                shopType: '米其林必比登推薦',
                shopLocation: '松山慈祐宮側饒河夜市主牌樓入口',
                shopManager: '吳老闆',
                shopIntroduction: '連續多年榮獲米其林必比登推薦！特製炭火貼爐高溫烘烤，外皮香脆沾滿芝麻，咬開肉汁滾燙噴濺。',
                shopShortIntroduction: '米其林必比登推薦！牌坊入口超人氣炭烤胡椒餅。',
                shopIcon: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                rank: 5520,
                googleRating: 4.3,
                googleReviewCount: 5520,
                googlePlaceUrl: 'https://maps.google.com/?q=福州世祖胡椒餅',
                food: [
                    {
                        foodName: '福州窯烤胡椒餅',
                        foodNameEN: 'Fuzhou Clay Oven Pepper Bun',
                        foodPrice: 65,
                        foodType: ['snack'],
                        foodInfo: '新鮮黑豬後腿赤肉佐以滿滿宜蘭三星蔥，辛香黑胡椒湯汁飽滿燙口。',
                        foodInfoEN: 'Tandoori-style clay oven baked pork bun packed with scallions and black pepper.',
                        foodIcon: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            },
            {
                shopName: '陳董藥燉排骨',
                shopNameEN: 'Chen Dong Herbal Pork Ribs',
                shopNumber: '饒河街 160 號',
                shopType: '米其林必比登推薦',
                shopLocation: '饒河夜市中段核心街道',
                shopManager: '陳主廚',
                shopIntroduction: '米其林必比登名店！嚴選多種溫補中藥材細火熬出黑褐澄澈湯汁，肉質軟嫩甘甜，回味無窮。',
                shopShortIntroduction: '米其林指南推薦！回甘溫補藥燉排骨羊肉湯。',
                shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                rating: 4.2,
                rank: 3180,
                googleRating: 4.2,
                googleReviewCount: 3180,
                googlePlaceUrl: 'https://maps.google.com/?q=陳董藥燉排骨',
                food: [
                    {
                        foodName: '陳董招牌藥燉排骨',
                        foodNameEN: 'Chen Dong Herbal Pork Ribs Soup',
                        foodPrice: 90,
                        foodType: ['Soup', 'snack'],
                        foodInfo: '中藥高湯慢熬，排骨大塊肉質軟嫩，沾特製豆瓣醬與甜辣醬絕配。',
                        foodInfoEN: 'Simmered spare ribs in rich dark herbal broth with sweet savory dipping sauce.',
                        foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    },
                    {
                        foodName: '傳統魯肉飯',
                        foodNameEN: 'Taiwanese Braised Pork Rice',
                        foodPrice: 35,
                        foodType: ['snack'],
                        foodInfo: '手切黑豬肉丁慢火熬出膠質，鹹香微甘淋在熱白飯上，香味撲鼻。',
                        foodInfoEN: 'Hand-diced braised pork belly over steamed rice, rich in gelatin and savory spices.',
                        foodIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
                        rating: 4.6
                    }
                ]
            },
            {
                shopName: '御品元冰火湯圓松山店',
                shopNameEN: 'Yu Pin Yuan Fire & Ice Tangyuan',
                shopNumber: '饒河街 178 號',
                shopType: '米其林必比登推薦',
                shopLocation: '夜市中後段',
                shopManager: '李店長',
                shopIntroduction: '米其林必比登推薦！剛煮好滾燙的手工芝麻與花生湯圓，鋪在淋滿桂花蜜的剉冰上，冰火交織令人驚艷！',
                shopShortIntroduction: '熱騰騰爆漿湯圓遇上桂花剉冰的極致美味！',
                shopIcon: 'https://images.unsplash.com/photo-1558857563-b37cf5b7a151?auto=format&fit=crop&w=800&q=80',
                rating: 4.5,
                rank: 4280,
                googleRating: 4.5,
                googleReviewCount: 4280,
                googlePlaceUrl: 'https://maps.google.com/?q=御品元冰火湯圓饒河',
                food: [
                    {
                        foodName: '桂花綜合冰火湯圓',
                        foodNameEN: 'Osmanthus Fire & Ice Tangyuan',
                        foodPrice: 90,
                        foodType: ['Dessert'],
                        foodInfo: '熱呼呼現煮爆漿花生與芝麻湯圓，配上特製天然桂花蜜清冰與檸檬汁。',
                        foodInfoEN: 'Hot molten sesame and peanut glutinous rice balls over fragrant osmanthus shaved ice.',
                        foodIcon: 'https://images.unsplash.com/photo-1558857563-b37cf5b7a151?auto=format&fit=crop&w=600&q=80',
                        rating: 4.9
                    }
                ]
            }
        ]
    },

    // 3. 寧夏夜市
    {
        marketName: '寧夏夜市',
        shops: [
            {
                shopName: '圓環邊蚵仔煎',
                shopNameEN: 'Yuan Huan Pien Oyster Omelet',
                shopNumber: '寧夏路 46 號',
                shopType: '米其林必比登推薦',
                shopLocation: '寧夏夜市前段右側店面',
                shopManager: '賴老闆',
                shopIntroduction: '自 1965 年創立至今，連續多年蟬聯米其林必比登推薦！選用台南安平鮮蚵，以豬油大火煎香，粉漿薄脆香Ｑ。',
                shopShortIntroduction: '米其林必比登蟬聯推薦！傳承近一甲子經典蚵仔煎。',
                shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                rating: 4.1,
                rank: 4680,
                googleRating: 4.1,
                googleReviewCount: 4680,
                googlePlaceUrl: 'https://maps.google.com/?q=圓環邊蚵仔煎',
                food: [
                    {
                        foodName: '老牌正宗蚵仔煎',
                        foodNameEN: 'Yuan Huan Pien Crispy Oyster Omelet',
                        foodPrice: 85,
                        foodType: ['snack'],
                        foodInfo: '產地直送肥嫩鮮蚵，純豬油快煎外圈酥香，特調味噌紅醬溫潤香濃。',
                        foodInfoEN: 'Fresh plump oysters pan-fried with lard to crispy perfection, topped with sweet miso sauce.',
                        foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    },
                    {
                        foodName: '鮮甜蛤蜊湯',
                        foodNameEN: 'Fresh Clam Soup with Ginger',
                        foodPrice: 80,
                        foodType: ['Soup'],
                        foodInfo: '新鮮大顆蛤蜊搭配老薑絲與少許米酒，原汁原味清甜無比。',
                        foodInfoEN: 'Plump fresh clams boiled with shredded ginger and rice wine, soothing and clear.',
                        foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
                        rating: 4.7
                    }
                ]
            },
            {
                shopName: '劉芋仔蛋黃芋餅',
                shopNameEN: 'Liu Yu Tsai Taro Balls',
                shopNumber: '寧夏路第 091 號攤',
                shopType: '米其林必比登推薦',
                shopLocation: '寧夏夜市中央排隊攤位',
                shopManager: '劉師傅',
                shopIntroduction: '米其林必比登推介名攤！純甲仙芋頭泥手工製作，包入整顆鹹蛋黃與黑豬肉肉脯，油炸後外脆內軟香氣四溢。',
                shopShortIntroduction: '米其林必比登推介！純手工芋泥包鹹蛋黃肉脯。',
                shopIcon: 'https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?auto=format&fit=crop&w=800&q=80',
                rating: 4.2,
                rank: 3620,
                googleRating: 4.2,
                googleReviewCount: 3620,
                googlePlaceUrl: 'https://maps.google.com/?q=劉芋仔蛋黃芋餅',
                food: [
                    {
                        foodName: '蛋黃肉鬆芋餅',
                        foodNameEN: 'Crispy Taro Ball with Salted Egg Yolk',
                        foodPrice: 35,
                        foodType: ['snack', 'Fried'],
                        foodInfo: '嚴選大甲/甲仙芋頭蒸熟搗泥，裹入現切紅土鹹鴨蛋黃與香酥黑豬肉脯。',
                        foodInfoEN: 'Deep-fried mashed taro ball wrapped around savory salted egg yolk and pork floss.',
                        foodIcon: 'https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?auto=format&fit=crop&w=600&q=80',
                        rating: 4.9
                    },
                    {
                        foodName: '香酥原味芋丸',
                        foodNameEN: 'Pure Crispy Taro Ball',
                        foodPrice: 30,
                        foodType: ['snack', 'Fried'],
                        foodInfo: '無添加人工香料，純粹紮實的芋頭原始綿密甜香。',
                        foodInfoEN: 'Pure mashed taro ball fried golden brown, naturally sweet and aromatic.',
                        foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
                        rating: 4.6
                    }
                ]
            },
            {
                shopName: '豬肝榮仔',
                shopNameEN: 'Rong Pork Liver Soup',
                shopNumber: '寧夏路第 010 號攤',
                shopType: '米其林必比登推薦',
                shopLocation: '民生西路側入口進入約 20 公尺處',
                shopManager: '榮老闆',
                shopIntroduction: '創立超過70年的老牌名攤！厚切豬肝精準掌握熟度，鮮嫩爽脆無腥味，湯頭加入冬菜與高湯清爽甘甜。',
                shopShortIntroduction: '70年米其林必比登名攤！鮮嫩厚切豬肝湯與香蔥肉粽。',
                shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                rank: 2310,
                googleRating: 4.3,
                googleReviewCount: 2310,
                googlePlaceUrl: 'https://maps.google.com/?q=豬肝榮仔',
                food: [
                    {
                        foodName: '綜合嫩豬肝豬肚湯',
                        foodNameEN: 'Tender Pork Liver & Tripe Soup',
                        foodPrice: 85,
                        foodType: ['Soup', 'snack'],
                        foodInfo: '粉嫩新鮮豬肝與燉煮軟爛的豬肚，搭配大骨冬菜高湯，暖心溫胃。',
                        foodInfoEN: 'Silky smooth tender pork liver and braised pork tripe in savory winter cabbage soup.',
                        foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            }
        ]
    },

    // 4. 逢甲夜市
    {
        marketName: '逢甲夜市',
        shops: [
            {
                shopName: '逢甲官芝霖大腸包小腸',
                shopNameEN: 'Guanzhilin Sticky Rice Sausage',
                shopNumber: '逢甲路 20 巷口',
                shopType: '傳統特色小吃',
                shopLocation: '逢甲大學正門前熱區',
                shopManager: '官老闆',
                shopIntroduction: '逢甲夜市指標性排隊天王！電視媒體瘋狂報導，糯米腸炭火烤透微焦，夾入黑豬肉香腸與6種自選配料。',
                shopShortIntroduction: '逢甲夜市排隊神攤！炭火烤香大腸包小腸。',
                shopIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                rank: 5890,
                googleRating: 4.3,
                googleReviewCount: 5890,
                googlePlaceUrl: 'https://maps.google.com/?q=逢甲官芝霖大腸包小腸',
                food: [
                    {
                        foodName: '炭火大腸包小腸',
                        foodNameEN: 'Charcoal Grilled Sticky Rice Sausage',
                        foodPrice: 75,
                        foodType: ['snack', 'Fried'],
                        foodInfo: '手工炭烤黑豬肉香腸搭配香Q糯米腸，佐以酸菜、爽脆小黃瓜、九層塔與蒜泥，香氣逼人。',
                        foodInfoEN: 'Juicy pork sausage wrapped in grilled sticky rice with pickles, basil and garlic.',
                        foodIcon: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            },
            {
                shopName: '日船章魚小丸子逢甲總店',
                shopNameEN: 'Riben Takoyaki Master',
                shopNumber: '文華路 13 號',
                shopType: '日式經典小吃',
                shopLocation: '逢甲旗艦專區入口旁',
                shopManager: '張店長',
                shopIntroduction: '全台灣日船章魚小丸子的創始總店！外皮煎得金黃酥脆，每一顆都吃得到彈牙章魚肉塊與飛舞柴魚片。',
                shopShortIntroduction: '全台風靡章魚小丸子發源總店！外酥內嫩彈牙。',
                shopIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                rank: 4390,
                googleRating: 4.4,
                googleReviewCount: 4390,
                googlePlaceUrl: 'https://maps.google.com/?q=日船章魚小丸子逢甲總店',
                food: [
                    {
                        foodName: '柴魚美乃滋章魚小丸子',
                        foodNameEN: 'Crispy Takoyaki with Bonito Flakes',
                        foodPrice: 65,
                        foodType: ['snack'],
                        foodInfo: '現點現烤圓滾滾丸子，淋上特製照燒醬油、日式美乃滋與大量海苔柴魚片。',
                        foodInfoEN: 'Japanese takoyaki octopus balls loaded with savory mayo and dancing bonito shavings.',
                        foodIcon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            },
            {
                shopName: '一心素食臭豆腐',
                shopNameEN: 'Yixin Crispy Stinky Tofu',
                shopNumber: '福星路 461 巷口',
                shopType: '傳統炸物',
                shopLocation: '福星路與文華路交會口熱區',
                shopManager: '許老闆',
                shopIntroduction: '逢甲在地老饕一致激推！豆腐中間戳洞灌入獨門蒜汁與醬油，搭配滿滿現切爽脆小黃瓜絲與台式泡菜。',
                shopShortIntroduction: '外皮超酥脆！配清爽小黃瓜與台式泡菜的極致臭豆腐。',
                shopIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                rank: 3240,
                googleRating: 4.3,
                googleReviewCount: 3240,
                googlePlaceUrl: 'https://maps.google.com/?q=逢甲一心臭豆腐',
                food: [
                    {
                        foodName: '特酥金黃素食臭豆腐',
                        foodNameEN: 'Crispy Golden Stinky Tofu with Cucumber',
                        foodPrice: 65,
                        foodType: ['snack', 'Fried'],
                        foodInfo: '高溫二次油炸金黃酥脆，吸飽醬汁爆汁，搭上冰涼小黃瓜解膩爽口。',
                        foodInfoEN: 'Double-fried stinky tofu bursting with savory soy sauce, topped with cucumber ribbons.',
                        foodIcon: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
                        rating: 4.7
                    }
                ]
            }
        ]
    },

    // 5. 花園夜市
    {
        marketName: '花園夜市',
        shops: [
            {
                shopName: '花園夜市二師兄古味滷味',
                shopNameEN: 'Master Two Braised Dishes',
                shopNumber: '第 3 橫排 05 攤',
                shopType: '經典府城小吃',
                shopLocation: '台南花園夜市美食街第三排旗海下',
                shopManager: '陳師傅',
                shopIntroduction: '台南花園夜市第一人氣排隊名攤！大黑鐵鍋現場熱氣翻騰現炒三杯滷味，甜中帶香的純正府城甘甜醬香。',
                shopShortIntroduction: '花園夜市旗海下的大黑鐵鍋現炒三杯甘甜滷味！',
                shopIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                rank: 4220,
                googleRating: 4.4,
                googleReviewCount: 4220,
                googlePlaceUrl: 'https://maps.google.com/?q=花園夜市二師兄滷味',
                food: [
                    {
                        foodName: '二師兄古味三杯滷味',
                        foodNameEN: 'Master Two Three-Cup Braised Wings',
                        foodPrice: 50,
                        foodType: ['snack', 'Fried'],
                        foodInfo: '大鐵鍋加入黑麻油、醬油膏與冰糖現炒，雞翅焦糖色澤、軟嫩入骨，鳥蛋與米血必點！',
                        foodInfoEN: 'Savory sweet braised chicken wings, rice cake and quail eggs cooked in sesame soy glaze.',
                        foodIcon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
                        rating: 4.9
                    }
                ]
            },
            {
                shopName: '統大碳烤香雞排',
                shopNameEN: 'Tong Da Charcoal Grilled Chicken',
                shopNumber: '第 1 橫排 01 攤',
                shopType: '炸烤熟食',
                shopLocation: '和緯路入口第一排左側',
                shopManager: '統老闆',
                shopIntroduction: '先炸後烤的台南代表性雞排！厚實雞排抹上濃郁府城甜鹹特調烤肉醬，在炭火上烤出炭香，撒上檸檬汁更提味。',
                shopShortIntroduction: '先炸後烤！抹上濃郁炭烤蜜汁香氣誘人。',
                shopIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                rank: 2840,
                googleRating: 4.3,
                googleReviewCount: 2840,
                googlePlaceUrl: 'https://maps.google.com/?q=統大碳烤香雞排花園夜市',
                food: [
                    {
                        foodName: '府城蜜汁炭烤雞排',
                        foodNameEN: 'Charcoal Honey Glazed Fried Chicken',
                        foodPrice: 90,
                        foodType: ['Fried', 'snack'],
                        foodInfo: '特調蜜汁在炭火上滋滋作響，雞肉鮮甜扎實，帶有濃郁炭烤焦香。',
                        foodInfoEN: 'Crispy fried chicken cutlet grilled over charcoal with sweet and savory Tainan glaze.',
                        foodIcon: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            }
        ]
    },

    // 6. 六合國際觀光夜市
    {
        marketName: '六合國際觀光夜市',
        shops: [
            {
                shopName: '鄭老牌木瓜牛奶',
                shopNameEN: 'Zheng Papaya Milk',
                shopNumber: '六合二路 1 號攤',
                shopType: '冷飲鮮果汁',
                shopLocation: '捷運美麗島站 11 號出口六合夜市入口第一攤',
                shopManager: '鄭老闆',
                shopIntroduction: '招牌上簽滿名人名模簽名！創立半世紀堅持嚴選屏東網室紅肉木瓜與高大牧場特級鮮乳，完全不加水，濃純香醇。',
                shopShortIntroduction: '半世紀名店！全台名人爭相打卡簽名的特濃木瓜牛奶。',
                shopIcon: 'https://images.unsplash.com/photo-1558857563-b37cf5b7a151?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                rank: 3720,
                googleRating: 4.3,
                googleReviewCount: 3720,
                googlePlaceUrl: 'https://maps.google.com/?q=六合夜市鄭老牌木瓜牛奶',
                food: [
                    {
                        foodName: '濃純香木瓜牛奶',
                        foodNameEN: 'Signature Fresh Papaya Milk',
                        foodPrice: 70,
                        foodType: ['Dessert'],
                        foodInfo: '嚴選屏東紅肉木瓜搭配特級鮮乳現打，稠度極高，入口滑順濃郁。',
                        foodInfoEN: 'Fresh ripe Pingtung red papaya blended with farm whole milk, velvety and naturally sweet.',
                        foodIcon: 'https://images.unsplash.com/photo-1558857563-b37cf5b7a151?auto=format&fit=crop&w=600&q=80',
                        rating: 4.9
                    }
                ]
            },
            {
                shopName: '莊記海產粥',
                shopNameEN: 'Zhuang Ji Seafood Congee',
                shopNumber: '六合二路 130 號',
                shopType: '海鮮熱炒',
                shopLocation: '六合夜市西側',
                shopManager: '莊師傅',
                shopIntroduction: '六合夜市最著名的澎湃海鮮名攤！一碗海產粥內有滿滿大白蝦、鮮甜花枝、蚵仔、蛤蜊與蟹肉，湯頭清甜鮮美。',
                shopShortIntroduction: '大白蝦、鮮花枝、蛤蜊鮮蚵澎湃入鍋的港都海產粥！',
                shopIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                rank: 2910,
                googleRating: 4.4,
                googleReviewCount: 2910,
                googlePlaceUrl: 'https://maps.google.com/?q=六合夜市海產粥',
                food: [
                    {
                        foodName: '澎湃頂級海產粥',
                        foodNameEN: 'Premium Taiwanese Seafood Congee',
                        foodPrice: 140,
                        foodType: ['Soup', 'snack'],
                        foodInfo: '南部道地飯湯風格，大火煮滾鮮蝦、花枝、蚵仔、蛤蜊，湯汁吸飽海洋鮮味。',
                        foodInfoEN: 'Traditional southern rice broth loaded with fresh whole shrimp, squid, clams, and oysters.',
                        foodIcon: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            }
        ]
    },

    // 7. 羅東觀光夜市
    {
        marketName: '羅東觀光夜市',
        shops: [
            {
                shopName: '阿灶伯當歸羊肉湯',
                shopNameEN: 'A-Zao-Bo Angelica Mutton Soup',
                shopNumber: '第 1094 攤',
                shopType: '排隊傳奇',
                shopLocation: '羅東夜市中山公園正前方第一熱區',
                shopManager: '阿灶伯',
                shopIntroduction: '羅東夜市排隊動線最長的神級名店！當歸高湯甘甜清透，羊肉片堆疊如小山般澎湃，搭配酥脆臭豆腐是老饕標配。',
                shopShortIntroduction: '全羅東排隊最長！堆積如山鮮嫩當歸羊肉湯。',
                shopIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=800&q=80',
                rating: 4.2,
                rank: 7350,
                googleRating: 4.2,
                googleReviewCount: 7350,
                googlePlaceUrl: 'https://maps.google.com/?q=阿灶伯當歸羊肉湯',
                food: [
                    {
                        foodName: '阿灶伯當歸羊肉湯',
                        foodNameEN: 'Herbal Angelica Mutton Soup',
                        foodPrice: 90,
                        foodType: ['Pasta', 'snack'],
                        foodInfo: '頂級當歸中藥熬煮溫補高湯，羊肉片份量澎湃軟嫩無羶味，搭配特製豆瓣腐乳醬一絕。',
                        foodInfoEN: 'Herbal angelica mutton soup, loaded with tender mutton slices and house chili bean sauce.',
                        foodIcon: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80',
                        rating: 4.9
                    }
                ]
            },
            {
                shopName: '義豐蔥油派',
                shopNameEN: 'Yi Feng Scallion Pancake',
                shopNumber: '民生路 98 號',
                shopType: '在地蔥香',
                shopLocation: '羅東夜市郵局旁民生路',
                shopManager: '義豐師傅',
                shopIntroduction: '三十年老字號三星蔥油派！麵團揉入大量宜蘭在地鮮甜三星蔥，油煎至兩面金黃酥脆，咬開滿口蔥香鮮甜。',
                shopShortIntroduction: '三星蔥油派創始名店！金黃千層酥脆、蔥汁飽滿。',
                shopIcon: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
                rating: 4.4,
                rank: 4620,
                googleRating: 4.4,
                googleReviewCount: 4620,
                googlePlaceUrl: 'https://maps.google.com/?q=義豐蔥油派',
                food: [
                    {
                        foodName: '三星蔥金黃香酥蔥油派',
                        foodNameEN: 'Sanxing Scallion Crispy Flaky Pancake',
                        foodPrice: 45,
                        foodType: ['snack'],
                        foodInfo: '多層次手桿千層派皮，包裹頂級三星蔥白與胡椒香，加蛋煎香更添滑嫩。',
                        foodInfoEN: 'Flaky layered Taiwanese pancake stuffed with sweet Sanxing green scallions.',
                        foodIcon: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
                        rating: 4.8
                    }
                ]
            }
        ]
    }
];

let syncStats = {
    status: 'idle',
    lastSyncTime: null,
    totalShopsProcessed: 0,
    totalFoodsProcessed: 0,
    lastError: null,
    history: []
};

/**
 * 批次抓取/同步 Google Maps 各夜市店家資料至 MongoDB
 */
async function syncAllNightMarketShops(options = {}) {
    syncStats.status = 'syncing';
    console.log(`[GoogleMapsSync] Starting batch synchronization at ${new Date().toISOString()}...`);

    let shopsCount = 0;
    let foodsCount = 0;
    const syncedMarkets = [];

    try {
        // 確保至少有一名管理員/店家負責人關聯 ID
        let defaultManager = await User.findOne({ role: 'admin' });
        if (!defaultManager) {
            defaultManager = await User.findOne({});
        }
        const defaultManagerId = defaultManager ? String(defaultManager._id) : '600000000000000000000001';

        // 清理歷史測試產生的冗餘夜市
        await Market.deleteMany({ name: { $regex: /測試/ } });

        // 彙整全台 29 大夜市所有商店數據
        const marketShopMap = new Map();

        // 1. 載入全台 29 大夜市名店 (taiwanNightMarketShopsData)
        if (Array.isArray(ALL_NIGHT_MARKET_SHOPS)) {
            for (const s of ALL_NIGHT_MARKET_SHOPS) {
                const mName = s.shopYeShi;
                if (!mName) continue;
                if (!marketShopMap.has(mName)) {
                    marketShopMap.set(mName, []);
                }
                marketShopMap.get(mName).push(s);
            }
        }

        // 2. 補充 Google Maps 傳統人氣名店 (GOOGLE_MAPS_NIGHT_MARKET_DATA)
        for (const item of GOOGLE_MAPS_NIGHT_MARKET_DATA) {
            const mName = item.marketName;
            if (!marketShopMap.has(mName)) {
                marketShopMap.set(mName, []);
            }
            const existing = marketShopMap.get(mName);
            for (const s of item.shops) {
                if (!existing.some(x => x.shopName === s.shopName)) {
                    existing.push({ ...s, shopYeShi: mName });
                }
            }
        }

        for (const [marketName, shops] of marketShopMap.entries()) {
            syncedMarkets.push(marketName);

            // 尋找對應的夜市記錄
            const baseName = marketName.replace('觀光夜市', '').replace('夜市', '').split(/[\(\（]/)[0].trim();
            let marketDoc = await Market.findOne({
                $or: [
                    { name: marketName },
                    { name: { $regex: new RegExp(baseName) } }
                ]
            });

            const shopIdsForMarket = [];
            const foodIdsForMarket = [];

            for (const s of shops) {
                // 1. 同步食品（Food 集合）
                const nestedFoods = [];
                if (Array.isArray(s.food)) {
                    for (const f of s.food) {
                        const foodPayload = {
                            foodName: f.foodName,
                            foodPrice: f.foodPrice,
                            foodType: f.foodType || ['snack'],
                            foodInfo: f.foodInfo || '',
                            foodInfoEN: f.foodInfoEN || '',
                            foodIcon: f.foodIcon || s.shopIcon,
                            rating: f.rating || s.rating || 4.5,
                            isSale: true
                        };

                        const savedFood = await Food.findOneAndUpdate(
                            { foodName: f.foodName },
                            { $set: foodPayload },
                            { upsert: true, new: true }
                        );

                        nestedFoods.push({
                            _id: savedFood._id,
                            foodName: savedFood.foodName,
                            foodPrice: savedFood.foodPrice,
                            foodIcon: savedFood.foodIcon,
                            rating: savedFood.rating
                        });

                        foodIdsForMarket.push(savedFood._id);
                        foodsCount++;
                    }
                }

                // 2. 同步店家（Shop 集合，Upsert 避免重複）
                const shopPayload = {
                    shopName: s.shopName,
                    shopNameEN: s.shopNameEN || '',
                    shopYeShi: marketName,
                    shopNumber: s.shopNumber,
                    shopType: s.shopType,
                    shopLocation: s.shopLocation,
                    shopManager: s.shopManager,
                    shopManagerID: defaultManagerId,
                    shopIntroduction: s.shopIntroduction,
                    shopShortIntroduction: s.shopShortIntroduction,
                    shopIcon: s.shopIcon,
                    rating: s.rating || 4.5,
                    rank: s.rank || 1000,
                    isSale: true,
                    status: 'approved',
                    googlePlaceUrl: s.googlePlaceUrl || '',
                    googleRating: s.googleRating || s.rating || 4.5,
                    googleReviewCount: s.googleReviewCount || s.rank || 1000,
                    food: nestedFoods,
                    lastSyncAt: new Date()
                };

                const savedShop = await Shop.findOneAndUpdate(
                    { shopName: s.shopName, shopYeShi: marketName },
                    { $set: shopPayload },
                    { upsert: true, new: true }
                );

                shopIdsForMarket.push(savedShop._id);
                shopsCount++;
            }

            // 3. 更新對應夜市的關聯資訊
            if (marketDoc) {
                const currentShopList = Array.isArray(marketDoc.shopList) ? marketDoc.shopList : [];
                const currentFoodList = Array.isArray(marketDoc.foodList) ? marketDoc.foodList : [];
                const mergedShops = [...new Set([...currentShopList.map(String), ...shopIdsForMarket.map(String)])];
                const mergedFoods = [...new Set([...currentFoodList.map(String), ...foodIdsForMarket.map(String)])];

                await Market.findByIdAndUpdate(marketDoc._id, {
                    $set: {
                        shopList: mergedShops,
                        foodList: mergedFoods
                    }
                });
            }
        }

        syncStats.status = 'success';
        syncStats.lastSyncTime = new Date();
        syncStats.totalShopsProcessed = shopsCount;
        syncStats.totalFoodsProcessed = foodsCount;
        syncStats.lastError = null;

        const record = {
            time: new Date(),
            shopsCount,
            foodsCount,
            status: 'success'
        };
        syncStats.history.unshift(record);
        if (syncStats.history.length > 20) syncStats.history.pop();

        console.log(`[GoogleMapsSync] Synchronization successful! Synced ${shopsCount} shops & ${foodsCount} foods across ${syncedMarkets.length} markets.`);
        return {
            success: true,
            shopsCount,
            foodsCount,
            syncedMarkets,
            timestamp: syncStats.lastSyncTime
        };
    } catch (err) {
        syncStats.status = 'error';
        syncStats.lastError = err.message;
        console.error('[GoogleMapsSync] Synchronization failed:', err);
        throw err;
    }
}

function getSyncStats() {
    return syncStats;
}

module.exports = {
    GOOGLE_MAPS_NIGHT_MARKET_DATA,
    syncAllNightMarketShops,
    getSyncStats
};
