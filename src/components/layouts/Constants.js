export const widthPadding = 100;
export const heightPadding = 100;
export const totalWidthTiles = 100;
export const totalHeightTiles = 100;
export const tileSize = (totalWidthTiles) => {
  return Math.floor((
    window.innerWidth < window.innerHeight ?
    window.innerWidth - widthPadding :
    window.innerHeight - heightPadding
  ) / totalWidthTiles);
}
// remove excess space from map
export const mapWidth = totalWidthTiles * tileSize(totalWidthTiles);
export const mapHeight = totalHeightTiles * tileSize(totalWidthTiles);
