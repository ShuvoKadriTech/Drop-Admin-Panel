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
  EDIT_COLOR_REQUEST_SEND
} from "../../actionType";

// ADD COLOR

export const addColorRequestSend = data => {
  return {
    type: ADD_COLOR_REQUEST_SEND,
    payload: data
  };
};

export const addColorRequestSuccess = message => {
  return {
    type: ADD_COLOR_REQUEST_SUCCESS,
    payload: message
  };
};

export const addColorInColorsList = newColor => {
  return {
    type: ADD_COLOR_IN_COLOR_LIST,
    payload: newColor
  };
};

export const addColorRequestFail = error => {
  return {
    type: ADD_COLOR_REQUEST_FAIL,
    payload: error
  };
};

// GET ALL COLORS

export const getColorsRequestSend = () => {
  return {
    type: GET_COLORS_REQUEST_SEND
  };
};

export const getColorsRequestSuccess = colors => {
  return {
    type: GET_COLORS_REQUEST_SUCCESS,
    payload: colors
  };
};

export const getColorsRequestFail = error => {
  return {
    type: GET_COLORS_REQUEST_FAIL,
    payload: error
  };
};

// EDIT COLOR

export const editColorRequestSend = () => {
  return {
    type: EDIT_COLOR_REQUEST_SEND
  };
};

export const editColorRequestSuccess = message => {
  return {
    type: EDIT_COLOR_REQUEST_SUCCESS,
    payload: message
  };
};
export const editColorRequestFail = error => {
  return {
    type: EDIT_COLOR_REQUEST_FAIL,
    payload: error
  };
};

// HTTP REQUEST HANDELING

// EDIT COLOR BY ID

export const editColor = (id, updateData) => async dispatch => {
  // console.log("id, updateData", id, updateData)
  dispatch(editColorRequestSend());

  const {
    data: { status, message, error }
  } = await requestApi().request(EDIT_COLOR, {
    method: "POST",
    data: {
      id: id,
      data: updateData
    }
  });
  // console.log("after data", status, message, error);
  if (status) {
    dispatch(editColorRequestSuccess(message));
  } else {
    dispatch(editColorRequestFail(error));
  }
};

// GET ALL COLOR

export const getAllColors = () => async dispatch => {
  dispatch(getColorsRequestSend());

  const { data: { status, data, error } } = await requestApi().request(
    GET_ALL_COLOR
  );
  // console.log(data);
  if (status) {
    dispatch(getColorsRequestSuccess(data));
  } else {
    dispatch(getColorsRequestFail(error));
  }
};

// ADD COLOR

export const addColor = newColor => async dispatch => {
  // console.log(newColor);
  dispatch(addColorRequestSend(newColor));

  const {
    data: { status, message, error, data }
  } = await requestApi().request(ADD_COLOR, {
    method: "POST",
    data: newColor
  });

  if (status) {
    dispatch(addColorRequestSuccess(message));
    dispatch(addColorInColorsList(data));
  } else {
    dispatch(addColorRequestFail(error));
  }
};
