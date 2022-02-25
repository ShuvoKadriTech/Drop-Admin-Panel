import {
  GET_CAR_TYPES_REQUEST_SEND,
  GET_CAR_TYPES_REQUEST_SUCCESS,
  GET_CAR_TYPES_REQUEST_FAIL,
  DELETE_CAR_TYPE_REQUEST_SEND,
  DELETE_CAR_TYPE_REQUEST_SUCCESS,
  DELETE_CAR_TYPE_REQUEST_FAIL,
  EDIT_CAR_TYPE_REQUEST_SEND,
  EDIT_CAR_TYPE_REQUEST_SUCCESS,
  EDIT_CAR_TYPE_REQUEST_FAIL,
  ADD_CAR_TYPE_REQUEST_SEND,
  ADD_CAR_TYPE_REQUEST_SUCCESS,
  ADD_CAR_TYPE_REQUEST_FAIL,
  GET_SUCCESS_MESSAGE,
  CLEAR_SUCCESS_MESSAGE,
  GET_UPDATE_CAR_DATA,
  GET_SINGLE_CAR_TYPE_REQUEST_SEND,
  GET_SINGLE_CAR_TYPE_REQUEST_SUCCESS,
  GET_SINGLE_CAR_TYPE_REQUEST_FAIL
} from "../../actionType";
import * as actionType from "../../actionType";

const initialState = {
  loading: false,
  carTypes: [],
  error: null,
  message: null,
  carType: {}
};

const carTypesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CAR_TYPES_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case GET_CAR_TYPES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carTypes: payload,
        error: null,
        message: null
      };

    case GET_CAR_TYPES_REQUEST_FAIL:
      return {
        ...state,
        error: payload,
        message: null
      };

    // EDIT CAR TYPE

    case EDIT_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case EDIT_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null
      };

    case GET_UPDATE_CAR_DATA:
      const updateData = state.carTypes.map(
        item => (item.id === payload.id ? payload : item)
      );
      return {
        ...state,
        loading: false,
        message: null,
        error: null,
        carTypes: updateData
      };

    case EDIT_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null
      };

    // ADD CAR TYPE

    case ADD_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case ADD_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carTypes: [...state.carTypes, payload.data],
        error: null,
        message: payload.message
      };

    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        loading: false,
        error: null,
        message: null
      };

    case ADD_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null
      };

    // GET CAR TYPE

    case GET_SINGLE_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case GET_SINGLE_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carType: payload,
        error: null,
        message: null
      };

    case GET_SINGLE_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null
      };

    // ADD CAR TYPE BRAND

    case actionType.ADD_BRAND_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };
    case actionType.ADD_BRAND_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload.message,
        carType: {
          ...state.carType,
          carBrands: [...state.carType.carBrands, payload.carBrand]
        },
        error: null
      };

    case actionType.ADD_BRAND_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload
      };

      // EDIT CAR BRAND 

      case actionType.EDIT_BRAND_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };
    case actionType.EDIT_BRAND_REQUEST_SUCCESS:
      const newData = state.carType?.carBrands.map(
        item => (item.id === payload.carBrand.id ? payload.carBrand : item)
      );
      return {
        ...state,
        loading: false,
        message: payload.message,
        carType: {
          ...state.carType,
          carBrands: newData
        },
        error: null
      };

    case actionType.EDIT_BRAND_REQUEST_FAIL:
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

export default carTypesReducer;
