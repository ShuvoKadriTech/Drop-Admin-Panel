import { toast } from "react-toastify";
import {
  ADD_DRIVER,
  ADD_PARTNER,
  ALL_PARTNER,
  EDIT_PARTNER,
  GET_ALL_DRIVERS_BY_PARTNER
} from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";
import partnerReducer from "./partnerReducers";

export const addPartner = partner => async dispatch => {
  // console.log("before add",partner);
  try {
    dispatch({
      type: actionType.ADD_PARTNER_REQUEST_SEND
    });

    const { data } = await requestApi().request(ADD_PARTNER, {
      method: "POST",
      data: partner
    });
    // console.log("response",data);
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
        type: actionType.ADD_PARTNER_REQUEST_SUCCESS,
        payload: {
          partner: data.data.partner,
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
        type: actionType.ADD_PARTNER_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADD_PARTNER_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// GET ALL PARTNER REQUEST

export const getPartners = (refresh = false, page = 1) => async (
  dispatch,
  getState
) => {
  // console.log("searchKey",searchKey);
  try {
    const {
      partners,
      searchKey,
      statusKey,
      createdByKey
    } = getState().partnerReducer;
    // console.log("searchKey",searchKey);
    if (partners.length <= 0 || refresh) {
      dispatch({
        type: actionType.GET_ALL_PARTNER_REQUEST_SEND
      });

      const {
        data: { data, status, error }
      } = await requestApi().request(ALL_PARTNER, {
        params: {
          searchKey: searchKey,
          page: page,
          pageSize: 10,
          status: statusKey,
          createdBy: createdByKey
        }
      });

      // console.log("data",data);

      if (status) {
        dispatch({
          type: actionType.GET_ALL_PARTNER_REQUEST_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: actionType.GET_ALL_PARTNER_REQUEST_FAIL,
          payload: error
        });
      }
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_PARTNER_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// EDIT PARTNER

export const editPartner = partnerData => async dispatch => {
  try {
    dispatch({
      type: actionType.EDIT_PARTNER_REQUEST_SEND
    });

    const { data } = await requestApi().request(EDIT_PARTNER, {
      method: "POST",
      data: partnerData
    });

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
      if (data.data.partner) {
        dispatch({
          type: actionType.EDIT_PARTNER_REQUEST_SUCCESS,
          payload: { message: data.message, partner: data.data.partner }
        });
      }
    } else {
      toast.success(data.error, {
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
        type: actionType.EDIT_PARTNER_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch(
      dispatch({
        type: actionType.EDIT_PARTNER_REQUEST_FAIL,
        payload: error.message
      })
    );
  }
};

// ADD DRIVER BY PARTNER

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
    console.log("|===================", data);
    // console.log("response", data);
    if (data.status) {
      toast.success(data.statusText, {
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
      // dispatch({
      //   type: actionType.SET_STATUS_FALSE
      // });
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

// SEARCH KEY UPDATE

export const updateSearchKey = value => dispatch => {
  dispatch({
    type: actionType.UPDATE_SEARCH_KEY,
    payload: value
  });
};

// UPDATE STATUS KEY

export const updateStatusKey = value => dispatch => {
  dispatch({
    type: actionType.UPDATE_STATUS_KEY,
    payload: value
  });
};

// UPDATE CREATED BY KEY

export const updateCreatedByKey = value => dispatch => {
  dispatch({
    type: actionType.UPDATE_CREATED_BY_KEY,
    payload: value
  });
};
