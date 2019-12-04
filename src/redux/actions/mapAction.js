import * as actionTypes from "../types";

export const setGroceryList = list => {
  return {
    type: actionTypes.SET_GROCERY_LIST,
    payload: list
  }
};

export const setMap = mapName => {
  return {
    type: actionTypes.SET_MAP,
    payload: mapName
  }
};
