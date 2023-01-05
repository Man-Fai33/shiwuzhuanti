import { Box, Container, Typography, Link, Grid, CardActionArea } from '@mui/material';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import IndexImage from '../../Img/nightmarket.jpg'
import yeShi from '../../Img/yeshi.jpg'
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import helper from '../Helper/helper';


const handleNightPage = (id) => {
    localStorage.setItem('nightID', id)

    window.location.href = '/nightmarketpage'

}

export default function NightMarket() {
    const [market, setMarket] = useState([])

    const loadMarket = async () => {
        let res = await helper.helper.AsyncMarketData();
        setMarket(res.market)

    }
    React.useEffect(() => {
        loadMarket()
    }, [])


    const ListMarket = () => {

        return (
            market.map((item, i) => {
                return (
                    <Box mt={4} mb={2}  >
                        <Box mb={1}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        width="100%"

                                        image={item.marketIcon}
                                        sx={{ flex: 'auto', padding: "1rem 6rem  0 6rem", objectFit: "contain" }}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>

                                        <Typography gutterBottom variant="h5" component="h2" >
                                            {item.name}
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.brief}
                                        </Typography>

                                    </CardContent>

                                </CardActionArea>

                                <Box display="flex" justifyContent="flex-end">
                                    <CardActions>
                                        {/* <a href=''>
                                    <Button size="small" color="primary">
                                        打開地圖
                                    </Button>
                                </a> */}
                                        {/* <a href='/nightmarketpage'> */}
                                        <Button size="small" color="primary" onClick={e => handleNightPage(item._id)}>
                                            資訊
                                        </Button>
                                        {/* </a> */}
                                    </CardActions>
                                </Box>

                            </Card>
                        </Box >

                    </Box >
                )
            })
        )
    }


    const [selectedLocal, setSelectedLocal] = React.useState("all");

    const HandleAll = () => {
        setSelectedLocal('all')
        console.log(selectedLocal)
    }
    const HandleTaiPei = () => {
        setSelectedLocal('tp')
        console.log(selectedLocal)
    }
    const HandleTaiZhong = () => {
        setSelectedLocal('tz')
        console.log(selectedLocal)
    }
    const HandleTaiNan = () => {
        setSelectedLocal('tn')
        console.log(selectedLocal)
    }
    return (
        <Box xs={12} mt={1} mb={3}  >
            <Box xs={12}   >
                <Card sx={{ maxWidth: "100%" }} >
                    <CardMedia
                        component="img"
                        height="200"
                        image={IndexImage}
                        alt="green iguana"
                    />
                </Card>
            </Box>
            <Box display="flex" justifyContent="flex-end" >
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="查找你想的夜市"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
            <Box display="flex" justifyContent="start" >
                <Grid container mt={2}>
                    <Grid xs={2}>
                        <Button onClick={HandleAll} >全部</Button>
                    </Grid>
                    <Grid xs={2}>
                        <Button onClick={HandleTaiPei}>台北</Button>
                    </Grid>
                    <Grid xs={2}>
                        <Button onClick={HandleTaiZhong}>台中</Button>
                    </Grid>
                    <Grid xs={2}>
                        <Button onClick={HandleTaiNan}>台南</Button>
                    </Grid>
                </Grid>
            </Box>
            {market !== null ? ListMarket() : null}
            <Box mt={4} mb={2}  >
                <Box mb={1}>
                    <Card >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                width="100%"

                                image={yeShi}
                                sx={{ flex: 'auto', padding: "1rem 6rem  0 6rem", objectFit: "contain" }}
                                title="Contemplative Reptile"
                            />
                            <CardContent>

                                <Typography gutterBottom variant="h5" component="h2" >
                                    寧夏夜市
                                </Typography>

                                <Typography variant="body2" color="textSecondary" component="p">
                                    宁夏路夜市，简称宁夏夜市，是位于台北市大同区宁夏路的夜市景点。 2015年，台北市政府举办“台北夜市之最”投票选举，宁夏夜市于夜市主题中夺得“最好逛夜市”、“最美味夜市”、“最有魅力夜市”、“最环保夜市”及“最友善夜市”冠军。
                                </Typography>

                            </CardContent>

                        </CardActionArea>

                        <Box display="flex" justifyContent="flex-end">
                            <CardActions>
                                {/* <a href=''>
                                    <Button size="small" color="primary">
                                        打開地圖
                                    </Button>
                                </a> */}
                                <a href='/nightmarketpage'>
                                    <Button size="small" color="primary">
                                        資訊
                                    </Button>
                                </a>
                            </CardActions>
                        </Box>

                    </Card>
                </Box>

            </Box>
        </Box>

    )
}

// const styles = StyleSheet.create({
//     root: {
//         display: 'flex',
//     },
//     details: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
// });