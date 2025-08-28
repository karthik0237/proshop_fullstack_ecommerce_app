import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import axios from "axios";


export const getordersList = createAsyncThunk("getordersList", 
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




const ordersListSlice = createSlice({
  name: "ordersList",
  initialState: {
    isLoading: false,
    orders: [],
    error:null
  },

  reducers: {
    ORDERS_LIST_RESET: (state,action) => {
      state.isLoading = false
      state.orders = []
      state.error = null
    }
    },
  extraReducers: (builder) => {
    builder.addCase(getordersList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getordersList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getordersList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    });
  },
});

export const { ORDERS_LIST_RESET }  = ordersListSlice.actions
export default ordersListSlice.reducer;
