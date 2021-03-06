import * as types from '../Types';

const UserReducer = (state, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        message: '',
      };

    case types.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        message: '',
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.updatedUser,
        message: action.payload.msg,
      };

    case types.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
        users: {
          results: state.users.results.filter(
            (user) => user._id !== action.payload.id
          ),
          pages: Math.ceil(state.users.results.length / 10),
        },
      };

    case types.DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
