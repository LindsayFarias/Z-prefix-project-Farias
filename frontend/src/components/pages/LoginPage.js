import { Paper, Box, TextField, Grid, Typography, Button } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { style1, setCookie, removeCookie, post, cookies } = useContext(AppContext);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        console.log(name);
        console.log(password);
    }, [name, password]);

    const handleName = (event) => {
        let nameInput = event.target.value;
        setName(nameInput);
    };

    const handlePassword = (event) => {
        let passwordInput = event.target.value;
        setPassword(passwordInput);
    };

    const handleLogin = () => {
        let input = {
            username: name,
            password: password
        };
        post('login', input);
        setCookie('username', name, {path: '/'});
        navigate(`/bloggeropolis/${name}`)
        setName(null);
        setPassword(null);
    };
    
    const handleAccount = () => {
        let input = {
            username: name,
            password: password
        };
        post('create', input);
        setCookie('username', name, {path: '/'})
        navigate(`/bloggeropolis/${name}`)
        setName(null);
        setPassword(null);
    };

    return(
        <Paper elevation={3}>
            <Box
              component="form"
              sx={style1}
              noValidate
              autoComplete="off">
                  <h1>Blogger-lopolis Login</h1> <br/>
                <Grid container spacing={3} maxWidth='lg'>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <Typography>Username:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        required
                        value={name}
                        id='username'
                        label='Username'
                        onChange={(event) => handleName(event)}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <Typography>Password:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        required
                        value={password}
                        id='password'
                        label='password'
                        type='password'
                        onChange={(event) => handlePassword(event)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button color='secondary' variant='outlined' onClick={() => handleLogin()}>Login</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button color='secondary' variant='outlined' onClick={() => handleAccount()}>Create Account</Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

export default LoginPage;