export const widthPadding = 40;
export const heightPadding = 40;
export const totalWidthTiles = 100;
export const totalHeightTiles = 100;
export const tileSize = (totalWidthTiles) => {
  return Math.floor((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight) / totalWidthTiles);
}
// number of tiles for 1 category
export const categoryWidthTiles = 3;
export const categoryHeightTiles = 3;
// remove excess space from map
export const mapWidth = totalWidthTiles * tileSize(totalWidthTiles);
export const mapHeight = totalHeightTiles * tileSize(totalWidthTiles);
