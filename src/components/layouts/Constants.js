export const widthPadding = 40;
export const heightPadding = 40;
export const tileSize = 50;
export const totalWidthTiles = Math.floor((window.innerWidth - widthPadding) / tileSize);
export const totalHeightTiles = Math.floor((window.innerHeight - heightPadding) / tileSize);
// remove excess space from map
export const mapWidth = totalWidthTiles * tileSize;
export const mapHeight = totalHeightTiles * tileSize;
