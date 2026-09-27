import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CampaignIcon from '@mui/icons-material/Campaign';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useLanguage } from '../../Context/LanguageContext';

/**
 * 廣告與商業贊助推廣版位組件 (AdBanner)
 * 支援多種版型：'leaderboard' (寬橫幅), 'in-feed' (列表卡片), 'strip' (輕量長條), 'sidebar' (側欄矩形)
 * 遵循 Google AdSense 與數位廣告法規，清晰標示「贊助商內容 / Sponsored」
 */
export default function AdBanner({
    variant = 'leaderboard',
    slotId = 'default-ad-slot',
    title,
    description,
    ctaText,
    linkUrl,
    imageUrl,
    sponsorName
}) {
    const { lang } = useLanguage();
    const isEn = lang === 'en';

    // 預設合作招商內容（當前未放置第三方付費廣告時的優雅展示）
    const defaultData = {
        title: isEn
            ? 'Official Brand Partnership & Ad Placement'
            : '🏮 台灣夜市好好行 ‧ 品牌聯名與在地廣告合作席位',
        description: isEn
            ? 'Reach over 50,000+ local foodies and international travelers monthly. Ideal for craft beverages, souvenirs, tourism transit & hotels.'
            : '月觸及數萬名台灣熱情吃貨與海外自由行旅客！非常適合手搖茶飲、在地伴手禮、觀光包車、住宿飯店推廣聯名。',
        cta: isEn ? 'Inquire for Placement →' : '廣告刊登與商務洽詢 →',
        sponsor: isEn ? 'Official Sponsor' : '官方合作推廣',
        link: '/feedback'
    };

    const finalTitle = title || defaultData.title;
    const finalDesc = description || defaultData.description;
    const finalCta = ctaText || defaultData.cta;
    const finalLink = linkUrl || defaultData.link;
    const finalSponsor = sponsorName || defaultData.sponsor;

    // 1. Strip 輕量通欄條 (Compact Promo Strip)
    if (variant === 'strip') {
        return (
            <Paper
                elevation={0}
                data-ad-slot={slotId}
                sx={{
                    my: 3,
                    p: 1.5,
                    px: { xs: 2, sm: 3 },
                    borderRadius: '14px',
                    background: 'linear-gradient(90deg, #FFFBEB 0%, #FEF3C7 100%)',
                    border: '1px solid #FDE68A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1.5,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flex: 1, minWidth: 260 }}>
                    <Chip
                        label={isEn ? 'SPONSORED' : '贊助推薦'}
                        size="small"
                        sx={{ bgcolor: '#D97706', color: '#FFF', fontWeight: 800, fontSize: '0.68rem', height: 20 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#92400E', fontSize: '0.88rem' }}>
                        {finalTitle}
                    </Typography>
                </Box>
                <Button
                    size="small"
                    href={finalLink}
                    endIcon={<OpenInNewIcon sx={{ fontSize: '0.9rem !important' }} />}
                    sx={{ color: '#B45309', fontWeight: 800, textTransform: 'none', p: 0, '&:hover': { bgcolor: 'transparent', color: '#78350F' } }}
                >
                    {finalCta}
                </Button>
            </Paper>
        );
    }

    // 2. In-feed 列表原生贊助卡片 (Native Card for Grid/Lists)
    if (variant === 'in-feed') {
        return (
            <Paper
                elevation={0}
                data-ad-slot={slotId}
                sx={{
                    height: '100%',
                    borderRadius: '18px',
                    p: 3,
                    backgroundColor: '#FFFFFF',
                    border: '1.5px dashed #D6CEC2',
                    boxShadow: '0 2px 12px rgba(28, 25, 23, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        borderColor: '#B91C1C',
                        boxShadow: '0 8px 24px rgba(185, 28, 28, 0.08)'
                    }
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Chip
                            label={isEn ? 'SPONSORED SPOT' : '商業推廣席位'}
                            size="small"
                            sx={{ bgcolor: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', fontWeight: 800, fontSize: '0.7rem' }}
                        />
                        <Typography variant="caption" sx={{ color: '#999', fontSize: '0.72rem' }}>
                            {finalSponsor}
                        </Typography>
                    </Box>

                    {imageUrl && (
                        <Box sx={{ width: '100%', height: 160, borderRadius: '12px', overflow: 'hidden', mb: 2 }}>
                            <img src={imageUrl} alt={finalTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                    )}

                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', mb: 1, fontFamily: "'Noto Serif TC', serif" }}>
                        {finalTitle}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.6, mb: 2 }}>
                        {finalDesc}
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    href={finalLink}
                    fullWidth
                    sx={{
                        borderColor: '#EAE5DD',
                        color: '#B91C1C',
                        fontWeight: 800,
                        borderRadius: '10px',
                        textTransform: 'none',
                        '&:hover': { borderColor: '#B91C1C', bgcolor: '#FEF2F2' }
                    }}
                >
                    {finalCta}
                </Button>
            </Paper>
        );
    }

    // 3. Leaderboard 寬幅旗艦大橫幅 (Default: Full-Width Billboard)
    return (
        <Paper
            elevation={0}
            data-ad-slot={slotId}
            sx={{
                my: 5,
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: '22px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%)',
                border: '1px solid #EAE5DD',
                boxShadow: '0 4px 20px rgba(28, 25, 23, 0.04)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* 右上角優雅廣告識別標籤 (符合 Google AdSense / 數位廣告揭露規範) */}
            <Box sx={{ position: 'absolute', top: 12, right: 14 }}>
                <Chip
                    label={isEn ? 'SPONSORED' : '贊助廣告席位'}
                    size="small"
                    sx={{
                        bgcolor: 'rgba(28, 25, 23, 0.06)',
                        color: '#78716C',
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        height: 20
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.2, maxWidth: 820 }}>
                    <Box sx={{
                        width: 46,
                        height: 46,
                        borderRadius: '12px',
                        backgroundColor: '#FEF2F2',
                        color: '#B91C1C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.3
                    }}>
                        <CampaignIcon sx={{ fontSize: '1.6rem' }} />
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1C1917', fontFamily: "'Noto Serif TC', serif" }}>
                                {finalTitle}
                            </Typography>
                            <Chip
                                label={finalSponsor}
                                size="small"
                                sx={{ bgcolor: '#FEF3C7', color: '#B45309', fontWeight: 800, fontSize: '0.7rem', height: 20 }}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#57534E', lineHeight: 1.65 }}>
                            {finalDesc}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flexShrink: 0, width: { xs: '100%', sm: 'auto' } }}>
                    <Button
                        variant="contained"
                        href={finalLink}
                        endIcon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />}
                        className="tw-btn-primary"
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                            px: 3,
                            py: 1,
                            borderRadius: '12px',
                            fontWeight: 800,
                            boxShadow: '0 4px 14px rgba(185, 28, 28, 0.25)'
                        }}
                    >
                        {finalCta}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
