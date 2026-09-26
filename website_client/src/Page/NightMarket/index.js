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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function NightMarket() {
    const { lang, t } = useLanguage();
    const [markets, setMarkets] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [searchText, setSearchText] = useState(() => {
        const stored = localStorage.getItem('search') || '';
        localStorage.removeItem('search');
        return stored;
    });

    useEffect(() => {
        async function loadMarkets() {
            try {
                const res = await helper.helper.AsyncMarketData();
                if (res && res.status === 'success' && Array.isArray(res.market)) {
                    setMarkets(res.market);
                }
            } catch (err) {
                console.error('Failed to load markets:', err);
            }
        }
        loadMarkets();
    }, []);

    const handleMarketClick = (id) => {
        localStorage.setItem('nightID', id);
        window.location.href = '/nightmarketpage';
    };

    const handleClearSearch = () => {
        setSearchText('');
        setSelectedRegion('all');
        localStorage.removeItem('search');
    };

    // 篩選邏輯：同時考量地區與關鍵字
    const filteredMarkets = markets.filter((item) => {
        let matchesRegion = true;
        const loc = (item.marketLocation || '').toLowerCase();
        const name = (item.name || '').toLowerCase();

        if (selectedRegion === 'tp') {
            matchesRegion = loc === 'tp' || loc === 'taipei' || name.includes('士林') || name.includes('饒河') || name.includes('寧夏') || name.includes('台北');
        } else if (selectedRegion === 'tz') {
            matchesRegion = loc === 'tz' || loc === 'taichung' || name.includes('逢甲') || name.includes('羅東') || name.includes('台中');
        } else if (selectedRegion === 'tn') {
            matchesRegion = loc === 'tn' || loc === 'tainan' || loc === 'kaohsiung' || name.includes('花園') || name.includes('六合') || name.includes('台南') || name.includes('高雄');
        }

        let matchesSearch = true;
        if (searchText.trim()) {
            const kw = searchText.trim().toLowerCase();
            const nameen = (item.nameen || '').toLowerCase();
            const brief = (item.brief || '').toLowerCase();
            matchesSearch = name.includes(kw) || nameen.includes(kw) || brief.includes(kw);
        }

        return matchesRegion && matchesSearch;
    });

    const regions = [
        { id: 'all', label: t('region_all') },
        { id: 'tp', label: t('region_tp') },
        { id: 'tz', label: t('region_tz') },
        { id: 'tn', label: t('region_tn') },
    ];

    const getRegionBadge = (item) => {
        const loc = (item.marketLocation || '').toLowerCase();
        const name = item.name || '';
        if (loc === 'tp' || loc === 'taipei' || name.includes('士林') || name.includes('饒河') || name.includes('寧夏')) return lang === 'en' ? 'Taipei' : '台北市';
        if (loc === 'tz' || loc === 'taichung' || name.includes('逢甲')) return lang === 'en' ? 'Taichung' : '台中市';
        if (name.includes('羅東')) return lang === 'en' ? 'Yilan' : '宜蘭縣';
        if (name.includes('六合')) return lang === 'en' ? 'Kaohsiung' : '高雄市';
        if (loc === 'tn' || loc === 'tainan' || name.includes('花園')) return lang === 'en' ? 'Tainan' : '台南市';
        return lang === 'en' ? 'Taiwan' : '台灣';
    };

    return (
        <Box sx={{ pb: 6 }}>
            {/* 標題與簡介 */}
            <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 1 }}>
                    <span style={{ fontSize: '2rem' }}>🏮</span>
                    <Typography variant="h4" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#C62828' }}>
                        {t('markets_page_title')}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    {t('markets_page_desc')} {lang === 'en' ? `(${markets.length} night markets available)` : `目前收錄 ${markets.length} 座特色夜市聚落！`}
                </Typography>
            </Box>

            {/* 篩選與搜尋列 */}
            <Paper
                elevation={0}
                sx={{
                    p: 2.5,
                    mb: 4,
                    borderRadius: '16px',
                    backgroundColor: '#FFF',
                    border: '1px solid #EAE0D5',
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    {/* 地區切換按鈕 */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {regions.map((r) => (
                                <Chip
                                    key={r.id}
                                    label={r.label}
                                    clickable
                                    onClick={() => setSelectedRegion(r.id)}
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        py: 2,
                                        px: 1,
                                        backgroundColor: selectedRegion === r.id ? '#C62828' : '#F5EBE1',
                                        color: selectedRegion === r.id ? '#FFF' : '#5D4037',
                                        '&:hover': {
                                            backgroundColor: selectedRegion === r.id ? '#B71C1C' : '#E8D9CD',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* 關鍵字搜尋 */}
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={t('market_search_placeholder')}
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
                                            onClick={handleClearSearch}
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

                {/* 搜尋中提示標籤 */}
                {(searchText || selectedRegion !== 'all') && (
                    <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px dashed #E0D5C7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            {lang === 'en' ? `Matches: ` : `符合條件的夜市：`}
                            <strong style={{ color: '#C62828' }}>{filteredMarkets.length}</strong>
                            {searchText && ` (${lang === 'en' ? 'Keyword' : '關鍵字'}：「${searchText}」)`}
                        </Typography>
                        <Button size="small" onClick={handleClearSearch} sx={{ color: '#C62828', fontWeight: 700 }}>
                            {lang === 'en' ? 'Reset Filters' : '清除所有篩選條件'}
                        </Button>
                    </Box>
                )}
            </Paper>

            {/* 夜市卡片網格 */}
            {filteredMarkets.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredMarkets.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Card
                                className="tw-card"
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    position: 'relative',
                                }}
                                onClick={() => handleMarketClick(item._id)}
                            >
                                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={item.marketIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                                        alt={item.name}
                                        sx={{
                                            transition: 'transform 0.4s ease',
                                            '&:hover': { transform: 'scale(1.04)' },
                                        }}
                                    />
                                    {/* 評分徽章 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                            color: '#FFD54F',
                                            px: 1.2,
                                            py: 0.4,
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        ⭐ {item.rating || 4.8}
                                    </Box>

                                    {/* 地區徽章 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            backgroundColor: '#C62828',
                                            color: '#FFF',
                                            fontWeight: 800,
                                            fontSize: '0.8rem',
                                            px: 1.2,
                                            py: 0.4,
                                            borderRadius: '6px',
                                        }}
                                    >
                                        {getRegionBadge(item)}
                                    </Box>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#2C2622', mb: 0.5 }}>
                                        {lang === 'en' ? (item.nameen || item.name) : item.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 1.5 }}>
                                        {lang === 'en' ? (item.marketLocation || 'Taiwan') : item.nameen}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.8, color: '#555', mb: 1.5, fontSize: '0.85rem' }}>
                                        <LocationOnIcon fontSize="small" sx={{ color: '#D84315', mt: 0.2, flexShrink: 0 }} />
                                        <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.4 }}>
                                            {item.marketLocation || (lang === 'en' ? 'Taiwan night market cluster' : '在地熱門夜市聚落')}
                                        </Typography>
                                    </Box>

                                    {item.positionGuidelines && (
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.8, color: '#2E7D32', mb: 2, fontSize: '0.82rem' }}>
                                            <DirectionsSubwayIcon fontSize="small" sx={{ mt: 0.2, flexShrink: 0 }} />
                                            <Typography variant="caption" sx={{ color: '#2E7D32', fontWeight: 600, lineHeight: 1.4 }}>
                                                {item.positionGuidelines}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#555',
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {item.brief || item.introduction}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        className="tw-btn-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMarketClick(item._id);
                                        }}
                                    >
                                        {t('enter_market')}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px', backgroundColor: '#FFF', border: '1px dashed #DDD' }}>
                    <StorefrontIcon sx={{ fontSize: 60, color: '#CCC', mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#666', mb: 1 }}>
                        {t('no_markets_found')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
                        {lang === 'en' ? 'Try clearing your search term or selecting another region.' : '您可以嘗試清除搜尋關鍵字或選擇其他地區分類。'}
                    </Typography>
                    <Button variant="contained" onClick={handleClearSearch} sx={{ bgcolor: '#C62828', color: '#FFF', fontWeight: 800 }}>
                        {t('clear_filter')}
                    </Button>
                </Paper>
            )}
        </Box>
    );
}