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
  statusKey: "all",
  createdByKey: "",
  status: false,
  drivers: [],
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
        error: null,
      };

    case actionType.ADD_PARTNER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        partners: [...state.partners, payload.partner],
        message: payload.message,
        error: null,
      };

    case actionType.ADD_PARTNER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload,
      };

    // GET ALL PARTNERS

    case actionType.GET_ALL_PARTNER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
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
        status: false,
      };

    case actionType.GET_ALL_PARTNER_REQUEST_FAIL:
      return {
        ...state,
        error: payload,
        message: null,
        status: false,
      };

    // EDIT PARTNER

    case actionType.EDIT_PARTNER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case actionType.EDIT_PARTNER_REQUEST_SUCCESS:
      const updateData = state.partners.map((item) =>
        item.id === payload.partner.id ? payload.partner : item
      );
      return {
        ...state,
        loading: false,
        message: payload.message,
        error: null,
        partners: updateData,
      };

    case actionType.EDIT_PARTNER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };

    // ADD DRIVER BY PARTNER

    case actionType.ADD_DRIVER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case actionType.ADD_DRIVER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        error: null,
      };

    // case actionType.SET_STATUS_FALSE:
    //   return {
    //     ...state,
    //     status: false
    //   };

    case actionType.ADD_DRIVER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
      };

    // EDIT DRIVER

    case actionType.EDIT_DRIVER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        error: null,
        status: false,
      };

    case actionType.EDIT_DRIVER_REQUEST_SUCCESS:
      // const newData = state.drivers.map(
      //   driver => (driver.id == payload.id ? payload : driver)
      // );
      return {
        ...state,

        loading: false,
        // drivers: updateData,
        status: true,
        error: null,
      };

    case actionType.EDIT_DRIVER_REQUEST_FAIL:

    // GET ALL DRIVERS BY PARTNER

    case actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: payload,
        status: false,
      };

    case actionType.GET_ALL_DRIVERS_BY_PARTNER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,

        error: payload,
      };

    case actionType.UPDATE_SEARCH_KEY:
      return {
        ...state,
        searchKey: payload,
      };

    case actionType.UPDATE_STATUS_KEY:
      return {
        ...state,
        statusKey: payload,
      };

    case actionType.UPDATE_CREATED_BY_KEY:
      return {
        ...state,
        createdByKey: payload,
      };

    default:
      return state;
  }
};

export default partnerReducer;
