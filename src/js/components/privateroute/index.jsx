/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import token from '../../lib/auth/token';

const PrivateRoute = ({component: Component, ...rest}) => {

  const checkToken = () => {
    if (!token.isValid() && !token.content()) {
      token.clear();
      return false;
    }
    return true;
  };

  return (
    <Route {...rest} render={props => (
      checkToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: `/login`,
          state: {from: props.location}
        }} />
      )
    )} />
  );
};


export default PrivateRoute;
