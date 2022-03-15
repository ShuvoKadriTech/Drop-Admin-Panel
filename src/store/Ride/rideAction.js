import { toast } from "react-toastify";
import { ADD_RIDE, ALL_RIDES } from "../../network/Api";
import * as actionType from "../actionType";
import requestApi from "./../../network/httpRequest";

// GET ALL RIDE

export const AllRides =
  (refresh = false, page = 1) =>
  async (dispatch, getState) => {
    // console.log("call----------");
    try {
      const { rides, typeKey, searchKey } = getState().rideReducer;

      if (rides.length < 1 || refresh) {
        dispatch({
          type: actionType.GET_ALL_RIDE_REQUEST_SEND,
        });

        const { data } = await requestApi().request(ALL_RIDES, {
          params: {
            searchKey: searchKey,
            page: page,
            pageSize: 2,
            type: typeKey,
          },
        });

        // console.log("rides----------", data);

        if (data.status) {
          dispatch({
            type: actionType.GET_ALL_RIDE_REQUEST_SUCCESS,
            payload: { rides: data.data.rides, paginate: data.data.paginate },
          });
        } else {
          dispatch({
            type: actionType.GET_ALL_RIDE_REQUEST_FAIL,
            payload: data.error,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: actionType.GET_ALL_RIDE_REQUEST_FAIL,
        payload: error.message,
      });
    }
  };

// UPDATE SEARCH KEY

export const updateRideSearchKey = (value) => (dispatch) => {
  dispatch({
    type: actionType.UPDATE_RIDE_SEARCH_KEY,
    payload: value,
  });
};

// UPDATE STATUS KEY

export const updateRideTypeKey = (value) => (dispatch) => {
  dispatch({
    type: actionType.UPDATE_RIDE_TYPE_KEY,
    payload: value,
  });
};

// SELECT CAR TYPE

export const selectCarType = (carType) => (dispatch) => {
  dispatch({
    type: actionType.SELECT_RIDE_CAR_TYPE,
    payload: carType,
  });
};

// SELECT RIDE USER

export const selectUser = (user) => (dispatch) => {
  dispatch({
    type: actionType.SELECT_RIDE_USER,
    payload: user,
  });
};


// SELECT TRIP

export const selectTrip = (value) => (dispatch) => {
  dispatch({
    type: actionType.SELECT_TRIP,
    payload: value,
  });
};

// SELECT PICKUP TIME

export const selectPickupTime = (value) => (dispatch) => {
  dispatch({
    type: actionType.SELECT_PICKUP_TIME,
    payload: value,
  });
};

// SELECT RETURN TIME

export const selectReturnTime = (value) => (dispatch) => {
  dispatch({
    type: actionType.SELECT_RETURN_TIME,
    payload: value,
  });
};


// ADD RIDE

export const addRide = (rideData) => async dispatch => {
  console.log("data-----", rideData);
  try {
    dispatch({
      type: actionType.ADD_RIDE_REQUEST_SEND,
    })

    const { data } = await requestApi().request(ADD_RIDE, {

      method: 'POST',
      data: rideData

    });

    if(data.status){
      toast.success(data.message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      dispatch({
        type: actionType.ADD_RIDE_REQUEST_SUCCESS,
        payload: data.data.ride
      })
    }else{
      dispatch({
        type: actionType.ADD_RIDE_REQUEST_FAIL,
        payload: data.error
      })
    }
    

  } catch (error) {
    dispatch({
      type: actionType.ADD_RIDE_REQUEST_FAIL,
      payload: error.message
    })
  }
}

