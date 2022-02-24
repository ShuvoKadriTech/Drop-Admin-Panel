import { toast } from "react-toastify";
import { ADD_DRIVER } from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";

// ADD PARTNER

export const addDriver = driver => async dispatch => {
  console.log("driver info", driver);
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
        type: actionType.ADD_DRIVER_REQUEST_SUCCESS,
        payload: {
          driver: data.data.driver,
          message: data.message
        }
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
