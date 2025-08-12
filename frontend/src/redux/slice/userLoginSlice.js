import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  "loginUser",
  async ({email, password}) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/login/",
      { username: email, password: password },
      config
    );
    return data;
  }
);

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    isLoading: false,
    userInfo: userInfoFromStorage, // whenever pageRefresh/AppRestart happens the store is relinitialized with initial state values
    error: null,
  },
  reducers: {
    USER_LOGOUT: (state,action) => {
      localStorage.removeItem('userInfo')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = "Invalid user credentials";
    });
  },
});

export const { USER_LOGOUT } = userLoginSlice.actions;

export default userLoginSlice.reducer;
