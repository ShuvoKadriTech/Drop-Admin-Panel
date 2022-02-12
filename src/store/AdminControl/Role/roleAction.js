import * as actionType from "../../actionType";
import requestApi from "./../../../network/httpRequest";
import {
  ADD_ADMIN_ROLE,
  DELETE_ADMIN_ROLE,
  EDIT_ADMIN_ROLE,
  GET_ALL_ADMIN_ROLE
} from "./../../../network/Api";

// ADD ADMIN ROLE

export const addAdmin = roleData => async dispatch => {
  try {
    dispatch({
      type: actionType.CREATE_ADMIN_ROLE_REQUEST_SEND
    });
    const { data } = await requestApi().request(ADD_ADMIN_ROLE, {
      method: "POST",
      data: roleData
    });
    // console.log(data);
    if (data.status) {
      dispatch({
        type: actionType.CREATE_ADMIN_ROLE_REQUEST_SUCCESS,
        payload: data.message
      });
      dispatch({
        type: actionType.GET_CREATED_ADMIN_ROLE,
        payload: data.data.role
      });
    } else {
      dispatch({
        type: actionType.CREATE_ADMIN_ROLE_REQUEST_FAIL,
        payload: data.error
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

export const getAllRoles = refresh => async (dispatch, getState) => {
  try {
    const { roles } = getState().roleReducer;

    if (roles.length <= 0 || refresh) {
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
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_ROLE_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// EDIT ROLE BY ID

export const editRole = roleData => async dispatch => {
  // console.log(roleData);
  try {
    dispatch({
      type: actionType.EDIT_ADMIN_ROLE_REQUEST_SEND
    });

    const { data } = await requestApi().request(EDIT_ADMIN_ROLE, {
      method: "POST",
      data: roleData
    });

    if (data.status) {
      if (data.message) {
        dispatch({
          type: actionType.EDIT_ADMIN_ROLE_REQUEST_SUCCESS,
          payload: data.message
        });
      }
      if (data.data.role) {
        dispatch({
          type: actionType.GET_UPDATE_ADMIN_ROLE,
          payload: data.data.role
        });
      }
    } else {
      dispatch({
        type: actionType.EDIT_ADMIN_ROLE_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.EDIT_ADMIN_ROLE_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// DELETE ROLE BY ID

export const deleteRole = id => async dispatch => {
  try {
    dispatch({
      type: actionType.DELETE_ROLE_REQUEST_SEND
    });
    const { data } = await requestApi().request(DELETE_ADMIN_ROLE, {
      method: "POST",
      data: {
        id: id
      }
    });
    console.log(data);
  } catch (error) {}
};
