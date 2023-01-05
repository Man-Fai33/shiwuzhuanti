import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import helper from '../Helper/helper';

const theme = createTheme();
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));
export default function SignUp() {
    // variable
    const [uname, setUname] = useState("")
    const [upassword, setUpassword] = useState("")
    const [ugender, setUgender] = useState(false)
    const [uphone, setUphone] = useState("")
    const [ulocation, setUlocation] = useState("")
    const [uemail, setUemail] = useState("")
    const [error, setError] = useState("")

    //handle variables on changed 

    const handleEmail = (event) => {

    }



    const handleGender = (event) => {
        event.preventDefault();
        console.log(event.target.checked)
        if (event.target.checked == false) {
            setUgender(false);

        } else {
            setUgender(true);
        }
        console.log(ugender);
    }






    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        // eslint-disable-next-line no-console
        let user =
        {
            user: {
                username: uname,
                email: data.get('email'),
                password: data.get('password'),
                role: "user",
                phone: uphone,
                location: ulocation,
                gender: ugender
            }
        }

        if (data.get('email') === "" || upassword === "") {
            setError("Username or Password is empty！");
            alert(error);
        } else {
            let res = await helper.helper.AsyncUserCreate(user)
            console.log(res)

            if (res.status == "success") {
                window.location.href = "/signin"
            } else {
                // localStorage.clear();
                alert("you input worng password or email");
                // window.location.href = "/";
            }
        }

    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Please Input Full User Name"
                                    autoFocus
                                    onChange={(event) => {
                                        setUname(event.target.value)
                                        // console.log(event.target.value)
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={(event) => { setUphone(event.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="location"
                                    label="Location"
                                    name="location"
                                    autoComplete="location"
                                    onChange={(event) => { setUlocation(event.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(event) => { setUpassword(event.target.value) }}

                                />
                            </Grid>

                            <Grid item xs={12}>


                                <Stack direction="row" spacing={1} alignItems="center">
                                    Gender:

                                    <Typography>Male</Typography>
                                    <AntSwitch defaultValue={false} inputProps={{ 'aria-label': 'ant design' }} onChange={handleGender} />
                                    <Typography>Female</Typography>

                                </Stack>

                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/SignIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}