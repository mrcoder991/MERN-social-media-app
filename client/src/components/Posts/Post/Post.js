import React, { useState } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, Avatar, CardHeader, IconButton, MenuItem, Menu } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Comment from '@material-ui/icons/Comment';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const userId = user?.result.sub || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    window.scroll(0, 0);
    setCurrentId(post._id)
    handleClose();
  }

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };


  return (
    <Card className={classes.card} raised elevation={2}>
      
        <div>
          <CardHeader
            avatar={
              <Avatar className={classes.purple} alt={post.name} src={post?.creatorImg}>{post?.name?.charAt(0)}</Avatar>
            }
            action={
              (user?.result.sub === post?.creator || user?.result?._id === post?.creator) && (
                <div>
                  <IconButton aria-label="edit post" onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={handleEdit}>Edit Notion</MenuItem>
                    <MenuItem onClick={() => dispatch(deletePost(post._id))}>Delete Notion</MenuItem>
                  </Menu>
                </div>
              )
            }
            title={post.name}
            subheader={moment(post.createdAt).fromNow()}
        />
        <CardActionArea>
          <Link to={`/posts/${post._id}`}>
            <CardMedia
              component='img'
              loading='Lazy'
              src={`${post.selectedFile}?tr=w-800,h-800` || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
              className={classes.media}
              title={post.title}
            />
          </Link>
          </CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">{post.title}</Typography>
            {/* <div className={classes.message}> */}
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            {/* </div> */}
            <Typography variant="caption" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </CardContent>
        </div>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            disableElevation
            onClick={handleLike}>
            <Likes />
          </Button>
          <Button
            component={Link}
            disableElevation
            to={`/posts/${post._id}`}
            size="small"
            color="primary">
            <Comment />
          </Button>
        </CardActions>
    </Card>
  );
};

export default Post;
