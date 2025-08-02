import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import { userProfile } from "../redux/slice/userDetailsSlice";
import {profileUpdate} from '../redux/slice/userProfileUpdateSlice'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";


function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const { isLoading, user, error } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {success,other} = useSelector(state => state.userProfileUpdate)

  const redirect = searchParams.redirect ? `/${searchParams.redirect}` : "/";

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name){
         dispatch(userProfile('profile'));

      }
      else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, dispatch, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords donot match");
    } else {
      dispatch(profileUpdate(
        {
          name:name,
          email:email,
          password:password
      }))
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h3>My Profile</h3>
        { isLoading ? <Loader />:
        error ? <Message variant="danger">{error}</Message> : success ?
         <Message variant="success">Successfully Updated, Login again</Message> : <></>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder='enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="success">
            Update Profile
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h3>My Orders</h3>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
