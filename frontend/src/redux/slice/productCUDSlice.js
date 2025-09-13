import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store.js";


// DELETE PRODUCT
export const deleteProduct = createAsyncThunk("deleteProduct",
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
      `http://127.0.0.1:8000/api/products/delete/${id}/`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;  
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const productDeleteReducer = productDeleteSlice.reducer;


// CREATE PRODUCT
export const createProduct = createAsyncThunk("createProduct",
    async (id) => {
  const userLoginInfo = store.getState().userLogin.userInfo;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`,
    },
  };

  try {
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/products/create/`,
      {},
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: {
    isLoading: false,
    success: false,
    product:{},
    error: null,
  },
  reducers: {
    PRODUCT_CREATE_RESET: (state, action) => {
    state.isLoading= false
    state.success= false
    state.product={}
    state.error=null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;  
      state.product = action.payload
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export const { PRODUCT_CREATE_RESET } = productCreateSlice.actions
export const productCreateReducer = productCreateSlice.reducer;


// UPDATE PRODUCT
export const updateProduct = createAsyncThunk("updateProduct", 
  async ({id,product}) => {
  const userLoginInfo = store.getState().userLogin.userInfo
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`
    },
  };

  const { data } = await axios.put(
    `http://127.0.0.1:8000/api/products/update/${id}/`,
    product,
    config
  );
  return data;
});

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {
    isLoading: false,
    success:false,
    error: null,
  },
  reducers: {
    PRODUCT_UPDATE_RESET: (state,action) => {
        state.isLoading = false
        state.success = false
        state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { PRODUCT_UPDATE_RESET } = productUpdateSlice.actions
export const productUpdateReducer = productUpdateSlice.reducer;


// CREATE PRODUCT REVIEW
export const productCreateReview = createAsyncThunk("productCreateReview", 
  async ({productId,review}) => {
  const userLoginInfo = store.getState().userLogin.userInfo
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userLoginInfo.access}`
    },
  };

  const { data } = await axios.post(
    `http://127.0.0.1:8000/api/products/${productId}/reviews/`,
    review,
    config
  );
  return data;
});

const productReviewCreateSlice = createSlice({
  name: "productReviewCreate",
  initialState: {
    isLoading: false,
    success:false,
    error: null,
  },
  reducers: {
    PRODUCT_REVIEW_CREATE_RESET: (state,action) => {
        state.isLoading = false
        state.success = false
        state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(productCreateReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(productCreateReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(productCreateReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    });
  },
});

export const { PRODUCT_REVIEW_CREATE_RESET } = productReviewCreateSlice.actions
export const productReviewCreateReducer = productReviewCreateSlice.reducer;
