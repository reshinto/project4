import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import Dashboard from "../pages/Dashboard";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Dashboard} />
    {/*<PrivateRoute exact path="/profile" component={Profile} />*/}
  </div>
);

export default BaseRouter;
