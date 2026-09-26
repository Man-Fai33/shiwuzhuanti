import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Skeleton from '@mui/material/Skeleton';

// Icons
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

// Package: dayjs for elegant date formatting
import dayjs from 'dayjs';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function BulletinBoard() {
    const { lang } = useLanguage();
    const [bulletins, setBulletins] = useState([]);
    const [selectedBulletin, setSelectedBulletin] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBulletins() {
            setLoading(true);
            try {
                const res = await helper.helper.AsyncBulletins();
                if (res && res.status === 'success' && Array.isArray(res.bulletin)) {
                    setBulletins(res.bulletin);
                }
            } catch (err) {
                console.error('Failed to load bulletins:', err);
            } finally {
                setLoading(false);
            }
        }
        loadBulletins();
    }, []);

    const handleOpenDialog = (item) => {
        setSelectedBulletin(item);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedBulletin(null);
    };

    const formatDate = (dateVal) => {
        if (!dateVal) return lang === 'en' ? 'Recent' : '近期公告';
        const d = dayjs(dateVal);
        if (d.isValid()) {
            return lang === 'en' ? d.format('MMM DD, YYYY') : d.format('YYYY年MM月DD日');
        }
        return String(dateVal);
    };

    return (
        <Box sx={{ pb: 6 }}>
            {/* 標題與簡介 */}
            <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
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
                    {lang === 'en' ? 'Announcements & Updates' : '即時公告與活動訊息'}
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
                    {lang === 'en' ? 'Night Market Events & Official Notices' : '夜市活動與即時公告'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--tw-text-muted, #78716C)', maxWidth: 720 }}>
                    {lang === 'en' ? 'Live updates on operating schedules, cultural festivals, special discounts, and market regulations across Taiwan.' : '即時發佈全台各夜市營運日程、節慶活動、市集規範與好康優惠資訊。'}
                </Typography>
            </Box>

            {/* 載入骨架屏 Skeleton Loading */}
            {loading ? (
                <Grid container spacing={3.5}>
                    {[1, 2, 3].map((n) => (
                        <Grid item xs={12} sm={6} md={4} key={n}>
                            <Card className="tw-card" sx={{ height: '100%' }}>
                                <Skeleton variant="rectangular" height={180} />
                                <Box sx={{ p: 2 }}>
                                    <Skeleton variant="text" width="40%" height={24} />
                                    <Skeleton variant="text" width="90%" height={32} />
                                    <Skeleton variant="text" width="100%" height={20} />
                                    <Skeleton variant="text" width="70%" height={20} />
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : bulletins.length > 0 ? (
                <Grid container spacing={3.5}>
                    {bulletins.map((item, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
                            <Card
                                className="tw-card"
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleOpenDialog(item)}
                            >
                                {item.imgUrl ? (
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={item.imgUrl}
                                        alt={item.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: 140,
                                            backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                            borderBottom: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--tw-terracotta, #B91C1C)',
                                        }}
                                    >
                                        <CampaignIcon sx={{ fontSize: 44, opacity: 0.8 }} />
                                    </Box>
                                )}

                                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: 'var(--tw-text-muted, #78716C)', mb: 1.5, fontSize: '0.85rem' }}>
                                        <CalendarMonthIcon fontSize="small" sx={{ color: 'var(--tw-amber, #D97706)' }} />
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            {formatDate(item.date)}
                                        </Typography>
                                        <Chip label={item.owner || (lang === 'en' ? 'Management' : '管理處')} size="small" sx={{ ml: 'auto', backgroundColor: 'var(--tw-paper-cream, #FAF8F5)', border: '1px solid var(--tw-border-subtle, #EAE5DD)', fontWeight: 600, borderRadius: '6px' }} />
                                    </Box>

                                    <Typography variant="h6" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', mb: 1, lineHeight: 1.4 }}>
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#57534E',
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {item.context}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ p: 2.5, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        className="tw-btn-secondary"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenDialog(item);
                                        }}
                                    >
                                        {lang === 'en' ? 'Read Notice' : '閱讀完整公告'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px', backgroundColor: '#FFF', border: '1px dashed var(--tw-border-subtle, #EAE5DD)' }}>
                    <CampaignIcon sx={{ fontSize: 56, color: '#D6D3D1', mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                        {lang === 'en' ? 'No notices published currently' : '目前暫無發布的公告訊息'}
                    </Typography>
                </Paper>
            )}

            {/* 詳細內容 Dialog 彈窗 */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '20px', p: 1 }
                }}
            >
                {selectedBulletin && (
                    <>
                        {selectedBulletin.imgUrl && (
                            <CardMedia
                                component="img"
                                height="220"
                                image={selectedBulletin.imgUrl}
                                alt={selectedBulletin.title}
                                sx={{ objectFit: 'cover', borderRadius: '14px 14px 0 0' }}
                            />
                        )}
                        <DialogTitle sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)', pt: 2, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{selectedBulletin.title}</span>
                            <Button size="small" onClick={handleCloseDialog} sx={{ minWidth: 'auto', color: '#999' }}>
                                <CloseIcon fontSize="small" />
                            </Button>
                        </DialogTitle>
                        <DialogContent dividers sx={{ borderBottom: 'none' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'var(--tw-text-muted, #78716C)' }}>
                                <CalendarMonthIcon fontSize="small" />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                    {formatDate(selectedBulletin.date)}
                                </Typography>
                                <Chip label={selectedBulletin.owner || (lang === 'en' ? 'Management' : '管理處')} size="small" sx={{ ml: 'auto' }} />
                            </Box>
                            <Typography variant="body1" sx={{ color: '#44403C', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                                {selectedBulletin.context}
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={handleCloseDialog} className="tw-btn-primary" sx={{ px: 3, py: 0.8 }}>
                                {lang === 'en' ? 'Close' : '關閉公告'}
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}
