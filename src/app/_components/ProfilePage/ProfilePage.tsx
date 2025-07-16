"use client";
import { getAllUserPosts } from "@/lib/redux/slices/PostSlice";
import { store } from "@/lib/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { Box, CircularProgress, Fade, Stack, Typography } from "@mui/material";
import CreatePost from "../CreatePost/CreatePost";
import UpdateProfileCard from "../UpdateProfileCard/UpdateProfileCard";

const ProfilePage = () => {
  const {
    authReducer: { user },
    postsReducer: { posts, isLoading },
  } = useSelector((store: { authReducer: AuthSlice; postsReducer: PostsSlice }) => store);

  const dispatch = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    if (user) {
      dispatch(getAllUserPosts(user?._id));
    }
  }, [user]);
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
  return (
    <Stack spacing={2}>
      <UpdateProfileCard />
      <CreatePost />
      {posts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </Stack>
  );
};

export default ProfilePage;
