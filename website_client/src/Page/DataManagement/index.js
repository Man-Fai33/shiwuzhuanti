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
    Stack,
    Chip,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// Icons
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CampaignIcon from '@mui/icons-material/Campaign';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import dayjs from 'dayjs';
import helper from '../Helper/helper';

export default function DataManagement() {
    const [user, setUser] = useState(null);
    const [tabVal, setTabVal] = useState(0);

    // 全站數據清單
    const [markets, setMarkets] = useState([]);
    const [shops, setShops] = useState([]);
    const [foods, setFoods] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [bulletins, setBulletins] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [syncStats, setSyncStats] = useState(null);

    // 篩選與搜尋
    const [shopFilterMarket, setShopFilterMarket] = useState('ALL');
    const [shopSearchKeyword, setShopSearchKeyword] = useState('');
    const [foodSearchKeyword, setFoodSearchKeyword] = useState('');

    // 編輯彈窗狀態 (Dialogs)
    const [editMarketOpen, setEditMarketOpen] = useState(false);
    const [editingMarket, setEditingMarket] = useState(null);

    const [editShopOpen, setEditShopOpen] = useState(false);
    const [editingShop, setEditingShop] = useState(null);

    const [editFoodOpen, setEditFoodOpen] = useState(false);
    const [editingFood, setEditingFood] = useState(null);

    // 新增夜市表單狀態
    const [showAddMarket, setShowAddMarket] = useState(false);
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

    // 新增公告表單狀態
    const [showAddBulletin, setShowAddBulletin] = useState(false);
    const [bulletinTitle, setBulletinTitle] = useState("");
    const [bulletinContext, setBulletinContext] = useState("");
    const [bulletinIcon, setBulletinIcon] = useState(null);

    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const [syncLoading, setSyncLoading] = useState(false);

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('user');
            if (rawUser) {
                const parsed = JSON.parse(rawUser);
                setUser(parsed);
            }
        } catch (e) { }

        loadAllData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAllData = async () => {
        setLoading(true);
        try {
            // 1. 夜市資料
            const mRes = await helper.helper.AsyncMarketData();
            if (mRes && mRes.status === 'success' && Array.isArray(mRes.market)) {
                setMarkets(mRes.market);
            }

            // 2. 店家資料
            const sRes = await helper.helper.AsyncShop();
            if (sRes && sRes.status === 'success' && Array.isArray(sRes.shop)) {
                setShops(sRes.shop);
            }

            // 3. 美食資料
            const fRes = await helper.helper.AsyncFood();
            if (fRes && fRes.status === 'success' && Array.isArray(fRes.food)) {
                setFoods(fRes.food);
            }

            // 4. 會員資料
            const uRes = await helper.helper.AsyncUserAll();
            if (uRes && uRes.status === 'success' && Array.isArray(uRes.users)) {
                setUsersList(uRes.users);
            }

            // 5. 公告資料
            const bRes = await helper.helper.AsyncBulletin();
            if (bRes && bRes.status === 'success' && Array.isArray(bRes.bulletin)) {
                setBulletins(bRes.bulletin);
            }

            // 6. 意見回饋
            const fbRes = await helper.helper.AsyncFeedBackAll();
            if (fbRes && fbRes.feedback) {
                const mapped = fbRes.feedback.map((f, i) => ({
                    id: f._id || `fb-${i}`,
                    owner: f.owner || '匿名訪客',
                    contact: f.contact || '無',
                    email: f.email || '',
                    opinion: f.opinion || '',
                    date: (f.date && dayjs(f.date).isValid()) ? dayjs(f.date).format('YYYY-MM-DD HH:mm') : '近期'
                }));
                setFeedbacks(mapped);
            }

            // 7. 流量統計與同步狀態
            loadAnalyticsAndSync();
        } catch (err) {
            console.error('Failed to load admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadAnalyticsAndSync = async () => {
        try {
            const aRes = await helper.helper.AsyncGetAnalyticsStats();
            if (aRes && aRes.status === 'success') {
                setAnalytics(aRes.data);
            }
            const syncRes = await helper.helper.AsyncSyncStatus();
            if (syncRes && syncRes.status === 'success') {
                setSyncStats(syncRes.data);
            }
        } catch (e) { }
    };

    // ==========================================
    // 1. 夜市管理 (Markets)
    // ==========================================
    const handleMarketSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ type: '', text: '' });

        if (!name.trim() || !marketLocation.trim() || !brief.trim()) {
            setStatusMsg({ type: 'error', text: '請填寫夜市名稱、城市位置與簡介' });
            return;
        }

        setLoading(true);
        try {
            let imgPath = 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800';
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
                    positionGuidelines: positionGuidelines.trim() || '大眾運輸便利，出站步行可達',
                    brief: brief.trim(),
                    introduction: introduction.trim() || brief.trim(),
                    rating: Number(rating) || 4.8,
                    lat: Number(lat) || 25.088,
                    lng: Number(lng) || 121.524
                }
            };

            const res = await helper.helper.AsyncMarketCreate(newMarket);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `🎉 成功新增夜市「${name}」！` });
                setName('');
                setNameen('');
                setMarketLocation('');
                setPositionGuidelines('');
                setBrief('');
                setIntroduction('');
                setMarketIcon(null);
                setShowAddMarket(false);
                loadAllData();
            } else {
                setStatusMsg({ type: 'error', text: res?.message || '建立夜市失敗' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '建立夜市失敗，請稍後重試' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMarket = async (id, marketName) => {
        if (!window.confirm(`確定要刪除夜市「${marketName}」嗎？此動作將連帶移除關聯。`)) return;
        try {
            const res = await helper.helper.AsyncMarketDelete(id);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `已成功刪除夜市「${marketName}」` });
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '刪除夜市失敗' });
        }
    };

    const handleUpdateMarket = async () => {
        if (!editingMarket) return;
        try {
            const res = await helper.helper.AsyncMarketUpdate(editingMarket._id, editingMarket);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `夜市「${editingMarket.name}」已成功更新！` });
                setEditMarketOpen(false);
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '更新夜市失敗' });
        }
    };

    // ==========================================
    // 2. 店家管理 (Shops)
    // ==========================================
    const handleDeleteShop = async (id, shopName) => {
        if (!window.confirm(`確定要刪除店家「${shopName}」嗎？`)) return;
        try {
            const res = await helper.helper.AsyncShopDelete(id);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `已成功刪除店家「${shopName}」` });
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '刪除店家失敗' });
        }
    };

    const handleUpdateShop = async () => {
        if (!editingShop) return;
        try {
            const res = await helper.helper.AsyncShopUpdate(editingShop._id, editingShop);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `店家「${editingShop.shopName}」已成功更新！` });
                setEditShopOpen(false);
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '更新店家失敗' });
        }
    };

    // ==========================================
    // 3. 美食管理 (Foods)
    // ==========================================
    const handleDeleteFood = async (id, foodName) => {
        if (!window.confirm(`確定要刪除美食「${foodName}」嗎？`)) return;
        try {
            const res = await helper.helper.AsyncFoodDelete(id);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `已成功刪除美食「${foodName}」` });
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '刪除美食失敗' });
        }
    };

    const handleUpdateFood = async () => {
        if (!editingFood) return;
        try {
            const res = await helper.helper.AsyncFoodUpdate(editingFood._id, editingFood);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `美食「${editingFood.foodName}」已成功更新！` });
                setEditFoodOpen(false);
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '更新美食失敗' });
        }
    };

    // ==========================================
    // 4. 會員用戶管理 (Users)
    // ==========================================
    const handleToggleUserRole = async (targetUser) => {
        const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
        if (!window.confirm(`確定要將「${targetUser.username}」的身份調整為 ${newRole.toUpperCase()} 嗎？`)) return;
        try {
            const res = await helper.helper.AsyncUserUpdate({
                _id: targetUser._id,
                role: newRole
            });
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `已將用戶「${targetUser.username}」身份切換為 ${newRole}` });
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '切換權限失敗' });
        }
    };

    const handleDeleteUser = async (id, username) => {
        if (!window.confirm(`⚠️ 警告：確定要註銷並永久刪除帳號「${username}」嗎？`)) return;
        try {
            const res = await helper.helper.AsyncUserDelete(id);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `已成功刪除帳號「${username}」` });
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '刪除帳號失敗' });
        }
    };

    // ==========================================
    // 5. 公告管理 (Bulletins)
    // ==========================================
    const handleBulletinSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg({ type: '', text: '' });

        if (!bulletinTitle.trim() || !bulletinContext.trim()) {
            setStatusMsg({ type: 'error', text: '請輸入公告標題與詳細內容' });
            return;
        }

        setLoading(true);
        try {
            let imgPath = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800';
            if (bulletinIcon) {
                const data = new FormData();
                data.append('Image', bulletinIcon);
                const uploadRes = await helper.helper.AsyncUploadImage(data);
                if (uploadRes && uploadRes.path) imgPath = uploadRes.path;
            }

            const newBulletin = {
                bulletin: {
                    owner: user?.username || '夜市總管理處',
                    title: bulletinTitle.trim(),
                    context: bulletinContext.trim(),
                    imgUrl: imgPath,
                    date: new Date()
                }
            };

            const res = await helper.helper.AsyncBulletinCreate(newBulletin);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: '🏮 夜市公告已成功發佈！' });
                setBulletinTitle('');
                setBulletinContext('');
                setBulletinIcon(null);
                setShowAddBulletin(false);
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '發布公告失敗' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBulletin = async (id, title) => {
        if (!window.confirm(`確定要下架刪除此公告「${title}」嗎？`)) return;
        try {
            const res = await helper.helper.AsyncBulletinDelete(id);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: '公告已成功下架' });
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '刪除公告失敗' });
        }
    };

    // ==========================================
    // 6. Google Maps 批次同步觸發
    // ==========================================
    const handleTriggerGoogleSync = async () => {
        setSyncLoading(true);
        setStatusMsg({ type: 'info', text: '🔄 正在從 Google Maps 批次同步全台夜市名店與美食，請稍候...' });
        try {
            const res = await helper.helper.AsyncSyncTrigger();
            if (res && res.status === 'success') {
                setStatusMsg({
                    type: 'success',
                    text: `🎉 同步完成！共更新 ${res.result?.shopsCount || 0} 間名店、${res.result?.foodsCount || 0} 道美食！`
                });
                loadAllData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: 'Google Maps 同步過程發生錯誤' });
        } finally {
            setSyncLoading(false);
        }
    };

    // 篩選店家清單
    const filteredShops = shops.filter(s => {
        const matchMarket = shopFilterMarket === 'ALL' || s.shopYeShi === shopFilterMarket;
        const matchKeyword = !shopSearchKeyword.trim() ||
            (s.shopName && s.shopName.toLowerCase().includes(shopSearchKeyword.toLowerCase())) ||
            (s.shopType && s.shopType.toLowerCase().includes(shopSearchKeyword.toLowerCase()));
        return matchMarket && matchKeyword;
    });

    // 篩選美食清單
    const filteredFoods = foods.filter(f => {
        return !foodSearchKeyword.trim() ||
            (f.foodName && f.foodName.toLowerCase().includes(foodSearchKeyword.toLowerCase())) ||
            (f.foodInfo && f.foodInfo.toLowerCase().includes(foodSearchKeyword.toLowerCase()));
    });

    if (!user || user.role !== 'admin') {
        return (
            <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 5,
                        borderRadius: 4,
                        border: '1px solid #f2e2d0',
                        background: 'linear-gradient(180deg, #ffffff 0%, #fffbf5 100%)'
                    }}
                >
                    <AdminPanelSettingsIcon sx={{ fontSize: 72, color: '#b7282e', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b2520', mb: 1.5 }}>
                        🏮 台灣夜市後台全端管理中心
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6d655e', mb: 3, lineHeight: 1.8 }}>
                        本專區僅供夜市自治會與系統管理人員使用。請登入具備「管理員 (Admin)」權限之帳號以管理夜市、店家、菜單、會員與分析數據。
                    </Typography>
                    <Button
                        variant="contained"
                        href="/signin"
                        sx={{ bgcolor: '#b7282e', fontWeight: 800, px: 4, py: 1.2, '&:hover': { bgcolor: '#941e24' } }}
                    >
                        前往管理員登入
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* 頂部管理員資訊列 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#2b2520', fontFamily: "'Noto Serif TC', serif" }}>
                        🏮 台灣夜市後台全端管理中心
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78716c', mt: 0.5 }}>
                        登入管理員：<strong>{user.username}</strong> ({user.email}) ｜ 狀態：全權限管理啟用中
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={loadAllData}
                        disabled={loading}
                        sx={{ borderColor: '#b7282e', color: '#b7282e', fontWeight: 700 }}
                    >
                        重新整理資料庫
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<SyncIcon />}
                        onClick={handleTriggerGoogleSync}
                        disabled={syncLoading}
                        sx={{ bgcolor: '#b7282e', fontWeight: 800, '&:hover': { bgcolor: '#941e24' } }}
                    >
                        {syncLoading ? 'Google 同步中...' : 'Google Maps 一鍵同步'}
                    </Button>
                </Stack>
            </Box>

            {statusMsg.text && (
                <Alert severity={statusMsg.type} onClose={() => setStatusMsg({ type: '', text: '' })} sx={{ mb: 3, borderRadius: 2 }}>
                    {statusMsg.text}
                </Alert>
            )}

            {/* 7 大管理 Tab 導覽列 */}
            <Paper elevation={3} sx={{ borderRadius: 3, border: '1px solid #f2e2d0', overflow: 'hidden' }}>
                <Tabs
                    value={tabVal}
                    onChange={(e, val) => setTabVal(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        bgcolor: '#b7282e',
                        '& .MuiTab-root': { color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontSize: '0.95rem' },
                        '& .Mui-selected': { color: '#ffffff !important' },
                        '& .MuiTabs-indicator': { bgcolor: '#e08a00', height: 4 }
                    }}
                >
                    <Tab icon={<AddBusinessIcon />} iconPosition="start" label={`夜市景點 (${markets.length})`} />
                    <Tab icon={<StorefrontIcon />} iconPosition="start" label={`攤位店家 (${shops.length})`} />
                    <Tab icon={<RestaurantMenuIcon />} iconPosition="start" label={`必吃美食 (${foods.length})`} />
                    <Tab icon={<PeopleIcon />} iconPosition="start" label={`會員帳號 (${usersList.length})`} />
                    <Tab icon={<CampaignIcon />} iconPosition="start" label={`活動公告 (${bulletins.length})`} />
                    <Tab icon={<FeedbackIcon />} iconPosition="start" label={`饕客回饋 (${feedbacks.length})`} />
                    <Tab icon={<InsightsIcon />} iconPosition="start" label="每日流量與同步" />
                </Tabs>

                <Box sx={{ p: { xs: 2, md: 3.5 } }}>

                    {/* ============================================================== */}
                    {/* Tab 0: 夜市景點管理                                            */}
                    {/* ============================================================== */}
                    {tabVal === 0 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                    全台夜市聚落清單 ({markets.length} 處)
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddBusinessIcon />}
                                    onClick={() => setShowAddMarket(!showAddMarket)}
                                    sx={{ bgcolor: '#b7282e', fontWeight: 800, '&:hover': { bgcolor: '#941e24' } }}
                                >
                                    {showAddMarket ? '收合增添表單' : '＋ 增添新夜市景點'}
                                </Button>
                            </Box>

                            {/* 增添夜市表單 */}
                            {showAddMarket && (
                                <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #ffd0d0', bgcolor: '#fffbfb' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#b7282e', mb: 2 }}>
                                        建立全新夜市聚落資料
                                    </Typography>
                                    <Box component="form" onSubmit={handleMarketSubmit}>
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth required label="夜市中文名稱" value={name} onChange={(e) => setName(e.target.value)} placeholder="例：士林觀光夜市" />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="夜市英文名稱 (English Name)" value={nameen} onChange={(e) => setNameen(e.target.value)} placeholder="例：Shilin Night Market" />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField fullWidth required label="所屬城市/地區代碼" value={marketLocation} onChange={(e) => setMarketLocation(e.target.value)} placeholder="tp (台北) / tz (台中) / tn (台南)" />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField fullWidth type="number" inputProps={{ step: "0.1", min: "1", max: "5" }} label="夜市評分 (Rating)" value={rating} onChange={(e) => setRating(e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField fullWidth type="number" inputProps={{ step: "0.001" }} label="緯度 (Latitude)" value={lat} onChange={(e) => setLat(e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField fullWidth type="number" inputProps={{ step: "0.001" }} label="經度 (Longitude)" value={lng} onChange={(e) => setLng(e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="交通指引" value={positionGuidelines} onChange={(e) => setPositionGuidelines(e.target.value)} placeholder="捷運站出口步行幾分鐘、公車路線等" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth required multiline rows={2} label="特色簡短摘要" value={brief} onChange={(e) => setBrief(e.target.value)} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth multiline rows={3} label="夜市歷史故事與詳細介紹" value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                            <Button onClick={() => setShowAddMarket(false)}>取消</Button>
                                            <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: '#b7282e', fontWeight: 800 }}>
                                                確認新增夜市
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            )}

                            {/* 夜市清單表格 */}
                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eae5dd', borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#faf8f5' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800 }}>封面</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>夜市名稱</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>城市代碼</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>評分</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>座標 (Lat, Lng)</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }} align="right">操作</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {markets.map((m) => (
                                            <TableRow key={m._id} hover>
                                                <TableCell>
                                                    <Box component="img" src={m.marketIcon} alt={m.name} sx={{ width: 60, height: 42, borderRadius: 1.5, objectFit: 'cover' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                        {m.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                        {m.nameen}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={m.marketLocation} size="small" sx={{ fontWeight: 700, bgcolor: '#f0eae1' }} />
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 800, color: '#d97706' }}>
                                                    ⭐ {m.rating || 4.8}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.85rem', color: '#57534e' }}>
                                                    {m.lat || 25.0}, {m.lng || 121.5}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="編輯夜市">
                                                        <IconButton onClick={() => { setEditingMarket(m); setEditMarketOpen(true); }} color="primary">
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="刪除夜市">
                                                        <IconButton onClick={() => handleDeleteMarket(m._id, m.name)} color="error">
                                                            <DeleteOutlineIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {/* ============================================================== */}
                    {/* Tab 1: 店家攤位管理                                            */}
                    {/* ============================================================== */}
                    {tabVal === 1 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                    全台夜市名店與排隊攤位 ({filteredShops.length} 間)
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ minWidth: { xs: '100%', sm: 400 } }}>
                                    <FormControl size="small" sx={{ minWidth: 160 }}>
                                        <InputLabel>依所屬夜市篩選</InputLabel>
                                        <Select value={shopFilterMarket} label="依所屬夜市篩選" onChange={(e) => setShopFilterMarket(e.target.value)}>
                                            <MenuItem value="ALL">全部夜市 (ALL)</MenuItem>
                                            {markets.map(m => (
                                                <MenuItem key={m._id} value={m.name}>{m.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        size="small"
                                        placeholder="搜尋店名或類別..."
                                        value={shopSearchKeyword}
                                        onChange={(e) => setShopSearchKeyword(e.target.value)}
                                        sx={{ flexGrow: 1 }}
                                    />
                                </Stack>
                            </Box>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eae5dd', borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#faf8f5' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800 }}>照片</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>店名 / 英文名</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>所屬夜市</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>攤號 / 類型</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Google 評價</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>位置</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }} align="right">操作</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredShops.map((s) => (
                                            <TableRow key={s._id} hover>
                                                <TableCell>
                                                    <Box component="img" src={s.shopIcon} alt={s.shopName} sx={{ width: 55, height: 40, borderRadius: 1.5, objectFit: 'cover' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                        {s.shopName}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                        {s.shopNameEN || 'Street Food'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={s.shopYeShi} size="small" sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 800 }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{s.shopNumber || '攤位'}</Typography>
                                                    <Chip label={s.shopType} size="small" sx={{ height: 20, fontSize: '0.75rem', bgcolor: '#f0eae1' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={`⭐ ${s.googleRating || s.rating || 4.5} (${s.googleReviewCount || s.rank || 1000}+)`}
                                                        size="small"
                                                        sx={{ bgcolor: '#fffbeb', color: '#b45309', fontWeight: 800 }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.85rem', color: '#57534e' }}>
                                                    {s.shopLocation}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {s.googlePlaceUrl && (
                                                        <Tooltip title="開啟 Google Maps">
                                                            <IconButton href={s.googlePlaceUrl} target="_blank" color="default">
                                                                <OpenInNewIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                    <Tooltip title="編輯店家">
                                                        <IconButton onClick={() => { setEditingShop(s); setEditShopOpen(true); }} color="primary">
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="刪除店家">
                                                        <IconButton onClick={() => handleDeleteShop(s._id, s.shopName)} color="error">
                                                            <DeleteOutlineIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {/* ============================================================== */}
                    {/* Tab 2: 必吃美食管理                                            */}
                    {/* ============================================================== */}
                    {tabVal === 2 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                    經典必吃街頭小吃與美食菜單 ({filteredFoods.length} 道)
                                </Typography>
                                <TextField
                                    size="small"
                                    placeholder="搜尋美食名稱、介紹..."
                                    value={foodSearchKeyword}
                                    onChange={(e) => setFoodSearchKeyword(e.target.value)}
                                    sx={{ minWidth: 280 }}
                                />
                            </Box>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eae5dd', borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#faf8f5' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800 }}>美食照片</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>小吃名稱</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>售價</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>類型標籤</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>老饕推薦簡介</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }} align="right">操作</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredFoods.map((f) => (
                                            <TableRow key={f._id} hover>
                                                <TableCell>
                                                    <Box component="img" src={f.foodIcon} alt={f.foodName} sx={{ width: 55, height: 40, borderRadius: 1.5, objectFit: 'cover' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                        {f.foodName}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                        {f.foodInfoEN || 'Taiwan Street Snack'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={`NT$ ${f.foodPrice || 65}`} size="small" sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 800 }} />
                                                </TableCell>
                                                <TableCell>
                                                    {(f.foodType || []).map((t, ti) => (
                                                        <Chip key={ti} label={t} size="small" sx={{ mr: 0.5, height: 20, fontSize: '0.75rem' }} />
                                                    ))}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.85rem', color: '#57534e', maxWidth: 300 }}>
                                                    {f.foodInfo}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="編輯美食">
                                                        <IconButton onClick={() => { setEditingFood(f); setEditFoodOpen(true); }} color="primary">
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="刪除美食">
                                                        <IconButton onClick={() => handleDeleteFood(f._id, f.foodName)} color="error">
                                                            <DeleteOutlineIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {/* ============================================================== */}
                    {/* Tab 3: 會員用戶管理                                            */}
                    {/* ============================================================== */}
                    {tabVal === 3 && (
                        <Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                    全站註冊會員與管理員帳號 ({usersList.length} 位)
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#78716c', mt: 0.5 }}>
                                    可在此檢視會員資料、指派或收回管理員權限，或註銷問題帳號。
                                </Typography>
                            </Box>

                            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eae5dd', borderRadius: 2 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#faf8f5' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800 }}>使用者名稱</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>電子信箱 (Email)</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>權限角色</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>聯絡電話</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>居住城市</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }} align="right">權限調整 / 註銷</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {usersList.map((u) => (
                                            <TableRow key={u._id} hover>
                                                <TableCell sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                    {u.username} {u._id === user._id && <Chip label="目前登入" size="small" sx={{ ml: 1, height: 20, bgcolor: '#fef3c7' }} />}
                                                </TableCell>
                                                <TableCell sx={{ color: '#57534e' }}>{u.email}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={u.role === 'admin' ? '🛡️ 管理員 (Admin)' : '一般會員 (User)'}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: u.role === 'admin' ? '#fee2e2' : '#eff6ff',
                                                            color: u.role === 'admin' ? '#b91c1c' : '#1d4ed8',
                                                            fontWeight: 800
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ color: '#78716c' }}>{u.phone || '未填寫'}</TableCell>
                                                <TableCell sx={{ color: '#78716c' }}>{u.location || '台灣'}</TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => handleToggleUserRole(u)}
                                                        sx={{ mr: 1, textTransform: 'none', fontWeight: 700 }}
                                                    >
                                                        {u.role === 'admin' ? '降為一般會員' : '升為管理員'}
                                                    </Button>
                                                    {u._id !== user._id && (
                                                        <Tooltip title="刪除此帳號">
                                                            <IconButton onClick={() => handleDeleteUser(u._id, u.username)} color="error">
                                                                <DeleteOutlineIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {/* ============================================================== */}
                    {/* Tab 4: 最新活動公告管理                                        */}
                    {/* ============================================================== */}
                    {tabVal === 4 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                    夜市官方活動與系統公告 ({bulletins.length} 則)
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<CampaignIcon />}
                                    onClick={() => setShowAddBulletin(!showAddBulletin)}
                                    sx={{ bgcolor: '#b7282e', fontWeight: 800, '&:hover': { bgcolor: '#941e24' } }}
                                >
                                    {showAddBulletin ? '收合發布表單' : '＋ 發布新活動公告'}
                                </Button>
                            </Box>

                            {/* 發布新公告表單 */}
                            {showAddBulletin && (
                                <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #ffd0d0', bgcolor: '#fffbfb' }}>
                                    <Box component="form" onSubmit={handleBulletinSubmit}>
                                        <Grid container spacing={2.5}>
                                            <Grid item xs={12}>
                                                <TextField fullWidth required label="公告主旨標題" value={bulletinTitle} onChange={(e) => setBulletinTitle(e.target.value)} placeholder="例：🏮 2026 夏季夜市美食嘉年華開跑！" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth required multiline rows={4} label="公告詳細內容" value={bulletinContext} onChange={(e) => setBulletinContext(e.target.value)} placeholder="填寫詳細活動辦法、優惠時段或注意事項..." />
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                            <Button onClick={() => setShowAddBulletin(false)}>取消</Button>
                                            <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: '#b7282e', fontWeight: 800 }}>
                                                立即發布公告
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            )}

                            {/* 公告列表 */}
                            <Grid container spacing={2.5}>
                                {bulletins.map((b) => (
                                    <Grid item xs={12} md={6} key={b._id}>
                                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #eae5dd', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                    {b.title}
                                                </Typography>
                                                <Tooltip title="下架刪除此公告">
                                                    <IconButton size="small" color="error" onClick={() => handleDeleteBulletin(b._id, b.title)}>
                                                        <DeleteOutlineIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <Typography variant="body2" sx={{ color: '#57534e', lineHeight: 1.6, flexGrow: 1, mb: 2 }}>
                                                {b.context}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                發布單位：{b.owner} ｜ 日期：{dayjs(b.date).isValid() ? dayjs(b.date).format('YYYY-MM-DD') : '近期'}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {/* ============================================================== */}
                    {/* Tab 5: 饕客意見回饋審查                                        */}
                    {/* ============================================================== */}
                    {tabVal === 5 && (
                        <Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                    遊客與饕客意見回饋清單 ({feedbacks.length} 則)
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#78716c', mt: 0.5 }}>
                                    審查遊客提交的夜市體驗、整潔建議與美食推薦回饋。
                                </Typography>
                            </Box>

                            <Box sx={{ height: 500, width: '100%' }}>
                                <DataGrid
                                    rows={feedbacks}
                                    columns={[
                                        { field: 'owner', headerName: '回饋者', width: 130 },
                                        { field: 'contact', headerName: '聯絡電話', width: 130 },
                                        { field: 'email', headerName: '電子信箱', width: 180 },
                                        { field: 'opinion', headerName: '意見回饋內容', flex: 1, minWidth: 260 },
                                        { field: 'date', headerName: '填寫時間', width: 150 }
                                    ]}
                                    pageSize={8}
                                    rowsPerPageOptions={[8, 15, 30]}
                                    disableSelectionOnClick
                                    sx={{ border: '1px solid #eae5dd', borderRadius: 2 }}
                                />
                            </Box>
                        </Box>
                    )}

                    {/* ============================================================== */}
                    {/* Tab 6: 每日流量與同步控制台                                    */}
                    {/* ============================================================== */}
                    {tabVal === 6 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                        📊 全站每日瀏覽人數與 Google Maps 定期排程控制台
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#6d655e', mt: 0.5 }}>
                                        即時追蹤訪客進入次數 (PV) 與獨立不重複訪客數 (UV)，並可一鍵觸發全台 Google Maps 數據批次更新。
                                    </Typography>
                                </Box>
                                <Stack direction="row" spacing={1.5}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<RefreshIcon />}
                                        onClick={loadAnalyticsAndSync}
                                        sx={{ borderColor: '#b7282e', color: '#b7282e', fontWeight: 700 }}
                                    >
                                        重新整理數據
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<SyncIcon />}
                                        onClick={handleTriggerGoogleSync}
                                        disabled={syncLoading}
                                        sx={{ bgcolor: '#b7282e', fontWeight: 800, '&:hover': { bgcolor: '#941e24' } }}
                                    >
                                        {syncLoading ? '執行同步中...' : '立即同步 Google Maps 店家'}
                                    </Button>
                                </Stack>
                            </Box>

                            {/* Google Maps 定期排程狀態條 */}
                            {syncStats && (
                                <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 2, bgcolor: '#fffbeb', border: '1px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#92400e' }}>
                                            ⏰ Google Maps 自動定期同步排程狀態
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#b45309' }}>
                                            排程週期：{syncStats.scheduleDescription} ({syncStats.schedule}) ｜ 上次同步時間：{syncStats.lastSyncTime ? dayjs(syncStats.lastSyncTime).format('YYYY-MM-DD HH:mm:ss') : '今日啟動已完成'}
                                        </Typography>
                                    </Box>
                                    <Chip label="定期排程守護運作中" color="success" sx={{ fontWeight: 800 }} />
                                </Paper>
                            )}

                            {analytics && (
                                <>
                                    {/* 4 大核心 KPI 指標卡 */}
                                    <Grid container spacing={2.5} sx={{ mb: 4 }}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #fee2e2', bgcolor: '#fff5f5' }}>
                                                <Typography variant="caption" sx={{ color: '#b91c1c', fontWeight: 800, textTransform: 'uppercase' }}>
                                                    今日瀏覽總人次 (PV)
                                                </Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#991b1b', my: 1 }}>
                                                    {(analytics.today?.pv || 0).toLocaleString()}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                    統計日期：{analytics.today?.date || '今日'}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #fef3c7', bgcolor: '#fffbeb' }}>
                                                <Typography variant="caption" sx={{ color: '#b45309', fontWeight: 800, textTransform: 'uppercase' }}>
                                                    今日獨立訪客 (UV)
                                                </Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#92400e', my: 1 }}>
                                                    {(analytics.today?.uv || 0).toLocaleString()}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                    不重複 IP / 裝置造訪人數
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #dbeafe', bgcolor: '#eff6ff' }}>
                                                <Typography variant="caption" sx={{ color: '#1d4ed8', fontWeight: 800, textTransform: 'uppercase' }}>
                                                    昨日全天造訪人次
                                                </Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e40af', my: 1 }}>
                                                    {(analytics.yesterday?.pv || 0).toLocaleString()}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                    昨日獨立訪客：{(analytics.yesterday?.uv || 0).toLocaleString()} 人
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #d1fae5', bgcolor: '#ecfdf5' }}>
                                                <Typography variant="caption" sx={{ color: '#047857', fontWeight: 800, textTransform: 'uppercase' }}>
                                                    累積歷史總瀏覽量
                                                </Typography>
                                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#065f46', my: 1 }}>
                                                    {(analytics.totalPv || 0).toLocaleString()}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                    累積總獨立訪客：{(analytics.totalUv || 0).toLocaleString()} 人
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    {/* 過去 7 ~ 14 天每日走勢 */}
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #f2e2d0', bgcolor: '#ffffff', mb: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <TrendingUpIcon sx={{ color: '#b7282e' }} />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                近期每日瀏覽人數與訪客趨勢報表
                                            </Typography>
                                        </Box>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: '#faf8f5' }}>
                                                        <TableCell sx={{ fontWeight: 800 }}>日期 (Date)</TableCell>
                                                        <TableCell sx={{ fontWeight: 800 }}>獨立訪客 (UV / 人數)</TableCell>
                                                        <TableCell sx={{ fontWeight: 800 }}>總瀏覽次數 (PV / 次數)</TableCell>
                                                        <TableCell sx={{ fontWeight: 800 }}>裝置比例 (行動 / 桌機)</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(analytics.history || []).map((row, rIdx) => {
                                                        const maxPv = Math.max(...(analytics.history || []).map(h => h.pv), 1);
                                                        const pct = Math.round((row.pv / maxPv) * 100);
                                                        return (
                                                            <TableRow key={rIdx} hover>
                                                                <TableCell sx={{ fontWeight: 700, color: '#2b2520' }}>
                                                                    {row.date} {row.date === analytics.today?.date && <Chip label="今日" size="small" sx={{ ml: 1, height: 20, bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 800 }} />}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#b45309' }}>
                                                                        {row.uv.toLocaleString()} 人
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell sx={{ minWidth: 160 }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#b91c1c', minWidth: 50 }}>
                                                                            {row.pv.toLocaleString()}
                                                                        </Typography>
                                                                        <Box sx={{ width: '100%', mr: 1 }}>
                                                                            <LinearProgress variant="determinate" value={pct} sx={{ height: 8, borderRadius: 4, bgcolor: '#fee2e2', '& .MuiLinearProgress-bar': { bgcolor: '#b91c1c' } }} />
                                                                        </Box>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                                        📱 {row.mobile || 0} ｜ 💻 {row.desktop || 0}
                                                                    </Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>

                                    {/* 熱門路徑排行 */}
                                    {analytics.topPages && analytics.topPages.length > 0 && (
                                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #f2e2d0', bgcolor: '#ffffff' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2b2520', mb: 2 }}>
                                                🔥 熱門瀏覽路徑與景點排行 (Top Visited Pages)
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {analytics.topPages.map((page, pIdx) => (
                                                    <Grid item xs={12} sm={6} md={4} key={pIdx}>
                                                        <Box sx={{ p: 2, borderRadius: 2, border: '1px solid #eae5dd', bgcolor: '#faf8f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Box>
                                                                <Typography variant="caption" sx={{ color: '#78716c', fontWeight: 700 }}>
                                                                    Rank #{pIdx + 1}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                                    {page.path === '/' ? '首頁 (Home)' : page.path}
                                                                </Typography>
                                                            </Box>
                                                            <Chip label={`${page.count.toLocaleString()} 次`} size="small" sx={{ bgcolor: '#fff', border: '1px solid #ddd', fontWeight: 800, color: '#b7282e' }} />
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Paper>
                                    )}
                                </>
                            )}
                        </Box>
                    )}

                </Box>
            </Paper>

            {/* ============================================================== */}
            {/* 編輯夜市彈窗 (Dialog)                                          */}
            {/* ============================================================== */}
            <Dialog open={editMarketOpen} onClose={() => setEditMarketOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 800, color: '#b7282e' }}>
                    編輯夜市聚落資料：{editingMarket?.name}
                </DialogTitle>
                <DialogContent dividers>
                    {editingMarket && (
                        <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="夜市中文名稱" value={editingMarket.name || ''} onChange={(e) => setEditingMarket({ ...editingMarket, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="夜市英文名稱" value={editingMarket.nameen || ''} onChange={(e) => setEditingMarket({ ...editingMarket, nameen: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="城市代碼 (tp/tz/tn)" value={editingMarket.marketLocation || ''} onChange={(e) => setEditingMarket({ ...editingMarket, marketLocation: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth type="number" label="緯度 (Lat)" value={editingMarket.lat || 25.0} onChange={(e) => setEditingMarket({ ...editingMarket, lat: Number(e.target.value) })} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth type="number" label="經度 (Lng)" value={editingMarket.lng || 121.5} onChange={(e) => setEditingMarket({ ...editingMarket, lng: Number(e.target.value) })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="捷運 / 交通導引" value={editingMarket.positionGuidelines || ''} onChange={(e) => setEditingMarket({ ...editingMarket, positionGuidelines: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={2} label="特色簡短摘要" value={editingMarket.brief || ''} onChange={(e) => setEditingMarket({ ...editingMarket, brief: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={3} label="歷史文化背景介紹" value={editingMarket.introduction || ''} onChange={(e) => setEditingMarket({ ...editingMarket, introduction: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="封面圖片網址 (Image URL)" value={editingMarket.marketIcon || ''} onChange={(e) => setEditingMarket({ ...editingMarket, marketIcon: e.target.value })} />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setEditMarketOpen(false)}>取消</Button>
                    <Button variant="contained" onClick={handleUpdateMarket} sx={{ bgcolor: '#b7282e', fontWeight: 800 }}>
                        確認儲存更新
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ============================================================== */}
            {/* 編輯店家彈窗 (Dialog)                                          */}
            {/* ============================================================== */}
            <Dialog open={editShopOpen} onClose={() => setEditShopOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 800, color: '#b7282e' }}>
                    編輯店家攤位：{editingShop?.shopName}
                </DialogTitle>
                <DialogContent dividers>
                    {editingShop && (
                        <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="店名" value={editingShop.shopName || ''} onChange={(e) => setEditingShop({ ...editingShop, shopName: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="英文店名" value={editingShop.shopNameEN || ''} onChange={(e) => setEditingShop({ ...editingShop, shopNameEN: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="攤號 / 門牌" value={editingShop.shopNumber || ''} onChange={(e) => setEditingShop({ ...editingShop, shopNumber: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="美食類別 (如：米其林必比登推薦)" value={editingShop.shopType || ''} onChange={(e) => setEditingShop({ ...editingShop, shopType: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="所在街區地址" value={editingShop.shopLocation || ''} onChange={(e) => setEditingShop({ ...editingShop, shopLocation: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth type="number" inputProps={{ step: "0.1" }} label="評分 (Rating)" value={editingShop.googleRating || editingShop.rating || 4.5} onChange={(e) => setEditingShop({ ...editingShop, googleRating: Number(e.target.value), rating: Number(e.target.value) })} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth type="number" label="評論數 (Review Count)" value={editingShop.googleReviewCount || editingShop.rank || 1000} onChange={(e) => setEditingShop({ ...editingShop, googleReviewCount: Number(e.target.value), rank: Number(e.target.value) })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={2} label="特色簡短標語" value={editingShop.shopShortIntroduction || ''} onChange={(e) => setEditingShop({ ...editingShop, shopShortIntroduction: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Google Maps 導航連結" value={editingShop.googlePlaceUrl || ''} onChange={(e) => setEditingShop({ ...editingShop, googlePlaceUrl: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="照片網址 (Image URL)" value={editingShop.shopIcon || ''} onChange={(e) => setEditingShop({ ...editingShop, shopIcon: e.target.value })} />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setEditShopOpen(false)}>取消</Button>
                    <Button variant="contained" onClick={handleUpdateShop} sx={{ bgcolor: '#b7282e', fontWeight: 800 }}>
                        確認儲存更新
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ============================================================== */}
            {/* 編輯美食彈窗 (Dialog)                                          */}
            {/* ============================================================== */}
            <Dialog open={editFoodOpen} onClose={() => setEditFoodOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 800, color: '#b7282e' }}>
                    編輯必吃美食：{editingFood?.foodName}
                </DialogTitle>
                <DialogContent dividers>
                    {editingFood && (
                        <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
                            <Grid item xs={12} sm={7}>
                                <TextField fullWidth label="小吃名稱" value={editingFood.foodName || ''} onChange={(e) => setEditingFood({ ...editingFood, foodName: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField fullWidth type="number" label="價格 (NT$)" value={editingFood.foodPrice || 60} onChange={(e) => setEditingFood({ ...editingFood, foodPrice: Number(e.target.value) })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="英文小吃名稱 (English Name)" value={editingFood.foodNameEN || ''} onChange={(e) => setEditingFood({ ...editingFood, foodNameEN: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={2} label="中文老饕口感介紹" value={editingFood.foodInfo || ''} onChange={(e) => setEditingFood({ ...editingFood, foodInfo: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={2} label="英文口感介紹 (English Info)" value={editingFood.foodInfoEN || ''} onChange={(e) => setEditingFood({ ...editingFood, foodInfoEN: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="美食照片網址 (Image URL)" value={editingFood.foodIcon || ''} onChange={(e) => setEditingFood({ ...editingFood, foodIcon: e.target.value })} />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setEditFoodOpen(false)}>取消</Button>
                    <Button variant="contained" onClick={handleUpdateFood} sx={{ bgcolor: '#b7282e', fontWeight: 800 }}>
                        確認儲存更新
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}