import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Grid, Divider, Container, Button, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const BlogFeedPage = ({ getBlogs, blogs }) => {
    const { style3 } = useContext(AppContext);

    useEffect(() => {
        getBlogs('blogs');
    }, []);

    console.log(blogs);

    let blogFeed;
    blogFeed = blogs !== null && blogs.length > 0 ?
        blogs.map(blog => {
            return(
            <Grid item>
                <Box style={style3}>
                    <h2>{blog.title}</h2>
                    <Divider />
                    <h3>{blog.shortened_content.length < 100 ? blog.shortened_content : blog.shortened_content.concat(`...`)}</h3>
                    <Divider />
                    <h5>{blog.created_at}</h5>
                    <Link to={`/bloggeropolis/single/${blog.id}`}><Button color='secondary' variant='outlined'>View</Button></Link>
                </Box>
            </Grid>
            )
        })
    : <h1>No Blogs to Show</h1>;

    return (
        <Container style={{textAlign: 'center'}} maxWidth='xlg'>
            <h1>Blogger-opolis Blog Feed</h1>
            <Grid container style={{margin: '2%'}} alignItems="center" justifyContent="center" spacing={4}>
                {blogFeed}
            </Grid>
        </Container>
    );
}

export default BlogFeedPage;