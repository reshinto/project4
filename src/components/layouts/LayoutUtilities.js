import {tileSize, totalWidthTiles, totalHeightTiles} from "./Constants";

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

export const getLastKey = (_totalWidthTiles, _totalHeightTiles) => {
  const x = _tileSize * _totalWidthTiles - _tileSize;
  const y = _tileSize * _totalHeightTiles - _tileSize;
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

export const getCategoryKeyArr = (startKey,categoryWidth, categoryHeight) =>  {
  const categoryArr = [];
  const {x, y} = getCoordinates(startKey);
  for (let i=x; i<x+categoryWidth; i=i+_tileSize) {
    console.log(i)
    for (let j=y; j<y+categoryHeight; j=j+_tileSize) {
      console.log(j)
      const currentKey = getPositionKey(i, j);
      console.log(currentKey);
      categoryArr.push(currentKey);
    }
  }
  return categoryArr;
}
