import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
  Form
} from "react-bootstrap";

import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getProductDetails } from "../redux/slice/productDetailsSlice";
import {
  productCreateReview,
  PRODUCT_REVIEW_CREATE_RESET,
} from "../redux/slice/productCUDSlice";
import { useDispatch, useSelector } from "react-redux";
//import products from "../products";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productId = params.id;
  const { isLoading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    isLoading: loadingReviewCreate,
    success: successReviewCreate,
    error: errorReviewCreate,
  } = useSelector((state) => state.productReviewCreate);


  useEffect(() => {
    if(successReviewCreate){
      setRating(0)
      setComment('')
      dispatch(PRODUCT_REVIEW_CREATE_RESET())
    }

    dispatch(getProductDetails(productId));
  }, [dispatch,successReviewCreate]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productCreateReview({
        productId: productId,
        review: {
          rating,
          comment,
        },
      })
    );
  };

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
          <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
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
                          <i className="fas fa-indian-rupee-sign"></i>
                          {product.price}
                        </Col>
                      </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                      <Row>
                        <Col>Status: </Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroupItem>

                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {
                                // if countinstock=3 then [0,1,2,3]
                                [...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}

                    <ListGroupItem>
                      <Row>
                        <Button
                          className="btn btn-dark"
                          disabled={product.countInStock == 0}
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </Button>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row className="my-3">
              <Col md={6}>
                <h4>Customer Reviews</h4>
                {product.reviews.length == 0 && (
                  <Message variant="info">No reviews</Message>
                )}

                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825" />
                      {review.rating}/5
                      <p className="fs-6 fw-light fst-italic">
                        reviewed on {review.createdAt.substring(0, 10)}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h5>Write a review</h5>
                    {loadingReviewCreate && <Loader />}
                    {successReviewCreate && <Message variant='success'>Review added successfully</Message>}
                    {errorReviewCreate && <Message variant='danger'>{errorReviewCreate}</Message>}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control 
                            as='select'
                            value={rating}
                            onChange={(e) => {setRating(e.target.value)}}>
                            <option value=''>Select...</option>
                            <option value='1'>1-Very Poor</option>
                            <option value='2'>2-Poor</option>
                            <option value='3'>3-Average</option>
                            <option value='4'>4-Good</option>
                            <option value='5'>5-Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment" className="mt-2">
                          <Form.Label>Review</Form.Label>
                          <Form.Control as='textarea'
                          row='5'
                          value={comment}
                          onChange={e => { setComment(e.target.value) }}>
                          </Form.Control>
                        </Form.Group>

                        <Button className="mt-2"
                        disabled= {loadingReviewCreate}
                        type='submit'
                        variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        Please <Link to={"/login"}>Login</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )
      )}
    </div>
  );
}

export default ProductScreen;
