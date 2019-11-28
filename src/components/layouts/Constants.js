export const widthPadding = 40;
export const heightPadding = 40;
export const totalWidthTiles = 10
export const totalHeightTiles = 10
export const tileSize = Math.floor(window.innerWidth / totalWidthTiles);
// remove excess space from map
export const mapWidth = totalWidthTiles * tileSize - widthPadding;
export const mapHeight = totalHeightTiles * tileSize - heightPadding;
