import { configureStore } from '@reduxjs/toolkit'

import { productsListReducer,productsTopRatedReducer } from './slice/productsListSlice'
import productDetailsReducer from './slice/productDetailsSlice'
import { productDeleteReducer, productCreateReducer,productUpdateReducer,
        productReviewCreateReducer } from './slice/productCUDSlice'
import cartReducer from './slice/cartSlice'

import userLoginReducer from './slice/userLoginSlice'
import userRegisterReducer from './slice/userRegisterSlice'
import userDetailsReducer from './slice/userDetailsSlice'
import usersListReducer from './slice/usersListSlice'
import { userProfileUpdateReducer,userDeleteReducer,userUpdateReducer } from './slice/userCUDSlice'

import { orderCreateReducer,ordersListReducer,orderPayReducer,
        orderDeliveryReducer } from './slice/orderCUDSlice'
import orderDetailsReducer from './slice/orderDetailsSlice'
import ordersMyListReducer from './slice/ordersMyListSlice'



const store = configureStore({
    reducer : {
        productsList: productsListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReviewCreate: productReviewCreateReducer,
        productsTopRated: productsTopRatedReducer,
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
        ordersList: ordersListReducer,
        orderPay: orderPayReducer,
        orderDelivery: orderDeliveryReducer,
        ordersMyList: ordersMyListReducer,
        
    }
})

export default store