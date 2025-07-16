"use client";
import { getAllSinglePost } from "@/lib/redux/slices/PostSlice";
import { store } from "@/lib/redux/store";
import { Box, CircularProgress, Container, Fade, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";

const SinglePostPage = ({ id }: { id: string }) => {
  const { isLoading, posts } = useSelector((store: { postsReducer: PostsSlice }) => store.postsReducer);
  const dispatcher = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    dispatcher(getAllSinglePost(id));
  }, []);
  if (isLoading) {
    return (
      <Fade in timeout={700}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="background.default"
          color="text.primary"
        >
          {/* Logo or Brand */}
          <Typography variant="h4" fontWeight="bold" mb={2}>
            🚀 Social Platform
          </Typography>

          {/* Loading Spinner */}
          <CircularProgress color="primary" size={60} thickness={4} />

          {/* Loading Text */}
          <Typography variant="subtitle1" mt={2}>
            Loading, please wait...
          </Typography>
        </Box>
      </Fade>
    );
  }
  if (posts) console.log(posts);

  return (
    posts && (
      <Container sx={{ marginTop: 4 }}>
        {" "}
        <Post post={posts[0]} sc={true}/>
      </Container>
    )
  );
};

export default SinglePostPage;
