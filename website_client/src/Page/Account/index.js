import { Paper} from '@material-ui/core'
import { Box, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import helper from '../Helper/helper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    foodimg: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    }

}));


function getSteps() {
    return ['填寫店鋪資料', '上傳店舖美食', '顯示資料'];
}


export default function Account() {
    const user = localStorage.getItem('user') !== "" ? JSON.parse(localStorage.getItem('user')) : null
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [market, setMarket] = useState([])
    const [FoodList, setFoodList] = useState([])
    const [foodType, setFoodType] = useState('')
    const [foodName, setFoodName] = React.useState("")
    const [foodPrice, setFoodPrice] = React.useState("")
    const [foodInfo, setFoodInfo] = React.useState("")
    const [foodInfoEn, setFoodInfoEN] = React.useState("")
    const [foodIcon, setFoodIcon] = useState("")

    const [nm, setNM] = useState("")
    const [shopName, setShopName] = useState("")
    const [shopNum, setShopNum] = useState("")
    const [shopType, setShopType] = useState("")
    const [shopLocal, setShopLocal] = useState("")
    const [shopOwnerID, setShopOwnerID] = useState("")
    const [shortIntro, setShortIntro] = useState("")
    const [Intro, setIntro] = useState("")
    const [shopIcon, setShopIcon] = useState("")

    const loaddata = async () => {
        let res = await helper.helper.AsyncMarketData()
        setMarket(res.market)
    }
    useEffect(() => { loaddata() }, [FoodList])





    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    const readYESHI = () => {
        return (
            market.map((item) => {

                return (
                    <MenuItem value={item.name}>{item.name}</MenuItem>
                )
            })
        )
    }
    const appendFood = async () => {
        if (foodType !== "" && foodName !== "" && foodPrice !== "" && foodInfo !== "" && foodInfoEn !== "" && foodIcon !== "") {
            let data = new FormData();
            data.append('Image', foodIcon)
            let res = await helper.helper.AsyncUploadImage(data)
            let food = ({
                foodName: foodName,
                foodPrice: foodPrice,
                foodType: foodType,
                foodInfo: foodInfo,
                foodInfoEN: foodInfoEn,
                foodIcon: res.path,
                isSale: false,
                rank: 0,
                rating: 0,
            })
            FoodList.push(food)
            document.getElementById("food_name").value = ""
            setFoodIcon("")
            document.getElementById("food_price").value = ""
            document.getElementById("food_info").value = ""
            document.getElementById("food_type").value = ""
            document.getElementById("food_infoEN").value = ""

        } else {
            alert("請輸入完整資料")
        }
    }
    const createShop = async () => {

        let data = new FormData();
        data.append('Image', shopIcon)
        let res = await helper.helper.AsyncUploadImage(data)
        let new_shop = ({
            shopIcon: res.path,
            shopYeShi: nm,
            shopName: shopName,
            shopNumber: shopNum,
            shopType: shopType,
            shopLocation: shopLocal,
            shopManager: user._id,
            shopManagerID: shopOwnerID,
            shopIntroduction: Intro,
            shopShortIntroduction: shortIntro,
            isSale: false,
            rank: 0,
            rating: 0,
            food: FoodList,
            status: "Applying",
        })
        let response = await helper.helper.AsyncCreateShop(new_shop)
        console.log(response)
    }


    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <Box pl="8%" pr="8%" mb={4}>

                        <Box>

                            <Box mb={4}>
                                <Paper elevation={24}>
                                    <img src={shopIcon !== "" ? URL.createObjectURL(shopIcon) : null}></img>

                                </Paper>
                            </Box>


                            <Box display='flex' justifyContent='flex-end'>
                                <FormControl sx={{ width: 200 }}>
                                    <InputLabel id="NM">夜市</InputLabel>
                                    <Select
                                        labelId="NM"
                                        id="NM"
                                        label="NM"
                                        placeholder={nm}
                                        onChange={e => setNM(e.target.value)}
                                    >
                                        {market !== "" ? readYESHI() : null}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: 200 }}>
                                    <InputLabel id="marketType">店鋪食物類別</InputLabel>
                                    <Select
                                        labelId="marketType"
                                        id="marketType"
                                        placeholder={shopType}
                                        label="店鋪食物類別"
                                        onChange={e => setShopType(e.target.value)}
                                    >
                                        <MenuItem value={"Pasta"}>麵食</MenuItem>
                                        <MenuItem value={"Fried"}>炸物</MenuItem>
                                        <MenuItem value={"snack"}>小吃</MenuItem>
                                        <MenuItem value={"Dessert"}>甜品</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button variant='contained' size='large' component="label">
                                    上傳夜市圖片
                                    <input hidden type="file" multiple name="image" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={e => setShopIcon(e.target.files[0])} />
                                </Button>

                            </Box>
                        </Box>
                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="shopName">店鋪名稱</InputLabel>
                                <Input
                                    id="shopName"
                                    placeholder={shopName}
                                    onChange={e => setShopName(e.target.value)}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="shopNum">店鋪號碼</InputLabel>
                                <Input
                                    id="shopNum"
                                    type='number'
                                    placeholder={shopNum}
                                    onChange={e => setShopNum(e.target.value)}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="shopLocation">店鋪地址</InputLabel>
                                <Input
                                    id="shopLocation"
                                    placeholder={shopLocal}
                                    onChange={e => setShopLocal(e.target.value)}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="shopManagerID">店鋪老闆身分證ID</InputLabel>
                                <Input
                                    id="shopManagerID"
                                    placeholder={shopOwnerID}
                                    onChange={e => setShopOwnerID(e.target.value)}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box >
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">店鋪簡短介紹</InputLabel>
                                <Input
                                    id="food_info"
                                    // value={values.amount}
                                    // onChange={handleChange('amount')}
                                    placeholder={shortIntro}
                                    multiline
                                    rows={2}
                                    // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    onChange={(e) => {
                                        setShortIntro(e.target.value)
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box >
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">店鋪介紹</InputLabel>
                                <Input
                                    id="food_info"
                                    // value={values.amount}
                                    // onChange={handleChange('amount')}
                                    placeholder={Intro}
                                    multiline
                                    rows={5}
                                    // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    onChange={(e) => {
                                        setIntro(e.target.value)
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box>店鋪基本會員費用：1000/年</Box>
                        <Box display='flex' justifyContent='flex-end'>

                        </Box>
                    </Box>
                );
            case 1:
                return (
                    <Box mb={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4}>
                                <Box display='flex' justifyContent='center' mb={2}>
                                    <Paper elevation={24}>
                                        <img src={foodIcon !== "" ? URL.createObjectURL(foodIcon) : null} className={classes.large} />
                                    </Paper>
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    <Button variant='outlined' color='success' size='small' component="label">
                                        上傳食物圖片
                                        <input hidden type="file" multiple name="image" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={e => setFoodIcon(e.target.files[0])} />

                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={6} md={8}>
                                <Box ml={2} mr={2}>
                                    <Box>
                                        <FormControl fullWidth ml={2} mr={2} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-amount">食物名稱</InputLabel>
                                            <Input
                                                id="food_name"
                                                // value={values.amount}
                                                // onChange={handleChange('amount')}
                                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                                onChange={(event) => {
                                                    setFoodName(event.target.value)
                                                }}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box mt={2}>
                                        <FormControl fullWidth variant="standard">
                                            <InputLabel htmlFor="standard-adornment-amount">食物價錢</InputLabel>
                                            <Input
                                                id="food_price"
                                                type='number'
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                onChange={(event) => {
                                                    setFoodPrice(event.target.value)
                                                }}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box mt={2}>
                                        <FormControl fullWidth variant="standard">
                                            <InputLabel htmlFor="standard-adornment-amount">食物介紹</InputLabel>
                                            <Input
                                                id="food_info"
                                                // value={values.amount}
                                                // onChange={handleChange('amount')}
                                                multiline
                                                rows={3}
                                                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                onChange={(event) => {
                                                    setFoodInfo(event.target.value)
                                                }}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box mt={2}>
                                        <FormControl sx={{ width: 200 }}>
                                            <InputLabel id="marketType">食物類別</InputLabel>
                                            <Select
                                                labelId="foodType"
                                                id="food_type"
                                                placeholder={foodType}
                                                label="店鋪食物類別"
                                                onChange={e => setFoodType(e.target.value)}
                                            >
                                                <MenuItem value={"Pasta"}>麵食</MenuItem>
                                                <MenuItem value={"Fried"}>炸物</MenuItem>
                                                <MenuItem value={"snack"}>小吃</MenuItem>
                                                <MenuItem value={"Dessert"}>甜品</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box mt={2}>
                                        <FormControl fullWidth variant="standard">
                                            <InputLabel htmlFor="foodInfoEN">食物介紹(英文)</InputLabel>
                                            <Input
                                                id="food_infoEN"
                                                multiline
                                                rows={3} onChange={(event) => {
                                                    setFoodInfoEN(event.target.value)
                                                }}
                                            />
                                        </FormControl>
                                    </Box>

                                    <Box mt={1} display='flex' justifyContent='flex-end'>
                                        <Button variant='contained' size='small' onClick={appendFood}>添加</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Paper elevation={12}>
                                <Box pl={2} pt={2}> 已經添加的食物</Box>
                                <Box maxWidth="100%" display='flex' justifyContent='flex-start' sx={{ flexWrap: 'wrap' }} p={2} >
                                    {FoodList.map((food) => {
                                        return (
                                            <Button variant='contained' size='medium' >{food.foodName}</Button>

                                        )
                                    })
                                    }

                                </Box>
                            </Paper>
                        </Box>


                    </Box>





                );;
            case 2:
                return (
                    <Box>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <img src={shopIcon !== "" ? URL.createObjectURL(shopIcon) : null}></img>
                            </Grid>
                            <Grid item xs={6}>

                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">{nm}</InputLabel>
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">店鋪食物類別：{shopType}</InputLabel>
                                </FormControl>


                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">店鋪名稱：{shopName}</InputLabel>
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">店鋪號碼：{shopNum}</InputLabel>
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">店鋪地址：{shopNum}</InputLabel>
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">店鋪老闆身分證ID：{shopNum}</InputLabel>
                                </FormControl>


                            </Grid>

                            <Grid item xs={12} >
                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">店鋪簡短介紹：{shortIntro}</InputLabel>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="shopName">店鋪介紹：{Intro}</InputLabel>
                                </FormControl>
                            </Grid>

                            {
                                FoodList.map((food, i) => {
                                    // console.log(food)
                                    return (
                                        <Grid container item xs={12} id={i}>


                                            <Grid item xs={4}>
                                                <img src={food.foodIcon !== "" ? food.foodIcon : null}></img>
                                            </Grid>
                                            <Grid container item xs={8}>

                                                <Grid item xs={4}>食物名字：{food.foodName}</Grid>
                                                <Grid item xs={4}>食物價錢：{food.foodPrice}</Grid>
                                                <Grid item xs={4}>食物類別：{food.foodType} </Grid>
                                                <Grid item direction={'column-reverse'} xs={12}>

                                                    食物介紹：
                                                    <Box sx={{ width: '100%', maxWidth: "100%" }}>
                                                        <Typography variant="body1" noWrap>
                                                            {food.foodInfo}dfgshjklfdhkjhkjhbkdjhndbskhsjfhjsnbmshkjdnvbcxmdhfjnvbmfdhskjashfkdhakjfhdlkshfjldshfkj
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    食物介紹（英文）：
                                                    <Box sx={{ width: '100%', maxWidth: "100%" }}>
                                                        <Typography variant="body1" noWrap>
                                                            {food.foodInfoEN}
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                            </Grid>

                                        </Grid>

                                    )
                                })
                            }
                        </Grid>
                        <Box mt={3} mb={2} display='flex' justifyContent='center'>
                            <Button variant='contained' size='large' color='success' onClick={createShop} >建立新的店鋪</Button>

                        </Box>
                    </Box>

                )
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <div className='Account_Box'>
            <Box mt={2} mb={2}>
                <Paper elevation={24}>
                    <Box p={2}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>


                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Box display="flex" justifyContent="flex-start" pl={12} >
                                        <Typography className={classes.instructions}>
                                            以下公告<br />
                                            店家基本登錄費用<br />
                                            搜尋排名<br />
                                            遊客購買餐劵優惠劵活動劵<br />
                                            定期幫店家企劃舉辦活動及優惠<br />

                                            以上全部步驟完成</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button onClick={handleReset}>Done</Button>
                                    </Box>

                                </div>
                            ) : (
                                <div>

                                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                Back
                                            </Button>
                                            <Button variant="contained" color="primary" onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </Box>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Box>
                </Paper>

            </Box>

        </div>

    )
}