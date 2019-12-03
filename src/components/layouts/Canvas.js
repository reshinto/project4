import React from "react";
import {
  totalWidthTiles,
  mapWidth,
  mapHeight,
  tileSize,
  categoryMaps,
  shoppingListArr,
} from "./Constants";
import {
  // getImageFile,
  getCoordinates,
  getLastKey,
  getCategoryKeyArr,
  addConnections,
  getCategoryEdgeKeys,
} from "./LayoutUtilities";
import * as _map from "./GenerateLayout";
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
    // this.addRandomCategories();
    this.drawLayout();
    this.linkConnections();
    const path = Dijkstra(0, shoppingListArr, g);
    this.animatePath(path);
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
        // this.fillColor(i, "#D9B08C");
        this.fillColor(i, "#116466");
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
  }

  getRandomKey = () => {
    return Math.floor(Math.random() * getLastKey());
  }

  addMapCategories = () => {
    const map = _map.map2;
    for (let i=0; i<map.length; i++) {
      this.addCategory(map[i].key, map[i].w, map[i].h, map[i].name);
    }
    this.addShoppingList(map);
  }

  addShoppingList = (map) => {
    // const list = [7579, 5239, 2115, 4409, 3665];
    const list = [5420, 6420, 6065, 7579, 2115];
    for (let i=0; i<list.length; i++) {
      // shoppingListArr.push(String(map[Math.floor(Math.random() * map.length)].key));
      shoppingListArr.push(String(list[i]));
    }
    shoppingListArr.push(String(getLastKey()));
  }

  addRandomCategories = () => {
    const totalCategories = 25
    for (let i=0; i<totalCategories; i++) {
      const newKey = this.getRandomKey();
      shoppingListArr.push(String(newKey));
    }
    for (let i=0; i<totalCategories; i++) {
      this.addCategory(shoppingListArr[i], Math.ceil(Math.random() * 10) + 3, Math.ceil(Math.random() * 10) + 3, "random");
    }
    shoppingListArr.push(String(getLastKey()));
  }

  animatePath = (path) => {
    for (let i=0; i<path.length; i++) {
      ((i) => {
        setTimeout(() => {
          if (shoppingListArr.indexOf(path[i]) !== -1) {
            return this.fillColor(path[i], "red");
          } else {
            return this.fillColor(path[i], "#D1E8E2");
          }
        }, 1 * i)
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
