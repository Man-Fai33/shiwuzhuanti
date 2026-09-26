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

export default function SignUp() {
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
            setError("請輸入使用者姓名或暱稱");
            return;
        }
        if (!email.trim() || !email.includes('@') || !email.includes('.')) {
            setError("請輸入有效的電子郵件信箱");
            return;
        }
        if (!upassword || upassword.length < 4) {
            setError("密碼長度至少需要 4 個字元");
            return;
        }
        if (upassword !== confirmPassword) {
            setError("兩次輸入的密碼不一致，請再次確認");
            return;
        }

        setLoading(true);
        const user = {
            user: {
                username: uname.trim(),
                email: email.trim(),
                password: upassword,
                role: "user",
                phone: uphone.trim() || "未提供",
                location: ulocation.trim() || "台灣",
                gender: ugender,
                introduction: "熱愛台灣夜市小吃的饕客一枚！"
            }
        };

        try {
            const res = await helper.helper.AsyncUserCreate(user);
            if (res && res.status === "success") {
                setSuccessMsg("🎉 註冊成功！即將為您前往登入頁面...");
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 1200);
            } else {
                setError(res?.message || "註冊失敗，此信箱可能已被註冊或伺服器回應異常");
            }
        } catch (err) {
            setError("網路連線異常，請確認後端伺服器運行狀態");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 3,
                    border: '1px solid #f2e2d0',
                    background: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 100%)',
                    boxShadow: '0 8px 24px rgba(183, 40, 46, 0.08)'
                }}
            >
                {/* 標題與意象 */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: '#fcedea',
                            color: '#b7282e',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1.5,
                            border: '2px solid #f8c3ba'
                        }}
                    >
                        <PersonAddAlt1Icon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b2520', letterSpacing: 1 }}>
                        🏮 加入台灣夜市通
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7a6f66', mt: 0.5 }}>
                        註冊會員，暢遊全台夜市小吃、收藏私房名單與分享在地食記
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {successMsg && (
                    <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                        {successMsg}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="使用者暱稱 / 姓名"
                                placeholder="例如：夜市小當家、王小明"
                                value={uname}
                                onChange={(e) => setUname(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                label="電子郵件 (帳號)"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="聯絡電話 (選填)"
                                placeholder="0912-345-678"
                                value={uphone}
                                onChange={(e) => setUphone(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="所在地區 (選填)"
                                placeholder="例如：台北市、台中市"
                                value={ulocation}
                                onChange={(e) => setUlocation(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                label="設定密碼"
                                placeholder="請輸入至少4位密碼"
                                value={upassword}
                                onChange={(e) => setUpassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                label="確認密碼"
                                placeholder="再次輸入密碼"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ fontSize: '0.9rem', color: '#5a5048' }}>性別稱謂</FormLabel>
                                <RadioGroup
                                    row
                                    value={ugender ? "male" : "female"}
                                    onChange={(e) => setUgender(e.target.value === "male")}
                                >
                                    <FormControlLabel value="male" control={<Radio sx={{ color: '#b7282e', '&.Mui-checked': { color: '#b7282e' } }} />} label="先生 / 男生" />
                                    <FormControlLabel value="female" control={<Radio sx={{ color: '#b7282e', '&.Mui-checked': { color: '#b7282e' } }} />} label="女士 / 女生" />
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
                            mt: 3.5,
                            mb: 2,
                            py: 1.4,
                            bgcolor: '#b7282e',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(183, 40, 46, 0.3)',
                            '&:hover': {
                                bgcolor: '#941e24'
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={26} color="inherit" /> : '立即註冊開吃 🥢'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Typography variant="body2" sx={{ color: '#6a625b' }}>
                            已經擁有會員帳號？{' '}
                            <Link href="/signin" underline="hover" sx={{ color: '#b7282e', fontWeight: 700 }}>
                                立即前往登入 ➔
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}