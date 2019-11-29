import React from "react";
import {
  totalWidthTiles,
  totalHeightTiles,
  mapWidth,
  mapHeight,
  tileSize
} from "./Constants";
import {
  // getImageFile,
  getCoordinates,
  // getLastKey,
  getCategoryKeyArr,
  addConnections,
} from "./LayoutUtilities";
import WeightedGraph from "../../algorithms/WeightedGraph";
import Dijkstra from "../../algorithms/Dijkstra";

const style = {
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}

let ctx;
let g;

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      tileSize: tileSize(totalWidthTiles),
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    ctx = canvas.getContext("2d");
    g = new WeightedGraph();
    this.addMapCategories();
    this.drawLayout();
    this.linkConnections();
    console.log(g.adjacencyList)
    const path = Dijkstra(12, 3, g);
    console.log(path)
    // window.addEventListener("resize", this.updateDimensions);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  // updateDimensions = async () => {
  //   const {tileSize} = this.state;
  //   // const tileSize = Math.floor(window.innerWidth / totalWidthTiles);
  //   const mapWidth = totalWidthTiles * tileSize;
  //   const mapHeight = totalHeightTiles * tileSize;
  //   const g = new WeightedGraph(totalWidthTiles, totalHeightTiles);
  //   await this.setStateAsync({tileSize, mapWidth, mapHeight, g});
  //   this.drawFloor();
  // }

  // draw = (key, type) => {
  //   const {x, y} = getCoordinates(Number(key));
  //   const imageFile = getImageFile(type);
  //   const img = new Image();
  //   img.onload = () => {
  //     ctx.drawImage(img, x, y, tileSize, tileSize);
  //   }
  //   img.src = imageFile;
  // }

  fillColor = (key, color) => {
    const {tileSize} = this.state;
    const {x, y} = getCoordinates(key);
    ctx.beginPath();
    ctx.rect(x, y, tileSize, tileSize);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawLayout = () => {
    for (let i=0; i<g.wallArr.length; i++) {
      g.addVertex(i);
      if (g.wallArr[i] === 5) {
        this.fillColor(i, "green");
      } else if (g.wallArr[i] === 1) {
        this.fillColor(i, "grey");
      }
    }
  }

  linkConnections = () => {
    const weight = 5;
    for (let i=0; i<g.wallArr.length; i++) {
      // if (g.wallArr[i] === null) {
        addConnections(g, i, weight);
      // }
    }
  }

  addCategory = (startKey, categoryWidth, categoryHeight) => {
    const {tileSize} = this.state;
    const catArr = getCategoryKeyArr(startKey, categoryWidth*tileSize, categoryHeight*tileSize);
    console.log(catArr)
    for (let i=0; i<catArr.length; i++) {
      g.wallArr[catArr[i]] = 5;
      // this.fillColor(catArr[i], "green")
    }
    // console.log(this.state.g.wallArr)
  }

  addMapCategories = () => {
    this.addCategory(4, 1, 2);
    this.addCategory(10, 1, 2);
    // this.addCategory(55, 2, 1);
  }

  render() {
    return (
      <div style={style.root}>
        <canvas
          ref="canvas"
          width={mapWidth}
          height={mapHeight}
        >
          Your browser doesn't support the HTML5 CANVAS tag.
        </canvas>
      </div>
    )
  }
}

export default Canvas;
