export const widthPadding = 40;
export const heightPadding = 40;
export const totalWidthTiles = 4;
export const totalHeightTiles = 4;
export const tileSize = (totalWidthTiles) => {
  return Math.floor((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight) / totalWidthTiles);
}
// remove excess space from map
export const mapWidth = totalWidthTiles * tileSize(totalWidthTiles);
export const mapHeight = totalHeightTiles * tileSize(totalWidthTiles);
