import React from "react";
import {
  totalWidthTiles,
  totalHeightTiles,
  mapWidth,
  mapHeight,
  tileSize,
  categoryMaps,
  categoryKeyArr,
  totalPath,
} from "./Constants";
import {
  // getImageFile,
  getCoordinates,
  getLastKey,
  getCategoryKeyArr,
  addConnections,
  getCategoryEdgeKeys,
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
  state = {
    tileSize: tileSize(totalWidthTiles),
    catKeyArr: [],
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    ctx = canvas.getContext("2d");
    g = new WeightedGraph();
    this.addMapCategories();
    this.drawLayout();
    this.linkConnections();
    const path = Dijkstra(0, categoryKeyArr, g);
    this.animatePath(totalPath);
    // window.addEventListener("resize", this.updateDimensions);
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  drawPath = (path) => {
    for (let i=0; i<path.length; i++) {
      this.fillColor(path[i], "#D1E8E2");
    }
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
      // wall
      if (g.wallArr[i] === 5) {
        this.fillColor(i, "#2c3531");
        // floor
      } else if (g.wallArr[i] === 1) {
        this.fillColor(i, "#116466");
        // category
      } else if (g.wallArr[i] === 2) {
        this.fillColor(i, "#D9B08C");
      }
    }
  }

  linkConnections = () => {
    const weight = 5;
    for (let i=0; i<g.wallArr.length; i++) {
      addConnections(g, i, weight);
    }
  }

  addCategory = (startKey, categoryWidth, categoryHeight, name) => {
    const catArr = getCategoryKeyArr(startKey, categoryWidth, categoryHeight);
    const catEdgeArr = getCategoryEdgeKeys(startKey, categoryWidth, categoryHeight);
    for (let i=0; i<catArr.length; i++) {
      if (catEdgeArr.indexOf(catArr[i]) !== -1) {
        g.wallArr[catArr[i]] = 2;
        categoryMaps[catArr[i]] = name;
      } else {
        g.wallArr[catArr[i]] = 5;
      }
    }
    // console.log(categoryMaps)
  }

  getRandomKey = () => {
    return Math.floor(Math.random() * getLastKey());
  }

  addMapCategories = () => {
    for (let i=0; i<8; i++) {
      const newKey = this.getRandomKey();
      categoryKeyArr.push(String(newKey));
    }
    categoryKeyArr.push(String(getLastKey()));
    console.log(categoryKeyArr);
    this.addCategory(Number(categoryKeyArr[0]), 5, 17, "fruits");
    this.addCategory(Number(categoryKeyArr[1]), 5, 12, "vegetables");
    this.addCategory(Number(categoryKeyArr[2]), 5, 17, "meats");
    this.addCategory(Number(categoryKeyArr[3]), 6, 14, "frozen food");
    this.addCategory(Number(categoryKeyArr[4]), 7, 12, "japanese");
    this.addCategory(Number(categoryKeyArr[5]), 5, 12, "french");
    this.addCategory(Number(categoryKeyArr[6]), 12, 7, "can foods");
    this.addCategory(Number(categoryKeyArr[7]), 7, 4, "lala land");
  }

  animatePath = (path) => {
    for (let i=0; i<path.length; i++) {
      ((i) => {
        setTimeout(() => this.fillColor(path[i], "#D1E8E2"), 10 * i)
      })(i)
    }
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
