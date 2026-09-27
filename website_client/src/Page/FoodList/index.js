import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';
import { useWishlist } from '../../Context/WishlistContext';
import AdBanner from '../../Compnonet/AdBanner';

export default function FoodList() {
    const { lang, t } = useLanguage();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [foodList, setFoodList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        async function loadFoods() {
            try {
                const res = await helper.helper.AsyncFood();
                if (res && res.status === 'success' && Array.isArray(res.food)) {
                    setFoodList(res.food);
                }
            } catch (err) {
                console.error('Failed to load food list:', err);
            }
        }
        loadFoods();
    }, []);

    const handleSelectFood = (id) => {
        localStorage.setItem('foodId', id);
        window.location.href = '/foodInfo';
    };

    const categories = [
        { id: 'all', label: lang === 'en' ? 'All Delicacies' : '全部美食' },
        { id: '炸物', label: lang === 'en' ? 'Crispy Fried' : '酥脆炸物' },
        { id: '烤物', label: lang === 'en' ? 'Charcoal Grilled' : '炭烤串燒' },
        { id: '飲品', label: lang === 'en' ? 'Drinks & Tea' : '清涼茶飲' },
        { id: '素食', label: lang === 'en' ? 'Vegetarian' : '蔬食奶素' },
        { id: '人氣必吃', label: lang === 'en' ? 'Chef Picks' : '老饕推薦' },
    ];

    const getDietaryTag = (item) => {
        const name = (item.foodName || '').toLowerCase();
        if (name.includes('地瓜球') || name.includes('豆花') || name.includes('果汁') || name.includes('奶茶') || name.includes('黑糖')) {
            return { label: lang === 'en' ? 'Vegetarian' : '蔬食友善', bg: '#F0FDF4', color: '#166534' };
        }
        if (name.includes('香腸') || name.includes('肉圓') || name.includes('大腸') || name.includes('滷肉')) {
            return { label: lang === 'en' ? 'Taiwan Pork' : '台灣豬肉', bg: '#FEF2F2', color: '#991B1B' };
        }
        if (name.includes('雞排') || name.includes('鹽酥雞')) {
            return { label: lang === 'en' ? 'Poultry' : '雞肉料理', bg: '#FFFBEB', color: '#92400E' };
        }
        if (name.includes('蚵仔') || name.includes('海鮮') || name.includes('花枝') || name.includes('魷魚')) {
            return { label: lang === 'en' ? 'Seafood' : '海鮮水產', bg: '#F0F9FF', color: '#075985' };
        }
        return null;
    };

    const filteredFoods = foodList.filter((item) => {
        let matchesCategory = true;
        if (selectedCategory !== 'all') {
            if (selectedCategory === '素食') {
                const name = item.foodName || '';
                matchesCategory = name.includes('地瓜球') || name.includes('豆花') || name.includes('果汁') || name.includes('奶茶') || name.includes('黑糖');
            } else {
                const types = item.foodType || [];
                matchesCategory = types.some((t) => t.includes(selectedCategory)) ||
                    (item.foodName && item.foodName.includes(selectedCategory)) ||
                    (item.foodInfo && item.foodInfo.includes(selectedCategory));
            }
        }

        let matchesSearch = true;
        if (searchText.trim()) {
            const kw = searchText.trim().toLowerCase();
            const name = (item.foodName || '').toLowerCase();
            const info = (item.foodInfo || '').toLowerCase();
            const infoEn = (item.foodInfoEN || '').toLowerCase();
            matchesSearch = name.includes(kw) || info.includes(kw) || infoEn.includes(kw);
        }

        return matchesCategory && matchesSearch;
    });

    return (
        <Box sx={{ pb: 6 }}>
            {/* 頁面標題 */}
            <Box sx={{ mb: 3.5, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                    variant="caption"
                    sx={{
                        display: 'inline-block',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--tw-terracotta, #B91C1C)',
                        mb: 0.5,
                    }}
                >
                    {lang === 'en' ? 'Taiwan Street Food Culinary Guide' : '道地街頭美食指南'}
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 800,
                        color: 'var(--tw-deep-charcoal, #1C1917)',
                        fontSize: { xs: '1.75rem', sm: '2.2rem' },
                        mb: 1,
                    }}
                >
                    {t('foods_page_title')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--tw-text-muted, #78716C)', maxWidth: 720 }}>
                    {t('foods_page_desc')}
                </Typography>
            </Box>

            {/* 旅人美食小抄貼士 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 2.5 },
                    mb: 3.5,
                    borderRadius: '16px',
                    backgroundColor: 'var(--tw-card-white, #FFFFFF)',
                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                    boxShadow: '0 2px 10px rgba(28, 25, 23, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Box sx={{ maxWidth: 780 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 0.3 }}>
                        {lang === 'en' ? 'Traveler Tip: Ordering & Customization Etiquette' : '旅人點餐秘笈：冰塊甜度與客製化'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', lineHeight: 1.5, fontSize: '0.88rem' }}>
                        {lang === 'en'
                            ? 'Customize boba tea like a local: "Less Ice, Half Sugar" (微糖微冰). Not a fan of coriander/cilantro? Simply say "不要香菜" (bù yào xiāng cài)!'
                            : '手搖茶飲在地人常點「微糖微冰」；若不喜香菜可在點餐時告知「不要香菜」；炸物亦可指定「小辣」或「胡椒多」！'}
                    </Typography>
                </Box>
                <Button
                    href="/guide"
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: 'var(--tw-border-subtle, #EAE5DD)',
                        color: 'var(--tw-deep-charcoal, #1C1917)',
                        fontWeight: 700,
                        borderRadius: '20px',
                        px: 2.5,
                        py: 0.7,
                        textTransform: 'none',
                        '&:hover': {
                            borderColor: 'var(--tw-terracotta, #B91C1C)',
                            backgroundColor: '#FEF2F2',
                            color: 'var(--tw-terracotta, #B91C1C)',
                        }
                    }}
                >
                    {lang === 'en' ? 'Ordering Phrases →' : '常用點餐小抄 →'}
                </Button>
            </Paper>

            {/* 特色手搖與在地品牌贊助席位 (Food & Drink Pairing Promo) */}
            <AdBanner
                slotId="foodlist-beverage-strip"
                variant="strip"
                title={lang === 'en' ? '🧋 Foodie Drink Pairing: Chilled Taiwanese fruit tea & alpine oolong pairing tips' : '🧋 在地好味解膩推薦：吃雞排串燒的最佳拍檔！精選高山冷泡烏龍與鮮榨冬瓜檸檬'}
                ctaText={lang === 'en' ? 'Sponsor Picks →' : '合作品牌推薦 →'}
                linkUrl="/feedback"
            />

            {/* 篩選與搜尋工具列 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 2.5 },
                    mb: 4,
                    borderRadius: '16px',
                    backgroundColor: 'var(--tw-card-white, #FFFFFF)',
                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                    boxShadow: '0 2px 10px rgba(28, 25, 23, 0.03)',
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} lg={8}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {categories.map((c) => {
                                const isActive = selectedCategory === c.id;
                                return (
                                    <Chip
                                        key={c.id}
                                        label={c.label}
                                        clickable
                                        onClick={() => setSelectedCategory(c.id)}
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            height: '34px',
                                            px: 0.8,
                                            borderRadius: '18px',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.2s ease',
                                            backgroundColor: isActive ? 'var(--tw-terracotta, #B91C1C)' : 'var(--tw-paper-cream, #FAF8F5)',
                                            color: isActive ? '#FFF' : 'var(--tw-deep-charcoal, #1C1917)',
                                            border: isActive ? '1px solid var(--tw-terracotta, #B91C1C)' : '1px solid var(--tw-border-subtle, #EAE5DD)',
                                            '&:hover': {
                                                backgroundColor: isActive ? '#991B1B' : '#F2EDE4',
                                            },
                                        }}
                                    />
                                );
                            })}
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={lang === 'en' ? 'Search food by name or ingredient...' : '搜尋小吃名稱、食材關鍵字...'}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'var(--tw-text-muted, #78716C)' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: searchText && (
                                    <InputAdornment position="end">
                                        <Button
                                            size="small"
                                            onClick={() => setSearchText('')}
                                            sx={{ minWidth: 'auto', p: 0.5, color: '#999' }}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </Button>
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '24px',
                                    backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                    fontSize: '0.9rem',
                                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                    '& fieldset': { border: 'none' },
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* 美食卡片網格 */}
            {filteredFoods.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredFoods.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item._id}>
                            <Card
                                className="tw-card"
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleSelectFood(item._id)}
                            >
                                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.foodIcon || 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600'}
                                        alt={item.foodName}
                                        sx={{
                                            objectFit: 'cover',
                                            transition: 'transform 0.4s ease',
                                            '&:hover': { transform: 'scale(1.05)' },
                                        }}
                                    />
                                    {/* 價格標籤與外幣估算 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 10,
                                            right: 10,
                                            backgroundColor: 'rgba(28, 25, 23, 0.78)',
                                            backdropFilter: 'blur(8px)',
                                            color: '#FFF',
                                            px: 1.2,
                                            py: 0.4,
                                            borderRadius: '20px',
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                            border: '1px solid rgba(255,255,255,0.12)',
                                            textAlign: 'right',
                                            lineHeight: 1.2,
                                            maxWidth: '90%',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <span style={{ color: '#FBBF24', marginRight: 4 }}>NT$ {item.foodPrice || 60}</span>
                                        {lang === 'en' && (
                                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                                                · ${(Number(item.foodPrice || 60) / 32).toFixed(1)} USD
                                            </span>
                                        )}
                                    </Box>

                                    {/* 收藏愛心按鈕 */}
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWishlist(item);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                                            backdropFilter: 'blur(4px)',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                            color: isInWishlist(item._id, item.foodName) ? '#E11D48' : '#78716C',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: '#FFF',
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    >
                                        {isInWishlist(item._id, item.foodName) ? (
                                            <FavoriteIcon fontSize="small" sx={{ color: '#E11D48' }} />
                                        ) : (
                                            <FavoriteBorderIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 1, fontSize: '1.15rem', lineHeight: 1.3 }}>
                                        {item.foodName}
                                    </Typography>

                                    {/* 分類標籤 & 飲食標記 Chip */}
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1.5 }}>
                                        {getDietaryTag(item) && (
                                            <Chip
                                                label={getDietaryTag(item).label}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getDietaryTag(item).bg,
                                                    color: getDietaryTag(item).color,
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    borderRadius: '6px',
                                                }}
                                            />
                                        )}
                                        {Array.isArray(item.foodType) && item.foodType.map((t, i) => (
                                            <Chip
                                                key={i}
                                                label={t}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                                    color: 'var(--tw-text-muted, #78716C)',
                                                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                    borderRadius: '6px',
                                                }}
                                            />
                                        ))}
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#57534E',
                                            lineHeight: 1.6,
                                            fontSize: '0.85rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            flexGrow: 1,
                                        }}
                                    >
                                        {lang === 'en' ? (item.foodInfoEN || item.foodInfo) : item.foodInfo}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ p: 2.5, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        className="tw-btn-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectFood(item._id);
                                        }}
                                    >
                                        {t('view_food_detail')}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px', backgroundColor: '#FFF', border: '1px dashed var(--tw-border-subtle, #EAE5DD)' }}>
                    <RestaurantMenuIcon sx={{ fontSize: 56, color: '#D6D3D1', mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 1 }}>
                        {lang === 'en' ? 'No food matched your search' : '未找到符合條件的美食'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mb: 2.5 }}>
                        {lang === 'en' ? 'Try searching another ingredient or selecting a different category.' : '您可以嘗試搜尋其他食材關鍵字，或切換上方分類標籤。'}
                    </Typography>
                    <Button
                        className="tw-btn-primary"
                        onClick={() => { setSearchText(''); setSelectedCategory('all'); }}
                    >
                        {lang === 'en' ? 'Show All Foods' : '重設篩選條件'}
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
