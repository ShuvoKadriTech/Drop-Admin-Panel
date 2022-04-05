import * as actionType from "../actionType";
import requestApi from "./../../network/httpRequest";
import { GET_ALL_CARS } from "../../network/Api";

export const getAllCars =
  (refresh = false, page = 1) =>
  async (dispatch, getState) => {
    const { cars } = getState().carReducer;

    if (cars.length < 1 || refresh) {
      try {
        dispatch({
          type: actionType.GET_ALL_CARS_REQUEST_SEND,
        });

        const { data } = await requestApi().request(GET_ALL_CARS, {
          params: {
            page: page,
            pageSize: 10,
          },
        });
        // console.log("car response", data);

        if (data.status) {
          dispatch({
            type: actionType.GET_ALL_CARS_REQUEST_SUCCESS,
            payload: data.data,
          });
        } else {
          dispatch({
            type: actionType.GET_ALL_CARS_REQUEST_FAIL,
            payload: data.error,
          });
        }
      } catch (error) {
        dispatch({
          type: actionType.GET_ALL_CARS_REQUEST_FAIL,
          payload: error.message,
        });
      }
    }
  };


  export const setCarStatusFalse = () => dispatch =>{
    dispatch({
        type: actionType.SET_STATUS_FALSE,
      });
  }
