import { toast } from "react-toastify";
import * as actionType from "../actionType";

const initialState = {
  loading: false,
  drivers: [],
  message: null,
  error: null,
  paginate: null,
  paging: [],
  hasNextPage: true,
  currentPage: 1,
  hasPreviousPage: false,
  searchKey: "",
  statusKey: "",
  currentStatusKey: "",
  status: false,
};

export const driverReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    // ADD DRIVER
    // case actionType.ADD_DRIVER_REQUEST_SEND:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //     status: false
    //   };

    // case actionType.ADD_DRIVER_REQUEST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     drivers: [...state.drivers, payload],
    //     status: true,
    //     error: null
    //   };

    // case actionType.SET_STATUS_FALSE:
    //   return {
    //     ...state,
    //     status: false
    //   };

    // case actionType.ADD_DRIVER_REQUEST_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     message: null,
    //     error: payload,
    //     status: false
    //   };

    // EDIT DRIVER

    // case actionType.EDIT_DRIVER_REQUEST_SEND:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //     status: false
    //   };

    // case actionType.EDIT_DRIVER_REQUEST_SUCCESS:
    //   const updateData = state.drivers.map(
    //     driver => (driver.id == payload.id ? payload : driver)
    //   );
    //   return {
    //     ...state,
    //     loading: false,
    //     drivers: updateData,
    //     status: true,
    //     error: null
    //   };

    // case actionType.EDIT_DRIVER_REQUEST_FAIL:
    //   return {
    //     ...state,
    //     status: false,
    //     error: payload
    //   };

    // ALL DRIVERS

    case actionType.GET_ALL_DRIVERS_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        status: false,
        message: null,
        error: null,
      };

    case actionType.GET_ALL_DRIVERS_REQUEST_SUCCESS:
      // console.log("payload", payload);
      return {
        ...state,
        loading: false,
        drivers: payload.drivers,
        error: null,
        message: null,
        paginate: payload.paginate,
        paging: payload.paginate.metadata.paging,
        hasNextPage: payload.paginate.metadata.hasNextPage,
        currentPage: payload.paginate.metadata.page.currentPage,
        hasPreviousPage: payload.paginate.metadata.hasPreviousPage,
        status: false,
      };

    case actionType.GET_ALL_DRIVERS_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };

    // EDIT STATUS KEY UPDATE

    case actionType.UPDATE_STATUS_KEY:
      return {
        ...state,
        statusKey: payload,
      };

    // UPDATE SEARCH KEY
    case actionType.UPDATE_SEARCH_KEY:
      return {
        ...state,
        searchKey: payload,
      };

    // UPDATE CURRENT STATUS KEY

    case actionType.UPDATE_CURRENT_STATUS_KEY:
      return {
        ...state,
        currentStatusKey: payload,
      };

    default:
      return state;
  }
};
