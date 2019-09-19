import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {UserContext} from '../utils/context'

function PrivateRoute({component: Component, ...rest}) {
  const {user} = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        user !== '' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;