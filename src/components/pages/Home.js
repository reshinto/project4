import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <>
    <h1>Home Page</h1>
    <Link to={"/shoptimize/floormap"}>floormap</Link>
  </>
);

export default Home;
