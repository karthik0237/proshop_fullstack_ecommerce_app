import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";

import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getProductDetails } from "../redux/slice/productDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
//import products from "../products";

function ProductScreen() {
  const params = useParams();
  //const product = products.find((product) => product._id == params.id)

  const dispatch = useDispatch();
  const { isLoading, product, error } = useSelector(
    (state) => state.productDetails
  );
  console.log("productdetails:", product);

  useEffect(() => {
    function getprods(id) {
      dispatch(getProductDetails(id));
    }
    getprods(params.id);
  }, [dispatch]);

  //const product = products.find((prod) => prod._id == params.id)

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message> // content between tags is passed as children in props to the component
      ) : (
        product && (
          <Row>
            <Col md={6}>
              <Image
                src={"http://127.0.0.1:8000/images/airpods.jpg"}
                alt={product.name}
                fluid
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color="#ffe234"
                  />
                </ListGroupItem>

                <ListGroupItem>
                  <p>Description: {product.description}</p>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <i className="fas fa-indian-rupee-sign"></i>{" "}
                        {product.price}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Button
                        className="btn btn-dark"
                        disabled={product.countInStock == 0}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      )}
    </div>
  );
}

export default ProductScreen;
