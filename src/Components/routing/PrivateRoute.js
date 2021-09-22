import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/signin" />
        );
      }}
    />
  );
}

export default PrivateRoute;
