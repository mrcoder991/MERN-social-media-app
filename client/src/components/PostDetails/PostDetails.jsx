import React, { useEffect } from "react";
import {Paper,Typography,CircularProgress,Divider,Grid,} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";

import CommentSection from "./CommentSection";
import useStyles from "./styles";
import Post from "../Posts/Post/Post";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (!post) return null;

  // const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={2} className={classes.loadingPaper}>
        <CircularProgress size="5em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <>
    <Paper style={{ padding: "20px", borderRadius: "15px", margin:'100px 0 12px'}} elevation={2}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography gutterBottom variant="h6" component="h2"><strong>{post.title}</strong></Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">{post.message}</Typography>
          <Typography gutterBottom variant="caption" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="subtitle1"><strong>Created by:</strong> {post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          
          <CommentSection post={post} />
          
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              `${post.selectedFile}?tr=w-1000` ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
    </Paper>
    {!!recommendedPosts.length && (
      <div className={classes.section}>
        <Typography gutterBottom variant="h5">
          You might also like:
        </Typography>
        <Divider />
        <div className={classes.recommendedPosts}>
          <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {recommendedPosts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={3}>
              <Post post={post} />
            </Grid>
          ))}
          </Grid>
        </div>
      </div>
  )
  }
  </>
  );
};

export default PostDetails;
