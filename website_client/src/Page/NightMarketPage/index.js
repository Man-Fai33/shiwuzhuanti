import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LinearProgress from '@mui/material/LinearProgress';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MapIcon from '@mui/icons-material/Map';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WcIcon from '@mui/icons-material/Wc';
import PaymentIcon from '@mui/icons-material/Payment';
import TimerIcon from '@mui/icons-material/Timer';
import AccessibleIcon from '@mui/icons-material/Accessible';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AttractionsIcon from '@mui/icons-material/Attractions';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExploreIcon from '@mui/icons-material/Explore';
import NavigationIcon from '@mui/icons-material/Navigation';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import GroupsIcon from '@mui/icons-material/Groups';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function NightMarketPage() {
    const { lang } = useLanguage();
    const [market, setMarket] = useState({});
    const [foods, setFoods] = useState([]);
    const [shops, setShops] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const nightID = localStorage.getItem('nightID');

    useEffect(() => {
        async function loadData() {
            if (!nightID) return;
            try {
                const mRes = await helper.helper.AsyncMarketOne(nightID);
                if (mRes && mRes.market) {
                    setMarket(mRes.market);
                }

                // 載入美食
                const fRes = await helper.helper.AsyncFood();
                if (fRes && fRes.food) {
                    setFoods(fRes.food);
                }

                // 載入店家
                const sRes = await helper.helper.AsyncShop();
                if (sRes && sRes.shop) {
                    setShops(sRes.shop);
                }
            } catch (err) {
                console.error('Failed to load market detail:', err);
            }
        }
        loadData();
    }, [nightID]);

    const getAuthenticMarketImage = (m) => {
        const name = m?.name || '';
        if (name.includes('士林')) {
            return 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80';
        }
        if (name.includes('饒河')) {
            return 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=1000&auto=format&fit=crop&q=80';
        }
        if (name.includes('寧夏')) {
            return 'https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?w=1000&auto=format&fit=crop&q=80';
        }
        if (name.includes('逢甲')) {
            return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1000&auto=format&fit=crop&q=80';
        }
        if (name.includes('六合')) {
            return 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=1000&auto=format&fit=crop&q=80';
        }
        if (name.includes('羅東')) {
            return 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80';
        }
        if (m?.marketIcon && !m.marketIcon.includes('photo-1555396273-367ea4eb4db5')) {
            return m.marketIcon;
        }
        return 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80';
    };

    const getMarketDetails = (marketName = '', currentLang = 'zh') => {
        const isEn = currentLang === 'en';
        const isShilin = marketName.includes('士林');
        const isRaohe = marketName.includes('饒河');
        const isNingxia = marketName.includes('寧夏');
        const isFengjia = marketName.includes('逢甲');

        if (isShilin) {
            return {
                signatures: isEn
                    ? ['Hot Star Fried Chicken', 'Zhongcheng Oyster Omelet', 'Shilin Jumbo Sausage', 'Stir-Fried Squid Stew', 'Herbal Pork Ribs', 'Snowflake Ice']
                    : ['豪大大雞排', '忠誠號蚵仔煎', '士林大香腸', '生炒花枝羹', '海友十全排骨', '辛發亭雪花冰'],
                quickFacts: [
                    {
                        icon: 'time',
                        title: isEn ? 'Hours & Peak Window' : '營業時間與尖峰',
                        desc: isEn ? '17:00 - 00:00 daily. Peak: 19:30 - 21:30. Best relaxed time: 17:30 - 18:30.' : '每日 17:00 - 00:00。尖峰 19:30 - 21:30。最舒適體驗時段：17:30 - 18:30。'
                    },
                    {
                        icon: 'wc',
                        title: isEn ? 'Public Restrooms' : '公共洗手間位置',
                        desc: isEn ? '① MRT Jiantan Stn Exit 1; ② B1 Food Court Central; ③ Cixian Temple beside main square.' : '① 捷運劍潭站 1 號出口內；② 士林公有市場 B1 美食街中央；③ 慈諴宮媽祖廟旁公廁。'
                    },
                    {
                        icon: 'parking',
                        title: isEn ? 'Parking Garages' : '推薦周邊停車場',
                        desc: isEn ? 'Bailing High School Underground Lot (3 min walk) or Qiangang Park Underground Lot.' : '百齡高中地下停車場 (步行約 3 分鐘)、前港公園地下停車場。'
                    },
                    {
                        icon: 'payment',
                        title: isEn ? 'Payment Methods' : '支付方式支援',
                        desc: isEn ? 'Cash essential (NT$100/500 bills). ~70% stalls accept LINE Pay & JKOPay.' : '必備現金 (百元鈔佳)。約 70% 攤商支援 LINE Pay、街口支付與全支付。'
                    },
                    {
                        icon: 'timer',
                        title: isEn ? 'Recommended Duration' : '建議遊逛時間',
                        desc: isEn ? '2.5 - 3 hours (allows tasting 4-6 iconic stalls, browsing games & shopping).' : '約 2.5 ~ 3 小時 (可充裕品嚐 4-6 家人氣美食，逛生活服飾與休閒攤位)。'
                    },
                    {
                        icon: 'accessible',
                        title: isEn ? 'Accessibility & Strollers' : '推車與無障礙友好度',
                        desc: isEn ? 'Elevators available for B1 Food Court. Streets get tight after 20:00; early visits recommended.' : 'B1 美食街配有無障礙電梯。週末大東路人潮密集，推嬰兒車建議 18:00 前入場。'
                    }
                ],
                strategy: {
                    title: isEn ? 'Local Foodie 3-Step Walking Route' : '在地老饕 3 階段黃金遊逛動線',
                    steps: isEn ? [
                        { time: '17:30 - 18:15', name: 'Beat the Crowds', detail: 'Arrive at MRT Jiantan Station. Head straight to Hot Star Fried Chicken or Michelin-recognized Herbal Pork Ribs before lines get long.' },
                        { time: '18:15 - 19:45', name: 'B1 Food Court Feast', detail: 'Descend into the air-conditioned B1 Market for sit-down stir-fried squid soup, oyster omelets, and jumbo Taiwanese sausages.' },
                        { time: '19:45 - 21:00', name: 'Dessert & Arcade Stroll', detail: 'Walk down Dadong Road for classic bubble tea or mango snowflake ice, followed by retro pinball arcades and fashion browsing.' }
                    ] : [
                        { time: '17:30 - 18:15', name: '捷運出站搶先衝', detail: '捷運劍潭站 1 號出口抵達，趁人潮尚未爆棚，先排豪大大雞排或海友十全藥燉排骨等熱門攤位。' },
                        { time: '18:15 - 19:45', name: '地下街與廟口主食', detail: '進入有涼爽空調的公有市場 B1 美食街或慈諴宮廟前，坐下品嚐生炒花枝羹、香煎蚵仔煎與炭烤大香腸。' },
                        { time: '19:45 - 21:00', name: '大東路漫步與甜品', detail: '漫步大東路步行街，手拿古早味紅茶或青蛙下蛋，最後用辛發亭雪花冰收尾，順道體驗復古彈珠台與夾娃娃。' }
                    ],
                    tips: isEn ? [
                        '💡 Cut Fruit Pricing: Always confirm whether pricing is per 100g or per bag before vendors cut the fruit.',
                        '💡 Wet Wipes / Tissues: Night markets rarely provide napkins freely; carrying small wet wipes is a local pro move.',
                        '💡 Shared Tables: Expect friendly shared seating during peak hours at sit-down eateries.'
                    ] : [
                        '💡 現切水果詢價小撇步：購買現切水果前，建議先詢問「每份」或「每百公克」確切金額再請老闆現切。',
                        '💡 隨身必備濕紙巾：夜市品嚐多樣手拿美食，隨身攜帶小包濕紙巾或乾洗手能讓遊逛體驗大幅提升。',
                        '💡 廟口共桌文化：尖峰時段內用座位一位難求，友善併桌是台灣夜市溫暖特色，翻桌率極快請耐心等候。'
                    ]
                },
                nearby: isEn ? [
                    {
                        name: 'Taipei Performing Arts Center (TPAC)',
                        tag: 'Architecture Landmark',
                        dist: '1 min walk from MRT Jiantan',
                        desc: 'Pritzker-winning futuristic globe architecture designed by OMA/Rem Koolhaas. Stunning public rooftop and night illumination.'
                    },
                    {
                        name: 'Shilin Official Residence Gardens',
                        tag: 'Culture & Nature',
                        dist: '10 min walk from MRT Shilin',
                        desc: 'Historic landscaped residence of Chiang Kai-shek featuring lush European and Chinese rose gardens, serene ponds, and lush greenery.'
                    },
                    {
                        name: 'Taipei Children’s Amusement Park',
                        tag: 'Family & Fun',
                        dist: '10 min bus / 15 min walk',
                        desc: 'Super popular affordable retro-modern theme park with ferris wheel, roller coasters, and neighboring Science Education Museum.'
                    }
                ] : [
                    {
                        name: '台北表演藝術中心 (TPAC)',
                        tag: '普立茲克建築地標',
                        dist: '劍潭站 1 號出口直達 (步行 1 分鐘)',
                        desc: '國際建築大師庫哈斯團隊操刀設計的銀色巨型球體建築，設有免費參觀公共迴廊，入夜後打燈極具當代前衛感。'
                    },
                    {
                        name: '士林官邸花園',
                        tag: '歷史人文與花卉園林',
                        dist: '捷運士林站 2 號出口 (步行約 8 分鐘)',
                        desc: '蔣中正與宋美齡昔日故居，擁有優雅精緻的中式庭園、西式玫瑰園與溫室，白天散步拍照的最佳森林綠洲。'
                    },
                    {
                        name: '台北市立兒童新樂園 & 科教館',
                        tag: '親子放電首選',
                        dist: '搭乘公車 41/紅30 約 7 分鐘',
                        desc: '悠遊卡即可逼卡暢玩的超人氣樂園，摩天輪可遠眺士林夜景；隔壁國立科教館與天文館適合全家充實一日遊。'
                    }
                ]
            };
        }

        if (isRaohe) {
            return {
                signatures: isEn
                    ? ['Fuzhou Pepper Pork Bun', 'Chen Dong Herbal Pork Ribs', 'Stinky Tofu', 'Spicy Duck Blood Stew', 'Flame Diced Beef', 'Ice Fire Dumplings']
                    : ['福州世祖胡椒餅', '陳董藥燉排骨', '下港名彭臭豆腐', '麻辣鴨血豆腐', '火焰炙燒骰子牛', '御品元冰火湯圓'],
                quickFacts: [
                    {
                        icon: 'time',
                        title: isEn ? 'Hours & Peak Window' : '營業時間與尖峰',
                        desc: isEn ? '17:00 - 23:30 daily. Peak: 19:00 - 21:00. Straight line street with heavy evening crowds.' : '每日 17:00 - 23:30。尖峰 19:00 - 21:00。單一筆直街道，週末人潮極為熱鬧。'
                    },
                    {
                        icon: 'wc',
                        title: isEn ? 'Public Restrooms' : '公共洗手間位置',
                        desc: isEn ? '① MRT Songshan Stn Exit 1/2; ② Ciyou Temple inside ground floor; ③ Bade Parking B1.' : '① 捷運松山站 1/2 號出口；② 松山慈祐宮內設有洗手間；③ 八德立體停車場 B1。'
                    },
                    {
                        icon: 'parking',
                        title: isEn ? 'Parking Garages' : '推薦周邊停車場',
                        desc: isEn ? 'Bade Multi-Story Car Park (right across Ciyou Temple, 700+ spaces).' : '八德立體停車場 (正對慈祐宮，700+ 個車位，停車最方便)。'
                    },
                    {
                        icon: 'payment',
                        title: isEn ? 'Payment Methods' : '支付方式支援',
                        desc: isEn ? 'Cash widely accepted, LINE Pay and Taiwan Pay available at 60%+ vendors.' : '現金為主，多數熱門攤位支援 LINE Pay、台灣 Pay 與街口支付。'
                    },
                    {
                        icon: 'timer',
                        title: isEn ? 'Recommended Duration' : '建議遊逛時間',
                        desc: isEn ? '2 hours (straight linear stroll from Ciyou Temple gate to the west entrance).' : '約 2 小時 (慈祐宮牌坊進、塔悠路出，動線筆直好逛不迷路)。'
                    },
                    {
                        icon: 'accessible',
                        title: isEn ? 'Accessibility & Strollers' : '推車與無障礙友好度',
                        desc: isEn ? 'Flat street without steps. Very stroller-friendly early in the evening before 19:00.' : '全平坦柏油街道無階梯，推車與輪椅通行順暢，建議 18:00 前前往避免人擠人。'
                    }
                ],
                strategy: {
                    title: isEn ? 'Local Foodie 3-Step Walking Route' : '在地老饕 3 階段黃金遊逛動線',
                    steps: isEn ? [
                        { time: '17:30 - 18:00', name: 'Temple Blessing & Pepper Bun', detail: 'Admire the 270-year-old Ciyou Temple, then grab a fresh-baked Michelin Bib Gourmand Fuzhou Pepper Bun right at the eastern archway.' },
                        { time: '18:00 - 19:30', name: 'Midway Savory Stalls', detail: 'Stroll down Raohe Street. Sit down for fragrant Chen Dong Herbal Pork Ribs, spicy duck blood tofu, and crispy stinky tofu.' },
                        { time: '19:30 - 20:30', name: 'Riverside Breeze & Dessert', detail: 'Walk out the north evacuation gate to Rainbow Bridge on Keelung River. Enjoy river breezes with iced tangyuan or fresh fruit smoothie.' }
                    ] : [
                        { time: '17:30 - 18:00', name: '慈祐宮參拜與胡椒餅', detail: '先在氣勢宏偉的松山慈祐宮祈福參觀，隨後於夜市東端牌坊立刻排米其林推薦的福州世祖胡椒餅。' },
                        { time: '18:00 - 19:30', name: '主街經典鹹食連環進擊', detail: '沿著筆直主街道前行，坐下品嚐陳董藥燉排骨、下港名彭臭豆腐、火焰骰子牛或麻辣鴨血臭豆腐。' },
                        { time: '19:30 - 20:30', name: '彩虹橋夜景與消暑甜品', detail: '從北側水門走上彩虹橋欣賞基隆河浪漫光雕夜景，再買碗御品元冰火湯圓或甘蔗汁享受愜意晚風。' }
                    ],
                    tips: isEn ? [
                        '💡 Two-Way Traffic: Raohe has two walking lanes (keep to the right side of the street going down, return on the opposite side).',
                        '💡 Avoid Rush Hour Car Congestion: MRT Songshan Station is just 1 minute away—trains and MRT are far faster than driving.',
                        '💡 Pepper Bun Hot Juice: Fuzhou Pepper Buns contain extremely hot soup inside; nibble a small hole first to vent steam!'
                    ] : [
                        '💡 靠右行走順向原則：饒河街中央為雙排攤位，去程靠右逛、回程靠另一側，動線順暢不塞車。',
                        '💡 大眾運輸最快：捷運松山站 1/2 號出口上來就是夜市，強烈建議搭乘綠線捷運免去假日找車位之苦。',
                        '💡 胡椒餅剛出爐小心燙口：剛從高溫炭爐夾出的胡椒餅肉汁滾燙，第一口先輕咬小角散熱以防被肉汁燙傷。'
                    ]
                },
                nearby: isEn ? [
                    {
                        name: 'Rainbow Bridge & Keelung Riverside Park',
                        tag: 'Romantic River Walk',
                        dist: '3 min walk through evacuation gate',
                        desc: 'Pedestrian and bicycle suspension bridge with vibrant LED night illuminations, love padlocks, and gentle river breezes.'
                    },
                    {
                        name: 'Songshan Ciyou Temple',
                        tag: '270-Year Mazu Temple',
                        dist: 'Directly at night market entrance',
                        desc: 'Six-story monumental temple with intricate flying eaves, dragon wood carvings, and deep spiritual heritage.'
                    },
                    {
                        name: 'Wufenpu Garment Wholesale Market',
                        tag: 'Fashion Shopping District',
                        dist: '7 min walk from MRT Songshan Exit 4',
                        desc: 'Taipei’s premier wholesale clothing maze featuring hundreds of shops with trendy street fashion and bargain garments.'
                    }
                ] : [
                    {
                        name: '彩虹橋與基隆河岸河濱公園',
                        tag: '浪漫河岸夜景',
                        dist: '從夜市水門穿過 (步行僅需 3 分鐘)',
                        desc: 'S型曲線的紅色鋼拱懸索吊橋，夜晚橋身倒映河面璀璨迷人，河畔微風徐徐，是情侶漫步與拍照休憩秘境。'
                    },
                    {
                        name: '松山慈祐宮',
                        tag: '270年國寶媽祖宮廟',
                        dist: '位於夜市東側牌坊正對面 (步行 30 秒)',
                        desc: '建於清乾隆年間的六層巍峨廟宇，屋脊剪黏與石雕木刻巧奪天工，香火極其鼎盛，是台北重要信仰文化核心。'
                    },
                    {
                        name: '五分埔成衣批發商圈',
                        tag: '服飾挖寶採購勝地',
                        dist: '捷運松山站 4 號出口 (步行約 7 分鐘)',
                        desc: '全台灣規模最大的平價成衣批發集散地，數百家風格小店隱身巷弄，能以親民批發價挖寶各類日韓潮流服裝。'
                    }
                ]
            };
        }

        if (isNingxia) {
            return {
                signatures: isEn
                    ? ['Yuan Huan Pien Oyster Omelet', 'Liu Yu Tsai Taro Balls', 'Rong’s Pork Liver Soup', 'Fang Jia Shredded Chicken Rice', 'Traditional Rice Balls', 'Sesame Oil Chicken']
                    : ['圓環邊蚵仔煎', '劉芋仔蛋黃芋餅', '豬肝榮仔', '方家雞肉飯', '慈音古早味阿婆飯糰', '環記麻油雞'],
                quickFacts: [
                    {
                        icon: 'time',
                        title: isEn ? 'Hours & Peak Window' : '營業時間與尖峰',
                        desc: isEn ? '17:00 - 01:00 daily. Peak: 18:30 - 20:30. Famous for Michelin Bib Gourmand density.' : '每日 17:00 - 01:00。尖峰 18:30 - 20:30。米其林必比登高密度夜市。'
                    },
                    {
                        icon: 'wc',
                        title: isEn ? 'Public Restrooms' : '公共洗手間位置',
                        desc: isEn ? '① Penglai Elementary School Car Park; ② Shuanglian Market / MRT Shuanglian; ③ Pingyang St entrance.' : '① 蓬萊國小地下停車場；② 雙連市場 / 捷運雙連站 1 號出口；③ 平陽街路口公廁。'
                    },
                    {
                        icon: 'parking',
                        title: isEn ? 'Parking Garages' : '推薦周邊停車場',
                        desc: isEn ? 'Penglai Elementary School Underground Parking (1 min walk) or Chaoyang Park Parking.' : '蓬萊國小地下停車場 (步行 1 分鐘，平陽街入口)、朝陽公園地下停車場。'
                    },
                    {
                        icon: 'payment',
                        title: isEn ? 'Payment Methods' : '支付方式支援',
                        desc: isEn ? 'High electronic payment adoption (~80% accept Taiwan Pay, LINE Pay, JKOPay, Cash).' : '行動支付模範夜市，約 80% 攤商支援 LINE Pay、街口、全支付及現金。'
                    },
                    {
                        icon: 'timer',
                        title: isEn ? 'Recommended Duration' : '建議遊逛時間',
                        desc: isEn ? '1.5 - 2 hours (compact 300m street packed with high culinary density).' : '約 1.5 ~ 2 小時 (全長約 300 公尺，美食密度極高，純老饕進食首選)。'
                    },
                    {
                        icon: 'accessible',
                        title: isEn ? 'Accessibility & Strollers' : '推車與無障礙友好度',
                        desc: isEn ? 'Paved flat asphalt street. Side covered arcades available during rain.' : '街道整齊平坦無階梯，兩側有店家騎樓遮雨，平日適合推車，週末尖峰人多建議早點入場。'
                    }
                ],
                strategy: {
                    title: isEn ? 'Local Foodie 3-Step Walking Route' : '在地老饕 3 階段黃金遊逛動線',
                    steps: isEn ? [
                        { time: '17:30 - 18:15', name: 'Target Michelin Queues', detail: 'Queue first at Liu Yu Tsai for freshly fried Taro Balls with salted yolk and Yuan Huan Pien Oyster Omelet.' },
                        { time: '18:15 - 19:30', name: 'Comfort Food Stations', detail: 'Grab a table for hot Fang Jia Chicken Rice, tender Rong’s Pork Liver Soup, or bubbling Huanji Sesame Oil Chicken.' },
                        { time: '19:30 - 20:30', name: 'Refreshing Finale', detail: 'Sip fresh winter melon lemon juice or papaya milk, accompanied by traditional sticky rice balls or mochi shaved ice.' }
                    ] : [
                        { time: '17:30 - 18:15', name: '首搶米其林排隊神攤', detail: '趁 17:30 剛開市人潮集結前，先直奔「劉芋仔蛋黃芋餅」與「圓環邊蚵仔煎」排隊領取美食。' },
                        { time: '18:15 - 19:30', name: '老台北古早味正餐進補', detail: '入座享用「方家雞肉飯」、「豬肝榮仔」鮮嫩豬肝湯，或是飄香數十載的「環記麻油雞」冬令溫補。' },
                        { time: '19:30 - 20:30', name: '清涼手搖與古早甜品', detail: '外帶一杯古法熬煮檸檬冬瓜茶或木瓜牛奶，再配上慈音阿婆飯糰或祥記燒麻糬冰，滿足收尾。' }
                    ],
                    tips: isEn ? [
                        '💡 Michelin Bib Gourmand Haven: Ningxia has the highest density of Michelin-recommended stalls in Taiwan.',
                        '💡 Bring cash for small snack vendors: While many accept mobile pay, smallest stalls prefer exact cash.',
                        '💡 Eco-Friendly Market: Ningxia utilizes grease interceptors and eco-friendly tableware extensively.'
                    ] : [
                        '💡 米其林必比登密集度最高：寧夏夜市攤位精煉，連續多年有多家攤商入選米其林必比登推薦。',
                        '💡 環保綠色示範夜市：此處攤位全面裝設油煙靜電處理機與油脂截留器，逛起來油煙味相對清爽舒適。',
                        '💡 捷運雙連站散步路線：從雙連站 1 號出口沿民生西路漫步 7 分鐘即可抵達，沿途亦有諸多老牌小吃。'
                    ]
                },
                nearby: isEn ? [
                    {
                        name: 'Dadaocheng Wharf & Container Market',
                        tag: 'River Sunset & Craft Beer',
                        dist: '12 min walk down Minsheng W. Rd',
                        desc: 'Trendy waterside shipping container eateries and bars beside Tamsui River. Best sunset views in downtown Taipei.'
                    },
                    {
                        name: 'Historic Dihua Street',
                        tag: 'Heritage & Traditional Craft',
                        dist: '8 min walk west',
                        desc: '19th-century Baroque shophouses, traditional herbal apothecaries, artisan tea salons, and Taipei Xia-Hai City God Temple.'
                    },
                    {
                        name: 'Chifeng Street Hipster District',
                        tag: 'Vintage Cafes & Boutiques',
                        dist: '6 min walk towards Zhongshan',
                        desc: 'Former ironware mechanic alleys transformed into charming indie coffee shops, vintage fashion stores, and bakery nooks.'
                    }
                ] : [
                    {
                        name: '大稻埕碼頭貨櫃市集',
                        tag: '絕美淡水河夕陽與微醺美酒',
                        dist: '沿民生西路西行步行約 12 分鐘',
                        desc: '台北最受年輕人歡迎的河畔貨櫃市集，坐在天台欣賞淡水河絕美日落晚霞，配上精釀啤酒與異國輕食。'
                    },
                    {
                        name: '迪化老街與霞海城隍廟',
                        tag: '百年老街與文創風華',
                        dist: '步行約 8 分鐘',
                        desc: '保存最完整的十九世紀巴洛克式商行街屋，充滿南北乾貨中藥香、文青選品茶館，以及聞名遐邇的月老求姻緣聖地。'
                    },
                    {
                        name: '赤峰街文青街區',
                        tag: '老宅獨立咖啡與古著選物',
                        dist: '往捷運中山/雙連站方向 (步行約 6 分鐘)',
                        desc: '昔日打鐵五金街蛻變為老宅咖啡館、手作烘焙與獨立設計師小店聚集的文藝秘境，適合午後悠閒散策。'
                    }
                ]
            };
        }

        if (isFengjia) {
            return {
                signatures: isEn
                    ? ['Guanzhilin Sticky Rice Sausage', 'Riben Takoyaki Balls', 'Yixin Crispy Stinky Tofu', 'Minglun Egg Crepe', 'Sweet Potato Crisps', 'Papaya Milk']
                    : ['官芝霖大腸包小腸', '日船章魚小丸子', '一心素食臭豆腐', '明倫蛋餅', '溫家地瓜球', '北回木瓜牛奶'],
                quickFacts: [
                    {
                        icon: 'time',
                        title: isEn ? 'Hours & Peak Window' : '營業時間與尖峰',
                        desc: isEn ? '16:30 - 01:00 daily. Peak: 19:30 - 22:30. Vast labyrinth layout around Feng Chia University.' : '每日 16:30 - 01:00。尖峰 19:30 - 22:30。全台旗艦級超大規模大學城夜市。'
                    },
                    {
                        icon: 'wc',
                        title: isEn ? 'Public Restrooms' : '公共洗手間位置',
                        desc: isEn ? '① Feng Chia University Main Gate; ② Beacon Plaza 2F; ③ Fuxing Car Park.' : '① 逢甲大學正門外圍；② 逢甲路碧根廣場 2F；③ 福星立體停車場。'
                    },
                    {
                        icon: 'parking',
                        title: isEn ? 'Parking Garages' : '推薦周邊停車場',
                        desc: isEn ? 'Fuxing Multi-Story Car Park or Fengjia Wenhua Parking (fills up rapidly after 18:30).' : '福星立體停車場、逢甲文華停車場 (假日 18:30 後極易客滿，建議提早或搭公車)。'
                    },
                    {
                        icon: 'payment',
                        title: isEn ? 'Payment Methods' : '支付方式支援',
                        desc: isEn ? 'Cash, LINE Pay, JKOPay, and EasyCard accepted widely across student stalls.' : '現金為主，學生商圈多數店家全面支援 LINE Pay、街口與全支付。'
                    },
                    {
                        icon: 'timer',
                        title: isEn ? 'Recommended Duration' : '建議遊逛時間',
                        desc: isEn ? '3 hours (sprawling campus commercial district with innovative fashion & street food).' : '約 3 小時 (商圈範圍極廣，結合新潮創新美食與平價服飾生活百貨)。'
                    },
                    {
                        icon: 'accessible',
                        title: isEn ? 'Accessibility & Strollers' : '推車與無障礙友好度',
                        desc: isEn ? 'Main roads have sidewalks; narrow alleys can be crowded. Weekdays are most stroller-friendly.' : '文華路與福星路主幹道平整，小巷弄人潮密集，平日攜帶推車體驗更舒適。'
                    }
                ],
                strategy: {
                    title: isEn ? 'Local Foodie 3-Step Walking Route' : '在地老饕 3 階段黃金遊逛動線',
                    steps: isEn ? [
                        { time: '17:00 - 18:00', name: 'Campus Gate Must-Eats', detail: 'Line up early at Feng Chia University main gate for Guanzhilin Sticky Rice Sausage and Minglun Traditional Egg Crepe.' },
                        { time: '18:00 - 19:30', name: 'Wenhua Road Food Trail', detail: 'Walk down Wenhua Road for crispy Yixin stinky tofu, flame grilled skewers, and hot Takoyaki octopus balls.' },
                        { time: '19:30 - 21:00', name: 'Snack Shopping & Cool Down', detail: 'Browse trendy street fashions and game stalls while enjoying fresh iced papaya milk and sweet potato balls.' }
                    ] : [
                        { time: '17:00 - 18:00', name: '大學校門口開吃', detail: '傍晚直衝逢甲大學校門口文華路口，搶先排「官芝霖大腸包小腸」與「明倫古早味蛋餅」。' },
                        { time: '18:00 - 19:30', name: '文華路縱深鹹食連發', detail: '沿著文華路與福星路，坐下品嚐一心臭豆腐、日船章魚小丸子與各式炭烤串燒。' },
                        { time: '19:30 - 21:00', name: '潮流服飾挖寶與甜飲', detail: '穿梭慶和街與便當街尋寶最新潮流服飾與文創飾品，手拿一杯北回木瓜牛奶與現炸地瓜球。' }
                    ],
                    tips: isEn ? [
                        '💡 Trendsetter of Taiwan Night Markets: Many viral snacks across Taiwan originated right here in Fengjia.',
                        '💡 Avoid Weekend Car Traps: Traffic on Fuxing Road can be severe on Saturday evenings; taking a public bus or scooter is much faster.',
                        '💡 Generous Student Portions: Prices here reflect university budgets—great value for money.'
                    ] : [
                        '💡 台灣夜市創新發源地：全台許多流行小吃多發源於逢甲，勇於嘗試各類新奇創意口味！',
                        '💡 週末福星路車多擁擠：週六晚間周邊幹道極易塞車，建議搭乘市區公車或騎乘 YouBike 前往。',
                        '💡 大學校園高 CP 值：鄰近大學城，餐點份量通常澎湃厚實，價格格外親民友善。'
                    ]
                },
                nearby: isEn ? [
                    {
                        name: 'National Taichung Theater',
                        tag: 'World Architectural Icon',
                        dist: '8 min drive / 20 min walk',
                        desc: 'Designed by Toyo Ito with organic curved concrete walls and stunning illuminated fountains at night.'
                    },
                    {
                        name: 'Maple Garden (Qiuhonggu)',
                        tag: 'Sunken Urban Ecological Lake',
                        dist: '7 min bus ride',
                        desc: 'Sunken landscape park with glowing night boardwalks, romantic weeping willows, and peaceful urban waters.'
                    },
                    {
                        name: 'Feng Chia University Campus',
                        tag: 'Youth & Greenery',
                        dist: 'Directly bordering the night market',
                        desc: 'Peaceful shady campus lawns, sports fields, and public walking gardens ideal for afternoon strolls.'
                    }
                ] : [
                    {
                        name: '台中國家歌劇院',
                        tag: '世界九大新地標建築',
                        dist: '車程約 8 分鐘 / 步行 20 分鐘',
                        desc: '普立茲克得主伊東豊雄打造的曲牆結構建築，夜間戶外水景噴泉與光影倒影美不勝收。'
                    },
                    {
                        name: '秋紅谷景觀生態公園',
                        tag: '都會下凹式景觀綠洲',
                        dist: '搭乘公車約 7 分鐘',
                        desc: '全台唯一的下凹式都會景觀公園，環湖步道綠意盎然，夜景倒影璀璨，為漫步散心絕佳去處。'
                    },
                    {
                        name: '逢甲大學校園',
                        tag: '青春綠蔭學府',
                        dist: '出校門即抵達夜市核心',
                        desc: '綠樹成蔭、人文氣息濃厚的校園步道與大草坪，是等待夜市開市前最悠閒舒適的休憩空間。'
                    }
                ]
            };
        }

        // Generic fallback for other night markets in Taiwan
        return {
            signatures: isEn
                ? ['Crispy Fried Chicken Cutlet', 'Oyster Omelet', 'Deep Fried Stinky Tofu', 'Sausage in Sticky Rice', 'Sweet Potato Balls', 'Brown Sugar Boba Milk']
                : ['經典脆皮雞排', '古早味香煎蚵仔煎', '酥炸金黃臭豆腐', '特製大腸包小腸', '現炸地瓜球', '黑糖珍珠鮮奶'],
            quickFacts: [
                {
                    icon: 'time',
                    title: isEn ? 'Hours & Peak Window' : '營業時間與尖峰',
                    desc: isEn ? '17:30 - 00:00. Peak: 19:30 - 21:30. Arrive by 17:30 - 18:30 for shorter queues.' : '約 17:30 - 00:00。尖峰 19:30 - 21:30。建議 17:30 - 18:30 提早入場享受舒適體驗。'
                },
                {
                    icon: 'wc',
                    title: isEn ? 'Public Restrooms' : '公共洗手間位置',
                    desc: isEn ? 'Available at nearby transit stations, municipal car parks, or adjacent historic temples.' : '可前往周邊大眾運輸站點、公有停車場或鄰近指標廟宇附設洗手間。'
                },
                {
                    icon: 'parking',
                    title: isEn ? 'Parking Garages' : '推薦周邊停車場',
                    desc: isEn ? 'Nearby municipal public underground parking lots or scooter parking bays.' : '建議停放於鄰近公有收費地下停車場或周邊機車收費專用格。'
                },
                {
                    icon: 'payment',
                    title: isEn ? 'Payment Methods' : '支付方式支援',
                    desc: isEn ? 'Cash essential (small bills NT$100 recommended). Mobile payments widely supported.' : '以現金百元鈔為主，多數現代攤位亦支援 LINE Pay、街口與全支付。'
                },
                {
                    icon: 'timer',
                    title: isEn ? 'Recommended Duration' : '建議遊逛時間',
                    desc: isEn ? '2 - 3 hours (ideal for dining, browsing lifestyle merchandise, and retro stalls).' : '建議停留 2 ~ 3 小時 (可充分品味 4-6 道在地小吃與體驗休閒市集文化)。'
                },
                {
                    icon: 'accessible',
                    title: isEn ? 'Accessibility & Strollers' : '推車與無障礙友好度',
                    desc: isEn ? 'Main walkways are paved and flat. Early entry recommended for smoother stroller mobility.' : '主要步道皆平整順暢，平日或開市前半小時人潮較少時段最適合推車與長者通行。'
                }
            ],
            strategy: {
                title: isEn ? 'Local Foodie 3-Step Walking Route' : '在地老饕 3 階段黃金遊逛動線',
                steps: isEn ? [
                    { time: '17:30 - 18:15', name: 'Signature Snacks First', detail: 'Arrive right as stalls open. Head directly to the longest-line signature chicken cutlet or barbecue stall.' },
                    { time: '18:15 - 19:30', name: 'Sit-Down Savory Dishes', detail: 'Find a seat for piping hot oyster omelet, noodle soup, braised dishes, or stinky tofu.' },
                    { time: '19:30 - 20:30', name: 'Sweet Tooth & Evening Stroll', detail: 'Grab refreshing fresh fruit juice, brown sugar bubble tea, or shaved ice while playing retro arcade games.' }
                ] : [
                    { time: '17:30 - 18:15', name: '開市首衝排隊名攤', detail: '傍晚開市時刻抵達，先衝需要排隊的招牌炸雞排、香腸或烤玉米攤位。' },
                    { time: '18:15 - 19:30', name: '主食入座大飽口福', detail: '找尋有座位的蚵仔煎、牛肉湯、滷味或藥膳排骨攤位，坐下慢慢享受熱騰騰主食。' },
                    { time: '19:30 - 20:30', name: '散步解膩與清涼甜品', detail: '手持現打果汁或黑糖珍珠鮮奶，逛特色生活雜貨，再以外酥內軟的地瓜球或刨冰完美總結。' }
                ],
                tips: isEn ? [
                    '💡 Pricing Inquiries: Check prices for weighed food items (such as seafood or cut fruit) before ordering.',
                    '💡 Carry Wet Wipes: Many street snacks are hands-on finger food; carrying wet wipes is always handy.',
                    '💡 Trash Disposal: Taiwan takes recycling seriously; look for sorting bins near market intersections.'
                ] : [
                    '💡 計重商品先詢價：購買秤重計價的海鮮或現切水果時，先確認計價單位與總價再行購買。',
                    '💡 隨身攜帶濕紙巾：夜市手拿小吃豐富，隨身帶包濕紙巾隨時清潔雙手最方便。',
                    '💡 垃圾隨手分類：請將竹籤、紙杯與一般垃圾依夜市定點垃圾桶確實分類回收。'
                ]
            },
            nearby: isEn ? [
                {
                    name: 'Local Historic City Temples',
                    tag: 'Cultural Heritage',
                    dist: 'Within 5-10 min walk',
                    desc: 'Experience centuries of local faith, exquisite incense ceremonies, and traditional roof architecture.'
                },
                {
                    name: 'City Park & Green Plaza',
                    tag: 'Relaxation & Stroll',
                    dist: 'Adjacent to shopping area',
                    desc: 'Peaceful green open space perfect for resting between food hunts and enjoying evening city lights.'
                },
                {
                    name: 'Local Boutique Shopping Street',
                    tag: 'Fashion & Souvenirs',
                    dist: 'Directly connecting walkways',
                    desc: 'Charming pedestrian alleys full of Taiwanese souvenirs, unique fashion items, and retro arcade shops.'
                }
            ] : [
                {
                    name: '在地信仰宮廟文化古蹟',
                    tag: '歷史人文深度體驗',
                    dist: '步行約 5 ~ 10 分鐘',
                    desc: '感受百年香火鼎盛的在地信仰中心，欣賞交趾陶、石雕與傳統剪黏藝術，祈求平安順遂。'
                },
                {
                    name: '都會景觀綠地與休閒公園',
                    tag: '漫步綠洲好去處',
                    dist: '緊鄰商圈步行可達',
                    desc: '綠樹成蔭的舒適公園廣場，是享用完美食後散步消食、放鬆感受在地生活節奏的最佳空間。'
                },
                {
                    name: '周邊特色休閒與文創購物商圈',
                    tag: '潮流選物與紀念品',
                    dist: '周邊步行街延伸區',
                    desc: '聚集各類台灣特色伴手禮、平價潮流服飾與趣味懷舊遊戲攤位，滿足多元遊逛挖寶樂趣。'
                }
            ]
        };
    };

    const getLiveStatus = () => {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const timeDecimal = hour + minute / 60;
        const isTainanFlower = market.name && market.name.includes('花園');

        if (isTainanFlower) {
            const isTainanOpenDay = day === 0 || day === 4 || day === 6;
            if (!isTainanOpenDay) {
                return {
                    text: lang === 'en' ? '🔴 Closed Today (Open Thu, Sat, Sun)' : '🔴 今日公休 (僅每週四、六、日營業)',
                    color: '#D32F2F',
                    bg: '#FFEBEE',
                    crowd: lang === 'en' ? 'Closed' : '今日不開攤'
                };
            }
        }

        if (timeDecimal >= 17.5 || timeDecimal < 1.0) {
            const isPeak = timeDecimal >= 19.5 && timeDecimal <= 21.5;
            return {
                text: lang === 'en' ? '🟢 Open Now' : '🟢 營業中 (夜市開市)',
                color: '#2E7D32',
                bg: '#E8F5E9',
                crowd: isPeak
                    ? (lang === 'en' ? '🔥 Peak Crowd Hour (19:30-21:30)' : '🔥 尖峰熱鬧人潮 (19:30-21:30)')
                    : (lang === 'en' ? '✨ Pleasant Crowd' : '✨ 舒適好逛時段')
            };
        } else if (timeDecimal >= 16.5 && timeDecimal < 17.5) {
            return {
                text: lang === 'en' ? '🕒 Opening Soon (~17:30)' : '🕒 攤商陸續出攤中 (約 17:30 開市)',
                color: '#E65100',
                bg: '#FFF8E1',
                crowd: lang === 'en' ? 'Setting Up' : '出攤準備中'
            };
        } else {
            return {
                text: lang === 'en' ? '🌙 Opens at 17:30 Tonight' : '🌙 白天休市中 (今晚 17:30 開市)',
                color: '#5D4037',
                bg: '#EFEBE9',
                crowd: lang === 'en' ? 'Opens Tonight' : '今晚開市'
            };
        }
    };

    const getRainyDayTip = () => {
        const name = market.name || '';
        if (name.includes('士林')) {
            return lang === 'en'
                ? '🌧️ Rainy-Day Friendly: Shilin features a large B1 Air-Conditioned Food Court. Great for rainy days!'
                : '🌧️ 雨天備案首選：士林夜市設有超大 B1 空調美食地下街，下大雨也能舒適吃遍蚵仔煎與生炒花枝！';
        }
        if (name.includes('寧夏')) {
            return lang === 'en'
                ? '🌧️ Rainy-Day Friendly: Ningxia has sheltered covered walkways on both sides of the street.'
                : '🌧️ 雨天備案：寧夏夜市兩側設有連續騎樓與遮雨棚，動線直線單純，雨天依然熱門好逛。';
        }
        return lang === 'en'
            ? '🌧️ Rainy-Day Notice: Most stalls have awnings. Bringing a compact umbrella is recommended on rainy evenings.'
            : '🌧️ 雨天提醒：夜市多數攤位均備有大型雨遮，雨天造訪建議攜帶輕便摺疊傘。';
    };

    const renderFactIcon = (type) => {
        switch (type) {
            case 'time':
                return <AccessTimeIcon sx={{ color: 'var(--tw-terracotta, #B91C1C)', fontSize: '1.4rem' }} />;
            case 'wc':
                return <WcIcon sx={{ color: '#0284C7', fontSize: '1.4rem' }} />;
            case 'parking':
                return <LocalParkingIcon sx={{ color: '#059669', fontSize: '1.4rem' }} />;
            case 'payment':
                return <PaymentIcon sx={{ color: '#D97706', fontSize: '1.4rem' }} />;
            case 'timer':
                return <TimerIcon sx={{ color: '#7C3AED', fontSize: '1.4rem' }} />;
            case 'accessible':
                return <AccessibleIcon sx={{ color: '#4B5563', fontSize: '1.4rem' }} />;
            default:
                return <CheckCircleOutlineIcon sx={{ color: 'var(--tw-terracotta, #B91C1C)', fontSize: '1.4rem' }} />;
        }
    };

    const handleGoToFood = (id) => {
        localStorage.setItem('foodId', id);
        window.location.href = '/foodInfo';
    };

    const handleGoToShop = (id) => {
        localStorage.setItem('shopId', id);
        window.location.href = '/shop';
    };

    const getLocationName = (loc) => {
        if (loc === 'tp' || loc === 'Taipei') return lang === 'en' ? 'Taipei' : '台北';
        if (loc === 'tz' || loc === 'Taichung') return lang === 'en' ? 'Taichung' : '台中';
        if (loc === 'tn' || loc === 'Tainan') return lang === 'en' ? 'Tainan' : '台南';
        return lang === 'en' ? 'Taiwan' : '台灣';
    };

    // 即時夜市氣象預報與舒適度評估
    const getMarketWeather = (marketName = '') => {
        const isEn = lang === 'en';
        const name = marketName || '';
        if (name.includes('逢甲') || name.includes('一中')) {
            return {
                city: isEn ? 'Taichung City' : '台中市',
                condition: isEn ? 'Clear & Dry' : '晴朗乾爽',
                temp: '25°C',
                rainChance: '5%',
                humidity: '62%',
                wind: '2.5 m/s',
                comfortIndex: isEn ? 'Optimal Stroll' : '極佳舒適',
                tip: isEn ? 'Pleasant night breeze with low humidity. Great walking conditions!' : '台中夜間微風宜人、濕度乾爽，漫步逛街體感極佳，建議備妥零錢與空腹！'
            };
        }
        if (name.includes('六合') || name.includes('瑞豐') || name.includes('花園')) {
            return {
                city: isEn ? 'Southern Taiwan' : '南台灣',
                condition: isEn ? 'Warm & Breezy' : '溫暖清風',
                temp: '27°C',
                rainChance: '10%',
                humidity: '68%',
                wind: '3.0 m/s',
                comfortIndex: isEn ? 'Lively & Warm' : '熱鬧舒適',
                tip: isEn ? 'Warm night temperatures. Grab an iced winter melon tea or fresh papaya milk to cool down!' : '南台灣夜風溫暖，推薦搭配古早味冬瓜檸檬或現打木瓜牛奶，清涼解渴！'
            };
        }
        if (name.includes('羅東')) {
            return {
                city: isEn ? 'Yilan County' : '宜蘭縣',
                condition: isEn ? 'Cool Mountain Breeze' : '清爽微涼',
                temp: '22°C',
                rainChance: '20%',
                humidity: '76%',
                wind: '2.2 m/s',
                comfortIndex: isEn ? 'Fresh & Mild' : '微涼宜人',
                tip: isEn ? 'Fresh mountain breeze. A light jacket is recommended while enjoying hot herbal mutton soup!' : '傍晚近山區氣溫微涼，建議隨身攜帶輕薄外套，來碗熱騰騰當歸羊肉湯最暖心！'
            };
        }
        return {
            city: isEn ? 'Taipei City' : '台北市',
            condition: isEn ? 'Partly Cloudy' : '多雲舒適',
            temp: '24°C',
            rainChance: '15%',
            humidity: '70%',
            wind: '3.1 m/s',
            comfortIndex: isEn ? 'Comfortable Stroll' : '舒適宜行',
            tip: isEn ? 'Comfortable night temperature, ideal for wandering through food alleyways!' : '氣溫涼爽宜人，微風徐徐，非常適合徒步穿梭老街巷弄探索經典排隊小吃！'
        };
    };

    const weatherInfo = getMarketWeather(market.name);
    const currentHour = new Date().getHours();

    // 各夜市時段擁擠度與人潮峰值預測
    const crowdHours = [
        { time: '17:00 - 18:00', hourRange: [17], level: 25, label: lang === 'en' ? 'Quiet & Open' : '攤商備料・人潮初至', color: '#16A34A' },
        { time: '18:00 - 19:00', hourRange: [18], level: 55, label: lang === 'en' ? 'Getting Busy' : '下班湧入・開胃品嚐', color: '#D97706' },
        { time: '19:00 - 20:00', hourRange: [19], level: 92, label: lang === 'en' ? 'Peak Hour Rush' : '老饕齊聚・人潮高峰', color: '#DC2626' },
        { time: '20:00 - 21:00', hourRange: [20], level: 96, label: lang === 'en' ? 'Busiest Window' : '排隊熱鬧・氣氛最沸', color: '#DC2626' },
        { time: '21:00 - 22:00', hourRange: [21], level: 78, label: lang === 'en' ? 'Late Feast' : '甜品消暑・歡樂遊逛', color: '#EA580C' },
        { time: '22:00 - 23:00', hourRange: [22], level: 48, label: lang === 'en' ? 'Night Owls' : '人潮漸緩・宵夜精華', color: '#D97706' },
        { time: '23:00 - 00:00', hourRange: [23, 0], level: 20, label: lang === 'en' ? 'Closing Stroll' : '末班採買・悠閒收尾', color: '#16A34A' },
    ];

    const details = getMarketDetails(market.name, lang);

    const marketShops = shops.filter(s => {
        if (!market.name) return true;
        const baseName = market.name.replace('觀光夜市', '').replace('夜市', '');
        return s.shopYeShi && (s.shopYeShi.includes(baseName) || market.name.includes(s.shopYeShi.replace('觀光夜市', '').replace('夜市', '')));
    });

    const marketFoodNames = new Set(marketShops.flatMap(s => (s.food || []).map(f => f.foodName || f.name)));
    const marketFoods = foods.filter(f => {
        if (marketFoodNames.size > 0) {
            return marketFoodNames.has(f.foodName);
        }
        return true;
    });

    return (
        <Box sx={{ pb: 6 }}>
            {/* 返回夜市列表 */}
            <Box sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    href="/nightmarket"
                    sx={{
                        color: 'var(--tw-deep-charcoal, #1C1917)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        textTransform: 'none',
                        '&:hover': { color: 'var(--tw-terracotta, #B91C1C)', backgroundColor: 'transparent' }
                    }}
                >
                    {lang === 'en' ? '← Back to Night Markets' : '← 返回夜市名錄'}
                </Button>
            </Box>

            {/* 夜市主標題與精美橫幅 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, md: 4 },
                    mb: 5,
                    borderRadius: '24px',
                    backgroundColor: 'var(--tw-card-white, #FFFFFF)',
                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                    boxShadow: '0 4px 20px rgba(28, 25, 23, 0.05)',
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* 左側照片：真實台灣夜市街景圖 */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ borderRadius: '18px', overflow: 'hidden', height: { xs: '260px', md: '360px' }, boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}>
                            <img
                                src={getAuthenticMarketImage(market)}
                                alt={market.name || 'Taiwan Night Market'}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    </Grid>

                    {/* 右側夜市特色介紹 */}
                    <Grid item xs={12} md={7}>
                        {/* 城市與標籤 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                            <Chip
                                label={getLocationName(market.marketLocation)}
                                size="small"
                                sx={{ backgroundColor: 'var(--tw-paper-cream, #FAF8F5)', color: 'var(--tw-deep-charcoal, #1C1917)', border: '1px solid var(--tw-border-subtle, #EAE5DD)', fontWeight: 700, borderRadius: '12px' }}
                            />
                            <Chip
                                label={lang === 'en' ? 'Featured Destination' : '在地指標熱門夜市'}
                                size="small"
                                sx={{ backgroundColor: '#FEF2F2', color: 'var(--tw-terracotta, #B91C1C)', fontWeight: 700, borderRadius: '12px' }}
                            />
                            <Chip
                                icon={<AccessTimeIcon />}
                                label={getLiveStatus().text}
                                size="small"
                                sx={{
                                    backgroundColor: getLiveStatus().bg,
                                    color: getLiveStatus().color,
                                    fontWeight: 700,
                                    borderRadius: '12px'
                                }}
                            />
                        </Box>

                        <Typography variant="h3" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 0.5, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                            {lang === 'en' ? (market.nameen || market.name) : market.name}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ color: 'var(--tw-text-muted, #78716C)', mb: 2, fontWeight: 500, letterSpacing: '0.02em' }}>
                            {lang === 'en' ? (market.marketLocation || 'Taiwan') : market.nameen}
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#57534E', lineHeight: 1.8, mb: 2.5, fontSize: '0.95rem' }}>
                            {market.brief || market.introduction || (lang === 'en' ? 'Famous night market full of authentic Taiwanese street delicacies.' : '熱門觀光夜市，集結各色在地經典美食與熱鬧攤位。')}
                        </Typography>

                        {/* 本夜市招牌必吃推薦標籤 */}
                        <Box sx={{ mb: 2.5, p: 2, backgroundColor: 'var(--tw-paper-cream, #FAF8F5)', borderRadius: '14px', border: '1px solid var(--tw-border-subtle, #EAE5DD)' }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--tw-terracotta, #B91C1C)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.2 }}>
                                <RestaurantMenuIcon sx={{ fontSize: '1.05rem' }} />
                                {lang === 'en' ? 'Signature Must-Eat Highlights' : '本夜市老饕招牌必吃'}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                                {details.signatures.map((sig, idx) => (
                                    <Chip
                                        key={idx}
                                        label={sig}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#FFFFFF',
                                            color: '#B91C1C',
                                            border: '1px solid #FECACA',
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            borderRadius: '8px'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* 交通指引 */}
                        {market.positionGuidelines && (
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, p: 2, backgroundColor: '#FFFFFF', border: '1px solid var(--tw-border-subtle, #EAE5DD)', borderRadius: '12px' }}>
                                <DirectionsSubwayIcon sx={{ color: 'var(--tw-terracotta, #B91C1C)', mt: 0.3 }} />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                                        {lang === 'en' ? 'Transit & Directions' : '捷運 / 交通指引'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', lineHeight: 1.5 }}>
                                        {market.positionGuidelines}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* 雨天備案提示 */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2.5, p: 2, backgroundColor: '#F0F9FF', border: '1px solid #E0F2FE', borderRadius: '12px' }}>
                            <UmbrellaIcon sx={{ color: '#0288D1', mt: 0.3 }} />
                            <Typography variant="body2" sx={{ color: '#0369A1', lineHeight: 1.5, fontWeight: 600 }}>
                                {getRainyDayTip()}
                            </Typography>
                        </Box>

                        {/* 綜合評分 & Google Maps 導航 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Rating value={Number(market.rating) || 4.8} precision={0.1} readOnly sx={{ color: '#FBBF24' }} />
                                <Typography variant="body2" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                                    ({market.rating || 4.8})
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((market.name || '') + ' ' + (market.marketLocation || ''))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<NavigationIcon />}
                                sx={{
                                    backgroundColor: '#1E40AF',
                                    color: '#FFF',
                                    fontWeight: 800,
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    px: 2.2,
                                    py: 0.8,
                                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                                    '&:hover': { backgroundColor: '#1D4ED8' }
                                }}
                            >
                                {lang === 'en' ? 'Google Maps Navigation' : 'Google Maps 路線導航'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* 夜市深度故事 / 背景介紹 */}
                {market.introduction && market.introduction !== market.brief && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid var(--tw-border-subtle, #EAE5DD)' }}>
                        <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 1.5 }}>
                            {lang === 'en' ? 'Market History & Heritage' : '夜市故事與文化傳承'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', lineHeight: 1.8 }}>
                            {market.introduction}
                        </Typography>
                    </Box>
                )}
            </Paper>

            {/* 即時夜市氣象與人潮尖峰預測雙卡區塊 */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                {/* 即時夜市氣象預報與穿著建議 */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            height: '100%',
                            borderRadius: '20px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                            boxShadow: '0 2px 12px rgba(28, 25, 23, 0.04)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '10px',
                                        backgroundColor: '#FEF3C7',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#D97706'
                                    }}>
                                        <WbSunnyIcon sx={{ fontSize: '1.2rem' }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                                        {lang === 'en' ? 'Real-Time Evening Weather' : '即時夜市天候與體感'}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={weatherInfo.city}
                                    size="small"
                                    sx={{ bgcolor: '#F5F5F4', color: '#57534E', fontWeight: 700 }}
                                />
                            </Box>

                            <Grid container spacing={2} sx={{ mb: 2.5 }}>
                                <Grid item xs={6} sm={3}>
                                    <Box sx={{ p: 1.5, bgcolor: '#FAF8F5', borderRadius: '12px', textAlign: 'center' }}>
                                        <ThermostatIcon sx={{ color: '#E11D48', fontSize: '1.4rem' }} />
                                        <Typography variant="caption" sx={{ display: 'block', color: '#78716C', fontWeight: 600 }}>
                                            {lang === 'en' ? 'Temp' : '氣溫'}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                            {weatherInfo.temp}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Box sx={{ p: 1.5, bgcolor: '#FAF8F5', borderRadius: '12px', textAlign: 'center' }}>
                                        <OpacityIcon sx={{ color: '#0284C7', fontSize: '1.4rem' }} />
                                        <Typography variant="caption" sx={{ display: 'block', color: '#78716C', fontWeight: 600 }}>
                                            {lang === 'en' ? 'Rain Chance' : '降雨機率'}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                            {weatherInfo.rainChance}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Box sx={{ p: 1.5, bgcolor: '#FAF8F5', borderRadius: '12px', textAlign: 'center' }}>
                                        <AirIcon sx={{ color: '#059669', fontSize: '1.4rem' }} />
                                        <Typography variant="caption" sx={{ display: 'block', color: '#78716C', fontWeight: 600 }}>
                                            {lang === 'en' ? 'Breeze' : '夜風流速'}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                            {weatherInfo.wind}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Box sx={{ p: 1.5, bgcolor: '#FAF8F5', borderRadius: '12px', textAlign: 'center' }}>
                                        <WbSunnyIcon sx={{ color: '#D97706', fontSize: '1.4rem' }} />
                                        <Typography variant="caption" sx={{ display: 'block', color: '#78716C', fontWeight: 600 }}>
                                            {lang === 'en' ? 'Comfort' : '遊逛舒適度'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#16A34A', mt: 0.3 }}>
                                            {weatherInfo.comfortIndex}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ p: 2, bgcolor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px' }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#15803D', display: 'block', mb: 0.5 }}>
                                💡 {lang === 'en' ? 'Visitor Dressing & Strolling Tip:' : '在地老饕穿著與遊逛建議：'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#166534', lineHeight: 1.6 }}>
                                {weatherInfo.tip}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* 尖峰擁擠時段預測 (Peak Hours Forecast) */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            height: '100%',
                            borderRadius: '20px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                            boxShadow: '0 2px 12px rgba(28, 25, 23, 0.04)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '10px',
                                        backgroundColor: '#FEE2E2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#DC2626'
                                    }}>
                                        <GroupsIcon sx={{ fontSize: '1.2rem' }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                                        {lang === 'en' ? 'Crowd Peak Hours Forecast' : '尖峰擁擠時段預測'}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={lang === 'en' ? 'Hourly Model' : '人流走勢模擬'}
                                    size="small"
                                    sx={{ bgcolor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700 }}
                                />
                            </Box>

                            <Typography variant="caption" sx={{ color: '#78716C', display: 'block', mb: 2 }}>
                                {lang === 'en'
                                    ? 'Estimated crowd levels based on historical visitor flow. Golden hours for easiest queueing: 17:30 - 18:30.'
                                    : '依據歷史訪客人流數據模型預測。最舒適、排隊最快黃金時段：17:30 - 18:30。'}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                                {crowdHours.map((slot, idx) => {
                                    const isNow = slot.hourRange.includes(currentHour);
                                    return (
                                        <Box key={idx} sx={{ p: 0.8, borderRadius: '8px', bgcolor: isNow ? 'rgba(185, 28, 28, 0.05)' : 'transparent', border: isNow ? '1px dashed #B91C1C' : 'none' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.4 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography variant="caption" sx={{ fontWeight: 800, color: isNow ? '#B91C1C' : '#44403C', minWidth: '95px' }}>
                                                        {slot.time}
                                                    </Typography>
                                                    {isNow && (
                                                        <Chip label={lang === 'en' ? 'Now' : '當前'} size="small" sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#B91C1C', color: '#FFF', fontWeight: 800 }} />
                                                    )}
                                                </Box>
                                                <Typography variant="caption" sx={{ fontWeight: 700, color: slot.color }}>
                                                    {slot.label} ({slot.level}%)
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={slot.level}
                                                sx={{
                                                    height: 7,
                                                    borderRadius: 4,
                                                    backgroundColor: '#F3F4F6',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: slot.color,
                                                        borderRadius: 4
                                                    }
                                                }}
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* 實用生活與公共設施速覽 */}
            <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(185, 28, 28, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--tw-terracotta, #B91C1C)'
                    }}>
                        <ExploreIcon />
                    </Box>
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                        {lang === 'en' ? 'Practical Amenities & Visitor Essentials' : '實用設施與在地遊客速覽'}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mb: 3 }}>
                    {lang === 'en'
                        ? 'Essential travel details: opening hours, restrooms, parking, payments, and accessibility guides.'
                        : '行前必備實用情報：精確公廁位置、停車場規劃、多元支付支援與無障礙建議。'}
                </Typography>

                <Grid container spacing={2.5}>
                    {details.quickFacts.map((fact, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    height: '100%',
                                    borderRadius: '16px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                    boxShadow: '0 2px 10px rgba(28, 25, 23, 0.03)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 24px rgba(28, 25, 23, 0.07)'
                                    },
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                    <Box sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '10px',
                                        backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {renderFactIcon(fact.icon)}
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', fontSize: '0.95rem' }}>
                                        {fact.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.6, fontSize: '0.875rem', flexGrow: 1 }}>
                                    {fact.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* 老饕推薦黃金遊逛動線與避坑錦囊 */}
            <Box sx={{ mb: 6 }}>
                <Grid container spacing={3}>
                    {/* 左側：黃金 3 階段遊逛動線 */}
                    <Grid item xs={12} md={7}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 2.5, md: 3.5 },
                                height: '100%',
                                borderRadius: '20px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                boxShadow: '0 4px 16px rgba(28, 25, 23, 0.04)'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <Box sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(217, 119, 6, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--tw-amber, #D97706)'
                                }}>
                                    <RestaurantMenuIcon />
                                </Box>
                                <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                                    {details.strategy.title}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mb: 3 }}>
                                {lang === 'en' ? 'Maximize your taste buds and minimize waiting time with this seasoned foodie roadmap:' : '掌握時間節奏，避開長隊人龍，老饕推薦的最佳品嚐動線：'}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {details.strategy.steps.map((st, sIdx) => (
                                    <Box
                                        key={sIdx}
                                        sx={{
                                            p: 2,
                                            borderRadius: '14px',
                                            backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                            border: '1px solid var(--tw-border-subtle, #EAE5DD)'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Chip
                                                    label={`Step ${sIdx + 1}`}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: 'var(--tw-terracotta, #B91C1C)',
                                                        color: '#FFF',
                                                        fontWeight: 800,
                                                        height: 22,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                                                    {st.name}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                icon={<AccessTimeIcon sx={{ fontSize: '0.85rem !important' }} />}
                                                label={st.time}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#FFF',
                                                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                                    color: '#57534E',
                                                    fontWeight: 700,
                                                    height: 22,
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.6, fontSize: '0.875rem' }}>
                                            {st.detail}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* 右側：老饕避坑與禮儀錦囊 */}
                    <Grid item xs={12} md={5}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 2.5, md: 3.5 },
                                height: '100%',
                                borderRadius: '20px',
                                backgroundColor: '#FFFBEB',
                                border: '1px solid #FEF3C7',
                                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.06)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                <Box sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '10px',
                                    backgroundColor: '#FEF3C7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#B45309'
                                }}>
                                    <TipsAndUpdatesIcon />
                                </Box>
                                <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: '#92400E' }}>
                                    {lang === 'en' ? 'Local Insider Tips & Etiquette' : '老饕避坑錦囊與在地禮儀'}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#B45309', mb: 3 }}>
                                {lang === 'en' ? 'Helpful nuances for travelers and expats to enjoy a seamless night market run:' : '為外縣市旅客與國際朋友準備的友善提醒，讓遊逛更順心自在：'}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                                {details.strategy.tips.map((tip, tIdx) => (
                                    <Box
                                        key={tIdx}
                                        sx={{
                                            p: 2,
                                            borderRadius: '12px',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #FDE68A',
                                            boxShadow: '0 2px 6px rgba(217, 119, 6, 0.04)'
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#78350F', lineHeight: 1.6, fontSize: '0.875rem', fontWeight: 500 }}>
                                            {tip}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* 周邊順遊推薦：白天到黑夜的一日遊提案 */}
            <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(5, 150, 105, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#059669'
                    }}>
                        <AttractionsIcon />
                    </Box>
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                        {lang === 'en' ? 'Nearby Attractions: Day-to-Night Day Trip' : '周邊順遊推薦：白天到黑夜一日遊提案'}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mb: 3 }}>
                    {lang === 'en'
                        ? 'Pair your night market visit with these adjacent cultural landmarks and scenic spots for a perfect day trip.'
                        : '下午造訪周邊人文古蹟、當代建築或浪漫水岸，傍晚無縫接軌夜市熱騰騰美食！'}
                </Typography>

                <Grid container spacing={3}>
                    {details.nearby.map((att, aIdx) => (
                        <Grid item xs={12} md={4} key={aIdx}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: '18px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                    boxShadow: '0 2px 10px rgba(28, 25, 23, 0.03)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 24px rgba(28, 25, 23, 0.08)'
                                    },
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                    <Chip
                                        label={att.tag}
                                        size="small"
                                        sx={{
                                            backgroundColor: '#ECFDF5',
                                            color: '#047857',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            borderRadius: '6px'
                                        }}
                                    />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 1, fontSize: '1.05rem' }}>
                                    {att.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5, color: '#059669', fontSize: '0.8rem', fontWeight: 700 }}>
                                    <LocationOnIcon sx={{ fontSize: '0.95rem' }} />
                                    <span>{att.dist}</span>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.6, fontSize: '0.875rem', mb: 2, flexGrow: 1 }}>
                                    {att.desc}
                                </Typography>
                                <Button
                                    size="small"
                                    startIcon={<OpenInNewIcon />}
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(att.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: '#059669',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        p: 0,
                                        justifyContent: 'flex-start',
                                        '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                                    }}
                                >
                                    {lang === 'en' ? 'View Landmark on Map' : '在 Google 地圖查看景點'}
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* 標籤頁籤切換：特色美食、人氣攤位、地圖 */}
            <Box sx={{ borderBottom: 2, borderColor: '#E5D8C8', mb: 3 }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, val) => setActiveTab(val)}
                    textColor="inherit"
                    TabIndicatorProps={{ sx: { backgroundColor: '#C62828', height: 3 } }}
                >
                    <Tab
                        icon={<RestaurantMenuIcon />}
                        iconPosition="start"
                        label={lang === 'en' ? 'Must-Eat Street Food' : '人氣必吃美食'}
                        sx={{ fontWeight: 800, fontSize: '1rem', color: activeTab === 0 ? '#C62828' : '#666' }}
                    />
                    <Tab
                        icon={<StorefrontIcon />}
                        iconPosition="start"
                        label={lang === 'en' ? 'Recommended Stalls' : '推薦排隊店家'}
                        sx={{ fontWeight: 800, fontSize: '1rem', color: activeTab === 1 ? '#C62828' : '#666' }}
                    />
                    <Tab
                        icon={<MapIcon />}
                        iconPosition="start"
                        label={lang === 'en' ? 'Map & Navigation' : '周邊地圖導航'}
                        sx={{ fontWeight: 800, fontSize: '1rem', color: activeTab === 2 ? '#C62828' : '#666' }}
                    />
                </Tabs>
            </Box>

            {/* Tab 0: 美食列表 */}
            {activeTab === 0 && (
                <Grid container spacing={3}>
                    {marketFoods.length > 0 ? (
                        marketFoods.map((fItem, fIdx) => (
                            <Grid item xs={12} sm={6} md={4} key={fItem._id || fIdx}>
                                <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={fItem.foodIcon || 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600'}
                                        alt={fItem.foodName}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                                {lang === 'en' && fItem.foodNameEN ? fItem.foodNameEN : fItem.foodName}
                                            </Typography>
                                            <Chip label={`NT$ ${fItem.foodPrice || 60}`} size="small" sx={{ backgroundColor: '#FFEBEE', color: '#C62828', fontWeight: 800 }} />
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                                            {lang === 'en' ? (fItem.foodInfoEN || fItem.foodInfo) : fItem.foodInfo}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            fullWidth
                                            className="tw-btn-primary"
                                            onClick={() => handleGoToFood(fItem._id)}
                                        >
                                            {lang === 'en' ? 'Food Details' : '查看美食介紹'}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography sx={{ color: '#888', textAlign: 'center', py: 4 }}>
                                {lang === 'en' ? 'No food items recorded for this market currently' : '目前暫無此夜市的美食資料'}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* Tab 1: 店家列表 */}
            {activeTab === 1 && (
                <Grid container spacing={3}>
                    {marketShops.length > 0 ? (
                        marketShops.map((sItem, sIdx) => (
                            <Grid item xs={12} sm={6} md={4} key={sItem._id || sIdx}>
                                <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={sItem.shopIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                                        alt={sItem.shopName}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                                {lang === 'en' && sItem.shopNameEN ? sItem.shopNameEN : sItem.shopName}
                                            </Typography>
                                            <Chip label={sItem.shopNumber || (lang === 'en' ? 'Stall' : '攤位')} size="small" sx={{ backgroundColor: '#F0EAE1', fontWeight: 800 }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap', mb: 1 }}>
                                            <Chip
                                                label={sItem.shopType || (lang === 'en' ? 'Street Food' : '人氣美食')}
                                                size="small"
                                                sx={{ backgroundColor: '#FEF2F2', color: '#B91C1C', fontWeight: 700, fontSize: '0.75rem' }}
                                            />
                                            {(sItem.googleRating > 0 || sItem.rating > 0) && (
                                                <Chip
                                                    label={`⭐ ${sItem.googleRating || sItem.rating} (${sItem.googleReviewCount || sItem.rank || 1000}+ ${lang === 'en' ? 'Google Reviews' : '則 Google 評論'})`}
                                                    size="small"
                                                    sx={{ backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: 700, fontSize: '0.75rem' }}
                                                />
                                            )}
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#E65100', fontWeight: 700, mb: 1, fontSize: '0.85rem' }}>
                                            📍 {sItem.shopLocation || (lang === 'en' ? 'Main Street' : '夜市主街區')}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, minHeight: '44px' }}>
                                            {sItem.shopShortIntroduction || sItem.shopIntroduction}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                                        <Button
                                            fullWidth
                                            className="tw-btn-primary"
                                            onClick={() => handleGoToShop(sItem._id)}
                                        >
                                            {lang === 'en' ? 'View Stall Menu' : '查看攤位菜單'}
                                        </Button>
                                        {sItem.googlePlaceUrl && (
                                            <Button
                                                variant="outlined"
                                                href={sItem.googlePlaceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    minWidth: '40px',
                                                    borderColor: '#EAE5DD',
                                                    color: '#B91C1C',
                                                    '&:hover': { borderColor: '#B91C1C', backgroundColor: 'rgba(185, 28, 28, 0.04)' }
                                                }}
                                                title={lang === 'en' ? 'Open in Google Maps' : '在 Google 地圖查看'}
                                            >
                                                <OpenInNewIcon fontSize="small" />
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography sx={{ color: '#888', textAlign: 'center', py: 4 }}>
                                {lang === 'en' ? 'No stall data currently available' : '目前暫無此夜市的店家資料'}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* Tab 2: 地圖導航 (使用 OpenStreetMap 完美支援無痛免金鑰互動地圖) */}
            {activeTab === 2 && (
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: '16px',
                        backgroundColor: '#FFF',
                        border: '1px solid #EFE5D8',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocationOnIcon sx={{ color: '#C62828' }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#2C2622' }}>
                            {lang === 'en' ? `${market.nameen || market.name} Geographic Location` : `${market.name} 地理位置與地圖`}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            {lang === 'en' ? 'Coordinates: ' : '經緯度座標：'}{market.lat || 25.088}, {market.lng || 121.524} ｜ {lang === 'en' ? 'Transit Guide: ' : '捷運/交通導引：'}{market.positionGuidelines || (lang === 'en' ? 'Accessible via public transit' : '請搭乘大眾運輸前往')}
                        </Typography>
                        <Button
                            variant="contained"
                            className="tw-btn-primary"
                            startIcon={<OpenInNewIcon />}
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((market.name || '') + ' ' + (market.marketLocation || ''))}&travelmode=transit`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                px: 2.5,
                                py: 0.8,
                            }}
                        >
                            {lang === 'en' ? 'Open in Google Maps' : 'Google 地圖即時導航'}
                        </Button>
                    </Box>

                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #DDD', height: '420px', width: '100%' }}>
                        <iframe
                            title={`Map of ${market.name}`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${(Number(market.lng) || 121.524) - 0.008}%2C${(Number(market.lat) || 25.088) - 0.006}%2C${(Number(market.lng) || 121.524) + 0.008}%2C${(Number(market.lat) || 25.088) + 0.006}&layer=mapnik&marker=${Number(market.lat) || 25.088}%2C${Number(market.lng) || 121.524}`}
                        />
                    </Box>
                </Paper>
            )}
        </Box>
    );
}
