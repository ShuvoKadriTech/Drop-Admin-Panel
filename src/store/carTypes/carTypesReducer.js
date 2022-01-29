import {
  GET_CAR_TYPE_REQUEST_SEND,
  GET_CAR_TYPE_REQUEST_SUCCESS,
  GET_CAR_TYPE_REQUEST_FAIL,
  DELETE_CAR_TYPE_REQUEST_SEND,
  DELETE_CAR_TYPE_REQUEST_SUCCESS,
  DELETE_CAR_TYPE_REQUEST_FAIL,
  EDIT_CAR_TYPE_REQUEST_SEND,
  EDIT_CAR_TYPE_REQUEST_SUCCESS,
  EDIT_CAR_TYPE_REQUEST_FAIL
} from "../actionType";

const initialState = {
  loading: false,
  carTypes: [],
  error: "",
  message: ""
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

    // DELETE CAR TYPE BY ID
    case DELETE_CAR_TYPE_REQUEST_SEND:
      state = {
        ...state,
        loading: true
      };
      break;
    case DELETE_CAR_TYPE_REQUEST_SUCCESS:
      // console.log(payload);
      const { id, message } = payload;
      const filtered = state.carTypes.filter(type => type.id !== id);
      // console.log(filtered);
      state = {
        ...state,
        loading: false,
        carTypes: filtered,
        message: message
      };
      break;
    case DELETE_CAR_TYPE_REQUEST_FAIL:
      state = { ...state, loading: false, error: payload };
      break;

    // EDIT CAR TYPE

    case EDIT_CAR_TYPE_REQUEST_SEND:
      state = {
        ...state,
        loading: true
      };
      break;

    case EDIT_CAR_TYPE_REQUEST_SUCCESS:
      const { successMessage, updateDate } = payload;
      state = {
        ...state,
        loading: false,
        message: successMessage
      };
      break;
    case EDIT_CAR_TYPE_REQUEST_FAIL:
      state = {
        ...state,
        loading: false,
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
