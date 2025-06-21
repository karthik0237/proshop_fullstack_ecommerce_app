import { React, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Row,Col,Image,ListGroup,Button,Card,ListGroupItem, FormControl,} from "react-bootstrap";

import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getProductDetails } from "../redux/slice/productDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
//import products from "../products";

function ProductScreen({history}) {
  const [qty, setQty] = useState(1)
  const params = useParams();
  const navigate = useNavigate()

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


  const addToCartHandler = () => {
      navigate(`/cart/${params.id}?qty=${qty}`)
  }



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
                src={product.image}
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
                        <i className="fas fa-indian-rupee-sign"></i>
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

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                        <FormControl 
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        >
                          {
                            // if countinstock=3 then [0,1,2,3]
                            [...Array(product.countInStock).keys()].map((x) => (

                              <option key={x+1} value={x+1} >
                                {x+1}
                              </option>
                            ))
                          }
                        </FormControl>
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
        )
      )}
    </div>
  );
}

export default ProductScreen;
