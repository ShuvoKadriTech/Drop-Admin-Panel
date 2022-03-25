import * as actionType from "../actionType";

const initialState = {
  loading: false,
  policy: null,
  error: null,
};

const policyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionType.ADD_POLICY_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case actionType.ADD_POLICY_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        policy: payload,
      };
    case actionType.ADD_POLICY_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default policyReducer;
