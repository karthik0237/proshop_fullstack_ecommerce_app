import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

function Product({ product }) {
  //destructuring props
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#ffe234"
            />
          </div>
        </Card.Text>

        <Card.Text as="h5">
          <div className="my-3">
            <i className="fa fa-indian-rupee-sign"></i>{product.price}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
