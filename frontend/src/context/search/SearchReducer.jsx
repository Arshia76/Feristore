import * as types from '../Types';

const SearchReducer = (state, action) => {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        search: action.payload,
      };

    case types.SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default SearchReducer;
