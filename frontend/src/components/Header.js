import React,{useEffect} from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { USER_LOGOUT } from "../redux/slice/userLoginSlice";
import { ORDER_DETAILS_RESET } from '../redux/slice/orderDetailsSlice'
import { ORDERS_LIST_RESET } from "../redux/slice/ordersListSlice";


function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector( state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(USER_LOGOUT())
    dispatch(ORDER_DETAILS_RESET())
    dispatch(ORDERS_LIST_RESET())
    window.location.reload()
    }


  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          {/* import Link from r-r-dom and 
          use 'as={Link}'. when we use Link from rrd, only react component is re-rendered instead of reloading whole page
          to make it as a single page application. Link is replacement for <a href=''></a> tag */}
          <Navbar.Brand as={Link} to='/'>ProShop</Navbar.Brand>
          
         <Navbar.Toggle id='basic-navbar-nav' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/cart'><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>

              { userInfo ? (<NavDropdown title={userInfo.name} id='username'>
                            
                            <NavDropdown.Item onClick={() => {navigate('/profile')}}>Profile</NavDropdown.Item>
                            
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>)
              : <Nav.Link as={Link} to='/login'><i className="fas fa-user"></i> Login</Nav.Link>
              }
              
            </Nav>  
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
