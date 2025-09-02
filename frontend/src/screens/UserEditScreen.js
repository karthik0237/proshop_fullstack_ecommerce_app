import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import { userProfile } from "../redux/slice/userDetailsSlice";
import { updateUser } from '../redux/slice/userUpdateSlice'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

function UserEditScreen() {
  const dispatch = useDispatch();
  const params = useParams()
  const navigate = useNavigate()

  const userId = params.id
  const { isLoading, user,error } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  useEffect(() => {
    
    if(!user.name || user._id !== Number(userId)){
        dispatch(userProfile(userId))
    } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }
  },[userId,dispatch,user])

  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(updateUser({
    id:userId,
    user:{
      name:name,
      email:email,
      isAdmin:isAdmin
    }
  }))
  dispatch(userProfile(userId))
  };

  

  return (
    <div>
        <Link to={'/admin/userlist'}>
         <Button variant="light">Go Back</Button>
        </Link>

    <FormContainer>
        <h3>Edit User</h3>
        {isLoading ? <Loader /> : error ? (
            <Message variant='danger'>{error}</Message>
        ): (
            <Form onSubmit={submitHandler}>

        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="isadmin">
  
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked ={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>

        <Form.Group>
          <Button className="my-3" type="submit" variant="success">
            Update
          </Button>
        </Form.Group>
        
      </Form>
        )
     }
    </FormContainer>
    </div>
  );
}


export default UserEditScreen;
