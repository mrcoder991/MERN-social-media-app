import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Card, CardActionArea } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

import placeholderImg from '../../images/PlaceholderImg.png'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const fileUploadRef = useRef();


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
      dispatch(createPost({ ...postData, name: user?.result?.name, creatorImg:user?.result.picture }, navigate));
      
      clear();
    } else {
      dispatch(updatePost(currentId,{ ...postData, name: user?.result?.name}));
      clear();
    }
  };

  
  //Function to convert file into base64 string
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  
  //Function to handle file read
  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setPostData({ ...postData, selectedFile: base64 })
  }

  if (!user?.result?.name) {
    return ( 
    <Paper className={classes.paper} elevation={2}>
      <Typography variant='h6' align='center' style={{padding:'0.5em'}}>
        Please Sign in to create new post and like other's posts.
      </Typography>
    </Paper >
    )
  }

  return (

    <Paper className={classes.paper} elevation={2}>
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
          <Card className={classes.fileInput}>
              <CardActionArea>
                <input
                hidden
                ref={fileUploadRef}
                id="originalFileName"
                type="file"
                accept='image/*'
                required
                label="Document"
                name="originalFileName"
                onChange={e => handleFileRead(e)}
              />
              <img
                onClick={() => fileUploadRef.current.click()}
                className={classes.selectedFile}
                alt="placeholder-img"
                src={postData?.selectedFile || placeholderImg }
              />
              </CardActionArea>
           </Card>
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
             label="Tags (Coma saperated)"
             fullWidth value={postData.tags}
             onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
           />
           
           <div className={classes.buttonGroup}>
             <div>
               <Button
                 variant="outlined"
                 color="secondary"
                 onClick={clear}
                 disableElevation
                >
                 Clear
               </Button>
             </div>
             <div>
               <Button
                 className={classes.buttonSubmit}
                 variant="contained"
                 color="primary"
                 type="submit"
                 disableElevation>
                 Post
               </Button>
             </div>
           </div>
         </form>
       {/* </Paper> */}
       </AccordionDetails>
      </Accordion>
    </Paper>

  );
};

export default Form;
