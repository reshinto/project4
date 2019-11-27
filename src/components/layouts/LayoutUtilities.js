import {tileSize, totalWidthTiles, totalHeightTiles} from "./Constants";

export const getPositionKey = (x, y) => {
  return Math.floor(Number(x) / tileSize) + Math.floor(Number(y) / tileSize) * totalWidthTiles;
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
      x: (Number(key) % totalWidthTiles) * tileSize,
      y: Math.floor(Number(key) / totalWidthTiles) * tileSize
    };
  }
}

export const getLastKey = (_totalWidthTiles, _totalHeightTiles) => {
  const x = tileSize * _totalWidthTiles - tileSize;
  const y = tileSize * _totalHeightTiles - tileSize;
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
