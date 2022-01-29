import {
  GET_CAR_TYPE_REQUEST_SEND,
  GET_CAR_TYPE_REQUEST_SUCCESS,
  GET_CAR_TYPE_REQUEST_FAIL,
  DELETE_CAR_TYPE_REQUEST_SEND,
  DELETE_CAR_TYPE_REQUEST_SUCCESS,
  DELETE_CAR_TYPE_REQUEST_FAIL,
  EDIT_CAR_TYPE_REQUEST_SEND,
  EDIT_CAR_TYPE_REQUEST_SUCCESS,
  EDIT_CAR_TYPE_REQUEST_FAIL
} from "../actionType";
import requestApi from "../../network/httpRequest";

import {
  DELETE_CAR_TYPE,
  DELETE_CAR_TYPE_PERMANENTLY,
  EDIT_CAR_TYPE,
  GET_CAR_TYPES
} from "../../network/Api";

// GET CAR TYPES

export const getCarTypeRequestSend = () => {
  return {
    type: GET_CAR_TYPE_REQUEST_SEND
  };
};

export const getCarTypeRequestSuccess = carTypes => {
  return {
    type: GET_CAR_TYPE_REQUEST_SUCCESS,
    payload: carTypes
  };
};

export const getCarTypeRequestFailure = error => {
  return {
    type: GET_CAR_TYPE_REQUEST_FAIL,
    payload: error
  };
};

// DELETE CAR TYPES BY ID

export const deleteCarTypeRequestSend = id => {
  return {
    type: DELETE_CAR_TYPE_REQUEST_SEND,
    payload: id
  };
};

export const deleteCarTypeRequestSuccess = (id, message) => {
  return {
    type: DELETE_CAR_TYPE_REQUEST_SUCCESS,
    payload: { id, message }
  };
};

export const deleteCarTypeRequestError = error => {
  return {
    type: DELETE_CAR_TYPE_REQUEST_FAIL,
    payload: error
  };
};

// EDIT CAR TYPE

export const editCarTypeRequestSend = (id, updateData) => {
  return {
    type: EDIT_CAR_TYPE_REQUEST_SEND,
    payload: { id, updateData }
  };
};

export const editCarTypeRequestSuccess = (updateData, successMessage) => {
  return {
    type: EDIT_CAR_TYPE_REQUEST_SUCCESS,
    payload: { updateData, successMessage }
  };
};

export const editCarTypeRequestFail = error => {
  return {
    type: EDIT_CAR_TYPE_REQUEST_FAIL,
    payload: error
  };
};

// HTTP REQUEST HANDELING

// EDIT CAR TYPE

export const editCarType = (id, updateData) => async dispatch => {
  // console.log("edit type", id, updateData);
  try {
    dispatch(editCarTypeRequestSend(id, updateData));

    const {
      data: { status, message, error }
    } = await requestApi().request(EDIT_CAR_TYPE, {
      method: "POST",
      data: {
        id: id,
        data: updateData
      }
    });

    if (status) {
      dispatch(editCarTypeRequestSuccess(updateData, message));
    } else {
      dispatch(editCarTypeRequestFail(error));
    }
  } catch (error) {
    dispatch(editCarTypeRequestFail(error));
  }
};

// DELETE CAR TYPE

export const deleteCarType = id => async dispatch => {
  try {
    dispatch(deleteCarTypeRequestSend(id));
    // id = JSON.stringify(id);
    const {
      data: { status, message, error }
    } = await requestApi().request(DELETE_CAR_TYPE_PERMANENTLY, {
      method: "POST",
      data: {
        id: id
      }
    });

    if (status) {
      dispatch(deleteCarTypeRequestSuccess(id, message));
    } else {
      dispatch(deleteCarTypeRequestError(error));
    }
  } catch (error) {
    dispatch(deleteCarTypeRequestError(error));
  }
};

export const getCarTypes = () => async dispatch => {
  try {
    dispatch(getCarTypeRequestSend());

    const { data: { data, status, error } } = await requestApi().request(
      GET_CAR_TYPES
    );

    if (status) {
      dispatch(getCarTypeRequestSuccess(data));
    } else {
      dispatch(getCarTypeRequestFailure(error));
    }
  } catch (error) {
    console.log(error);
    dispatch(getCarTypeRequestFailure(error));
  }
};
