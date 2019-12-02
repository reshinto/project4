import {getLastKey} from "../components/layouts/LayoutUtilities";

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
    this.wallArr = new Array(getLastKey()+1).fill(1);
  }

  addVertex(vertex) {
    const key = String(vertex);
    if (!this.adjacencyList[key]) this.adjacencyList[key] = [];
  }

  addEdge(k1, k2, weight) {
    const key1 = String(k1);
    const key2 = String(k2);
    this._addWallEdge(key1, key2, weight);
  }

  _addWallEdge(k1, k2, weight) {
    if ((this.wallArr[k1] === 1 || this.wallArr[k1] === 2) &&
      (this.wallArr[k2] === 1 || this.wallArr[k2] === 2)) {
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
