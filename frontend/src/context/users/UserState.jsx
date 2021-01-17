import { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import axios from 'axios';
import * as types from '../Types';

const UserState = (props) => {
  const initialState = {
    user: null,
    error: null,
    loading: false,
    users: [],
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUser = async (id) => {
    setLoding();
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

  const getUsers = async () => {
    setLoding();
    try {
      const res = await axios.get('/api/users', {
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
    setLoding();
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
    setLoding();
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

  const setLoding = () => {
    dispatch({
      type: types.SET_LOADING,
    });
  };

  const clearErrors = () => {
    dispatch({
      type: types.CLEAR_ERRORS,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        error: state.error,
        loading: state.loading,
        getUser,
        getUsers,
        updateUser,
        deleteUser,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
