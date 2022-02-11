import * as actionType from "../../actionType";
import requestApi from "./../../../network/httpRequest";
import { ADD_ADMIN_ROLE, GET_ALL_ADMIN_ROLE } from "./../../../network/Api";

// ADD ADMIN ROLE

export const addAdmin = roleData => async dispatch => {
  console.log(roleData);
  try {
    dispatch({
      type: actionType.CREATE_ADMIN_ROLE_REQUEST_SEND
    });

    const {
      data: { status, message, error, data: { role } }
    } = await requestApi().request(ADD_ADMIN_ROLE, {
      method: "POST",
      data: roleData
    });

    if (status) {
      if (message) {
        dispatch({
          type: actionType.CREATE_ADMIN_ROLE_REQUEST_SUCCESS,
          payload: message
        });
      }

      if (role) {
        dispatch({
          type: actionType.GET_CREATED_ADMIN_ROLE,
          payload: role
        });
      }
    } else {
      console.log("callllll");
      dispatch({
        type: actionType.CREATE_ADMIN_ROLE_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.CREATE_ADMIN_ROLE_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// GET ALL ROLES

export const getAllRoles = () => async dispatch => {
  try {
    dispatch({
      type: actionType.GET_ALL_ROLE_REQUEST_SEND
    });

    const {
      data: { message, status, error, data: { roles } }
    } = await requestApi().request(GET_ALL_ADMIN_ROLE);

    if (status) {
      dispatch({
        type: actionType.GET_ALL_ROLE_REQUEST_SUCCESS,
        payload: roles
      });
    } else {
      dispatch({
        type: actionType.GET_ALL_ROLE_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_ROLE_REQUEST_FAIL,
      payload: error.message
    });
  }
};
