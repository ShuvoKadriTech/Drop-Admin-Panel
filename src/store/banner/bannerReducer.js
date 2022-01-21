import * as actionTypes from "../actionType";

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
                error: null
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
        default:
            return state;
    }
}






export default bannerReducer;