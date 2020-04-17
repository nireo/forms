import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { User } from '../../interfaces/User';

type Props = {
  user?: User | null;
  exact?: boolean;
  path?: string;
};

const PrivateRoute: React.FC<Props> = ({ children, user, exact, path }) => {
  console.log(user);
  return (
    <Route
      exact={exact === undefined ? false : true}
      path={path}
      render={({ location }) =>
        user !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
