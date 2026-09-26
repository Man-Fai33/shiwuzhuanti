import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// Specialized Icons for Taiwan Night Market
import StorefrontIcon from '@mui/icons-material/Storefront';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CampaignIcon from '@mui/icons-material/Campaign';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useLanguage } from '../../Context/LanguageContext';
import { useWishlist } from '../../Context/WishlistContext';

const drawerWidth = 270;

export default function DrawerBar() {
    const { lang, toggleLang, t } = useLanguage();
    const { wishlist, removeFromWishlist, clearWishlist, totalItems, totalPrice } = useWishlist();
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const [open, setOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleSignOut = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const navItems = [
        { label: t('nav_home'), path: '/index', icon: <HomeIcon /> },
        { label: t('nav_markets'), path: '/nightmarket', icon: <StorefrontIcon /> },
        { label: t('nav_foods'), path: '/Food', icon: <RestaurantMenuIcon /> },
        { label: t('nav_guide'), path: '/guide', icon: <ExploreIcon /> },
        { label: t('nav_bulletin'), path: '/bulletinBoard', icon: <CampaignIcon /> },
        { label: t('nav_feedback'), path: '/feedback', icon: <FeedbackIcon /> },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* 現代台灣生活美學頂部導覽列 (Translucent Glassmorphism) */}
            <AppBar
                position="fixed"
                sx={{
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderBottom: '1px solid #EAE5DD',
                    boxShadow: '0 2px 14px rgba(28, 25, 23, 0.04)',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 1.5, sm: 2, md: 3 }, flexWrap: 'nowrap', minHeight: { xs: 58, sm: 66 } }}>
                    {/* 左側：漢堡選單與品牌名稱 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: { xs: 0.5, sm: 1.5 }, color: '#1C1917' }}
                        >
                            <MenuIcon sx={{ fontSize: 26 }} />
                        </IconButton>

                        <Box
                            component="a"
                            href="/index"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.2,
                                textDecoration: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #B91C1C 0%, #C2410C 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFF',
                                    fontWeight: 900,
                                    fontSize: '0.95rem',
                                    boxShadow: '0 2px 6px rgba(185, 28, 28, 0.3)',
                                    flexShrink: 0,
                                }}
                            >
                                市
                            </Box>
                            <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                    fontFamily: "'Noto Serif TC', serif",
                                    fontWeight: 900,
                                    letterSpacing: '-0.01em',
                                    fontSize: { xs: '1.05rem', sm: '1.25rem', md: '1.35rem' },
                                    color: '#1C1917',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {t('brand_title')}
                            </Typography>
                            <Chip
                                label={t('brand_badge')}
                                size="small"
                                sx={{
                                    display: { xs: 'none', lg: 'inline-flex' },
                                    backgroundColor: '#F5EBE1',
                                    color: '#991B1B',
                                    fontWeight: 700,
                                    fontSize: '0.72rem',
                                    height: '22px',
                                    border: '1px solid #EADBCC',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* 中間：Desktop 快捷選單 */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 0.4, lg: 0.8 }, flexShrink: 1, minWidth: 0 }}>
                        <Button href="/nightmarket" sx={{ color: '#44403C', fontWeight: 600, fontSize: { md: '0.85rem', lg: '0.92rem' }, px: { md: 1, lg: 1.5 }, whiteSpace: 'nowrap', minWidth: 'auto', borderRadius: '8px', '&:hover': { backgroundColor: '#F5F2EC', color: '#B91C1C' } }}>
                            {t('nav_markets')}
                        </Button>
                        <Button href="/Food" sx={{ color: '#44403C', fontWeight: 600, fontSize: { md: '0.85rem', lg: '0.92rem' }, px: { md: 1, lg: 1.5 }, whiteSpace: 'nowrap', minWidth: 'auto', borderRadius: '8px', '&:hover': { backgroundColor: '#F5F2EC', color: '#B91C1C' } }}>
                            {t('nav_foods')}
                        </Button>
                        <Button href="/guide" sx={{ color: '#B91C1C', fontWeight: 700, fontSize: { md: '0.85rem', lg: '0.92rem' }, px: { md: 1.2, lg: 1.6 }, whiteSpace: 'nowrap', minWidth: 'auto', backgroundColor: '#FEF2F2', borderRadius: '20px', border: '1px solid #FECACA', '&:hover': { backgroundColor: '#FEE2E2' } }}>
                            🧭 {t('nav_guide')}
                        </Button>
                        <Button href="/bulletinBoard" sx={{ color: '#44403C', fontWeight: 600, fontSize: { md: '0.85rem', lg: '0.92rem' }, px: { md: 1, lg: 1.5 }, whiteSpace: 'nowrap', minWidth: 'auto', borderRadius: '8px', '&:hover': { backgroundColor: '#F5F2EC', color: '#B91C1C' } }}>
                            {t('nav_bulletin')}
                        </Button>
                        <Button href="/feedback" sx={{ color: '#44403C', fontWeight: 600, fontSize: { md: '0.85rem', lg: '0.92rem' }, px: { md: 1, lg: 1.5 }, whiteSpace: 'nowrap', minWidth: 'auto', borderRadius: '8px', '&:hover': { backgroundColor: '#F5F2EC', color: '#B91C1C' } }}>
                            {t('nav_feedback')}
                        </Button>
                        {user && user.role === 'admin' && (
                            <Button href="/datamanagement" sx={{ color: '#D97706', fontWeight: 700, fontSize: { md: '0.84rem', lg: '0.9rem' }, px: { md: 1, lg: 1.2 }, whiteSpace: 'nowrap', minWidth: 'auto', border: '1px solid #FDE68A', backgroundColor: '#FFFBEB', borderRadius: '6px' }}>
                                ⚙️ {t('nav_admin')}
                            </Button>
                        )}
                    </Box>

                    {/* 右側：覓食清單 + 語言切換 + 登入 / 會員頭像 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.6, sm: 1 }, flexShrink: 0 }}>
                        {/* 旅人覓食清單按鈕 */}
                        <Tooltip title={lang === 'en' ? 'My Food Wishlist' : '今晚覓食清單'}>
                            <Button
                                onClick={() => setWishlistOpen(true)}
                                size="small"
                                sx={{
                                    color: '#292524',
                                    fontWeight: 700,
                                    fontSize: '0.82rem',
                                    borderRadius: '20px',
                                    px: { xs: 0.9, sm: 1.3 },
                                    py: 0.4,
                                    minWidth: 'auto',
                                    whiteSpace: 'nowrap',
                                    border: totalItems > 0 ? '1px solid #FCD34D' : '1px solid #E7E5E4',
                                    backgroundColor: totalItems > 0 ? '#FEF3C7' : '#F5F5F4',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    '&:hover': { backgroundColor: '#E7E5E4' }
                                }}
                            >
                                <Badge badgeContent={totalItems} color="error">
                                    <FavoriteIcon sx={{ fontSize: 17, color: totalItems > 0 ? '#B91C1C' : '#78716C' }} />
                                </Badge>
                                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: totalItems > 0 ? '6px' : '0px', whiteSpace: 'nowrap' }}>
                                    {lang === 'en' ? 'Wishlist' : '覓食清單'}
                                </Box>
                            </Button>
                        </Tooltip>

                        {/* 中英文切換按鈕 */}
                        <Button
                            onClick={toggleLang}
                            size="small"
                            startIcon={<TranslateIcon fontSize="small" sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                            sx={{
                                color: '#292524',
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                borderRadius: '20px',
                                px: { xs: 1, sm: 1.4 },
                                py: 0.4,
                                minWidth: 'auto',
                                whiteSpace: 'nowrap',
                                border: '1px solid #E7E5E4',
                                backgroundColor: '#FFFFFF',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: '#F5F5F4',
                                    borderColor: '#D6D3D1',
                                }
                            }}
                        >
                            {lang === 'zh' ? 'EN' : '中文'}
                        </Button>

                        {user ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Tooltip title="會員選單">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
                                        <Avatar
                                            alt={user.username || 'User'}
                                            src={user.iconUrl || undefined}
                                            sx={{
                                                bgcolor: '#B91C1C',
                                                color: '#FFF',
                                                fontWeight: 800,
                                                border: '2px solid #EAE5DD',
                                                width: 36,
                                                height: 36,
                                            }}
                                        >
                                            {user.username ? user.username.charAt(0) : '友'}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    PaperProps={{
                                        sx: {
                                            mt: 1.5,
                                            minWidth: 170,
                                            borderRadius: '12px',
                                            boxShadow: '0 8px 24px rgba(28,25,23,0.1)',
                                            border: '1px solid #EAE5DD',
                                        }
                                    }}
                                >
                                    <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #EAE5DD' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#B91C1C' }}>
                                            {user.username || '會員用戶'}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#78716C' }}>
                                            {user.email}
                                        </Typography>
                                    </Box>
                                    <MenuItem component="a" href="/profile" onClick={handleCloseUserMenu}>
                                        <AccountCircleIcon fontSize="small" sx={{ mr: 1, color: '#B91C1C' }} /> {t('nav_profile')}
                                    </MenuItem>
                                    <MenuItem component="a" href="/account" onClick={handleCloseUserMenu}>
                                        <StorefrontIcon fontSize="small" sx={{ mr: 1, color: '#B91C1C' }} /> {t('nav_account')}
                                    </MenuItem>
                                    {user.role === 'admin' && (
                                        <MenuItem component="a" href="/datamanagement" onClick={handleCloseUserMenu}>
                                            <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1, color: '#D97706' }} /> {t('nav_admin')}
                                        </MenuItem>
                                    )}
                                    <Divider />
                                    <MenuItem onClick={handleSignOut} sx={{ color: '#DC2626', fontWeight: 700 }}>
                                        <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> {t('nav_signout')}
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexShrink: 0 }}>
                                <Button
                                    href="/signin"
                                    size="small"
                                    sx={{
                                        color: '#44403C',
                                        fontWeight: 600,
                                        borderRadius: '8px',
                                        px: { xs: 0.8, sm: 1.4 },
                                        minWidth: 'auto',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.82rem',
                                        '&:hover': { backgroundColor: '#F5F5F4', color: '#1C1917' }
                                    }}
                                >
                                    {t('nav_signin')}
                                </Button>
                                <Button
                                    href="/signup"
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#B91C1C',
                                        color: '#FFF',
                                        fontWeight: 700,
                                        borderRadius: '20px',
                                        px: { xs: 1, sm: 1.6 },
                                        minWidth: 'auto',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.82rem',
                                        boxShadow: '0 2px 6px rgba(185, 28, 28, 0.25)',
                                        '&:hover': { backgroundColor: '#991B1B' }
                                    }}
                                >
                                    {t('nav_signup')}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* 側邊抽屜選單 */}
            <Drawer
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                sx={{
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#FFFDF9',
                        borderRight: '1px solid #EAE0D5',
                    },
                }}
            >
                {/* 抽屜頂部標頭 */}
                <Box
                    sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 30,
                                height: 30,
                                borderRadius: '6px',
                                background: '#B91C1C',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFF',
                                fontWeight: 900,
                                fontSize: '0.9rem',
                            }}
                        >
                            市
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: "'Noto Serif TC', serif", fontSize: '1.1rem' }}>
                                {t('brand_title')}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#D6CEC2', fontWeight: 500 }}>
                                {t('brand_sub')}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={handleDrawerClose} sx={{ color: '#D6CEC2', '&:hover': { color: '#FFF' } }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider />

                {/* 導覽項目 */}
                <List sx={{ pt: 1 }}>
                    {navItems.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                component="a"
                                href={item.path}
                                onClick={handleDrawerClose}
                                sx={{
                                    py: 1.5,
                                    px: 2.5,
                                    borderRadius: '8px',
                                    mx: 1,
                                    my: 0.5,
                                    '&:hover': {
                                        backgroundColor: 'rgba(198, 40, 40, 0.08)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: '#C62828', minWidth: 42 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: 700,
                                        color: '#2C2622',
                                        fontSize: '0.98rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {/* 管理員專區 */}
                    {user && user.role === 'admin' && (
                        <>
                            <Divider sx={{ my: 1 }} />
                            <ListItem disablePadding>
                                <ListItemButton
                                    component="a"
                                    href="/datamanagement"
                                    onClick={handleDrawerClose}
                                    sx={{
                                        py: 1.5,
                                        px: 2.5,
                                        borderRadius: '8px',
                                        mx: 1,
                                        my: 0.5,
                                        backgroundColor: 'rgba(255, 143, 0, 0.08)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 143, 0, 0.15)',
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: '#FF8F00', minWidth: 42 }}>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={t('nav_admin')}
                                        primaryTypographyProps={{
                                            fontWeight: 800,
                                            color: '#D84315',
                                            fontSize: '0.98rem'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </>
                    )}
                </List>

                {/* 抽屜底部資訊 */}
                <Box sx={{ mt: 'auto', p: 2.5, textAlign: 'center', backgroundColor: '#F7F5F0', borderTop: '1px solid #EAE5DD' }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#1C1917' }}>
                        {lang === 'zh' ? '尋味台灣 ‧ 逗陣來迺夜市' : 'Taiwan Street Food & Living Guide'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#78716C', display: 'block', mt: 0.5 }}>
                        {t('brand_sub')}
                    </Typography>
                </Box>
            </Drawer>

            {/* 旅人今晚覓食口袋名單 Dialog */}
            <Dialog
                open={wishlistOpen}
                onClose={() => setWishlistOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        border: '1px solid #EAE5DD',
                        boxShadow: '0 12px 36px rgba(28, 25, 23, 0.12)',
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, px: 3, pt: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FavoriteIcon sx={{ color: '#B91C1C', fontSize: 24 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1917', fontFamily: "'Noto Serif TC', serif" }}>
                            {lang === 'en' ? 'My Food Wishlist' : '今晚夜市必吃清單'}
                        </Typography>
                    </Box>
                    <Chip label={`${totalItems} ${lang === 'en' ? 'Dishes' : '道小吃'}`} size="small" sx={{ backgroundColor: '#FEE2E2', color: '#B91C1C', fontWeight: 800 }} />
                </DialogTitle>
                <DialogContent dividers sx={{ p: 3 }}>
                    {wishlist.length === 0 ? (
                        <Box sx={{ py: 6, textAlign: 'center' }}>
                            <RestaurantMenuIcon sx={{ fontSize: 52, color: '#D6D3D1', mb: 1.5 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#44403C', mb: 1 }}>
                                {lang === 'en' ? 'Your Wishlist is Empty' : '覓食清單目前還是空的喔'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#78716C', mb: 3 }}>
                                {lang === 'en'
                                    ? 'Explore the Street Food Gallery and save your favorite dishes before heading out.'
                                    : '在「人氣美食圖鑑」瀏覽時，點擊愛心即可加入口袋名單，方便出發前規劃！'}
                            </Typography>
                            <Button
                                href="/Food"
                                variant="contained"
                                className="tw-btn-primary"
                                onClick={() => setWishlistOpen(false)}
                            >
                                {lang === 'en' ? 'Explore Street Foods ➔' : '立即探索特色小吃 ➔'}
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="caption" sx={{ color: '#78716C', display: 'block', mb: 2 }}>
                                {lang === 'en'
                                    ? 'Show this screen directly to stall owners to order effortlessly without speaking!'
                                    : '貼心提示：在夜市現場，您可以直接拿著此畫面出示給攤商老闆看，點餐超方便！'}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {wishlist.map((item, idx) => (
                                    <Box
                                        key={item._id || item.id || idx}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            p: 1.5,
                                            borderRadius: '10px',
                                            backgroundColor: '#FFFDF9',
                                            border: '1px solid #EFE5D8',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <img
                                                src={item.foodIcon || 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200'}
                                                alt={item.foodName}
                                                style={{ width: 52, height: 52, borderRadius: '8px', objectFit: 'cover' }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2C2622' }}>
                                                    {item.foodName}
                                                </Typography>
                                                {item.foodInfoEN && (
                                                    <Typography variant="caption" sx={{ color: '#888', display: 'block' }}>
                                                        {item.foodInfoEN}
                                                    </Typography>
                                                )}
                                                <Typography variant="caption" sx={{ color: '#C62828', fontWeight: 800 }}>
                                                    NT$ {item.foodPrice || 60} {lang === 'en' && `(~${(((item.foodPrice || 60)) / 32).toFixed(1)} USD)`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => removeFromWishlist(item._id || item.id)}
                                            sx={{ color: '#999', '&:hover': { color: '#C62828' } }}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>

                            {/* 總預算試算 */}
                            <Box sx={{ mt: 2.5, p: 2, borderRadius: '10px', backgroundColor: '#FFF8E1', border: '1px solid #FFE082', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#E65100' }}>
                                    {lang === 'en' ? 'Estimated Total Budget:' : '預算總金額估算：'}
                                </Typography>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#C62828' }}>
                                        NT$ {totalPrice}
                                    </Typography>
                                    {lang === 'en' && (
                                        <Typography variant="caption" sx={{ color: '#888' }}>
                                            ≈ ${(totalPrice / 32).toFixed(1)} USD
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    {wishlist.length > 0 && (
                        <Button onClick={clearWishlist} sx={{ color: '#999', fontWeight: 700 }}>
                            {lang === 'en' ? 'Clear List' : '清空名單'}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={() => setWishlistOpen(false)}
                        className="tw-btn-primary"
                    >
                        {lang === 'en' ? 'Close' : '關閉'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}