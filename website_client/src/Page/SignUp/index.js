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
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function SignUp() {
    const { lang } = useLanguage();

    // 流程步驟：1 = 填寫基本資料, 2 = 送出後進行信箱驗證
    const [step, setStep] = useState(1);

    // 用戶資料狀態
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [upassword, setUpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ugender, setUgender] = useState(false); // false: 女生, true: 男生
    const [uphone, setUphone] = useState("");
    const [ulocation, setUlocation] = useState("");

    // 狀態提示與載入
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // 信箱驗證狀態 (Step 2)
    const [verificationCode, setVerificationCode] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [resendingCode, setResendingCode] = useState(false);
    const [devOtpHint, setDevOtpHint] = useState("");

    // 60 秒冷卻倒數計時器
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    /**
     * Step 1: 填完表單點擊送出 ➔ 校驗資料並自動發送信箱驗證碼 ➔ 進入 Step 2
     */
    const handleFormSubmit = async (e) => {
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

        try {
            // 送出表單後，先調用發送驗證碼 API (同時驗證信箱是否重複)
            const res = await helper.helper.AsyncSendVerificationCode(email.trim(), 'signup');
            if (res && res.status === "success") {
                setStep(2);
                setCountdown(60);
                setSuccessMsg(res.message || (lang === 'en' ? `Verification code sent to ${email.trim()}` : `驗證碼已發送至 ${email.trim()}`));
                if (res.devCode) {
                    setDevOtpHint(res.devCode);
                    setVerificationCode(res.devCode); // 開發環境模擬自動代入
                }
            } else {
                setError(res?.message || (lang === 'en' ? 'Failed to process registration. Email might already be registered.' : '註冊失敗，此信箱可能已被註冊使用'));
            }
        } catch (err) {
            setError(lang === 'en' ? 'Network error, please verify backend connection' : '網路連線異常，請確認後端伺服器運行狀態');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Step 2: 重新發送驗證碼
     */
    const handleResendCode = async () => {
        if (countdown > 0) return;
        setError("");
        setSuccessMsg("");
        setResendingCode(true);

        try {
            const res = await helper.helper.AsyncSendVerificationCode(email.trim(), 'signup');
            if (res && res.status === "success") {
                setCountdown(60);
                setSuccessMsg(lang === 'en' ? 'A new verification code has been sent to your email.' : '新的驗證碼已寄出，請查收您的信箱。');
                if (res.devCode) {
                    setDevOtpHint(res.devCode);
                    setVerificationCode(res.devCode);
                }
            } else {
                setError(res?.message || (lang === 'en' ? 'Failed to resend code.' : '重發驗證碼失敗，請稍後再試'));
            }
        } catch (err) {
            setError(lang === 'en' ? 'Network error while resending code' : '重發驗證碼網路異常');
        } finally {
            setResendingCode(false);
        }
    };

    /**
     * Step 2: 核對 6 位數驗證碼並完成帳號建立
     */
    const handleConfirmVerification = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (!verificationCode.trim() || verificationCode.trim().length !== 6) {
            setError(lang === 'en' ? 'Please enter the complete 6-digit verification code' : '請輸入完整的 6 位數驗證碼');
            return;
        }

        setLoading(true);

        const userData = {
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
            const res = await helper.helper.AsyncUserCreate(userData);
            if (res && res.status === "success") {
                setSuccessMsg(lang === 'en' ? '🎉 Email verified & account created! Redirecting to sign in...' : '🎉 信箱驗證通過，會員註冊成功！即將前往登入頁面...');
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 1500);
            } else {
                setError(res?.message || (lang === 'en' ? 'Verification code invalid or expired' : '驗證碼不正確或已過期，請重新確認'));
            }
        } catch (err) {
            setError(lang === 'en' ? 'Network error during account registration' : '註冊認證網路連線異常，請稍後再試');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        lang === 'en' ? 'Fill Profile' : '填寫註冊資料',
        lang === 'en' ? 'Verify Email' : '驗證電子信箱'
    ];

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
                {/* 頂部進度條 (Stepper) */}
                <Box sx={{ mb: 4 }}>
                    <Stepper activeStep={step - 1} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel
                                    StepIconProps={{
                                        sx: {
                                            '&.Mui-active': { color: 'var(--tw-terracotta, #B91C1C)' },
                                            '&.Mui-completed': { color: '#059669' }
                                        }
                                    }}
                                >
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: index === step - 1 ? 'var(--tw-terracotta, #B91C1C)' : 'inherit' }}>
                                        {label}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* 錯誤與成功通知 */}
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

                {/* ============================================================== */}
                {/* STEP 1: 填寫註冊資料表單 (填完送出才進行驗證) */}
                {/* ============================================================== */}
                {step === 1 && (
                    <Box component="form" onSubmit={handleFormSubmit} noValidate>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
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
                                    ? 'Fill in your basic information to begin your street food adventure'
                                    : '填寫基本資料，送出後將發送驗證碼至您的信箱以完成啟用'}
                            </Typography>
                        </Box>

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
                                    label={lang === 'en' ? 'Email Address' : '電子郵件 (作為登入帳號與驗證信箱)'}
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
                                lang === 'en' ? 'Submit Registration & Send Verification' : '送出註冊 ➔ 進行信箱驗證'
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
                )}

                {/* ============================================================== */}
                {/* STEP 2: 送出後進入信箱驗證碼畫面 */}
                {/* ============================================================== */}
                {step === 2 && (
                    <Box component="form" onSubmit={handleConfirmVerification} noValidate>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(185, 28, 28, 0.08)',
                                    color: 'var(--tw-terracotta, #B91C1C)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                }}
                            >
                                <MarkEmailReadIcon sx={{ fontSize: 34 }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 800, color: 'var(--tw-deep-charcoal, #1C1917)' }}>
                                {lang === 'en' ? 'Check Your Inbox' : '請查收您的電子郵件'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'var(--tw-text-muted, #78716C)', mt: 1, px: 2, lineHeight: 1.6 }}>
                                {lang === 'en' ? 'We sent a 6-digit verification code to: ' : '我們已發送 6 位數安全驗證碼至：'}
                                <br />
                                <strong style={{ color: 'var(--tw-deep-charcoal, #1C1917)', fontSize: '1.05rem' }}>{email}</strong>
                            </Typography>
                        </Box>

                        <Box sx={{ p: 3, borderRadius: '16px', backgroundColor: 'var(--tw-surface-warm, #FAF8F5)', border: '1px solid var(--tw-border-subtle, #EAE5DD)', mb: 3, textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--tw-deep-charcoal, #1C1917)', display: 'block', mb: 2 }}>
                                🔢 {lang === 'en' ? 'Enter 6-Digit Verification Code' : '請輸入信箱中的 6 位數驗證碼'}
                            </Typography>

                            <TextField
                                autoFocus
                                required
                                fullWidth
                                placeholder="123456"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                inputProps={{
                                    maxLength: 6,
                                    style: {
                                        textAlign: 'center',
                                        letterSpacing: '10px',
                                        fontSize: '28px',
                                        fontWeight: 800,
                                        color: 'var(--tw-terracotta, #B91C1C)',
                                        fontFamily: 'monospace'
                                    }
                                }}
                            />

                            {devOtpHint && (
                                <Box sx={{ mt: 2, p: 1.5, borderRadius: '8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.85rem', textAlign: 'center' }}>
                                    💡 <strong>開發測試提示：</strong> 未設定 SMTP 伺服器，驗證碼已自動模擬代入：<strong>{devOtpHint}</strong>
                                </Box>
                            )}

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" sx={{ color: 'var(--tw-text-muted, #78716C)' }}>
                                    {lang === 'en' ? "Didn't receive the email?" : '沒收到驗證信？'}
                                </Typography>
                                <Button
                                    size="small"
                                    disabled={countdown > 0 || resendingCode}
                                    onClick={handleResendCode}
                                    startIcon={resendingCode ? <CircularProgress size={12} /> : <SendIcon sx={{ fontSize: 13 }} />}
                                    sx={{
                                        color: 'var(--tw-terracotta, #B91C1C)',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        p: 0,
                                        minWidth: 'auto',
                                        '&:hover': { background: 'transparent', textDecoration: 'underline' }
                                    }}
                                >
                                    {countdown > 0
                                        ? `${countdown}s ${lang === 'en' ? 'Resend' : '後可重發'}`
                                        : (lang === 'en' ? 'Resend Code' : '重新發送驗證碼')}
                                </Button>
                            </Box>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading || verificationCode.length !== 6}
                            sx={{
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
                                lang === 'en' ? 'Verify & Complete Registration' : '驗證並完成帳號建立'
                            )}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2.5 }}>
                            <Button
                                size="small"
                                startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                                onClick={() => {
                                    setStep(1);
                                    setError("");
                                }}
                                sx={{ color: 'var(--tw-text-muted, #78716C)', fontWeight: 600 }}
                            >
                                {lang === 'en' ? 'Back to Edit Information' : '返回修改註冊資料'}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}