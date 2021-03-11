import * as types from '../Types';

const ProductReducer = (state, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case types.GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.GET_SPECIAL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        specialProducts: action.payload,
      };

    case types.GET_SPECIAL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.GET_NEW_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        newProducts: action.payload,
      };

    case types.GET_NEW_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };

    case types.GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        products: [...state.products, action.payload],
      };

    case types.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.msg,
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    case types.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        message: '',
        loading: false,
        error: action.payload,
      };

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    case types.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case types.GET_PRODUCTS_BY_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    case types.GET_DISCOUNTS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        discountedProducts: action.payload,
      };

    case types.GET_DISCOUNTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ProductReducer;
