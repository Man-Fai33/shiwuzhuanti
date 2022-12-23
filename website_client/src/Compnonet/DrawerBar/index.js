
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Menu from '@mui/material/Menu';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
const drawerWidth = 240;
// import GTranslateIcon from '@mui/icons-material/GTranslate';





const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));
export default function DrawerBar({ }) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [lang, setLang] = useState("zh_TW");


    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const settings = ['Profile', 'Account', 'Logout'];
    const settings_zh = [
        { "PageName": 'Profile', "PagePath": "/profile" }
        , { "PageName": 'Account', "PagePath": "/account" },
        { "PageName": 'Logout', "PagePath": "/logout" }
    ];
    const DrawerData = [
        { 'drawerName': '主頁', 'drawerPath': '/index' }
        , { 'drawerName': '夜市列表', 'drawerPath': '/nightmarket' }
        , { 'drawerName': '食物', 'drawerPath': '/Food' }
        // , { 'drawerName': '市集', 'drawerPath': '/market' }
    ]
    const DrawerData2 = [{ 'drawerName': '公告欄', 'drawerPath': '/bulletinBoard' }
        , { 'drawerName': '網站地圖', 'drawerPath': '/' }
        , { 'drawerName': '回饋', 'drawerPath': '/feedback' }
    ]
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    return (
        <div>
            <div className={classes.root}>
                <CssBaseline />

                {/* Navbar setting */}
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >

                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" noWrap>
                            <a>夜市比較好走</a>
                        </Typography>
                        <Box sx={{ flexGrow: 18 }} ></Box>
                        <Box sx={{ flexGrow: 0 }} >
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={require('../../Img/Cat.jpg')} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                                {settings_zh.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <a href={setting.PagePath} textAlign="center" >{setting.PageName}</a>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>

                        <Box sx={{ flexGrow: 0 }} >

                            <FormControl >
                                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={lang}
                                    label="Language"
                                    onChange={(evt) => {
                                        setLang(evt.target.value);
                                    }}
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="zh_TW">中文</MenuItem>
                                    {/* <MenuItem value="fr">Français</MenuItem> */}
                                    {/* <MenuItem value="jp">日本語</MenuItem> */}

                                </Select>
                            </FormControl>

                        </Box>
                        {/* <Box sx={{ flexGrow: 1 }}></Box> */}
                        <Box sx={{ flexGrow: 1 }} >
                            <Button variant="contained" href='/signin'>
                                <FormattedMessage id="app.signIn" defaultMessage={"Sign In"}></FormattedMessage>
                            </Button>
                        </Box>
                    </Toolbar>


                </AppBar>


                {/* Drawer bar */}
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {DrawerData.map((data, index) => (
                            <a href={data.drawerPath}>
                                <ListItem button key={data.drawerName} >

                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={data.drawerName} />

                                </ListItem>
                            </a>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {DrawerData2.map((data, index) => (
                            <a href={data.drawerPath}>
                                <ListItem button key={data.drawerName}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={data.drawerName} color="black" />
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </Drawer>
                <div className={classes.drawerHeader} />


            </div>
        </div >
    )
}