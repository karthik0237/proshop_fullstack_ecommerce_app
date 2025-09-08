import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";

import { getProducts } from "../redux/slice/productsListSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteProduct,createProduct,PRODUCT_CREATE_RESET } from '../redux/slice/productCUDSlice';

function ProductsListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading,products,error } = useSelector(state => state.productsList)
    const { userInfo } = useSelector(state => state.userLogin)
    const { isLoading:loadingDelete,success:successDelete,error:errorDelete } = useSelector(state => state.productDelete)
    const { isLoading:loadingCreate,success:successCreate,product:createdProduct,error:errorCreate } = useSelector(state => state.productCreate)


    useEffect(() => {
      dispatch(PRODUCT_CREATE_RESET())

      if(!userInfo.isAdmin){
        navigate('/login')
      }

      if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
      } else{
        dispatch(getProducts())
      }
        }
      ,[dispatch,userInfo,navigate,successDelete,successCreate,successDelete])
    
    const deleteHandler = (id) => {
      if(window.confirm('Are you sure to delete this product?')){
        dispatch(deleteProduct(id))
      }   
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
   

  return (
    <div>
    <Row className='align-items-center'>
        <Col>
            <h3>Products</h3>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
    </Row>
    
    {loadingDelete && <Loader />} 
     {errorDelete && <Message variant='danger'>{errorDelete}</Message> }

     {loadingCreate && <Loader />} 
     {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
         <Table striped bordered hover responsive className="table-sm w-75">
            <thead className='text-center'>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>category</th>
                <th>brand</th>
              </tr>
            </thead>

            <tbody className='text-center'>
              {products && products.map( product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  
                  <td>
                    <Button className='btn-sm' variant='light'
                    onClick={() => {navigate(`/admin/product/${product._id}/edit`)}}>
                    <i className='fa fa-edit'></i>
                    </Button>
                    
                    <Button className='btn-sm' 
                    variant='light'
                    onClick={() => {deleteHandler(product._id)}}>
                          <i className='fa fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      )}
    </div>
  )
}

export default ProductsListScreen
