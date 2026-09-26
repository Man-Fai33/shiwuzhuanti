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

// Icons
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ClearIcon from '@mui/icons-material/Clear';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function FoodList() {
    const { lang, t } = useLanguage();
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
        { id: 'all', label: lang === 'en' ? 'All Delicacies 🥢' : '全部美食 🥢' },
        { id: '炸物', label: lang === 'en' ? 'Crispy Fried 🍗' : '酥脆炸物 🍗' },
        { id: '烤物', label: lang === 'en' ? 'Charcoal Grilled 🍢' : '炭烤串燒 🍢' },
        { id: '飲品', label: lang === 'en' ? 'Drinks & Boba 🧋' : '清涼手搖飲 🧋' },
        { id: '人氣必吃', label: lang === 'en' ? 'Chef Picks 🌟' : '老饕推薦 🌟' },
    ];

    const filteredFoods = foodList.filter((item) => {
        let matchesCategory = true;
        if (selectedCategory !== 'all') {
            const types = item.foodType || [];
            matchesCategory = types.some((t) => t.includes(selectedCategory)) ||
                (item.foodName && item.foodName.includes(selectedCategory)) ||
                (item.foodInfo && item.foodInfo.includes(selectedCategory));
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
            <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 1 }}>
                    <span style={{ fontSize: '2rem' }}>🍢</span>
                    <Typography variant="h4" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#C62828' }}>
                        {t('foods_page_title')}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    {t('foods_page_desc')}
                </Typography>
            </Box>

            {/* 篩選與搜尋工具列 */}
            <Paper
                elevation={0}
                sx={{
                    p: 2.5,
                    mb: 4,
                    borderRadius: '16px',
                    backgroundColor: '#FFF',
                    border: '1px solid #EFE5D8',
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {categories.map((c) => (
                                <Chip
                                    key={c.id}
                                    label={c.label}
                                    clickable
                                    onClick={() => setSelectedCategory(c.id)}
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        py: 2,
                                        px: 1,
                                        backgroundColor: selectedCategory === c.id ? '#C62828' : '#F5EBE1',
                                        color: selectedCategory === c.id ? '#FFF' : '#5D4037',
                                        '&:hover': {
                                            backgroundColor: selectedCategory === c.id ? '#B71C1C' : '#E8D9CD',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={lang === 'en' ? 'Search food by name or ingredient...' : '搜尋美食小吃、關鍵字...'}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#C62828' }} />
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
                                    borderRadius: '10px',
                                    backgroundColor: '#FAFAF9',
                                    '&:hover': { backgroundColor: '#F5F5F4' },
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
                                            transition: 'transform 0.3s ease',
                                            '&:hover': { transform: 'scale(1.05)' },
                                        }}
                                    />
                                    {/* 價格標籤 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 12,
                                            right: 12,
                                            backgroundColor: '#C62828',
                                            color: '#FFF',
                                            px: 1.5,
                                            py: 0.4,
                                            borderRadius: '8px',
                                            fontWeight: 900,
                                            fontSize: '1.05rem',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        NT$ {item.foodPrice || 60}
                                    </Box>

                                    {item.isSale && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                backgroundColor: '#FF8F00',
                                                color: '#FFF',
                                                px: 1.2,
                                                py: 0.3,
                                                borderRadius: '6px',
                                                fontWeight: 800,
                                                fontSize: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.3,
                                            }}
                                        >
                                            <LocalFireDepartmentIcon fontSize="small" /> {lang === 'en' ? 'Hot Pick' : '人氣熱銷'}
                                        </Box>
                                    )}
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#2C2622', mb: 1 }}>
                                        {item.foodName}
                                    </Typography>

                                    {/* 分類標籤 Chip */}
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1.5 }}>
                                        {Array.isArray(item.foodType) && item.foodType.map((t, i) => (
                                            <Chip
                                                key={i}
                                                label={t}
                                                size="small"
                                                sx={{ backgroundColor: '#F5EFE6', color: '#6D4C41', fontWeight: 700, fontSize: '0.75rem' }}
                                            />
                                        ))}
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {lang === 'en' ? (item.foodInfoEN || item.foodInfo) : item.foodInfo}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ p: 2, pt: 0 }}>
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
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px', backgroundColor: '#FFF', border: '1px dashed #DDD' }}>
                    <RestaurantMenuIcon sx={{ fontSize: 60, color: '#CCC', mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#666', mb: 1 }}>
                        {lang === 'en' ? 'No food matched your search' : '未找到符合條件的美食'}
                    </Typography>
                    <Button variant="outlined" onClick={() => { setSearchText(''); setSelectedCategory('all'); }} sx={{ color: '#C62828', borderColor: '#C62828' }}>
                        {lang === 'en' ? 'Show All Foods' : '重設篩選條件'}
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
