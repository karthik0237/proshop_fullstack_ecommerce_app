import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { topRatedProducts } from "../redux/slice/productsListSlice";
import RupeeSign from "./RupeeSign";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Carousel, Image } from "react-bootstrap";

function ProductCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, products, error } = useSelector(
    (state) => state.productsTopRated
  );

  useEffect(() => {
    dispatch(topRatedProducts());
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : ( products &&
        (<Carousel slide interval={4000} pause="hover">
  {products.map((product) => (
    <Carousel.Item key={product._id}>
      <Link to={`/product/${product._id}`}>
        <Image
          className="d-block mx-auto carousel-img"
          src={product.image}
          alt={product.name}
          fluid
        />
        <Carousel.Caption className="carousel-caption-custom">
          <h5>
            {product.name} (<RupeeSign />
            {product.price})
          </h5>
        </Carousel.Caption>
      </Link>
    </Carousel.Item>
  ))}
</Carousel>)
      )}
    </div>
  );
}

export default ProductCarousel;
