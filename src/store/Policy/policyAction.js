import { toast } from "react-toastify";
import { ADD_POLICY, GET_SINGLE_POLICY } from "../../network/Api";
import * as actionType from "../actionType";
import requestApi from "./../../network/httpRequest";

export const addPolicy = (policy) => async (dispatch) => {
  // console.log("data-----", policy);
  try {
    dispatch({
      type: actionType.ADD_POLICY_REQUEST_SEND,
    });

    const { data } = await requestApi().request(ADD_POLICY, {
      method: "POST",
      data: policy,
    });

    // console.log("respose policy", data);

    if (data.status) {
      toast.success("Policy Added", {
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
        type: actionType.ADD_POLICY_REQUEST_SUCCESS,
        payload: data.data.policy,
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
        progress: undefined,
      });
      dispatch({
        type: actionType.ADD_POLICY_REQUEST_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {}
};

// GET SINGLE POLICY

// export const getSinglePolicy = (type) => async (dispatch) => {
//   try {
//     dispatch({
//       type: actionType.GET_SINGLE_POLICY_REQUEST_SEND,
//     });

//     const { data } = await requestApi().request(GET_SINGLE_POLICY, {
//       params: {
//         type: type,
//       },
//     });

//     console.log("single policy", data);
//   } catch (error) {}
// };
