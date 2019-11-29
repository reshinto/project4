import {
  tileSize,
  mapWidth,
  mapHeight,
  totalWidthTiles,
  totalHeightTiles
} from "./Constants";

const _tileSize = tileSize(totalWidthTiles);

export const getPositionKey = (x, y) => {
  return Math.floor(Number(x) / _tileSize) + Math.floor(Number(y) / _tileSize) * totalWidthTiles;
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
  for (let i=x; i<x+categoryWidth; i=i+_tileSize) {
    for (let j=y; j<y+categoryHeight; j=j+_tileSize) {
      const currentKey = getPositionKey(i, j);
      categoryArr.push(currentKey);
    }
  }
  return categoryArr;
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
