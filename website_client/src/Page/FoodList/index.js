import * as React from 'react';

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
import { Button } from '@mui/material';
import Yeshi from '../../Img/nightmarket.jpg'

export default function FoodList() {
    function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    const [foodType, setFoodType] = React.useState("");

    const handleFoodType = (event) => {
        setFoodType(event.target.value);
        console.log(foodType)
    };
    const [location, setLocation] = React.useState("");
    const handleLocation = (event) => {
        setLocation(event.target.value);
        console.log(location)
    }
    return (

        <Box mt={2} mb={2} >
            {/* Food Page title  */}

            <Box mt={2} p={1} display="flex" justifyContent="flex-end">
                <img src={Yeshi} width="100%" height="20px" />
            </Box>
            {/* Search food bar */}
            <Box mb={1} mt={1} display="flex" justifyContent="flex-end" >
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'right', width: "80%" }}
                >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={location}
                            onChange={handleLocation}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>地方</em>
                            </MenuItem>
                            <MenuItem value={'TP'}>台北</MenuItem>
                            <MenuItem value={'TZ'}>台中</MenuItem>
                            <MenuItem value={'TN'}>台南</MenuItem>
                            <MenuItem value={'TD'}>台東</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={foodType}
                            onChange={handleFoodType}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>類別</em>
                            </MenuItem>
                            <MenuItem value={'Pasta'}>麵食</MenuItem>
                            <MenuItem value={'Rice'}>飯類</MenuItem>
                            <MenuItem value={'Fried'}>炸物</MenuItem>
                        </Select>
                    </FormControl>

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="查找你喜歡的食物"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>

            {/* Image Food List */}
            <Box>
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
                    {itemData.map((item) => {
                        const cols = item.featured ? 2 : 1;
                        const rows = item.featured ? 2 : 1;

                        return (
                            <ImageListItem key={item.img} cols={cols} rows={rows}>
                                <img
                                    style={{ padding: '1px' }}
                                    {...srcset(item.img, 250, 200, rows, cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.9) 20%, ' +
                                            'rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={item.title}
                                    position="top"
                                    actionIcon={
                                        <Box display="flex"  >
                                            <IconButton
                                                sx={{ color: 'white' }}
                                                aria-label={`star ${item.title}`}

                                            >

                                                <a href=''>
                                                    <StarBorderIcon />
                                                </a>

                                            </IconButton>
                                            <Box mr={2} ml={2} pt={1} pb={1} >
                                                <a href='FoodInfo'>

                                                    <Button variant="outlined" color="info" ><span className='textWhite' >食物資訊</span></Button>
                                                </a>
                                            </Box>
                                        </Box>
                                    }
                                    actionPosition="right"
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>
            </Box>
        </Box>

    );
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