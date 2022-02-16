import {
  GET_CAR_TYPES_REQUEST_SEND,
  GET_CAR_TYPES_REQUEST_SUCCESS,
  GET_CAR_TYPES_REQUEST_FAIL,
  DELETE_CAR_TYPE_REQUEST_SEND,
  DELETE_CAR_TYPE_REQUEST_SUCCESS,
  DELETE_CAR_TYPE_REQUEST_FAIL,
  EDIT_CAR_TYPE_REQUEST_SEND,
  EDIT_CAR_TYPE_REQUEST_SUCCESS,
  EDIT_CAR_TYPE_REQUEST_FAIL,
  ADD_CAR_TYPE_REQUEST_SEND,
  ADD_CAR_TYPE_REQUEST_SUCCESS,
  ADD_CAR_TYPE_REQUEST_FAIL,
  CLEAR_SUCCESS_MESSAGE,
  GET_UPDATE_CAR_DATA,
  GET_CAR_TYPE_REQUEST_SEND,
  GET_CAR_TYPE_REQUEST_SUCCESS,
  GET_CAR_TYPE_REQUEST_FAIL
} from "../../actionType";
import requestApi from "../../../network/httpRequest";
import carTypesReducer from "./carTypesReducer";

import {
  EDIT_CAR_TYPE,
  GET_CAR_TYPES,
  ADD_CAR_TYPE,
  GET_CAR_TYPE,
  GET_SINGLE_CAR_TYPE
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
        type: ADD_CAR_TYPE_REQUEST_SUCCESS,
        payload: { data, message }
      });

      

      dispatch({
        type: CLEAR_SUCCESS_MESSAGE
      });
    } else {
      toast.warn(data.error, {
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

export const getCarTypes = (refresh = false) => async (dispatch, getState) => {
  try {
    const { carTypes } = getState().carTypesReducer;

    if (carTypes.length <= 0 || refresh) {
      dispatch({
        type: GET_CAR_TYPES_REQUEST_SEND
      });

      const { data: { data, status, error } } = await requestApi().request(
        GET_CAR_TYPES
      );

      if (status) {
        dispatch({
          type: GET_CAR_TYPES_REQUEST_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: GET_CAR_TYPES_REQUEST_FAIL,
          payload: error
        });
      }
    }
  } catch (error) {
    dispatch({
      type: GET_CAR_TYPES_REQUEST_FAIL,
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

// EDIT CAR TYPE

export const editCarType = carData => async dispatch => {
  try {
    dispatch({
      type: EDIT_CAR_TYPE_REQUEST_SEND
    });

    const { data } = await requestApi().request(EDIT_CAR_TYPE, {
      method: "POST",
      data: carData
    });

    console.log(data);

    if (data.status) {
      if (data.message) {
        dispatch({
          type: EDIT_CAR_TYPE_REQUEST_SUCCESS,
          payload: data.message
        });
      }
      if (data.data.carType) {
        dispatch({
          type: GET_UPDATE_CAR_DATA,
          payload: data.data.carType
        });
      }
    } else {
      dispatch({
        type: EDIT_CAR_TYPE_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch(
      dispatch({
        type: EDIT_CAR_TYPE_REQUEST_FAIL,
        payload: error.message
      })
    );
  }
};

// // GET SINGLE CAR TYPE

// export const getCarType = typeId => async (dispatch, getState) => {
//   try {
//     const { carType } = getState().carTypesReducer;

//     if (carType == null || carType == {}) {
//       dispatch({
//         type: GET_CAR_TYPE_REQUEST_SEND
//       });

//       const { data } = await requestApi().request(GET_SINGLE_CAR_TYPE, {
//         params: typeId
//       });

//       console.log(data);

//       if (data.status) {
//         dispatch({
//           type: GET_CAR_TYPE_REQUEST_SUCCESS,
//           payload: data.data.carType
//         });
//       } else {
//         dispatch({
//           type: GET_CAR_TYPE_REQUEST_FAIL,
//           payload: data.error
//         });
//       }
//     }
//   } catch (error) {
//     dispatch({
//       type: GET_CAR_TYPE_REQUEST_FAIL,
//       payload: error.message
//     });
//   }
// };
