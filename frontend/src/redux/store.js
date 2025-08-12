import { configureStore } from '@reduxjs/toolkit'

import productsListReducer from './slice/productsListSlice'
import productDetailsReducer from './slice/productDetailsSlice'
import cartReducer from './slice/cartSlice'
import userLoginReducer from './slice/userLoginSlice'
import userRegisterReducer from './slice/userRegisterSlice'
import userDetailsReducer from './slice/userDetailsSlice'
import userProfileUpdateReducer from './slice/userProfileUpdateSlice'
import orderCreateReducer from './slice/orderCreateSlice'

const store = configureStore({
    reducer : {
        productsList: productsListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userProfileUpdate: userProfileUpdateReducer,
        orderCreate:orderCreateReducer,
        
    }
})

export default store