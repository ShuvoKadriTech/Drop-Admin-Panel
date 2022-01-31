import {

    ADD_YEAR_REQUEST_SEND,
    ADD_YEAR_REQUEST_SUCCESS,
    ADD_YEAR_REQUEST_FAIL,
    GET_ALL_YEARS_REQUEST_SEND,
    GET_ALL_YEARS_REQUEST_SUCCESS,
    GET_ALL_YEARS_REQUEST_FAIL,
    EDIT_YEAR_REQUEST_SEND,
    EDIT_YEAR_REQUEST_SUCCESS,
    EDIT_YEAR_REQUEST_FAIL
} from "../../actionType";

const initialState = {
    loading: false,
    years: [],
    error: null,
    message: null
}


const yearReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_YEAR_REQUEST_SEND:

            return {
                ...state,
                loading: true
            }

        case ADD_YEAR_REQUEST_SUCCESS:
            // console.log(payload)
            const { year, message } = payload;
            return {
                ...state,
                loading: false,
                error: null,
                message: message,
                years: [...state.years, year]

            }

        case ADD_YEAR_REQUEST_FAIL:

            return {
                ...state,
                loading: false,
                error: payload,
                message: null
            }

        // GET ALL YEARS 

        case GET_ALL_YEARS_REQUEST_SEND:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_YEARS_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                message: null,
                years: payload
            }

        case GET_ALL_YEARS_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                message: null,
            }

        // EDIT YEAR 

        case EDIT_YEAR_REQUEST_SEND:
            return {
                ...state,
                loading: true
            }
        case EDIT_YEAR_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: payload,
                error: null
            }

        case EDIT_YEAR_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                message: payload,
                error: payload
            }

        default:
            return state;
    }
}


export default yearReducer;