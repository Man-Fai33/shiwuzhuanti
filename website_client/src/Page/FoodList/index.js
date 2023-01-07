import React, { useState, useEffect } from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Grid } from '@mui/material';
import Yeshi from '../../Img/nightmarket.jpg'
import helper from '../Helper/helper';

export default function FoodList() {
    const [foodList, setFoodList] = useState([])
    const [selectedLocal, setSelectedLocal] = React.useState("all");
    function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    const [searchText, setSearchText] = useState("")

    const [search, setSearch] = useState(false)

    const loaddata = async () => {

        let res = await helper.helper.AsyncFood()
        setFoodList(res.food)
        console.log(foodList)
    }
    useEffect(() => { loaddata() }, [foodList])

    const handleSelectedFood = (id) => {
        localStorage.setItem('foodId', id)

        window.location.href = '/foodInfo'
    }
    const handleSearch = () => {
        if (search === false) {
            setSearch(true)
        } else {
            setSearch(false)
        }



    }
    const HandleAll = () => {
        setSelectedLocal('all')
        localStorage.removeItem('search')
        window.location.reload()
    }
    const HandleTaiPei = () => {
        setSelectedLocal('tp')
        localStorage.removeItem('search')

    }
    const HandleTaiZhong = () => {
        setSelectedLocal('tz')
        localStorage.removeItem('search')
    }
    const HandleTaiNan = () => {
        setSelectedLocal('tn')
        localStorage.removeItem('search')
    }

    return (

        <Box mt={2} mb={2} >
            {/* Food Page title  */}

            <Box mt={2} p={1} display="flex" justifyContent="flex-end">
                <img src={Yeshi} width="100%" height="20px" />
            </Box>
            {/* Search food bar */}
            
            {/* Image Food List */}

            <Box mt={1}>
                <ImageList
                    sx={{
                        width: "100%",
                        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                        transform: 'translateZ(0)',
                    }}
                    rowHeight={200}
                    gap={1}
                    rowHeight='auto'

                >
                    {foodList.map((item) => {
                        const cols = item.featured ? 2 : 1;
                        const rows = item.featured ? 2 : 1;
                        if (searchText === item.foodName) {
                            return (
                                <ImageListItem key={item.foodIcon} cols={cols} rows={rows}>
                                    <img
                                        style={{ padding: '1px' }}
                                        {...srcset(item.foodIcon, 250, 200, rows, cols)}
                                        alt={item.foodName}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.9) 20%, ' +
                                                'rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)',
                                        }}
                                        title={item.foodName}
                                        position="top"
                                        actionIcon={
                                            <Box display="flex"  >
                                                <IconButton
                                                    sx={{ color: 'white' }}
                                                    aria-label={`star ${item.foodName}`}

                                                >
                                                </IconButton>
                                                <Box mr={2} ml={2} pt={1} pb={1} >
                                                    <a href='FoodInfo'>

                                                        <Button variant="outlined" color="info" onClick={e => handleSelectedFood(item._id)} ><span className='textWhite' >食物資訊</span></Button>
                                                    </a>
                                                </Box>
                                            </Box>
                                        }
                                        actionPosition="right"
                                    />
                                </ImageListItem>

                            );
                        } else {
                            return (
                                <ImageListItem key={item.foodIcon} cols={cols} rows={rows}>
                                    <img
                                        style={{ padding: '1px' }}
                                        {...srcset(item.foodIcon, 250, 200, rows, cols)}
                                        alt={item.foodName}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.9) 20%, ' +
                                                'rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)',
                                        }}
                                        title={item.foodName}
                                        position="top"
                                        actionIcon={
                                            <Box display="flex"  >
                                                <IconButton
                                                    sx={{ color: 'white' }}
                                                    aria-label={`star ${item.foodName}`}

                                                >
                                                </IconButton>
                                                <Box mr={2} ml={2} pt={1} pb={1} >
                                                    <a href='FoodInfo'>

                                                        <Button variant="outlined" color="info" onClick={e => handleSelectedFood(item._id)} ><span className='textWhite' >食物資訊</span></Button>
                                                    </a>
                                                </Box>
                                            </Box>
                                        }
                                        actionPosition="right"
                                    />
                                </ImageListItem>

                            );
                        }
                    })}
                </ImageList>
            </Box>
        </Box>

    );
}

