import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import helper from '../Page/Helper/helper';

export default function ImagePickerDialog({
    open,
    onClose,
    onSelect,
    initialQuery = '',
    type = 'food', // 'food' or 'shop'
    title = '🌐 挑選網路高清照片'
}) {
    const [query, setQuery] = useState(initialQuery);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState('');

    const fetchImages = async (searchTerm) => {
        setLoading(true);
        try {
            let res;
            if (type === 'shop') {
                res = await helper.helper.AsyncShopSearchImages(searchTerm);
            } else {
                res = await helper.helper.AsyncFoodSearchImages(searchTerm);
            }
            if (res && res.status === 'success' && Array.isArray(res.images)) {
                setImages(res.images);
            }
        } catch (e) {
            console.error('Fetch images error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            setQuery(initialQuery);
            setSelectedUrl('');
            fetchImages(initialQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, initialQuery]);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        fetchImages(query);
    };

    const handleConfirm = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    p: 1,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AutoAwesomeIcon sx={{ color: '#D97706' }} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917' }}>
                        {title}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: '#9CA3AF' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 2.5 }}>
                {/* 搜尋條 */}
                <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder={type === 'shop' ? '輸入攤位特色或名稱搜尋照片（例如：雞排、滷味、夜市攤）' : '輸入美食名稱搜尋（例如：蚵仔煎、珍珠奶茶、雞排）'}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#9CA3AF' }} />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '12px' }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            borderRadius: '12px',
                            px: 3,
                            bgcolor: '#B91C1C',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            '&:hover': { bgcolor: '#991B1B' }
                        }}
                    >
                        搜尋圖片
                    </Button>
                </Box>

                {/* 提示語 */}
                <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mb: 2 }}>
                    💡 系統已自動從網際網路大數據與維基百科即時抓取候選高清美食照片，請點選任一張作為代表圖：
                </Typography>

                {/* 圖片預覽網格 */}
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                        <CircularProgress size={36} sx={{ color: '#B91C1C', mb: 2 }} />
                        <Typography variant="body2" sx={{ color: '#78716C', fontWeight: 600 }}>
                            正在自網路大數據撈取高解析度美食照片...
                        </Typography>
                    </Box>
                ) : images.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                            查無相符網路圖片，請嘗試換個關鍵字搜尋
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {images.map((img, idx) => {
                            const isSelected = selectedUrl === img.url;
                            return (
                                <Grid item xs={12} sm={6} md={4} key={idx}>
                                    <Box
                                        onClick={() => setSelectedUrl(img.url)}
                                        sx={{
                                            position: 'relative',
                                            borderRadius: '14px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: isSelected ? '3px solid #B91C1C' : '2px solid transparent',
                                            boxShadow: isSelected ? '0 4px 14px rgba(185, 28, 28, 0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                                            }
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={img.url}
                                            alt={img.title || `照片 #${idx + 1}`}
                                            sx={{
                                                width: '100%',
                                                height: '140px',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600';
                                            }}
                                        />

                                        {/* 標籤 */}
                                        <Box
                                            sx={{
                                                p: 1,
                                                bgcolor: '#FFFFFF',
                                                borderTop: '1px solid #F3F4F6',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#374151',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    maxWidth: '70%'
                                                }}
                                            >
                                                {img.title || `推薦照 #${idx + 1}`}
                                            </Typography>
                                            {img.source && (
                                                <Chip
                                                    label={img.source}
                                                    size="small"
                                                    sx={{ fontSize: '0.65rem', height: '18px', bgcolor: '#F3F4F6' }}
                                                />
                                            )}
                                        </Box>

                                        {/* 選中勾選徽章 */}
                                        {isSelected && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    bgcolor: '#B91C1C',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    p: 0.2
                                                }}
                                            >
                                                <CheckCircleIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 2, px: 2.5 }}>
                <Button onClick={onClose} sx={{ color: '#6B7280', fontWeight: 600 }}>
                    取消
                </Button>
                <Button
                    variant="contained"
                    disabled={!selectedUrl}
                    onClick={handleConfirm}
                    sx={{
                        borderRadius: '10px',
                        px: 3,
                        bgcolor: '#B91C1C',
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#991B1B' }
                    }}
                >
                    確認選擇此照片
                </Button>
            </DialogActions>
        </Dialog>
    );
}
