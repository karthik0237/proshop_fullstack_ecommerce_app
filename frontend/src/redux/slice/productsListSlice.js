import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store.js";

// Action
export const getProducts = createAsyncThunk("getProducts", 
  async (keyword = '') => {
  const res = await axios.get(`http://127.0.1:8000/api/products${keyword}`);
  return res.data;
});

const productsListSlice = createSlice({
  name: "productsList",
  initialState: {
    isLoading: false,
    products: null,
    error: null,
    totalPages:1,
    page:1
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.page = action.payload.page
      state.totalPages = action.payload.totalPages
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const productsListReducer = productsListSlice.reducer



// topRated RATED PRODUCTS
export const topRatedProducts = createAsyncThunk("topRatedProducts", 
  async () => {
  const res = await axios.get(`http://127.0.1:8000/api/products/top/`);
  return res.data;
});

const productsTopRatedSlice = createSlice({
  name: "productsTopRated",
  initialState: {
    isLoading: false,
    products: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(topRatedProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(topRatedProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(topRatedProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const productsTopRatedReducer = productsTopRatedSlice.reducer