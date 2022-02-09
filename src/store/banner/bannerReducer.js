import * as actionTypes from "../actionType";
import { DELETE_BANNER_REQUEST_SEND, DELETE_BANNER_REQUEST_SUCCESS, GET_DELETED_BANNER_DATA, DELETE_BANNER_REQUEST_FAIL } from './../actionType';

const initialState = {
    loading: false,
    list: [],
    error: null
}

const bannerReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case actionTypes.BANNER_REQUEST_SEND:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.BANNER_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                list: payload,
                error: null,
                message: null
            }

        case actionTypes.BANNER_REQUEST_ADD:

            return {
                ...state,
                list: [...state.list, payload],
                error: null
            }


        case actionTypes.BANNER_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };


        // DELETE BANNER

        case DELETE_BANNER_REQUEST_SEND:
            return {
                ...state,
                loading: true
            }

        case DELETE_BANNER_REQUEST_SUCCESS:
            const { id, message } = payload;
            const filtered = state.list.filter(banner => banner.id !== id);
            return {
                ...state,
                loading: false,
                message: message,
                list: filtered,
                error: null
            }
        case DELETE_BANNER_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                message: null,
                error: payload
            }

        default:
            return state;
    }
}






export default bannerReducer;