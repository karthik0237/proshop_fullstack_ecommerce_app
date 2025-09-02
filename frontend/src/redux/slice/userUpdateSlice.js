import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store from '../store'

export const updateUser = createAsyncThunk("updateUser", 
  async ({id,user},) => {
  const userLoginInfo = store.getState().userLogin.userInfo
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`
    },
  };

  const { data } = await axios.put(
    `http://127.0.0.1:8000/api/users/update/${id}/`,
    user,
    config
  );
  return data;
});

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: {
    isLoading: false,
    success:false,
    error: null,
  },
  reducers: {
    USER_UPDATE_RESET: (state,action) => {
        state.isLoading = false
        state.success = false
        state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { USER_UPDATE_RESET } = userUpdateSlice.actions
export default userUpdateSlice.reducer;
