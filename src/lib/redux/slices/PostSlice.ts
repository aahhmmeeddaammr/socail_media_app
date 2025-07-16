import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next/client";

const initialState: PostsSlice = { posts: null, isLoading: false };

export const getAllPosts = createAsyncThunk("postsSlice/getAllPosts", async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?limit=50`, {
      headers: {
        token: getCookie("token") || "",
      },
    })
    .then(({ data }) => data);
});

export const getAllSinglePost = createAsyncThunk("postsSlice/getAllSinglePost", async (id: string) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
      headers: {
        token: getCookie("token") || "",
      },
    })
    .then(({ data }) => data);
});
export const getAllUserPosts = createAsyncThunk("postsSlice/getAllUserPosts", async (id: string) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}/posts?limit=20`, {
      headers: {
        token: getCookie("token") || "",
      },
    })
    .then(({ data }) => data);
});

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.isLoading = false;
    });
    builder.addCase(getAllSinglePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSinglePost.fulfilled, (state, action) => {
      state.posts = [action.payload.post];
      state.isLoading = false;
    });
    builder.addCase(getAllUserPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUserPosts.fulfilled, (state, action) => {
      console.log({ action });

      state.posts = action.payload.posts;
      state.isLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const {} = postsSlice.actions;
