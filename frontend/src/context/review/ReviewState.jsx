import { useReducer } from 'react';
import axios from 'axios';
import ReviewReducer from './ReviewReducer';
import ReviewContext from './ReviewContext';
import * as types from '../Types';

const ReviewState = (props) => {
  const initialState = {
    loading: false,
    error: null,
    reviews: [],
    message: '',
  };

  const [state, dispatch] = useReducer(ReviewReducer, initialState);

  const getProductReviews = async (id) => {
    try {
      const res = await axios.get(`/api/reviews/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      dispatch({
        type: types.GET_PRODUCT_REVIEWS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_PRODUCT_REVIEWS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const deleteComment = async (pid, rid) => {
    try {
      const res = await axios.delete(`/api/reviews/${pid}/${rid}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });

      dispatch({
        type: types.REMOVE_COMMENT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.REMOVE_COMMENT_FAIL,
        payload: err.response.data,
      });
    }
  };

  const createReview = async (id, data) => {
    try {
      const res = await axios.post(`/api/reviews/review/${id}`, data, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });

      dispatch({
        type: types.CREATE_REVIEW_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.CREATE_REVIEW_FAIL,
        payload: err.response.data,
      });
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        createReview,
        getProductReviews,
        deleteComment,
        error: state.error,
        loading: state.loading,
        message: state.message,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
