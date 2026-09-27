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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import TranslateIcon from '@mui/icons-material/Translate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function Index() {
    const { lang, t } = useLanguage();
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const [markets, setMarkets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [analytics, setAnalytics] = useState(null);

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
        async function fetchAnalytics() {
            try {
                const aRes = await helper.helper.AsyncGetAnalyticsStats();
                if (aRes && aRes.status === 'success') {
                    setAnalytics(aRes.data);
                }
            } catch (err) {
                // optional
            }
        }
        fetchMarkets();
        fetchAnalytics();
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
            {/* 1. Hero 橫幅：現代台灣夜市攝影與漫遊指南 */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: '24px',
                    p: { xs: 3.5, sm: 5, md: 7 },
                    mb: 6,
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(180deg, rgba(28, 25, 23, 0.38) 0%, rgba(28, 25, 23, 0.88) 100%), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80') center/cover no-repeat`,
                    color: '#FFF',
                    boxShadow: '0 12px 36px rgba(28, 25, 23, 0.12)',
                }}
            >
                <Box sx={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2 }}>
                        <Chip
                            icon={<LocationOnIcon sx={{ fontSize: 16, color: '#FCD34D !important' }} />}
                            label={t('hero_tag')}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                color: '#FFF',
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                border: '1px solid rgba(255, 255, 255, 0.28)',
                                px: 0.5,
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "'Noto Serif TC', serif",
                            fontWeight: 900,
                            letterSpacing: '-0.01em',
                            fontSize: { xs: '1.9rem', sm: '2.6rem', md: '3.2rem' },
                            lineHeight: 1.25,
                            mb: 2,
                            textShadow: '0 2px 14px rgba(0,0,0,0.5)',
                        }}
                    >
                        {t('hero_title')}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '0.98rem', md: '1.12rem' },
                            lineHeight: 1.75,
                            color: 'rgba(255, 255, 255, 0.92)',
                            mb: 4,
                            maxWidth: '660px',
                            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                        }}
                    >
                        {t('hero_desc')}
                    </Typography>

                    {/* 現代膠囊搜尋框 */}
                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            display: 'flex',
                            gap: 1,
                            backgroundColor: '#FFF',
                            p: 0.6,
                            borderRadius: '36px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
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
                                    <InputAdornment position="start" sx={{ pl: 2, color: '#B91C1C' }}>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                sx: { px: 1, py: 0.6, fontSize: '0.95rem' },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#B91C1C',
                                color: '#FFF',
                                fontWeight: 700,
                                px: 3.5,
                                borderRadius: '28px',
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { backgroundColor: '#991B1B' },
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
                        {[
                            { zh: '士林夜市', en: 'Shilin', q: '士林' },
                            { zh: '逢甲夜市', en: 'Fengjia', q: '逢甲' },
                            { zh: '花園夜市', en: 'Garden', q: '花園' },
                            { zh: '饒河夜市', en: 'Raohe', q: '饒河' },
                            { zh: '寧夏夜市', en: 'Ningxia', q: '寧夏' }
                        ].map((item) => (
                            <Chip
                                key={item.q}
                                label={lang === 'en' ? item.en : item.zh}
                                size="small"
                                onClick={() => handleQuickSearch(item.q)}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.16)',
                                    backdropFilter: 'blur(6px)',
                                    WebkitBackdropFilter: 'blur(6px)',
                                    color: '#FFF',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    border: '1px solid rgba(255, 255, 255, 0.28)',
                                    borderRadius: '16px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.28)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Paper>

            {/* 2. 四大核心特色入口卡片 */}
            <Box sx={{ mb: 7 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="overline" sx={{ color: '#B91C1C', fontWeight: 800, letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>
                        {lang === 'en' ? 'EXPLORE CATEGORIES' : '探索主題'}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", letterSpacing: '-0.01em' }}>
                        {lang === 'zh' ? '夜市四大漫遊主題' : 'Night Market Themes'}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* 卡片 1：夜市總覽 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <StorefrontIcon sx={{ fontSize: 28, color: '#EA580C' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1 }}>
                                    {t('card_markets_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_markets_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/nightmarket" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 700, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
                                    {t('card_markets_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 2：人氣美食 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <RestaurantMenuIcon sx={{ fontSize: 28, color: '#B91C1C' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1 }}>
                                    {t('card_foods_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_foods_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/Food" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 700, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
                                    {t('card_foods_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 3：活動公告 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <CampaignIcon sx={{ fontSize: 28, color: '#D97706' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1 }}>
                                    {t('card_bulletin_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_bulletin_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/bulletinBoard" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 700, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
                                    {t('card_bulletin_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 4：訪客回饋 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <RateReviewIcon sx={{ fontSize: 28, color: '#16A34A' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1 }}>
                                    {t('card_feedback_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_feedback_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/feedback" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 700, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
                                    {t('card_feedback_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* 3. 跨縣市旅人與國際觀光客 ‧ 迺夜市 101 秘笈速查 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 4.5 },
                    mb: 7,
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #EAE5DD',
                    boxShadow: '0 4px 20px rgba(28, 25, 23, 0.04)',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3.5 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: '#B91C1C', fontWeight: 800, letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>
                            {lang === 'en' ? 'TRAVELER ESSENTIALS' : '旅人實用攻略'}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: "'Noto Serif TC', serif", color: '#1C1917' }}>
                            {lang === 'en' ? 'Taiwan Night Market 101' : '旅人迺夜市通關秘笈'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#78716C', mt: 0.5 }}>
                            {lang === 'en' ? 'Essential tips for MRT transit, payment habits, and ordering culture' : '一次搞懂捷運直達路線、多元支付習慣與實用點餐小抄'}
                        </Typography>
                    </Box>
                    <Button
                        href="/guide"
                        variant="contained"
                        className="tw-btn-primary"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ borderRadius: '20px', px: 2.5 }}
                    >
                        {lang === 'en' ? 'Full Guide ➔' : '完整旅人攻略 ➔'}
                    </Button>
                </Box>

                <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '14px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Box sx={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <DirectionsSubwayIcon sx={{ color: '#B91C1C', fontSize: 18 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {lang === 'en' ? 'MRT & Bus Direct' : '捷運公車直達'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.6, display: 'block', flexGrow: 1 }}>
                                {lang === 'en'
                                    ? 'Jiantan Station (Shilin), Songshan Station (Raohe), Shuanglian Station (Ningxia), Formosa Blvd (Liuhe).'
                                    : '士林搭至劍潭站、饒河搭至松山站1號口、六合出美麗島站11號口直達。'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '14px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Box sx={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PaymentsIcon sx={{ color: '#D97706', fontSize: 18 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {lang === 'en' ? 'Payment Tips' : '支付與小鈔自備'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.6, display: 'block', flexGrow: 1 }}>
                                {lang === 'en'
                                    ? 'Prepare NT$50 coins & NT$100 bills. 60%+ stalls also support LINE Pay & EasyCard.'
                                    : '建議備妥 50 元硬幣與百元鈔，超過 6 成店家亦支援 LINE Pay / 悠遊卡！'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '14px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Box sx={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <TranslateIcon sx={{ color: '#0D9488', fontSize: 18 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {lang === 'en' ? 'Order Phrases' : '點餐常用小抄'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.6, display: 'block', flexGrow: 1 }}>
                                {lang === 'en'
                                    ? '內用 (For here), 外帶 (To go), 不要香菜 (No cilantro), 微糖微冰 (Less ice/sugar).'
                                    : '內用 (坐著吃)、外帶 (邊走邊吃)、不要香菜、微糖微冰（手搖黃金比例）。'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '14px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Box sx={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AccessTimeIcon sx={{ color: '#4F46E5', fontSize: 18 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {lang === 'en' ? 'Golden Hours' : '營業時間避坑提醒'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.6, display: 'block', flexGrow: 1 }}>
                                {lang === 'en'
                                    ? 'Tainan Garden Night Market: Thu, Sat, Sun ONLY. Peak hours: 19:30 - 21:30.'
                                    : '台南花園夜市僅「四、六、日」營業！全台夜市黃金時段建議 17:30 - 18:30 避開排隊。'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            {/* 4. 精選熱門夜市展示 (動態讀取) */}
            <Box sx={{ mb: 7 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, mb: 3.5, borderBottom: '1px solid #EAE5DD', pb: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: '#B91C1C', fontWeight: 800, letterSpacing: '0.1em', display: 'block', mb: 0.5 }}>
                            {lang === 'en' ? 'LOCAL HIGHLIGHTS' : '在地精選導覽'}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", letterSpacing: '-0.01em' }}>
                            {t('featured_markets')}
                        </Typography>
                    </Box>
                    <Button href="/nightmarket" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 700, '&:hover': { backgroundColor: '#FEF2F2' } }}>
                        {t('view_all_markets')}
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {markets.slice(0, 6).map((item, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
                            <Card className="tw-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="210"
                                        image={item.marketIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                                        alt={item.name}
                                        sx={{ objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.04)' } }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            backgroundColor: 'rgba(28, 25, 23, 0.78)',
                                            backdropFilter: 'blur(6px)',
                                            color: '#FCD34D',
                                            px: 1.2,
                                            py: 0.35,
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontWeight: 800,
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        ★ {item.rating || 4.8}
                                    </Box>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 0.8 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', flex: 1, fontSize: '1.15rem', lineHeight: 1.3 }}>
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
                                            sx={{ backgroundColor: '#F5EBE1', color: '#991B1B', fontWeight: 700, fontSize: '0.72rem', border: '1px solid #EADBCC', flexShrink: 0 }}
                                        />
                                    </Box>

                                    <Typography variant="body2" sx={{ color: '#78716C', mb: 1.5, fontSize: '0.82rem' }}>
                                        {lang === 'en' ? (item.marketLocation || 'Taiwan') : item.nameen}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#57534E',
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            mb: 1.5,
                                            flexGrow: 1,
                                        }}
                                    >
                                        {item.brief || item.introduction}
                                    </Typography>

                                    {/* 捷運交通與營業時間提示 */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#15803D', fontSize: '0.82rem', fontWeight: 600, mb: 0.8, minWidth: 0 }}>
                                        <DirectionsSubwayIcon fontSize="small" sx={{ flexShrink: 0 }} />
                                        <Typography variant="caption" sx={{ color: '#15803D', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {item.positionGuidelines || (item.marketLocation || '在地熱門捷運直達')}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: (item.name && item.name.includes('花園')) ? '#B91C1C' : '#78716C', fontSize: '0.8rem', fontWeight: 600, minWidth: 0 }}>
                                        <CalendarMonthIcon fontSize="small" sx={{ flexShrink: 0 }} />
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: (item.name && item.name.includes('花園')) ? '#B91C1C' : '#78716C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {(item.name && item.name.includes('花園')) ? (lang === 'en' ? 'Thu, Sat, Sun Only' : '每週四、六、日限定營業') : (lang === 'en' ? 'Open Daily (17:30 - 00:00)' : '每日營業 (17:30 - 00:00)')}
                                        </Typography>
                                    </Box>
                                </CardContent>

                                <CardActions sx={{ p: 2.5, pt: 0 }}>
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

            {/* 每日瀏覽人數與全站流量統計徽章 */}
            {analytics && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: { xs: 1.5, sm: 3 },
                        flexWrap: 'wrap',
                        mt: 4,
                        mb: 2,
                        p: 2,
                        borderRadius: '16px',
                        backgroundColor: '#FAF8F5',
                        border: '1px solid #EAE5DD',
                        maxWidth: '780px',
                        mx: 'auto'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 700 }}>
                            {lang === 'en' ? '👥 Today\'s Visitors:' : '👥 今日造訪人數：'}
                        </Typography>
                        <Chip
                            label={`${(analytics.today?.uv || 0).toLocaleString()} ${lang === 'en' ? 'visitors' : '人'}`}
                            size="small"
                            sx={{ backgroundColor: '#FEF2F2', color: '#B91C1C', fontWeight: 800 }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 700 }}>
                            {lang === 'en' ? '📈 Today\'s Views:' : '📈 今日總瀏覽量：'}
                        </Typography>
                        <Chip
                            label={`${(analytics.today?.pv || 0).toLocaleString()} ${lang === 'en' ? 'views' : '次'}`}
                            size="small"
                            sx={{ backgroundColor: '#FFFBEB', color: '#B45309', fontWeight: 800 }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 700 }}>
                            {lang === 'en' ? '🌐 Total Views:' : '🌐 累積總瀏覽量：'}
                        </Typography>
                        <Chip
                            label={`${(analytics.totalPv || 0).toLocaleString()} ${lang === 'en' ? 'views' : '次'}`}
                            size="small"
                            sx={{ backgroundColor: '#ECFDF5', color: '#047857', fontWeight: 800 }}
                        />
                    </Box>
                </Box>
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