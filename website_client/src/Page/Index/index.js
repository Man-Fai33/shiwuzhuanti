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
import PaymentsIcon from '@mui/icons-material/Payments';
import TranslateIcon from '@mui/icons-material/Translate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function Index() {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
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
            {/* 1. Hero 橫幅：現代台灣夜市攝影與漫遊指南 (Editorial Atmosphere) */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: '28px',
                    p: { xs: 3.5, sm: 5, md: 7 },
                    mb: 5,
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(180deg, rgba(28, 25, 23, 0.42) 0%, rgba(28, 25, 23, 0.88) 100%), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80') center/cover no-repeat`,
                    color: '#FFF',
                    boxShadow: '0 16px 44px rgba(28, 25, 23, 0.16)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
            >
                <Box sx={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 2 }}>
                        <Chip
                            icon={<AutoAwesomeIcon sx={{ fontSize: 16, color: '#FCD34D !important' }} />}
                            label={isEn ? 'TAIWAN NIGHT MARKET DIGITAL GUIDE' : '🏮 全台夜市在地文化與美食指南'}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                color: '#FFF',
                                fontWeight: 800,
                                fontSize: '0.8rem',
                                letterSpacing: '0.04em',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                px: 0.5,
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: "'Noto Serif TC', serif",
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            fontSize: { xs: '2.1rem', sm: '2.9rem', md: '3.5rem' },
                            lineHeight: 1.2,
                            mb: 2,
                            textShadow: '0 2px 18px rgba(0,0,0,0.5)',
                        }}
                    >
                        {isEn ? (
                            <>Discover Taiwan’s <span style={{ color: '#FCD34D' }}>Night Markets</span> & Street Delicacies</>
                        ) : (
                            <>逗陣來迺夜市 ‧ <span style={{ background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>在地老饕帶路</span></>
                        )}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.15rem' },
                            lineHeight: 1.8,
                            color: 'rgba(255, 255, 255, 0.92)',
                            mb: 4,
                            maxWidth: '680px',
                            textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                        }}
                    >
                        {isEn
                            ? 'Experience the authentic aroma of sizzling grills, bubbling oyster omelets, and sweet bubble tea. Live crowd forecasts, English menu translations, and GPS walking routes.'
                            : '走訪全台代表性夜市，品嚐傳承三代的炭火美味與米其林必比登推薦小吃。即時天候預報、人潮避峰預測與 Google Maps 實體導航。'}
                    </Typography>

                    {/* 現代膠囊搜尋框 */}
                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            display: 'flex',
                            gap: 1,
                            backgroundColor: '#FFF',
                            p: 0.7,
                            borderRadius: '36px',
                            boxShadow: '0 10px 32px rgba(0,0,0,0.35)',
                            maxWidth: '580px',
                            border: '2px solid rgba(255, 255, 255, 0.8)',
                            transition: 'all 0.25s ease',
                            '&:focus-within': {
                                boxShadow: '0 12px 36px rgba(185, 28, 28, 0.45)',
                                borderColor: '#B91C1C'
                            }
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder={isEn ? 'Search night market or dish (e.g. Shilin, Stinky Tofu, Chicken Cutlet)...' : '搜尋夜市或美食 (例：士林夜市、雞排、臭豆腐、蚵仔煎)...'}
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
                                fontWeight: 800,
                                px: 3.5,
                                borderRadius: '28px',
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { backgroundColor: '#991B1B' },
                            }}
                        >
                            {isEn ? 'Explore' : '立即探索'}
                        </Button>
                    </Box>

                    {/* 熱門夜市快捷標籤 */}
                    <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
                            {isEn ? '🔥 Hot Searches:' : '🔥 熱門快捷：'}
                        </Typography>
                        {[
                            { zh: '士林夜市', en: 'Shilin', q: '士林' },
                            { zh: '逢甲夜市', en: 'Fengjia', q: '逢甲' },
                            { zh: '花園夜市', en: 'Garden', q: '花園' },
                            { zh: '饒河夜市', en: 'Raohe', q: '饒河' },
                            { zh: '寧夏夜市', en: 'Ningxia', q: '寧夏' },
                            { zh: '地瓜球', en: 'Sweet Potato Ball', q: '地瓜球' },
                            { zh: '珍珠奶茶', en: 'Boba Milk Tea', q: '奶茶' }
                        ].map((item) => (
                            <Chip
                                key={item.q}
                                label={isEn ? item.en : item.zh}
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
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '16px',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#B91C1C',
                                        borderColor: '#B91C1C',
                                        transform: 'translateY(-1px)'
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Paper>

            {/* 老饕即時數據看板 (Curated Foodie Telemetry Bar) */}
            <Grid container spacing={2} sx={{ mb: 6 }}>
                {[
                    { icon: '🏮', num: '7 大', label: isEn ? 'Curated Iconic Markets' : '全台代表性觀光夜市', sub: isEn ? 'Taipei, Taichung, Tainan, Kaohsiung' : '北中南東經典必訪聚落' },
                    { icon: '🥢', num: '26+ 道', label: isEn ? 'Michelin & Signature Delicacies' : '米其林與老字號名店小吃', sub: isEn ? 'Dietary badges & price guides' : '素食肉品標籤與即時價格' },
                    { icon: '🧭', num: '100%', label: isEn ? 'GPS Maps Navigation' : 'Google 地圖實體路線直達', sub: isEn ? 'Exact stall & MRT walking steps' : '精確攤位定位與捷運出口指南' },
                    { icon: '⏱️', num: '17:30', label: isEn ? 'Golden Hour Window' : '老饕黃金避峰散步時段', sub: isEn ? 'Breezy strolls & shortest queues' : '食材最鮮・排隊最快・涼爽舒適' }
                ].map((stat, idx) => (
                    <Grid item xs={6} md={3} key={idx}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.2,
                                borderRadius: '16px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #EAE5DD',
                                boxShadow: '0 2px 10px rgba(28, 25, 23, 0.03)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                height: '100%',
                                boxSizing: 'border-box'
                            }}
                        >
                            <Box sx={{ fontSize: '1.8rem', lineHeight: 1 }}>{stat.icon}</Box>
                            <Box sx={{ minWidth: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#B91C1C', fontFamily: "'Noto Serif TC', serif" }}>
                                        {stat.num}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1C1917', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {stat.label}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#78716C', display: 'block', fontSize: '0.72rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {stat.sub}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* 2. 四大核心特色入口卡片 (Crafted Editorial Cards) */}
            <Box sx={{ mb: 7 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="overline" sx={{ color: '#B91C1C', fontWeight: 800, letterSpacing: '0.12em', display: 'block', mb: 0.5 }}>
                        {isEn ? 'CURATED THEMES' : '主題探索'}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", letterSpacing: '-0.01em' }}>
                        {isEn ? 'Four Ways to Experience Night Markets' : '夜市四大漫遊主題'}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* 卡片 1：夜市總覽 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-editorial-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <StorefrontIcon sx={{ fontSize: 28, color: '#EA580C' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1, fontFamily: "'Noto Serif TC', serif" }}>
                                    {t('card_markets_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_markets_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/nightmarket" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 800, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
                                    {t('card_markets_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 2：人氣美食 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-editorial-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <RestaurantMenuIcon sx={{ fontSize: 28, color: '#B91C1C' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1, fontFamily: "'Noto Serif TC', serif" }}>
                                    {t('card_foods_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_foods_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/foodlist" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 800, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
                                    {t('card_foods_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 3：活動公告 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-editorial-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <CampaignIcon sx={{ fontSize: 28, color: '#D97706' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1, fontFamily: "'Noto Serif TC', serif" }}>
                                    {t('card_bulletin_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_bulletin_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/bulletin" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 800, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
                                    {t('card_bulletin_btn')}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 卡片 4：訪客回饋 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="tw-editorial-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <RateReviewIcon sx={{ fontSize: 28, color: '#16A34A' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1, fontFamily: "'Noto Serif TC', serif" }}>
                                    {t('card_feedback_title')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#57534E', flexGrow: 1, lineHeight: 1.65 }}>
                                    {t('card_feedback_desc')}
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, px: 3.5, mt: 'auto', borderTop: '1px solid #EAE5DD' }}>
                                <Button href="/feedback" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 800, p: 0, '&:hover': { backgroundColor: 'transparent', color: '#991B1B' } }}>
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
                    borderRadius: '24px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #EAE5DD',
                    boxShadow: '0 4px 24px rgba(28, 25, 23, 0.05)',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3.5 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: '#B91C1C', fontWeight: 800, letterSpacing: '0.12em', display: 'block', mb: 0.5 }}>
                            {isEn ? 'TRAVELER ESSENTIALS' : '旅人實用攻略'}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: "'Noto Serif TC', serif", color: '#1C1917' }}>
                            {isEn ? 'Taiwan Night Market 101' : '旅人迺夜市通關秘笈'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#78716C', mt: 0.5 }}>
                            {isEn ? 'Essential tips for MRT transit, payment habits, and ordering culture' : '一次搞懂捷運直達路線、多元支付習慣與實用點餐小抄'}
                        </Typography>
                    </Box>
                    <Button
                        href="/travelguide"
                        variant="contained"
                        className="tw-btn-primary"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ borderRadius: '20px', px: 2.5 }}
                    >
                        {isEn ? 'Full Guides ➔' : '完整行程攻略 ➔'}
                    </Button>
                </Box>

                <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '16px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                                <Box sx={{ width: 34, height: 34, borderRadius: '10px', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <DirectionsSubwayIcon sx={{ color: '#B91C1C', fontSize: 20 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {isEn ? 'MRT Direct Lines' : '捷運公車直達'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.7, display: 'block', flexGrow: 1 }}>
                                {isEn
                                    ? 'Jiantan Station (Shilin), Songshan Station (Raohe), Shuanglian Station (Ningxia), Formosa Blvd (Liuhe).'
                                    : '士林搭至劍潭站、饒河搭至松山站1號口、寧夏搭至雙連站、六合出美麗島站11號口直達。'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '16px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                                <Box sx={{ width: 34, height: 34, borderRadius: '10px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PaymentsIcon sx={{ color: '#D97706', fontSize: 20 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {isEn ? 'Payment Methods' : '支付與小鈔自備'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.7, display: 'block', flexGrow: 1 }}>
                                {isEn
                                    ? 'Prepare NT$50 coins & NT$100 bills. Over 65% of stalls also accept LINE Pay, JKOPay & EasyCard.'
                                    : '建議隨身備妥 50 元硬幣與百元鈔，超過 65% 熱門攤商亦全面支援 LINE Pay / 街口 / 悠遊卡！'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '16px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                                <Box sx={{ width: 34, height: 34, borderRadius: '10px', backgroundColor: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <TranslateIcon sx={{ color: '#0D9488', fontSize: 20 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {isEn ? 'Order Phrases' : '點餐常用小抄'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.7, display: 'block', flexGrow: 1 }}>
                                {isEn
                                    ? '內用 (For here), 外帶 (To go), 不要香菜 (No cilantro), 微糖微冰 (Less ice/sugar).'
                                    : '內用 (坐著吃)、外帶 (邊走邊吃)、不要香菜、微糖微冰（台灣手搖飲黃金比例）。'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2.5, borderRadius: '16px', backgroundColor: '#FAF8F5', border: '1px solid #EAE5DD', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                                <Box sx={{ width: 34, height: 34, borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AccessTimeIcon sx={{ color: '#4F46E5', fontSize: 20 }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                                    {isEn ? 'Golden Hours' : '營業時間提醒'}
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#57534E', lineHeight: 1.7, display: 'block', flexGrow: 1 }}>
                                {isEn
                                    ? 'Tainan Garden Market: Thu, Sat, Sun ONLY. Peak hours: 19:30 - 21:30. Best time: 17:30 - 18:30.'
                                    : '台南花園夜市僅「四、六、日」營業！全台夜市黃金時段建議 17:30 - 18:30 避開排隊人潮。'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            {/* 4. 精選熱門夜市展示 (動態讀取) */}
            <Box sx={{ mb: 7 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2, mb: 3.5, borderBottom: '1px solid #EAE5DD', pb: 2 }}>
                    <Box>
                        <Typography variant="overline" sx={{ color: '#B91C1C', fontWeight: 800, letterSpacing: '0.12em', display: 'block', mb: 0.5 }}>
                            {isEn ? 'FEATURED DESTINATIONS' : '在地精選導覽'}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", letterSpacing: '-0.01em' }}>
                            {t('featured_markets')}
                        </Typography>
                    </Box>
                    <Button href="/nightmarket" endIcon={<ArrowForwardIcon />} sx={{ color: '#B91C1C', fontWeight: 800, '&:hover': { backgroundColor: '#FEF2F2' } }}>
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
                                        height="220"
                                        image={item.marketIcon || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'}
                                        alt={item.name}
                                        sx={{ objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }}
                                    />
                                    {/* 評分金色徽章 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            backgroundColor: 'rgba(28, 25, 23, 0.85)',
                                            backdropFilter: 'blur(6px)',
                                            color: '#FCD34D',
                                            px: 1.2,
                                            py: 0.4,
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

                                    {/* 捷運交通快速膠囊 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 12,
                                            left: 12,
                                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                                            backdropFilter: 'blur(6px)',
                                            color: '#15803D',
                                            px: 1.2,
                                            py: 0.3,
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        <DirectionsSubwayIcon sx={{ fontSize: '0.95rem' }} />
                                        {isEn ? 'Transit Connected' : '捷運出站直達'}
                                    </Box>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 0.8 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#1C1917', flex: 1, fontSize: '1.2rem', lineHeight: 1.3, fontFamily: "'Noto Serif TC', serif" }}>
                                            {isEn ? (item.nameen || item.name) : item.name}
                                        </Typography>
                                        <Chip
                                            label={
                                                (item.marketLocation === 'tp' || (item.name && (item.name.includes('士林') || item.name.includes('饒河') || item.name.includes('寧夏')))) ? (isEn ? 'Taipei' : '台北') :
                                                (item.name && item.name.includes('羅東')) ? (isEn ? 'Yilan' : '宜蘭') :
                                                (item.name && item.name.includes('六合')) ? (isEn ? 'Kaohsiung' : '高雄') :
                                                (item.marketLocation === 'tz' || (item.name && item.name.includes('逢甲'))) ? (isEn ? 'Taichung' : '台中') :
                                                (item.marketLocation === 'tn' || (item.name && item.name.includes('花園'))) ? (isEn ? 'Tainan' : '台南') : '台灣'
                                            }
                                            size="small"
                                            sx={{ backgroundColor: '#F5EBE1', color: '#991B1B', fontWeight: 800, fontSize: '0.75rem', border: '1px solid #EADBCC', flexShrink: 0 }}
                                        />
                                    </Box>

                                    <Typography variant="body2" sx={{ color: '#78716C', mb: 1.5, fontSize: '0.82rem' }}>
                                        {isEn ? (item.marketLocation || 'Taiwan') : item.nameen}
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
                                            mb: 2,
                                            flexGrow: 1,
                                        }}
                                    >
                                        {item.brief || item.introduction}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: (item.name && item.name.includes('花園')) ? '#B91C1C' : '#57534E', fontSize: '0.8rem', fontWeight: 600 }}>
                                        <CalendarMonthIcon fontSize="small" sx={{ flexShrink: 0 }} />
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: (item.name && item.name.includes('花園')) ? '#B91C1C' : '#57534E' }}>
                                            {(item.name && item.name.includes('花園')) ? (isEn ? 'Thu, Sat, Sun Only' : '每週四、六、日限定營業') : (isEn ? 'Daily (17:30 - 00:00)' : '每日營業 (17:30 - 00:00)')}
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

            {/* 5. 在地老饕私房 ‧ 三大夜市散步美學 (The Art of Night Market Strolling) */}
            <Box sx={{ mb: 7 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="overline" sx={{ color: '#B91C1C', fontWeight: 800, letterSpacing: '0.12em', display: 'block', mb: 0.5 }}>
                        {isEn ? 'FOODIE PHILOSOPHY' : '老饕私房哲學'}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", letterSpacing: '-0.01em' }}>
                        {isEn ? 'The Art of Night Market Strolling' : '老饕迺夜市的三大黃金法則'}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3.5,
                                height: '100%',
                                borderRadius: '20px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #EAE5DD',
                                boxShadow: '0 4px 18px rgba(28, 25, 23, 0.04)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{ fontSize: '2rem', mb: 1.5 }}>🍢</Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", mb: 1 }}>
                                {isEn ? '1. The Grazing Method' : '一、點單份量分享吃法'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.7, flexGrow: 1 }}>
                                {isEn
                                    ? 'Order one portion per stall and share with friends. This allows you to taste 6-8 iconic dishes in a single evening without getting overly full on your first stop.'
                                    : '夜市小吃種類繁多，切忌在第一攤就點滿主食！老饕習慣「每攤只點一份招牌分著吃」，一晚輕鬆解鎖 6~8 家排隊名店。'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3.5,
                                height: '100%',
                                borderRadius: '20px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #EAE5DD',
                                boxShadow: '0 4px 18px rgba(28, 25, 23, 0.04)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{ fontSize: '2rem', mb: 1.5 }}>🌆</Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", mb: 1 }}>
                                {isEn ? '2. The 17:30 Golden Hour' : '二、傍晚開檔黃金時段'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.7, flexGrow: 1 }}>
                                {isEn
                                    ? 'Arrive between 17:30 and 18:30. Stalls have just set up with their freshest ingredients, queues are breezy, and you can stroll comfortably before peak crowds hit.'
                                    : '傍晚 17:30 ~ 18:30 為人潮與備料黃金交會點。攤商食材最新鮮現炸現烤、排隊動線最順暢，夜風徐徐，漫步體感最舒適。'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3.5,
                                height: '100%',
                                borderRadius: '20px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #EAE5DD',
                                boxShadow: '0 4px 18px rgba(28, 25, 23, 0.04)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{ fontSize: '2rem', mb: 1.5 }}>📱</Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif", mb: 1 }}>
                                {isEn ? '3. Seamless Cash & Mobile Pay' : '三、鈔票零錢與條碼雙持'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.7, flexGrow: 1 }}>
                                {isEn
                                    ? 'Keep crisp NT$100 bills and NT$50 coins accessible for traditional stalls, and use LINE Pay or JKOPay for larger flagship shops to skip counting change.'
                                    : '傳統老攤偏好百元現鈔與 50 元硬幣；年輕名店與飲料攤則多支援 LINE Pay 與街口支付。雙管齊下付款免等零錢！'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* 管理員後台捷徑浮動條 (僅管理員可見) */}
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
                                {isEn ? 'Administrator Control Notice' : '管理員後台快捷服務'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#777' }}>
                                {isEn ? 'You have administrative rights to manage night markets, notices, and reviews.' : '您具有管理權限，可在此新增夜市資料、發佈活動公告與檢視遊客回饋。'}
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
                            {isEn ? '👥 Today\'s Visitors:' : '👥 今日造訪人數：'}
                        </Typography>
                        <Chip
                            label={`${(analytics.today?.uv || 0).toLocaleString()} ${isEn ? 'visitors' : '人'}`}
                            size="small"
                            sx={{ backgroundColor: '#FEF2F2', color: '#B91C1C', fontWeight: 800 }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 700 }}>
                            {isEn ? '📈 Today\'s Views:' : '📈 今日總瀏覽量：'}
                        </Typography>
                        <Chip
                            label={`${(analytics.today?.pv || 0).toLocaleString()} ${isEn ? 'views' : '次'}`}
                            size="small"
                            sx={{ backgroundColor: '#FFFBEB', color: '#B45309', fontWeight: 800 }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 700 }}>
                            {isEn ? '🌐 Total Views:' : '🌐 累積總瀏覽量：'}
                        </Typography>
                        <Chip
                            label={`${(analytics.totalPv || 0).toLocaleString()} ${isEn ? 'views' : '次'}`}
                            size="small"
                            sx={{ backgroundColor: '#ECFDF5', color: '#047857', fontWeight: 800 }}
                        />
                    </Box>
                </Box>
            )}

            {/* 6. 台灣夜市精神文化頁尾小語 */}
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