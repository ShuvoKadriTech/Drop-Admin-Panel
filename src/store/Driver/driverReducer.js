import * as actionType from "../actionType";

const initialState = {
  loading: false,
  error: null,
  message: null,
  drivers: []
};

export const driverReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionType.ADD_DRIVER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null
      };

    case actionType.ADD_DRIVER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        partners: [...state.drivers, payload.driver],
        message: payload.message,
        error: null
      };

    case actionType.ADD_DRIVER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload
      };

    default:
      return state;
  }
};
