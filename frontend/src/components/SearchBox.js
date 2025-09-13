import React, { useState } from 'react'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { useNavigate,useLocation } from 'react-router-dom'


function SearchBox() {
    const [keyword,setKeyword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)  // while searching page=1 by default
        }else {
            navigate(navigate(location.pathname))
        }
    }

  return (
    
        <Form onSubmit={submitHandler}>
         <Row className='mx-5'>
        <Col md={8}>
        <Form.Control
            type='text'
            name='q'
            onChange={e => {setKeyword(e.target.value)}}
            >
        </Form.Control>
        </Col> 
        <Col>
        <Button
            type="submit"
            className='btn btn-success'>
                Search
            </Button>
            </Col>
            </Row>
        </Form>
        
  )
}

export default SearchBox
