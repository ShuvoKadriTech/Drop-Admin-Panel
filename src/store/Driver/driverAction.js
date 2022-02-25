import { toast } from "react-toastify";
import {
  ADD_DRIVER,
  EDIT_DRIVER,
  GET_ALL_DRIVERS_BY_PARTNER
} from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";

// ADD PARTNER

export const addDriver = driver => async dispatch => {
  // console.log("driver info", driver);
  // console.log("before add",partner);
  try {
    dispatch({
      type: actionType.ADD_DRIVER_REQUEST_SEND
    });

    const { data } = await requestApi().request(ADD_DRIVER, {
      method: "POST",
      data: driver
    });
    console.log("response", data);
    if (data.status) {
      toast.success(data.text, {
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
        type: actionType.ADD_DRIVER_REQUEST_SUCCESS,
        payload: data.data.driver
      });
      dispatch({
        type: actionType.SET_STATUS_FALSE
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
        type: actionType.ADD_DRIVER_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADD_DRIVER_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// GET ALL DRIVER BY PARTNER

export const getAllDriversByPartner = partnerId => async dispatch => {
  try {
    dispatch({
      type: actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_SEND
    });

    const { data } = await requestApi().request(
      GET_ALL_DRIVERS_BY_PARTNER + partnerId
    );
    console.log("response", data);
    if (data.status) {
      dispatch({
        type: actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_SUCCESS,
        payload: data.data.drivers
      });
    } else {
      dispatch({
        type: actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// EDIT DRIVER

export const editDriver = updateData => async dispatch => {
  console.log(updateData);
  try {
    dispatch({
      type: actionType.EDIT_DRIVER_REQUEST_SEND
    });

    const { data } = await requestApi().request(EDIT_DRIVER, {
      method: "POST",
      data: updateData
    });
    console.log("response", data);
    // if (data.status) {
    //   toast.success(data.text, {
    //     // position: "bottom-right",
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined
    //   });

    //   dispatch({
    //     type: actionType.ADD_DRIVER_REQUEST_SUCCESS,
    //     payload: data.data.driver
    //   });
    //   dispatch({
    //     type: actionType.SET_STATUS_FALSE
    //   });
    // } else {
    //   toast.warn(data.error, {
    //     // position: "bottom-right",
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined
    //   });
    //   dispatch({
    //     type: actionType.ADD_DRIVER_REQUEST_FAIL,
    //     payload: data.error
    //   });
    // }
  } catch (error) {
    dispatch({
      type: actionType.ADD_DRIVER_REQUEST_FAIL,
      payload: error.message
    });
  }
};
