import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import uiReducer from "./reducers/uiReducer";
import mapReducer from "./reducers/mapReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  authReducer,
  uiReducer,
  mapReducer,
});

const enhancer = composeWithDevTools(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
