import React from "react";
import Canvas from "../layouts/Canvas";
import GridContainer from "../home-components/Grid/GridContainer.js";
import Paper from '@material-ui/core/Paper';

const Floormap = () => (
  <div>
    <GridContainer>

        <Canvas />

    </GridContainer>
  </div>
);

export default Floormap;