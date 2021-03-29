import * as types from '../Types';

const ReviewReducer = (state, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        reviews: action.payload,
        message: '',
      };

    case types.GET_PRODUCT_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        reviews: action.payload.data.reviews,
      };

    case types.REMOVE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };

    case types.CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: '',
      };

    case types.REVIEW_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default ReviewReducer;
