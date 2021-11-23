import { Paper, Box, TextField, Grid, Typography, Button, Alert } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({getBlogs}) => {
    const { style1, setCookie, post } = useContext(AppContext);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState({error: false, type: null})
    let navigate = useNavigate();

    useEffect(() => {
        setErrorMessage({error: false, type: null});
    }, [])

    useEffect(() => {
        console.log(name);
        console.log(password);
    }, [name, password, errorMessage]);

    //make a post request to backend for account creation, return error if username not available
    const handleLogin = async () => {

        let input = {
            username: name,
            password: password
        };

        let response = await post('login', input);

        if(!response.ok) {
            setErrorMessage({error: true, type: 'Incorrect Credentials Entered!'});
            setName(null);
            setPassword(null);
            
        } else {
            setCookie('username', name, {path: '/'});
            getBlogs(`${name}`);
            navigate(`/bloggeropolis/${name}`);
            setName(null);
            setPassword(null);
        };

    };
    
    //make a post request to backend for account creation, return error if username not available
    const handleAccount = async () => {
        let input = {
            username: name,
            password: password
        };
        let response = await post('create', input);

        if(!response.ok) {
            setErrorMessage({error: true, type: 'Username Already in Use!'});
            setName(null);
            setPassword(null);
        } else {
            setCookie('username', name, {path: '/'});
            getBlogs(`${name}`);
            navigate(`/bloggeropolis/${name}`);
            setName(null);
            setPassword(null);
        };

    };

    //show error message if an unsuccessful attempt was made
    let error;
    error = !errorMessage.error ? <h1>Blogger-lopolis Login</h1> : <Alert severity="error">{errorMessage.type}</Alert>

    return(
        <Paper elevation={3}>
            <Box
              component="form"
              sx={style1}
              noValidate
              autoComplete="off">
                {error} <br/>
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
                        onChange={(event) => setName(event.target.value)}
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
                        onChange={(event) => setPassword(event.target.value)}
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