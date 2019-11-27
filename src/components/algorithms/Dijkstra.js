import PriorityQueue from "./PriorityQueue";

function dijkstra(start, finish, g, animate = true) {
  const nodes = new PriorityQueue();
  const distances = {};
  const previous = {};
  let path = []; // to return at end
  let smallest;
  let animationCount = 0;

  // build up initial state
  Object.keys(g.adjacencyList).forEach(function(vertex) {
    // for (const vertex in this.adjacencyList) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      nodes.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  });
  // }

  // as long as there is something to visit
  while (nodes.values.length) {
    smallest = nodes.dequeue().value;
    // if (animate === true) {
    //   animateSearch(smallest, animationCount);
    //   animationCount++;
    // }
    if (smallest === finish) {
      // we are done, build up path to return at end
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      break;
    }
    if (smallest || distances[smallest] !== Infinity) {
      // i = neighbor
      for (let i = 0; i < g.adjacencyList[smallest].length; i++) {
        // find neighboring node
        const nextNode = g.adjacencyList[smallest][i];
        // calculate new distance to neighboring node
        const candidate = distances[smallest] + nextNode.weight;
        const nextNeighbor = nextNode.node;
        if (candidate < distances[nextNode.node]) {
          // updating new smallest distance to neighbor
          distances[nextNeighbor] = candidate;
          // updating previous - how we got to neighbor
          previous[nextNeighbor] = smallest;
          // enqueue in priority queue with new priority
          nodes.enqueue(nextNeighbor, candidate);
        }
      }
    }
  }
  path = path.concat(smallest).reverse();
  return path;
}

export default dijkstra;
