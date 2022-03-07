import * as actionType from "../actionType";

const initialState = {
  loading: false,
  message: null,
  error: null,
  status: false,
  rides: [],
  paginate: null,
  paging: [],
  hasNextPage: true,
  currentPage: 1,
  hasPreviousPage: false,
  searchKey: "",
  typeKey: "all",
};

const rideReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionType.GET_ALL_RIDE_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };
    case actionType.GET_ALL_RIDE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        rides: payload.rides,
        error: null,
        message: null,
        paginate: payload.paginate,
        paging: payload.paginate.metadata.paging,
        hasNextPage: payload.paginate.metadata.hasNextPage,
        currentPage: payload.paginate.metadata.page.currentPage,
        hasPreviousPage: payload.paginate.metadata.hasPreviousPage,
        status: false,
      };

    case actionType.GET_ALL_RIDE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    // UPDATE SEARCH KEY

    case actionType.UPDATE_RIDE_SEARCH_KEY:
      return {
        ...state,
        searchKey: payload,
      };

    // UPDATE TYPE searchKey

    case actionType.UPDATE_RIDE_TYPE_KEY:
      return {
        ...state,
        typeKey: payload,
      };

    default:
      return state;
  }
};

export default rideReducer;
