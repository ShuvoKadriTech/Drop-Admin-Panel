import * as actionType from "../actionType";

const initialState = {
  loading: false,
  partners: [],
  message: null,
  error: null,
  paginate: null,
  paging: [],
  hasNextPage: true,
  currentPage: 1,
  hasPreviousPage: false,
  searchKey: "",
  statusKey: ""
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

    // GET ALL PARTNERS

    case actionType.GET_ALL_PARTNER_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case actionType.GET_ALL_PARTNER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        partners: payload.partners,
        error: null,
        message: null,
        paginate: payload.paginate,
        paging: payload.paginate.metadata.paging,
        hasNextPage: payload.paginate.metadata.hasNextPage,
        currentPage: payload.paginate.metadata.page.currentPage,
        hasPreviousPage: payload.paginate.metadata.hasPreviousPage,
      };

    case actionType.GET_ALL_PARTNER_REQUEST_FAIL:
      return {
        ...state,
        error: payload,
        message: null
      };

    case actionType.UPDATE_SEARCH_KEY:

      return {
        ...state,
        searchKey: payload
      }

      case actionType.UPDATE_STATUS_KEY:

      return {
        ...state,
        statusKey: payload
      }


    default:
      return state;
  }
};

export default partnerReducer;
