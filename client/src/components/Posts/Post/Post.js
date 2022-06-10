import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar, CardHeader,IconButton } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
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

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

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
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };


  return (
    // <Card className={classes.card} raised elevation={6}>
      

    //     <CardMedia component={Link} to={`/posts/${post._id}`} className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
    //     <div className={classes.overlay}>
    //       <Typography variant="h6">{post.name}</Typography>
    //       <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    //     </div>

    //     {(user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
    //       <div className={classes.overlay2}>
    //         <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
    //       </div>
    //     )}
    //     <div className={classes.details}>
    //       <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
    //     </div>
    //     <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
    //     <CardContent>
    //       <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
    //     </CardContent>
      
    //     <CardActions className={classes.cardActions}>

    //       <Button
    //         size="small"
    //         color="primary"
    //         disabled={!user?.result}
    //         onClick={handleLike}>
    //         <Likes />
    //       </Button>

    //       {(user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
    //         <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
    //           <DeleteIcon fontSize="small" />
    //         </Button>
    //       )}

    //     </CardActions>
    // </Card>


    <Card className={classes.card} raised elevation={6}>
      <div>
        <CardHeader
          avatar={
            <Avatar className={classes.purple} alt={post.name} src={user?.result?.imageUrl}>{post?.name?.charAt(0)}</Avatar>
          }
          action={
            (user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <IconButton aria-label="edit post" onClick={() => setCurrentId(post._id)}>
              <MoreVertIcon />
              </IconButton>
            )
          }
          title={post.name}
          subheader={moment(post.createdAt).fromNow()}
        />
        <CardMedia
          component={Link}
          to={`/posts/${post._id}`}
          className={classes.media}
          image={`${post.selectedFile}?tr=w-800` || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={post.title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">{post.title}</Typography>
          {/* <div className={classes.message}> */}
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
          {/* </div> */}
          <Typography variant="caption" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </CardContent>
      </div>
      <CardActions  className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
          disabled={!user?.result}
          disableElevation
            onClick={handleLike}>
            <Likes />
        </Button>
        
        {(user?.result.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="secondary" disableElevation onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" />
            </Button>
        )}
        <Button
          component={Link}
          disableElevation
          to={`/posts/${post._id}`}
          size="small"
          color="primary">
          <Comment/>
        </Button>

        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}

      </CardActions>
    </Card>
  );
};

export default Post;
