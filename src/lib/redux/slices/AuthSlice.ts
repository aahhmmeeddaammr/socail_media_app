import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next/client";

const initialState: AuthSlice = { token: null, user: null };
export const getProfile = createAsyncThunk("authSlice/getProfile", async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/profile-data`, {
      headers: {
        token: getCookie("token") || "",
      },
    })
    .then(({ data }) => data);
});
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUserData: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, () => {});
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(getProfile.rejected, () => {});
  },
});

export const authReducer = authSlice.reducer;

export const { clearUserData, setToken } = authSlice.actions;
