import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import helper from '../Helper/helper';

export default function FoodInfo() {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const foodId = localStorage.getItem('foodId');

    const [food, setFood] = useState({});
    const [shops, setShops] = useState([]);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        async function loadFoodData() {
            if (!foodId) return;
            try {
                const res = await helper.helper.AsyncFoodOne(foodId);
                if (res && res.food) {
                    setFood(res.food);
                    setUserRating(Number(res.food.rating) || 4.8);
                }

                const sRes = await helper.helper.AsyncShop();
                if (sRes && sRes.shop) {
                    setShops(sRes.shop);
                }
            } catch (err) {
                console.error('Failed to load food:', err);
            }
        }
        loadFoodData();
    }, [foodId]);

    const handleRatingChange = async (newVal) => {
        setUserRating(newVal);
        if (food && user) {
            try {
                const updated = { ...food, rating: newVal };
                await helper.helper.AsyncEditFood(user._id, updated);
            } catch (e) {
                console.error('Failed to update rating:', e);
            }
        }
    };

    const handleGoToShop = (id) => {
        localStorage.setItem('shopId', id);
        window.location.href = '/shop';
    };

    return (
        <Box sx={{ pb: 6 }}>
            {/* 返回按鈕 */}
            <Box sx={{ mb: 2 }}>
                <Button
                    href="/Food"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#C62828', fontWeight: 700 }}
                >
                    返回美食清單
                </Button>
            </Box>

            {/* 美食主卡片 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, md: 4 },
                    borderRadius: '20px',
                    backgroundColor: '#FFF',
                    border: '1px solid #EFE5D8',
                    boxShadow: '0 6px 24px rgba(44, 38, 34, 0.06)',
                    mb: 5,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* 左側照片 */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                            <img
                                src={food.foodIcon || 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800'}
                                alt={food.foodName || '美食相片'}
                                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 12,
                                    right: 12,
                                    backgroundColor: '#C62828',
                                    color: '#FFF',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: '8px',
                                    fontWeight: 900,
                                    fontSize: '1.25rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                }}
                            >
                                NT$ {food.foodPrice || 60}
                            </Box>
                        </Box>
                    </Grid>

                    {/* 右側資訊 */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <span style={{ fontSize: '1.8rem' }}>🥢</span>
                            <Typography
                                variant="h4"
                                sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#2C2622' }}
                            >
                                {food.foodName || '美食名稱'}
                            </Typography>
                        </Box>

                        {food.foodInfoEN && (
                            <Typography variant="subtitle1" sx={{ color: '#888', fontWeight: 600, mb: 2 }}>
                                {food.foodInfoEN}
                            </Typography>
                        )}

                        {/* 分類標籤 */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                            {Array.isArray(food.foodType) && food.foodType.map((t, i) => (
                                <Chip
                                    key={i}
                                    label={t}
                                    sx={{ backgroundColor: '#FBE9E7', color: '#C62828', fontWeight: 800 }}
                                />
                            ))}
                        </Box>

                        <Typography variant="body1" sx={{ color: '#4E463F', lineHeight: 1.8, mb: 3 }}>
                            {food.foodInfo || '經典台灣道地夜市小吃，傳承獨門配方與現點現做的美味口感。'}
                        </Typography>

                        {/* 評分區塊 */}
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: '12px',
                                backgroundColor: '#FFFDF9',
                                border: '1px solid #F0E6D8',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#666' }}>
                                    老饕推薦指數
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    <Rating
                                        value={userRating}
                                        precision={0.5}
                                        onChange={(e, val) => handleRatingChange(val)}
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#C62828' }}>
                                        {userRating}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* 推薦提供此小吃的知名攤位 */}
            <Box sx={{ mb: 4 }}>
                <Box className="tw-section-header">
                    <Typography className="tw-section-title">
                        <span>🏬</span> 推薦人氣攤位
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {shops.slice(0, 3).map((sItem, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={sItem._id || idx}>
                            <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={sItem.shopIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                                    alt={sItem.shopName}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#2C2622', mb: 0.5 }}>
                                        {sItem.shopName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#E65100', fontWeight: 700, mb: 1 }}>
                                        🏮 {sItem.shopYeShi || '知名夜市'} ‧ {sItem.shopLocation || '攤位'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, minHeight: '40px' }}>
                                        {sItem.shopShortIntroduction || sItem.shopIntroduction}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        className="tw-btn-primary"
                                        onClick={() => handleGoToShop(sItem._id)}
                                    >
                                        前往店家攤位
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
