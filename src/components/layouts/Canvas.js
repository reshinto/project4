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
import {getImageFile, getCoordinates, getLastKey} from "./LayoutUtilities";
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
      totalWidthTiles,
      totalHeightTiles,
      mapWidth,
      mapHeight,
      g: new WeightedGraph(totalWidthTiles, totalHeightTiles),
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    ctx = canvas.getContext("2d");
    this.drawFloor();
    window.addEventListener("resize", this.updateDimensions);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  updateDimensions = async () => {
    const totalWidthTiles = Math.floor((window.innerWidth - widthPadding) / tileSize);
    const totalHeightTiles = Math.floor((window.innerHeight - heightPadding) / tileSize);
    const mapWidth = totalWidthTiles * tileSize;
    const mapHeight = totalHeightTiles * tileSize;
    const g = new WeightedGraph(totalWidthTiles, totalHeightTiles);
    await this.setStateAsync({totalWidthTiles, totalHeightTiles, mapWidth, mapHeight, g});
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
    for (let i=0; i<=getLastKey(this.state.totalWidthTiles, this.state.totalHeightTiles); i++) {
      // this.draw(i, "test");
      this.state.g.addVertex(i);
      this.fillColor(i, "grey");
    }
    this.fillColor(23, "red")
    console.log(Object.keys(this.state.g.adjacencyList).length)
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
