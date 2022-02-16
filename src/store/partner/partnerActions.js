import { toast } from "react-toastify";
import { ADD_PARTNER } from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";

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
