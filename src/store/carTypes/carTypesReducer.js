import {
  GET_CAR_TYPE_REQUEST_SEND,
  GET_CAR_TYPE_REQUEST_SUCCESS,
  GET_CAR_TYPE_REQUEST_FAIL
} from "../actionType";

const initialState = {
  loading: false,
  carTypes: [],
  error: ""
};

const CarTypesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CAR_TYPE_REQUEST_SEND:
      state = {
        ...state,
        loading: true
      };

      break;

    case GET_CAR_TYPE_REQUEST_SUCCESS:
      state = {
        ...state,
        loading: false,
        carTypes: payload
      };

      break;

    case GET_CAR_TYPE_REQUEST_FAIL:
      state = {
        ...state,
        carTypes: [],
        error: payload
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default CarTypesReducer;
