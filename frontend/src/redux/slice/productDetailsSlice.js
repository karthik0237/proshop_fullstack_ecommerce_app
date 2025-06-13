import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// action and payload creation
export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
    return res.data;
  }
);


const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
    isLoading: false,
    product:null,
    error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetails.pending, (state, action) => {
            state.isLoading = true
        } )
        builder.addCase(getProductDetails.fulfilled, (state,action) => {
            state.isLoading = false
            state.product = action.payload
        })
        builder.addCase(getProductDetails.rejected, (state,action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})



export default productDetailsSlice.reducer