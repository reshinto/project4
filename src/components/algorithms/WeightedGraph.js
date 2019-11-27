class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
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
    if (wallArr[k1] === 1 && wallArr[k2] === 1) {
      this._addEdge(k1, k2, weight);
    }
  }

  _addWeightEdge(k1, k2, weight) {
    if (wallArr[k1] > wallArr[k2]) {
      weight = wallArr[k1];
    } else if (wallArr[k2] > wallArr[k1]) {
      weight = wallArr[k2];
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
