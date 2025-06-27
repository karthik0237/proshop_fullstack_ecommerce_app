import { React, useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
  Button,
  Card,
  FormControl
} from "react-bootstrap";

import Message from "../components/Message";

import { addToCart, removeItem } from "../redux/slice/cartSlice";
import Loader from "../components/Loader";

function CartScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const id = params.id
  const qty = searchParams.get("qty");

  const {isLoading, cartItems, error} = useSelector((state) => state.cart);
  console.log('cartitems',cartItems)
  

  useEffect(() => {
    function cartitems() {
      if(id){
      dispatch(addToCart({id:id,qty: qty}));
      }
    }
    cartitems();
  }, [dispatch,id,qty]);



const checkOutHandler = () => {
    navigate('/login?redirect=shipping')
}

  return (
    
      <Row>
      <Col md={8} >
      <h3>Shopping Cart</h3>
      
       {cartItems && cartItems.length === 0 ? <Message>your cart is empty, <Link to='/'>Go Back</Link></Message>
        : (
          <ListGroup variant="flush">
            {isLoading? 
            <Loader /> :
             error ? <Message variant='danger'>{error.message}</Message>
            : cartItems && cartItems.map( (item) => (
              <ListGroupItem key={item.product} >
                <Row>
                  <Col md={2}>
                    <Image src= {item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`} >{item.name}</Link>
                  </Col>
                  <Col md={2}>
                      <i className="fas fa-indian-rupee"></i>{item.price}
                  </Col>
                  <Col md={3}>
                      <FormControl 
                        as="select"
                        value={qty}
                        onChange={(e) => { dispatch(addToCart({id:item.product, qty:Number(e.target.value)}))}}
                        >
                          {
                            // if countinstock=3 then [0,1,2,3]
                            [...Array(item.countInStock).keys()].map((x) => (

                              <option key={x+1} value={x+1} >
                                {x+1}
                              </option>
                            ))
                          }
                        </FormControl>
                  </Col>
                  <Col>
                          <Button type="button"
                                  variant="light"
                                  onClick={(e) => {
                                  dispatch({
                                    type: removeItem,
                                    payload:item.product
                                  })
                                  window.location.href='http://localhost:3000/cart/'
                                    }}>
                              <i className="fas fa-trash"></i>
                          </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )
      }
      </Col>
      <Col md={4}>
        <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                  <h4>Sub total ({cartItems.reduce((acc ,item) => acc + item.qty, 0) }) items  </h4>
                  <p><i className="fas fa-indian-rupee-sign"></i>{cartItems.reduce( (acc,item) => acc + (item.qty * item.price), 0).toFixed(2)}</p>
              </ListGroupItem>
              
              <ListGroupItem>
                  <Button type="button"
                          className="btn-block"
                          disabled={cartItems.length == 0}
                          onClick={checkOutHandler}>
                            Proceed to Checkout
                  </Button>
              </ListGroupItem>
            </ListGroup>
        </Card>
      </Col>
      </Row>
    
  );
}

export default CartScreen;
