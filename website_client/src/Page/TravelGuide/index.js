import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import PaymentsIcon from '@mui/icons-material/Payments';
import TranslateIcon from '@mui/icons-material/Translate';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useLanguage } from '../../Context/LanguageContext';

export default function TravelGuide() {
    const { lang } = useLanguage();
    const [tabVal, setTabVal] = useState(0);
    const [speakingWord, setSpeakingWord] = useState('');

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-TW';
            utterance.rate = 0.85; // slightly slower for clear learning
            setSpeakingWord(text);
            utterance.onend = () => setSpeakingWord('');
            utterance.onerror = () => setSpeakingWord('');
            window.speechSynthesis.speak(utterance);
        }
    };

    const transitGuides = [
        {
            city: lang === 'en' ? 'Taipei' : '台北市',
            market: lang === 'en' ? 'Shilin Night Market' : '士林夜市',
            method: lang === 'en' ? 'MRT Tamsui-Xinyi Line (Red Line)' : '台北捷運淡水信義線 (紅線)',
            station: lang === 'en' ? 'Jiantan Station (R15) Exit 1, 3 mins walk' : '捷運劍潭站 1 號出口，步行約 3 分鐘 (請勿搭至士林站)',
            tip: lang === 'en' ? 'Best time: 17:30 - 23:30. Most famous for Giant Fried Chicken & Boba!' : '最佳造訪時間：17:30 - 23:30。大南路與基河路美食街最熱鬧。'
        },
        {
            city: lang === 'en' ? 'Taipei' : '台北市',
            market: lang === 'en' ? 'Raohe Night Market' : '饒河街夜市',
            method: lang === 'en' ? 'MRT Songshan-Xindian Line (Green Line)' : '台北捷運松山新店線 (綠線)',
            station: lang === 'en' ? 'Songshan Station (G19) Exit 1, 1 min walk' : '捷運松山站 1 號或 2 號出口直達 (緊鄰慈祐宮)',
            tip: lang === 'en' ? 'Must try: Fuzhou Ancestral Pepper Bun at the temple entrance.' : '入廟拜拜祈福後，必排入口處米其林必比登推薦胡椒餅。'
        },
        {
            city: lang === 'en' ? 'Taipei' : '台北市',
            market: lang === 'en' ? 'Ningxia Night Market' : '寧夏夜市',
            method: lang === 'en' ? 'MRT Red Line or Green Line' : '台北捷運淡水信義線 / 松山新店線',
            station: lang === 'en' ? 'Shuanglian Station (R12) or Zhongshan Station (R11/G14), 8 mins walk' : '雙連站 1 號出口或中山站 5 號出口，沿民生西路步行約 8 分鐘',
            tip: lang === 'en' ? 'Taiwanese food paradise: Taro balls, Oyster omelets, and braised pork rice.' : '千歲宴發源地，獲獎老店雲集，動線單純好逛。'
        },
        {
            city: lang === 'en' ? 'Taichung' : '台中市',
            market: lang === 'en' ? 'Fengjia Night Market' : '逢甲夜市',
            method: lang === 'en' ? 'Taichung City Bus / MRT Transfer' : '台中市公車 / 捷運轉乘',
            station: lang === 'en' ? 'From Taichung Train Station / HSR, take Bus 35, 300, 310 or MRT Wenxin Sakura Station + Bus/YouBike' : '台鐵台中車站或高鐵台中站搭乘 35、300 轉乘公車至「逢甲大學」站',
            tip: lang === 'en' ? 'Taiwan’s street food trend incubator. Huge campus area with latest creative snacks.' : '全台灣創意美食發源地，文華路與逢甲路一帶最為精華。'
        },
        {
            city: lang === 'en' ? 'Tainan' : '台南市',
            market: lang === 'en' ? 'Garden Night Market' : '花園夜市',
            method: lang === 'en' ? 'Bus from Tainan Train Station / Taxi' : '台南火車站轉乘公車 / 計程車',
            station: lang === 'en' ? 'From Tainan Station, take Bus 0-Left or 10 mins taxi' : '台南火車站搭乘 0 左公車至「花園夜市」站，或搭計程車約 10 分鐘 (約 NT$130)',
            tip: lang === 'en' ? '⚠️ CRITICAL: Open ONLY on Thursdays, Saturdays, and Sundays (17:00 - 00:00)!' : '⚠️ 重要注意：每週僅四、六、日營業！千面旗海飄揚，南台灣最大夜市。'
        },
        {
            city: lang === 'en' ? 'Kaohsiung' : '高雄市',
            market: lang === 'en' ? 'Liuhe Tourist Night Market' : '六合夜市',
            method: lang === 'en' ? 'Kaohsiung MRT Red / Orange Line' : '高雄捷運紅線 / 橘線',
            station: lang === 'en' ? 'Formosa Boulevard Station (R10/O5) Exit 11, right at the entrance' : '捷運美麗島站 11 號出口直達步行 1 分鐘',
            tip: lang === 'en' ? 'Famous for papaya milk, fresh seafood, and wide pedestrian-only walkways.' : '路面寬敞行人專屬，必喝老牌木瓜牛奶與現煮海鮮粥。'
        },
        {
            city: lang === 'en' ? 'Yilan' : '宜蘭縣',
            market: lang === 'en' ? 'Luodong Night Market' : '羅東夜市',
            method: lang === 'en' ? 'Taiwan Railway (TRA)' : '台鐵火車',
            station: lang === 'en' ? 'Luodong Train Station, 8 mins walk along Gongzheng Rd' : '羅東火車站前站出站，沿公正路步行約 8 分鐘抵達中山公園旁',
            tip: lang === 'en' ? 'Famous for Yilan scallion pancakes, angelica mutton soup, and Dragon-phoenix rolls.' : '宜蘭三星蔥油餅、當歸羊肉湯、卜肉與糕渣是在地必嚐。'
        },
    ];

    const phrases = [
        {
            chinese: '內用',
            pinyin: 'nèi yòng',
            english: 'For here / Dine-in',
            usage: lang === 'en' ? 'Use when eating at the stall tables' : '在攤位附設座位區內享用時使用'
        },
        {
            chinese: '外帶',
            pinyin: 'wài dài',
            english: 'To go / Takeout',
            usage: lang === 'en' ? 'Use when walking around while eating' : '邊走邊吃或外帶回飯店時使用'
        },
        {
            chinese: '一份 / 兩份',
            pinyin: 'yí fèn / liǎng fèn',
            english: 'One portion / Two portions',
            usage: lang === 'en' ? 'Ordering standard serving sizes' : '指定購買數量'
        },
        {
            chinese: '不要香菜',
            pinyin: 'bù yào xiāng cài',
            english: 'No cilantro / coriander',
            usage: lang === 'en' ? 'Essential if you dislike fresh cilantro herbs' : '不吃香菜朋友必備金句'
        },
        {
            chinese: '小辣 / 不辣',
            pinyin: 'xiǎo là / bù là',
            english: 'Mild spicy / Not spicy',
            usage: lang === 'en' ? 'Adjust spicy level of fried chicken / dishes' : '調整胡椒鹽辣粉或醬料辣度'
        },
        {
            chinese: '微糖微冰',
            pinyin: 'wéi táng wéi bīng',
            english: 'Less sugar, less ice',
            usage: lang === 'en' ? 'The classic Taiwanese boba tea formula' : '點手搖飲或鮮果汁的最熱門黃金比例'
        },
        {
            chinese: '多少錢？',
            pinyin: 'duō shǎo qián?',
            english: 'How much is it?',
            usage: lang === 'en' ? 'Ask price when checking out' : '結帳詢價'
        },
        {
            chinese: '謝謝老闆！',
            pinyin: 'xiè xie lǎo bǎn!',
            english: 'Thank you, boss!',
            usage: lang === 'en' ? 'Friendly way to thank the stall owner' : '台灣在地親切的感謝稱呼'
        }
    ];

    const etiquetteTips = [
        {
            title: lang === 'en' ? '1. Cash is King & Mobile Pay' : '1. 準備現金小鈔與行動支付',
            desc: lang === 'en'
                ? 'Prepare NT$50 coins and NT$100 bills. Most stalls accept cash, while over 60% in major night markets now also accept LINE Pay, JKO Pay, and EasyCard.'
                : '建議隨身準備 50 元硬幣與 100 元鈔票，結帳最迅速方便。目前台北、台中各大夜市亦有超過 6 成店家支援 LINE Pay、街口與悠遊卡嗶卡！'
        },
        {
            title: lang === 'en' ? '2. Follow the Queue (Taiwan Queue Culture)' : '2. 遵循排隊動線與號碼牌',
            desc: lang === 'en'
                ? 'Popular stalls often have two separate lines: one for ordering/paying and one for pick-up. Some hand out numbered tickets.'
                : '排隊名店通常區分「點餐排隊」與「取餐等候」，部分店家會發放號碼牌。請跟隨人群指引並保留通行步道。'
        },
        {
            title: lang === 'en' ? '3. Trash Sorting & Environmental Care' : '3. 垃圾分類與自備環保袋',
            desc: lang === 'en'
                ? 'Night markets provide sorted recycling bins at main street corners (General trash, Recycling, Food scraps). Stalls charge NT$1-2 for plastic bags, so bringing your own bag is recommended!'
                : '夜市各大主要路口均設有分類垃圾桶（一般垃圾、資源回收、竹籤桶）。店家響應環保，塑膠提袋需另購（1-2元），建議自備環保提袋。'
        },
        {
            title: lang === 'en' ? '4. Peak Hours & Golden Visiting Window' : '4. 避開擁擠尖峰的黃金時段',
            desc: lang === 'en'
                ? 'Peak crowd hours are 19:30 - 21:30. For a leisurely stroll without long queues, visit between 17:30 - 18:45.'
                : '平日與週末人潮最盛時段為 19:30 至 21:30。想避開長長人龍、悠閒品嚐熱騰騰美食，建議於 17:30 至 18:45 剛開攤時前往！'
        }
    ];

    return (
        <Box sx={{ pb: 6 }}>
            {/* Banner 標題橫幅 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #8E1800 0%, #C62828 50%, #D84315 100%)',
                    color: '#FFF',
                    mb: 4,
                    boxShadow: '0 8px 30px rgba(198, 40, 40, 0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
                    <Chip
                        label={lang === 'en' ? '✈️ Tourist & Traveler Essentials' : '✈️ 外縣市旅人與國際觀光客必讀'}
                        sx={{
                            backgroundColor: '#FFD54F',
                            color: '#5D1000',
                            fontWeight: 800,
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "'Noto Serif TC', serif",
                            fontWeight: 900,
                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                            lineHeight: 1.3,
                            mb: 1.5,
                        }}
                    >
                        {lang === 'en' ? 'Taiwan Night Market 101: Complete Traveler’s Guide' : '台灣迺夜市新手通關秘笈 ‧ 旅人首選攻略'}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.92)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                        {lang === 'en'
                            ? 'Visiting from another city or abroad? Master MRT transit, essential ordering phrases, payment tips, and avoid closed days with our comprehensive traveler kit!'
                            : '專為跨縣市來訪旅人與國際觀光客量身打造！一次搞懂全台夜市捷運大眾運輸、排隊點餐常用語、支付習慣與必訪時程，讓您像在地人一樣暢快迺夜市！'}
                    </Typography>
                </Box>
            </Paper>

            {/* 功能切換 Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3.5 }}>
                <Tabs
                    value={tabVal}
                    onChange={(e, val) => setTabVal(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{
                        '& .MuiTab-root': {
                            fontWeight: 800,
                            fontSize: '1rem',
                            color: '#666',
                            '&.Mui-selected': { color: '#C62828' }
                        },
                        '& .MuiTabs-indicator': { backgroundColor: '#C62828', height: 3 }
                    }}
                >
                    <Tab icon={<DirectionsSubwayIcon />} iconPosition="start" label={lang === 'en' ? '1. MRT & Transit Guide' : '1. 全台捷運與交通直達'} />
                    <Tab icon={<TranslateIcon />} iconPosition="start" label={lang === 'en' ? '2. Ordering Phrases & Pinyin' : '2. 點餐常用語與發音'} />
                    <Tab icon={<PaymentsIcon />} iconPosition="start" label={lang === 'en' ? '3. Payments & Budget' : '3. 支付方式與預算指南'} />
                    <Tab icon={<TipsAndUpdatesIcon />} iconPosition="start" label={lang === 'en' ? '4. Etiquette & Golden Hours' : '4. 避坑貼士與黃金時段'} />
                </Tabs>
            </Box>

            {/* Tab 0: 交通指南 */}
            {tabVal === 0 && (
                <Grid container spacing={3}>
                    {transitGuides.map((guide, idx) => (
                        <Grid item xs={12} md={6} key={idx}>
                            <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1 }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#C62828' }}>
                                            🏮 {guide.market}
                                        </Typography>
                                        <Chip label={guide.city} size="small" sx={{ backgroundColor: '#FFECB3', color: '#8E1800', fontWeight: 800 }} />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                                        <DirectionsSubwayIcon sx={{ color: '#2E7D32', fontSize: 20, mt: 0.2 }} />
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#2C2622' }}>
                                                {guide.method}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#555', mt: 0.3 }}>
                                                📍 {guide.station}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Paper elevation={0} sx={{ p: 1.5, mt: 1.5, backgroundColor: '#FFFDF9', border: '1px dashed #E0D4C5', borderRadius: '8px' }}>
                                        <Typography variant="caption" sx={{ color: '#E65100', fontWeight: 700, display: 'block' }}>
                                            💡 {guide.tip}
                                        </Typography>
                                    </Paper>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Tab 1: 常用點餐句子 */}
            {tabVal === 1 && (
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#555', mb: 2 }}>
                        {lang === 'en'
                            ? 'Point to these words on your phone or practice saying them with Chinese Pinyin to stall vendors!'
                            : '您可以直接出示手機上的字卡給老闆看，或參考漢語拼音輕鬆點餐！'}
                    </Typography>

                    <Grid container spacing={2.5}>
                        {phrases.map((p, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <Card
                                    className="tw-card"
                                    sx={{
                                        p: 2.5,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        backgroundColor: '#FFF',
                                        border: '1px solid #EFE5D8',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 6px 18px rgba(198, 40, 40, 0.12)'
                                        }
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#C62828', fontFamily: "'Noto Serif TC', serif", mb: 0.5 }}>
                                        {p.chinese}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic', mb: 1 }}>
                                        [{p.pinyin}]
                                    </Typography>
                                    <Box
                                        sx={{
                                            backgroundColor: '#EFEBE9',
                                            color: '#4E342E',
                                            fontWeight: 800,
                                            fontSize: '0.78rem',
                                            borderRadius: '12px',
                                            px: 1.2,
                                            py: 0.4,
                                            mb: 1.5,
                                            display: 'inline-block',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {p.english}
                                    </Box>
                                    <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1.5, flexGrow: 1, lineHeight: 1.5 }}>
                                        {p.usage}
                                    </Typography>
                                    <Button
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        startIcon={<VolumeUpIcon />}
                                        onClick={() => speakText(p.chinese)}
                                        sx={{
                                            mt: 'auto',
                                            borderRadius: '20px',
                                            borderColor: speakingWord === p.chinese ? '#2E7D32' : '#C62828',
                                            color: speakingWord === p.chinese ? '#2E7D32' : '#C62828',
                                            backgroundColor: speakingWord === p.chinese ? '#E8F5E9' : 'transparent',
                                            fontWeight: 800,
                                            fontSize: '0.8rem',
                                            '&:hover': {
                                                borderColor: '#B71C1C',
                                                backgroundColor: 'rgba(198, 40, 40, 0.06)'
                                            }
                                        }}
                                    >
                                        {speakingWord === p.chinese ? (lang === 'en' ? 'Playing...' : '播放中...') : (lang === 'en' ? 'Listen 🔊' : '發音示範 🔊')}
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* Tab 2: 支付與預算指南 */}
            {tabVal === 2 && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #EFE5D8', backgroundColor: '#FFF' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <PaymentsIcon sx={{ color: '#E65100', fontSize: 28 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    {lang === 'en' ? 'Currency & Spending Estimates' : '新台幣預算與均價參考'}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8, mb: 2 }}>
                                {lang === 'en'
                                    ? 'Taiwan street food is renowned for incredible affordability and freshness. Most dishes cost between NT$ 50 to NT$ 120 (approx. $1.50 - $4.00 USD / €1.40 - €3.80 EUR).'
                                    : '台灣夜市以高CP值與真材實料聞名世界！單樣經典小吃價位多落在 50 至 120 元新台幣之間。'}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Paper sx={{ p: 1.5, backgroundColor: '#FFF8E1', borderRadius: '8px' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#E65100' }}>
                                        🍜 {lang === 'en' ? 'Light Snack Run: NT$ 100 - 150 (~$3.5 - 5 USD)' : '輕食嘗鮮 (1-2 樣)：約 NT$ 100 - 150'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        {lang === 'en' ? 'e.g. 1 Bubble Tea + 1 Sweet Potato Balls / Scallion Pancake' : '例：一杯黑糖珍奶 + 地瓜球或蔥油餅'}
                                    </Typography>
                                </Paper>
                                <Paper sx={{ p: 1.5, backgroundColor: '#FFEBEE', borderRadius: '8px' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#C62828' }}>
                                        🍗 {lang === 'en' ? 'Full Dinner Feast: NT$ 200 - 300 (~$6.5 - 10 USD)' : '飽足大餐 (3-4 樣)：約 NT$ 200 - 300'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        {lang === 'en' ? 'e.g. Giant Chicken Cutlet + Oyster Omelet + Stinky Tofu + Fresh Mango Juice' : '例：大雞排 + 蚵仔煎 + 炭烤香腸 + 現打果汁，超級飽足！'}
                                    </Typography>
                                </Paper>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #EFE5D8', backgroundColor: '#FFF' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <TipsAndUpdatesIcon sx={{ color: '#2E7D32', fontSize: 28 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    {lang === 'en' ? 'Accepted Payment Options' : '夜市支援之支付工具'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                        💵 {lang === 'en' ? 'Cash (NTD Notes & Coins) - 100% Accepted' : '新台幣現金（必備）'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                                        {lang === 'en' ? 'All vendors gladly take NT$50 coins and NT$100 bills. Avoid paying with NT$1000 bills for small purchases.' : '所有攤商皆接受現金。購買幾十元銅板美食時，盡量避免拿千元大鈔找零，彼此更順暢！'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                        📱 {lang === 'en' ? 'Mobile QR Payments (LINE Pay & JKO)' : '行動支付 (LINE Pay / 街口 / 悠遊卡)'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                                        {lang === 'en' ? 'Look for the green LINE Pay QR standee on the stall counter. Just scan to pay!' : '各大指標夜市均有顯著行動支付綠色立牌，外籍旅客綁定國際信用卡之 LINE Pay 亦可輕鬆掃碼。'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Tab 3: 禮儀與避坑須知 */}
            {tabVal === 3 && (
                <Box>
                    {etiquetteTips.map((tip, idx) => (
                        <Accordion key={idx} defaultExpanded={idx === 0} sx={{ mb: 1.5, borderRadius: '12px !important', border: '1px solid #EAE0D5', boxShadow: 'none' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    {tip.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                                    {tip.desc}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}

            {/* 底部行動導引 */}
            <Box sx={{ mt: 5, textAlign: 'center', p: 3, borderRadius: '16px', backgroundColor: '#FFFDF9', border: '1px dashed #E0D4C5' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#2C2622', mb: 1 }}>
                    {lang === 'en' ? 'Ready to embark on your night market journey?' : '準備好踏上今晚的台灣夜市尋味之旅了嗎？'}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                    <Button href="/nightmarket" variant="contained" className="tw-btn-primary" endIcon={<ArrowForwardIcon />}>
                        {lang === 'en' ? 'Explore All Night Markets' : '立即探索全台夜市 🏮'}
                    </Button>
                    <Button href="/Food" variant="outlined" sx={{ color: '#C62828', borderColor: '#C62828', fontWeight: 800 }}>
                        {lang === 'en' ? 'View Food Menu & Prices' : '查看人氣美食圖鑑 🥢'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
