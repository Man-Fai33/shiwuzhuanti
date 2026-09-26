import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    Avatar,
    Button,
    Grid,
    Divider,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Alert,
    CircularProgress,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import helper from '../Helper/helper';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openPwd, setOpenPwd] = useState(false);

    // Edit profile state
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editLocation, setEditLocation] = useState("");
    const [editIntro, setEditIntro] = useState("");

    // Change password state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });
    const [uploading, setUploading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    useEffect(() => {
        try {
            const raw = localStorage.getItem('user');
            if (raw) {
                const parsed = JSON.parse(raw);
                setUser(parsed);
                setEditName(parsed.username || "");
                setEditPhone(parsed.phone || "");
                setEditLocation(parsed.location || "");
                setEditIntro(parsed.introduction || "");
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleSaveProfile = async () => {
        if (!editName.trim()) {
            setStatusMsg({ type: 'error', text: '使用者姓名不可為空' });
            return;
        }

        try {
            const updatedUser = {
                ...user,
                username: editName.trim(),
                phone: editPhone.trim(),
                location: editLocation.trim(),
                introduction: editIntro.trim()
            };
            const res = await helper.helper.AsyncUserEdit(updatedUser);
            if (res && (res.user || res.status === "success")) {
                const finalUser = res.user || updatedUser;
                setUser(finalUser);
                localStorage.setItem('user', JSON.stringify(finalUser));
                setOpenEdit(false);
                setStatusMsg({ type: 'success', text: '✅ 個人資料更新成功！' });
            } else {
                setStatusMsg({ type: 'error', text: '資料更新未成功，請稍後重試' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '伺服器連線失敗' });
        }
    };

    const handleSavePassword = async () => {
        setPwdMsg({ type: '', text: '' });
        if (!oldPassword || !newPassword) {
            setPwdMsg({ type: 'error', text: '請輸入舊密碼與新密碼' });
            return;
        }
        if (oldPassword !== user.password) {
            setPwdMsg({ type: 'error', text: '舊密碼不相符，請重新確認' });
            return;
        }
        if (newPassword.length < 4) {
            setPwdMsg({ type: 'error', text: '新密碼長度至少需要 4 位字元' });
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setPwdMsg({ type: 'error', text: '兩次輸入的新密碼不一致' });
            return;
        }

        try {
            const updatedUser = { ...user, password: newPassword };
            const res = await helper.helper.AsyncUserEdit(updatedUser);
            if (res) {
                alert("🎉 密碼修改成功！請重新登入");
                localStorage.clear();
                window.location.href = "/signin";
            }
        } catch (err) {
            setPwdMsg({ type: 'error', text: '密碼更新發生異常' });
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('Image', file);
            const uploadRes = await helper.helper.AsyncUploadImage(formData);
            if (uploadRes && uploadRes.path) {
                const updatedUser = { ...user, iconUrl: uploadRes.path };
                const saveRes = await helper.helper.AsyncUserEdit(updatedUser);
                const finalUser = saveRes.user || updatedUser;
                setUser(finalUser);
                localStorage.setItem('user', JSON.stringify(finalUser));
                setStatusMsg({ type: 'success', text: '頭像更新成功！' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '頭像上傳失敗' });
        } finally {
            setUploading(false);
        }
    };

    // 如果未登入
    if (!user) {
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
                    <Typography variant="h3" sx={{ mb: 2 }}>🏮</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b2520', mb: 1.5 }}>
                        尚未登入會員
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6d655e', mb: 3 }}>
                        登入即可解鎖個人專屬夜市打卡、收藏私房美食、以及申請成為夜市攤位店長！
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            href="/signin"
                            sx={{
                                bgcolor: '#b7282e',
                                fontWeight: 700,
                                px: 3,
                                '&:hover': { bgcolor: '#941e24' }
                            }}
                        >
                            前往登入
                        </Button>
                        <Button
                            variant="outlined"
                            href="/signup"
                            sx={{
                                color: '#b7282e',
                                borderColor: '#b7282e',
                                fontWeight: 700,
                                px: 3,
                                '&:hover': { borderColor: '#941e24', bgcolor: '#fcedea' }
                            }}
                        >
                            立即註冊
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {statusMsg.text && (
                <Alert severity={statusMsg.type} sx={{ mb: 3, borderRadius: 2 }}>
                    {statusMsg.text}
                </Alert>
            )}

            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 3,
                    border: '1px solid #f2e2d0',
                    background: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 100%)'
                }}
            >
                {/* 頂部身分卡 */}
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                                src={user.iconUrl}
                                alt={user.username}
                                sx={{
                                    width: 130,
                                    height: 130,
                                    mx: 'auto',
                                    border: '4px solid #f2e2d0',
                                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 70, color: '#8c8077' }} />
                            </Avatar>
                            <label htmlFor="avatar-upload-input">
                                <input
                                    hidden
                                    id="avatar-upload-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                />
                                <Button
                                    component="span"
                                    size="small"
                                    variant="contained"
                                    disabled={uploading}
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        minWidth: 36,
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        p: 0,
                                        bgcolor: '#b7282e',
                                        '&:hover': { bgcolor: '#941e24' }
                                    }}
                                >
                                    {uploading ? <CircularProgress size={18} color="inherit" /> : <PhotoCameraIcon fontSize="small" />}
                                </Button>
                            </label>
                        </Box>
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: '#8c8077' }}>
                            點選相機更換頭像
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b2520' }}>
                                {user.username}
                            </Typography>
                            <Chip
                                label={user.role === 'admin' ? '🏮 平台管理員' : '🥢 夜市饕客會員'}
                                sx={{
                                    bgcolor: user.role === 'admin' ? '#b7282e' : '#fcedea',
                                    color: user.role === 'admin' ? '#fff' : '#b7282e',
                                    fontWeight: 700
                                }}
                            />
                            <Chip
                                label={user.gender ? "先生" : "女士"}
                                variant="outlined"
                                size="small"
                                sx={{ borderColor: '#d9cbbe' }}
                            />
                        </Box>

                        <Typography variant="body2" sx={{ color: '#6d655e', mb: 2 }}>
                            帳號信箱：{user.email}
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#8c8077', fontWeight: 600 }}>聯絡電話</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.phone || "尚未提供"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#8c8077', fontWeight: 600 }}>所在地區</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.location || "台灣"}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3.5 }} />

                {/* 個人簡介 */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2b2520', mb: 1 }}>
                        🏮 饕客心得簡介
                    </Typography>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: '#fdfbfa',
                            borderColor: '#efe3d5',
                            color: '#4a423a',
                            minHeight: 60
                        }}
                    >
                        {user.introduction || "這個夜市愛好者很神秘，還沒有填寫自我介紹喔！"}
                    </Paper>
                </Box>

                {/* 操作按鈕群 */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => setOpenEdit(true)}
                        sx={{
                            color: '#5a5048',
                            borderColor: '#c7b9ab',
                            fontWeight: 600,
                            '&:hover': { borderColor: '#b7282e', color: '#b7282e' }
                        }}
                    >
                        編輯個人資料
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<VpnKeyIcon />}
                        onClick={() => setOpenPwd(true)}
                        sx={{
                            color: '#5a5048',
                            borderColor: '#c7b9ab',
                            fontWeight: 600,
                            '&:hover': { borderColor: '#b7282e', color: '#b7282e' }
                        }}
                    >
                        修改登入密碼
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<StorefrontIcon />}
                        href="/account"
                        sx={{
                            bgcolor: '#e08a00',
                            color: '#fff',
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#be7400' }
                        }}
                    >
                        申請夜市攤位
                    </Button>
                </Stack>
            </Paper>

            {/* 編輯個人資料 Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 800, color: '#2b2520' }}>
                    🏮 編輯個人資料
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <TextField
                            label="使用者名稱"
                            fullWidth
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        <TextField
                            label="聯絡電話"
                            fullWidth
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                        />
                        <TextField
                            label="所在地區"
                            fullWidth
                            value={editLocation}
                            onChange={(e) => setEditLocation(e.target.value)}
                        />
                        <TextField
                            label="個人自我介紹"
                            fullWidth
                            multiline
                            rows={3}
                            value={editIntro}
                            onChange={(e) => setEditIntro(e.target.value)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenEdit(false)} sx={{ color: '#6d655e' }}>取消</Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveProfile}
                        sx={{ bgcolor: '#b7282e', '&:hover': { bgcolor: '#941e24' } }}
                    >
                        儲存變更
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 修改密碼 Dialog */}
            <Dialog open={openPwd} onClose={() => setOpenPwd(false)} fullWidth maxWidth="xs">
                <DialogTitle sx={{ fontWeight: 800, color: '#2b2520' }}>
                    🔐 修改登入密碼
                </DialogTitle>
                <DialogContent dividers>
                    {pwdMsg.text && (
                        <Alert severity={pwdMsg.type} sx={{ mb: 2, borderRadius: 2 }}>
                            {pwdMsg.text}
                        </Alert>
                    )}
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="目前舊密碼"
                            type="password"
                            fullWidth
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            label="設定新密碼"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            label="再次確認新密碼"
                            type="password"
                            fullWidth
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenPwd(false)} sx={{ color: '#6d655e' }}>取消</Button>
                    <Button
                        variant="contained"
                        onClick={handleSavePassword}
                        sx={{ bgcolor: '#b7282e', '&:hover': { bgcolor: '#941e24' } }}
                    >
                        確認變更
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}