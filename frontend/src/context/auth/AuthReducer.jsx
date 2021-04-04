import * as types from '../Types';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      localStorage.setItem('auth-token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.username,
        error: null,
        id: action.payload.id,
        isAdmin: action.payload.isAdmin,
      };

    case types.REGISTER_FAIL:
      localStorage.removeItem('auth-token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
        user: null,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem('auth-token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.username,
        error: null,
        id: action.payload.id,
        isAdmin: action.payload.isAdmin,
      };

    case types.LOGIN_FAIL:
      localStorage.removeItem('auth-token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
        user: null,
      };

    case types.LOGOUT:
      localStorage.removeItem('auth-token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
        user: null,
        isAdmin: false,
      };
    case types.LOAD_USER:
      return {
        ...state,
        token: localStorage.getItem('auth-token'),
        isAuthenticated: true,
        error: null,
        loading: false,
        user: action.payload.user,
        id: action.payload.id,
        isAdmin: action.payload.isAdmin,
      };

    case types.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    case types.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.AUTH_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
