import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import { createOrder,ORDER_RESET } from "../redux/slice/orderCreateSlice";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import RupeeSign from '../components/RupeeSign'

function PlaceOrderScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const { order,success,error } = useSelector(state => state.orderCreate)

  const itemsPrice = cartItems.reduce((acc,item) => acc+ item.price*item.qty,0).toFixed(2)
  const shippingPrice = Number((itemsPrice > 400 ? 0 : 50)).toFixed(2)
  const taxPrice = Number(0.12*itemsPrice).toFixed(2)
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice)+Number(taxPrice)).toFixed(2)

  
  if(!paymentMethod){
    navigate('/payment')
  }
  useEffect(() => {
  if(success){
    navigate(`/orders/${order._id}`)
  }
  dispatch(ORDER_RESET())
    
  },[success,navigate,dispatch])


  const placeOrderHandler = () => {
    dispatch(createOrder(
      {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice
      }
    ))

  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address:</strong> {shippingAddress.address},{" "}
                {shippingAddress.city} {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items:</h4>

              {cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
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
                        <Col><RupeeSign />{itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col><RupeeSign />{shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col><RupeeSign />{taxPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col><RupeeSign />{totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <Row>
                    <Button type="button"
                    className="btn-block"
                    disabled={cartItems === 0}
                    onClick={placeOrderHandler}>
                        Place Order
                    </Button>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
