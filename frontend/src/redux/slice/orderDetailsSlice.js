import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import axios from "axios";
import { useDispatch } from "react-redux";

export const getOrderDetails = createAsyncThunk("getOrderDetails", 
    async (order) => {
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  const {data} = await axios.get(
    `http://127.0.0.1:8000/api/orders/${order}/`,
    config
  );
  return data

});




const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    isLoading: true,
    order: [],
    shippingAddress:{},
    success: false,
    error:null
  },

  reducers: {
    ORDER_DETAILS_RESET: (state,action) => {
      state.isLoading = false
      state.error=null
      state.success=false
      state.order = []
  }},
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.order = action.payload;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
      state.success = false
    });
  },
});

export const {ORDER_DETAILS_RESET}  = orderDetailsSlice.actions
export default orderDetailsSlice.reducer;
