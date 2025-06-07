import React, { useState, useEffect, use} from 'react'

import {Row,Col} from 'react-bootstrap'
import axios from 'axios'

import Product from '../components/Product'



function HomeScreen() {

    const [products,setProducts] = useState([])

    useEffect( () => {
      async function fetchProducts() {
        const  {data} = await axios.get('http://127.0.0.1:8000/api/products/')
        setProducts(data)
        console.log(data)
      }  
      
      fetchProducts()
    }, [])

  return (
    <div>
      <h3>Latest Products</h3>
      <Row>
        {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
