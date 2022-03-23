import { ADD_POLICY } from "../../network/Api";
import * as actionType from "../actionType";
import requestApi from "./../../network/httpRequest";

export const addPolicy = (policy) => async (dispatch) => {
  console.log("data-----", policy);
  try {
    dispatch({
      type: actionType.ADD_POLICY_REQUEST_SEND,
    });

    const { data } = await requestApi().request(ADD_POLICY, {
      method: "POST",
      data: policy,
    });

    console.log("respose policy", data);
  } catch (error) {}
};
