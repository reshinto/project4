import React from 'react';
import Floormap from './Floormap.js'
import Parallax from "../home-components/Parallax/Parallax.js";
import {searchBackground} from '../search-components/search-style.js'
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../home-components/Grid/GridContainer.js";
import GridItem from "../home-components/Grid/GridItem.js";
import Button from "../home-components/CustomButtons/Button.js";
import Paper from '@material-ui/core/Paper';



import styles from "../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);



function StoreLayout(){

    const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

return (
    <div>
        <Parallax filter image="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" style = {{zIndex:"0"}}>
         <div className={classes.container}>
          <GridContainer>

            <div style = {{textAlign:"justify", color:"white"}}>
              <h1 className={classes.title}>Get your groceries and get out.</h1>
              <h4>
                Your guests are showing up in an hour. You have a midnight deadline. You forgot to cook dinner for date night. Whatever the reason, you need to grab what you need and go.</h4>

              </div>


              </GridContainer>
              </div>
            </Parallax>


         <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>


            <Floormap/>


        </div>
        </div>

    </div>
    )



}

export default StoreLayout