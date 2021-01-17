import { useReducer } from 'react';
import * as types from '../Types';
import axios from 'axios';
import SearchContext from './SearchContext';
import SearchReducer from './SearchReducer';

const SearchState = (props) => {
  const initialState = {
    loading: false,
    error: null,
    search: [],
  };
  const [state, dispatch] = useReducer(SearchReducer, initialState);

  const searchProducts = async (product) => {
    try {
      const res = await axios.get(`/api/products/search/product/${product}`);
      dispatch({
        type: types.SEARCH_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.SEARCH_FAIL,
        payload: err.response.data,
      });
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search: state.search,
        loading: state.loading,
        error: state.error,
        searchProducts,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
