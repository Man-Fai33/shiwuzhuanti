import React, { useState } from 'react';
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
import helper from '../Helper/helper';

const theme = createTheme();


export default function SignIn() {
    if (localStorage.getItem('user') !== null) { window.location.href = "/index" }
    const [error, setError] = useState("");
  
 

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (!data.get('email').match("@")) {
            alert("Please Input correct Mail form  " + "\n" + " XXX@xxx.com");
        }
        if (data.get('email') === "" || data.get('password') === "") {
            setError("Username or Password is empty！");
            alert(error);
        } else {
            let res = await helper.helper.AsyncUserByEmailPass(data.get('email'), data.get('password'))

            if (res.status === "success") {


                localStorage.setItem('user', JSON.stringify(res.user));
                // console.log(localStorage.getItem('user'))
                // console.log(localStorage.getItem('user'));
                // 1. "Visitor"
                // 2. "User"
                // 3. "Manager"
                // 4. "Administrator"
                if (res.user.role === "admin") {
                    alert("Welcome Administrator")
                    window.location.href = "/index"
                } else if ("manager" === res.user.role) {
                    alert("Welcome Manager")
                    window.location.href = "/index"
                } else if ("user" === res.user.role) {
                    alert("Welcome user")
                    window.location.href = "/index"
                }


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
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
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
                                />
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
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/Signup" variant="body2">
                                    Not have the account? Please sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}