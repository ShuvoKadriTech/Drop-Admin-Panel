import requestApi from "./../../network/httpRequest";
import * as actionType from "../actionType";
import { ADD_USER_PAYMENT_CONDITION } from "../../network/Api";

// ADD USER PAYMENT CONDITION

export const addUserPaymentCondition = (conditionData) => async (dispatch) => {
  console.log("send data", conditionData);
  try {
    dispatch({
      type: actionType.ADD_USER_PAYMENT_CONDITION_REQUEST_SEND,
    });

    const { data } = await requestApi().request(ADD_USER_PAYMENT_CONDITION, {
      method: "POST",
      data: conditionData,
    });

    console.log("condition response", data);
  } catch (error) {}
};
