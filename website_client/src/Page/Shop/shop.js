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
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigationIcon from '@mui/icons-material/Navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShareIcon from '@mui/icons-material/Share';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';
import { useWishlist } from '../../Context/WishlistContext';

export default function ShopPage() {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const { toggleWishlist, isInWishlist } = useWishlist();

    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const shopId = localStorage.getItem('shopId');

    const [shop, setShop] = useState({});
    const [foods, setFoods] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function loadShopData() {
            if (!shopId) return;
            try {
                const sRes = await helper.helper.AsyncShopOne(shopId);
                if (sRes && sRes.shop) {
                    setShop(sRes.shop);
                }

                const fRes = await helper.helper.AsyncFood();
                if (fRes && fRes.food) {
                    setFoods(fRes.food);
                }

                const cRes = await helper.helper.AsyncComments();
                if (cRes && Array.isArray(cRes.comment)) {
                    setCommentList(cRes.comment);
                }
            } catch (err) {
                console.error('Failed to load shop details:', err);
            }
        }
        loadShopData();
    }, [shopId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        if (!user) {
            alert(isEn ? 'Please sign in before posting a review!' : '請先登入後再發表評論！');
            window.location.href = '/signin';
            return;
        }

        setSubmitting(true);
        try {
            const newComment = {
                ownerId: user._id || 'anonymous',
                ownerName: user.username || (isEn ? 'Night Market Foodie' : '夜市食客'),
                shop: shopId,
                comment: commentText.trim(),
                date: new Date()
            };
            const res = await helper.helper.AsyncCommentCreate(newComment);
            if (res && res.status === 'success') {
                setCommentList([res.comment, ...commentList]);
                setCommentText('');
            }
        } catch (err) {
            console.error('Failed to post comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoToFood = (id) => {
        localStorage.setItem('foodId', id);
        window.location.href = '/foodInfo';
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: shop.shopName,
                text: `${shop.shopName} - ${shop.shopYeShi || '台灣經典夜市名店'}`,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // 辨識飲食偏好標籤 (針對外國旅客與特殊飲食需求)
    const getDietaryTag = (item) => {
        const name = (item.foodName || '').toLowerCase();
        if (name.includes('地瓜球') || name.includes('豆花') || name.includes('果汁') || name.includes('奶茶') || name.includes('黑糖') || name.includes('雪花冰') || name.includes('杏仁')) {
            return { label: isEn ? '🌱 Veg-Friendly' : '🌱 蔬食友善', bg: '#F0FDF4', color: '#166534', border: '#bbf7d0' };
        }
        if (name.includes('香腸') || name.includes('肉圓') || name.includes('大腸') || name.includes('滷肉') || name.includes('排骨')) {
            return { label: isEn ? '🐷 Taiwan Pork' : '🐷 嚴選豬肉', bg: '#FEF2F2', color: '#991B1B', border: '#fecaca' };
        }
        if (name.includes('雞排') || name.includes('鹽酥雞') || name.includes('鹹酥雞')) {
            return { label: isEn ? '🐔 Fresh Chicken' : '🐔 鮮嫩雞肉', bg: '#FFFBEB', color: '#92400E', border: '#fde68a' };
        }
        if (name.includes('蚵仔') || name.includes('海鮮') || name.includes('花枝') || name.includes('魷魚') || name.includes('蝦')) {
            return { label: isEn ? '🦐 Fresh Seafood' : '🦐 港口直送海鮮', bg: '#F0F9FF', color: '#075985', border: '#bae6fd' };
        }
        return { label: isEn ? '⭐ Iconic Recipe' : '⭐ 經典手作', bg: '#FAF8F5', color: '#78350F', border: '#EAE5DD' };
    };

    // 取得該店家的專屬菜單
    const shopFoods = foods.filter((f) => {
        if (!shop.food || !Array.isArray(shop.food)) return false;
        return shop.food.some((sf) => sf.foodName === f.foodName);
    });

    // 取得此店家的評論
    const shopComments = commentList.filter((c) => c.shop === shopId);

    const displayName = (isEn && shop.shopNameEN) ? shop.shopNameEN : (shop.shopName || (isEn ? 'Night Market Stall' : '店家名稱'));
    const displayIntro = (isEn && shop.shopIntroductionEN) 
        ? shop.shopIntroductionEN 
        : (shop.shopIntroduction || shop.shopShortIntroduction || (isEn ? 'Freshly made with authentic Taiwanese recipe, popular local favorite.' : '嚴選食材現點現做，台灣傳統古早味，熱門排隊名攤。'));

    const googleMapsUrl = shop.googlePlaceUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((shop.shopName || '') + ' ' + (shop.shopYeShi || ''))}`;

    return (
        <Box sx={{ pb: 6 }}>
            {/* 導航回夜市按鈕 */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    href="/nightmarket"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#C62828', fontWeight: 700 }}
                >
                    {isEn ? 'Back to Night Market' : '返回夜市'}
                </Button>

                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ShareIcon />}
                    onClick={handleShare}
                    sx={{
                        borderColor: '#EAE5DD',
                        color: '#78716C',
                        borderRadius: '20px',
                        textTransform: 'none',
                        '&:hover': { borderColor: '#B91C1C', color: '#B91C1C' }
                    }}
                >
                    {copied ? (isEn ? 'Copied Link!' : '已複製連結！') : (isEn ? 'Share Stall' : '分享此攤')}
                </Button>
            </Box>

            {/* 店家主資訊卡 */}
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
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                            <img
                                src={shop.shopIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'}
                                alt={displayName}
                                style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
                            />
                            {shop.shopNumber && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        backgroundColor: '#C62828',
                                        color: '#FFF',
                                        px: 1.5,
                                        py: 0.4,
                                        borderRadius: '6px',
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    {isEn ? `Stall No.: ${shop.shopNumber}` : `攤位編號：${shop.shopNumber}`}
                                </Box>
                            )}

                            {/* Google 評分標籤 */}
                            {shop.googleRating > 0 && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 12,
                                        left: 12,
                                        backgroundColor: 'rgba(28, 25, 23, 0.85)',
                                        backdropFilter: 'blur(4px)',
                                        color: '#FBBF24',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: '8px',
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    ★ {shop.googleRating.toFixed(1)}
                                    <span style={{ color: '#EAE5DD', fontWeight: 500, fontSize: '0.75rem' }}>
                                        ({shop.googleReviewCount || 0}+ {isEn ? 'Google reviews' : 'Google 評論'})
                                    </span>
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <span style={{ fontSize: '1.8rem' }}>🏬</span>
                            <Typography variant="h4" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#2C2622' }}>
                                {displayName}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {shop.shopYeShi && (
                                <Chip label={`🏮 ${shop.shopYeShi}`} sx={{ backgroundColor: '#FFECB3', color: '#8E1800', fontWeight: 800 }} />
                            )}
                            {shop.shopType && (
                                <Chip label={shop.shopType} sx={{ backgroundColor: '#FBE9E7', color: '#C62828', fontWeight: 700 }} />
                            )}
                            <Chip 
                                icon={<VerifiedIcon sx={{ fontSize: '1rem !important', color: '#16A34A !important' }} />}
                                label={isEn ? 'Authentic Stall' : '認證真實名攤'}
                                sx={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 700 }} 
                            />
                        </Box>

                        {shop.shopLocation && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#E65100', fontWeight: 700, mb: 2 }}>
                                <LocationOnIcon fontSize="small" />
                                <Typography variant="body2">{shop.shopLocation}</Typography>
                            </Box>
                        )}

                        <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 2.5 }}>
                            {displayIntro}
                        </Typography>

                        {/* 支付方式導引 (針對外地與國際觀光客) */}
                        <Box sx={{ mb: 2.5, p: 1.5, backgroundColor: '#FAF8F5', borderRadius: '10px', border: '1px solid #EAE5DD', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#78716C', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PaymentsIcon fontSize="inherit" />
                                {isEn ? 'Payment Methods:' : '支援支付：'}
                            </Typography>
                            <Chip size="small" label="LINE Pay" sx={{ bgcolor: '#00C300', color: '#FFF', fontWeight: 700, height: 22 }} />
                            <Chip size="small" label="街口支付" sx={{ bgcolor: '#DA251D', color: '#FFF', fontWeight: 700, height: 22 }} />
                            <Chip size="small" label={isEn ? 'Cash Only/OK' : '現金支援'} sx={{ bgcolor: '#E5E7EB', color: '#374151', fontWeight: 700, height: 22 }} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#666' }}>
                                    {isEn ? 'Stall Rating:' : '攤位評分：'}
                                </Typography>
                                <Rating value={Number(shop.rating) || 4.8} precision={0.1} readOnly />
                                <Typography variant="body2" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    ({shop.rating || 4.8})
                                </Typography>
                            </Box>

                            {/* Google Maps 直達導航按鈕 */}
                            <Button
                                variant="contained"
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<NavigationIcon />}
                                sx={{
                                    backgroundColor: '#1E40AF',
                                    color: '#FFF',
                                    fontWeight: 800,
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    px: 2.5,
                                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)',
                                    '&:hover': { backgroundColor: '#1D4ED8' }
                                }}
                            >
                                {isEn ? 'Google Maps Navigation' : 'Google Maps 路線導航'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* 本店招牌菜單 */}
            <Box sx={{ mb: 5 }}>
                <Box className="tw-section-header">
                    <Typography className="tw-section-title">
                        <span>🍢</span> {isEn ? 'Stall Delicacies & Signature Menu' : '本店精選招牌菜單'}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {(shopFoods.length > 0 ? shopFoods : foods.slice(0, 3)).map((fItem, fIdx) => {
                        const foodDiet = getDietaryTag(fItem);
                        const isFav = fItem._id ? isInWishlist(fItem._id) : false;

                        return (
                            <Grid item xs={12} sm={6} md={4} key={fItem._id || fIdx}>
                                <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                    {/* 收藏按鈕 */}
                                    <Tooltip title={isFav ? (isEn ? 'Remove from Wishlist' : '從願望清單移除') : (isEn ? 'Add to Wishlist' : '加入願望清單')}>
                                        <IconButton
                                            onClick={() => fItem._id && toggleWishlist(fItem._id)}
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                backdropFilter: 'blur(4px)',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                zIndex: 2,
                                                '&:hover': { backgroundColor: '#FFF' }
                                            }}
                                        >
                                            {isFav ? <FavoriteIcon sx={{ color: '#E11D48', fontSize: '1.2rem' }} /> : <FavoriteBorderIcon sx={{ color: '#78716C', fontSize: '1.2rem' }} />}
                                        </IconButton>
                                    </Tooltip>

                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={fItem.foodIcon || 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600'}
                                        alt={fItem.foodName}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                        <Box sx={{ mb: 1 }}>
                                            <Chip
                                                label={foodDiet.label}
                                                size="small"
                                                sx={{
                                                    backgroundColor: foodDiet.bg,
                                                    color: foodDiet.color,
                                                    border: `1px solid ${foodDiet.border}`,
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    height: 22,
                                                    mb: 0.8
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                                {fItem.foodName}
                                            </Typography>
                                            <Typography variant="h6" className="tw-price">
                                                NT$ {fItem.foodPrice || 60}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                                            {(isEn && fItem.foodInfoEN) ? fItem.foodInfoEN : (fItem.foodInfo || (isEn ? 'Freshly made classic street snack!' : '現點現做，經典熱銷！'))}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            fullWidth
                                            className="tw-btn-primary"
                                            onClick={() => handleGoToFood(fItem._id)}
                                        >
                                            {isEn ? 'View Dish Details 🥢' : '查看菜色詳情 🥢'}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            {/* 遊客食記與評論專區 */}
            <Box>
                <Box className="tw-section-header">
                    <Typography className="tw-section-title">
                        <span>💬</span> {isEn ? 'Visitor Reviews & Local Ratings' : '食客心得與即時評價'}
                    </Typography>
                </Box>

                {/* 填寫評論框 */}
                <Paper
                    component="form"
                    onSubmit={handleCommentSubmit}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: '16px',
                        backgroundColor: '#FFF',
                        border: '1px solid #EFE5D8',
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2C2622', mb: 1 }}>
                        {isEn ? 'Leave your foodie review:' : '留下您的品嚐心得：'}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder={user ? (isEn ? `Share your dining experience as ${user.username || 'Foodie'}...` : `以 ${user.username || '會員'} 身份分享這家店的味道如何...`) : (isEn ? 'Please sign in to leave a review...' : '請登入後發表食記與心得...')}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={!user}
                        sx={{
                            mb: 2,
                            backgroundColor: '#FAF7F2',
                            borderRadius: '8px',
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {user ? (
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<SendIcon />}
                                disabled={submitting || !commentText.trim()}
                                sx={{
                                    backgroundColor: '#C62828',
                                    fontWeight: 800,
                                    borderRadius: '8px',
                                    '&:hover': { backgroundColor: '#A71D1D' }
                                }}
                            >
                                {isEn ? 'Post Review' : '發佈評價'}
                            </Button>
                        ) : (
                            <Button
                                href="/signin"
                                variant="contained"
                                sx={{ backgroundColor: '#C62828', fontWeight: 800 }}
                            >
                                {isEn ? 'Sign in to Review' : '登入後發表評價'}
                            </Button>
                        )}
                    </Box>
                </Paper>

                {/* 評論列表 */}
                {shopComments.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {shopComments.map((item, idx) => (
                            <Paper
                                key={item._id || idx}
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    borderRadius: '12px',
                                    backgroundColor: '#FFF',
                                    border: '1px solid #F0E6D8',
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar sx={{ bgcolor: '#FF8F00', width: 32, height: 32, fontSize: '0.85rem', fontWeight: 800 }}>
                                            {(item.ownerName || '客').charAt(0)}
                                        </Avatar>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                            {item.ownerName || (isEn ? 'Foodie Traveler' : '熱情食客')}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ color: '#999' }}>
                                        {item.date ? String(item.date).substr(0, 10) : ''}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.7, pl: 5 }}>
                                    {item.comment}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                ) : (
                    <Typography sx={{ color: '#888', textAlign: 'center', py: 3 }}>
                        {isEn ? 'No reviews yet. Be the first foodie to share your experience!' : '目前尚無評論，快來成為第一個分享心得的饕客吧！'}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}