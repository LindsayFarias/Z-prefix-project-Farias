import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams, Link } from 'react-router-dom';
import { Container, Box, Grid, Divider, Button, Typography } from '@mui/material';
import CreateBlogButton from '../CreateBlogButton';

const Homepage = ({ getBlogs, blogs }) => {
    const { cookies, style3 } = useContext(AppContext);
    const params = useParams();
    const username = params.username;

    //making create posts a modal, setting up for proper opening and closing
    //send it down to modal child component
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    //for Rerendering after post submission
    const [render, setRender] = useState(0);

    //grab blog posts for user using the username from params
    useEffect(() => {
        getBlogs(username)
    }, []);

    useEffect(() => {
        getBlogs(username)
    }, [render]);

    //need userId for posts
    let userId;
    userId = blogs !== null ?
        blogs[0].bloggerId
    :   null;

    console.log(blogs)
    //conditional rendering for blog posts, a new user will not have any posts
    let blogFeed;
    blogFeed = blogs !== null && blogs[1].length > 0 ?
        blogs[1].map(blog => {
            return(
                <Grid key={blog.id} item >
                    <Box style={style3}>
                        <h2>{blog.title}</h2>
                        <Divider />
                        <h3>{blog.shortened_content.length < 100 ? blog.shortened_content : blog.shortened_content.concat(`...`)}</h3>
                        <Divider />
                        <h5>{blog.created_at}</h5>
                        <Link to={`/bloggeropolis/${username}/${blog.id}`}><Button variant='outlined' color="secondary">View/Edit</Button></Link>
                    </Box>
                </Grid>
            )
        })
    : <h1>No Blogs to Show</h1>;

    return(
        <Container maxWidth="xlg">
            <Typography variant='h3' align='left' xs={{fontStyle: '-apple-system'}}>Hello {cookies.username}</Typography>
            <Box display='flex' style={{margin: '4%'}}>
                <Grid container style={{width: '90%'}} alignItems="center" justifyContent="center" spacing={4}>
                    {blogFeed}
                </Grid>
                <Grid container maxWidth='xlg' style={{width: '3%'}}> </Grid>
                <Grid container maxWidth='xlg' style={{width: '4%'}}>
                    <Grid item xs={12}>
                        <CreateBlogButton setBlogs={getBlogs} render={render} reRender={setRender} closeModal={closeModal} openModal={openModal} open={open} id={userId} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Homepage;