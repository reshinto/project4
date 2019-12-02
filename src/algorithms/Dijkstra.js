import PriorityQueue from "./PriorityQueue";
import {categoryMaps} from "../components/layouts/Constants";
import {totalPath} from "../components/layouts/Constants";

function dijkstra(_start, _finish, g, path, last, isLast=true) {
  const pq = new PriorityQueue();
  const distances = {};
  const previous = {};
  if (path === undefined) {
    path = []; // to return at end
    last = _finish.pop();
  }
  let currentKey;
  const start = String(_start);
  let finishArr = _finish.slice();
  console.log(finishArr)
  let finish;

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
    const finishKeyIndex = finishArr.indexOf(currentKey);
    if (finishKeyIndex !== -1) {
      finish = finishArr.splice(finishKeyIndex, 1);
      if (currentKey === finish[0]) {
        // we are done, build up path to return at end
        while (previous[currentKey]) {
          path.push(currentKey);
          currentKey = previous[currentKey];
        }
        break;
      }
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
  for (let i=0; i<path.length; i++) {
    totalPath.push(path[i])
  }
  if (finishArr.length > 0) {
    dijkstra(finish[0], finishArr, g, path, last);
  } else {
    if (isLast === true) {
      dijkstra(finish[0], [last], g, path, last, isLast=false);
    }
  }
  return totalPath;
}

export default dijkstra;
