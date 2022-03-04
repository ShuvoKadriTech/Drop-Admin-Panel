import { toast } from "react-toastify";
import {
  ADD_DRIVER,
  ALL_DRIVERS,
  EDIT_DRIVER,
  GET_ALL_DRIVERS_BY_PARTNER
} from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";

// ADD PARTNER

// export const addDriver = driver => async dispatch => {
//   // console.log("driver info", driver);
//   // console.log("before add",partner);
//   try {
//     dispatch({
//       type: actionType.ADD_DRIVER_REQUEST_SEND
//     });

//     const { data } = await requestApi().request(ADD_DRIVER, {
//       method: "POST",
//       data: driver
//     });
//     console.log("|===================",data)
//     console.log("response", data);
//     if (data.status) {
//       toast.success(data.text, {
//         // position: "bottom-right",
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//       });

//       dispatch({
//         type: actionType.ADD_DRIVER_REQUEST_SUCCESS,
//         payload: data.data.driver
//       });
//       dispatch({
//         type: actionType.SET_STATUS_FALSE
//       });
//     } else {
//       toast.warn(data.error, {
//         // position: "bottom-right",
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//       });
//       dispatch({
//         type: actionType.ADD_DRIVER_REQUEST_FAIL,
//         payload: data.error
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionType.ADD_DRIVER_REQUEST_FAIL,
//       payload: error.message
//     });
//   }
// };

// GET ALL DRIVERS

export const allDrivers = (refresh = false, page = 1) => async (
  dispatch,
  getState
) => {
  try {
    const {
      drivers,
      searchKey,
      statusKey,
      createdByKey
    } = getState().driverReducer;

    if (drivers.length <= 0 || refresh) {
      dispatch({
        type: actionType.GET_ALL_DRIVERS_REQUEST_SEND
      });

      const { data } = await requestApi().request(ALL_DRIVERS, {
        params: {
          // searchKey: searchKey,
          page: page,
          pageSize: 10
          // status: statusKey,
          // createdBy: createdByKey
        }
      });

      console.log("all drivers", data.data.drivers);

      if (data.status) {
        dispatch({
          type: actionType.GET_ALL_DRIVERS_REQUEST_SUCCESS,
          payload: { drivers: data.data.drivers, paginate: data.data.paginate }
        });
      } else {
        dispatch({
          type: actionType.GET_ALL_DRIVERS_REQUEST_FAIL,
          payload: data.error
        });
      }
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_DRIVERS_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// UPDATE STATUS KEY

export const updateStatusKey = value => dispatch => {
  dispatch({
    type: actionType.UPDATE_STATUS_KEY,
    payload: value
  });
};

// SEARCH KEY UPDATE

export const updateSearchKey = value => dispatch => {
  dispatch({
    type: actionType.UPDATE_SEARCH_KEY,
    payload: value
  });
};
