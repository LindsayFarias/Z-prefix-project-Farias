import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams, Link } from 'react-router-dom';
import { Grid, Box, Typography, Container, Divider, Button } from '@mui/material';

const SinglePostPage2 = ({getBlog, blog}) => {
    const params = useParams();
    const id = params.postId;
    const { style4 } = useContext(AppContext);

    useEffect(() => {
        getBlog(id);
    }, [])


    let blogData;
    blogData = blog !== null ?
        <Grid item>
            <Box style={style4}>
                <Typography variant='h2' gutterBottom>{blog.title}</Typography>
                <Divider />
                <Typography variant='body1' mt={10} mb={10} gutterBottom>{blog.content}</Typography>
                <Divider />
                <Typography variant='caption' gutterBottom>Date Created: {blog.created_at}</Typography> <br/>
                <Link to='/bloggeropolis'><Button variant='outlined' color='secondary'>Back</Button></Link>
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

export default SinglePostPage2;