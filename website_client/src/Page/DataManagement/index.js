import React, { useState, useEffect, useRef } from 'react';
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
    Tooltip,
    Switch,
    FormControlLabel,
    Card
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
import StorageIcon from '@mui/icons-material/Storage';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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

    // DevOps 系統運維與 Docker 排程管理狀態
    const [systemStatus, setSystemStatus] = useState(null);
    const [schedulers, setSchedulers] = useState([]);
    const [systemLogs, setSystemLogs] = useState([]);
    const [logsAutoRefresh, setLogsAutoRefresh] = useState(false);
    const [devopsActionLoading, setDevopsActionLoading] = useState(false);
    const importFileRef = useRef(null);

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('user');
            if (rawUser) {
                const parsed = JSON.parse(rawUser);
                setUser(parsed);
            }
        } catch (e) { }

        loadAllData();
        loadSystemDevopsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 日誌自動滾動更新 (當管理員停留在 Tab 7 且開啟自動刷新時)
    useEffect(() => {
        let timer = null;
        if (tabVal === 7 && logsAutoRefresh) {
            timer = setInterval(() => {
                helper.helper.AsyncSystemLogs(100).then(res => {
                    if (res && res.status === 'success' && Array.isArray(res.logs)) {
                        setSystemLogs(res.logs);
                    }
                });
            }, 3000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [tabVal, logsAutoRefresh]);

    const loadSystemDevopsData = async () => {
        try {
            const [statusRes, schedRes, logsRes] = await Promise.all([
                helper.helper.AsyncSystemStatus(),
                helper.helper.AsyncSystemSchedulers(),
                helper.helper.AsyncSystemLogs(100)
            ]);
            if (statusRes && statusRes.status === 'success') {
                setSystemStatus(statusRes.data);
            }
            if (schedRes && schedRes.status === 'success' && schedRes.data?.jobs) {
                setSchedulers(schedRes.data.jobs);
            }
            if (logsRes && logsRes.status === 'success' && Array.isArray(logsRes.logs)) {
                setSystemLogs(logsRes.logs);
            }
        } catch (e) {
            console.error('Failed to load devops data:', e);
        }
    };

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

    // ==========================================
    // 8. 系統運維、Docker 容器與動態排程控制
    // ==========================================
    const handleToggleScheduler = async (jobId, jobName) => {
        try {
            const res = await helper.helper.AsyncSchedulerToggle(jobId);
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: res.message || `已切換排程「${jobName}」狀態` });
                loadSystemDevopsData();
            } else {
                setStatusMsg({ type: 'error', text: res?.message || '切換排程失敗' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '操作失敗: ' + err.message });
        }
    };

    const handleUpdateSchedulerCron = async (jobId, newCron) => {
        try {
            const res = await helper.helper.AsyncSchedulerUpdate(jobId, { cronExpression: newCron });
            if (res && res.status === 'success') {
                setStatusMsg({ type: 'success', text: `已將排程頻率更新為：${newCron}` });
                loadSystemDevopsData();
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '更新頻率失敗: ' + err.message });
        }
    };

    const handleTriggerScheduler = async (jobId, jobName) => {
        setDevopsActionLoading(true);
        setStatusMsg({ type: 'info', text: `⚡ 正在手動執行排程「${jobName}」，請稍候...` });
        try {
            const res = await helper.helper.AsyncSchedulerTrigger(jobId);
            if (res && res.status === 'success') {
                setStatusMsg({
                    type: 'success',
                    text: `🎉 排程「${jobName}」手動執行完畢！(耗時: ${res.data?.duration || 0}ms)`
                });
                loadAllData();
                loadSystemDevopsData();
            } else {
                setStatusMsg({ type: 'error', text: res?.message || '執行排程失敗' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '執行排程發生異常: ' + err.message });
        } finally {
            setDevopsActionLoading(false);
        }
    };

    const handleClearLogs = async () => {
        try {
            const res = await helper.helper.AsyncSystemLogsClear();
            if (res && res.status === 'success') {
                setSystemLogs([]);
                setStatusMsg({ type: 'success', text: '日誌緩衝區已清空' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '清空日誌失敗' });
        }
    };

    const handleExportBackup = async () => {
        setStatusMsg({ type: 'info', text: '📦 正在產生全資料庫備份檔案，請稍候...' });
        try {
            const downloadUrl = helper.helper.AsyncSystemBackupExportUrl();
            const res = await fetch(downloadUrl);
            const blob = await res.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `nightmarket_backup_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            setStatusMsg({ type: 'success', text: '🎉 全資料庫 JSON 備份檔已成功下載至您的電腦！' });
        } catch (err) {
            setStatusMsg({ type: 'error', text: '下載備份失敗: ' + err.message });
        }
    };

    const handleImportFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const parsed = JSON.parse(evt.target.result);
                if (!parsed.data) {
                    setStatusMsg({ type: 'error', text: '無效的備份 JSON 結構 (缺少 data 節點)' });
                    return;
                }

                if (!window.confirm('⚠️ 警告：確定要將此備份檔還原匯入資料庫嗎？現有同名夜市/店家與美食資料將自動覆蓋更新。')) {
                    if (importFileRef.current) importFileRef.current.value = '';
                    return;
                }

                setDevopsActionLoading(true);
                const res = await helper.helper.AsyncSystemBackupImport(parsed);
                if (res && res.status === 'success') {
                    setStatusMsg({
                        type: 'success',
                        text: `🎉 資料庫還原成功！匯入：${res.stats.importedMarkets} 夜市、${res.stats.importedShops} 店家、${res.stats.importedFoods} 美食。`
                    });
                    loadAllData();
                    loadSystemDevopsData();
                } else {
                    setStatusMsg({ type: 'error', text: res?.message || '還原失敗' });
                }
            } catch (err) {
                setStatusMsg({ type: 'error', text: '解析或上傳備份 JSON 檔案失敗: ' + err.message });
            } finally {
                setDevopsActionLoading(false);
                if (importFileRef.current) importFileRef.current.value = '';
            }
        };
        reader.readAsText(file);
    };

    const handleSeedDatabase = async () => {
        if (!window.confirm('🌱 確定要初始化全台夜市標準數據庫嗎？此操作適合 Docker 剛啟動上線時快速載入全台指標夜市與 Google Maps 推薦名店。')) {
            return;
        }

        setDevopsActionLoading(true);
        setStatusMsg({ type: 'info', text: '🌱 正在初始化全台標準夜市與名店資料，請稍候...' });
        try {
            const res = await helper.helper.AsyncSystemDatabaseSeed();
            if (res && res.status === 'success') {
                setStatusMsg({
                    type: 'success',
                    text: `🎉 全台標準數據庫初始化完成！當前總計：${res.summary.totalMarkets} 處夜市、${res.summary.totalShops} 間名店、${res.summary.totalFoods} 道美食！`
                });
                loadAllData();
                loadSystemDevopsData();
            } else {
                setStatusMsg({ type: 'error', text: res?.message || '初始化失敗' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '初始化過程發生異常: ' + err.message });
        } finally {
            setDevopsActionLoading(false);
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
                    <Tab icon={<InsightsIcon />} iconPosition="start" label="每日流量統計" />
                    <Tab icon={<StorageIcon />} iconPosition="start" label="系統運維與容器排程" />
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

                    {/* ============================================================== */}
                    {/* Tab 7: 系統運維、Docker 容器與動態排程控制台                     */}
                    {/* ============================================================== */}
                    {tabVal === 7 && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e' }}>
                                        🎛️ Docker 容器運維、自動定期排程與全庫控制中心
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#6d655e', mt: 0.5 }}>
                                        全站資料庫作業、Google Maps 同步週期、備份還原與容器終端日誌均可於網頁直接操作，不需登入伺服器。
                                    </Typography>
                                </Box>
                                <Stack direction="row" spacing={1.5}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<RefreshIcon />}
                                        onClick={loadSystemDevopsData}
                                        disabled={devopsActionLoading}
                                        sx={{ borderColor: '#b7282e', color: '#b7282e', fontWeight: 700 }}
                                    >
                                        重新整理系統狀態
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<PlayArrowIcon />}
                                        onClick={handleSeedDatabase}
                                        disabled={devopsActionLoading}
                                        sx={{ bgcolor: '#b7282e', fontWeight: 800, '&:hover': { bgcolor: '#941e24' } }}
                                    >
                                        🌱 初始化全台夜市標準數據
                                    </Button>
                                </Stack>
                            </Box>

                            {/* 1. 系統資源與容器狀態 KPI 卡片 */}
                            {systemStatus && (
                                <Grid container spacing={2.5} sx={{ mb: 4 }}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #dbeafe', bgcolor: '#eff6ff' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#1e40af', fontWeight: 800 }}>
                                                    運行環境與服務狀態
                                                </Typography>
                                                <Chip
                                                    label={systemStatus.server?.isDocker ? '🐳 Docker 容器' : '💻 主機服務'}
                                                    size="small"
                                                    color={systemStatus.server?.isDocker ? 'primary' : 'default'}
                                                    sx={{ fontWeight: 800 }}
                                                />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e3a8a', my: 0.5 }}>
                                                {systemStatus.server?.uptimeFormatted || '0 秒'}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                                                Node: {systemStatus.server?.nodeVersion} ｜ 平台: {systemStatus.server?.platform} ({systemStatus.server?.arch})
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #fef3c7', bgcolor: '#fffbeb' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#92400e', fontWeight: 800 }}>
                                                    記憶體負載 (Node.js)
                                                </Typography>
                                                <Chip label={`RAM: ${systemStatus.memory?.memUsagePercent || 0}%`} size="small" sx={{ fontWeight: 800, bgcolor: '#fde68a' }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#78350f', my: 0.5 }}>
                                                {systemStatus.memory?.heapUsedMb || 0} MB
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                Heap: {systemStatus.memory?.heapTotalMb}MB ｜ RSS: {systemStatus.memory?.rssMb}MB
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #dcfce7', bgcolor: '#f0fdf4' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#166534', fontWeight: 800 }}>
                                                    MongoDB 資料庫狀態
                                                </Typography>
                                                <Chip label="已連線正常" size="small" color="success" sx={{ fontWeight: 800 }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#14532d', my: 0.5 }}>
                                                {systemStatus.database?.dbName || 'fyp'}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#15803d' }}>
                                                夜市: {systemStatus.database?.collections?.markets || 0} ｜ 店家: {systemStatus.database?.collections?.shops || 0} ｜ 美食: {systemStatus.database?.collections?.foods || 0}
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #fae8ff', bgcolor: '#fdf4ff' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="caption" sx={{ color: '#86198f', fontWeight: 800 }}>
                                                    自動排程監護任務
                                                </Typography>
                                                <Chip label={`${schedulers.filter(j => j.enabled).length} 項啟用中`} size="small" color="secondary" sx={{ fontWeight: 800 }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#701a75', my: 0.5 }}>
                                                {schedulers.length} 個排程
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#a21caf' }}>
                                                全自動執行 Google Maps 採集與流量歸檔
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            )}

                            {/* 2. 動態定期排程控制中心 */}
                            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #eae5dd', bgcolor: '#faf8f5' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                            ⏰ 後台全自動定期排程管理 (Cron Schedulers)
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#78716c' }}>
                                            可在網頁直接暫停/重啟排程工作或變更執行週期，設定立即套用且不需重啟容器服務。
                                        </Typography>
                                    </Box>
                                </Box>

                                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eae5dd', borderRadius: 2 }}>
                                    <Table>
                                        <TableHead sx={{ bgcolor: '#f5f0ea' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 800 }}>排程名稱與描述</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }}>排程開關</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }}>執行頻率 (Cron)</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }}>上次執行狀態</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }}>上次執行時間 / 耗時</TableCell>
                                                <TableCell sx={{ fontWeight: 800 }} align="right">手動觸發</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {schedulers.map((job) => (
                                                <TableRow key={job.id} hover>
                                                    <TableCell>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                                            {job.name}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: '#78716c' }}>
                                                            {job.description}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={job.enabled}
                                                                    onChange={() => handleToggleScheduler(job.id, job.name)}
                                                                    color="success"
                                                                />
                                                            }
                                                            label={job.enabled ? "運行中" : "已暫停"}
                                                            sx={{ '& .MuiTypography-root': { fontWeight: 700, fontSize: '0.85rem' } }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl size="small" sx={{ minWidth: 160 }}>
                                                            <Select
                                                                value={job.cronExpression}
                                                                onChange={(e) => handleUpdateSchedulerCron(job.id, e.target.value)}
                                                                sx={{ fontSize: '0.85rem', fontWeight: 700 }}
                                                            >
                                                                <MenuItem value="0 4 * * *">每日凌晨 04:00 (0 4 * * *)</MenuItem>
                                                                <MenuItem value="5 0 * * *">每日凌晨 00:05 (5 0 * * *)</MenuItem>
                                                                <MenuItem value="0 */6 * * *">每 6 小時一次 (0 */6 * * *)</MenuItem>
                                                                <MenuItem value="0 */12 * * *">每 12 小時一次 (0 */12 * * *)</MenuItem>
                                                                <MenuItem value="0 * * * *">每小時整點 (0 * * * *)</MenuItem>
                                                                <MenuItem value="*/30 * * * *">每 30 分鐘 (*/30 * * * *)</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        {job.lastStatus === 'success' && <Chip label="執行成功" size="small" color="success" sx={{ fontWeight: 800 }} />}
                                                        {job.lastStatus === 'running' && <Chip label="執行中..." size="small" color="warning" sx={{ fontWeight: 800 }} />}
                                                        {job.lastStatus === 'failed' && <Chip label="失敗" size="small" color="error" sx={{ fontWeight: 800 }} />}
                                                        {job.lastStatus === 'idle' && <Chip label="等待排程中" size="small" sx={{ fontWeight: 700, bgcolor: '#e5e7eb' }} />}
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.85rem', color: '#57534e' }}>
                                                        {job.lastRun ? dayjs(job.lastRun).format('YYYY-MM-DD HH:mm:ss') : '尚未執行'}
                                                        {job.lastDuration ? ` (${job.lastDuration}ms)` : ''}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            startIcon={<PlayArrowIcon />}
                                                            onClick={() => handleTriggerScheduler(job.id, job.name)}
                                                            disabled={devopsActionLoading || job.lastStatus === 'running'}
                                                            sx={{ bgcolor: '#b7282e', fontWeight: 800, '&:hover': { bgcolor: '#941e24' } }}
                                                        >
                                                            立即執行
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>

                            {/* 3. 資料庫全庫操作：備份、還原與種子數據 */}
                            <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #eae5dd', bgcolor: '#faf8f5' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2b2520', mb: 2 }}>
                                    📦 全端資料庫備份、還原與種子資料管理
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Card elevation={0} sx={{ p: 2.5, height: '100%', borderRadius: 2.5, border: '1px solid #e2e8f0', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <CloudDownloadIcon sx={{ color: '#2563eb' }} />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                                        一鍵匯出全站 JSON 備份
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5 }}>
                                                    將夜市聚落、攤位店家、招牌美食、會員帳號、公告與每日統計數據打包為單一 JSON 備份檔下載。
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="outlined"
                                                startIcon={<CloudDownloadIcon />}
                                                onClick={handleExportBackup}
                                                fullWidth
                                                sx={{ borderColor: '#2563eb', color: '#2563eb', fontWeight: 800 }}
                                            >
                                                下載全資料庫備份檔
                                            </Button>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Card elevation={0} sx={{ p: 2.5, height: '100%', borderRadius: 2.5, border: '1px solid #e2e8f0', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <CloudUploadIcon sx={{ color: '#059669' }} />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                                        匯入 JSON 備份檔案還原
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5 }}>
                                                    上傳既有的備份 JSON 檔案，系統將自動比對資料並進行 Upsert 匯入還原，維護資料完整性。
                                                </Typography>
                                            </Box>
                                            <input
                                                type="file"
                                                ref={importFileRef}
                                                accept=".json"
                                                style={{ display: 'none' }}
                                                onChange={handleImportFileChange}
                                            />
                                            <Button
                                                variant="outlined"
                                                startIcon={<CloudUploadIcon />}
                                                onClick={() => importFileRef.current && importFileRef.current.click()}
                                                fullWidth
                                                disabled={devopsActionLoading}
                                                sx={{ borderColor: '#059669', color: '#059669', fontWeight: 800 }}
                                            >
                                                選擇 JSON 檔案還原
                                            </Button>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Card elevation={0} sx={{ p: 2.5, height: '100%', borderRadius: 2.5, border: '1px solid #e2e8f0', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <PlayArrowIcon sx={{ color: '#b7282e' }} />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                                        初始化標準夜市數據庫
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5 }}>
                                                    適合全新啟動的 Docker 容器！一鍵快速注入全台 8 大夜市、50+ 排隊名店與 100+ 經典美食資料。
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                startIcon={<PlayArrowIcon />}
                                                onClick={handleSeedDatabase}
                                                fullWidth
                                                disabled={devopsActionLoading}
                                                sx={{ bgcolor: '#b7282e', fontWeight: 800, '&:hover': { bgcolor: '#941e24' } }}
                                            >
                                                一鍵初始化夜市資料庫
                                            </Button>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* 4. 容器終端即時日誌檢視器 */}
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #27272a', bgcolor: '#09090b', color: '#fafafa' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <TerminalIcon sx={{ color: '#4ade80' }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#4ade80', fontFamily: 'monospace' }}>
                                            Docker 容器即時控制台日誌 (Live Container Logs)
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={logsAutoRefresh}
                                                    onChange={(e) => setLogsAutoRefresh(e.target.checked)}
                                                    color="success"
                                                    size="small"
                                                />
                                            }
                                            label="每 3 秒自動刷新"
                                            sx={{ color: '#a1a1aa', '& .MuiTypography-root': { fontSize: '0.85rem' } }}
                                        />
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<RefreshIcon />}
                                            onClick={() => helper.helper.AsyncSystemLogs(100).then(r => r.logs && setSystemLogs(r.logs))}
                                            sx={{ borderColor: '#52525b', color: '#e4e4e7', fontSize: '0.8rem' }}
                                        >
                                            刷新日誌
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={handleClearLogs}
                                            sx={{ borderColor: '#52525b', color: '#f87171', fontSize: '0.8rem' }}
                                        >
                                            清空日誌緩衝
                                        </Button>
                                    </Stack>
                                </Box>

                                <Box
                                    sx={{
                                        bgcolor: '#18181b',
                                        p: 2,
                                        borderRadius: 2,
                                        fontFamily: 'Consolas, "Fira Code", monospace',
                                        fontSize: '0.85rem',
                                        height: 380,
                                        overflowY: 'auto',
                                        border: '1px solid #27272a',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {systemLogs.length === 0 ? (
                                        <Typography sx={{ color: '#71717a', fontStyle: 'italic', fontFamily: 'monospace' }}>
                                            目前尚無日誌記錄...
                                        </Typography>
                                    ) : (
                                        systemLogs.map((log) => {
                                            let levelColor = '#38bdf8'; // INFO
                                            if (log.level === 'CRON') levelColor = '#c084fc';
                                            else if (log.level === 'SYNC') levelColor = '#34d399';
                                            else if (log.level === 'WARN') levelColor = '#fbbf24';
                                            else if (log.level === 'ERROR') levelColor = '#f87171';

                                            return (
                                                <Box key={log.id} sx={{ mb: 0.5, wordBreak: 'break-all', display: 'flex', gap: 1 }}>
                                                    <span style={{ color: '#71717a' }}>[{dayjs(log.timestamp).format('HH:mm:ss')}]</span>
                                                    <span style={{ color: levelColor, fontWeight: 700, minWidth: 60 }}>[{log.level}]</span>
                                                    <span style={{ color: '#e4e4e7' }}>{log.message}</span>
                                                </Box>
                                            );
                                        })
                                    )}
                                </Box>
                            </Paper>
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