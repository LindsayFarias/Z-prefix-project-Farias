import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Container, Divider, Switch, FormControlLabel, Button, TextField, FormControl, InputLabel, OutlinedInput } from '@mui/material';

const SinglePostPage1 = ({getBlog, blog, setBlogs}) => {
    const params = useParams();
    const id = params.postId;
    const navigate = useNavigate();
    const { cookies, style4, deletion, patch } = useContext(AppContext);
    const [toggle, setToggle] = useState(false)
    const [changedTitle, setTitle] = useState(null);
    const [changedContent, setContent] = useState(null);
    const [render, setRender] = useState(null);

    useEffect(() => {
        getBlog(id);
    }, [])

    useEffect(() => {
        if(blog !== null && toggle){
            setContent(blog.content)
            setTitle(blog.title);
        }
        if(blog !== null && !toggle){
            setContent(null)
            setTitle(null);
        }
        console.log(changedTitle);
        console.log(changedContent);
    }, [toggle])

    useEffect(() => {
        getBlog(id);
        setBlogs(cookies.username);
    }, [render])

    const handleToggle = () => {
        setToggle(!toggle)
    }

    //submit a delete request to delete the selected blog
    const handleDeletion = () => {
        deletion(`blogs/${id}`);
        setRender(render + 1);
        navigate(`/bloggeropolis/${cookies.username}`);
    };

    //submit a patch request with the edits
    const handleUpdate = () => {
        const input = {
            title: changedTitle,
            content: changedContent
        };
        patch(`blogs/${id}`, input)
        setRender(render + 1);
    }

    //conditional rendering for whether or not the toggle is on
    let title;
    title = !toggle && blog !== null ? 
        <Typography variant='h2' gutterBottom>{blog.title}</Typography>
    :   <FormControl sx={{ m: 1, width: '50ch' }} color='secondary' variant="outlined">
            <InputLabel htmlFor="title">Title</InputLabel> 
            <OutlinedInput value={changedTitle} id="title" label="title"
                onChange={(event) => setTitle(event.target.value)}/>
        </FormControl>

    //defaultValue for title is not working for some reason, I'm not sure why??

    let content;
    content = !toggle && blog !== null ?
        <Typography variant='body1' mt={10} mb={10} gutterBottom>{blog.content}</Typography>
    :   <FormControl sx={{ m: 1, width: '90ch' }} color="secondary" variant="outlined">
            <InputLabel htmlFor="content">Content</InputLabel> 
            <OutlinedInput id="content" label="content" multiline={true} defaultValue={changedContent}
                onChange={(event) => setContent(event.target.value)}/>
        </FormControl>

    let buttons;
    buttons = !toggle ?
        <div>
            <FormControlLabel value={toggle} label='Edit' labelPlacement='right' onChange={() => handleToggle()}
                control={<Switch color='secondary' />}
            />
            <Button onClick={ () => handleDeletion()} variant='outlined' color='secondary'>Delete</Button>
        </div>
    :   <div>
            <FormControlLabel value={toggle} label='Edit' labelPlacement='right' onChange={() => handleToggle()}
                control={<Switch color='secondary' />}
            />
            <Button onClick={ () => handleUpdate()} variant='outlined' color='secondary'>Save Changes?</Button>
        </div>

    //rendering of the blog's contents
    let blogData;
    blogData = cookies.username && blog !== null ?
        <Grid item>
            <Box justifyContent='center' style={style4}>
                {title}
                <Divider flexItem>
                    Content
                </Divider>
                {content}
                <Divider/>
                <Typography variant='caption' gutterBottom>Date Created: {blog.created_at}</Typography> <br/>
                {buttons}
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