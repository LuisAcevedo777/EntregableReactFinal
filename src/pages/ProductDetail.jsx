import axios from 'axios'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { filterProductsCategoryThunk } from '../store/slices/productsAll.slice';
import { Row, Col, Carousel } from 'react-bootstrap'
import '../App.css'
import {Link} from 'react-router-dom'
import { addCartThunk } from '../store/slices/cart.slice';
import '../App.css';


const ProductDetail = () => {

    const { id } = useParams()
    const[count, setCount]=useState(1)
    const[accu, setAccu]=useState(0)
  
    const [uniqueProduct, setUniqueProduct] = useState({})

    const productSuggested = useSelector(state => state.productsAll)
   const [pric, setPric]=useState(0)
    /*const productSuggestedFiltered = productSuggested.find((productFiltered => productFiltered.id === Number(id)))
       const relatedProduct= productSuggested.filter(productFiltered=> productFiltered.category.id === productSuggestedFiltered.category.id &&
          productFiltered.id !== productSuggestedFiltered.id    )*/

    const navigate = useNavigate()

    //storage
   
    localStorage.setItem('counter', count)
    localStorage.setItem('account', accu+count)
    localStorage.setItem('pric', pric)


    const dispatch = useDispatch()

    useEffect(() => {

        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
            .then(res => {

                setUniqueProduct(res.data);
                dispatch(filterProductsCategoryThunk(res.data.category.id))

            });

    }, [id])

  
    console.log(uniqueProduct)

    const addToCart=(id)=>{

      const bodyCart={

        quantity: count,
        productId: uniqueProduct.id
      }
      dispatch(addCartThunk(bodyCart))

    }
    const plus=(id)=>{
  
      setCount(count + 1)
      setPric(uniqueProduct.price*(count + 1))
     const quant={
        quantity: count
    }
     axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`,quant, getConfig())
     .then(res=> setCount(res.data))
     
    }
    const minus=()=>{
      if(count <= 1){ 
        setCount(1)
      }else
      {setCount(count-1)
        setPric(pric-(uniqueProduct.price))
      }
    }


    return (
        <div>
            <Row>
                <Col lg={7}>
                    <div className='col1'>
                       <div className='linktotit'><Link className='linkHome' to={'/'}>Home</Link> </div>
                       
                       <Carousel>
                       
      <Carousel.Item>
    
        <img
          className='imgUnique'
          src={uniqueProduct.images?.[0].url}
          alt="First slide"
        />
     
      </Carousel.Item>
      <Carousel.Item>
     
        <img
          className='imgUnique'
          src={uniqueProduct.images?.[1].url}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
      
        <img
            className='imgUnique'
          src={uniqueProduct.images?.[2].url}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
                       

                        <p>Price: {uniqueProduct.price}</p></div>
                </Col>
                <Col lg={5}>
                    <div className='descriptionTot'>
                    <h2>DESCRIPTION:</h2>
                    <p>{uniqueProduct.description}</p>
                   <div className='pricValue'><h2 className='pricpric'><span className='priceD'>Price:</span>{uniqueProduct.price*count} </h2>
                   <div className='buttonDesc'>
                   <button className='count' onClick={minus}>-</button>
                   <div className='count'>{count}</div>
                   <button className='count' onClick={()=>plus(uniqueProduct.id)}>+</button></div>
                   </div> 
                   <button onClick={addToCart} className='addToCart'>Add to Cart</button>
                   </div>
                </Col></Row>


            <ul className='ulistSuggered'>
                {
                    productSuggested.map(productSuggested => (

                        <li className='listSuggered' key={productSuggested.id} onClick={() => navigate(`/product/${productSuggested.id}`)} >

                            <img className='imgSuggered' src={productSuggested.images[0].url} alt="" />
                            <p className='titleSuggered'>{productSuggested.title}</p>
                            <button className='cartButton1'><i class="fa-solid fa-cart-shopping"></i></button>
                        </li>

                    ))

                }
            </ul>
        </div>
    );
};

export default ProductDetail;