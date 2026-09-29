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
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SendIcon from '@mui/icons-material/Send';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ImagePickerDialog from '../../Compnonet/ImagePickerDialog';

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

    // 聯網增強狀態
    const [enriching, setEnriching] = useState(false);
    const [enrichMsg, setEnrichMsg] = useState('');
    const [imagePickerOpen, setImagePickerOpen] = useState(false);

    // 美食即時評論狀態
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentScore, setCommentScore] = useState(5);
    const [submittingComment, setSubmittingComment] = useState(false);

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

                // 讀取該美食之即時評價
                const cRes = await helper.helper.AsyncCommentGet();
                if (cRes && cRes.comment) {
                    setComments(cRes.comment);
                }
            } catch (err) {
                console.error('Failed to load food:', err);
            }
        }
        loadFoodData();
    }, [foodId]);

    // 觸發網路大數據深度補全
    const handleEnrichOnline = async () => {
        if (!food._id) return;
        setEnriching(true);
        setEnrichMsg('');
        try {
            const res = await helper.helper.AsyncFoodEnrich(food._id);
            if (res && res.status === 'success' && res.food) {
                setFood(res.food);
                setEnrichMsg(isEn ? '✨ Successfully enriched gourmet details from the web!' : '✨ 成功從網路大數據撈取並補全深度美食資訊！');
                setTimeout(() => setEnrichMsg(''), 4500);
            }
        } catch (e) {
            console.error('Enrich failed:', e);
        } finally {
            setEnriching(false);
        }
    };

    const handleSelectPhoto = async (newUrl) => {
        if (!newUrl || !food) return;
        const updated = { ...food, foodIcon: newUrl };
        setFood(updated);
        setEnrichMsg(isEn ? '📷 Updated food photo from online database!' : '📷 已成功從網路大數據更新為高清美食照片！');
        setTimeout(() => setEnrichMsg(''), 4500);
        try {
            if (user && user._id) {
                await helper.helper.AsyncEditFood(user._id, updated);
            }
        } catch (e) {
            console.error('Update photo failed:', e);
        }
    };

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

    // 提交饕客心得點評
    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setSubmittingComment(true);

        const commentPayload = {
            ownerId: user?._id || 'guest_' + Date.now(),
            ownerName: user?.username || (isEn ? 'Foodie Traveler' : '熱心饕客'),
            shop: food.foodName || '夜市美食',
            comment: `【評分: ${commentScore}★】${newComment.trim()}`,
            date: new Date()
        };

        try {
            const res = await helper.helper.AsyncCommentCreate(commentPayload);
            if (res && res.status === 'success') {
                setComments([res.comment, ...comments]);
                setNewComment('');
            }
        } catch (err) {
            console.error('Failed to submit comment:', err);
        } finally {
            setSubmittingComment(false);
        }
    };

    // 辨識飲食偏好標籤
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
    const foodComments = comments.filter(c => c.shop && (c.shop.includes(food.foodName) || (food.foodName && food.foodName.includes(c.shop))));

    return (
        <Box sx={{ pb: 8, maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 } }}>
            {/* 頂部導航按鈕列 */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                <Button
                    href="/Food"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#B91C1C', fontWeight: 700, fontSize: '0.95rem' }}
                >
                    {isEn ? 'Back to Food Directory' : '返回美食探索清單'}
                </Button>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    {/* 一鍵聯網深度補全按鈕 */}
                    <Button
                        variant="outlined"
                        disabled={enriching}
                        onClick={handleEnrichOnline}
                        startIcon={enriching ? <CircularProgress size={16} /> : <AutoAwesomeIcon sx={{ color: '#D97706' }} />}
                        sx={{
                            borderRadius: 3,
                            fontWeight: 700,
                            borderColor: '#D97706',
                            color: '#92400E',
                            bgcolor: '#FFFBEB',
                            '&:hover': { bgcolor: '#FEF3C7', borderColor: '#B45309' }
                        }}
                    >
                        {enriching
                            ? (isEn ? 'Fetching online data...' : '聯網擷取數據中...')
                            : (isEn ? 'Enrich Online Data' : '🌐 聯網獲取深度美食資料')}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => setImagePickerOpen(true)}
                        startIcon={<AutoAwesomeIcon sx={{ color: '#2563EB' }} />}
                        sx={{
                            borderRadius: 3,
                            fontWeight: 700,
                            borderColor: '#93C5FD',
                            color: '#1D4ED8',
                            bgcolor: '#EFF6FF',
                            '&:hover': { bgcolor: '#DBEAFE', borderColor: '#3B82F6' }
                        }}
                    >
                        {isEn ? 'Choose Online Photo' : '📷 挑選網路高清照片'}
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
                        {inWishlist ? (isEn ? 'Saved in Wishlist' : '已收藏') : (isEn ? 'Add to Wishlist' : '收藏口袋清單')}
                    </Button>
                </Box>
            </Box>

            {enrichMsg && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
                    {enrichMsg}
                </Alert>
            )}

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
                    {/* 左側照片與標籤 */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                            <img
                                src={food.foodIcon || 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800'}
                                alt={food.foodName || '美食相片'}
                                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800';
                                }}
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

                            {/* 熱量標記 */}
                            {food.calories && (
                                <Box sx={{ position: 'absolute', top: 14, right: 14 }}>
                                    <Chip
                                        icon={<LocalFireDepartmentIcon sx={{ color: '#DC2626 !important' }} />}
                                        label={`${food.calories} kcal`}
                                        sx={{
                                            bgcolor: 'rgba(255,255,255,0.92)',
                                            color: '#DC2626',
                                            fontWeight: 800,
                                            border: '1px solid #FECACA'
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    {/* 右側詳細資訊 */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                            <Typography
                                variant="h4"
                                sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#1C1917' }}
                            >
                                {food.foodName || (isEn ? 'Signature Street Delicacy' : '必吃夜市美食')}
                            </Typography>
                            {food.onlineEnriched && (
                                <Chip
                                    size="small"
                                    icon={<AutoAwesomeIcon sx={{ fontSize: '0.9rem !important' }} />}
                                    label={isEn ? "Web Enriched" : "大數據認證"}
                                    sx={{ bgcolor: '#FEF3C7', color: '#92400E', fontWeight: 800 }}
                                />
                            )}
                        </Box>

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
                            {Array.isArray(food.tags) && food.tags.map((tg, i) => (
                                <Chip
                                    key={`tg-${i}`}
                                    label={`# ${tg}`}
                                    sx={{ bgcolor: '#FFFBEB', color: '#92400E', fontWeight: 700, border: '1px solid #FDE68A' }}
                                />
                            ))}
                            <Chip
                                icon={<VerifiedIcon sx={{ fontSize: '1rem !important', color: '#D97706' }} />}
                                label={isEn ? "Night Market Must-Eat" : "夜市必吃人氣王"}
                                sx={{ bgcolor: '#FEF2F2', color: '#991B1B', fontWeight: 800, border: '1px solid #FECACA' }}
                            />
                        </Box>

                        <Typography variant="body1" sx={{ color: '#57534E', lineHeight: 1.8, mb: 3, fontSize: '1rem' }}>
                            {food.foodInfo || '經典台灣道地夜市小吃，傳承獨門配方與現點現做的美味口感。'}
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

            {/* 🌟 深度美食特質維度專區 (Culinary Deep Dive Grid) */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
                {/* 1. 在地飲食文化與傳承故事 */}
                <Grid item xs={12} md={7}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            borderRadius: '20px',
                            backgroundColor: '#FAF8F5',
                            border: '1px solid #EAE5DD',
                            height: '100%',
                            position: 'relative'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <MenuBookIcon sx={{ color: '#B91C1C' }} />
                            <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: '#1C1917' }}>
                                {isEn ? 'Cultural Story & Heritage' : '在地文化淵源與歷史小故事'}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#44403C', lineHeight: 1.9, fontSize: '0.98rem' }}>
                            {food.culturalStory || `${food.foodName} 為台灣夜市歷久彌新的靈魂代表作，攤商嚴選每日市場直送鮮食，傳承數十年老師傅獨門手藝，不論熱火煎烤或慢火燉煮，都是世代台灣人共同的暖胃記憶。`}
                        </Typography>

                        {food.cookingMethod && (
                            <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed #D6D3D1' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#B91C1C', mb: 0.5, display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                    <RestaurantIcon sx={{ fontSize: 18 }} /> {isEn ? 'Cooking Craftsmanship' : '料理匠心工法'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.7 }}>
                                    {food.cookingMethod}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* 2. 熱量與四大營養素指標 */}
                <Grid item xs={12} md={5}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            borderRadius: '20px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #EAE5DD',
                            height: '100%'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalFireDepartmentIcon sx={{ color: '#DC2626' }} />
                                <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: '#1C1917' }}>
                                    {isEn ? 'Nutrition Estimates' : '熱量與營養素估算'}
                                </Typography>
                            </Box>
                            <Chip
                                label={`約 ${food.calories || 350} kcal`}
                                sx={{ bgcolor: '#FEF2F2', color: '#DC2626', fontWeight: 800 }}
                            />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2.5 }}>
                            <Grid item xs={6}>
                                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                                        {isEn ? 'Protein' : '蛋白質'}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
                                        {food.nutrition?.protein || '18g'}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                                        {isEn ? 'Total Fat' : '脂肪含量'}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
                                        {food.nutrition?.fat || '14g'}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                                        {isEn ? 'Carbs' : '碳水化合物'}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
                                        {food.nutrition?.carbs || '42g'}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F8FAFC', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                                        {isEn ? 'Sodium' : '鈉含量'}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
                                        {food.nutrition?.sodium || '480mg'}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Typography variant="caption" sx={{ color: '#78716C', display: 'block', textAlign: 'center' }}>
                            ℹ️ {isEn ? 'Values estimated from standard Taiwan night market recipes.' : '依夜市標準配方估算，各攤商調味與份量可能略有增減。'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* 3. 口感特色與美味絕配 */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '20px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #EAE5DD',
                            height: '100%'
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1C1917', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                            👅 {isEn ? 'Taste & Texture Profile' : '口感風味輪廓'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#44403C', lineHeight: 1.8, mb: 2 }}>
                            {food.texture || '外酥內嫩、香氣撲鼻、鹹甜平衡，現點現做散發濃郁火候香氣。'}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#059669', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            🍹 {isEn ? 'Best Food & Drink Pairing' : '老饕推薦絕配吃法'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.7 }}>
                            {food.bestPairing || '建議搭配一杯冰涼冬瓜檸檬或四季春無糖青茶，酸甜解膩、爽快加倍！'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* 4. 食材原料與過敏原安全警示 */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '20px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #EAE5DD',
                            height: '100%'
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1C1917', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                            🥗 {isEn ? 'Primary Ingredients' : '主要食材與配方'}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
                            {Array.isArray(food.ingredients) && food.ingredients.length > 0 ? (
                                food.ingredients.map((ing, i) => (
                                    <Chip
                                        key={`ing-${i}`}
                                        label={ing}
                                        sx={{ bgcolor: '#F5F5F4', color: '#292524', fontWeight: 600 }}
                                    />
                                ))
                            ) : (
                                <Typography variant="body2" sx={{ color: '#78716C' }}>
                                    產地直送鮮食材、特調香料、純釀醬汁
                                </Typography>
                            )}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#DC2626', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <WarningAmberIcon sx={{ fontSize: 20 }} /> {isEn ? 'Allergen Advisory' : '過敏原安全提醒'}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {Array.isArray(food.allergens) && food.allergens.length > 0 ? (
                                food.allergens.map((alg, i) => (
                                    <Chip
                                        key={`alg-${i}`}
                                        label={`⚠️ ${alg}`}
                                        sx={{ bgcolor: '#FEF2F2', color: '#991B1B', fontWeight: 700, border: '1px solid #FECACA' }}
                                    />
                                ))
                            ) : (
                                <Chip
                                    label="無特殊易過敏成分標示"
                                    sx={{ bgcolor: '#F0FDF4', color: '#166534', fontWeight: 600 }}
                                />
                            )}
                            <Chip
                                label={`夜市行情: ${food.priceRange || 'NT$ 50 - 90'}`}
                                sx={{ bgcolor: '#FEF3C7', color: '#92400E', fontWeight: 700 }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* 推薦提供此小吃的知名名店與攤位 */}
            <Box sx={{ mb: 6 }}>
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

            {/* 💬 饕客即時真實點評與心得交流專區 (Live Foodie Reviews) */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: '24px',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #EAE5DD'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <RateReviewIcon sx={{ color: '#B91C1C', fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: '#1C1917' }}>
                        {isEn ? 'Foodie Reviews & Comments' : '饕客真實點評與心得'}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#78716C', mb: 3 }}>
                    {isEn ? 'Have you tasted this street delicacy? Share your flavor impressions with the community!' : '您也品嚐過這道夜市美味嗎？歡迎寫下您的口感評價與推薦攤位！'}
                </Typography>

                {/* 發表評價輸入框 */}
                <Box component="form" onSubmit={handleAddReview} sx={{ mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#57534E', display: 'block', mb: 0.5 }}>
                                {isEn ? 'Your Rating' : '給予星級評分'}
                            </Typography>
                            <Rating
                                value={commentScore}
                                onChange={(e, val) => setCommentScore(val || 5)}
                                sx={{ color: '#FBBF24' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder={isEn ? 'Write your flavor review (e.g. Crispy, flavorful sauce...)' : '分享您的品嚐心得 (例如：外皮超級酥脆、醬汁很開胃...)'}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                sx={{ bgcolor: '#FFFFFF', borderRadius: '10px' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={submittingComment || !newComment.trim()}
                                startIcon={submittingComment ? <CircularProgress size={16} /> : <SendIcon />}
                                sx={{ bgcolor: '#B91C1C', fontWeight: 800, py: 1, '&:hover': { bgcolor: '#991B1B' } }}
                            >
                                {isEn ? 'Post' : '發表評論'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* 評論列表 */}
                <Stack spacing={2}>
                    {foodComments.length > 0 ? (
                        foodComments.slice(0, 5).map((cmt, idx) => (
                            <Box
                                key={cmt._id || idx}
                                sx={{
                                    p: 2.5,
                                    borderRadius: '16px',
                                    bgcolor: '#FFFFFF',
                                    border: '1px solid #EAE5DD'
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                        👤 {cmt.ownerName || '匿名饕客'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#A8A29E' }}>
                                        {cmt.date ? new Date(cmt.date).toLocaleDateString() : '近期發表'}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#44403C', lineHeight: 1.6 }}>
                                    {cmt.comment}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#FFFFFF', borderRadius: '16px', border: '1px dashed #D6D3D1' }}>
                            <Typography variant="body2" sx={{ color: '#78716C' }}>
                                🏮 {isEn ? 'No foodie comments yet. Be the first to review!' : '目前尚無點評，快成為第一個分享心得的夜市探險家吧！'}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Paper>

            {/* 網路高清照片挑選彈窗 */}
            <ImagePickerDialog
                open={imagePickerOpen}
                onClose={() => setImagePickerOpen(false)}
                type="food"
                initialQuery={food.foodName || '夜市小吃'}
                title={isEn ? '🌐 Choose High-Res Food Photo' : '🌐 挑選網路高清特色美食照片'}
                onSelect={handleSelectPhoto}
            />
        </Box>
    );
}
