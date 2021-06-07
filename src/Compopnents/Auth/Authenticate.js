import React from "react";
import Login from "./Login";
import Signin from "./Signin";
import "./auth.css";
import { Route, Switch, useRouteMatch } from "react-router-dom";
const Authenticate = () => {
  var currentUrl = useRouteMatch().url;
  return (
    <div className="auth">
      <Switch>
        <Route exact path={`${currentUrl}/login`}>
          <Login />
        </Route>
        <Route exact path={`${currentUrl}/signin`}>
          <Signin/>
        </Route>
      </Switch>
    </div>
  );
};

export default Authenticate;
