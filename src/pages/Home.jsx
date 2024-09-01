import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { filterProductsCategoryThunk, filterProductsTitleThunk, getProductsThunk } from '../store/slices/productsAll.slice';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { Accordion, Card, InputGroup, Form, Row, Col, Button } from 'react-bootstrap';
import '../App.css'

const Home = () => {

    
const [onMouseOv, setOnMouseOv]=useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const seeProducts = useSelector(state => state.productsAll)
    //filtrado
    const [categories, setCategories] = useState([])
    //input
    const [newsSearch, setNewsSearch] = useState('')
    console.log(categories )
    console.log(seeProducts)
console.log(onMouseOv)

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories/')
            .then(res => setCategories(res.data))

    }, [])

 

    return (
       

            <Row className='principalRow'>
                <Col lg={3}>


                    <Accordion className='Accordion' defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <b>Categories</b> </Accordion.Header>

                            {
                                categories.map(category => (

                                    <Accordion.Body key={category.id} onClick={() => dispatch(filterProductsCategoryThunk(category.id))}>{category.name}</Accordion.Body>
                                ))

                            }

                        </Accordion.Item>
                    </Accordion>



                </Col>


                <Col lg={9}>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="What are you looking for?"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={newsSearch}
                            onChange={e => setNewsSearch(e.target.value)}
                        />
                        <Button className='bg-danger text-black' variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterProductsTitleThunk(newsSearch))}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {seeProducts.map(product => (

                            //card

                            <Col className='productsInHome' aria-expanded="true" >
                                <Card className='card' onClick={() => navigate(`/product/${product.id}`)} key={product.id} >
                                    <Card.Img className='imgCard' variant="top" onMouseOver={()=>setOnMouseOv(false)}  onMouseOut={()=>setOnMouseOv(true)} src={onMouseOv ? product.images[1].url : product.images[2].url} />
                                    <Card.Body className='cardHome'  >
                                        <Card.Title>{product.title}</Card.Title>

                                        <Card.Text className='nav1'> <span className='sp1'>Price:</span>  {product.price}   </Card.Text> 

                                    </Card.Body>
                                    <button className='cartButton'><i className="fa-solid fa-cart-shopping"></i></button>
                                </Card>
                            </Col>
                        ))}
                    </Row>





                </Col>

                
            </Row>
             

            
        
    );
};

export default Home; 