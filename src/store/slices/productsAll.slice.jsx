import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsAllSlice = createSlice({
    name: 'productsAll',
    initialState: [],
    reducers: {

        setProducts: (state, action) => {
            const productsAll = action.payload
            return productsAll

        }
    }
})
//trae todos los productos

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products/')
        .then(res => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)))
}
//filrado por categorias de productos

export const filterProductsCategoryThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));  
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/?categoryId=${id}`)
        .then(res => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const filterProductsTitleThunk = (title) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${title}`)
        .then(res => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = productsAllSlice.actions;

export default productsAllSlice.reducer;
