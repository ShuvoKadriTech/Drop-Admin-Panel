import { ALL_USERS } from "../../network/Api";
import requestApi from "../../network/httpRequest";
import * as actionType from "../actionType";
import usersReducer from "./UsersReducer";

// USERS LIST

export const usersList =
  (refresh = false, page = 1) =>
  async (dispatch, getState) => {
    const { users, searchKey, statusKey, createdByKey } =
      getState().usersReducer;

    try {
      if (users.length < 1 || refresh) {
        dispatch({
          type: actionType.GET_ALL_USERS_REQUEST_SEND,
        });

        const { data } = await requestApi().request(ALL_USERS, {
          params: {
            searchKey: searchKey,
            page: page,
            pageSize: 10,
            status: statusKey,
            createdBy: createdByKey,
          },
        });

        console.log("users-----", data);

        if (data.status) {
          dispatch({
            type: actionType.GET_ALL_USERS_REQUEST_SUCCESS,
            payload: {
              users: data.data.users,
              paginate: data.data.paginate,
            },
          });
        } else {
          dispatch({
            type: actionType.GET_ALL_USERS_REQUEST_FAIL,
            payload: data.error,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: actionType.GET_ALL_USERS_REQUEST_FAIL,
        payload: error.message,
      });
    }
  };

// UPDATE STATUS KEY

export const updateStatusKey = (status) => (dispatch) => {
  dispatch({
    type: actionType.UPDATE_USERS_STATUS_KEY,
    payload: status,
  });
};

// UPDATE SEARCH KEY

export const updateSearchKey = (value) => (dispatch) => {
  dispatch({
    type: actionType.UPDATE_USERS_SEARCH_KEY,
    payload: value,
  });
};

// UPDATE CREATED BY KEY

export const updateCreatedByKey = (key) => (dispatch) => {
  dispatch({
    type: actionType.UPDATE_USERS_CREATED_BY_KEY,
    payload: key,
  });
};
