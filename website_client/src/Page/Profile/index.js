import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, Grid, Paper, Typography } from '@material-ui/core'
import "./index.css"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//form
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import helper from '../Helper/helper';



import Cat from '../../Img/Cat.jpg'
import { formatDate } from '@formatjs/intl';
import { keys } from '@material-ui/core/styles/createBreakpoints';

const useStyles = makeStyles((theme) => ({

    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

export default function Profile() {
    const [username, setusername] = useState("");
    const [usereamil, setusereamil] = useState("");
    const [userpermission, setuserpermission] = useState("");
    const [usergender, setusergender] = useState("");
    const [userphone, setuserphone] = useState("");
    const [userlocation, setuserlocation] = useState("");
    const [userintroduction, setuserintroduction] = useState("");

    const [changePwd, SetChangePwd] = React.useState(false);
    const [editUser, setEditUser] = React.useState(false);
    const [ImageIcon, setImageIcon] = useState(null);
    const handleClickEditUser = () => {
        setEditUser(true);
        document.getElementById('id_username').removeAttribute('disabled')
        document.getElementById('id_usereamil').removeAttribute('disabled')
        document.getElementById('id_permission').removeAttribute('disabled')
        document.getElementById('id_gender').removeAttribute('disabled')
        document.getElementById('id_phone').removeAttribute('disabled')
        document.getElementById('id_location').removeAttribute('disabled')
        document.getElementById('id_userintroduction').removeAttribute('disabled')

    }
    const handleDoneEditUser = () => {
        setEditUser(false);
        document.getElementById('id_username').setAttribute('disabled')
        document.getElementById('id_usereamil').setAttribute('disabled')
        document.getElementById('id_permission').setAttribute('disabled')
        document.getElementById('id_gender').setAttribute('disabled')
        document.getElementById('id_phone').setAttribute('disabled')
        document.getElementById('id_location').setAttribute('disabled')
        document.getElementById('id_userintroduction').setAttribute('disabled')
    }
    const handleClickCPWD = () => {
        SetChangePwd(true);
    };

    const handleCloseCPWD = () => {
        SetChangePwd(false);
    };
    const ImageUpload = (event) => {
        setImageIcon(event.target.files[0]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
 

        const data = new FormData();

        let file = ImageIcon
        console.log(file)
        data.append("Image", file)
        // Object.keys(image).forEach(key => {
        //     data.append(image.item(key).name, image.item(key))
        // })
        let res = await helper.helper.AsyncUploadImage(ImageIcon)

        // console.log(res)

    }

    const classes = useStyles();
    return (
        <Box mt={2} mb={2} >
            <Paper  >
                <Box p={2}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Box className='Profile_Box' display="flex" justifyContent="center" p={2}>
                                <Box className='Profile_Icon'>
                                    <Avatar alt="Remy Sharp" src={Cat} className={classes.large} />
                                </Box>

                            </Box>
                            <Box display='flex' justifyContent='center'>
                                <form action='/upload' enctype='multipart/form-data' onSubmit={handleSubmit}>
                                    <Button variant='contained' size='small' component="label">
                                        Upload Image

                                        <input hidden type="file" multiple accept="image/jpg,image/jpeg,image/png,image/gif" onChange={ImageUpload} />


                                    </Button>
                                    <Button variant='contained' size='small' component="label">
                                        Sbmit
                                        <input hidden type="submit" />
                                    </Button>
                                </form>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <Grid className='Profile_Information' >
                                <Grid xs={12} direction="row" >
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">User Name</InputLabel>
                                        <Input
                                            id="id_username"
                                            disabled
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            onChange={(event) => {
                                                setusername(event.target.value)
                                            }}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">User Email</InputLabel>
                                        <Input
                                            id="id_usereamil"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="usereamil"
                                            onChange={(event) => {
                                                setusereamil(event.target.value)
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid>

                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">User Permission</InputLabel>
                                        <Input
                                            id="id_permission"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="permission"
                                            onChange={(event) => {
                                                setuserpermission(event.target.value)
                                            }}

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">  User Gender</InputLabel>
                                        <Input
                                            id="id_gender"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="gender"
                                            onChange={(event) => {
                                                setusergender(event.target.value)
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                {/* <Grid>
                                    User Store
                                </Grid> */}
                                <Grid>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount"> User Phone</InputLabel>
                                        <Input
                                            id="id_phone"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="phone"
                                            onChange={(event) => {
                                                setuserphone(event.target.value)
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount"> User Location</InputLabel>
                                        <Input
                                            id="id_location"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="location"
                                            onChange={(event) => {
                                                setuserlocation(event.target.value)
                                            }}
                                        />
                                    </FormControl>
                                </Grid>

                            </Grid>


                        </Grid>
                        {/* button of change or application  */}
                        <Box width="100%" mt={2} mb={2} >

                            <TextField
                                id="id_userintroduction"
                                label="User Introduction"
                                multiline
                                maxRows={4}
                                fullWidth
                                rows={4}
                                disabled
                                // value={value}
                                // onChange={handleChange}
                                variant="filled"
                                onChange={(event) => {
                                    setuserintroduction(event.target.value)
                                }}
                            />

                        </Box>

                        <Grid item xs={12}  >
                            <Box display="flex" justifyContent="flex-end" pr={2} >
                                <Box pr={2}>
                                    <Button variant="outlined" color="primary" onClick={handleClickEditUser}>Edit</Button>
                                </Box>
                                <Box pr={2}>
                                    <Button variant="outlined" color="primary" onClick={handleClickCPWD}>Change Password</Button>
                                </Box>

                                <a href='/account'><Button variant="outlined" color="primary">Application Store</Button></a>
                            </Box>
                        </Grid>

                    </Grid>






                    <Dialog
                        open={changePwd}
                        onClose={handleCloseCPWD}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"改密碼?"}</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Box pl={2} pr={2}>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">舊密碼</InputLabel>
                                        <Input
                                            id="gender"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            // disabled
                                            label="gender"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">新密碼</InputLabel>
                                        <Input
                                            id="gender"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            // disabled
                                            label="gender"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">再輸入新密碼</InputLabel>
                                        <Input
                                            id="gender"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            // disabled
                                            label="gender"
                                        />
                                    </FormControl>
                                </Box>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleCloseCPWD} color="primary">
                                退出
                            </Button>
                            <Button onClick={handleCloseCPWD} color="primary" autoFocus>
                                更改
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Paper >
        </Box>
    )
}