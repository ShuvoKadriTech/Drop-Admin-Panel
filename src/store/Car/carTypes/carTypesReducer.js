import {
  GET_CAR_TYPE_REQUEST_SEND,
  GET_CAR_TYPE_REQUEST_SUCCESS,
  GET_CAR_TYPE_REQUEST_FAIL,
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
  GET_UPDATE_CAR_DATA
} from "../../actionType";

const initialState = {
  loading: false,
  carTypes: [],
  error: null,
  message: null
};

const carTypesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case GET_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carTypes: payload,
        error: null,
        message: null
      };

    case GET_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        error: payload,
        message: null
      };

    // DELETE CAR TYPE BY ID
    // case DELETE_CAR_TYPE_REQUEST_SEND:
    //   return {
    //     ...state,
    //     loading: true
    //   };

    // case DELETE_CAR_TYPE_REQUEST_SUCCESS:
    //   // console.log(payload);
    //   const { id, message } = payload;
    //   const filtered = state.carTypes.filter(type => type.id !== id);
    //   // console.log(filtered);
    //   return {
    //     ...state,
    //     loading: false,
    //     carTypes: filtered,
    //     message: message
    //   };

    // case DELETE_CAR_TYPE_REQUEST_FAIL:
    //   return { ...state, loading: false, error: payload };

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

    default:
      return state;
  }
};

export default carTypesReducer;
