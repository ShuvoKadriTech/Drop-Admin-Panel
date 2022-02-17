import { toast } from "react-toastify";
import { ADD_PARTNER, ALL_PARTNER } from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";
import partnerReducer from "./partnerReducers";

export const addPartner = partner => async dispatch => {
  // console.log("before add",partner);
  try {
    dispatch({
      type: actionType.ADD_PARTNER_REQUEST_SEND
    });

    const { data } = await requestApi().request(ADD_PARTNER, {
      method: "POST",
      data: partner
    });
    // console.log("response",data);
    if (data.status) {
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
        type: actionType.ADD_PARTNER_REQUEST_SUCCESS,
        payload: {
          partner: data.data.partner,
          message: data.message
        }
      });
    } else {
      toast.warn(data.error, {
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
        type: actionType.ADD_PARTNER_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADD_PARTNER_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// GET ALL PARTNER REQUEST

export const getPartners = (refresh = false,page = 1) => async (
  dispatch,
  getState
) => {
  // console.log("searchKey",searchKey);
  try {
    const { partners, searchKey, statusKey } = getState().partnerReducer;
    // console.log("searchKey",searchKey);
    if (partners.length <= 0 || refresh) {
      dispatch({
        type: actionType.GET_ALL_PARTNER_REQUEST_SEND
      });

      const {
        data: { data, status, error }
      } = await requestApi().request(ALL_PARTNER, {
        params: {
          searchKey: searchKey,
          page: page,
          pageSize: 5,
          status: statusKey
        }
      });

      console.log("data",data);

      if (status) {
        dispatch({
          type: actionType.GET_ALL_PARTNER_REQUEST_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: actionType.GET_ALL_PARTNER_REQUEST_FAIL,
          payload: error
        });
      }
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_PARTNER_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// SEARCH KEY UPDATE

export const updateSearchKey = (value) => (dispatch) => {

  dispatch({
    type: actionType.UPDATE_SEARCH_KEY,
    payload: value
  })

}

// UPDATE STATUS KEY 

export const updateStatusKey = (value) => dispatch =>{
  dispatch({
    type: actionType.UPDATE_STATUS_KEY,
    payload: value
  })
}