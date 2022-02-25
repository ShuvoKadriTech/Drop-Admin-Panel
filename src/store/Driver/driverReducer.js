import { toast } from "react-toastify";
import * as actionType from "../actionType";

const initialState = {
  loading: false,
  error: null,
  status: false,
  drivers: []
};

export const driverReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    // ADD DRIVER
    case actionType.ADD_DRIVER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        error: null,
        status: false
      };

    case actionType.ADD_DRIVER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: [...state.drivers, payload],
        status: true,
        error: null
      };

    case actionType.SET_STATUS_FALSE:
      return {
        ...state,
        status: false
      };

    case actionType.ADD_DRIVER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload,
        status: false
      };

    // GET ALL DRIVERS BY PARTNER ID

    case actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: payload
      };

    case actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,

        error: payload
      };

    // EDIT DRIVER

    case actionType.EDIT_DRIVER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        error: null,
        status: false
      };

    case actionType.EDIT_DRIVER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: [...state.drivers, payload],
        status: true,
        error: null
      };

    case actionType.EDIT_DRIVER_REQUEST_FAIL:
      return {
        ...state,
        status: false
      };

    case actionType.ADD_DRIVER_REQUEST_FAIL:

    default:
      return state;
  }
};
