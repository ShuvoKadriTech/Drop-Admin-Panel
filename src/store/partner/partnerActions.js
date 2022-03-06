import { toast } from "react-toastify";
import {
  ADD_DRIVER,
  ADD_PARTNER,
  ALL_PARTNER,
  EDIT_DRIVER,
  EDIT_PARTNER,
  GET_ALL_DRIVERS_BY_PARTNER,
ADD_CAR
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
    // console.log("|===================", data);
    // console.log("response", data);
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

// EDIT DRIVER

export const editDriver = updateData => async dispatch => {
  console.log("props", updateData);
  try {
    dispatch({
      type: actionType.EDIT_DRIVER_REQUEST_SEND
    });

    const { data } = await requestApi().request(EDIT_DRIVER, {
      method: "POST",
      data: updateData
    });
    // console.log("response", data);
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
        type: actionType.EDIT_DRIVER_REQUEST_SUCCESS,
        payload: data.data.driver
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
        type: actionType.EDIT_DRIVER_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.EDIT_DRIVER_REQUEST_FAIL,
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
    // console.log("response", data);
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


// SELECT CAR TYPE

export const selectCarType = (selectedType) => (dispatch) => {
  // console.log("selected car type", selectedType);
  dispatch({
    type: actionType.SELECT_CAR_TYPE,
    payload: selectedType,
  });
};

// SELECT CAR BRAND

export const selectCarBrand = (selectedBrand) => (dispatch) => {
  // console.log("selected car brand", selectedBrand);
  dispatch({
    type: actionType.SELECT_CAR_BRAND,
    payload: selectedBrand,
  });
};

// SELECT CAR BRAND MODEL

export const selectCarBrandModel = (selectedModel) => (dispatch) => {
  // console.log("selected car brand model", selectedModel);
  dispatch({
    type: actionType.SELECT_CAR_BRAND_MODEL,
    payload: selectedModel,
  });
};

// SELECT MODEL COLOR

export const selectModelColor = (selectedColor) => (dispatch) => {
  // console.log("selected car brand model", selectedColor);
  dispatch({
    type: actionType.SELECT_CAR_MODEL_COLOR,
    payload: selectedColor,
  });
};

// SELECT MODEL YEAR

export const selectModelYear = (selectedYear) => (dispatch) => {
  // console.log("selected car brand model", selectedYear);
  dispatch({
    type: actionType.SELECT_CAR_MODEL_YEAR,
    payload: selectedYear,
  });
};

// SELECT CAR FUEL TYPE

export const selectCarFuel = (selectedFuel) => (dispatch) => {
  // console.log("selected car brand model", selectedYear);
  dispatch({
    type: actionType.SELECT_CAR_FUEL_TYPE,
    payload: selectedFuel,
  });
};


// ADD NEW CAR FOR PARTNER

export const addCar = (carData) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.ADD_CAR_REQUEST_SEND,
    });

    const { data } = await requestApi().request(ADD_CAR, {
      method: "POST",
      data: carData,
    });

    console.log("CAR DATA-----", data);

    if (data.status) {
      // toast.success(data.message, {
      //   // position: "bottom-right",
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 3000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });

      dispatch({
        type: actionType.ADD_CAR_REQUEST_SUCCESS,
        payload: data.data.car,
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
        progress: undefined,
      });
      dispatch({
        type: actionType.ADD_CAR_REQUEST_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADD_CAR_REQUEST_FAIL,
      payload: error.message,
    });
  }
};


export const getAllCarsByPartner = partnerId => async dispatch => {
  try {
    dispatch({
      type: actionType.GET_ALL_CARS_BY_PARTNER_REQUEST_SEND
    });

    const { data } = await requestApi().request(
      GET_ALL_DRIVERS_BY_PARTNER + partnerId
    );
    // console.log("response", data);
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
