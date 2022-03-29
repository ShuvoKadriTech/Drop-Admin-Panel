import requestApi from "./../../network/httpRequest";
import * as actionType from "../actionType";
import {
  ADD_USER_PAYMENT_CONDITION,
  EDIT_USER_PAYMENT_CONDITION,
  GET_ALL_PAYMENT_CONDITIONS,
} from "../../network/Api";
import { toast } from "react-toastify";

// ADD USER PAYMENT CONDITION

export const addUserPaymentCondition = (conditionData) => async (dispatch) => {
  // console.log("send data", conditionData);
  try {
    dispatch({
      type: actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_SEND,
    });

    const { data } = await requestApi().request(ADD_USER_PAYMENT_CONDITION, {
      method: "POST",
      data: conditionData,
    });

    // console.log("condition response", data);

    if (data.status) {
      toast.warn(data.message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch({
        type: actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_SUCCESS,
        payload: data.data.userPaymentConditions,
      });
    } else {
      dispatch({
        type: actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_FAIL,
      payload: error.message,
    });
  }
};

// GET ALL CONDITIONS

export const getAllPaymentConditions =
  (refresh) => async (dispatch, getState) => {
    const { userPaymentConditions } = getState().userPaymentConditionReducer;

    if (userPaymentConditions.length <= 0 || refresh) {
      try {
        dispatch({
          type: actionType.GET_ALL_USER_PAYMENT_CONDITION_REQUEST_SEND,
        });
        const { data } = await requestApi().request(GET_ALL_PAYMENT_CONDITIONS);

        // console.log("all conditions", data);

        if (data.status) {
          dispatch({
            type: actionType.GET_ALL_USER_PAYMENT_CONDITION_REQUEST_SUCCESS,
            payload: data.data.userPaymentConditions,
          });
        } else {
          dispatch({
            type: actionType.GET_ALL_USER_PAYMENT_CONDITION_REQUEST_FAIL,
            paylod: data.error,
          });
        }
      } catch (error) {
        dispatch({
          type: actionType.GET_ALL_USER_PAYMENT_CONDITION_REQUEST_FAIL,
          paylod: error.message,
        });
      }
    }
  };


  // EDIT PAYMENT CONDITION 

  export const editPaymentCondition = (value) => async dispatch =>{
    try {
      dispatch({
        type: actionType.EDIT_USER_PAYMENT_CONDITION_REQUEST_SEND
      })

      const {data} = await requestApi().request(EDIT_USER_PAYMENT_CONDITION,{
        method: "POST",
        data: value
      })
      if(data.status){
        toast.warn(data.message, {
          // position: "bottom-right",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: actionType.EDIT_USER_PAYMENT_CONDITION_REQUEST_SUCCESS,
          payload: data.data.userPaymentConditions
        })
        
      }else{
        toast.warn(data.error, {
          // position: "bottom-right",
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: actionType.EDIT_USER_PAYMENT_CONDITION_REQUEST_FAIL,
          payload: data.error
        })
      }
    } catch (error) {
      dispatch({
        type: actionType.EDIT_USER_PAYMENT_CONDITION_REQUEST_FAIL,
        payload: error.message
      })
    }
  }