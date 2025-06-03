import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          {/* LinkContainer from react-router-bootstrap 
          is not compatible with react-router-dom latest version so we have to
          downgrade r-r-dom to 5.0.0 version or import Link from r-r-dom and 
          use 'as={Link}'. when we use Link from rrd, only react component is re-rendered instead of reloading whole page
          to make it as a single page application. Link is replacement for <a href=''></a> tag */}
          <Navbar.Brand as={Link} to='/'>ProShop</Navbar.Brand>
          
         <Navbar.Toggle id='basic-navbar-nav' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to='/cart'><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              <Nav.Link as={Link} to='/login'><i className="fas fa-user"></i> Login</Nav.Link>
            </Nav>  
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
