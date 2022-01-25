import { Redirect } from "react-router-dom";
import { LOGIN } from "../../../network/Api";
import { createBrowserHistory } from "history";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR
} from "./actionTypes";

export const loginUser = user => {
  // console.log("request", user);
  return {
    type: LOGIN_USER,
    payload: user
  };
};

export const loginSuccess = (user, accessToken) => {
  // console.log(user);
  return {
    type: LOGIN_SUCCESS,
    payload: { user, accessToken }
  };
};

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history }
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {}
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error
  };
};

export const adminAuth = (user, history) => async (dispatch, getState) => {
  try {
    dispatch(loginUser(user));
    // console.log(JSON.stringify(user));
    const result = await fetch(LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    // console.log("result", result);
    const response = await result.json();
    // console.log(response);
    const { status, accessToken, admin, message } = response;
    if (status) {
      dispatch(loginSuccess(admin, accessToken));
    } else {
      dispatch(apiError(message));
    }
  } catch (error) {
    dispatch(apiError(error.message));
  }
};
