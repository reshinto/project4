import React from "react";
import {
  widthPadding,
  heightPadding,
  totalWidthTiles,
  totalHeightTiles,
  mapWidth,
  mapHeight,
  tileSize
} from "./Constants";
import {
  getImageFile,
  getCoordinates,
  getLastKey,
  getCategoryKeyArr
} from "./LayoutUtilities";
import WeightedGraph from "../../algorithms/WeightedGraph";

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

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      tileSize,
      mapWidth,
      mapHeight,
      g: new WeightedGraph(totalWidthTiles, totalHeightTiles),
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    ctx = canvas.getContext("2d");
    this.drawFloor();
    this.addMapCategories();
    this.drawCategories();
    window.addEventListener("resize", this.updateDimensions);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  updateDimensions = async () => {
    const tileSize = Math.floor(window.innerWidth / totalWidthTiles);
    const mapWidth = totalWidthTiles * tileSize;
    const mapHeight = totalHeightTiles * tileSize;
    const g = new WeightedGraph(totalWidthTiles, totalHeightTiles);
    await this.setStateAsync({tileSize, mapWidth, mapHeight, g});
    this.drawFloor();
  }

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
    const {x, y} = getCoordinates(key);
    ctx.beginPath();
    ctx.rect(x, y, tileSize, tileSize);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawFloor = () => {
    for (let i=0; i<=getLastKey(totalWidthTiles, totalHeightTiles); i++) {
      // this.draw(i, "test");
      this.state.g.addVertex(i);
      this.fillColor(i, "grey");
    }
    this.fillColor(25, "red");
  }

  drawCategories = () => {
    const {wallArr} = this.state.g;
    for (let i=0; i<wallArr.length; i++) {
      if (wallArr[i] === 1) {
        this.fillColor(i, "green")
      }
    }
  }

  addCategory = (startKey, categoryWidth, categoryHeight) => {
    const catArr = getCategoryKeyArr(startKey, categoryWidth, categoryHeight);
    for (let i=0; i<catArr.length; i++) {
      this.state.g.wallArr[catArr[i]] = 1;
      // this.fillColor(catArr[i], "green")
    }
    // console.log(this.state.g.wallArr)
  }

  addMapCategories = () => {
    const w = 1;
    const h = 2;
    this.addCategory(4, w*tileSize, h*tileSize);
    // this.addCategory(30, 100, 200);
    // this.addCategory(40, 100, 200);
    // this.addCategory(90, 200, 100);
  }

  render() {
    return (
      <div style={style.root}>
        <canvas
          ref="canvas"
          width={this.state.mapWidth}
          height={this.state.mapHeight}
        >
          Your browser doesn't support the HTML5 CANVAS tag.
        </canvas>
      </div>
    )
  }
}

export default Canvas;
