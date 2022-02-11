import { ADD_YEAR, EDIT_YEAR, GET_ALL_YEARS } from "../../../network/Api";
import requestApi from "./../../../network/httpRequest";
import {
  ADD_YEAR_REQUEST_SEND,
  ADD_YEAR_REQUEST_SUCCESS,
  ADD_YEAR_REQUEST_FAIL,
  GET_ALL_YEARS_REQUEST_SEND,
  GET_ALL_YEARS_REQUEST_SUCCESS,
  GET_ALL_YEARS_REQUEST_FAIL,
  EDIT_YEAR_REQUEST_SEND,
  EDIT_YEAR_REQUEST_SUCCESS,
  EDIT_YEAR_REQUEST_FAIL,
  GET_ADDED_YEAR_DATA,
  UPDATE_EDITED_YEAR_DATA
} from "../../actionType";

// ADD YEAR

export const addYear = year => async dispatch => {
  try {
    dispatch({
      type: ADD_YEAR_REQUEST_SEND
    });

    const {
      data: { status, message, error, data }
    } = await requestApi().request(ADD_YEAR, {
      method: "POST",
      data: year
    });
    // console.log(data)
    if (status) {
      if (message) {
        dispatch({
          type: ADD_YEAR_REQUEST_SUCCESS,
          payload: message
        });
      }
      if (data) {
        dispatch({
          type: GET_ADDED_YEAR_DATA,
          payload: data
        });
      }
    } else {
      dispatch({
        type: ADD_YEAR_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_YEAR_REQUEST_FAIL,
      payload: error
    });
  }
};

// GET ALL YEARS

export const getAllYears = refresh => async (dispatch, getState) => {
  try {
    const { years } = getState().yearReducer;
    if (years.length <= 0 || refresh) {
      dispatch({
        type: GET_ALL_YEARS_REQUEST_SEND
      });

      const { data: { status, data, error } } = await requestApi().request(
        GET_ALL_YEARS
      );

      if (status) {
        dispatch({
          type: GET_ALL_YEARS_REQUEST_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: GET_ALL_YEARS_REQUEST_FAIL,
          payload: error
        });
      }
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_YEARS_REQUEST_FAIL,
      payload: error
    });
  }
};

// EDIT YEAR

export const editYear = updateData => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_YEAR_REQUEST_SEND
    });

    const {
      data: { status, message, error, data: { year } = {} }
    } = await requestApi().request(EDIT_YEAR, {
      method: "POST",
      data: updateData
    });

    if (status) {
      if (message) {
        dispatch({
          type: EDIT_YEAR_REQUEST_SUCCESS,
          payload: message
        });
      }
      if (year) {
        dispatch({
          type: UPDATE_EDITED_YEAR_DATA,
          payload: year
        });
      }
    } else {
      dispatch({
        type: EDIT_YEAR_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: EDIT_YEAR_REQUEST_FAIL,
      payload: error
    });
  }
};
