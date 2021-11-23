import { Grid, Box, Typography, Modal, Button, TextField, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';

const CreateBlogButton = ({ openModal, closeModal, open, id, render, reRender }) => {
    const { style2, post } = useContext(AppContext);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    
    const submitPost = () => {
        const input = {
            title: title,
            content: content
        };
        post(`blogs/${id}`, input);
        setTitle(null);
        setContent(null);
        reRender(render = 1);
        closeModal();
    }

    return(
        <Grid item xs={10}>
        <Button variant='outlined' color='secondary' onClick={openModal}>Create Post</Button>
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Write a New Blog Post
            </Typography>
            <form id="modal-modal-description">
              <Typography sx={{p: 1}}>Title:
                <TextField sx={{mx: 2}} required id="title" variant="outlined" label='title' onChange={(event) => setTitle(event.target.value)}/> 
              </Typography>
              <Typography sx={{p: 1}}>Content:
                <FormControl sx={{ m: 1, width: '100ch' }} variant="outlined">
                  <InputLabel htmlFor="content">Content</InputLabel> 
                    <OutlinedInput id="content" label="content" multiline={true}
                    onChange={(event) => setContent(event.target.value)}/>
                </FormControl>
              </Typography>
              <Button onClick={()=> submitPost()} style={{float: 'right'}}variant='outlined'>Create</Button>
            </form>
          </Box>
        </Modal>
      </Grid>
    )
};

export default CreateBlogButton;