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
        <div className='purchasesContainer'>
            <div className='linktotit1'><Link className='linkHome' to={'/'}><i className="fa-solid fa-house"></i></Link><h2>MY PURCHASES</h2></div>
            {purchases.map(purch=> (
    <ul className='ulCardPurchase' key={purch.id}>
<li className='liCardPurchase' > <Link className='linkCardPurchase' to={`/product/${purch.product.id}`}>
   
<div className='divImgPurchases'><img className='imgPurchases' src={purch.product.images[0].url} alt="" /></div>
    <h1 className='titPurchases'>{purch.product.title}</h1> 
     <p className='pricePurchases'>${purch.product.price}</p>
     </Link>
</li>
</ul>
))}
 </div>
    );
};

export default Purchases;