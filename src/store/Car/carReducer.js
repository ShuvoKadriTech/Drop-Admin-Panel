import * as actionType from "../actionType";

const initialState = {
  loading: false,
  error: null,
  cars: [],
  paginate: null,
  paging: [],
  hasNextPage: true,
  currentPage: 1,
  hasPreviousPage: false,
  status: false
};

const carReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionType.GET_ALL_CARS_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        status: false
      };

    case actionType.GET_ALL_CARS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        cars: payload.cars,
        error: null,
        paginate: payload.paginate,
        paging: payload.paginate.metadata.paging,
        hasNextPage: payload.paginate.metadata.hasNextPage,
        currentPage: payload.paginate.metadata.page.currentPage,
        hasPreviousPage: payload.paginate.metadata.hasPreviousPage,
        status: false
      };

    case actionType.GET_ALL_CARS_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: null,
      };

      case actionType.SET_STATUS_FALSE:
        return{
          ...state,
          status: false
        }

    default:
      return state;
  }
};

export default carReducer;
