import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    Chip,
    InputAdornment
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';
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

    // 信箱安全驗證狀態 (Email Verification States)
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [verifyingCode, setVerifyingCode] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [devOtpHint, setDevOtpHint] = useState("");

    // 60 秒冷卻倒數計時器
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // 發送 6 位數信箱驗證碼
    const handleSendCode = async () => {
        if (!email.trim() || !email.includes('@') || !email.includes('.')) {
            setError(lang === 'en' ? 'Please enter a valid email address before sending code' : '請先輸入有效的電子郵件信箱');
            return;
        }
        setError("");
        setSuccessMsg("");
        setSendingCode(true);

        try {
            const res = await helper.helper.AsyncSendVerificationCode(email.trim(), 'signup');
            if (res && res.status === "success") {
                setIsCodeSent(true);
                setCountdown(60);
                setSuccessMsg(res.message || (lang === 'en' ? 'Verification code sent to your email!' : '驗證碼已發送至您的電子信箱！'));
                if (res.devCode) {
                    setDevOtpHint(res.devCode);
                    setVerificationCode(res.devCode); // 開發環境自動填入加速體驗
                }
            } else {
                setError(res?.message || (lang === 'en' ? 'Failed to send verification code. Email might already be registered.' : '發送驗證碼失敗，此信箱可能已被註冊'));
            }
        } catch (err) {
            setError(lang === 'en' ? 'Network error while sending verification code' : '發送驗證碼網路連線異常，請確認後端伺服器運行');
        } finally {
            setSendingCode(false);
        }
    };

    // 單獨核對信箱驗證碼
    const handleVerifyCode = async () => {
        if (!verificationCode.trim()) {
            setError(lang === 'en' ? 'Please enter the 6-digit verification code' : '請輸入 6 位數驗證碼');
            return;
        }
        setError("");
        setVerifyingCode(true);

        try {
            const res = await helper.helper.AsyncVerifyCode(email.trim(), verificationCode.trim(), 'signup');
            if (res && res.status === "success") {
                setIsEmailVerified(true);
                setSuccessMsg(lang === 'en' ? 'Email verified successfully! You can now finish registration.' : '電子信箱驗證成功！請繼續填寫資料完成註冊。');
            } else {
                setError(res?.message || (lang === 'en' ? 'Verification code invalid or expired' : '驗證碼不正確或已過期'));
            }
        } catch (err) {
            setError(lang === 'en' ? 'Network error while verifying code' : '驗證碼核對網路連線異常');
        } finally {
            setVerifyingCode(false);
        }
    };

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
        if (!isEmailVerified && !verificationCode.trim()) {
            setError(lang === 'en' ? 'Please request and enter your email verification code' : '請先點擊「發送驗證碼」並填寫 6 位數信箱驗證碼');
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
            verificationCode: verificationCode.trim(),
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
                setSuccessMsg(lang === 'en' ? 'Account created & verified! Redirecting to sign in...' : '帳號註冊且信箱驗證成功！即將前往登入頁面...');
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
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '16px',
                            backgroundColor: 'rgba(185, 28, 28, 0.08)',
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

                        {/* 電子郵件輸入框 */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                label={lang === 'en' ? 'Email Address' : '電子郵件 (帳號)'}
                                placeholder="name@example.com"
                                value={email}
                                disabled={isEmailVerified}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsEmailVerified(false);
                                    setIsCodeSent(false);
                                }}
                                InputProps={{
                                    endAdornment: isEmailVerified ? (
                                        <InputAdornment position="end">
                                            <Chip
                                                icon={<CheckCircleOutlineIcon style={{ color: '#059669' }} />}
                                                label={lang === 'en' ? 'Verified' : '信箱已驗證'}
                                                size="small"
                                                sx={{ backgroundColor: '#ECFDF5', color: '#059669', fontWeight: 700 }}
                                            />
                                        </InputAdornment>
                                    ) : null
                                }}
                            />
                        </Grid>

                        {/* 信箱 6 位數安全驗證碼輸入與發送區塊 */}
                        <Grid item xs={12}>
                            <Box sx={{ p: 2, borderRadius: '14px', backgroundColor: 'var(--tw-surface-warm, #FAF8F5)', border: '1px solid var(--tw-border-subtle, #EAE5DD)' }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--tw-deep-charcoal, #1C1917)', display: 'block', mb: 1.5 }}>
                                    🛡️ {lang === 'en' ? 'Email Security Verification' : '信箱安全身份驗證'}
                                </Typography>

                                <Grid container spacing={1.5} alignItems="center">
                                    <Grid item xs={12} sm={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            label={lang === 'en' ? '6-Digit Code' : '6 位數信箱驗證碼'}
                                            placeholder="123456"
                                            value={verificationCode}
                                            disabled={isEmailVerified}
                                            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            inputProps={{ maxLength: 6, style: { letterSpacing: '4px', fontWeight: 700 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={5}>
                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="outlined"
                                            disabled={sendingCode || countdown > 0 || isEmailVerified}
                                            onClick={handleSendCode}
                                            startIcon={sendingCode ? <CircularProgress size={16} /> : <SendIcon sx={{ fontSize: 16 }} />}
                                            sx={{
                                                borderColor: 'var(--tw-terracotta, #B91C1C)',
                                                color: 'var(--tw-terracotta, #B91C1C)',
                                                fontWeight: 700,
                                                '&:hover': {
                                                    borderColor: '#991B1B',
                                                    backgroundColor: 'rgba(185, 28, 28, 0.04)'
                                                }
                                            }}
                                        >
                                            {countdown > 0
                                                ? `${countdown}s ${lang === 'en' ? 'Resend' : '後可重發'}`
                                                : isCodeSent
                                                    ? (lang === 'en' ? 'Resend Code' : '重新發送')
                                                    : (lang === 'en' ? 'Send Code' : '發送驗證碼')}
                                        </Button>
                                    </Grid>
                                </Grid>

                                {devOtpHint && (
                                    <Box sx={{ mt: 1.5, p: 1, borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.8rem' }}>
                                        💡 <strong>開發測試提示：</strong> 未設定 SMTP 伺服器，驗證碼已自動模擬填入：<strong>{devOtpHint}</strong>
                                    </Box>
                                )}

                                {!isEmailVerified && isCodeSent && (
                                    <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            disabled={verifyingCode || !verificationCode}
                                            onClick={handleVerifyCode}
                                            startIcon={verifyingCode ? <CircularProgress size={14} color="inherit" /> : <MarkEmailReadIcon sx={{ fontSize: 16 }} />}
                                            sx={{
                                                backgroundColor: 'var(--tw-terracotta, #B91C1C)',
                                                fontWeight: 700,
                                                '&:hover': { backgroundColor: '#991B1B' }
                                            }}
                                        >
                                            {lang === 'en' ? 'Verify Code Now' : '立即核對驗證碼'}
                                        </Button>
                                    </Box>
                                )}
                            </Box>
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
                        sx={{
                            mt: 4,
                            mb: 2.5,
                            py: 1.5,
                            borderRadius: '12px',
                            backgroundColor: 'var(--tw-terracotta, #B91C1C)',
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            letterSpacing: '0.5px',
                            boxShadow: '0 4px 14px rgba(185, 28, 28, 0.25)',
                            '&:hover': {
                                backgroundColor: '#991B1B',
                                boxShadow: '0 6px 20px rgba(185, 28, 28, 0.35)'
                            }
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            lang === 'en' ? 'Complete Registration' : '完成註冊並綁定信箱'
                        )}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)' }}>
                            {lang === 'en' ? 'Already have an account?' : '已經有台灣夜市通帳號？'}{' '}
                            <Link
                                href="/signin"
                                underline="hover"
                                sx={{
                                    color: 'var(--tw-terracotta, #B91C1C)',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                {lang === 'en' ? 'Sign in directly' : '立即登入'}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}