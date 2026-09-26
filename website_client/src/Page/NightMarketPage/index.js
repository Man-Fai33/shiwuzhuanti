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

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import helper from '../Helper/helper';

export default function NightMarketPage() {
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

    const handleGoToFood = (id) => {
        localStorage.setItem('foodId', id);
        window.location.href = '/FoodInfo';
    };

    const handleGoToShop = (id) => {
        localStorage.setItem('shopId', id);
        window.location.href = '/shop';
    };

    const getLocationName = (loc) => {
        if (loc === 'tp' || loc === 'Taipei') return '台北市';
        if (loc === 'tz' || loc === 'Taichung') return '台中市';
        if (loc === 'tn' || loc === 'Tainan') return '台南市';
        return '台灣';
    };

    return (
        <Box sx={{ pb: 6 }}>
            {/* 返回按鈕 */}
            <Box sx={{ mb: 2 }}>
                <Button
                    href="/nightmarket"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#C62828', fontWeight: 700 }}
                >
                    返回夜市清單
                </Button>
            </Box>

            {/* 夜市主 Header 介紹卡片 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, md: 4 },
                    borderRadius: '20px',
                    backgroundColor: '#FFF',
                    border: '1px solid #EFE5D8',
                    boxShadow: '0 6px 24px rgba(44, 38, 34, 0.06)',
                    mb: 4,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* 左側：夜市代表相片 */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                            <img
                                src={market.marketIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'}
                                alt={market.name || '夜市相片'}
                                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)',
                                    p: 2,
                                    color: '#FFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Chip
                                    icon={<LocationOnIcon sx={{ color: '#FFF !important' }} />}
                                    label={getLocationName(market.marketLocation)}
                                    size="small"
                                    sx={{ backgroundColor: '#C62828', color: '#FFF', fontWeight: 800 }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#FFD54F', fontWeight: 800 }}>
                                    <span>⭐ {market.rating || 4.8} 顆星推薦</span>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* 右側：夜市名稱與交通簡介 */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <span style={{ fontSize: '1.8rem' }}>🏮</span>
                            <Typography
                                variant="h4"
                                sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#2C2622' }}
                            >
                                {market.name || '夜市簡介'}
                            </Typography>
                        </Box>

                        <Typography variant="subtitle1" sx={{ color: '#888', fontWeight: 600, mb: 2 }}>
                            {market.nameen}
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#4E463F', lineHeight: 1.8, mb: 2.5 }}>
                            {market.brief || market.introduction}
                        </Typography>

                        {market.positionGuidelines && (
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: '12px',
                                    backgroundColor: '#FFF8E1',
                                    border: '1px solid #FFE082',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1.5,
                                    mb: 2,
                                }}
                            >
                                <DirectionsSubwayIcon sx={{ color: '#E65100', mt: 0.3 }} />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#BF360C' }}>
                                        交通指引 / 抵達方式
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#5D4037', mt: 0.3 }}>
                                        {market.positionGuidelines}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#666' }}>
                                遊客好評指數：
                            </Typography>
                            <Rating value={Number(market.rating) || 4.8} precision={0.1} readOnly />
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
                            📖 夜市故事與文化傳承
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
                        label="人氣必吃美食"
                        sx={{ fontWeight: 800, fontSize: '1rem', color: activeTab === 0 ? '#C62828' : '#666' }}
                    />
                    <Tab
                        icon={<StorefrontIcon />}
                        iconPosition="start"
                        label="推薦排隊店家"
                        sx={{ fontWeight: 800, fontSize: '1rem', color: activeTab === 1 ? '#C62828' : '#666' }}
                    />
                    <Tab
                        icon={<MapIcon />}
                        iconPosition="start"
                        label="周邊地圖導航"
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
                                            <Typography variant="h6" className="tw-price">
                                                NT$ {fItem.foodPrice || 60}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, minHeight: '44px' }}>
                                            {fItem.foodInfo || '在地老饕必推的經典招牌小吃！'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            fullWidth
                                            className="tw-btn-primary"
                                            onClick={() => handleGoToFood(fItem._id)}
                                        >
                                            美食詳情與評價
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography sx={{ color: '#888', textAlign: 'center', py: 4 }}>目前暫無此夜市的美食資料</Typography>
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
                                            <Chip label={sItem.shopNumber || '攤位'} size="small" sx={{ backgroundColor: '#F0EAE1', fontWeight: 800 }} />
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#E65100', fontWeight: 700, mb: 1 }}>
                                            📍 {sItem.shopLocation || '夜市主街區'}
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
                                            查看攤位菜單
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography sx={{ color: '#888', textAlign: 'center', py: 4 }}>目前暫無此夜市的店家資料</Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* Tab 2: 地圖導航 */}
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
                            {market.name} 地理位置與地圖
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                        經緯度座標：{market.lat || 25.088}, {market.lng || 121.524} ｜ 捷運/交通導引：{market.positionGuidelines || '請搭乘大眾運輸前往'}
                    </Typography>

                    <Box sx={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #DDD' }}>
                        <LoadScript googleMapsApiKey="AIzaSyAEKOyS_X1yQAGmiZBO9zBjCeFqEsKa5DQ">
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '420px' }}
                                center={{
                                    lat: Number(market.lat) || 25.088,
                                    lng: Number(market.lng) || 121.524
                                }}
                                zoom={16}
                            />
                        </LoadScript>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}
