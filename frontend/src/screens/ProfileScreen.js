import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import { userProfile } from "../redux/slice/userDetailsSlice";
import { profileUpdate } from '../redux/slice/userProfileUpdateSlice'
import { getordersList } from '../redux/slice/ordersListSlice'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import RupeeSign from "../components/RupeeSign";


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
  const { isLoading:loadingOrders,orders,error:errorOrders } = useSelector(state => state.ordersList)

  const redirect = searchParams.redirect ? `/${searchParams.redirect}` : "/";

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || userInfo._id !== user._id){
         dispatch(userProfile('profile'));
         dispatch(getordersList())

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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total(<RupeeSign />)</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>

            <tbody>
              {orders.map( order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                    <i className="fas fa-times" style={{color:'red'}}></i>
                  )}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className="btn-sm">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
        }
      </Col>
    </Row>
  );
}

export default ProfileScreen;
