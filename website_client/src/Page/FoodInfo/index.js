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
import Stack from '@mui/material/Stack';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';
import { useWishlist } from '../../Context/WishlistContext';

export default function FoodInfo() {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const { toggleWishlist, isInWishlist } = useWishlist();

    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const foodId = localStorage.getItem('foodId');

    const [food, setFood] = useState({});
    const [shops, setShops] = useState([]);
    const [userRating, setUserRating] = useState(4.8);

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

    // 辨識飲食偏好標籤 (針對外國旅客與特殊飲食需求)
    const getDietaryTag = (item) => {
        const name = (item.foodName || '').toLowerCase();
        if (name.includes('地瓜球') || name.includes('豆花') || name.includes('果汁') || name.includes('奶茶') || name.includes('黑糖') || name.includes('雪花冰') || name.includes('杏仁')) {
            return { label: isEn ? '🌱 Vegetarian Friendly' : '🌱 蔬食奶素友善', bg: '#F0FDF4', color: '#166534', border: '#bbf7d0' };
        }
        if (name.includes('香腸') || name.includes('肉圓') || name.includes('大腸') || name.includes('滷肉') || name.includes('排骨')) {
            return { label: isEn ? '🐷 Taiwan Pork' : '🐷 嚴選台灣豬肉', bg: '#FEF2F2', color: '#991B1B', border: '#fecaca' };
        }
        if (name.includes('雞排') || name.includes('鹽酥雞') || name.includes('鹹酥雞')) {
            return { label: isEn ? '🐔 Fresh Poultry' : '🐔 新鮮鮮嫩雞肉', bg: '#FFFBEB', color: '#92400E', border: '#fde68a' };
        }
        if (name.includes('蚵仔') || name.includes('海鮮') || name.includes('花枝') || name.includes('魷魚') || name.includes('蝦')) {
            return { label: isEn ? '🦐 Fresh Seafood' : '🦐 港口直送海鮮', bg: '#F0F9FF', color: '#075985', border: '#bae6fd' };
        }
        return { label: isEn ? '⭐ Authentic Classic' : '⭐ 在地經典手作', bg: '#FAF8F5', color: '#78350F', border: '#EAE5DD' };
    };

    const dietaryInfo = getDietaryTag(food);
    const inWishlist = food._id ? isInWishlist(food._id) : false;

    // 比對提供此美食的攤位
    const matchingShops = shops.filter(s => {
        const sName = (s.shopName || '').toLowerCase();
        const fName = (food.foodName || '').toLowerCase();
        const fIntro = (food.foodInfo || '').toLowerCase();
        return sName.includes(fName) || fIntro.includes(s.shopName) || (Array.isArray(s.food) && s.food.some(f => f.foodName === food.foodName));
    });

    const displayShops = matchingShops.length > 0 ? matchingShops : shops.slice(0, 3);

    return (
        <Box sx={{ pb: 6, maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 } }}>
            {/* 頂部導航按鈕列 */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    href="/Food"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#B91C1C', fontWeight: 700, fontSize: '0.95rem' }}
                >
                    {isEn ? 'Back to Food Directory' : '返回美食探索清單'}
                </Button>

                <Button
                    variant={inWishlist ? "contained" : "outlined"}
                    startIcon={inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    onClick={() => food._id && toggleWishlist(food)}
                    sx={{
                        borderRadius: 3,
                        fontWeight: 800,
                        borderColor: '#B91C1C',
                        color: inWishlist ? '#FFFFFF' : '#B91C1C',
                        bgcolor: inWishlist ? '#B91C1C' : 'transparent',
                        '&:hover': { bgcolor: inWishlist ? '#991B1B' : '#FFF5F5', borderColor: '#B91C1C' }
                    }}
                >
                    {inWishlist ? (isEn ? 'Saved in Food Wishlist' : '已收藏至美食清單') : (isEn ? 'Add to Food Wishlist' : '收藏至我的口袋清單')}
                </Button>
            </Box>

            {/* 美食主卡片 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, md: 4 },
                    borderRadius: '24px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #EAE5DD',
                    boxShadow: '0 4px 24px rgba(28, 25, 23, 0.06)',
                    mb: 5,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* 左側照片 */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                            <img
                                src={food.foodIcon || 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800'}
                                alt={food.foodName || '美食相片'}
                                style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
                            />
                            {/* 價格標籤 */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 14,
                                    right: 14,
                                    backgroundColor: 'rgba(28, 25, 23, 0.88)',
                                    backdropFilter: 'blur(8px)',
                                    color: '#FFF',
                                    px: 2.5,
                                    py: 0.8,
                                    borderRadius: '20px',
                                    fontWeight: 900,
                                    fontSize: '1.2rem',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                }}
                            >
                                <span style={{ color: '#FBBF24' }}>NT$ {food.foodPrice || 60}</span>
                            </Box>

                            {/* 飲食指南標籤 */}
                            <Box sx={{ position: 'absolute', top: 14, left: 14 }}>
                                <Chip
                                    label={dietaryInfo.label}
                                    sx={{
                                        bgcolor: dietaryInfo.bg,
                                        color: dietaryInfo.color,
                                        border: `1px solid ${dietaryInfo.border}`,
                                        fontWeight: 800,
                                        fontSize: '0.85rem'
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>

                    {/* 右側詳細資訊 */}
                    <Grid item xs={12} md={7}>
                        <Typography
                            variant="h4"
                            sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#1C1917', mb: 0.5 }}
                        >
                            {food.foodName || (isEn ? 'Signature Street Delicacy' : '必吃夜市美食')}
                        </Typography>

                        {food.foodInfoEN && (
                            <Typography variant="h6" sx={{ color: '#78716C', fontWeight: 600, mb: 2, fontSize: '1.05rem' }}>
                                {food.foodInfoEN}
                            </Typography>
                        )}

                        {/* 分類與特色標籤 */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                            {Array.isArray(food.foodType) && food.foodType.map((t, i) => (
                                <Chip
                                    key={i}
                                    label={t}
                                    sx={{ backgroundColor: '#FAF8F5', color: '#1C1917', border: '1px solid #EAE5DD', fontWeight: 700, borderRadius: '8px' }}
                                />
                            ))}
                            <Chip
                                icon={<VerifiedIcon sx={{ fontSize: '1rem !important', color: '#D97706' }} />}
                                label={isEn ? "Night Market Must-Eat" : "夜市必吃人氣王"}
                                sx={{ bgcolor: '#FFFBEB', color: '#92400E', fontWeight: 800, border: '1px solid #FDE68A' }}
                            />
                        </Box>

                        <Typography variant="body1" sx={{ color: '#57534E', lineHeight: 1.8, mb: 3, fontSize: '1rem' }}>
                            {isEn && food.foodInfoEN ? food.foodInfoEN : (food.foodInfo || '經典台灣道地夜市小吃，傳承獨門配方與現點現做的美味口感。')}
                        </Typography>

                        {/* 評分與支付支援卡片 */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: '16px',
                                    backgroundColor: '#FAF8F5',
                                    border: '1px solid #EAE5DD',
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#78716C', textTransform: 'uppercase' }}>
                                        {isEn ? 'Foodie Rating' : '饕客推薦滿意度'}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                        <Rating
                                            value={userRating}
                                            precision={0.5}
                                            onChange={(e, val) => handleRatingChange(val)}
                                            sx={{ color: '#FBBF24' }}
                                        />
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#1C1917' }}>
                                            {userRating}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: '16px',
                                    backgroundColor: '#FAF8F5',
                                    border: '1px solid #EAE5DD',
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                }}
                            >
                                <PaymentsIcon sx={{ color: '#059669', fontSize: 28 }} />
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#78716C' }}>
                                        {isEn ? 'Payment Methods' : '付款方式推薦'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1F2937', mt: 0.3 }}>
                                        {isEn ? 'Cash (NT$), LINE Pay, JKOPay' : '現金（百元鈔佳）、LINE Pay、街口'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {/* 推薦提供此小吃的知名名店與攤位 */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ mb: 2.5 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'inline-block',
                            fontWeight: 900,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#B91C1C',
                            mb: 0.3,
                        }}
                    >
                        {isEn ? 'WHERE TO TASTE' : '推薦品嚐名攤'}
                    </Typography>
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: '#1C1917' }}>
                        {isEn ? 'Featured Stalls & Night Market Vendors' : '推薦人氣排隊攤位與店家'}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {displayShops.map((sItem, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={sItem._id || idx}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    border: '1px solid #EAE5DD',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={sItem.shopIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                                    alt={sItem.shopName}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                                        <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: '#1C1917' }}>
                                            {isEn && sItem.shopNameEN ? sItem.shopNameEN : sItem.shopName}
                                        </Typography>
                                        <Chip label={`⭐ ${sItem.googleRating || sItem.rating || 4.5}`} size="small" sx={{ fontWeight: 800, bgcolor: '#FEF3C7', color: '#92400E' }} />
                                    </Box>

                                    <Typography variant="body2" sx={{ color: '#D97706', fontWeight: 700, mb: 1.2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <LocationOnIcon sx={{ fontSize: 16 }} />
                                        {sItem.shopYeShi || (isEn ? 'Famous Night Market' : '知名觀光夜市')} ‧ {sItem.shopNumber || sItem.shopLocation || '排隊名攤'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#78716C', lineHeight: 1.6, minHeight: '40px' }}>
                                        {isEn && sItem.shopShortIntroduction ? sItem.shopShortIntroduction : (sItem.shopShortIntroduction || sItem.shopIntroduction)}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2.5, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<StorefrontIcon />}
                                        onClick={() => handleGoToShop(sItem._id)}
                                        sx={{ bgcolor: '#B91C1C', fontWeight: 800, '&:hover': { bgcolor: '#991B1B' } }}
                                    >
                                        {isEn ? 'View Stall Details' : '前往店家攤位詳情'}
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
