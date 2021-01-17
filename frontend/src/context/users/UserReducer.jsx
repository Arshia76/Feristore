import * as types from '../Types';

const UserReducer = (state, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };

    case types.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };

    case types.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload,
      };

    case types.GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case types.DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
