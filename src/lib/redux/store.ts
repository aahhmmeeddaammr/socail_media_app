import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { postsReducer } from "./slices/PostSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
});
