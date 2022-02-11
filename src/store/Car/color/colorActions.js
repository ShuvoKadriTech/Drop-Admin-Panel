import {
  ADD_COLOR,
  DELETE_COLOR,
  EDIT_COLOR,
  GET_ALL_COLOR
} from "../../../network/Api";
import requestApi from "../../../network/httpRequest";
import {
  ADD_COLOR_REQUEST_FAIL,
  ADD_COLOR_REQUEST_SEND,
  ADD_COLOR_REQUEST_SUCCESS,
  GET_COLORS_REQUEST_SEND,
  GET_COLORS_REQUEST_SUCCESS,
  ADD_COLOR_IN_COLOR_LIST,
  GET_COLORS_REQUEST_FAIL,
  EDIT_COLOR_REQUEST_SUCCESS,
  EDIT_COLOR_REQUEST_FAIL,
  EDIT_COLOR_REQUEST_SEND,
  GET_UPDATE_COLOR_DATA
} from "../../actionType";

// ADD COLOR

export const addColor = newColor => async dispatch => {
  // console.log(newColor);
  try {
    dispatch({
      type: ADD_COLOR_REQUEST_SEND
    });

    const {
      data: { status, message, error, data }
    } = await requestApi().request(ADD_COLOR, {
      method: "POST",
      data: newColor
    });

    if (status) {
      dispatch({
        type: ADD_COLOR_REQUEST_SUCCESS,
        payload: message
      });
      dispatch({
        type: ADD_COLOR_IN_COLOR_LIST,
        payload: data
      });
    } else {
      dispatch({
        type: ADD_COLOR_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_COLOR_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// GET ALL COLOR

export const getAllColors = refresh => async (dispatch, getState) => {
  try {
    const { colors } = getState().colorReducers;

    if (colors.length <= 0 || refresh) {
      dispatch({
        type: GET_COLORS_REQUEST_SEND
      });

      const { data: { status, data, error } } = await requestApi().request(
        GET_ALL_COLOR
      );
      // console.log(data);
      if (status) {
        dispatch({
          type: GET_COLORS_REQUEST_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: GET_COLORS_REQUEST_FAIL,
          payload: error
        });
      }
    }
  } catch (error) {
    dispatch({
      type: GET_COLORS_REQUEST_FAIL,
      payload: error
    });
  }
};

// EDIT COLOR BY ID

export const editColor = updateData => async dispatch => {
  // console.log("id, updateData", id, updateData);
  try {
    dispatch({
      type: EDIT_COLOR_REQUEST_SEND
    });

    const {
      data: { status, message, data: { color } },
      error
    } = await requestApi().request(EDIT_COLOR, {
      method: "POST",
      data: updateData
    });
    // console.log("after data", color);
    if (status) {
      if (message) {
        dispatch({
          type: EDIT_COLOR_REQUEST_SUCCESS,
          payload: message
        });
      }
      if (color) {
        dispatch({
          type: GET_UPDATE_COLOR_DATA,
          payload: color
        });
      }
    } else {
      dispatch({
        type: EDIT_COLOR_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: EDIT_COLOR_REQUEST_FAIL,
      payload: error
    });
  }
};
