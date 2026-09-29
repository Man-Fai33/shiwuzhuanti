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
import ExploreIcon from '@mui/icons-material/Explore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';
import AdBanner from '../../Compnonet/AdBanner';

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

    // 篩選邏輯：支援全台灣四大分區與關鍵字檢索
    const filteredMarkets = markets.filter((item) => {
        let matchesRegion = true;
        const r = (item.region || '').toLowerCase();
        const loc = (item.marketLocation || '').toLowerCase();
        const name = (item.name || '').toLowerCase();
        const city = (item.city || '').toLowerCase();

        if (selectedRegion === 'north') {
            matchesRegion = r === 'north' || loc.includes('台北') || loc.includes('新北') || loc.includes('基隆') || loc.includes('桃園') || loc.includes('新竹') || loc === 'tp';
        } else if (selectedRegion === 'central') {
            matchesRegion = r === 'central' || loc.includes('台中') || loc.includes('彰化') || loc.includes('南投') || loc.includes('雲林') || loc === 'tz';
        } else if (selectedRegion === 'south') {
            matchesRegion = r === 'south' || loc.includes('台南') || loc.includes('高雄') || loc.includes('嘉義') || loc.includes('屏東') || loc.includes('墾丁') || loc === 'tn';
        } else if (selectedRegion === 'east') {
            matchesRegion = r === 'east' || loc.includes('宜蘭') || loc.includes('花蓮') || loc.includes('台東') || loc.includes('澎湖') || loc.includes('羅東');
        } else if (selectedRegion === 'taipei') {
            matchesRegion = loc.includes('台北') || loc.includes('新北') || loc.includes('基隆') || loc === 'tp';
        } else if (selectedRegion === 'taichung') {
            matchesRegion = loc.includes('台中') || loc.includes('彰化') || loc === 'tz';
        } else if (selectedRegion === 'tainan') {
            matchesRegion = loc.includes('台南') || loc === 'tn';
        } else if (selectedRegion === 'kaohsiung') {
            matchesRegion = loc.includes('高雄') || loc.includes('屏東');
        }

        let matchesSearch = true;
        if (searchText.trim()) {
            const kw = searchText.trim().toLowerCase();
            const nameen = (item.nameen || '').toLowerCase();
            const brief = (item.brief || '').toLowerCase();
            matchesSearch = name.includes(kw) || nameen.includes(kw) || brief.includes(kw) || loc.includes(kw) || city.includes(kw);
        }

        return matchesRegion && matchesSearch;
    });

    const regions = [
        { id: 'all', label: lang === 'en' ? `All Taiwan (${markets.length})` : `全台灣全部 (${markets.length})` },
        { id: 'north', label: lang === 'en' ? 'Northern Taiwan' : '北部地區 (雙北/基隆/桃竹)' },
        { id: 'central', label: lang === 'en' ? 'Central Taiwan' : '中部地區 (台中/彰化/南投/雲林)' },
        { id: 'south', label: lang === 'en' ? 'Southern Taiwan' : '南部地區 (嘉義/台南/高雄/屏東)' },
        { id: 'east', label: lang === 'en' ? 'Eastern & Islands' : '東部與離島 (宜蘭/花東/澎湖)' },
    ];

    const getRegionBadge = (item) => {
        if (item.city) {
            return lang === 'en' ? (item.cityEn || item.city) : item.city;
        }
        const name = item.name || '';
        const loc = item.marketLocation || '';
        if (name.includes('基隆') || loc.includes('基隆')) return lang === 'en' ? 'Keelung' : '基隆市';
        if (name.includes('台北') || loc.includes('台北') || loc === 'tp') return lang === 'en' ? 'Taipei' : '台北市';
        if (name.includes('新北') || loc.includes('新北') || name.includes('樂華') || name.includes('三和')) return lang === 'en' ? 'New Taipei' : '新北市';
        if (name.includes('中原') || loc.includes('桃園')) return lang === 'en' ? 'Taoyuan' : '桃園市';
        if (name.includes('城隍廟') || loc.includes('新竹')) return lang === 'en' ? 'Hsinchu' : '新竹市';
        if (name.includes('逢甲') || name.includes('一中') || name.includes('旱溪') || loc.includes('台中') || loc === 'tz') return lang === 'en' ? 'Taichung' : '台中市';
        if (name.includes('精誠') || loc.includes('彰化')) return lang === 'en' ? 'Changhua' : '彰化縣';
        if (name.includes('草鞋墩') || loc.includes('南投')) return lang === 'en' ? 'Nantou' : '南投縣';
        if (name.includes('斗六') || loc.includes('雲林')) return lang === 'en' ? 'Yunlin' : '雲林縣';
        if (name.includes('文化路') || loc.includes('嘉義')) return lang === 'en' ? 'Chiayi' : '嘉義市';
        if (name.includes('花園') || name.includes('大東') || name.includes('武聖') || loc.includes('台南') || loc === 'tn') return lang === 'en' ? 'Tainan' : '台南市';
        if (name.includes('六合') || name.includes('瑞豐') || loc.includes('高雄')) return lang === 'en' ? 'Kaohsiung' : '高雄市';
        if (name.includes('墾丁') || loc.includes('屏東')) return lang === 'en' ? 'Pingtung' : '屏東縣';
        if (name.includes('羅東') || name.includes('東門') || loc.includes('宜蘭')) return lang === 'en' ? 'Yilan' : '宜蘭縣';
        if (name.includes('東大門') || loc.includes('花蓮')) return lang === 'en' ? 'Hualien' : '花蓮縣';
        if (name.includes('台東') || loc.includes('台東')) return lang === 'en' ? 'Taitung' : '台東縣';
        if (name.includes('馬公') || name.includes('澎湖') || loc.includes('澎湖')) return lang === 'en' ? 'Penghu' : '澎湖縣';
        return lang === 'en' ? 'Taiwan' : '全台灣';
    };

    return (
        <Box sx={{ pb: 6 }}>
            {/* 標題與簡介 */}
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
                    {lang === 'en' ? 'Taiwan Night Markets Directory' : '全台夜市名錄指南'}
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
                    {t('markets_page_title')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--tw-text-muted, #78716C)', maxWidth: 720 }}>
                    {t('markets_page_desc')} {lang === 'en' ? `(${markets.length} curated destinations across Taiwan)` : `精選全台 ${markets.length} 座必訪觀光夜市。`}
                </Typography>
            </Box>

            {/* 旅人導覽捷徑 Banner */}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '12px',
                            backgroundColor: '#FEF2F2',
                            color: 'var(--tw-terracotta, #B91C1C)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <ExploreIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 0.2 }}>
                            {lang === 'en' ? 'Essential Traveler Guide 101' : '旅人行前重點指引'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'var(--tw-text-muted, #78716C)' }}>
                            {lang === 'en'
                                ? 'MRT connections, cashless & cash etiquette, and ordering phrases.'
                                : '彙整大眾交通直達指引、現金準備與常用點餐常用語彙。'}
                        </Typography>
                    </Box>
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
                    {lang === 'en' ? 'Open Travel Guide →' : '查看完整秘笈 →'}
                </Button>
            </Paper>

            {/* 觀光交通與在地夥伴贊助推廣席位 (Transit & Partnership Promo) */}
            <AdBanner
                slotId="nightmarket-top-strip"
                variant="strip"
                title={lang === 'en' ? '🚕 Taiwan Transit Partner: Easy night market transfers & High Speed Rail discounts' : '🚕 觀光交通贊助夥伴：高鐵夜市接駁、市區計程車與包車旅遊專屬乘車優惠'}
                ctaText={lang === 'en' ? 'Check Deals →' : '了解優惠 →'}
                linkUrl="/feedback"
            />

            {/* 篩選與搜尋列 */}
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
                    {/* 地區切換按鈕 */}
                    <Grid item xs={12} lg={8}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {regions.map((r) => {
                                const isActive = selectedRegion === r.id;
                                return (
                                    <Chip
                                        key={r.id}
                                        label={r.label}
                                        clickable
                                        onClick={() => setSelectedRegion(r.id)}
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

                    {/* 關鍵字搜尋 */}
                    <Grid item xs={12} lg={4}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder={t('market_search_placeholder')}
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
                                            onClick={handleClearSearch}
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

                {/* 搜尋中提示標籤 */}
                {(searchText || selectedRegion !== 'all') && (
                    <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px dashed var(--tw-border-subtle, #EAE5DD)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)' }}>
                            {lang === 'en' ? `Matches: ` : `符合條件的夜市：`}
                            <strong style={{ color: 'var(--tw-terracotta, #B91C1C)' }}>{filteredMarkets.length}</strong>
                            {searchText && ` (${lang === 'en' ? 'Keyword' : '關鍵字'}：“${searchText}”）`}
                        </Typography>
                        <Button size="small" onClick={handleClearSearch} sx={{ color: 'var(--tw-terracotta, #B91C1C)', fontWeight: 700, textTransform: 'none' }}>
                            {lang === 'en' ? 'Reset Filters' : '重設篩選'}
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
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600';
                                        }}
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
                                            backgroundColor: 'rgba(28, 25, 23, 0.75)',
                                            backdropFilter: 'blur(8px)',
                                            color: '#FBBF24',
                                            px: 1.2,
                                            py: 0.4,
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            letterSpacing: '0.02em',
                                        }}
                                    >
                                        ★ {item.rating || 4.8}
                                    </Box>

                                    {/* 地區徽章 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                                            backdropFilter: 'blur(8px)',
                                            color: 'var(--tw-deep-charcoal, #1C1917)',
                                            fontWeight: 700,
                                            fontSize: '0.78rem',
                                            px: 1.2,
                                            py: 0.4,
                                            borderRadius: '20px',
                                            border: '1px solid rgba(0,0,0,0.06)',
                                        }}
                                    >
                                        {getRegionBadge(item)}
                                    </Box>
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 0.5, lineHeight: 1.3, fontSize: '1.2rem' }}>
                                        {lang === 'en' ? (item.nameen || item.name) : item.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'var(--tw-text-muted, #78716C)', display: 'block', mb: 1.5, letterSpacing: '0.02em' }}>
                                        {lang === 'en' ? (item.marketLocation || 'Taiwan') : item.nameen}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.8, color: 'var(--tw-text-muted, #78716C)', mb: 1, fontSize: '0.85rem' }}>
                                        <LocationOnIcon fontSize="small" sx={{ color: 'var(--tw-terracotta, #B91C1C)', mt: 0.2, flexShrink: 0 }} />
                                        <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', lineHeight: 1.4, fontSize: '0.85rem' }}>
                                            {item.marketLocation || (lang === 'en' ? 'Taiwan night market cluster' : '在地熱門夜市聚落')}
                                        </Typography>
                                    </Box>

                                    {item.positionGuidelines && (
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.8, color: '#15803D', mb: 1, fontSize: '0.82rem' }}>
                                            <DirectionsSubwayIcon fontSize="small" sx={{ mt: 0.2, flexShrink: 0 }} />
                                            <Typography variant="caption" sx={{ color: '#15803D', fontWeight: 600, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {item.positionGuidelines}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* 營運時間提醒 */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: 'var(--tw-text-muted, #78716C)', mb: 1.5, fontSize: '0.8rem', minWidth: 0 }}>
                                        <CalendarMonthIcon fontSize="small" sx={{ flexShrink: 0, color: 'var(--tw-amber, #D97706)' }} />
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: (item.openDays && !item.openDays.includes('每日')) ? 'var(--tw-terracotta, #B91C1C)' : 'var(--tw-text-muted, #78716C)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {item.openDays || (lang === 'en' ? 'Daily (17:30 - 00:00)' : '每日營業 (17:30 - 00:00)')}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#57534E',
                                            lineHeight: 1.6,
                                            fontSize: '0.88rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            flexGrow: 1,
                                        }}
                                    >
                                        {item.brief || item.introduction}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ p: 2.5, pt: 0 }}>
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
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px', backgroundColor: '#FFF', border: '1px dashed var(--tw-border-subtle, #EAE5DD)' }}>
                    <StorefrontIcon sx={{ fontSize: 56, color: '#D6D3D1', mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 1 }}>
                        {t('no_markets_found')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mb: 2.5 }}>
                        {lang === 'en' ? 'Try clearing your search term or selecting another region.' : '您可以嘗試清除搜尋關鍵字或選擇其他地區分類。'}
                    </Typography>
                    <Button
                        className="tw-btn-primary"
                        onClick={handleClearSearch}
                    >
                        {t('clear_filter')}
                    </Button>
                </Paper>
            )}
        </Box>
    );
}