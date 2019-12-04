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
import SearchHeader from "../home-components/Header/SearchHeader.js";
import { Link } from "react-router-dom";



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


    <div style = {{backgroundImage:"url(https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)", backgroundSize:"cover", minHeight: 800, overflow:"scroll"}} >

    <GridContainer>
    <div style = {{padding:25}}>

          <Button
                component={Link}
                to = "/shoptimize/search"
                color="primary"
                variant = "outlined"
                round
              >
                New Grocery List
              </Button>
            <Button
                component={Link}
                to = "/shoptimize"
                color="danger"
                variant = "outlined"
                round
              >
                Home
              </Button>


    </div>


    <div style = {{backgroundColor:"rgba(255,255,255,0.5)", margin: "0 auto"}}>



            <div style = {{textAlign:"center", color:"rgb(42,54,49"}}>
              <h1 style = {{marginTop: 0, padding:10}}>Get your groceries and get out...efficiently.</h1>
            </div>

            <Floormap/>

            <div style = {{padding:20}}>
             <h4>
                HERE ARE THE INSTRUCTIONS FOR GETTING OUT OF THIS PLACE</h4>
                <ul style = {{listStyleType:"none"}}>
                    <li>This category first</li>
                    <li>Then this other category</li>
                    <li>Don't forget to pay</li>
                </ul>
            </div>

        </div>
        </GridContainer>



    </div>
    )



}

export default StoreLayout