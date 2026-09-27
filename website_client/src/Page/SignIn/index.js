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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function SignIn() {
    const { lang } = useLanguage();

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
            setErrorMessage(lang === 'en' ? 'Please enter your email and password.' : '請輸入電子信箱與密碼！');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setErrorMessage(lang === 'en' ? 'Please enter a valid email format (e.g. user@example.com)' : '請輸入正確的電子郵件格式（例如：user@example.com）');
            return;
        }

        setLoading(true);
        try {
            const res = await helper.helper.AsyncUserByEmailPass(email.trim(), password.trim());
            if (res && res.status === 'success' && res.user) {
                localStorage.setItem('user', JSON.stringify(res.user));
                window.location.href = '/index';
            } else {
                setErrorMessage(lang === 'en' ? 'Incorrect email or password, please check again.' : '帳號或密碼輸入錯誤，請重新確認！');
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrorMessage(lang === 'en' ? 'Login service error, please try again later.' : '登入時發生錯誤，請稍後再試。');
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
                minHeight: '78vh',
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
                    borderRadius: '24px',
                    backgroundColor: 'var(--tw-card-white, #FFFFFF)',
                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                    boxShadow: '0 8px 30px rgba(28, 25, 23, 0.06)',
                }}
            >
                {/* 頂部標誌 */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '16px',
                            backgroundColor: '#FEF2F2',
                            color: 'var(--tw-terracotta, #B91C1C)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1.5,
                        }}
                    >
                        <LockOutlinedIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                        {lang === 'en' ? 'Welcome to Night Market Guide' : '歡迎回到夜市好好行'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mt: 0.5 }}>
                        {lang === 'en' ? 'Sign in to explore street food & saved wishlist' : '登入探索更多在地美食與收藏清單'}
                    </Typography>
                </Box>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px' }}>
                        {errorMessage}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={lang === 'en' ? 'Email Address' : '電子郵件信箱'}
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
                        label={lang === 'en' ? 'Password' : '密碼'}
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
                        sx={{ py: 1.4, fontSize: '1rem', mb: 2 }}
                    >
                        {loading ? (lang === 'en' ? 'Signing in...' : '登入中...') : (lang === 'en' ? 'Sign In' : '立即登入')}
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 3 }}>
                        <Link href="/signup" variant="body2" sx={{ color: 'var(--tw-terracotta, #B91C1C)', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            {lang === 'en' ? "Don't have an account? Sign up now" : '還沒有帳號？點此免費註冊新帳號'}
                        </Link>
                    </Box>

                    {/* 快捷測試帳號提示 */}
                    <Divider sx={{ my: 2 }}>
                        <Typography variant="caption" sx={{ color: 'var(--tw-text-muted, #78716C)' }}>
                            {lang === 'en' ? 'Quick Fill Demo Accounts' : '快速體驗測試帳號'}
                        </Typography>
                    </Divider>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Chip
                            label={lang === 'en' ? 'Demo Admin' : '填入管理員 (admin)'}
                            size="small"
                            onClick={fillAdmin}
                            sx={{
                                backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                color: 'var(--tw-deep-charcoal, #1C1917)',
                                border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                borderRadius: '16px',
                                '&:hover': { backgroundColor: '#F2EDE4' }
                            }}
                        />
                        <Chip
                            label={lang === 'en' ? 'Demo User' : '填入一般會員 (user)'}
                            size="small"
                            onClick={fillUser}
                            sx={{
                                backgroundColor: 'var(--tw-paper-cream, #FAF8F5)',
                                color: 'var(--tw-deep-charcoal, #1C1917)',
                                border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                borderRadius: '16px',
                                '&:hover': { backgroundColor: '#F2EDE4' }
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}