import {Auth} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';

function PrivateRoute({component: Component, authed, ...rest}) {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const updateUser = async (authState) => {
      try {
        await Auth.currentAuthenticatedUser();
        setSignedIn(true);
      } catch (error) {}
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
					    state: {
					      from: props.location,
					    },
					  }}
					/>
				)
      }
    />
  );
}

export default PrivateRoute;
