import axios from "axios";
import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import store from "../store.js";



export const deleteUser = createAsyncThunk("deleteUser",
    async (id) => {
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  try {
    const { data } = await axios.delete(
      `http://127.0.0.1:8000/api/users/delete/${id}/`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;  
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userDeleteSlice.reducer;
