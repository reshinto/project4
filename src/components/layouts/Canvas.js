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
import { connect } from "react-redux";

const style = {
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex:"100"
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
    const direction = [];
    // for (let i=0; i<path.length; i++) {
    //   if (categoryMaps[path[i]] !== undefined) {
    //     if (categoryMaps[path[i]] !== "") {
    //       console.log("filtered", categoryMaps[path[i]])
    //       direction.push(categoryMaps[path[i]]);
    //     }
    //   }
    // }
    // console.log(direction)
    this.animatePath(path);
    // window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {

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
        if (categoryMaps[catArr[i]] !== name) {
          categoryMaps[catArr[i]] = name;
        }
      } else {
        g.wallArr[catArr[i]] = 5;
      }
    }
  }

  getRandomKey = () => {
    return Math.floor(Math.random() * getLastKey());
  }

  addMapCategories = () => {
    const {name: mapType} = this.props.mapType;
    if (mapType !== undefined) {
      const map = _map[mapType];
      for (let i=0; i<map.length; i++) {
        this.addCategory(map[i].key, map[i].w, map[i].h, map[i].name);
      }
      this.addShoppingList(map);
    }
  }

  addShoppingList = (map) => {
    const {category} = this.props.mapType;
    const {groceryList} = this.props;
    for (let i=0; i<groceryList.length; i++) {
      if (shoppingListArr.indexOf(String([category[groceryList[i].category]])) === -1) {
        shoppingListArr.push(String([category[groceryList[i].category]]));
      }
    }
    shoppingListArr.push(String(getLastKey()));
  }

  // addRandomCategories = () => {
  //   const totalCategories = 25
  //   for (let i=0; i<totalCategories; i++) {
  //     const newKey = this.getRandomKey();
  //     shoppingListArr.push(String(newKey));
  //   }
  //   for (let i=0; i<totalCategories; i++) {
  //     this.addCategory(shoppingListArr[i], Math.ceil(Math.random() * 10) + 3, Math.ceil(Math.random() * 10) + 3, "random");
  //   }
  //   shoppingListArr.push(String(getLastKey()));
  // }

  animatePath = (path) => {
    console.log(categoryMaps)
    for (let i=0; i<path.length; i++) {
      ((i) => {
        setTimeout(() => {
          if (shoppingListArr.indexOf(path[i]) !== -1) {
            console.log(categoryMaps[path[i]])
            return this.fillColor(path[i], "red");
          } else {
            return this.fillColor(path[i], "#D1E8E2");
          }
        }, 1 * i)
      })(i)
    }
  }

  render() {
    console.log("groceryList in canvas", this.props.groceryList)
    console.log("map name", this.props.mapType)
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

const mapStateToProps = state => {
  return {
    groceryList: state.mapReducer.groceryList,
    mapType: state.mapReducer.mapType,
  };
};

export default connect(
  mapStateToProps,
  null
)(Canvas);
