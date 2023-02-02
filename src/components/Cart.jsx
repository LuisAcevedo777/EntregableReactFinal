import { Offcanvas,Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import { deleteThunk, getCartThunk, purchaseCartThunk, updateThunk } from '../store/slices/cart.slice';
import axios from 'axios';
import { useState } from 'react';

const Cart = ({show,handleClose}) => {

    const dispatch= useDispatch()

const[count2, setCount2]=useState(0)

    useEffect(()=>{

        dispatch(getCartThunk())
 

    },[])
  
    const carts = useSelector(state=> state.cart)

    const sum2=(cartid, cartquantity)=>{
     
     const quantbody= {
        "quantity": cartquantity +1
    }
     dispatch(updateThunk(cartid, quantbody))
       
    }

    const min2=(cartid, cartquantity)=>{
     
      if(cartquantity === 0){
        const quantbody= {
          "quantity": 0
      }
      dispatch(updateThunk(cartid, quantbody))
      }else{ 
      const quantbody= {
         "quantity": cartquantity -1
      }
      dispatch(updateThunk(cartid, quantbody))
    }   
     }

     const dele =(cartid)=>{

       dispatch(deleteThunk(cartid))

     }


    return (
        <div>
             <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
       <ul>
{carts?.map(cart=>(

           <li className='cardCart' key={cart.id}>

            <img className='imgCart' src={cart.product.images[0].url} alt="" />
            <div className='titButtons'>
              <h1 className='titleCart'>{cart.product.title}</h1>
              <div className='pricValue1'>
                   <div className='buttonDesc'>
                   <button className='count' onClick={()=>min2(cart.id, cart.quantity)}>-</button>
                   <div className='count'>{(cart.quantity)}</div>
                   <button className='count' onClick={()=>sum2(cart.id, cart.quantity)}>+</button></div>
                   </div></div>
                   <div className='imgPricCart'>
                   <img src='' alt="" />
                   <div className='garh2'>
                   <h2 className='pricpric1'><span className='priceD1'>Price:</span>{(cart.product.price)*(cart.quantity)} </h2>
                    <div className='garbage' onClick={()=>dele(cart.id)}><i class="fa-solid fa-trash"></i></div></div>
                   </div>
           </li>

))}


       </ul>

<Button onClick={()=>dispatch(purchaseCartThunk())}>CheckOut</Button>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    );
};

export default Cart;