import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";

const BaseRouter = () => (
  <>
    <Route exact path="/" component={Home} />
    {/*<PrivateRoute exact path="/profile" component={Profile} />*/}
  </>
);

export default BaseRouter;
