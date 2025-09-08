import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import {useNavigate,Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders } from '../redux/slice/orderCUDSlice'

function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isloading, error, orders } = useSelector(state => state.ordersList)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, userInfo])


    return (
        <div>
            <h1>Orders</h1>
            {isloading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : ( orders && (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>

                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>
                                            <Link to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </Link>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                        
                    )}
        </div>
    )
}

export default OrderListScreen