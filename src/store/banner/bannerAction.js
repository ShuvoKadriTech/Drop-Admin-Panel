import { BANNER_LIST } from '../../network/Api';
import requestApi from '../../network/httpRequest';
import * as actionType from '../actionType'


export const getBannerListAction = ({type = 1,status =1,sortBy = "DESC"}) => async (dispatch, getState) => {


    try {
        dispatch({
            type: actionType.BANNER_REQUEST_SEND
        })

        const request = requestApi()
        const { data } = await request(BANNER_LIST,{
            params:{
                type : type,
                status:status,
                sortBy:sortBy
            }
        });

        console.log(data);

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
