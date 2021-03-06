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
        category: {
          results: [...state.category.results, action.payload],
          pages: Math.ceil(state.category.results.length / 10),
        },
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
        category: {
          results: state.category.results.map((cat) =>
            cat._id === action.payload._id ? action.payload : cat
          ),
          pages: Math.ceil(state.category.results.length / 10),
        },
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
        category: {
          results: state.category.results.filter(
            (cat) => cat._id !== action.payload.id
          ),
          pages: Math.ceil(state.category.results.length / 10),
        },
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
