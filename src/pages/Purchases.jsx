import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import '../App.css'
import {Link} from 'react-router-dom'

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases= useSelector(state=> state.purchases)

useEffect(()=> {

    dispatch(getPurchasesThunk())

},[])

    return (
        <div>
            <div className='linktotit1'><Link className='linkHome' to={'/'}>Home</Link><h2>MY PURCHASES</h2></div>
            {purchases.map(purch=> (
    <ul key={purch.id}>
<li className='cardPurchase' > <Link className='cardPurchase' to={`/product/${purch.product.id}`}>
   
<img className='imgPurchases' src={purch.product.images[0].url} alt="" />
    <h1 className='titPurchases'>{purch.product.title}</h1> 
     <div className='quantityBox'></div>
     <p className='pricePurchases'>${purch.product.price}</p>
     </Link>
</li>



</ul>


            ))}
        </div>
    );
};

export default Purchases;