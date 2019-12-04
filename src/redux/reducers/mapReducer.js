import * as actionTypes from "../types";
import { updateObject } from "../utility";

const initialState = {
  groceryList: [],
  mapType: ""
};

const setGroceryList = (state, action) => {
  return updateObject(state, {
    groceryList: action.payload
  });
};

const setMap = (state, action) => {
  return updateObject(state, {
    mapType: action.payload
  });
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GROCERY_LIST:
      return setGroceryList(state, action);
    case actionTypes.SET_MAP:
      return setMap(state, action);
    default:
      return state;
  }
};

export default mapReducer;
