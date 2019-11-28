export const widthPadding = 40;
export const heightPadding = 40;
export const totalWidthTiles = 10
export const totalHeightTiles = 10
export const tileSize = (totalWidthTiles) => {
  return Math.floor((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight) / totalWidthTiles);
}
// remove excess space from map
export const mapWidth = totalWidthTiles * tileSize(totalWidthTiles) - widthPadding;
export const mapHeight = totalHeightTiles * tileSize(totalWidthTiles) - heightPadding;
