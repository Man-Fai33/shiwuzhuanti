import { Paper } from '@material-ui/core'
import { Box } from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';


import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function getSteps() {
    return ['填寫店鋪資料', '上傳店舖美食', '選擇現有美食'];
}

export default function Account() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();


    const [foodName, setFoodName] = React.useState("")
    const [foodPrice, setFoodPrice] = React.useState("")
    const [foodInfo, setFoodInfo] = React.useState("")


    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(["小籠包", "雞扒", "鹹酥雞", "牛肉麵"]);
    const [right, setRight] = React.useState(["珍珠奶茶", "茶葉蛋", "可頌", "麻辣鴨血"]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };


    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <Box pl="8%" pr="8%" mb={4}>
                        <Box display='flex' justifyContent='space-between'>店鋪區域: <Box>
                            <FormGroup row='true' >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="台北" />
                                <FormControlLabel control={<Checkbox />} label="台中" />
                                <FormControlLabel control={<Checkbox />} label="台南" />
                                <FormControlLabel control={<Checkbox />} label="台東" />
                            </FormGroup>
                        </Box>
                        </Box>
                        <Box>

                            <Box>店鋪的夜市 </Box>

                            <Box display='flex' justifyContent='flex-end'>
                                <FormControl sx={{ width: 200 }}>
                                    <InputLabel id="demo-simple-select-label">夜市</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={age}
                                        label="夜市"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>寧夏夜市</MenuItem>
                                        <MenuItem value={20}>饒河夜市</MenuItem>
                                        <MenuItem value={30}>師大夜市</MenuItem>
                                        <MenuItem value={40}>公館夜市</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">店鋪名稱</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">店鋪號碼</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box>店鋪食物定位
                            <Box display='flex' justifyContent='flex-end'>
                                <FormControl sx={{ width: 200 }}>
                                    <InputLabel id="demo-simple-select-label">類別</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={age}
                                        label="夜市"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>麵食</MenuItem>
                                        <MenuItem value={20}>炸物</MenuItem>
                                        <MenuItem value={30}>小吃</MenuItem>
                                        <MenuItem value={40}>甜品</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>


                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">店鋪地址</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">店鋪老闆名字</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">店鋪身分證ID</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                // startAdornment={<InputAdornment position="start">店鋪名稱</InputAdornment>}
                                />
                            </FormControl>
                        </Box>
                        <Box>店鋪基本會員費用：1000/年</Box>
                    </Box>
                );
            case 1:
                return (
                    <Box mb={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={4}>
                                <Box display='flex' justifyContent='center'>
                                    <img src='./logo192.png' className={classes.large} />
                                </Box>
                                <Box display='flex' justifyContent='center'>

                                    <Button variant='outlined'  color='success' size='small' component="label">
                                        上傳食物圖片
                                        <form method="post" action="/upload" enctype="multipart/form-data">
                                            <input hidden accept="image/*" multiple type="file" />
                                            <input type="submit" value="upload"/>
                                        </form>
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
                                                // value={values.amount}
                                                // onChange={handleChange('amount')}
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
                                    <Box mt={1} display='flex' justifyContent='flex-end'>
                                        <Button variant='contained' size='small'>添加</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Paper elevation={12}>
                                <Box maxWidth="100%" display='flex' justifyContent='flex-start' p={2} m={2}>
                                    <Button variant='outlined' >food</Button>
                                </Box>
                            </Paper>
                        </Box>


                    </Box>





                );;
            case 2:
                return (
                    <div>
                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            className={classes.root}
                        >
                            <Grid item>
                                <Box display="flex" justifyContent='center'>未上架食物</Box>
                                {customList(left)}
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.button}
                                        onClick={handleAllRight}
                                        disabled={left.length === 0}
                                        aria-label="move all right"
                                    >
                                        ≫
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.button}
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.button}
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.button}
                                        onClick={handleAllLeft}
                                        disabled={right.length === 0}
                                        aria-label="move all left"
                                    >
                                        ≪
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Box display="flex" justifyContent="center">上架的食物</Box>
                                {customList(right)}
                            </Grid>
                        </Grid>
                    </div>
                );;
            default:
                return 'Unknown stepIndex';
        }
    }
    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={` ${value}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );
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