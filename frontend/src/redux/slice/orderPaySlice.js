import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import axios from "axios";
import { useDispatch } from "react-redux";

export const orderPayUpdate = createAsyncThunk("orderPayUpdate", 
    async ({orderId,paymentResult}) => {
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  const {data} = await axios.put(
    `http://127.0.0.1:8000/api/orders/${orderId}/pay`,paymentResult,
    config
  );
  return data

});




const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: {
    isLoading: false,
    success: false,
    error:null
  },

  reducers: {
    ORDER_PAY_RESET: (state,action) => {
      state.isLoading = false
      state.error=null
      state.success=false
  }},
  extraReducers: (builder) => {
    builder.addCase(orderPayUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(orderPayUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(orderPayUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
      state.success = false
    });
  },
});

export const {ORDER_PAY_RESET}  = orderPaySlice.actions
export default orderPaySlice.reducer;
