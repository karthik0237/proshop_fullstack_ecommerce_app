import { configureStore } from '@reduxjs/toolkit'

import productsListReducer from './slice/productsListSlice'
import productDetailsReducer from './slice/productDetailsSlice'
import { productDeleteReducer, productCreateReducer,productUpdateReducer } from './slice/productCUDSlice'
import cartReducer from './slice/cartSlice'
import userLoginReducer from './slice/userLoginSlice'
import userRegisterReducer from './slice/userRegisterSlice'
import userDetailsReducer from './slice/userDetailsSlice'
import userProfileUpdateReducer from './slice/userProfileUpdateSlice'
import { orderCreateReducer,ordersListReducer,orderPayReducer,orderDeliveryReducer } from './slice/orderCUDSlice'
import orderDetailsReducer from './slice/orderDetailsSlice'
import ordersMyListReducer from './slice/ordersMyListSlice'
import usersListReducer from './slice/usersListSlice'
import userDeleteReducer from './slice/userDeleteSlice'
import userUpdateReducer from './slice/userUpdateSlice'

const store = configureStore({
    reducer : {
        productsList: productsListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
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