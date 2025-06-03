import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'

import Rating from '../components/Rating'
import products from '../products'



function ProductScreen() {

  /* getting 'id' from url route 
  <Route path='/product/:id' element={<ProductScreen />} /> in App.js */ 
  const {id} = useParams();

  const product = products.find( (p) => p._id == id)
  /**/ 
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>

      <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#ffe234' />
              </ListGroupItem>
            

            <ListGroupItem>
              <p>Description: {product.description}</p>
              </ListGroupItem>
          </ListGroup>
      </Col>

      <Col md={3}>
        <Card>

          <ListGroup variant='flush'>
            <ListGroupItem>
              <Row>
                <Col>Price: </Col>
                <Col><i className='fas fa-indian-rupee-sign'></i> {product.price}</Col>
              </Row>
            </ListGroupItem>

             <ListGroupItem>
              <Row>
                <Col>Status: </Col>
                <Col>{product.countInStock > 0? 'In Stock':'Out of Stock'}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
              <Button className='btn btn-dark' disabled={product.countInStock == 0} >Add to Cart</Button>
              </Row>
            </ListGroupItem>
          </ListGroup>

        </Card>
      </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
