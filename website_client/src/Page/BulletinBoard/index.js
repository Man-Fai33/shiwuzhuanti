import { Box, Button, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import React from 'react'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '60%',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    BulletinBoard_img: {
        width: '100%',
        objectFit: 'cover'
    }
}));
export default function BulletinBoard() {
    const classes = useStyles();
    const theme = useTheme();
    const [isDialog, SetDialog] = React.useState(false);
    const HandleClickDialog = () => {
        SetDialog(true);
    }
    const HandleDoneDialog = () => {
        SetDialog(false);
    }
    return (
        <div>
            <Box mt={2} mb={2} mr={2} ml={2}>
                <Paper elevation={12}>
                    <Box p={2} width='100%' height='330px' display="flex" justifyContent='center'>
                        <CardMedia
                            className={classes.BulletinBoard_img}
                            image="./Shop_management.jpg"
                            title="Live from space album cover"
                        />
                        {/* <img style={{ objectFit: 'contain', maxHeight: 'auto', width: 'auto' }} src='./Shop_management.jpg' /> */}
                    </Box>
                </Paper>
            </Box>

            <Box mb={2}>
                <Paper elevation={24}>
                    {/* BoardList */}
                    <Box p={2}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image="/Shop_management.jpg"
                                title="Live from space album cover"
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        「半價銅板購」
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        60-100處傳統市集(公有市場+列管夜市)，每處自治會行銷經費10萬元，匯集市集特色商品，每個市集提供價值至少100元的特色商品組合(四周合計至少1,600份)，吸引民眾至傳統市集消費，帶動市場及夜市攤商商機。
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        2022-06-15,主辦方
                                    </Typography>
                                </CardContent>
                                <Box display='flex' justifyContent='flex-end' mr={2} mb={1}>
                                    <Button variant='outlined' onClick={HandleClickDialog}>查看詳情</Button>
                                </Box>

                            </div>
                        </Card>
                    </Box>



                </Paper>

            </Box>

            <Dialog
                open={isDialog}
                onClose={HandleDoneDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                width="900px"
            >
                <DialogTitle id="alert-dialog-title">
                    「半價銅板購」
                </DialogTitle>
                {/* <Divider /> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box pl={2} pr={2}>
                            60-100處傳統市集(公有市場+列管夜市)，每處自治會行銷經費10萬元，匯集市集特色商品，每個市集提供價值至少100元的特色商品組合(四周合計至少1,600份)，吸引民眾至傳統市集消費，帶動市場及夜市攤商商機。

                        </Box>
                        <Box display="flex" justifyContent="flex-end" >
                            2022-06-15,主辦方
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={HandleDoneDialog} color="primary">
                            退出
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>


        </div>
    )
}
