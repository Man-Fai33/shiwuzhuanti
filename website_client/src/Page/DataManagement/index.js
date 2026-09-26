import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Stack
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CampaignIcon from '@mui/icons-material/Campaign';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import dayjs from 'dayjs';
import helper from '../Helper/helper';

export default function DataManagement() {
    const [user, setUser] = useState(null);
    const [tabVal, setTabVal] = useState(0);

    // Tab 0: New Market
    const [name, setName] = useState("");
    const [nameen, setNameen] = useState("");
    const [marketLocation, setMarketLocation] = useState("");
    const [positionGuidelines, setPositionGuidelines] = useState("");
    const [brief, setBrief] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [rating, setRating] = useState(4.8);
    const [lat, setLat] = useState(25.088);
    const [lng, setLng] = useState(121.524);
    const [marketIcon, setMarketIcon] = useState(null);
    const [marketPreview, setMarketPreview] = useState("");

    // Tab 1: Feedback
    const [feedbacks, setFeedbacks] = useState([]);

    // Tab 2: Bulletin
    const [bulletinTitle, setBulletinTitle] = useState("");
    const [bulletinContext, setBulletinContext] = useState("");
    const [bulletinIcon, setBulletinIcon] = useState(null);
    const [bulletinPreview, setBulletinPreview] = useState("");

    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('user');
            if (rawUser) {
                const parsed = JSON.parse(rawUser);
                setUser(parsed);
            }
        } catch (e) { }

        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await helper.helper.AsyncFeedBackAll();
            if (res && res.feedback) {
                // Ensure each row has unique 'id' for DataGrid
                const mapped = res.feedback.map((f, i) => ({
                    id: f._id || `fb-${i}`,
                    owner: f.owner || '匿名訪客',
                    contact: f.contact || '無',
                    email: f.email || '',
                    opinion: f.opinion || '',
                    date: (f.date && dayjs(f.date).isValid()) ? dayjs(f.date).format('YYYY-MM-DD HH:mm') : '近期'
                }));
                setFeedbacks(mapped);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleMarketSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ type: '', text: '' });

        if (!name.trim() || !marketLocation.trim() || !brief.trim()) {
            setStatusMsg({ type: 'error', text: '請填寫夜市名稱、地址與簡短介紹' });
            return;
        }

        setLoading(true);
        try {
            let imgPath = '/img/default_market.jpg';
            if (marketIcon) {
                const data = new FormData();
                data.append('Image', marketIcon);
                const uploadRes = await helper.helper.AsyncUploadImage(data);
                if (uploadRes && uploadRes.path) imgPath = uploadRes.path;
            }

            const newMarket = {
                market: {
                    name: name.trim(),
                    nameen: nameen.trim() || name.trim(),
                    marketIcon: imgPath,
                    marketLocation: marketLocation.trim(),
                    positionGuidelines: positionGuidelines.trim() || '鄰近捷運站與公車站，交通便利',
                    brief: brief.trim(),
                    introduction: introduction.trim() || brief.trim(),
                    foodList: [],
                    shopList: [],
                    rating: Number(rating) || 4.5,
                    lat: Number(lat) || 25.0,
                    lng: Number(lng) || 121.5
                }
            };

            const res = await helper.helper.AsyncMarketCreate(newMarket);
            if (res) {
                setStatusMsg({ type: 'success', text: `🎉 成功新增夜市「${name}」！` });
                setName('');
                setNameen('');
                setMarketLocation('');
                setPositionGuidelines('');
                setBrief('');
                setIntroduction('');
                setMarketIcon(null);
                setMarketPreview('');
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '建立夜市失敗，請稍後重試' });
        } finally {
            setLoading(false);
        }
    };

    const handleBulletinSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ type: '', text: '' });

        if (!bulletinTitle.trim() || !bulletinContext.trim()) {
            setStatusMsg({ type: 'error', text: '請輸入公告標題與詳細內容' });
            return;
        }

        setLoading(true);
        try {
            let imgPath = '/img/default_bulletin.jpg';
            if (bulletinIcon) {
                const data = new FormData();
                data.append('Image', bulletinIcon);
                const uploadRes = await helper.helper.AsyncUploadImage(data);
                if (uploadRes && uploadRes.path) imgPath = uploadRes.path;
            }

            const newBulletin = {
                bulletin: {
                    owner: user?._id || 'admin',
                    title: bulletinTitle.trim(),
                    context: bulletinContext.trim(),
                    imgUrl: imgPath,
                    date: new Date().toLocaleDateString('zh-TW')
                }
            };

            const res = await helper.helper.AsyncBulletinCreate(newBulletin);
            if (res) {
                setStatusMsg({ type: 'success', text: '🏮 夜市公告已成功發佈！' });
                setBulletinTitle('');
                setBulletinContext('');
                setBulletinIcon(null);
                setBulletinPreview('');
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '發佈公告失敗，請檢查伺服器狀態' });
        } finally {
            setLoading(false);
        }
    };

    const feedbackColumns = [
        { field: 'owner', headerName: '饕客暱稱', width: 140 },
        { field: 'contact', headerName: '聯絡電話', width: 140 },
        { field: 'email', headerName: '電子郵件', width: 180 },
        { field: 'opinion', headerName: '回饋意見與心得', flex: 1, minWidth: 260 },
        { field: 'date', headerName: '留言日期', width: 130 }
    ];

    // 非管理員提醒
    if (!user || user.role !== 'admin') {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        border: '1px solid #f2e2d0',
                        background: 'linear-gradient(180deg, #ffffff 0%, #fffbf5 100%)'
                    }}
                >
                    <AdminPanelSettingsIcon sx={{ fontSize: 70, color: '#b7282e', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b2520', mb: 1.5 }}>
                        🏮 夜市後台管理系統
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6d655e', mb: 3 }}>
                        本專區僅供夜市自治會與系統管理人員使用。請登入管理員帳號以維護夜市資料、發佈公告或審查饕客回饋。
                    </Typography>
                    <Button
                        variant="contained"
                        href="/signin"
                        sx={{ bgcolor: '#b7282e', fontWeight: 700, px: 3, '&:hover': { bgcolor: '#941e24' } }}
                    >
                        前往管理員登入
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b2520' }}>
                    🏮 台灣夜市後台管理系統
                </Typography>
                <Typography variant="body2" sx={{ color: '#6d655e', mt: 0.5 }}>
                    管理員：{user.username} ({user.email})
                </Typography>
            </Box>

            {statusMsg.text && (
                <Alert severity={statusMsg.type} sx={{ mb: 3, borderRadius: 2 }}>
                    {statusMsg.text}
                </Alert>
            )}

            <Paper elevation={3} sx={{ borderRadius: 3, border: '1px solid #f2e2d0', overflow: 'hidden' }}>
                <Tabs
                    value={tabVal}
                    onChange={(e, val) => setTabVal(val)}
                    variant="fullWidth"
                    sx={{
                        bgcolor: '#b7282e',
                        '& .MuiTab-root': { color: 'rgba(255,255,255,0.85)', fontWeight: 700 },
                        '& .Mui-selected': { color: '#ffffff !important' },
                        '& .MuiTabs-indicator': { bgcolor: '#e08a00', height: 4 }
                    }}
                >
                    <Tab icon={<AddBusinessIcon />} iconPosition="start" label="增添夜市聚落" />
                    <Tab icon={<FeedbackIcon />} iconPosition="start" label={`饕客回饋審查 (${feedbacks.length})`} />
                    <Tab icon={<CampaignIcon />} iconPosition="start" label="發布夜市最新公告" />
                </Tabs>

                <Box sx={{ p: { xs: 2.5, md: 4 } }}>
                    {/* Tab 0: 增添夜市 */}
                    {tabVal === 0 && (
                        <Box component="form" onSubmit={handleMarketSubmit}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e', mb: 3 }}>
                                建立全台特色夜市景點
                            </Typography>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="夜市中文名稱"
                                        placeholder="例如：士林夜市、逢甲夜市"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="夜市英文名稱"
                                        placeholder="Shilin Night Market"
                                        value={nameen}
                                        onChange={(e) => setNameen(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="詳細夜市地址"
                                        placeholder="台北市士林區大東路、大南路"
                                        value={marketLocation}
                                        onChange={(e) => setMarketLocation(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="預設綜合評價 (1-5)"
                                        value={rating}
                                        inputProps={{ step: "0.1", min: "1", max: "5" }}
                                        onChange={(e) => setRating(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="交通與抵達指引"
                                        placeholder="捷運劍潭站1號出口步行約3分鐘"
                                        value={positionGuidelines}
                                        onChange={(e) => setPositionGuidelines(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="一句話亮點簡介"
                                        placeholder="台北最具代表性的世界級觀光夜市，必吃豪大大雞排與十全排骨！"
                                        value={brief}
                                        onChange={(e) => setBrief(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="夜市歷史、特色與深度導覽"
                                        value={introduction}
                                        onChange={(e) => setIntroduction(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="地圖緯度 (lat)"
                                        value={lat}
                                        onChange={(e) => setLat(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="地圖經度 (lng)"
                                        value={lng}
                                        onChange={(e) => setLng(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ borderColor: '#b7282e', color: '#b7282e' }}
                                        >
                                            上傳夜市風華全景照
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setMarketIcon(file);
                                                        setMarketPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </Button>
                                        {marketPreview && (
                                            <Box
                                                component="img"
                                                src={marketPreview}
                                                alt="夜市預覽"
                                                sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 1.5, border: '1px solid #ccc' }}
                                            />
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{ bgcolor: '#b7282e', px: 4, py: 1.2, fontWeight: 700, '&:hover': { bgcolor: '#941e24' } }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : '發布並建立夜市 🏮'}
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Tab 1: 饕客回饋審查 */}
                    {tabVal === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e', mb: 2 }}>
                                饕客意見反饋與攤位推薦清單
                            </Typography>
                            <Box sx={{ height: 450, width: '100%', bgcolor: '#fff' }}>
                                <DataGrid
                                    rows={feedbacks}
                                    columns={feedbackColumns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10, 20]}
                                    disableSelectionOnClick
                                    sx={{
                                        border: '1px solid #efe3d5',
                                        '& .MuiDataGrid-columnHeaders': { bgcolor: '#fcedea', color: '#b7282e', fontWeight: 800 }
                                    }}
                                />
                            </Box>
                        </Box>
                    )}

                    {/* Tab 2: 發布最新公告 */}
                    {tabVal === 2 && (
                        <Box component="form" onSubmit={handleBulletinSubmit}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e', mb: 3 }}>
                                發布夜市節慶、優惠活動或特別公告
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="公告標題"
                                        placeholder="例如：🏮 2026 台灣夏夜美食節！士林、逢甲百攤聯手優惠開跑"
                                        value={bulletinTitle}
                                        onChange={(e) => setBulletinTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={6}
                                        label="公告詳細內容"
                                        placeholder="詳細活動辦法、優惠時段、抽獎或交通接駁事項..."
                                        value={bulletinContext}
                                        onChange={(e) => setBulletinContext(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ borderColor: '#b7282e', color: '#b7282e' }}
                                        >
                                            上傳公告文宣海報
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setBulletinIcon(file);
                                                        setBulletinPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </Button>
                                        {bulletinPreview && (
                                            <Box
                                                component="img"
                                                src={bulletinPreview}
                                                alt="海報預覽"
                                                sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 1.5, border: '1px solid #ccc' }}
                                            />
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{ bgcolor: '#b7282e', px: 4, py: 1.2, fontWeight: 700, '&:hover': { bgcolor: '#941e24' } }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : '立即公告張貼 🏮'}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}