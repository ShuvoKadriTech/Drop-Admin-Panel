import {
  GET_CAR_TYPE_REQUEST_SEND,
  GET_CAR_TYPE_REQUEST_SUCCESS,
  GET_CAR_TYPE_REQUEST_FAIL
} from "../actionType";
import requestApi from "../../network/httpRequest";

import { GET_CAR_TYPES } from "../../network/Api";

export const getCarTypeRequestSend = loading => {
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

// HTTP REQUEST HANDELING

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
