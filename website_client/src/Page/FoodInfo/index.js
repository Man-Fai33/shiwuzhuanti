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
                    borderRadius: '24px',
                    backgroundColor: 'var(--tw-card-white, #FFFFFF)',
                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                    boxShadow: '0 4px 20px rgba(28, 25, 23, 0.05)',
                    mb: 5,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* 左側照片 */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
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
                                    backgroundColor: 'rgba(28, 25, 23, 0.82)',
                                    backdropFilter: 'blur(8px)',
                                    color: '#FFF',
                                    px: 2,
                                    py: 0.6,
                                    borderRadius: '20px',
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                }}
                            >
                                <span style={{ color: '#FBBF24' }}>NT$ {food.foodPrice || 60}</span>
                            </Box>
                        </Box>
                    </Grid>

                    {/* 右側資訊 */}
                    <Grid item xs={12} md={7}>
                        <Typography
                            variant="h4"
                            sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 0.5 }}
                        >
                            {food.foodName || '美食名稱'}
                        </Typography>

                        {food.foodInfoEN && (
                            <Typography variant="subtitle1" sx={{ color: 'var(--tw-text-muted, #78716C)', fontWeight: 500, mb: 2 }}>
                                {food.foodInfoEN}
                            </Typography>
                        )}

                        {/* 分類標籤 */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                            {Array.isArray(food.foodType) && food.foodType.map((t, i) => (
                                <Chip
                                    key={i}
                                    label={t}
                                    sx={{ backgroundColor: 'var(--tw-paper-cream, #FAF8F5)', color: 'var(--tw-deep-charcoal, #1C1917)', border: '1px solid var(--tw-border-subtle, #EAE5DD)', fontWeight: 600, borderRadius: '8px' }}
                                />
                            ))}
                        </Box>

                        <Typography variant="body1" sx={{ color: '#57534E', lineHeight: 1.8, mb: 3 }}>
                            {food.foodInfo || '經典台灣道地夜市小吃，傳承獨門配方與現點現做的美味口感。'}
                        </Typography>

                        {/* 評分區塊 */}
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: '14px',
                                backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--tw-text-muted, #78716C)' }}>
                                    老饕推薦評分
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    <Rating
                                        value={userRating}
                                        precision={0.5}
                                        onChange={(e, val) => handleRatingChange(val)}
                                        sx={{ color: '#FBBF24' }}
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
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
                <Box sx={{ mb: 2.5 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'inline-block',
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--tw-terracotta, #B91C1C)',
                            mb: 0.3,
                        }}
                    >
                        STALLS & VENDORS
                    </Typography>
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                        推薦人氣攤位
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
                                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 0.5 }}>
                                        {sItem.shopName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'var(--tw-amber, #D97706)', fontWeight: 700, mb: 1 }}>
                                        {sItem.shopYeShi || '知名夜市'} ‧ {sItem.shopLocation || '攤位'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', lineHeight: 1.6, minHeight: '40px' }}>
                                        {sItem.shopShortIntroduction || sItem.shopIntroduction}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2.5, pt: 0 }}>
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
