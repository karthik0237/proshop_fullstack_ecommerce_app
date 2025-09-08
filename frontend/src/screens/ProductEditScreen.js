import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import { getProductDetails,PRODUCT_DETAILS_RESET } from '../redux/slice/productDetailsSlice'
import { updateProduct,PRODUCT_UPDATE_RESET } from '../redux/slice/productCUDSlice'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductEditScreen() {
  const dispatch = useDispatch();
  const params = useParams()
  const navigate = useNavigate()

  const productId = params.id
  const { isLoading,product,error } = useSelector((state) => state.productDetails);
  const { isLoading:updateLoading,success:updateSuccess,error:updateError } = useSelector(state => state.productUpdate)

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image,setImage] = useState('');
  const [brand,setBrand] = useState("");
  const [category,setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description,setDescription] = useState("");
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    if(updateSuccess){
      dispatch(PRODUCT_UPDATE_RESET())
      navigate('/admin/productlist')
      dispatch(PRODUCT_DETAILS_RESET())
    } else {
      if(!product || product._id !== Number(productId))
        {
        dispatch(getProductDetails(productId))
    } else {
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setImage(product.image)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
    }

    }
  },[productId,dispatch,product, updateSuccess])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(
      {
      id:productId,
      product:{
        name:name,
        price:price,
        brand:brand,
        category:category,
        countInStock:countInStock,
        description:description
      }
      }))
  };

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData() //construct a key-value pair for form field data
    formData.append('image',file)
    formData.append('product_id',productId)

    setUploading(true)
    try{
      const config = {
        headers:{
          'Content-type':'multipart/form-data'
        }
      }
      const { data } = await axios.post('http://127.0.0.1:8000/api/products/upload/',
        formData,
        config)

        setImage(data)
        setUploading(false)
    }catch(error){
      setUploading(false)
    }
  }
  

  return (
    <div>
        <Link to={'/admin/productlist'}>
         <Button variant="light">Go Back</Button>
        </Link>

    <FormContainer>
        <h3>Edit Product</h3>
        {updateLoading && <Loader />}
       {updateError && <Message variant='danger'>{updateError}</Message>}

      {isLoading ? <Loader /> : error ? (
            <Message variant='danger'>{error}</Message>
        ): (
            <Form onSubmit={submitHandler}>

        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>

        <Form.Control type="file"
          onChange={uploadFileHandler}>
        </Form.Control>
        </Form.Group>
        {uploading && <Loader />}
       
      

        <Form.Group className="my-3" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className="my-3" controlId="countInStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="nummber"
            placeholder="Enter countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Button className="my-3" type="submit" variant="success">
            Update
          </Button>
        </Form.Group>
        
      </Form>
        )
     }
    </FormContainer>
    </div>
  );
}


export default ProductEditScreen;
