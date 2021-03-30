import React, { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !authContext.isAuthenticated || !authContext.isAdmin ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
