import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import store from "../store";
import axios from "axios";



// action and payload creation
export const addToCart = createAsyncThunk(
  "addToCart",
  async ({id,qty}) => {

    const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

    localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems))

    return ({
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }) 
  }
);


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')) : []


 
const cartSlice = createSlice({
    name: "cart",
    initialState: {
    isLoading: false,
    cartItems: cartItemsFromStorage,
    error: null,
    },

    reducers: {
        removeItem: (state, action) => {
        state.cartItems = Array(state.cartItems.find( item => item.product != action.payload))
        localStorage.setItem('cartItems',   JSON.stringify(state.cartItems))
        if(localStorage.getItem('cartItems') === '[null]'){
            localStorage.setItem('cartItems','[]')
        }
        } 
    },
    
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading = true
        } )
        builder.addCase(addToCart.fulfilled, (state,action) => {
            state.isLoading = false
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x)
            }
            else{
                state.cartItems = [...state.cartItems, item]
            }
        })
        builder.addCase(addToCart.rejected, (state,action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})

   

export const {removeItem} = cartSlice.actions
export default cartSlice.reducer