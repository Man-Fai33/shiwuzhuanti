import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CampaignIcon from '@mui/icons-material/Campaign';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function Index() {
    const { lang, t } = useLanguage();
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const [markets, setMarkets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchMarkets() {
            try {
                const res = await helper.helper.AsyncMarketData();
                if (res && res.status === 'success' && Array.isArray(res.market)) {
                    setMarkets(res.market);
                }
            } catch (err) {
                console.error('Failed to load markets:', err);
            }
        }
        fetchMarkets();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            localStorage.setItem('search', searchTerm.trim());
            window.location.href = '/nightmarket';
        }
    };

    const handleQuickSearch = (name) => {
        localStorage.setItem('search', name);
        window.location.href = '/nightmarket';
    };

    const handleGoToMarket = (id) => {
        localStorage.setItem('nightID', id);
        window.location.href = '/nightmarketpage';
    };

    return (
        <Box sx={{ width: '100%', pb: 6 }}>
            {/* 1. Hero 橫幅：濃郁台灣夜市氛圍 */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: '20px',
                    p: { xs: 3, md: 6 },
                    mb: 5,
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #8E1800 0%, #C62828 50%, #E65100 100%)',
                    color: '#FFF',
                    boxShadow: '0 8px 32px rgba(142, 24, 0, 0.25)',
                }}
            >
                {/* 裝飾紅燈籠微光 */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -20,
                        right: 20,
                        fontSize: { xs: '80px', md: '140px' },
                        opacity: 0.15,
                        userSelect: 'none',
                    }}
                >
                    🏮
                </Box>

                <Box sx={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <span style={{ fontSize: '1.8rem' }}>🏮</span>
                        <Chip
                            label={t('hero_tag')}
                            sx={{
                                backgroundColor: '#FFD54F',
                                color: '#5D1000',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "'Noto Serif TC', serif",
                            fontWeight: 900,
                            letterSpacing: '0.03em',
                            fontSize: { xs: '1.85rem', sm: '2.5rem', md: '3.1rem' },
                            lineHeight: 1.25,
                            mb: 2,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                    >
                        {t('hero_title')}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '0.98rem', md: '1.15rem' },
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.92)',
                            mb: 3.5,
                        }}
                    >
                        {t('hero_desc')}
                    </Typography>

                    {/* 搜尋框 */}
                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            display: 'flex',
                            gap: 1,
                            backgroundColor: '#FFF',
                            p: 0.6,
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                            maxWidth: '560px',
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder={t('search_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ pl: 1.5, color: '#C62828' }}>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                sx: { px: 1, py: 0.5, fontSize: '0.95rem' },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#C62828',
                                color: '#FFF',
                                fontWeight: 800,
                                px: 3,
                                borderRadius: '8px',
                                '&:hover': { backgroundColor: '#B71C1C' },
                            }}
                        >
                            {t('search_btn')}
                        </Button>
                    </Box>

                    {/* 熱門夜市快捷標籤 */}
                    <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
                            {t('quick_search')}
                        </Typography>
                        {['士林夜市', '逢甲夜市', '花園夜市', '饒河夜市', '寧夏夜市'].map((name) => (
                            <Chip
                                key={name}
                                label={name}
                                size="small"
                                onClick={() => handleQuickSearch(name)}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    color: '#FFF',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 255, 255, 0.4)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Paper>

            {/* 2. 四大核心特色入口卡片 */}
            <Box sx={{ mb: 6 }}>
                <Box className="tw-section-header">
                    <Typography className="tw-section-title">
                        <span>🥢</span> {lang === 'zh' ? '探索夜市四大主題' : 'Explore Night Market Themes'}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* 卡片 1：夜市總覽 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(180deg, #FFF3E0 0%, #FFF 100%)' }}>
                                <StorefrontIcon sx={{ fontSize: 48, color: '#E65100', mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    {t('card_markets_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', mt: 1, minHeight: '40px' }}>
                                    {t('card_markets_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid #F0EAE1', textAlign: 'center' }}>
                                <Button href="/nightmarket" endIcon={<ArrowForwardIcon />} sx={{ color: '#C62828', fontWeight: 800 }}>
                                    {t('card_markets_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 2：人氣美食 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(180deg, #FBE9E7 0%, #FFF 100%)' }}>
                                <RestaurantMenuIcon sx={{ fontSize: 48, color: '#C62828', mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    {t('card_foods_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', mt: 1, minHeight: '40px' }}>
                                    {t('card_foods_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid #F0EAE1', textAlign: 'center' }}>
                                <Button href="/Food" endIcon={<ArrowForwardIcon />} sx={{ color: '#C62828', fontWeight: 800 }}>
                                    {t('card_foods_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 3：活動公告 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(180deg, #FFFDE7 0%, #FFF 100%)' }}>
                                <CampaignIcon sx={{ fontSize: 48, color: '#F57F17', mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    {t('card_bulletin_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', mt: 1, minHeight: '40px' }}>
                                    {t('card_bulletin_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid #F0EAE1', textAlign: 'center' }}>
                                <Button href="/bulletinBoard" endIcon={<ArrowForwardIcon />} sx={{ color: '#C62828', fontWeight: 800 }}>
                                    {t('card_bulletin_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 4：訪客回饋 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(180deg, #E8F5E9 0%, #FFF 100%)' }}>
                                <RateReviewIcon sx={{ fontSize: 48, color: '#2E7D32', mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#C62828' }}>
                                    {t('card_feedback_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', mt: 1, minHeight: '40px' }}>
                                    {t('card_feedback_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid #F0EAE1', textAlign: 'center' }}>
                                <Button href="/feedback" endIcon={<ArrowForwardIcon />} sx={{ color: '#C62828', fontWeight: 800 }}>
                                    {t('card_feedback_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* 3. 精選熱門夜市展示 (動態讀取) */}
            <Box sx={{ mb: 6 }}>
                <Box className="tw-section-header">
                    <Typography className="tw-section-title">
                        <span>🌟</span> {t('featured_markets')}
                    </Typography>
                    <Button href="/nightmarket" endIcon={<ArrowForwardIcon />} sx={{ color: '#C62828', fontWeight: 700 }}>
                        {t('view_all_markets')}
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {markets.slice(0, 6).map((item, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
                            <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.marketIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                                        alt={item.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            backgroundColor: 'rgba(0,0,0,0.75)',
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
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#2C2622' }}>
                                            {lang === 'en' ? (item.nameen || item.name) : item.name}
                                        </Typography>
                                        <Chip
                                            label={
                                                (item.marketLocation === 'tp' || (item.name && (item.name.includes('士林') || item.name.includes('饒河') || item.name.includes('寧夏')))) ? (lang === 'en' ? 'Taipei' : '台北') :
                                                (item.name && item.name.includes('羅東')) ? (lang === 'en' ? 'Yilan' : '宜蘭') :
                                                (item.name && item.name.includes('六合')) ? (lang === 'en' ? 'Kaohsiung' : '高雄') :
                                                (item.marketLocation === 'tz' || (item.name && item.name.includes('逢甲'))) ? (lang === 'en' ? 'Taichung' : '台中') :
                                                (item.marketLocation === 'tn' || (item.name && item.name.includes('花園'))) ? (lang === 'en' ? 'Tainan' : '台南') : '台灣'
                                            }
                                            size="small"
                                            sx={{ backgroundColor: '#FFECB3', color: '#8E1800', fontWeight: 800 }}
                                        />
                                    </Box>

                                    <Typography variant="body2" sx={{ color: '#777', mb: 1.5, fontSize: '0.85rem' }}>
                                        {lang === 'en' ? (item.marketLocation || 'Taiwan') : item.nameen}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#555',
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            mb: 2,
                                        }}
                                    >
                                        {item.brief || item.introduction}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#C62828', fontSize: '0.85rem', fontWeight: 700 }}>
                                        <LocationOnIcon fontSize="small" />
                                        <span>{item.positionGuidelines ? (item.positionGuidelines.substring(0, 22) + '...') : (item.marketLocation || '在地熱門')}</span>
                                    </Box>
                                </CardContent>

                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        className="tw-btn-primary"
                                        onClick={() => handleGoToMarket(item._id)}
                                    >
                                        {t('view_market_detail')}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* 4. 管理員後台捷徑浮動條 (僅管理員可見) */}
            {user && user.role === 'admin' && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: '16px',
                        backgroundColor: '#FFF8E1',
                        border: '1px solid #FFE082',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AdminPanelSettingsIcon sx={{ fontSize: 40, color: '#FF8F00' }} />
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#C62828' }}>
                                {lang === 'en' ? 'Administrator Control Notice' : '管理員後台快捷服務'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#777' }}>
                                {lang === 'en' ? 'You have administrative rights to manage night markets, notices, and reviews.' : '您具有管理權限，可在此新增夜市資料、發佈活動公告與檢視遊客回饋。'}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        href="/datamanagement"
                        sx={{
                            backgroundColor: '#FF8F00',
                            color: '#FFF',
                            fontWeight: 800,
                            '&:hover': { backgroundColor: '#F57F17' },
                        }}
                    >
                        {t('nav_admin')}
                    </Button>
                </Paper>
            )}

            {/* 5. 台灣夜市精神文化頁尾小語 */}
            <Box
                sx={{
                    textAlign: 'center',
                    py: 4,
                    mt: 4,
                    borderTop: '1px solid #EAE0D5',
                    color: '#7C7267',
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#C62828', mb: 0.5, letterSpacing: '0.05em' }}>
                    {t('footer_slogan')}
                </Typography>
                <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                    {t('footer_copyright')}
                </Typography>
            </Box>
        </Box>
    );
}