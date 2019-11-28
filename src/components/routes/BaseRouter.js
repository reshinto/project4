import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Search from "../pages/Search"

// project name
const pn = "shoptimize"

const BaseRouter = () => (
  <>
  <Route exact path="/" component={Home} />
  <Route exact path="/search" component={Search} />
  <Route exact path={`/${pn}`} component={Home} />
    {/*<PrivateRoute exact path="/profile" component={Profile} />*/}
  </>
);

export default BaseRouter;