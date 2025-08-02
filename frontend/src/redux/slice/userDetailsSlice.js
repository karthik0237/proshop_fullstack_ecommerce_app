import axios from "axios";
import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import store from "../store.js";



export const userProfile = createAsyncThunk("userProfile", async (id) => {
  // problem is here
  const userLoginInfo = store.getState().userLogin.userInfo;
  console.log("access token: ", userLoginInfo.access);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/users/${id}`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data.detail;
  }
});

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    isLoading: false,
    user: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;  
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userDetailsSlice.reducer;
