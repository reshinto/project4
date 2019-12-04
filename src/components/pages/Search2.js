import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "../home-components/Header/Header.js";
import Footer from "../home-components/Footer/Footer.js";

import GridContainer from "../home-components/Grid/GridContainer.js";
import GridItem from "../home-components/Grid/GridItem.js";
import Button from "../home-components/CustomButtons/Button.js";
import HeaderLinks from "../home-components/Header/HeaderLinks.js";
import Parallax from "../home-components/Parallax/Parallax.js";
import Register from "../home-components/FormDialog/Register.js";


import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "../home-components/Sections/ProductSection.js";
import TeamSection from "../home-components/Sections/TeamSection.js";
import WorkSection from "../home-components/Sections/WorkSection.js";

import { Link } from "react-router-dom";

import SearchBackground from '../search-components/grocery.jpg'

import Search from './Search'

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>

      <Parallax filter image={SearchBackground}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
            <div style = {{textAlign:"justify"}}>
              <h1 className={classes.title}>Get your groceries and get out.</h1>
              </div>
              <br />


            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>



          <Search/>


        </div>
      </div>
      <Footer />
    </div>
  );
}