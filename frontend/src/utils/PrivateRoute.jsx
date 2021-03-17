import React, { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authContext.loading ? null : !authContext.isAuthenticated ? (
          <Redirect to='/register' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
