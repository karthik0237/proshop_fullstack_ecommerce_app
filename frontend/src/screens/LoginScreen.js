import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link,useParams,useSearchParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { loginUser, USER_LOGOUT } from "../redux/slice/userLoginSlice";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
  const params = useParams()
  const searchParams = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = searchParams.redirect ? `/${searchParams.redirect}` : '/'

  const userlogin = useSelector((state) => state.userLogin)
  const { isLoading, userInfo, error } = userlogin


  useEffect( () => {
    if(userInfo){
      navigate(`${redirect}`)
    }}
    ,[redirect,userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser({email:email,password:password}))
    console.log("submitted");
  };

  return (
    <div>
      {error && <Message variant='danger'>{error}</Message>}
      {isLoading ? <Loader /> :
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>

          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className='my-3' type="submit" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to = {redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    } 
    </div>
  );
}

export default LoginScreen;
