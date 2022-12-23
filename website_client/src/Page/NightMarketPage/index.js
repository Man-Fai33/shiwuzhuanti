import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { Box, Divider } from '@mui/material'
import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import './index.css'
import Cat from '../../Img/Cat.jpg'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import InfoIcon from '@mui/icons-material/Info';
export default function NightMarketPage() {

    return (

        <Box mt={2} mb={2} >

            <Paper className="nightMarketPage" elevation={24}  >
                <Box p={2} >
                    <Box display="flex" justifyContent="center" >
                        <Typography className='NightName_zh' variant='h4'>
                            寧夏夜市</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center"  >
                        <Typography className='NightName_en' variant='h4'>
                            Ningxia Night Market
                        </Typography>
                    </Box>
                    <Box mb={2} mt={2}>
                        <Divider></Divider>
                    </Box>
                    <Grid container spacing={3} >
                        <Grid item container className='NightMarketImg' xs={12} md={4} sm={12} justifyContent="center">

                            <Paper >
                                <img src={Cat} width="400px" height="400px" />

                                <Box display="flex" justifyContent="flex-end">
                                    <Typography component="legend">推薦指數</Typography>
                                    <Rating name="read-only" value={5} readOnly />
                                </Box>
                            </Paper>


                        </Grid>
                        <Grid item className='NightMarketInfo' xs={12} md={8} sm={12} >
                            <Grid item xs={12} md={12} sm={6}><Chip avatar={<Avatar>TP</Avatar>} label="台北" color='primary' /><Typography variant='h7'>寧夏夜市</Typography></Grid>
                            <Grid item xs={12} md={12} sm={6}>位置：雙連或中山捷運站走路五分鐘</Grid>
                            <Grid item xs={12} md={12} sm={12}>簡介 寧夏夜市不只是夜市</Grid>
                            <Grid item xs={12} md={12} sm={12}>位於台北市大同區圓環邊的寧夏夜市， 除了有讓人垂涎欲滴的小吃美食之外，夜市還夾帶著濃濃的人情味，許多在地故事、文化精神都在其中。『千歲宴』、『總統府國宴』、『環保夜市』、『夜市產品標示熱量』等許多的第一次，都是來自於寧夏夜市的創意。寧夏夜市觀光協會不但推動會長由會員直選，財務管理委由會計師事務所製作財務報表確保財務透明化，進而訂立工作規範與「攤商管理辦法」，與當地里長一起推動鄰里和諧，也結合大稻埕文化推動，當夜市與在地文化的情感緊密結合時，每個攤位的形象與口味，都成為好玩有趣的文化故事，不斷地被傳頌著。</Grid>
                        </Grid>
                    </Grid>
                    <Box className='NightMarketIntroduction' mt={2} mb={2}>
                        位於民生西路、南京西路與重慶北路中間路段的寧夏觀光夜市，被譽為「台北人的胃」，囊括了各種道地傳統台灣小吃，以及異國小吃料理等等， 2015年，寧夏夜市更於台北市政府舉辦「臺北夜市之最」投票選舉中奪得「最好逛夜市」、「最美味夜市」、「最有魅力夜市」、「最環保夜市」及「最友善夜市」冠軍。
                        <br />
                        寧夏夜市，起源於日據時期的圓環，原所在地為下奎府町，二次世界大戰後，命名為「寧夏街」，後來改為「寧夏路」。在淡水線鐵路開通後成為攤販聚集地，見證了大稻埕的繁華璀璨年代。而後1973年，重慶北路拓寬工程開工，市府將圓環的攤商安置於重慶北路二段與寧夏路兩旁，寧夏夜市因而逐漸興盛發展。但隨著台北各大夜市興起，寧夏夜市光芒在各新興夜市中略顯黯淡。         <br />

                        台北市都市發展局為了讓寧夏夜市再現風華，挑選此地為「夜市改造示範點」，經過「臺北市夜市改造計畫」的工程，增闢行人徒步區，不但改善了攤販的營業環境，也讓消費者吃得更舒適。
                        <br />
                        為了讓寧夏夜市發展更健全，並促進夜市商機，民國90年，正式成立「寧夏夜市商圈發展協會」，協助臺北市政府進行整頓寧夏夜市工程。民國97年12月成立社團法人「臺北市寧夏夜市觀光協會」，並透過協會配合政府政策，全面改用環保筷、設置地下化大型油脂截留器系統、集中處理攤販營業油污廢水問題，與加裝防制油煙異味的設備，改善過往民眾對於夜市髒亂的形象，打造全新的「環保示範夜市」，因此也吸引了海內外觀光客的青睞，成為全台指標性的夜市。
                    </Box>
                    <div className="NightMarketFoodList">
                        <ImageList sx={{ width: "100%", height: 450 }}>
                            <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div">頂級美食列表</ListSubheader>
                            </ImageListItem>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} >
                                    <img
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.title}
                                        subtitle={item.author}

                                        actionIcon={
                                            <Box mr={2}>
                                                <a href='/foodInfo'>
                                                    <Button
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${item.title}`}
                                                        variant='contained'
                                                    >
                                                        <InfoIcon color="primary" />
                                                        查看
                                                    </Button>
                                                </a>
                                            </Box>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>

                    {/* 攤位 */}
                    <Box mt={2} mb={2}>

                        <Box display='flex' justifyContent='flex-start'>夜市攤位列表Top 10</Box>
                        <Box spacing={2} display='flex' justifyContent='space-between'>
                            <ImageList sx={{ width: "100%", height: 200 }} variant='masonry'>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img} >
                                        <img
                                            src={`${item.img}?w=248&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={item.title + " ,店家基本會員費:1000"}
                                            subtitle={item.author}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                    </Box>

                    <Box className='NightMarketMap'>
                        地圖
                        <LoadScript
                            googleMapsApiKey="AIzaSyAEKOyS_X1yQAGmiZBO9zBjCeFqEsKa5DQ"
                        >
                            <GoogleMap
                                mapContainerStyle={{ width: "100%", height: '400px' }}
                                center={{

                                    lat: 25.05670339576867,
                                    lng: 121.5154829899782
                                }}
                                zoom={17}
                            >
                                { /* Child components, such as markers, info windows, etc. */}
                                <></>
                            </GoogleMap>
                        </LoadScript>
                    </Box>
                </Box>
            </Paper >
        </Box >


    )
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];