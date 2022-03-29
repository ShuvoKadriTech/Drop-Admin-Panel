import * as actionType from "../actionType";

const initialState = {
  loading: false,
  userPaymentConditions: [],
  error: null,
  status: false,
};

const userPaymentConditionReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    // ADD CONDITION
    case actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        status: false,
        error: null,
      };

    case actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        userPaymentConditions: [...state.userPaymentConditions, payload],
        status: true,
      };
    case actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    //   GET ALL CONDITION

    case actionType.GET_ALL_USER_PAYMENT_CONDITION_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case actionType.GET_ALL_USER_PAYMENT_CONDITION_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        userPaymentConditions: payload,
      };

    case actionType.GET_ALL_USER_PAYMENT_CONDITION_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

      // EDIT CONDITION

      case actionType.EDIT_USER_PAYMENT_CONDITION_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        status: false
      };

      case actionType.EDIT_USER_PAYMENT_CONDITION_REQUEST_SUCCESS:

      const filterd = state.userPaymentConditions.map(item => item.id == payload.id ? payload : item)

      return {
        ...state,
        loading: false,
        userPaymentConditions: filterd,
        status: true
      };

      case actionType.EDIT_USER_PAYMENT_CONDITION_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload
      };

    default:
      return state;
  }
};

export default userPaymentConditionReducer;
