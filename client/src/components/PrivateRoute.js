import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../utils/AuthService";

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          AuthService.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/register",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;