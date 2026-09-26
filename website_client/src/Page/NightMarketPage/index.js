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

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function NightMarketPage() {
    const { lang } = useLanguage();
    const [market, setMarket] = useState({});
    const [foods, setFoods] = useState([]);

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
            ? '🌧️ Rainy-Day Notice: Most stalls have awnings. Bringing an umbrella is recommended on rainy evenings.'
            : '🌧️ 雨天提醒：夜市多數攤位均備有大型雨遮，雨天造訪建議攜帶輕便摺疊傘。';
    };
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

    const handleGoToFood = (id) => {
        localStorage.setItem('foodId', id);
        window.location.href = '/foodInfo';
    };

    const handleGoToShop = (id) => {
        localStorage.setItem('shopId', id);
        window.location.href = '/shop';
    };

    const getLocationName = (loc) => {
        if (loc === 'tp' || loc === 'Taipei') return lang === 'en' ? 'Taipei' : '台北市';
        if (loc === 'tz' || loc === 'Taichung') return lang === 'en' ? 'Taichung' : '台中市';
        if (loc === 'tn' || loc === 'Tainan') return lang === 'en' ? 'Tainan' : '台南市';
        return lang === 'en' ? 'Taiwan' : '台灣';
    };

    return (
        <Box sx={{ pb: 6 }}>
            {/* 返回夜市列表 */}
            <Box sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    href="/nightmarket"
                    sx={{ color: '#C62828', fontWeight: 800, fontSize: '0.95rem' }}
                >
                    {lang === 'en' ? 'Back to Night Markets' : '返回夜市探索列表'}
                </Button>
            </Box>

            {/* 夜市主標題與精美橫幅 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, md: 4 },
                    mb: 4,
                    borderRadius: '20px',
                    backgroundColor: '#FFF',
                    border: '1px solid #EFE5D8',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* 左側照片 */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ borderRadius: '16px', overflow: 'hidden', height: { xs: '240px', md: '320px' }, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                            <img
                                src={market.marketIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'}
                                alt={market.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    </Grid>

                    {/* 右側夜市特色介紹 */}
                    <Grid item xs={12} md={7}>
                        {/* 城市與標籤 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                            <Chip
                                label={getLocationName(market.marketLocation)}
                                size="small"
                                sx={{ backgroundColor: '#FFD54F', color: '#5D1000', fontWeight: 800 }}
                            />
                            <Chip
                                label={lang === 'en' ? 'Must-Visit Night Market' : '熱門必訪觀光夜市'}
                                size="small"
                                sx={{ backgroundColor: '#FFECB3', color: '#8E1800', fontWeight: 800 }}
                            />
                            <Chip
                                icon={<AccessTimeIcon />}
                                label={getLiveStatus().text}
                                size="small"
                                sx={{
                                    backgroundColor: getLiveStatus().bg,
                                    color: getLiveStatus().color,
                                    fontWeight: 800,
                                }}
                            />
                            <Chip
                                label={getLiveStatus().crowd}
                                size="small"
                                sx={{
                                    backgroundColor: '#FFF3E0',
                                    color: '#E65100',
                                    fontWeight: 700,
                                }}
                            />
                        </Box>

                        <Typography variant="h3" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#C62828', mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                            {lang === 'en' ? (market.nameen || market.name) : market.name}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ color: '#888', mb: 2, fontWeight: 600 }}>
                            {lang === 'en' ? (market.marketLocation || 'Taiwan') : market.nameen}
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, mb: 2.5 }}>
                            {market.brief || market.introduction || (lang === 'en' ? 'Famous night market full of authentic Taiwanese street delicacies.' : '熱門觀光夜市，集結各色在地經典美食與熱鬧攤位。')}
                        </Typography>

                        {/* 交通指引 */}
                        {market.positionGuidelines && (
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5, p: 1.5, backgroundColor: '#F9F6F0', borderRadius: '10px' }}>
                                <DirectionsSubwayIcon sx={{ color: '#C62828', mt: 0.3 }} />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                        {lang === 'en' ? 'Transit & Directions' : '捷運 / 交通指引'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5 }}>
                                        {market.positionGuidelines}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* 雨天備案提示 */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2.5, p: 1.5, backgroundColor: '#E3F2FD', borderRadius: '10px' }}>
                            <UmbrellaIcon sx={{ color: '#0288D1', mt: 0.3 }} />
                            <Typography variant="body2" sx={{ color: '#01579B', lineHeight: 1.5, fontWeight: 600 }}>
                                {getRainyDayTip()}
                            </Typography>
                        </Box>

                        {/* 綜合評分 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating value={Number(market.rating) || 4.8} precision={0.1} readOnly sx={{ color: '#FFB300' }} />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#C62828' }}>
                                ({market.rating || 4.8})
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* 夜市深度故事 / 背景介紹 */}
                {market.introduction && market.introduction !== market.brief && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #EFE5D8' }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#C62828', mb: 1.5 }}>
                            📖 {lang === 'en' ? 'Market History & Heritage' : '夜市故事與文化傳承'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                            {market.introduction}
                        </Typography>
                    </Box>
                )}
            </Paper>

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
                    {foods.length > 0 ? (
                        foods.map((fItem, fIdx) => (
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
                                                {fItem.foodName}
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
                    {shops.length > 0 ? (
                        shops.map((sItem, sIdx) => (
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
                                                {sItem.shopName}
                                            </Typography>
                                            <Chip label={sItem.shopNumber || (lang === 'en' ? 'Stall' : '攤位')} size="small" sx={{ backgroundColor: '#F0EAE1', fontWeight: 800 }} />
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#E65100', fontWeight: 700, mb: 1 }}>
                                            📍 {sItem.shopLocation || (lang === 'en' ? 'Main Street' : '夜市主街區')}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, minHeight: '44px' }}>
                                            {sItem.shopShortIntroduction || sItem.shopIntroduction}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            fullWidth
                                            className="tw-btn-primary"
                                            onClick={() => handleGoToShop(sItem._id)}
                                        >
                                            {lang === 'en' ? 'View Stall Menu' : '查看攤位菜單'}
                                        </Button>
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
                            startIcon={<OpenInNewIcon />}
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((market.name || '') + ' ' + (market.marketLocation || ''))}&travelmode=transit`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                backgroundColor: '#C62828',
                                color: '#FFF',
                                fontWeight: 800,
                                borderRadius: '20px',
                                px: 2.2,
                                py: 0.7,
                                '&:hover': { backgroundColor: '#B71C1C' }
                            }}
                        >
                            {lang === 'en' ? 'Open in Google Maps (Take Me There) ➔' : '🗺️ Google 地圖即時導航 (帶我前往) ➔'}
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
