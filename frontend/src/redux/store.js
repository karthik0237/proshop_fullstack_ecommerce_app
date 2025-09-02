import { configureStore } from '@reduxjs/toolkit'

import productsListReducer from './slice/productsListSlice'
import productDetailsReducer from './slice/productDetailsSlice'
import cartReducer from './slice/cartSlice'
import userLoginReducer from './slice/userLoginSlice'
import userRegisterReducer from './slice/userRegisterSlice'
import userDetailsReducer from './slice/userDetailsSlice'
import userProfileUpdateReducer from './slice/userProfileUpdateSlice'
import orderCreateReducer from './slice/orderCreateSlice'
import orderDetailsReducer from './slice/orderDetailsSlice'
import orderPayReducer from './slice/orderPaySlice'
import ordersListReducer from './slice/ordersListSlice'
import usersListReducer from './slice/usersListSlice'
import userDeleteReducer from './slice/userDeleteSlice'
import userUpdateReducer from './slice/userUpdateSlice'

const store = configureStore({
    reducer : {
        productsList: productsListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        usersList: usersListReducer,
        userProfileUpdate: userProfileUpdateReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        ordersList: ordersListReducer,
        
    }
})

export default store