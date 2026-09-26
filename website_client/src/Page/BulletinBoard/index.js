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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 1 }}>
                    <span style={{ fontSize: '2rem' }}>📢</span>
                    <Typography variant="h4" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#C62828' }}>
                        {lang === 'en' ? 'Night Market Events & Official Notices' : '夜市活動與即時公告'}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    {lang === 'en' ? 'Live updates on operating schedules, cultural festivals, special discounts, and market regulations across Taiwan!' : '即時發佈全台各夜市營運日程、節慶踩街活動、市集規範與好康優惠資訊！'}
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
                                            background: 'linear-gradient(135deg, #FFECB3 0%, #FFE082 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '3rem',
                                        }}
                                    >
                                        🏮
                                    </Box>
                                )}

                                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#888', mb: 1.5, fontSize: '0.85rem' }}>
                                        <CalendarMonthIcon fontSize="small" sx={{ color: '#C62828' }} />
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            {formatDate(item.date)}
                                        </Typography>
                                        <Chip label={item.owner || (lang === 'en' ? 'Management' : '管理處')} size="small" sx={{ ml: 'auto', backgroundColor: '#F0EAE1', fontWeight: 700 }} />
                                    </Box>

                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#2C2622', mb: 1, lineHeight: 1.4 }}>
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
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

                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        className="tw-btn-secondary"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenDialog(item);
                                        }}
                                    >
                                        {lang === 'en' ? 'Read Notice' : '閱讀全文公告'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px', backgroundColor: '#FFF', border: '1px dashed #DDD' }}>
                    <CampaignIcon sx={{ fontSize: 60, color: '#CCC', mb: 1.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#666' }}>
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
                    sx: { borderRadius: '16px', p: 1 }
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
                                sx={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                            />
                        )}
                        <DialogTitle sx={{ fontWeight: 900, color: '#C62828', pt: 2, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{selectedBulletin.title}</span>
                            <Button size="small" onClick={handleCloseDialog} sx={{ minWidth: 'auto', color: '#999' }}>
                                <CloseIcon fontSize="small" />
                            </Button>
                        </DialogTitle>
                        <DialogContent dividers sx={{ borderBottom: 'none' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#888' }}>
                                <CalendarMonthIcon fontSize="small" />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                    {formatDate(selectedBulletin.date)}
                                </Typography>
                                <Chip label={selectedBulletin.owner || (lang === 'en' ? 'Management' : '管理處')} size="small" sx={{ ml: 'auto' }} />
                            </Box>
                            <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                                {selectedBulletin.context}
                            </Typography>
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={handleCloseDialog} variant="contained" sx={{ backgroundColor: '#C62828', color: '#FFF', fontWeight: 800, '&:hover': { backgroundColor: '#B71C1C' } }}>
                                {lang === 'en' ? 'Close' : '關閉公告'}
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}
