import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "hooks";

const PublicRoute = ({ path, component: Component, ...props }) => {
  const { user } = useUser();

  return (
    <Route
      exact
      path={path}
      render={() =>
        !user ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export default PublicRoute;
