import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import getConfig from './utils/getConfig';
import axios from 'axios'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
           
        setCart: (state, action)=>{

            const fillCart= action.payload
            return fillCart
        }

    }
})
export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart/', getConfig())
        .then((res) => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addCartThunk = (bodyCart) => (dispatch) => {
    dispatch(setIsLoading(true));
  axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', bodyCart,getConfig())
        .then((res) => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases',{},getConfig())
        .then((res) => dispatch(getCartThunk())) //setcart('')
        .finally(() => dispatch(setIsLoading(false)));
}

export const updateThunk = (cartid, quantbody) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${cartid}`, quantbody, getConfig())
        .then((res) => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteThunk = (cartid) => (dispatch) => {
    dispatch(setIsLoading(true));
     axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${cartid}/`, getConfig())
        .then((res) => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}


export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;
