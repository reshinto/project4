import {
  tileSize,
  mapWidth,
  mapHeight,
  totalWidthTiles,
  totalHeightTiles,
  categoryWidthTiles,
  categoryHeightTiles,
} from "./Constants";

const _tileSize = tileSize(totalWidthTiles);

export const getPositionKey = (x, y, coords=true, _totalWidthTiles=totalWidthTiles) => {
  if (coords === true) {
    return Math.floor(Number(x) / _tileSize) + Math.floor(Number(y) / _tileSize) * _totalWidthTiles;
  } else {
    return Number(x) + Number(y) * _totalWidthTiles;
  }
};

export const getCoordinates = (key, actual=true) => {
  if (actual === false) {
    // get x, y nested array indexes
    return {
      x: Number(key) % totalWidthTiles,
      y: Math.floor(key / totalWidthTiles)
    };
  } else {
    // get top left x, y actual coordinates
    return {
      x: (Number(key) % totalWidthTiles) * _tileSize,
      y: Math.floor(Number(key) / totalWidthTiles) * _tileSize
    };
  }
}

export const getLastKey = () => {
  const x = _tileSize * totalWidthTiles - _tileSize;
  const y = _tileSize * totalHeightTiles - _tileSize;
  return getPositionKey(x, y);
}

export const getImageFile = (type) => {
  switch (type) {
    case "test":
      return "https://jmd.im/wp-content/uploads/2017/06/blackiv_thumbnail.jpg";
    default:
      return "";
  }
}

/**
 * Get area of key values of 1 category type
 *
 * @name getCategoryKeyArr
 * @function
 * @param {integer} startKey Input the Canvas key position to start the area calculation
 * @param {integer} categoryWidth Input the category width value: number of tiles * tileSize
 * @param {integer} categoryHeight Input the category height value: number of tiles * tileSize
 * @returns {array of integers} returns an array of keys which a category would cover in the canvas
 */
export const getCategoryKeyArr = (startKey, categoryWidth, categoryHeight) =>  {
  const categoryArr = [];
  const {x, y} = getCoordinates(startKey);
  for (let i=x; i<x+categoryWidth*_tileSize; i=i+_tileSize) {
    for (let j=y; j<y+categoryHeight*_tileSize; j=j+_tileSize) {
      const currentKey = getPositionKey(i, j);
      categoryArr.push(currentKey);
    }
  }
  return categoryArr.sort((a, b) => a - b);
}

export const getCategoryEdgeKeys = (key) => {
  const catArr = getCategoryKeyArr(key, 3, 3);
  const tmpArr = [...Array(catArr.length).keys()];
  const k = 0;  // current temp key
  const lK = tmpArr.length - 1;  // temp last key
  const rTK = categoryWidthTiles - 1;  // temp right top key
  const lBK = lK - categoryWidthTiles + 1;  // temp left bottom key
  const categoryEdgeArr = [];
  // loop through the tmpArr to calculate the actual keys edges
  for (let i=0; i<categoryWidthTiles; i++) {
    for (let j=0; j<categoryHeightTiles; j++) {
      const ck = getPositionKey(i, j, false, categoryWidthTiles);
      if (ck === k || ck === rTK || ck === lK || ck === lBK ||
        (ck > k && ck < rTK) ||
        (ck !== rTK && ck !== lK && (ck + 1) % categoryWidthTiles === 0) ||
        (ck > lBK && ck < lK) ||
        (ck !== 0 && ck !== lBK && ck % categoryWidthTiles === 0)
      ) {
        categoryEdgeArr.push(catArr[ck]);
      }
    }
  }
  return categoryEdgeArr.sort((a, b) => a - b);
}

export const getBottomLeftTopRightCoords = () => {
  const topRight = totalWidthTiles - 1;
  const bottomLeft = totalWidthTiles * totalHeightTiles - totalWidthTiles;
  return [topRight, bottomLeft];
}

export const addConnections = (g, key, w) => {
  const k = key;
  // console.log(mapWidth)
  // const kx = mapWidth;
  const kx = totalWidthTiles;
  const lastK = getLastKey();
  const [rightTopK, leftBottomK] = getBottomLeftTopRightCoords();
  if (k === 0) {
    // top left
    g.addEdge(k, k + 1, w); // connect right
    g.addEdge(k, k + kx, w); // connect bottom
  } else if (k === rightTopK) {
    // top right
    g.addEdge(k, k + kx, w); // connect bottom
    g.addEdge(k, k - 1, w); // connect left
  } else if (k === lastK) {
    // bottom right
    g.addEdge(k, k - kx, w); // connect top
    g.addEdge(k, k - 1, w); // connect left
  } else if (k === leftBottomK) {
    // bottom left
    g.addEdge(k, k - kx, w); // connect top
    g.addEdge(k, k + 1, w); // connect right
  } else if (k > 0 && k < rightTopK) {
    // top
    g.addEdge(k, k + 1, w); // connect right
    g.addEdge(k, k + kx, w); // connect bottom
    g.addEdge(k, k - 1, w); // connect left
  } else if (k !== rightTopK && k !== lastK && (k + 1) % totalWidthTiles === 0) {
    // right
    g.addEdge(k, k - kx, w); // connect top
    g.addEdge(k, k + kx, w); // connect bottom
    g.addEdge(k, k - 1, w); // connect left
  } else if (k > leftBottomK && k < lastK) {
    // bottom
    g.addEdge(k, k - kx, w); // connect top
    g.addEdge(k, k + 1, w); // connect right
    g.addEdge(k, k - 1, w); // connect left
  } else if (k !== 0 && k !== leftBottomK && k % totalWidthTiles === 0) {
    // left
    g.addEdge(k, k - kx, w); // connect top
    g.addEdge(k, k + 1, w); // connect right
    g.addEdge(k, k + kx, w); // connect bottom
  } else {
    g.addEdge(k, k - kx, w); // connect top
    g.addEdge(k, k + 1, w); // connect right
    g.addEdge(k, k + kx, w); // connect bottom
    g.addEdge(k, k - 1, w); // connect left
  }
}
