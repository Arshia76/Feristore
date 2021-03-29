import { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';
import axios from 'axios';
import * as types from '../Types';

const OrderState = (props) => {
  const initialState = {
    error: null,
    loading: true,
    order: {},
    orders: { results: [], pages: null },
    url: '',
    message: '',
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const setLoading = () => {
    dispatch({
      type: types.ORDER_LOADING,
    });
  };

  const getOrder = async (id) => {
    try {
      const res = await axios.get(`/api/orders/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.GET_ORDER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_ORDER_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getAllOrders = async (limit, page) => {
    try {
      const res = await axios.get(`/api/orders?limit=${limit}&page=${page}`, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.GET_ORDERS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_ORDERS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getUserOrders = async (id, limit, page) => {
    try {
      const res = await axios.get(
        `/api/orders/user/${id}?limit=${limit}&page=${page}`,
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
          },
        }
      );

      dispatch({
        type: types.GET_USER_ORDERS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.GET_USER_ORDERS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const createOrder = async (order) => {
    try {
      const res = await axios.post('/api/orders/create', order, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.CREATE_ORDER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.CREATE_ORDER_FAIL,
        payload: err.response.data,
      });
    }
  };

  const pay = async (id, amount, email, phoneNumber) => {
    try {
      const res = await axios.get(
        `/api/orders/pay/${id}/${amount}/${email}/${phoneNumber}`,
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
          },
        }
      );

      dispatch({
        type: types.PAY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.PAY_FAIL,
        payload: err.response.data,
      });
    }
  };

  const verifyOrder = async (amount, token) => {
    try {
      const res = await axios.get(
        `/api/orders/PaymentVerification/${amount}/${token}`,
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
          },
        }
      );
      dispatch({
        type: types.ORDER_VERIFY_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.ORDER_VERIFY_FAIL,
        payload: err.response.data,
      });
    }
  };

  const updateSentDate = async (id) => {
    try {
      const res = await axios.put(`/api/orders/update/sentDate/${id}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      dispatch({
        type: types.UPDATE_ORDER_SENT_DATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.UPDATE_ORDER_SENT_DATE_FAIL,
        payload: err.response.data,
      });
    }
  };

  const clearOrder = () => {
    dispatch({
      type: types.CLEAR_ORDER,
    });
  };

  const updatePayDate = async (id) => {
    try {
      const res = await axios.put(`/api/orders/update/payDate/${id}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      dispatch({
        type: types.UPDATE_ORDER_PAY_DATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: types.UPDATE_ORDER_PAY_DATE_FAIL,
      });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        url: state.url,
        order: state.order,
        orders: state.orders,
        message: state.message,
        getAllOrders,
        getOrder,
        createOrder,
        setLoading,
        pay,
        verifyOrder,
        updatePayDate,
        updateSentDate,
        getUserOrders,
        clearOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
