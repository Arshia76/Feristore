import { useReducer } from 'react';
import * as types from '../Types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axios from 'axios';

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    error: null,
    loading: true,
    user: null,
    id: null,
    isAdmin: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.REGISTER_FAIL,
        payload: err.response.data,
      });
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.LOGIN_FAIL,
        payload: err.response.data,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: types.LOGOUT,
    });
  };

  const loadUser = async () => {
    const res = await axios.get('/api/auth/user', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
      },
    });
    dispatch({
      type: types.LOAD_USER,
      payload: res.data,
    });
  };

  const setLoading = () => {
    dispatch({
      type: types.AUTH_LOADING,
    });
  };

  const clearErrors = () => {
    dispatch({
      type: types.CLEAR_ERRORS,
    });
  };

  const setLoadingFalse = () => {
    dispatch({
      type: types.AUTH_LOADING_FALSE,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        id: state.id,
        isAdmin: state.isAdmin,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
        setLoading,
        setLoadingFalse,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
