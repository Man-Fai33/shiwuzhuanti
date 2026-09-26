import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardMedia,
    CardContent,
    Stack,
    Alert,
    CircularProgress
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import helper from '../Helper/helper';

const steps = ['攤位基本資料', '招牌美食與菜單', '確認申請資料'];

export default function Account() {
    const [user, setUser] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    // Step 0: Shop details
    const [nm, setNm] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopNum, setShopNum] = useState('');
    const [shopType, setShopType] = useState('snack');
    const [shopLocal, setShopLocal] = useState('');
    const [shopOwnerId, setShopOwnerId] = useState('');
    const [shortIntro, setShortIntro] = useState('');
    const [intro, setIntro] = useState('');
    const [shopIcon, setShopIcon] = useState(null);
    const [shopIconPreview, setShopIconPreview] = useState('');

    // Step 1: Foods
    const [foodList, setFoodList] = useState([]);
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodType, setFoodType] = useState('snack');
    const [foodInfo, setFoodInfo] = useState('');
    const [foodIcon, setFoodIcon] = useState(null);
    const [foodIconPreview, setFoodIconPreview] = useState('');

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('user');
            if (rawUser) setUser(JSON.parse(rawUser));
        } catch (e) { }

        const fetchMarkets = async () => {
            try {
                const res = await helper.helper.AsyncMarketData();
                if (res && res.market) {
                    setMarkets(res.market);
                    if (res.market.length > 0) {
                        setNm(res.market[0].name);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchMarkets();
    }, []);

    const handleShopIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setShopIcon(file);
            setShopIconPreview(URL.createObjectURL(file));
        }
    };

    const handleFoodIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoodIcon(file);
            setFoodIconPreview(URL.createObjectURL(file));
        }
    };

    const handleAddFood = async () => {
        if (!foodName.trim() || !foodPrice) {
            alert('請至少填寫美食名稱與價格');
            return;
        }

        let uploadedPath = '/img/default_food.jpg';
        if (foodIcon) {
            try {
                const data = new FormData();
                data.append('Image', foodIcon);
                const res = await helper.helper.AsyncUploadImage(data);
                if (res && res.path) uploadedPath = res.path;
            } catch (e) {
                console.error(e);
            }
        }

        const newFood = {
            foodName: foodName.trim(),
            foodPrice: Number(foodPrice),
            foodType: foodType,
            foodInfo: foodInfo.trim() || '老闆推薦招牌料理',
            foodInfoEN: '',
            foodIcon: uploadedPath,
            isSale: true,
            rank: 0,
            rating: 5.0
        };

        setFoodList([...foodList, newFood]);
        setFoodName('');
        setFoodPrice('');
        setFoodInfo('');
        setFoodIcon(null);
        setFoodIconPreview('');
    };

    const handleNext = () => {
        if (activeStep === 0) {
            if (!shopName.trim() || !nm) {
                setStatusMsg({ type: 'error', text: '請填寫店鋪名稱並選擇進駐的夜市' });
                return;
            }
            setStatusMsg({ type: '', text: '' });
        }
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleSubmitApplication = async () => {
        setLoading(true);
        setStatusMsg({ type: '', text: '' });

        try {
            let shopImgPath = '/img/default_shop.jpg';
            if (shopIcon) {
                const data = new FormData();
                data.append('Image', shopIcon);
                const res = await helper.helper.AsyncUploadImage(data);
                if (res && res.path) shopImgPath = res.path;
            }

            const newShop = {
                shopIcon: shopImgPath,
                shopYeShi: nm,
                shopName: shopName.trim(),
                shopNumber: shopNum.trim() || 'A01',
                shopType: shopType,
                shopLocation: shopLocal.trim() || `${nm} 特色攤位區`,
                shopManager: user?._id || '',
                shopManagerID: shopOwnerId.trim() || 'A123456789',
                shopIntroduction: intro.trim() || `${shopName} 誠摯歡迎全台饕客蒞臨品嚐！`,
                shopShortIntroduction: shortIntro.trim() || `${shopName} - ${nm} 人氣推薦！`,
                isSale: true,
                rank: 0,
                rating: 5.0,
                food: foodList,
                status: 'Applying'
            };

            const response = await helper.helper.AsyncCreateShop(newShop);
            if (response) {
                setStatusMsg({
                    type: 'success',
                    text: '🎉 攤位申請已成功提交！夜市自治會將於 1-3 個工作天內完成審核。'
                });
                setActiveStep(3);
            } else {
                setStatusMsg({ type: 'error', text: '提交失敗，請檢查資料格式後重試' });
            }
        } catch (err) {
            setStatusMsg({ type: 'error', text: '伺服器連線異常，請稍後再試' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
                <Paper elevation={3} sx={{ p: 5, borderRadius: 3, border: '1px solid #f2e2d0' }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>🏮</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b2520', mb: 1.5 }}>
                        請先登入攤商帳號
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6d655e', mb: 3 }}>
                        申請攤位進駐夜市需先登入會員，方能追蹤審查進度與管理招牌菜色。
                    </Typography>
                    <Button variant="contained" href="/signin" sx={{ bgcolor: '#b7282e', fontWeight: 700 }}>
                        前往登入
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* 標題 */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#2b2520' }}>
                    🏮 夜市攤位進駐申請
                </Typography>
                <Typography variant="body1" sx={{ color: '#6d655e', mt: 1 }}>
                    歡迎全台優秀攤商進駐在地夜市！填寫店家資訊與招牌菜單，讓全台灣的吃貨找到您的美味！
                </Typography>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconProps={{
                                sx: {
                                    '&.Mui-active': { color: '#b7282e' },
                                    '&.Mui-completed': { color: '#e08a00' }
                                }
                            }}
                        >
                            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{label}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {statusMsg.text && (
                <Alert severity={statusMsg.type} sx={{ mb: 3, borderRadius: 2 }}>
                    {statusMsg.text}
                </Alert>
            )}

            <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid #f2e2d0' }}>
                {/* 步驟 0: 店鋪基本資料 */}
                {activeStep === 0 && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <StorefrontIcon /> 步驟一：填寫攤位與經營者資料
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-market-label">欲進駐之夜市</InputLabel>
                                    <Select
                                        labelId="select-market-label"
                                        value={nm}
                                        label="欲進駐之夜市"
                                        onChange={(e) => setNm(e.target.value)}
                                    >
                                        {markets.map((m) => (
                                            <MenuItem key={m._id} value={m.name}>
                                                🏮 {m.name} ({m.marketLocation || '在地熱門'})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-type-label">攤位主打類別</InputLabel>
                                    <Select
                                        labelId="select-type-label"
                                        value={shopType}
                                        label="攤位主打類別"
                                        onChange={(e) => setShopType(e.target.value)}
                                    >
                                        <MenuItem value="snack">傳統道地小吃</MenuItem>
                                        <MenuItem value="Fried">香酥炸物烤物</MenuItem>
                                        <MenuItem value="Pasta">熱炒飯麵湯品</MenuItem>
                                        <MenuItem value="Dessert">冰品冷飲甜品</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    fullWidth
                                    label="攤位招牌名稱"
                                    placeholder="例如：阿公阿嬤老牌炭烤、逢甲大腸包小腸"
                                    value={shopName}
                                    onChange={(e) => setShopName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="攤位編號 / 號碼"
                                    placeholder="例如：第 58 號攤位"
                                    value={shopNum}
                                    onChange={(e) => setShopNum(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="攤位詳細位置"
                                    placeholder="例如：士林夜市基河路入口左側第三攤"
                                    value={shopLocal}
                                    onChange={(e) => setShopLocal(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="負責人身分證明號碼 (選填)"
                                    placeholder="供夜市管理委員會建檔查核"
                                    value={shopOwnerId}
                                    onChange={(e) => setShopOwnerId(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="攤位一句話亮點 (簡短推薦)"
                                    placeholder="例如：傳承三代獨門中藥滷汁，排隊也要吃的夜市霸主！"
                                    value={shortIntro}
                                    onChange={(e) => setShortIntro(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="詳細店家簡介與故事"
                                    placeholder="分享食材用料、製作堅持、獨家特色..."
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                    攤位門面照片
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ borderColor: '#b7282e', color: '#b7282e' }}
                                    >
                                        上傳招牌照片
                                        <input hidden type="file" accept="image/*" onChange={handleShopIconChange} />
                                    </Button>
                                    {shopIconPreview && (
                                        <Box
                                            component="img"
                                            src={shopIconPreview}
                                            alt="預覽"
                                            sx={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 1.5, border: '1px solid #ddd' }}
                                        />
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ bgcolor: '#b7282e', px: 4, fontWeight: 700, '&:hover': { bgcolor: '#941e24' } }}
                            >
                                下一步：添加菜單小吃 ➔
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* 步驟 1: 招牌美食與菜單 */}
                {activeStep === 1 && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FastfoodIcon /> 步驟二：新增店內招牌美食
                        </Typography>

                        <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: '#fdfbf9', borderRadius: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        size="small"
                                        label="美食名稱"
                                        placeholder="例如：招牌蚵仔煎、大腸包小腸"
                                        value={foodName}
                                        onChange={(e) => setFoodName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        required
                                        fullWidth
                                        size="small"
                                        type="number"
                                        label="單價 (NT$)"
                                        placeholder="65"
                                        value={foodPrice}
                                        onChange={(e) => setFoodPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>分類</InputLabel>
                                        <Select
                                            value={foodType}
                                            label="分類"
                                            onChange={(e) => setFoodType(e.target.value)}
                                        >
                                            <MenuItem value="snack">在地小吃</MenuItem>
                                            <MenuItem value="Fried">炸物串燒</MenuItem>
                                            <MenuItem value="Pasta">主食湯品</MenuItem>
                                            <MenuItem value="Dessert">甜品飲料</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="美食口感與風味特色"
                                        placeholder="例如：外酥內嫩，搭配獨門蒜蓉醬汁"
                                        value={foodInfo}
                                        onChange={(e) => setFoodInfo(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            component="label"
                                            sx={{ color: '#5a5048', borderColor: '#ccc' }}
                                        >
                                            上傳照片
                                            <input hidden type="file" accept="image/*" onChange={handleFoodIconChange} />
                                        </Button>
                                        {foodIconPreview && (
                                            <Box
                                                component="img"
                                                src={foodIconPreview}
                                                alt="菜色預覽"
                                                sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 1 }}
                                            />
                                        )}
                                    </Stack>

                                    <Button
                                        variant="contained"
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={handleAddFood}
                                        sx={{ bgcolor: '#e08a00', fontWeight: 700, '&:hover': { bgcolor: '#be7400' } }}
                                    >
                                        加入菜單
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* 已新增的菜色列表 */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                            🥢 已新增的菜色項目 ({foodList.length})
                        </Typography>
                        {foodList.length === 0 ? (
                            <Typography variant="body2" sx={{ color: '#8c8077', py: 2, textAlign: 'center' }}>
                                目前尚未新增菜色，請於上方填寫後點選「加入菜單」
                            </Typography>
                        ) : (
                            <Grid container spacing={2} sx={{ mb: 4 }}>
                                {foodList.map((item, idx) => (
                                    <Grid item xs={12} sm={6} key={idx}>
                                        <Card variant="outlined" sx={{ display: 'flex', borderRadius: 2 }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 80, height: 80, objectFit: 'cover' }}
                                                image={item.foodIcon}
                                                alt={item.foodName}
                                            />
                                            <CardContent sx={{ py: 1, px: 2 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                    {item.foodName}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#b7282e', fontWeight: 700 }}>
                                                    NT$ {item.foodPrice}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#6d655e', fontSize: '0.8rem', mt: 0.5 }}>
                                                    {item.foodInfo}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button onClick={handleBack} sx={{ color: '#6d655e' }}>上一步</Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ bgcolor: '#b7282e', px: 4, fontWeight: 700, '&:hover': { bgcolor: '#941e24' } }}
                            >
                                下一步：確認資料 ➔
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* 步驟 2: 確認資料 */}
                {activeStep === 2 && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#b7282e', mb: 3 }}>
                            步驟三：核對進駐申請資料
                        </Typography>

                        <Stack spacing={2} sx={{ mb: 4, p: 3, bgcolor: '#fdfbfa', borderRadius: 2, border: '1px solid #f2e2d0' }}>
                            <Box><Typography variant="caption" sx={{ color: '#8c8077' }}>進駐夜市：</Typography> <Typography variant="body1" component="span" sx={{ fontWeight: 700 }}>{nm}</Typography></Box>
                            <Box><Typography variant="caption" sx={{ color: '#8c8077' }}>攤位名稱：</Typography> <Typography variant="body1" component="span" sx={{ fontWeight: 700 }}>{shopName}</Typography></Box>
                            <Box><Typography variant="caption" sx={{ color: '#8c8077' }}>攤位編號 / 位置：</Typography> <Typography variant="body1" component="span">{shopNum || '未指定'} - {shopLocal || '未填寫'}</Typography></Box>
                            <Box><Typography variant="caption" sx={{ color: '#8c8077' }}>主打菜單：</Typography> <Typography variant="body1" component="span">{foodList.length > 0 ? foodList.map(f => `${f.foodName} ($${f.foodPrice})`).join('、') : '無附加菜色'}</Typography></Box>
                            <Box><Typography variant="caption" sx={{ color: '#8c8077' }}>店家故事：</Typography> <Typography variant="body2" sx={{ color: '#555', mt: 0.5 }}>{intro || '無填寫'}</Typography></Box>
                        </Stack>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={handleBack} sx={{ color: '#6d655e' }}>上一步修改</Button>
                            <Button
                                variant="contained"
                                disabled={loading}
                                onClick={handleSubmitApplication}
                                sx={{ bgcolor: '#b7282e', px: 4, py: 1.2, fontWeight: 700, '&:hover': { bgcolor: '#941e24' } }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : '確認送出審查 🏮'}
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* 步驟 3: 完成通知 */}
                {activeStep === 3 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <CheckCircleIcon sx={{ fontSize: 70, color: '#4caf50', mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#2b2520', mb: 1 }}>
                            攤位進駐申請已送出！
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#6d655e', mb: 4 }}>
                            夜市自治會工作人員將盡速進行資料審核，審核通過後即可於夜市頁面中對外展示！
                        </Typography>
                        <Button variant="contained" href="/nightmarket" sx={{ bgcolor: '#b7282e', fontWeight: 700 }}>
                            回夜市首頁逛逛 🏮
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}