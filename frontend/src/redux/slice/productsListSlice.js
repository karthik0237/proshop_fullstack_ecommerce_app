import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// Action
export const getProducts = createAsyncThunk("getProducts", async () => {
  const res = await axios.get("http://127.0.1:8000/api/products/");
  return res.data;
});

const productsListSlice = createSlice({
  name: "productsList",
  initialState: {
    isLoading: false,
    products: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default productsListSlice.reducer;
