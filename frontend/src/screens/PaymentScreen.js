import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import { CART_SAVE_PAYMENT_METHOD } from '../redux/slice/cartSlice'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckoutSteps from '../components/CheckoutSteps'


import React from 'react'

function PaymentScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingAddress } = useSelector(state => state.cart)

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        navigate("/shipping")
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(CART_SAVE_PAYMENT_METHOD(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col className="my-3">
                <Form.Check 
                type="radio"
                label='PayPal or Credit Card'
                id="paypal"
                name="paymentmethod"
                onChange={e => {setPaymentMethod('PayPal')}}>

                </Form.Check>

                <Form.Check 
                type="radio"
                label='Debit/ATM card'
                id="debitCard"
                name=""
                disabled>

                </Form.Check>

                <Form.Check 
                type="radio"
                label='UPI'
                id="upi"
                name=""
                disabled>

                </Form.Check>

                <Form.Check 
                type="radio"
                label='Net Banking'
                id="netBanking"
                name=""
                disabled>

                </Form.Check>

                <Form.Check 
                type="radio"
                label='cash On Delivery'
                id="cod"
                name=""
                disabled>

                </Form.Check>
                </Col>
            </Form.Group>

            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
