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
    CircularProgress,
    Snackbar
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SendIcon from '@mui/icons-material/Send';
import helper from '../Helper/helper';
import { useLanguage } from '../../Context/LanguageContext';

export default function FeedBack() {
    const { t, lang } = useLanguage();
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [opinion, setOpinion] = useState("");
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
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
            setStatusMsg({ type: 'error', text: lang === 'en' ? 'Please enter a valid email address' : '請輸入正確格式的電子郵件信箱' });
            return;
        }

        if (!username.trim() || !opinion.trim()) {
            setStatusMsg({ type: 'error', text: lang === 'en' ? 'Please fill in your name and feedback message' : '請填寫您的大名或暱稱，以及寶貴的建議內容' });
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
                    contact: phone.trim() || (lang === 'en' ? 'None' : '未留電話'),
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
                    text: t('feedback_success')
                });
                setOpenSnackbar(true);
                setOpinion("");
            } else {
                setStatusMsg({ type: 'error', text: t('feedback_fail') });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: lang === 'en' ? 'Server connection error, please try again' : '連線伺服器發生異常，請重試' });
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
                        width: 56,
                        height: 56,
                        borderRadius: '16px',
                        bgcolor: '#FEF2F2',
                        color: 'var(--tw-terracotta, #B91C1C)',
                        mb: 2,
                    }}
                >
                    <RateReviewIcon sx={{ fontSize: 28 }} />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 800,
                        color: 'var(--tw-deep-charcoal, #1C1917)',
                    }}
                >
                    {t('feedback_page_title')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--tw-text-muted, #78716C)', mt: 1 }}>
                    {t('feedback_page_desc')}
                </Typography>
            </Box>

            {/* 回饋表單 */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4.5 },
                    borderRadius: '20px',
                    border: '1px solid var(--tw-border-subtle, #EAE5DD)',
                    backgroundColor: 'var(--tw-card-white, #FFFFFF)',
                    boxShadow: '0 4px 20px rgba(28, 25, 23, 0.05)',
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
                                label={t('feedback_name')}
                                placeholder={t('feedback_name_ph')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={t('feedback_phone')}
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
                                label={t('feedback_email')}
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
                                label={t('feedback_opinion')}
                                placeholder={t('feedback_opinion_ph')}
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
                            className="tw-btn-primary"
                            endIcon={!loading && <SendIcon />}
                            sx={{
                                px: 4,
                                py: 1.2,
                                fontSize: '0.95rem',
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : t('feedback_submit')}
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {/* MUI Snackbar 浮動通知套件 */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%', fontWeight: 700 }}>
                    {t('feedback_success')}
                </Alert>
            </Snackbar>
        </Container>
    );
}