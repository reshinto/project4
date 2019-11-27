import {getLastKey} from "../components/layouts/LayoutUtilities";

class WeightedGraph {
  constructor(totalWidthTiles, totalHeightTiles) {
    this.adjacencyList = {};
    this.wallArr = new Array(getLastKey(totalWidthTiles, totalHeightTiles)).fill(null);
  }

  addVertex(vertex) {
    const key = String(vertex);
    if (!this.adjacencyList[key]) this.adjacencyList[key] = [];
  }

  addEdge(k1, k2, weight, useWeights) {
    const key1 = String(k1);
    const key2 = String(k2);
    if (!useWeights) {
      this._addWallEdge(key1, key2, weight);
    } else {
      this._addWeightEdge(key1, key2, weight);
    }
  }

  _addWallEdge(k1, k2, weight) {
    if (this.wallArr[k1] === 1 && this.wallArr[k2] === 1) {
      this._addEdge(k1, k2, weight);
    }
  }

  _addWeightEdge(k1, k2, weight) {
    if (this.wallArr[k1] > this.wallArr[k2]) {
      weight = this.wallArr[k1];
    } else if (this.wallArr[k2] > this.wallArr[k1]) {
      weight = this.wallArr[k2];
    }
    if (k2 !== -1) {
      this._addEdge(k1, k2, weight);
    }
  }

  _addEdge(k1, k2, weight) {
    this.adjacencyList[k1].push({
      node: k2,
      weight,
    });
    this.adjacencyList[k2].push({
      node: k1,
      weight,
    });
  }
}

export default WeightedGraph;
