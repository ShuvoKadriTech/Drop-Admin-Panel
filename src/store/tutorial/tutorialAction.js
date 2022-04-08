import { ALL_TUTORIAL } from "../../network/Api";
import * as actionType from "../actionType"
import requestApi from './../../network/httpRequest';


export const getAllTutorial = (refresh = false) => async (dispatch, getState) =>{
    const {tutorials, typeKey} = getState().tutorialReducer;


    try {
        if(tutorials.length < 1 || refresh){
            dispatch({
                type: actionType.GET_ALL_TUTORIAL_REQUEST_SEND
            })
    
            const {data} = await requestApi().request(ALL_TUTORIAL,{
                params:{
                    type: typeKey
                }
            })
            
            if(data.status){
                dispatch({
                    type: actionType.GET_ALL_TUTORIAL_REQUEST_SUCCESS,
                    paylod: data.data.tutorials
                })
            }else{
                dispatch({
                    type: actionType.GET_ALL_TUTORIAL_REQUEST_FAIL,
                    paylaod: data.error
                })
            }
        }

    } catch (error) {
        dispatch({
            type: actionType.GET_ALL_TUTORIAL_REQUEST_FAIL,
            paylaod: error.message
        })
    }
}


// UPDATE TYPE KEY 

export const updateTutorialTypeKey = (type) => dispatch =>{
    dispatch({
        type: actionType.UPDATE_TUTORIAL_TYPE_KEY,
        payload: type
    })
}