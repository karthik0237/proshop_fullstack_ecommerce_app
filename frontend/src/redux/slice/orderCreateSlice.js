import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import axios from "axios";
import { useDispatch } from "react-redux";

export const createOrder = createAsyncThunk("createOrder", 
    async (order) => {
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  const {data} = await axios.post(
    "http://127.0.0.1:8000/api/orders/add/",
    order,
    config
  );
  return data

});




const orderCreateSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    order: {},
    success: false,
    error:null
  },

  reducers: {
    ORDER_RESET: (state,action) => {
      state.isLoading = false
      state.error=null
      state.success=false
      state.order = {}
  }},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.order = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
      state.success = false
    });
  },
});

export const {ORDER_RESET}  = orderCreateSlice.actions
export default orderCreateSlice.reducer;
