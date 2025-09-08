import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import axios from "axios";


export const getMyOrdersList = createAsyncThunk("getMyOrdersList", 
    async () => {
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  const {data} = await axios.get(
    `http://127.0.0.1:8000/api/orders/myorders/`,
    config
  );
  return data

});




const ordersMyListSlice = createSlice({
  name: "ordersMyList",
  initialState: {
    isLoading: false,
    orders: [],
    error:null
  },

  reducers: {
    ORDERS_MY_LIST_RESET: (state,action) => {
      state.isLoading = false
      state.orders = []
      state.error = null
    }
    },
  extraReducers: (builder) => {
    builder.addCase(getMyOrdersList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMyOrdersList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getMyOrdersList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    });
  },
});

export const { ORDERS_MY_LIST_RESET }  = ordersMyListSlice.actions
export default ordersMyListSlice.reducer;
