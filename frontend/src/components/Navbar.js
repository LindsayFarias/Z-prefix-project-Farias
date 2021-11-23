import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { ThemeProvider } from '@mui/material/styles';


const Navbar = () => {
    const { cookies, darkTheme, removeCookie } = useContext(AppContext);
    
    let links;
    links = cookies.username ?
        <AppBar position="static" color='primary'>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <Link to={'/bloggeropolis/login'}><Button onClick={ () => removeCookie('username', {path: '/'})} color='secondary'>Login</Button></Link>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="homepage" sx={{ mr: 2 }}>
                    <Link to={`/bloggeropolis`}><Button color='secondary'>Blog Feed</Button></Link>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="homepage" sx={{ mr: 2 }}>
                    <Link to={`/bloggeropolis/${cookies.username}`}><Button color='secondary'>Homepage</Button></Link>
                </IconButton>
            </Toolbar>
        </AppBar>
    :   <AppBar position="static" color='primary'>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <Link to={'/bloggeropolis/login'}><Button color='secondary'>Login</Button></Link>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="homepage" sx={{ mr: 2 }}>
                    <Link to={`/bloggeropolis`}><Button color='secondary'>Blog Feed</Button></Link>
                </IconButton>
            </Toolbar>
        </AppBar>

    return(
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>
                {links}
            </ThemeProvider>
        </React.Fragment>
    );
};

export default Navbar;