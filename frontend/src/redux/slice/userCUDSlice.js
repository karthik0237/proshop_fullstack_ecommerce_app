import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import store from '../store'


// UPDATE PROFILE(USER)
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
export const userProfileUpdateReducer = userProfileUpdateSlice.reducer;



// UPDATE USER(ADMIN)
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
export const userUpdateReducer = userUpdateSlice.reducer



// DELETE USER(ADMIN)
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

export const userDeleteReducer = userDeleteSlice.reducer

