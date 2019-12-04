import React from "react";
// import Parallax from "../home-components/Parallax/Parallax.js";
// import {searchBackground} from "../search-components/search-style.js"
// import classNames from "classnames";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../home-components/Grid/GridContainer.js";
// import GridItem from "../home-components/Grid/GridItem.js";
import Button from "../home-components/CustomButtons/Button.js";
// import Paper from "@material-ui/core/Paper";
// import SearchHeader from "../home-components/Header/SearchHeader.js";
import Canvas from "../layouts/Canvas";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}


// import styles from "../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

// const useStyles = makeStyles(styles);



class StoreLayout extends React.Component{
  // const classes = useStyles();
  // const imageClasses = classNames(
  //   classes.imgRaised,
  //   classes.imgRoundedCircle,
  //   classes.imgFluid
  // );

  render() {
    const {directions} = this.props;

    return (
      <div style = {{backgroundImage:"url(https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)", backgroundSize:"cover", height: "100vh", width: "100vw", overflow:"scroll"}} >
        <GridContainer>
          <div style = {{padding:25}}>
            <Button
              color="primary"
              variant = "outlined"
              round
              component={Link}
              to="/shoptimize/search"
            >
              New Grocery List
            </Button>
            <a href="/shoptimize" style={{textDecoration: "none", color: "white"}}>
              <Button
                color="danger"
                variant = "outlined"
                round
              >
                Home
              </Button>
            </a>

          </div>

          <div style = {{backgroundColor:"rgba(255,255,255,0.5)", display: "flex", flexDirection:"column", alignItems: "center"}}>

            <div style = {{textAlign:"center", color:"rgb(42,54,49"}}>
              <h1 style = {{margin: "0 auto", padding:"0 10px"}}>Get your groceries and get out...efficiently.</h1>
            </div>

            <div style={{display: "flex", justifyContent: "space-around", width: "100vw"}}>
              <div style={{margin: "0 25px"}}>
                <Canvas />
              </div>
              <div style={{textAlign: "left", marginRight: "10px"}}>
                <h4>
                  HERE ARE THE INSTRUCTIONS FOR GETTING OUT OF THIS PLACE
                </h4>
                <ul style = {{fontSize:"15px", listStyle:"none", margin: 0, padding: 0}}>
                  {directions !== undefined ? (
                    directions.map((direction, i) => (
                      <li key={i}>{i+1}) Go to the <span style={{fontWeight: "bold", color:"red"}}>{direction.toUpperCase()}</span> Section.</li>
                    ))
                  ) : ""}
                  <li style = {{fontWeight:"bold", fontSize: "20px"}}>Don't forget to pay</li>
                </ul>
              </div>
            </div>
          </div>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    directions: state.mapReducer.directions,
  };
};

export default connect(
  mapStateToProps,
  null
)(StoreLayout);
