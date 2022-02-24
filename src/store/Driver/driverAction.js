import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";


// ADD PARTNER 


export const addPartner = driver => async dispatch => {
  console.log(driver);
    // console.log("before add",partner);
    // try {
    //   dispatch({
    //     type: actionType.ADD_DRIVER_REQUEST_SEND
    //   });
  
    //   const { data } = await requestApi().request(, {
    //     method: "POST",
    //     data: partner
    //   });
    //   // console.log("response",data);
    //   if (data.status) {
    //     toast.success(data.message, {
    //       // position: "bottom-right",
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 3000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined
    //     });
  
    //     dispatch({
    //       type: actionType.ADD_PARTNER_REQUEST_SUCCESS,
    //       payload: {
    //         partner: data.data.partner,
    //         message: data.message
    //       }
    //     });
    //   } else {
    //     toast.warn(data.error, {
    //       // position: "bottom-right",
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 3000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined
    //     });
    //     dispatch({
    //       type: actionType.ADD_PARTNER_REQUEST_FAIL,
    //       payload: data.error
    //     });
    //   }
    // } catch (error) {
    //   dispatch({
    //     type: actionType.ADD_PARTNER_REQUEST_FAIL,
    //     payload: error.message
    //   });
    // }
  };