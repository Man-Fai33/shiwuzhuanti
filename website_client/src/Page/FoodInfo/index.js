import React, { useState } from 'react';
import { Box, Card } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Cat from '../../Img/Cat.jpg'
import Yeshi from '../../Img/yeshi.jpg'
import neight from '../../Img/nightmarket.jpg'
import MuiImageSlider from 'mui-image-slider';
import { Button, Divider, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './index.css'
const ImageLists = [
    Yeshi,
    neight,
    Cat
]

export default function FoodInfo() {
    const [rating, setRating] = useState(0);

    return (
        <div className='FoodDiv'>
            <Box pb={3}>
                <Paper elevation={24} square={false}  >

                    <div className='Foodbackground'>
                        <Box display='flex' justifyContent='flex-end'>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </Box>
                        <Box className='FoodName' display="flex" justifyContent="center" mt={2}>
                            <Typography variant="h3" > FOOD IS BEST</Typography>
                        </Box>
                        <Box className='FoodPicture' display='flex' justifyContent="center">
                            <MuiImageSlider images={ImageLists} />
                        </Box>
                        <Divider />
                        <Box pr={2} pl={2} pb={2} pt={2}>
                            <Box  >
                                <Typography variant="subtitle1" >  小籠包是指傳統上用小竹蒸籠（小籠）蒸製的一種小包子,選用豬肉為餡，拌入雞湯凍再加入蟹粉或蝦仁或春筍。
                                    <br />
                                    Xiaolongbao refers to a type of small Chinese steamed bun (baozi) traditionally STEAMED in a small bamboo steaming basket (xiaolong). Normally filled with pork,  chicken soup jelly and other ingredients like crab powder or shrimp or bamboo shoots.</Typography>
                            </Box>
                            <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
                                <Rating name="half-rating" defaultValue={0} value={rating} precision={0.5}
                                    onChange={(event, newRating) => {
                                        setRating(newRating);
                                    }} />
                            </Box>



                            <Paper>
                                <Box p={1}> 食物的類型:</Box>
                                <Divider />
                                <Box display="flex" pt={1} pb={1}>
                                    <Box pr={1} pl={1}> <Button variant="contained" color="success">nodd</Button></Box>
                                    <Box pr={1} pl={1}> <Button variant="contained" color="success">nodd</Button></Box>
                                    <Box pr={1} pl={1}> <Button variant="contained" color="success">nodd</Button></Box>
                                    <Box pr={1} pl={1}> <Button variant="contained" color="success">nodd</Button></Box>
                                </Box>
                            </Paper>

                            <Box mt={2} pr={2} pl={2} color='#0000000'>
                                <Box display='flex' justifyContent='flex-start' mr={1} >相關食店排名</Box>
                                <Box display='flex' justifyContent='space-between' mt={2} mb={2}>
                                    <ImageList sx={{ width: "100%", height: 200 }} variant='masonry'>
                                        {itemData.map((item) => (
                                            <a href=''>
                                                <ImageListItem key={item.img} >
                                                    <img
                                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                    <ImageListItemBar
                                                        title={item.title}
                                                    />
                                                </ImageListItem>
                                            </a>
                                        ))}
                                    </ImageList>
                                </Box>
                            </Box>

                        </Box >

                    </div >
                </Paper >
            </Box>

        </div >
    )
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
    },
];