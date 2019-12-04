import React from "react";
import Floormap from "./Floormap.js"
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
import { connect } from "react-redux";


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
      <div style = {{backgroundImage:"url(https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)", backgroundSize:"cover", minHeight: 800, overflow:"scroll"}} >
        <GridContainer>
        <div style = {{padding:25}}>
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

        <div style = {{backgroundColor:"rgba(255,255,255,0.5)", margin: "0 auto"}}>

          <div style = {{textAlign:"center", color:"rgb(42,54,49"}}>
            <h1 style = {{marginTop: 0, padding:10}}>Get your groceries and get out...efficiently.</h1>
          </div>

          <Floormap/>

          <h4>
            HERE ARE THE INSTRUCTIONS FOR GETTING OUT OF THIS PLACE</h4>
            <ul style = {{listStyleType:"none"}}>
              {directions !== undefined ? (
                directions.map((direction, i) => (
                  <li key={i}>{i+1}) Go to <span style={{fontWeight: "bold"}}>{direction.toUpperCase()}</span> Section.</li>
                ))
              ) : ""}
              <li>Don"t forget to pay</li>
            </ul>
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
