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
  selectedCarType: null,
  selectedUser: null,
  selectedTrip : "1",
  selectedPickupTime: new Date(),
  selectedReturnTime: new Date()
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

    // SELECTD CAR TYPE

    case actionType.SELECT_RIDE_CAR_TYPE:
      return {
        ...state,
        selectedCarType: payload,
      };

    // SELECT USER

    case actionType.SELECT_RIDE_USER:
      return {
        ...state,
        selectedUser: payload,
      };

      // SELECT TRIP 

      case actionType.SELECT_TRIP:
      return {
        ...state,
        selectedTrip: payload,
      };

      // SELECT PICKUP TIME 

      case actionType.SELECT_PICKUP_TIME:
      return {
        ...state,
        selectedPickupTime: payload,
      };

      // SELECTED RETURN TIME 

      case actionType.SELECT_RETURN_TIME:
      return {
        ...state,
        selectedReturnTime: payload,
      };

    default:
      return state;
  }
};

export default rideReducer;
