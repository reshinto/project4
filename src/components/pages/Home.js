import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {signup} from "../../redux/actions/authAction";

const Home = (props) => {
  // props.signup({email: "test2@email.com", password: "password", confirmPassword: "password", handle: "test2"});
  return (
    <>
      <h1>Home Page</h1>
      <Link to={"/shoptimize/floormap"}>floormap</Link>
    </>
  )
};

const mapStateToProps = state => {
  return {
    user: state.user,
    UI: state.UI
  };
};

const mapDispatchToProps = {
  signup
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
