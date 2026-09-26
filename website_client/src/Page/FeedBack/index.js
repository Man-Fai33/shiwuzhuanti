import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    CircularProgress
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SendIcon from '@mui/icons-material/Send';
import helper from '../Helper/helper';

export default function FeedBack() {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [opinion, setOpinion] = useState("");
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('user');
            if (rawUser) {
                const user = JSON.parse(rawUser);
                if (user.username) setUsername(user.username);
                if (user.email) setEmail(user.email);
                if (user.phone) setPhone(user.phone);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ type: '', text: '' });

        if (!email.includes('@') || !email.includes('.')) {
            setStatusMsg({ type: 'error', text: '請輸入正確格式的電子郵件信箱' });
            return;
        }

        if (!username.trim() || !opinion.trim()) {
            setStatusMsg({ type: 'error', text: '請填寫您的大名或暱稱，以及寶貴的建議內容' });
            return;
        }

        setLoading(true);
        try {
            let user = null;
            try {
                const raw = localStorage.getItem('user');
                if (raw) user = JSON.parse(raw);
            } catch (err) { }

            const feedbackData = {
                feedback: {
                    owner: username.trim(),
                    contact: phone.trim() || "未留電話",
                    email: email.trim(),
                    opinion: opinion.trim(),
                    isMember: user ? user._id : null,
                    date: new Date()
                }
            };

            const res = await helper.helper.AsyncFeedbackCreate(feedbackData);
            if (res && res.status === "success") {
                setStatusMsg({
                    type: 'success',
                    text: '🏮 感謝您的寶貴回饋！意見已成功送出！'
                });
                setOpinion("");
            } else {
                setStatusMsg({ type: 'error', text: '送出失敗，請稍候重試或檢查網路連線' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '連線伺服器發生異常，請重試' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            {/* 標題欄 */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: '#fcedea',
                        color: '#b7282e',
                        mb: 1.5,
                        border: '2px solid #f8c3ba'
                    }}
                >
                    <RateReviewIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b2520' }}>
                    🏮 遊客心聲與意見回饋
                </Typography>
                <Typography variant="body1" sx={{ color: '#6d655e', mt: 1 }}>
                    歡迎與我們分享您的夜市探訪心得、推薦私房攤位或平台改善建議！
                </Typography>
            </Box>

            {/* 回饋表單 */}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    border: '1px solid #f2e2d0',
                    background: 'linear-gradient(180deg, #ffffff 0%, #fffdf9 100%)',
                    boxShadow: '0 8px 24px rgba(183, 40, 46, 0.08)'
                }}
            >
                {statusMsg.text && (
                    <Alert severity={statusMsg.type} sx={{ mb: 3, borderRadius: 2 }}>
                        {statusMsg.text}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="您的稱謂 / 暱稱"
                                placeholder="例如：陳大明、夜市饕客"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="聯絡電話 (選填)"
                                placeholder="0912-345-678"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                label="電子郵件信箱"
                                placeholder="yourname@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                rows={6}
                                label="意見內容與心得回饋"
                                placeholder="請告訴我們您的想法、遇到的問題，或想推薦的美食私房店家..."
                                value={opinion}
                                onChange={(e) => setOpinion(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3.5, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            endIcon={!loading && <SendIcon />}
                            sx={{
                                px: 4,
                                py: 1.2,
                                bgcolor: '#b7282e',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '1rem',
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(183, 40, 46, 0.25)',
                                '&:hover': {
                                    bgcolor: '#941e24'
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : '送出回饋 🏮'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}