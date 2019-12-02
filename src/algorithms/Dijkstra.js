import PriorityQueue from "./PriorityQueue";

//TODO fix path issue
function dijkstra(_start, _finish, g) {
  const pq = new PriorityQueue();
  const distances = {};
  const previous = {};
  let path = []; // to return at end
  let currentKey;
  const start = String(_start);
  const finish = String(_finish);

  // build up initial state
  Object.keys(g.adjacencyList).forEach(function(_key) {
    if (_key === start) {
      distances[_key] = 0;
      pq.enqueue(_key, 0);
    } else {
      distances[_key] = Infinity;
      pq.enqueue(_key, Infinity);
    }
    previous[_key] = null;
  });
  // as long as there is something to visit
  while (pq.values.length) {
    currentKey = pq.dequeue().value;
    if (currentKey === finish) {
      // we are done, build up path to return at end
      while (previous[currentKey]) {
        path.push(currentKey);
        currentKey = previous[currentKey];
      }
      break;
    }
    if (currentKey || distances[currentKey] !== Infinity) {
      for (let i = 0; i < g.adjacencyList[currentKey].length; i++) {
        // find neighboring node
        const nextNode = g.adjacencyList[currentKey][i];
        // calculate new distance to neighboring node
        const candidate = distances[currentKey] + nextNode.weight;
        const nextNeighbor = nextNode.node;
        if (candidate < distances[nextNode.node]) {
          // updating new currentKey distance to neighbor
          distances[nextNeighbor] = candidate;
          // updating previous - how we got to neighbor
          previous[nextNeighbor] = currentKey;
          // enqueue in priority queue with new priority
          pq.enqueue(nextNeighbor, candidate);
        }
      }
    }
  }
  path = path.concat(currentKey).reverse();
  return path;
}

export default dijkstra;
