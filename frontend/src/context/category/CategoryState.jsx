import { useReducer } from 'react';
import * as types from '../Types';
import CategoryContext from './CategoryContext';
import CategoryReducer from './CategoryReducer';
import axios from 'axios';

const CategoryState = (props) => {
  const initialState = {
    loading: true,
    error: null,
    message: '',
    category: [],
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  const getCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      dispatch({
        type: types.GET_CATEGORIES_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_CATEGORIES_FAIL,
        payload: err.response.data,
      });
    }
  };

  const createCategory = async (category) => {
    try {
      const res = await axios.post(
        '/api/categories/category/create',
        category,
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch({
        type: types.ADD_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.ADD_CATEGORY_FAIL,
        payload: err.response.data,
      });
    }
  };

  const updateCategory = async (id, category) => {
    try {
      const res = await axios.put(
        `/api/categories/category/${id}/update`,
        category,
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch({
        type: types.UPDATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.UPDATE_CATEGORY_FAIL,
        payload: err.response.data,
      });
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/categories/category/${id}/delete`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.REMOVE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.REMOVE_CATEGORY_FAIL,
        payload: err.response.data,
      });
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        category: state.category,
        error: state.error,
        loading: state.loading,
        message: state.message,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategories,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
