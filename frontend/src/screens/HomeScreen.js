import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate,useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../redux/slice/productsListSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoading,products,error,page,totalPages } = useSelector((state) => state.productsList);
  console.log("products: ", products);

  const keyword = location.search // entire url from ?

  useEffect(() => 
    {
      dispatch(getProducts(keyword));
    }
  , [dispatch,keyword]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message> // content between tags is passed as children in props to the component
      ) : (
        <div>
           {!keyword && <ProductCarousel />}
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
        <Paginate page={page} totalPages={totalPages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
