import { configureStore } from '@reduxjs/toolkit'

import productsListReducer from './slice/productsListSlice'
import productDetailsReducer from './slice/productDetailsSlice'


const store = configureStore({
    reducer : {
        productsList: productsListReducer,
        productDetails: productDetailsReducer

    }
})

export default store