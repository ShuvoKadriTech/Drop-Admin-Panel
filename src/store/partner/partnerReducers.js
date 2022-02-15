import * as actionType from "../actionType";

const initialState = {
  loading: false,
  partners: [],
  message: null,
  error: null
};

const partnerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // ADD PARTNER

    case actionType.ADD_PARTNER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null
      };

    case actionType.ADD_PARTNER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        partners: [...state.partners, payload.partner],
        message: payload.message,
        error: null
      };

    case actionType.ADD_PARTNER_REQUEST_FAIL:
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

export default partnerReducer;
