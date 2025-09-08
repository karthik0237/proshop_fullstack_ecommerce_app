import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import axios from "axios";
import { useDispatch } from "react-redux";


// CREATE ORDER(ALL USERS)
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
  name: "orderCreate",
  initialState: {
    isLoading: false,
    order: {},
    success: false,
    error:null
  },

  reducers: {
    ORDER_CREATE_RESET: (state,action) => {

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

export const { ORDER_CREATE_RESET }  = orderCreateSlice.actions
export const orderCreateReducer =  orderCreateSlice.reducer;





// LIST ALL ORDERS (ADMIN USER)
export const listOrders = createAsyncThunk("listOrders", 
  async () => {
      const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };
  const {data} = await axios.get("http://127.0.1:8000/api/orders",config);
  return data
});

const ordersListSlice = createSlice({
  name: "ordersList",
  initialState: {
    isLoading: false,
    orders:null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(listOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(listOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(listOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const ordersListReducer = ordersListSlice.reducer;




// UPDATE ORDER TO PAID
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

export const { ORDER_PAY_RESET }  = orderPaySlice.actions
export const orderPayReducer = orderPaySlice.reducer;





// UPDATE ORDER TO DELIVERED
export const orderDeliveryUpdate = createAsyncThunk("orderDeliveryUpdate", 
    async ({orderId,deliveryResult}) => {
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  const {data} = await axios.put(
    `http://127.0.0.1:8000/api/orders/${orderId}/deliver/`,deliveryResult,
    config
  );
  return data

});


const orderDeliverySlice = createSlice({
  name: "orderDelivery",
  initialState: {
    isLoading: false,
    success: false,
    error:null
  },

  reducers: {
    ORDER_DELIVERY_RESET: (state,action) => {
      state.isLoading = false
      state.error=null
      state.success=false
  }},
  extraReducers: (builder) => {
    builder.addCase(orderDeliveryUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(orderDeliveryUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(orderDeliveryUpdate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
      state.success = false
    });
  },
});

export const { ORDER_DELIVERY_RESET }  = orderDeliverySlice.actions
export const orderDeliveryReducer = orderDeliverySlice.reducer;
