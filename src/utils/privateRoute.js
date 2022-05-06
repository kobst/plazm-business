import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';

function PrivateRoute({ component: Component, authed, ...rest }) {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    let updateUser = async (authState) => {
      try {
        await Auth.currentAuthenticatedUser();
        setSignedIn(true);
      } catch {}
    };
    updateUser();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        signedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/business/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
