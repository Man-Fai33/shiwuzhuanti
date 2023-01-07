import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system'
import React from 'react';
import IndexImage from '../../Img/yeshi.jpg'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { Paper } from '@material-ui/core';





export default function Index() {



    const managerBox = (user) => {

        if (user.role === "admin") {

            return (
                <Box xs={12} mt={2} mb={1}>
                    <Paper elevation={24}>
                        <a
                            href='/dataManagement'
                        >
                            <Card sx={12}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140px"
                                        image='./Shop_management.jpg'
                                        alt="green iguana"
                                    />

                                    < Box pl={2} pt={1}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            管理
                                        </Typography>
                                    </Box>

                                </CardActionArea>
                            </Card>
                        </a>
                    </Paper>
                </Box>
            )
        }
        else {
            return (
                <Box xs={12} mt={2} mb={1}  >

                    <Paper elevation={24}>

                        <Card sx={12}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140px"
                                    image='./Shop_management.jpg'
                                    alt="green iguana"
                                />

                                < Box pl={2} pt={1}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        店家管理
                                    </Typography>
                                </Box>

                            </CardActionArea>
                        </Card>

                    </Paper>

                </Box>
            )
        }


    }
    return (
        <Box >
            <Grid container spacing={6}>
                <Grid xs={6} color="error" style={{ "backgroundColor": "white" }}  >

                </Grid>
                <Grid xs={6}  >
                    <Box xs={12} mt={2} mb={1}>
                        <Paper elevation={24}>
                            <a href="/Food">
                                <Card sx={12} >
                                    <CardActionArea >
                                        <CardMedia
                                            xs={{ flex: 'auto' }}
                                            component="img"
                                            image='./Yeshi_food.jpg'
                                            alt="green iguana"
                                        />
                                        <Box pl={2} pt={1}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                食物
                                            </Typography>
                                        </Box>
                                    </CardActionArea>
                                </Card>
                            </a>
                        </Paper>
                    </Box>

                    <Box xs={12} mt={2} mb={1}>
                        <Paper elevation={24}>

                            <a href="/nightMarket">
                                <Card sx={12}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140px"
                                            image={IndexImage}
                                            alt="green iguana"
                                        />
                                        <Box pl={2} pt={1}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                夜市
                                            </Typography>
                                        </Box>
                                    </CardActionArea>
                                </Card>
                            </a>

                        </Paper>
                    </Box>

                    {localStorage.getItem('user') === null ? null : managerBox(JSON.parse(localStorage.getItem('user')))}


                    {/* <Box xs={12} mt={2} mb={1}>
                            <a href="/signup">
                                <Card sx={12}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140px"
                                            image={IndexImage}
                                            alt="green iguana"
                                        />
                                        <Typography gutterBottom variant="h5" component="div">
                                            店家管理
                                        </Typography>

                                    </CardActionArea>
                                </Card>
                            </a>
                        </Box> */}
                </Grid>

            </Grid>

        </Box >
    )
}