import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../redux/slice/productsListSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  console.log("products: ", productsList);
  const { isLoading, products, error } = productsList;

  useEffect(() => 
    {
      dispatch(getProducts());
    }
  , [dispatch]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message> // content between tags is passed as children in props to the component
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
