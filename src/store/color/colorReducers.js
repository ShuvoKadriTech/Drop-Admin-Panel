import {
  ADD_COLOR_REQUEST_FAIL,
  ADD_COLOR_REQUEST_SEND,
  ADD_COLOR_REQUEST_SUCCESS,
  GET_COLORS_REQUEST_SEND,
  GET_COLORS_REQUEST_SUCCESS,
  GET_COLORS_REQUEST_FAIL,
  EDIT_COLOR_REQUEST_SEND,
  EDIT_COLOR_REQUEST_SUCCESS,
  EDIT_COLOR_REQUEST_FAIL
} from "../actionType";

const initialState = {
  loading: false,
  colors: [],
  error: "",
  message: ""
};

export const colorReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COLOR_REQUEST_SEND:
      state = { ...state, loading: true };
      break;
    case ADD_COLOR_REQUEST_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: payload.message,
        error: ""
      };
      break;
    case ADD_COLOR_REQUEST_FAIL:
      state = {
        ...state,
        message: "",
        loading: false,
        error: payload
      };
      break;
    // GET ALL COLORS
    case GET_COLORS_REQUEST_SEND:
      state = { ...state, loading: true };
      break;
    case GET_COLORS_REQUEST_SUCCESS:
      state = { ...state, loading: false, colors: payload };
      break;
    case GET_COLORS_REQUEST_FAIL:
      state = { ...state, loading: false, colors: [], error: payload };
      break;

      // EDIT COLOR

      case EDIT_COLOR_REQUEST_SEND:
      

    default:
      state = { ...state };
      break;
  }
  return state;
};
