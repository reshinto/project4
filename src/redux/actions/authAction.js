import axios from "axios";
import * as actionTypes from "../types";
import { db } from "../utility";

export const login = (userData) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios
    .post(`${db}/login`, userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      // dispatch(getUserData());
      dispatch({ type: actionTypes.CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signup = (newUserData) => (dispatch) => {
  console.log(newUserData)
  console.log(db)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  dispatch({ type: actionTypes.LOADING_UI });
  axios
    .post(`${db}/signup`, newUserData, config)
    .then((res) => {
      console.log(res)
      setAuthorizationHeader(res.data.token);
      // dispatch(getUserData());
      dispatch({ type: actionTypes.CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: actionTypes.SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_USER });
  axios
    .get(`${db}/user`)
    .then((res) => {
      dispatch({
        type: actionTypes.SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
