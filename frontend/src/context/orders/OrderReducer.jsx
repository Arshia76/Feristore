import * as types from '../Types';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        orders: {
          results: action.payload.results,
          pages: action.payload.pages,
        },
      };

    case types.GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.GET_ORDER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        order: action.payload,
      };

    case types.GET_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: {
          results: [...state.orders.results, action.payload],
          pages: Math.ceil(state.orders.results.length / 10),
        },
        order: action.payload,
      };

    case types.CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.PAY_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        url: action.payload.url,
      };

    case types.PAY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.UPDATE_ORDER_PAY_DATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: {
          results: state.orders.results.map((o) =>
            o._id === action.payload._id ? action.payload : o
          ),
          pages: Math.ceil(state.orders.results.length / 10),
        },
        order: action.payload,
      };

    case types.UPDATE_ORDER_PAY_DATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.UPDATE_ORDER_SENT_DATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: {
          results: state.orders.results.map((o) =>
            o._id === action.payload._id ? action.payload : o
          ),
          pages: Math.ceil(state.orders.results.length / 10),
        },

        order: action.payload,
      };

    case types.UPDATE_ORDER_SENT_DATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.ORDER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        orders: {
          results: action.payload.results,
          pages: action.payload.pages,
        },
      };
    case types.GET_USER_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.ORDER_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.msg,
      };

    case types.ORDER_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.CLEAR_ORDER:
      return {
        ...state,
        order: null,
      };
    default:
      return state;
  }
};

export default OrderReducer;
