import { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import axios from 'axios';
import * as types from '../Types';

const UserState = (props) => {
  const initialState = {
    user: null,
    error: null,
    loading: true,
    users: {
      results: [],
      pages: null,
    },
    message: '',
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUser = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.GET_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_USER_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getUsers = async (limit, page) => {
    try {
      const res = await axios.get(`/api/users?limit=${limit}&page=${page}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.GET_ALL_USERS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_ALL_USERS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const updateUser = async (id, data) => {
    try {
      const res = await axios.put(`/api/users/${id}/update`, data, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.UPDATE_USER_FAIL,
        payload: err.response.data,
      });
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/users/${id}/delete`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.DELETE_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.DELETE_USER_FAIL,
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
      type: types.USER_LOADING,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        error: state.error,
        loading: state.loading,
        message: state.message,
        getUser,
        getUsers,
        updateUser,
        deleteUser,
        clearErrors,
        setLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
