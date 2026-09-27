import React, { useState } from 'react';
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Alert,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    CircularProgress
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function SignUp() {
    const { lang } = useLanguage();
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [upassword, setUpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ugender, setUgender] = useState(false); // false: 女生, true: 男生
    const [uphone, setUphone] = useState("");
    const [ulocation, setUlocation] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (!uname.trim()) {
            setError(lang === 'en' ? 'Please enter your username or display name' : '請輸入使用者姓名或暱稱');
            return;
        }
        if (!email.trim() || !email.includes('@') || !email.includes('.')) {
            setError(lang === 'en' ? 'Please enter a valid email address' : '請輸入有效的電子郵件信箱');
            return;
        }
        if (!upassword || upassword.length < 4) {
            setError(lang === 'en' ? 'Password must be at least 4 characters long' : '密碼長度至少需要 4 個字元');
            return;
        }
        if (upassword !== confirmPassword) {
            setError(lang === 'en' ? 'Passwords do not match, please verify' : '兩次輸入的密碼不一致，請再次確認');
            return;
        }

        setLoading(true);
        const user = {
            user: {
                username: uname.trim(),
                email: email.trim(),
                password: upassword,
                role: "user",
                phone: uphone.trim() || (lang === 'en' ? 'Not provided' : '未提供'),
                location: ulocation.trim() || (lang === 'en' ? 'Taiwan' : '台灣'),
                gender: ugender,
                introduction: lang === 'en' ? 'Night market street food enthusiast!' : '熱愛台灣夜市小吃的饕客一枚！'
            }
        };

        try {
            const res = await helper.helper.AsyncUserCreate(user);
            if (res && res.status === "success") {
                setSuccessMsg(lang === 'en' ? 'Account created successfully! Redirecting to sign in...' : '註冊成功！即將為您前往登入頁面...');
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 1200);
            } else {
                setError(res?.message || (lang === 'en' ? 'Registration failed. This email may already be in use.' : '註冊失敗，此信箱可能已被註冊或伺服器回應異常'));
            }
        } catch (err) {
            setError(lang === 'en' ? 'Network connection error, please check server status' : '網路連線異常，請確認後端伺服器運行狀態');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: '24px',
                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                    backgroundColor: 'var(--tw-card-white, #FFFFFF)',
                    boxShadow: '0 8px 30px rgba(28, 25, 23, 0.06)'
                }}
            >
                {/* 標題與意象 */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '16px',
                            bgcolor: '#FEF2F2',
                            color: 'var(--tw-terracotta, #B91C1C)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1.5,
                        }}
                    >
                        <PersonAddAlt1Icon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                        {lang === 'en' ? 'Create Your Account' : '加入台灣夜市通'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mt: 0.5 }}>
                        {lang === 'en'
                            ? 'Register to save your favorite street foods and bookmark night markets'
                            : '註冊會員，暢遊全台夜市小吃、收藏私房名單與分享在地食記'}
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
                        {error}
                    </Alert>
                )}

                {successMsg && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: '10px' }}>
                        {successMsg}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label={lang === 'en' ? 'Username / Display Name' : '使用者暱稱 / 姓名'}
                                placeholder={lang === 'en' ? 'e.g. Alex Traveler' : '例如：夜市小當家、王小明'}
                                value={uname}
                                onChange={(e) => setUname(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                label={lang === 'en' ? 'Email Address' : '電子郵件 (帳號)'}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={lang === 'en' ? 'Phone Number (Optional)' : '聯絡電話 (選填)'}
                                placeholder="0912-345-678"
                                value={uphone}
                                onChange={(e) => setUphone(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={lang === 'en' ? 'Region / City (Optional)' : '所在地區 (選填)'}
                                placeholder={lang === 'en' ? 'e.g. Taipei, Taichung' : '例如：台北市、台中市'}
                                value={ulocation}
                                onChange={(e) => setUlocation(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                label={lang === 'en' ? 'Password' : '設定密碼'}
                                placeholder={lang === 'en' ? 'At least 4 characters' : '請輸入至少4位密碼'}
                                value={upassword}
                                onChange={(e) => setUpassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                label={lang === 'en' ? 'Confirm Password' : '確認密碼'}
                                placeholder={lang === 'en' ? 'Re-enter password' : '再次輸入密碼'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ fontSize: '0.9rem', color: 'var(--tw-text-muted, #78716C)' }}>
                                    {lang === 'en' ? 'Gender Salutation' : '性別稱謂'}
                                </FormLabel>
                                <RadioGroup
                                    row
                                    value={ugender ? "male" : "female"}
                                    onChange={(e) => setUgender(e.target.value === "male")}
                                >
                                    <FormControlLabel value="male" control={<Radio sx={{ color: 'var(--tw-terracotta, #B91C1C)', '&.Mui-checked': { color: 'var(--tw-terracotta, #B91C1C)' } }} />} label={lang === 'en' ? 'Mr. / Male' : '先生 / 男生'} />
                                    <FormControlLabel value="female" control={<Radio sx={{ color: 'var(--tw-terracotta, #B91C1C)', '&.Mui-checked': { color: 'var(--tw-terracotta, #B91C1C)' } }} />} label={lang === 'en' ? 'Ms. / Female' : '女士 / 女生'} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        className="tw-btn-primary"
                        sx={{
                            mt: 3.5,
                            mb: 2,
                            py: 1.4,
                            fontSize: '1rem',
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : (lang === 'en' ? 'Create Account' : '立即註冊會員')}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)' }}>
                            {lang === 'en' ? 'Already have an account? ' : '已經擁有會員帳號？ '}
                            <Link href="/signin" underline="hover" sx={{ color: 'var(--tw-terracotta, #B91C1C)', fontWeight: 700 }}>
                                {lang === 'en' ? 'Sign In →' : '立即登入 →'}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}