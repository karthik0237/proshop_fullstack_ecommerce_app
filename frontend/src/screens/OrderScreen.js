import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";

import { getOrderDetails,ORDER_DETAILS_RESET } from "../redux/slice/orderDetailsSlice";
import { ORDER_PAY_RESET, orderPayUpdate } from '../redux/slice/orderPaySlice'
import Message from "../components/Message";
import Loader from '../components/Loader'
import RupeeSign from '../components/RupeeSign'

function OrderScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const orderId = params.id


  const { isLoading,order,success,error } = useSelector(state => state.orderDetails)
  const { isLoading: loadingPay,success: successPay } = useSelector(state => state.orderPay)


  useEffect(() => {
    if(!order || successPay || order._id !== Number(orderId)){
      dispatch(ORDER_PAY_RESET())
      dispatch(getOrderDetails(orderId))
    } 
    
  },[dispatch,order, orderId, successPay])

  // clientid- AYofxY5SoX0qHA77wrB1FMe4V57fdQhdOIbUSsWdX4b7DXXhIdUCamcyGHIF66PDJu0EmfFpwJxW-wu5
  

  return (
    <div>

    {isLoading ? (<Loader />) : error ? ( <Message variant='danger'>{error}</Message>) : (
     
      <Row>
        <h3>Order #{order._id}</h3>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : <Message variant='warning'>Not delivered</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : <Message variant='warning'>Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items:</h4>

              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x{" "}
                          <RupeeSign />
                          {item.price} ={" "}
                          <RupeeSign />
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                <h4>Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Item:</Col>
                        <Col><RupeeSign />{order.orderItems.reduce((acc,item) => acc+ item.price*item.qty,0).toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col><RupeeSign />{order.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col><RupeeSign />{order.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col><RupeeSign />{order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  <Row>
                  {loadingPay && <Loader />}
                  <Button
                    className="btn btn-primary"
                    onClick={() => {dispatch(orderPayUpdate({orderId:orderId,paymentResult:true}))}}>
                    Pay Now
                    </Button>
                  </Row>
              </ListGroup.Item>
              )}
              

            </ListGroup>
        </Card>
        </Col>
      </Row>
    )}
    </div>
  );
}

export default OrderScreen;
