import {
  GET_CAR_TYPE_REQUEST_SEND,
  GET_CAR_TYPE_REQUEST_SUCCESS,
  GET_CAR_TYPE_REQUEST_FAIL,
  DELETE_CAR_TYPE_REQUEST_SEND,
  DELETE_CAR_TYPE_REQUEST_SUCCESS,
  DELETE_CAR_TYPE_REQUEST_FAIL,
  EDIT_CAR_TYPE_REQUEST_SEND,
  EDIT_CAR_TYPE_REQUEST_SUCCESS,
  EDIT_CAR_TYPE_REQUEST_FAIL,
  ADD_CAR_TYPE_REQUEST_SEND,
  ADD_CAR_TYPE_REQUEST_SUCCESS,
  ADD_CAR_TYPE_REQUEST_FAIL,
  CLEAR_SUCCESS_MESSAGE
} from "../../actionType";
import requestApi from "../../../network/httpRequest";
import carTypesReducer from "./carTypesReducer";

import {
  EDIT_CAR_TYPE,
  GET_CAR_TYPES,
  ADD_CAR_TYPE
} from "../../../network/Api";
import { toast } from "react-toastify";

// ADD CAR TYPES

export const addCarType = carData => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CAR_TYPE_REQUEST_SEND
    });

    const {
      data: { status, message, error, data }
    } = await requestApi().request(ADD_CAR_TYPE, {
      method: "POST",
      data: carData
    });

    if (status) {
      dispatch({
        type: ADD_CAR_TYPE_REQUEST_SUCCESS,
        payload: { data, message }
      });

      toast.success(data.message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      dispatch({
        type: CLEAR_SUCCESS_MESSAGE
      });
    } else {
      dispatch({
        type: ADD_CAR_TYPE_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_CAR_TYPE_REQUEST_FAIL,
      payload: error
    });
  }
};

// GET CAR TYPES

export const getCarTypes = refresh => async (dispatch, getState) => {
  try {
    const { carTypes } = getState().carTypesReducer;

    if (carTypes.length <= 0 || refresh) {
      dispatch({
        type: GET_CAR_TYPE_REQUEST_SEND
      });

      const { data: { data, status, error } } = await requestApi().request(
        GET_CAR_TYPES
      );

      if (status) {
        dispatch({
          type: GET_CAR_TYPE_REQUEST_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: GET_CAR_TYPE_REQUEST_FAIL,
          payload: error.message
        });
      }
    }
  } catch (error) {
    dispatch({
      type: GET_CAR_TYPE_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// DELETE CAR TYPES BY ID

// export const deleteCarTypeRequestSend = id => {
//   return {
//     type: DELETE_CAR_TYPE_REQUEST_SEND,
//     payload: id
//   };
// };

// export const deleteCarTypeRequestSuccess = (id, message) => {
//   return {
//     type: DELETE_CAR_TYPE_REQUEST_SUCCESS,
//     payload: { id, message }
//   };
// };

// export const deleteCarTypeRequestError = error => {
//   return {
//     type: DELETE_CAR_TYPE_REQUEST_FAIL,
//     payload: error
//   };
// };

export const editCarTypeRequestSuccess = successMessage => {
  console.logA(successMessage);
  return {
    type: EDIT_CAR_TYPE_REQUEST_SUCCESS,
    payload: successMessage
  };
};

export const editCarTypeRequestFail = error => {
  return {
    type: EDIT_CAR_TYPE_REQUEST_FAIL,
    payload: error
  };
};

// EDIT CAR TYPE

export const editCarType = carData => async dispatch => {
  // console.log("edit type", id, updateData);
  try {
    dispatch({
      type: EDIT_CAR_TYPE_REQUEST_SEND
    });

    const {
      data: { status, data }
    } = await requestApi().request(EDIT_CAR_TYPE, {
      method: "POST",
      data: carData
    });

    console.log(data);

    // if (status) {
    //   dispatch(editCarTypeRequestSuccess(message));
    // } else {
    //   dispatch(editCarTypeRequestFail(error));
    // }
  } catch (error) {
    dispatch(editCarTypeRequestFail(error));
  }
};

// HTTP REQUEST HANDELING

// ADD CAR TYPE

// export const addCarType = (newCar) => async dispatch => {
//   dispatch(addCarTypeRequestSend())

//   const { data: { status, data, message, error } } = await requestApi().request(ADD_CAR_TYPE, {
//     method: "POST",
//     data: newCar
//   });

//   if (status) {
//     dispatch(addCarTypeRequestSuccess(data, message))
//   }
//   else {
//     dispatch(addCarTypeRequestFailure(error))
//   }

// }

// DELETE CAR TYPE

// export const deleteCarType = id => async dispatch => {
//   try {
//     dispatch(deleteCarTypeRequestSend(id));
//     // id = JSON.stringify(id);
//     const {
//       data: { status, message, error }
//     } = await requestApi().request(DELETE_CAR_TYPE_PERMANENTLY, {
//       method: "POST",
//       data: {
//         id: id
//       }
//     });

//     if (status) {
//       dispatch(deleteCarTypeRequestSuccess(id, message));
//     } else {
//       dispatch(deleteCarTypeRequestError(error));
//     }
//   } catch (error) {
//     dispatch(deleteCarTypeRequestError(error));
//   }
// };
