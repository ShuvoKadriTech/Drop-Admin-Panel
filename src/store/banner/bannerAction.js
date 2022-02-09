import { BANNER_LIST, EDIT_BANNER } from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";

export const editBannerRequestSend = () => {
  return {
    type: actionType.EDIT_BANNER_REQUEST_SEND
  };
};

export const editBannerRequestSuccess = message => {
  return {
    type: actionType.EDIT_BANNER_REQUEST_SUCCESS,
    payload: message
  };
};

export const getEditedBanner = data => {
  return {
    type: actionType.GET_EDITED_BANNER,
    payload: data
  };
};

export const editBannerRequestFail = error => {
  return {
    type: actionType.EDIT_BANNER_REQUEST_FAIL,
    payload: error
  };
};

// EDIT BANNER REQUEST

export const editBanner = banner => async dispatch => {
  //   console.log(banner);
  try {
    dispatch(editBannerRequestSend());

    const { data } = await requestApi().request(EDIT_BANNER, {
      method: "POST",
      data: banner
    });
    console.log(data);
  } catch (error) {}
};

export const getBannerListAction = ({
  type = 1,
  status = 1,
  sortBy = "DESC"
}) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.BANNER_REQUEST_SEND
    });

    const request = requestApi();
    const { data } = await request(BANNER_LIST, {
      params: {
        type: type,
        status: status,
        sortBy: sortBy
      }
    });

    // console.log(data);

    if (data.status) {
      dispatch({
        type: actionType.BANNER_REQUEST_SUCCESS,
        payload: data.data.banners
      });
    } else {
      dispatch({
        type: actionType.BANNER_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.BANNER_REQUEST_FAIL,
      payload: error.message
    });
  }
};
