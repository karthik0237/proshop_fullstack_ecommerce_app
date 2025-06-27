import { configureStore } from '@reduxjs/toolkit'

import productsListReducer from './slice/productsListSlice'
import productDetailsReducer from './slice/productDetailsSlice'
import cartReducer from './slice/cartSlice'


const store = configureStore({
    reducer : {
        productsList: productsListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer

    }
})

export default store