import { ADD_YEAR, EDIT_YEAR, GET_ALL_YEARS } from '../../../network/Api';
import requestApi from './../../../network/httpRequest';
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

// ADD YEAR

export const addYearRequestSend = () => {
    return {
        type: ADD_YEAR_REQUEST_SEND,

    }
}

export const addYearRequestSuccess = (year, message) => {
    return {
        type: ADD_YEAR_REQUEST_SUCCESS,
        payload: { year, message }
    }
}

export const addYearRequestFail = (error) => {
    return {
        type: ADD_YEAR_REQUEST_FAIL,
        payload: error
    }
}

// GET ALL YEARS 

export const getAllYearsRequestSend = () => {
    return {
        type: GET_ALL_YEARS_REQUEST_SEND
    }
}
export const getAllYearRequestSuccess = (years) => {
    return {
        type: GET_ALL_YEARS_REQUEST_SUCCESS,
        payload: years
    }
}

export const getAllYearsRequestFail = (error) => {
    return {
        type: GET_ALL_YEARS_REQUEST_FAIL,
        payload: error
    }
}

// EDIT

export const editYearRequestSend = () => {
    return {
        type: EDIT_YEAR_REQUEST_SEND
    }
}
export const editYearRequestSuccess = (message) => {
    return {
        type: EDIT_YEAR_REQUEST_SUCCESS,
        payload: message
    }
}

export const editYearRequestFail = (error) => {
    return {
        type: EDIT_YEAR_REQUEST_FAIL,
        payload: error
    }
}

// HTTP REQUEST HANDLING 

export const editYear = (id, updateDate) => async (dispatch, getState) => {
    // console.log(id, updateDate);
    dispatch(editYearRequestSend());

    const { data: { status, message, error } } = await requestApi().request(EDIT_YEAR, {
        method: 'POST',
        data: {
            id: id,
            data: { year: updateDate }
        }
    })

    if (status) {
        dispatch(editYearRequestSuccess(message))
    }
    else {
        dispatch(editYearRequestFail(error))
    }
}


// GET ALL YEARS

export const getAllYears = () => async dispatch => {
    dispatch(getAllYearsRequestSend());

    const { data: { status, data, error } } = await requestApi().request(GET_ALL_YEARS)

    if (status) {
        dispatch(getAllYearRequestSuccess(data))
    }
    else {
        dispatch(getAllYearsRequestFail(error))
    }
}

// ADD YEAR 

export const addYear = (year) => async dispatch => {


    dispatch(addYearRequestSend())

    const { data: { status, message, error, data } } = await requestApi().request(ADD_YEAR, {
        method: 'POST',
        data: {
            year: year
        }
    })
    // console.log(data)
    if (status) {
        dispatch(addYearRequestSuccess(data, message))
    }
    else {
        dispatch(addYearRequestFail(error))
    }

}