import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import helper from '../Helper/helper';
import { DataGrid } from '@mui/x-data-grid';
 
import { Paper} from '@material-ui/core';
 

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}



export default function DataManagement() {
    const theme = useTheme();
    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'))
    const [value, setValue] = React.useState(0);
    const [name, setName] = useState("")
    const [nameen, setNameen] = useState("")
    const [marketLocation, setMarketLocation] = useState("")
    const [positionGuidelines, setPositionGuidelines] = useState("")
    const [brief, setBrief] = useState("")
    const [introduction, setIntroduction] = useState("")
    const [rating, setRating] = useState(0.0)
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)
    const [MarketIcon, setMarketIcon] = useState("");
    const [feedback, setFeedBack] = useState([])
    const [users, setUsers] = useState([])
    const [bulletin, setBulletin] = useState("")
    const [bulletinContext, setBulletinContext] = useState("")
    const [bulletinTitle, setBulletinTitle] = useState("")
    const loaddata = async () => {
        let res = await helper.helper.AsyncFeedBackAll();
        setFeedBack(res.feedback)
        let userdata = await helper.helper.AsyncUsers();
        setUsers(userdata.users)
        console.log(users)

    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    const handleYeShiSubmit = async () => {
        if (name !== "" && nameen !== "" && marketLocation !== "" && brief !== "" && introduction !== "" && rating !== 0.0 && lat !== 0.0 && lng !== 0.0 && MarketIcon !== "" && positionGuidelines !== "") {

            let data = new FormData();
            data.append('Image', MarketIcon)
            let res = await helper.helper.AsyncUploadImage(data)
            let market =
            {
                market: {
                    name: name,
                    nameen: nameen,
                    marketIcon: res.path,
                    marketLocation: marketLocation,
                    positionGuidelines: positionGuidelines,
                    brief: brief,
                    introduction: introduction,
                    foodList: null,
                    shopList: null,
                    rating: rating,
                    lat: lat,
                    lng: lng
                }
            }

            let response = await helper.helper.AsyncMarketCreate(market)
            console.log(response)
        } else {
            alert("請輸入完整的夜市資料")
        }

    }

    useEffect(() => {
        loaddata()
    }, [])


    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        {
            field: 'owner',
            headerName: '用戶',
            width: 120,
            editable: true,
        },
        {
            field: 'contact',
            headerName: '聯繫電話',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: '電郵',
            type: 'email',
            width: 150,
            editable: true,
        },
        {
            field: 'opinion',
            headerName: '意見',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 400,
        },
        {
            field: 'date',
            headerName: '日期',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 200,
        },

    ];
    // bulletin
    // bulletinContext
    // bulletinTitle
    const handleCreateBulletin = async () => {
        if (bulletin !== "" && bulletinContext !== "" && bulletinTitle !== "") {
            let data = new FormData();
            data.append('Image', bulletin)
            let res = await helper.helper.AsyncUploadImage(data)
            let newbulletin = {
                bulletin: {
                    owner: user._id !== "" ? user._id : "",
                    title: bulletinTitle,
                    context: bulletinContext,
                    imgUrl: res.path,
                    date: ""
                }
            }
            let response = await helper.helper.AsyncBulletinCreate(newbulletin)
            console.log(response)
            window.location.reload()
        }

    }
    const handleApply = (id) => {
        alert(id)
    }




    return (
        <Box mt={1} sx={{ bgcolor: 'background.paper', width: "100%" }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="新增夜市" {...a11yProps(0)} />
                    {/* <Tab label="使用者管理" {...a11yProps(1)} /> */}
                    <Tab label="意見管理" {...a11yProps(1)} />
                    <Tab label="公告欄管理" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="name">夜市名字</InputLabel>
                            <OutlinedInput
                                id="nameen"
                                label="Password"
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="nameen">夜市名字英文</InputLabel>
                            <OutlinedInput
                                id="nameen"
                                label="Password12"
                                onChange={e => setNameen(e.target.value)}
                                required
                            />
                        </FormControl>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Box p={2}>
                                    <img src={MarketIcon !== "" ? URL.createObjectURL(MarketIcon) : null} >

                                    </img>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ paddingTop: "28%", paddingLeft: "28%" }} >
                                    <Button variant='contained' size='large' component="label">
                                        上傳夜市圖片
                                        <input hidden type="file" multiple name="image" accept="image/jpg,image/jpeg,image/png,image/gif" required onChange={e => setMarketIcon(e.target.files[0])} />
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="marketLocation">夜市的地址</InputLabel>
                            <OutlinedInput
                                id="marketLocation"
                                label="marketLocation"
                                onChange={e => setMarketLocation(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="brief">夜市簡短介紹</InputLabel>
                            <OutlinedInput
                                id="brief"
                                label="brief"
                                onChange={e => setBrief(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="introduction">夜市介紹</InputLabel>
                            <OutlinedInput
                                id="introduction"
                                label="introduction"
                                onChange={e => setIntroduction(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "30%" }} variant="outlined">
                            <InputLabel htmlFor="introduction">夜市評級</InputLabel>
                            <OutlinedInput
                                id="introduction"
                                label="introduction"
                                type='number'
                                onChange={e => setRating(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "65%" }} variant="outlined">
                            <InputLabel htmlFor="positionGuidelines">位置指引</InputLabel>
                            <OutlinedInput
                                id="positionGuidelines"
                                label="positionGuidelines"
                                type='text'
                                onChange={e => setPositionGuidelines(e.target.value)}
                                required
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: "45%" }} fullWidth variant="outlined">
                            <InputLabel htmlFor="lat">緯度(lat)</InputLabel>
                            <OutlinedInput
                                id="lat"
                                label="lat"
                                onChange={e => setLat(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "45%" }} fullWidth variant="outlined">
                            <InputLabel htmlFor="lng">緯度(lng)</InputLabel>
                            <OutlinedInput
                                id="lng"
                                label="lng"
                                onChange={e => setLng(e.target.value)}
                                required
                            />
                        </FormControl>

                        <Box mt={1} mb={1} display='flex' justifyContent='flex-end'>
                            <Button variant='contained' color="success" onClick={handleYeShiSubmit}>上傳夜市資料</Button>
                        </Box>
                    </Box>


                </TabPanel>
                {/* <TabPanel value={value} index={1} dir={theme.direction}>
                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">操作按鈕</StyledTableCell>
                                <StyledTableCell align="center">用戶名字</StyledTableCell>
                                <StyledTableCell align="right">用戶</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <StyledTableRow key={user._id}>
                                    <StyledTableCell component="th" scope="row">
                                        <Button variant='outlined' onClick={e => handleApply(user._id)}>接受申請</Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{user.username}        </StyledTableCell>
                                    <StyledTableCell align="right">{user.fat}</StyledTableCell>
                                    <StyledTableCell align="right">{user.carbs}</StyledTableCell>
                                    <StyledTableCell align="right">{user.protein}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </TableContainer>
                </TabPanel> */}
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={feedback}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Box>
                        <Box mb={2}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Paper elevation={24} >
                                        <Box p={1}>
                                            <img src={bulletin !== "" ? URL.createObjectURL(bulletin) : null} >
                                            </img>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ paddingTop: "28%", paddingLeft: "28%" }} >
                                        <Button variant='contained' size='large' component="label">
                                            上傳公告圖片
                                            <input hidden type="file" multiple name="image" accept="image/jpg,image/jpeg,image/png,image/gif" required onChange={e => setBulletin(e.target.files[0])} />
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="bulletin_title">公告名稱</InputLabel>
                            <OutlinedInput
                                id="bulletin_title"
                                label="bulletin_title"
                                onChange={e => setBulletinTitle(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="bulletin_context">公告內容</InputLabel>
                            <OutlinedInput
                                id="bulletin_context"
                                label="bulletin_context"
                                multiline
                                minRows={5}
                                onChange={e => setBulletinContext(e.target.value)}
                                required
                            />
                        </FormControl>

                        <Box display='flex' justifyContent='flex-end' mt={2}>
                            <Button variant='outlined' color='success' onClick={handleCreateBulletin} >
                                建立新公告
                            </Button>
                        </Box>

                    </Box>

                </TabPanel>
            </SwipeableViews>
        </Box>
    );

}