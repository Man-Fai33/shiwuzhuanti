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

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import helper from '../Helper/helper';

export default function ShopPage() {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const shopId = localStorage.getItem('shopId');

    const [shop, setShop] = useState({});
    const [foods, setFoods] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [submitting, setSubmitting] = useState(false);

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
            alert('請先登入後再發表評論！');
            window.location.href = '/signin';
            return;
        }

        setSubmitting(true);
        try {
            const newComment = {
                ownerId: user._id || 'anonymous',
                ownerName: user.username || '夜市食客',
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

    // 取得該店家的專屬菜單
    const shopFoods = foods.filter((f) => {
        if (!shop.food || !Array.isArray(shop.food)) return false;
        return shop.food.some((sf) => sf.foodName === f.foodName);
    });

    // 取得此店家的評論
    const shopComments = commentList.filter((c) => c.shop === shopId);

    return (
        <Box sx={{ pb: 6 }}>
            {/* 返回按鈕 */}
            <Box sx={{ mb: 2 }}>
                <Button
                    href="/nightmarket"
                    startIcon={<ArrowBackIcon />}
                    sx={{ color: '#C62828', fontWeight: 700 }}
                >
                    返回夜市
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
                                alt={shop.shopName || '攤位照片'}
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
                                    攤位編號：{shop.shopNumber}
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <span style={{ fontSize: '1.8rem' }}>🏬</span>
                            <Typography variant="h4" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#2C2622' }}>
                                {shop.shopName || '店家名稱'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {shop.shopYeShi && (
                                <Chip label={`🏮 ${shop.shopYeShi}`} sx={{ backgroundColor: '#FFECB3', color: '#8E1800', fontWeight: 800 }} />
                            )}
                            {shop.shopType && (
                                <Chip label={shop.shopType} sx={{ backgroundColor: '#FBE9E7', color: '#C62828', fontWeight: 700 }} />
                            )}
                        </Box>

                        {shop.shopLocation && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#E65100', fontWeight: 700, mb: 2 }}>
                                <LocationOnIcon fontSize="small" />
                                <Typography variant="body2">{shop.shopLocation}</Typography>
                            </Box>
                        )}

                        <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 2.5 }}>
                            {shop.shopIntroduction || shop.shopShortIntroduction || '嚴選食材現點現做，台灣傳統古早味，熱門排隊名攤。'}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#666' }}>
                                攤位評分：
                            </Typography>
                            <Rating value={Number(shop.rating) || 4.8} precision={0.1} readOnly />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#C62828' }}>
                                ({shop.rating || 4.8})
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* 本店招牌菜單 */}
            <Box sx={{ mb: 5 }}>
                <Box className="tw-section-header">
                    <Typography className="tw-section-title">
                        <span>🍢</span> 本店精選菜單
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {(shopFoods.length > 0 ? shopFoods : foods.slice(0, 3)).map((fItem, fIdx) => (
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
                                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                                        {fItem.foodInfo || '現點現做，經典熱銷！'}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        className="tw-btn-primary"
                                        onClick={() => handleGoToFood(fItem._id)}
                                    >
                                        查看菜色 🥢
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* 遊客食記與評論專區 */}
            <Box>
                <Box className="tw-section-header">
                    <Typography className="tw-section-title">
                        <span>💬</span> 食客心得與即時評價
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
                        留下您的品嚐心得：
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder={user ? `以 ${user.username || '會員'} 身份分享這家店的味道如何...` : '請登入後發表食記與心得...'}
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
                                發佈評價
                            </Button>
                        ) : (
                            <Button
                                href="/signin"
                                variant="contained"
                                sx={{ backgroundColor: '#C62828', fontWeight: 800 }}
                            >
                                登入後發表評價
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
                                            {item.ownerName || '熱情食客'}
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
                        目前尚無評論，快來成為第一個分享心得的饕客吧！
                    </Typography>
                )}
            </Box>
        </Box>
    );
}