import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import { CART_SAVE_SHIPPING_ADDRESS } from '../redux/slice/cartSlice'
import FormContainer from "../components/FormContainer";
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shippingAddress } = useSelector(state => state.cart) 

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(CART_SAVE_SHIPPING_ADDRESS(
            {
            address: address,
            city: city,
            postalCode: postalCode,
            country:country
            }
            ))
        navigate('/payment')
    }

  return (
   <FormContainer>
    <CheckoutSteps step1 step2/>
    <h3>Shipping Address</h3>
    <Form onSubmit={submitHandler}>

        <Form.Group className="my-2" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
                required
                type="text"
                value={address ? address : ''}
                placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)}
                >
            </Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
                required
                type="text"
                value={city ? city : ''}
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
                >
            </Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                required
                type="text"
                value={postalCode? postalCode : ''}
                placeholder="Enter postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
                >
            </Form.Control>
        </Form.Group>

         <Form.Group className="my-2" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
                required
                type="text"
                value={country? country : ''}
                placeholder="Enter country"
                onChange={(e) => setCountry(e.target.value)}
                >
            </Form.Control>
        </Form.Group>

        <Button className="my-2" type="submit" variant="primary">
            Continue
        </Button>
    </Form>

   </FormContainer>
  )
}

export default ShippingScreen
