import React, { useState } from 'react';
import { Box  } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';


import { Button,Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import './index.css'
import InfoIcon from '@mui/icons-material/Info';
import helper from '../Helper/helper';


export default function FoodInfo() {
    const [rating, setRating] = useState(0);
    // const foodId = localStorage.getItem('foodId') !== "" ? localStorage.getItem('foodId') : null
    const [food, setFood] = useState("")
    const [shop, setShop] = useState([])
    const user = localStorage.getItem('user') !== "" ? JSON.parse(localStorage.getItem('user')) : ""
    const loadFood = async () => {

        let res = await helper.helper.AsyncFoodOne(localStorage.getItem('foodId'));
        setFood(res.food)
        let resp = await helper.helper.AsyncShopData()
        setShop(resp.shop)

    }
    React.useEffect(() => {
        loadFood()
    }, [])

    const handleRating = async (newRating) => {
        setRating(newRating)
        let editfood = ({
            ...food, rating: newRating
        })
        let res = await helper.helper.AsyncEditFood(user._id, editfood)
        console.log(res.food)
    }
    const handleFavorite = () => {
        let editfood = ({
            ...food, isLike: user._id
        })
        console.log(food)
    }
    const readfoodType = (foodType) => {
        return (
            < Button variant="contained" color="success" > {foodType}</Button>
        )
    }
    const handleclickShop = (id) => {

        localStorage.setItem('shopId', id)
        window.location.href = '/shop'
    }



    return (
        <div className='FoodDiv'>
            <Box pb={3}>
                <Paper elevation={24} square={false}  >

                    <div className='Foodbackground'>

                        {/* <Box display='flex' justifyContent='flex-end'>
                            <IconButton aria-label="add to favorites" onClick={handleFavorite}>
                                {user !== "" ?
                                    console.log(food.isLike)
                                    
                                : <FavoriteBorderIcon />
                                }

                            </IconButton> */}
                        {/* </Box> */}
                        <Box className='FoodName' display="flex" justifyContent="center" mt={2} pt={2} pb={2}>
                            <Typography variant="h3" >{food.foodName}</Typography>
                        </Box>
                        <Box className='FoodPicture' display='flex' justifyContent="center" pl={8} pr={8}>
                            {/* <MuiImageSlider  img={} /> */}
                            <img src={food.foodIcon} />
                        </Box>

                        <Box pr={2} pl={2} pb={2} pt={2}>
                            <Box  >
                                <Typography variant="subtitle1" >
                                    {food.foodInfo}
                                </Typography>
                                <Typography variant="subtitle1" >
                                    {food.foodInfoEN}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
                                {/* {console.log(food.rating)} */}
                                <Rating name="half-rating" defaultValue={food.rating+1-1} value={food.rating+1-1} precision={0.5}
                                    onChange={(event, newRating) => {
                                        handleRating(newRating)
                                    }} />
                            </Box>



                            <Paper elevation={12}>
                                <Box pl={2} pt={2}> 食物的類型:</Box>

                                <Box maxWidth="100%" display='flex' justifyContent='flex-start' sx={{ flexWrap: 'wrap' }} p={2} >
                                    <Box pr={1} pl={1}>
                                        {/* {food.foodType.map((item) => {

                                            return (< Button variant="contained" color="success" > {item}</Button>)
                                        })} */}
                                        {food.foodType !== "" ? readfoodType(food.foodType) : < Button variant="contained" color="success" > 沒有適合的類型</Button>}
                                    </Box>

                                </Box>
                            </Paper>

                            <Box mt={2} pr={2} pl={2} color='#0000000'>
                                <Box display='flex' justifyContent='flex-start' mr={1} >相關食店排名</Box>
                                <Box display='flex' justifyContent='space-between' mt={2} mb={2}>
                                    <ImageList sx={{ width: "100%", height: 270 }} variant='masonry'>
                                        {shop.map((item) => (


                                            <ImageListItem key={item.shopIcon} >
                                                <img
                                                    src={`${item.shopIcon}?w=248&fit=crop&auto=format`}
                                                    srcSet={`${item.shopIcon}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={item.shopName}
                                                    loading="lazy"
                                                />
                                                <ImageListItemBar
                                                    title={item.shopName}
                                                    actionIcon={
                                                        <Box mr={2}>

                                                            <Button
                                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                                aria-label={`info about ${item.shopName}`}
                                                                variant='contained'
                                                                onClick={e => handleclickShop(item._id)}
                                                            >
                                                                <InfoIcon color="primary" />
                                                                查看
                                                            </Button>

                                                        </Box>
                                                    }

                                                />
                                            </ImageListItem>

                                        ))}
                                    </ImageList>
                                </Box>
                            </Box>

                        </Box >

                    </div >
                </Paper >
            </Box >

           

        </div >
    )
}
