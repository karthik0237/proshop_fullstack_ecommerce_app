import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store from '../store'

export const profileUpdate = createAsyncThunk("profileUpdate", 
  async (user,{dispatch}) => {
  const userLoginInfo = store.getState().userLogin.userInfo
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`
    },
  };

  const { data } = await axios.put(
    "http://127.0.0.1:8000/api/users/profile/update/",
    user,
    config
  );
 dispatch({
  type:'loginUser/fulfilled',
  payload:data
 })
  dispatch({
  type:'userProfile/fulfilled',
  payload:data
 })
  return data;
});

const userProfileUpdateSlice = createSlice({
  name: "userProfileUpdate",
  initialState: {
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(profileUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});


export default userProfileUpdateSlice.reducer;
