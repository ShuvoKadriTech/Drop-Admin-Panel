import { BANNER_LIST, DELETE_BANNER } from '../../network/Api';
import requestApi from '../../network/httpRequest';
import * as actionType from '../actionType'
import { DELETE_BANNER_REQUEST_SEND, DELETE_BANNER_REQUEST_SUCCESS, GET_DELETED_BANNER_DATA, DELETE_BANNER_REQUEST_FAIL } from './../actionType';


export const deleteBannerRequestSend = () => {
    return {
        type: DELETE_BANNER_REQUEST_SEND
    }
}

export const deleteBannerRequestSuccess = (message, id) => {
    return {
        type: DELETE_BANNER_REQUEST_SUCCESS,
        payload: { message, id }
    }
}



export const deleteBannerRequestFail = error => {
    return {
        type: DELETE_BANNER_REQUEST_FAIL,
        payload: error
    }
}

// DELETE BANNER REQUEST 

export const deleteBanner = (id) => async dispatch => {
    // console.log(id)
    try {
        dispatch(deleteBannerRequestSend())

        const { data: { message, error, status } } = await requestApi().request(DELETE_BANNER, {
            method: "POST",
            data: {
                id: id
            }
        })
        // console.log(data)

        if (status) {
            dispatch(deleteBannerRequestSuccess(message, id))
        }
        else {
            dispatch(deleteBannerRequestFail(error))
        }

    }
    catch (error) {
        dispatch(deleteBannerRequestFail(error))
    }
}

export const getBannerListAction = ({ type = 1, status = 1, sortBy = "DESC" }) => async (dispatch, getState) => {


    try {
        dispatch({
            type: actionType.BANNER_REQUEST_SEND
        })

        const request = requestApi()
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
                payload: data.data.banners,
            })
        } else {
            dispatch({
                type: actionType.BANNER_REQUEST_FAIL,
                payload: data.error,
            })
        }

    } catch (error) {
        dispatch({
            type: actionType.BANNER_REQUEST_FAIL,
            payload: error.message,
        })
    }

}
