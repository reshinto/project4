import React from "react";
import {
  totalWidthTiles,
  totalHeightTiles,
  mapWidth,
  mapHeight,
  tileSize,
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
import { setDirections } from "../../redux/actions/mapAction";

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
let shoppingListArr;

class Canvas extends React.Component {
  constructor() {
    super();
    this.g = new WeightedGraph();
    this.path = "";
  }
  state = {
    tileSize: tileSize(totalWidthTiles),
    catKeyArr: [],
  }

  componentDidMount() {
    shoppingListArr = [];
    const canvas = this.refs.canvas;
    ctx = canvas.getContext("2d");
    // this.clearFloor();
    this.addMapCategories();
    // this.addRandomCategories();
    this.drawLayout();
    this.linkConnections();
    this.path = Dijkstra(0, shoppingListArr, this.g);
    this.getDirections(this.path);
    this.animatePath(this.path);
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

//   clearFloor = () => {
//     ctx.clearRect(0, 0, totalWidthTiles*tileSize, totalHeightTiles*tileSize);
//   }

  drawLayout = () => {
    for (let i=0; i<this.g.wallArr.length; i++) {
      this.g.addVertex(i);
      // wall
      if (this.g.wallArr[i] === 5) {
        this.fillColor(i, "#2c3531");
        // floor
      } else if (this.g.wallArr[i] === 1) {
        this.fillColor(i, "#116466");
        // category
      } else if (this.g.wallArr[i] === 2) {
        // this.fillColor(i, "#D9B08C");
        this.fillColor(i, "#116466");
      }
    }
  }

  linkConnections = () => {
    const weight = 5;
    for (let i=0; i<this.g.wallArr.length; i++) {
      addConnections(this.g, i, weight);
    }
  }

   addCategory = (startKey, categoryWidth, categoryHeight, name) => {
    const catArr = getCategoryKeyArr(startKey, categoryWidth, categoryHeight);
    const catEdgeArr = getCategoryEdgeKeys(startKey, categoryWidth, categoryHeight);
    for (let i=0; i<catArr.length; i++) {
      if (catEdgeArr.indexOf(catArr[i]) !== -1) {
        this.g.wallArr[catArr[i]] = 2;
      } else {
        this.g.wallArr[catArr[i]] = 5;
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
      const mapArr = Object.keys(map);
      for (let i=0; i<mapArr.length; i++) {
        this.addCategory(mapArr[i], map[Number(mapArr[i])].w, map[Number(mapArr[i])].h, map[Number(mapArr[i])].name);
      }
      this.addShoppingList();
    }
  }

  addShoppingList = () => {
    shoppingListArr = [];
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
    for (let i=0; i<path.length; i++) {
      ((i) => {
        setTimeout(() => {
          if (shoppingListArr.indexOf(path[i]) !== -1) {
            return this.fillColor(path[i], "red");
          } else {
            return this.fillColor(path[i], "#D1E8E2");
          }
        }, 5 * i)
      })(i)
    }
  }

  getDirections = (path) => {
    const directions = [];
    for (let i=0; i<path.length; i++) {
      if (shoppingListArr.indexOf(path[i]) !== -1) {
        const {name: mapType} = this.props.mapType;
        const map = _map[mapType];
        directions.push(map[path[i]].name);
      }
    }
    const uniqueDirections = [...new Set(directions)];
    this.props.setDirections(uniqueDirections);
    return uniqueDirections;
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

const mapStateToProps = state => {
  return {
    groceryList: state.mapReducer.groceryList,
    mapType: state.mapReducer.mapType,
    directions: state.mapReducer.directions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDirections: (directionArr) => dispatch(setDirections(directionArr))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
