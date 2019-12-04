import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Floormap from "../pages/Floormap";
import StoreLayout from "../pages/StoreLayout"
import Search2 from "../pages/Search2"

// project name
const pn = "shoptimize"

const BaseRouter = () => (
  <>
  <Route exact path="/" component={Home} />
  <Route exact path={`/${pn}/search`} component={Search2} />
  <Route exact path={`/${pn}`} component={Home} />
  <Route exact path={`/${pn}/floormap`} component={StoreLayout} />

    {/*<PrivateRoute exact path="/profile" component={Profile} />*/}
  </>
);

export default BaseRouter;