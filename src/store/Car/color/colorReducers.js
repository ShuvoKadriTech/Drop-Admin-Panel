import { getNativeSelectUtilityClasses } from "@mui/material";
import {
  ADD_COLOR_REQUEST_FAIL,
  ADD_COLOR_REQUEST_SEND,
  ADD_COLOR_IN_COLOR_LIST,
  ADD_COLOR_REQUEST_SUCCESS,
  GET_COLORS_REQUEST_SEND,
  GET_COLORS_REQUEST_SUCCESS,
  GET_COLORS_REQUEST_FAIL,
  EDIT_COLOR_REQUEST_SEND,
  EDIT_COLOR_REQUEST_SUCCESS,
  EDIT_COLOR_REQUEST_FAIL,
  GET_UPDATE_COLOR_DATA
} from "../../actionType";

const initialState = {
  loading: false,
  colors: [],
  error: null,
  message: null
};

const colorReducers = (state = initialState, action) => {
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
        error: null
      };

    case ADD_COLOR_IN_COLOR_LIST:
      return {
        ...state,
        colors: [...state.colors, payload],
        error: null,
        message: null
      };

    case ADD_COLOR_REQUEST_FAIL:
      return {
        ...state,
        message: null,
        loading: false,
        error: payload
      };

    // EDIT COLOR

    case EDIT_COLOR_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case EDIT_COLOR_REQUEST_SUCCESS:
      // console.log(updateData);
      return {
        ...state,
        loading: false,
        message: payload,
        error: null
      };

    case GET_UPDATE_COLOR_DATA:
      const updateData = state.colors.map(
        item => (item.id === payload.id ? payload : item)
      );
      // console.log(updateData);
      return {
        ...state,
        loading: false,
        message: null,
        colors: updateData,
        error: null
      };

    case EDIT_COLOR_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null
      };

    // GET ALL COLORS
    case GET_COLORS_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case GET_COLORS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        colors: payload,
        message: null,
        error: null
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

export default colorReducers;
