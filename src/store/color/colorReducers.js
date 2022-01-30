import {
  ADD_COLOR_REQUEST_FAIL,
  ADD_COLOR_REQUEST_SEND,
  ADD_COLOR_REQUEST_SUCCESS,
  GET_COLORS_REQUEST_SEND,
  GET_COLORS_REQUEST_SUCCESS,
  ADD_COLOR_IN_COLOR_LIST,
  GET_COLORS_REQUEST_FAIL
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
      return {
        ...state,
        loading: true
      };

    case ADD_COLOR_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: ""
      };

    case ADD_COLOR_IN_COLOR_LIST:
      return {
        ...state,
        colors: [...state.colors, payload],
        error: ""
      };

    case ADD_COLOR_REQUEST_FAIL:
      return {
        ...state,
        message: "",
        loading: false,
        error: payload
      };

    case GET_COLORS_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case GET_COLORS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        colors: payload
      };
    case GET_COLORS_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        colors: [],
        error: payload
      };
    default:
      return state;
  }
};
