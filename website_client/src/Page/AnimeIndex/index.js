import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export default function AnimeIndex() {
    return (
        <Box
            sx={{
                minHeight: '75vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 680,
                    width: '100%',
                    p: { xs: 4, md: 6 },
                    borderRadius: '24px',
                    background: 'linear-gradient(145deg, #FFF9F2 0%, #FFF 100%)',
                    border: '2px solid #F0E2D0',
                    boxShadow: '0 12px 40px rgba(167, 29, 29, 0.12)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* 頂部紅燈籠圖標 */}
                <Box sx={{ fontSize: '4.5rem', mb: 2 }}>
                    🏮
                </Box>

                <Box sx={{ display: 'inline-flex', mb: 2 }}>
                    <Chip
                        label="台灣道地夜市生活指南"
                        sx={{
                            backgroundColor: '#C62828',
                            color: '#FFF',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            px: 1,
                        }}
                    />
                </Box>

                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 900,
                        color: '#2C2622',
                        mb: 2,
                        fontSize: { xs: '2rem', md: '2.6rem' },
                        letterSpacing: '0.03em',
                    }}
                >
                    夜市好好行
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        lineHeight: 1.8,
                        fontSize: '1.05rem',
                        mb: 4,
                        maxWidth: 480,
                        mx: 'auto',
                    }}
                >
                    走遍全台香氣四溢的街巷，尋訪人氣排隊名店、道地銅板小吃與捷運交通全攻略。今晚，就和我們一起逗陣迺夜市！
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    href="/index"
                    sx={{
                        background: 'linear-gradient(135deg, #C62828 0%, #E65100 100%)',
                        color: '#FFF',
                        fontWeight: 900,
                        fontSize: '1.15rem',
                        py: 1.5,
                        px: 5,
                        borderRadius: '12px',
                        boxShadow: '0 6px 20px rgba(198, 40, 40, 0.35)',
                        textTransform: 'none',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #A71D1D 0%, #D84315 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px rgba(198, 40, 40, 0.45)',
                        },
                        transition: 'all 0.25s ease',
                    }}
                >
                    立即進入逛夜市 🏮
                </Button>

                <Box sx={{ mt: 4, pt: 3, borderTop: '1px dashed #E5D5C5' }}>
                    <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                        台北士林 ‧ 台中逢甲 ‧ 台南花園 ‧ 高雄六合 全台連線收錄
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}