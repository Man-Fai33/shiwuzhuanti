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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import helper from '../Helper/helper';



import Cat from '../../Img/Cat.jpg'


const useStyles = makeStyles((theme) => ({

    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

export default function Profile() {
    const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

    const [username, setusername] = useState("");
    const [usereamil, setusereamil] = useState("");
    const [userpermission, setuserpermission] = useState("");
    const [usergender, setusergender] = useState("");
    const [userphone, setuserphone] = useState("");
    const [userlocation, setuserlocation] = useState("");
    const [userintroduction, setuserintroduction] = useState("");
    const [oldpassowrd, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("")

    const [changePwd, SetChangePwd] = React.useState(false);
    const [editUser, setEditUser] = React.useState(false);
    const [ImageIcon, setImageIcon] = useState(null);
    const handleClickEditUser = () => {
        setEditUser(true);
    }
    const handleQuitEditUser = () => {
        setEditUser(false);
        setusername("")
        setuserphone("")
        setuserlocation("")
        setuserintroduction("")
    }
    const handleDoneEditUser = async () => {
        setEditUser(false);
        if (username !== "" && userphone !== "" && userlocation !== "" && userintroduction !== "") {
            let edituser = ({ ...user, username: username, phone: userphone, location: userlocation, introduction: userintroduction }
            )
            let res = await helper.helper.AsyncUserEdit(edituser)
            localStorage.setItem('user', JSON.stringify(res.user))
            window.location.reload()
        } else {
            alert("用戶更新不成功")
        }


    }
    const handleClickCPWD = () => {
        SetChangePwd(true);

    };

    const handleCloseCPWD = () => {
        SetChangePwd(false);
    };
    const handleDoneCPWD = async () => {
        SetChangePwd(false);
        if (oldpassowrd !== "" && newpassword !== "") {
            if (oldpassowrd === user.password) {

                let editUser = ({
                    ...user, password: newpassword
                })
                alert("密碼修改成功")
                let res = await helper.helper.AsyncUserEdit(editUser)
                localStorage.clear()
                window.location.href = "/signin"
            } else {
                alert("舊密碼不符合")
            }
        } else {
            alert("請輸入完整密碼")
        }
    }


    const handleSubmit = async e => {
        e.preventDefault();

        let data = new FormData();
        data.append('Image', ImageIcon)
        let res = await helper.helper.AsyncUploadImage(data)
        user.iconUrl = res.path;
        let response = await helper.helper.AsyncUserEdit(user);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.reload();
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
                                    <Avatar alt="Remy Sharp" src={localStorage.getItem('user') === null ? null : user.iconUrl} className={classes.large} />
                                </Box>

                            </Box>
                            <Box display='flex' justifyContent='center'>
                                <form action='/upload' enctype='multipart/form-data' onSubmit={handleSubmit}>
                                    <Button variant='contained' size='small' component="label">
                                        Upload Image

                                        <input hidden type="file" multiple name="image" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={e => setImageIcon(e.target.files[0])} />


                                    </Button>
                                    <Button variant='contained' size='small' component="label">
                                        Sbmit
                                        <input hidden onClick={handleSubmit} />
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
                                            value={user.username}
                                        // onChange={handleChange('amount')}
                                        // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">User Email</InputLabel>
                                        <Input
                                            id="id_usereamil"
                                            value={user.email}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="usereamil"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid>

                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">User Permission</InputLabel>
                                        <Input
                                            id="id_permission"
                                            value={user.role}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="permission"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">  User Gender</InputLabel>
                                        <Input
                                            id="id_gender"
                                            value={user.gender === true ? "Male" : "Female"}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="gender"

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
                                            value={user.phone}
                                            disabled
                                            label="phone"

                                        />
                                    </FormControl>
                                </Grid>
                                <Grid>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount"> User Location</InputLabel>
                                        <Input
                                            id="id_location"
                                            value={user.location}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            disabled
                                            label="location"

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
                                value={user.introduction}
                                // onChange={handleChange}
                                variant="filled"

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
                        open={editUser}
                        onClose={handleCloseCPWD}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"改個人資料"}</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Box pl={2} pr={2}>


                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">User Name</InputLabel>
                                        <Input
                                            id="id_username"
                                            placeholder={user.username}

                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            onChange={(event) => {
                                                setusername(event.target.value)
                                            }}
                                        />

                                    </FormControl>

                                    {/* <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">User Email</InputLabel>
                                        <Input
                                            id="id_usereamil"
                                            placeholder={user.email}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            type="email"
                                            label="usereamil"
                                            onChange={(event) => {
                                                setusereamil(event.target.value)
                                            }}
                                        />
                                    </FormControl> */}




                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount"> User Phone</InputLabel>
                                        <Input
                                            id="id_phone"
                                            placeholder={user.phone}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}

                                            label="phone"
                                            onChange={(event) => {
                                                setuserphone(event.target.value)
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount"> User Location</InputLabel>
                                        <Input
                                            id="id_location"
                                            placeholder={user.location}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}

                                            label="location"
                                            onChange={(event) => {
                                                setuserlocation(event.target.value)
                                            }}
                                        />
                                    </FormControl>
                                    <Box mt={2}>
                                        <TextField
                                            id="id_userintroduction"
                                            label="User Introduction"
                                            multiline
                                            maxRows={4}
                                            fullWidth
                                            rows={4}


                                            onChange={(event) => {
                                                setuserintroduction(event.target.value)
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleQuitEditUser} color="primary">
                                退出
                            </Button>
                            <Button onClick={handleDoneEditUser} color="primary" autoFocus>
                                更改
                            </Button>
                        </DialogActions>

                    </Dialog>


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
                                            id="oldpassowrd"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            // disabled
                                            type='password'
                                            label="oldpassowrd"
                                            onChange={e => setOldPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth variant="standard">
                                        <InputLabel htmlFor="outlined-adornment-amount">新密碼</InputLabel>
                                        <Input
                                            id="password"
                                            // value={values.amount}
                                            // onChange={handleChange('amount')}
                                            // startAdornment={<InputAdornment position="start"></InputAdornment>}
                                            type='password'
                                            label="password"
                                            onChange={e => setNewPassword(e.target.value)}
                                        />
                                    </FormControl>

                                </Box>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleCloseCPWD} color="primary">
                                退出
                            </Button>
                            <Button onClick={handleDoneCPWD} color="primary" autoFocus>
                                更改
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Paper >
        </Box>
    )
}