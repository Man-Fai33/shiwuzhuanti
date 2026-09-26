import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import helper from '../Helper/helper';

export default function SignIn() {
    if (localStorage.getItem('user') !== null) {
        window.location.href = '/index';
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email.trim() || !password.trim()) {
            setErrorMessage('請輸入電子信箱與密碼！');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setErrorMessage('請輸入正確的電子郵件格式（例如：user@example.com）');
            return;
        }

        setLoading(true);
        try {
            const res = await helper.helper.AsyncUserByEmailPass(email.trim(), password.trim());
            if (res && res.status === 'success' && res.user) {
                localStorage.setItem('user', JSON.stringify(res.user));
                window.location.href = '/index';
            } else {
                setErrorMessage('帳號或密碼輸入錯誤，請重新確認！');
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrorMessage('登入時發生錯誤，請稍後再試。');
        } finally {
            setLoading(false);
        }
    };

    // 一鍵填入測試帳號（貼心的友善功能）
    const fillAdmin = () => {
        setEmail('admin@example.com');
        setPassword('admin');
        setErrorMessage('');
    };

    const fillUser = () => {
        setEmail('user@example.com');
        setPassword('user123');
        setErrorMessage('');
    };

    return (
        <Box
            sx={{
                minHeight: '75vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 440,
                    width: '100%',
                    p: { xs: 3, sm: 5 },
                    borderRadius: '20px',
                    backgroundColor: '#FFF',
                    border: '1px solid #EFE5D8',
                    boxShadow: '0 8px 30px rgba(44, 38, 34, 0.08)',
                }}
            >
                {/* 頂部標誌 */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ fontSize: '3rem', mb: 1 }}>🏮</Box>
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 900, color: '#C62828' }}>
                        歡迎回到夜市好好行
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#777', mt: 0.5 }}>
                        登入探索更多在地美食與收藏清單
                    </Typography>
                </Box>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2.5, borderRadius: '8px' }}>
                        {errorMessage}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="電子郵件信箱"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="密碼"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        className="tw-btn-primary"
                        sx={{ py: 1.4, fontSize: '1.05rem', mb: 2 }}
                    >
                        {loading ? '登入中...' : '立即登入 🏮'}
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 3 }}>
                        <Link href="/signup" variant="body2" sx={{ color: '#C62828', fontWeight: 700, textDecoration: 'none' }}>
                            還沒有帳號？點此免費註冊新帳號
                        </Link>
                    </Box>

                    {/* 快捷測試帳號提示 */}
                    <Divider sx={{ my: 2 }}>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                            快速體驗測試帳號
                        </Typography>
                    </Divider>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Chip
                            label="🔑 填入管理員 (admin)"
                            size="small"
                            onClick={fillAdmin}
                            sx={{ backgroundColor: '#FFF3E0', color: '#E65100', fontWeight: 800, cursor: 'pointer' }}
                        />
                        <Chip
                            label="👤 填入一般會員 (user)"
                            size="small"
                            onClick={fillUser}
                            sx={{ backgroundColor: '#F5EFE6', color: '#5D4037', fontWeight: 800, cursor: 'pointer' }}
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}