import * as actionType from "../../actionType";

const initialState = {
  loading: false,
  roles: [],
  message: null,
  error: null
};

export const roleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // ADD ROLE
    case actionType.CREATE_ADMIN_ROLE_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        error: null,
        message: null
      };
    case actionType.CREATE_ADMIN_ROLE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null
      };

    case actionType.GET_CREATED_ADMIN_ROLE:
      return {
        ...state,
        loading: false,
        roles: [...state.roles, payload],
        message: null,
        error: null
      };

    case actionType.CREATE_ADMIN_ROLE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload
      };

    //   GET ALL ROLE

    case actionType.GET_ALL_ROLE_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        error: null,
        message: null
      };

    case actionType.GET_ALL_ROLE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
        roles: payload
      };

    case actionType.GET_ALL_ROLE_REQUEST_FAIL:
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
