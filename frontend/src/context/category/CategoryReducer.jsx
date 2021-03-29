import * as types from '../Types';

const CategoryReducer = (state, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: action.payload,
      };

    case types.GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: [...state.category.results, action.payload],
      };

    case types.ADD_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: state.category.results.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        ),
      };

    case types.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: state.category.results.filter(
          (cat) => cat._id !== action.payload
        ),
      };

    case types.CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default CategoryReducer;
