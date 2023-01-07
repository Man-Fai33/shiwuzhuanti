import React, { useState } from 'react';
import { Box } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

import { Button, Divider, Grid, Typography } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';
import helper from '../Helper/helper';
import TextField from '@mui/material/TextField';

export default function ShopPage() {
    const [shop, setShop] = useState([])
    const [foods, setFoods] = useState([])
    const [comment, setComment] = useState("")
    const [commentList, setCommentList] = useState([])
    const user = localStorage.getItem('user') !== "" ? JSON.parse(localStorage.getItem('user')) : ""
    const shopId = localStorage.getItem('shopId') !== "" ? localStorage.getItem('shopId') : ""
    const loadFood = async () => {
        let res = await helper.helper.AsyncShopOne(shopId)
        setShop(res.shop)
        let resp = await helper.helper.AsyncFood()
        setFoods(resp.food)

        let response = await helper.helper.AsyncComments()
        setCommentList(response.comment)


    }
    React.useEffect(() => {
        loadFood()
    }, [])
    const readShopType = (shopType) => {
        return (
            < Button variant="contained" color="success" > {shopType}</Button>
        )
    }
    const handleclickfood = (id) => {
        localStorage.setItem('foodId', id)

        window.location.href = '/foodInfo'
    }
    const readfoods = (food) => {


        return (
            foods.map((food) => {
                for (let i = 0; i < shop.food.length; i++) {
                    if (food.foodName === shop.food[i].foodName && food.foodIcon === shop.food[i].foodIcon) {

                        return (
                            <ImageListItem key={food.foodIcon} >
                                <img
                                    src={`${food.foodIcon}?w=248&fit=crop&auto=format`}
                                    srcSet={`${food.foodIcon}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={food.foodName}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={food.foodName}

                                    actionIcon={
                                        <Box mr={2}>

                                            <Button
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${food.foodName}`}
                                                variant='contained'
                                                onClick={e => handleclickfood(food._id)}
                                            >
                                                <InfoIcon color="primary" />
                                                查看
                                            </Button>

                                        </Box>
                                    }

                                />
                            </ImageListItem>
                        )
                    }
                }
            })
        )



    }
    const handleRating = async (newRating) => {

        let editshop = ({
            ...shop, rating: newRating
        })

        let res = await helper.helper.AsyncEditShop(user._id, editshop)
        setShop(res.shop)
    }
    const handleComment = async () => {
        let date = new Date()
        let new_comment = ({
            ownerId: user._id,
            ownerName: user.username,
            shop: shopId,
            comment: comment,
            date: date,
        })
        let res = await helper.helper.AsyncCommentCreate(new_comment)
        console.log(res)
        if (res.status === "success") {
            window.location.reload()
        }
    }
    const readCommentList = () => {
        return (
            commentList.map((comment) => {
                if (comment.shop === shopId) {

                    return (
                        <Grid item xs={12} spacing={1}>

                            <Box pl={2} pr={2} pb={2} id="commentArea">
                                <Paper elevation={2}>

                                    <Grid item xs={12}>
                                        <Box pt={2} pl={2}>
                                            用戶名稱:  {comment.ownerName}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box pt={2} pl={2}>
                                            {comment.comment}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box pt={2} pl={2} pr={2} pb={2} display="flex" justifyContent='flex-end'>
                                            {comment.date.substr(0, 10)}
                                        </Box>
                                    </Grid>
                                </Paper>
                            </Box>

                        </Grid>
                    )
                }
            })
        )
    }


    return (
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
                        <Typography variant="h3" >{shop.shopName}</Typography>
                    </Box>
                    <Box className='FoodPicture' display='flex' justifyContent="center" pl={8} pr={8}>
                        {/* <MuiImageSlider  img={} /> */}
                        <img src={shop.shopIcon} />
                    </Box>

                    <Box pr={2} pl={2} pb={2} pt={2}>
                        <Box  >
                            <Typography variant="subtitle1" >
                                夜市： {shop.shopYeShi}
                            </Typography>
                            <Typography variant="subtitle1" >
                                {shop.shopLocation}
                            </Typography>
                            <Typography variant="subtitle1" >
                                {shop.shopIntroduction}
                            </Typography>

                            <Typography variant="subtitle1" >
                                {shop.shopShortIntroduction}
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>

                            <Rating name="half-rating" defaultValue={shop.rating} value={shop.rating + 1 - 1} precision={0.5}
                                onChange={(event, newRating) => {
                                    handleRating(newRating)
                                }} />
                        </Box>



                        <Paper elevation={12}>
                            <Box pl={2} pt={2}> 食物的類型:</Box>

                            <Box maxWidth="100%" display='flex' justifyContent='flex-start' sx={{ flexWrap: 'wrap' }} p={2} >
                                <Box pr={1} pl={1}>
                                    {/* {shop.shopType.map((item) => {

                                        return (< Button variant="contained" color="success" > {item}</Button>)
                                    })} :  */}
                                    {shop.shopType !== "" ? readShopType(shop.shopType) : < Button variant="contained" color="success" > 沒有適合的類型</Button>}
                                </Box>

                            </Box>
                        </Paper>

                        <Box mt={2} pr={2} pl={2} color='#0000000'>
                            <Box display='flex' justifyContent='flex-start' mr={1} >售賣的食物</Box>
                            <Box display='flex' justifyContent='space-between' mt={2} mb={2}>
                                <ImageList sx={{ width: "100%", height: 500 }} variant='masonry'>

                                    {foods !== "" ? readfoods(foods) : null}
                                </ImageList>
                            </Box>
                        </Box>
                        <Box mt={4} p={2} pb={4} >


                            <Paper elevation={24}>
                                <Grid container spacing={2}>
                                    {localStorage.getItem('user') !== null ?
                                        <Grid container spacing={2}>

                                            <Grid item xs={12}>
                                                <Box pt={2} pl={4} pr={2}>
                                                    <TextField label="留言區域" color="secondary" fullWidth multiline rows={5} focused onChange={e => setComment(e.target.value)} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box display="flex" justifyContent='flex-end' pr={2}>
                                                    <Button variant='contained' onClick={handleComment} >留言</Button>
                                                </Box>
                                            </Grid>
                                        </Grid> : null}
                                    <Grid item xs={12}>
                                        <Box>
                                            <Divider light />
                                        </Box>
                                    </Grid>
                                    {commentList !== "" ? readCommentList() : ""}
                                </Grid>


                            </Paper>
                        </Box>

                    </Box >




                </div >
            </Paper >


        </Box >
    )
}