import { useReducer } from 'react';
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import axios from 'axios';
import * as types from '../Types';

const ProductState = (props) => {
  const initialState = {
    error: null,
    loading: true,
    products: [],
    product: {},
    message: '',
    newProducts: [],
    specialProducts: [],
    discountedProducts: [],
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const getNewProducts = async () => {
    try {
      const res = await axios.get('/api/products/new/products');
      dispatch({
        type: types.GET_NEW_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_NEW_PRODUCTS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getDiscountProducts = async () => {
    try {
      const res = await axios.get('/api/products/discount/products');

      dispatch({
        type: types.GET_DISCOUNTS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_DISCOUNTS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getSpecialProducts = async (limit, page) => {
    try {
      const res = await axios.get(
        `/api/products/special/products?limit=${limit}&page=${page}`
      );
      dispatch({
        type: types.GET_SPECIAL_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_SPECIAL_PRODUCTS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getAllProducts = async (limit, page) => {
    try {
      const res = await axios.get(`/api/products?limit=${limit}&page=${page}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.GET_ALL_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_SPECIAL_PRODUCTS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await axios.post('/api/products/create', product, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      dispatch({
        type: types.CREATE_PRODUCT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.CREATE_PRODUCT_FAIL,
        payload: err.response.data,
      });
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const res = await axios.put(`/api/products/${id}/update`, product, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      dispatch({
        type: types.UPDATE_PRODUCT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.UPDATE_PRODUCT_FAIL,
        payload: err.response.data,
      });
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}/delete`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      dispatch({
        type: types.DELETE_PRODUCT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.DELETE_PRODUCT_FAIL,
        payload: err.response.data,
      });
    }
  };

  const productDetail = async (id) => {
    try {
      const res = await axios.get(`/api/products/product/${id}`);
      dispatch({
        type: types.GET_PRODUCT_DETAIL_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_PRODUCT_DETAIL_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getProductByCategory = async (category, limit, page) => {
    try {
      const res = await axios.get(
        `/api/products/${category}?limit=${limit}&page=${page}`
      );
      dispatch({
        type: types.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_PRODUCTS_BY_CATEGORY_FAIL,
        payload: err.response.data,
      });
    }
  };

  const clearErrors = () => {
    dispatch({
      type: types.CLEAR_ERRORS,
    });
  };

  const setLoading = () => {
    dispatch({
      type: types.PRODUCT_LOADING,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        products: state.products,
        specialProducts: state.specialProducts,
        newProducts: state.newProducts,
        discountedProducts: state.discountedProducts,
        product: state.product,
        message: state.message,
        getAllProducts,
        getNewProducts,
        getProductByCategory,
        createProduct,
        updateProduct,
        deleteProduct,
        productDetail,
        getSpecialProducts,
        clearErrors,
        getDiscountProducts,
        setLoading,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
