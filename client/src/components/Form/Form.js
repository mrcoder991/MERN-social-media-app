import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));


  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      
      clear();
    } else {
      dispatch(updatePost(currentId,{ ...postData, name: user?.result?.name}));
      clear();
    }
  };

  if (!user?.result?.name) {
    return ( 
    <Paper className={classes.paper} elevation={6}>
      <Typography variant='h6' align='center' style={{padding:'0.5em'}}>
        Please Sign in to create new post and like other's posts.
      </Typography>
    </Paper >
    )
  }

  return (

    <Paper  className={classes.paper} elevation={6}>
      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{currentId ? `Editing "${post.title}"` : 'Create a Notion'}</Typography>
      </AccordionSummary>
      <AccordionDetails>
       {/* <Paper className={classes.paper}> */}
         <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
           <TextField
             name="title"
             variant="outlined"
             label="Title"
             fullWidth
             value={postData.title}
             onChange={(e) => setPostData({ ...postData, title: e.target.value })}
           />
           <TextField
             name="message"
             variant="outlined"
             label="Message"
             fullWidth
             multiline
             minRows={4}
             value={postData.message}
             onChange={(e) => setPostData({ ...postData, message: e.target.value })}
           />
           <TextField
             name="tags"
             variant="outlined"
             label="Tags (coma separated)"
             fullWidth value={postData.tags}
             onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
           />
           <div
             className={classes.fileInput}>
             <FileBase
               type="file"
               inputProps={{accept : "image/*"}}
               multiple={false}
               onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
             />
           </div>
           <Button
             className={classes.buttonSubmit}
             variant="contained"
             color="primary"
             size="large"
             type="submit"
             fullWidth>
             Submit
           </Button>
           <Button
             variant="contained"
             color="secondary"
             size="small"
             onClick={clear}
             fullWidth>
             Clear
           </Button>
         </form>
       {/* </Paper> */}
      </AccordionDetails>
        </Accordion>
    </Paper>

  );
};

export default Form;
