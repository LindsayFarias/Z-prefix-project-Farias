import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Container, Divider, Switch, FormControlLabel, Button } from '@mui/material';

const SinglePostPage1 = ({getBlog, blog, setBlogs}) => {
    const params = useParams();
    const id = params.postId;
    const navigate = useNavigate();
    const { cookies, style4, deletion } = useContext(AppContext);

    useEffect(() => {
        getBlog(id);
    }, [])

    const handleDeletion = () => {
        deletion(`blogs/${id}`);
        setBlogs(cookies.username)
        navigate(`/bloggeropolis/${cookies.username}`)
    };
    console.log(blog)
    let blogData;
    blogData = cookies.username && blog !== null ?
        <Grid item>
            <Box justifyContent='center' style={style4}>
                <Typography variant='h2' gutterBottom>{blog.title}</Typography>
                <Divider flexItem>
                    Content
                </Divider>
                <Typography variant='body1' mt={10} mb={10} gutterBottom>{blog.content}</Typography>
                <Divider/>
                <Typography variant='caption' gutterBottom>Date Created: {blog.created_at}</Typography> <br/>
                <FormControlLabel value='edit' label='Edit' labelPlacement='right'
                    control={<Switch color='secondary' />}
                />
                <Button onClick={ () => handleDeletion()} variant='outlined' color='secondary'>Delete</Button>
            </Box>
        </Grid>
    : <h1>Loading</h1>

    return(
        <Container maxWidth='xlg'>
            <Grid container>
                {blogData}
            </Grid>
        </Container>
    );
}

export default SinglePostPage1;