import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { Grid, Box, Typography, Container, Divider, Switch, FormControlLabel, Button } from '@mui/material';

const SinglePostPage1 = ({getBlog, blog}) => {
    const params = useParams();
    const id = params.postId;
    const { cookies, style4 } = useContext(AppContext);

    useEffect(() => {
        getBlog(id);
    }, [])


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
                <Button variant='outlined' color='secondary'>Delete</Button>
            </Box>
        </Grid>
    :  blog !== null ?
        <Grid item>
            <Box style={style4}>
                <Typography variant='h2' gutterBottom>{blog.title}</Typography>
                <Divider />
                <Typography variant='body1' mt={10} mb={10} gutterBottom>{blog.content}</Typography>
                <Divider />
                <Typography variant='caption' gutterBottom>Date Created: {blog.created_at}</Typography>
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