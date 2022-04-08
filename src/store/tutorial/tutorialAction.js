import { toast } from "react-toastify";
import { ADD_TUTORIAL, ALL_TUTORIAL, DELETE_TUTORIAL } from "../../network/Api";
import * as actionType from "../actionType"
import requestApi from './../../network/httpRequest';


export const getAllTutorial = (refresh = false) => async (dispatch, getState) =>{
    


    try {
        const {tutorials, typeKey} = getState().tutorialReducer;

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
                    payload: data.data.tutorials
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

// ADD TUTORIAL 

export const addTutorial = (tutorialData) => async dispatch => {
    // console.log("props data", tutorialData)
    try {
        dispatch({
            type: actionType.ADD_TUTORIAL_REQUEST_SEND
        })

        const {data} = await requestApi().request(ADD_TUTORIAL,{
          method: "POST",
          data:  tutorialData
        })

        if(data.status){
            toast.success(data.message, {
                // position: "bottom-right",
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

             
                dispatch({
                    type: actionType.ADD_TUTORIAL_REQUEST_SUCCESS,
                    payload: data.data.tutorial
                })
              
        }else{
            toast.warn(data.error, {
                // position: "bottom-right",
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              dispatch({
                  type: actionType.ADD_TUTORIAL_REQUEST_FAIL,
                  payload: data.error
              })

        }

    } catch (error) {
        dispatch({
            type: actionType.ADD_TUTORIAL_REQUEST_FAIL,
            payload: error.message
        })
    }
}

// DELETE 

export const deleteTutorial = (tId) => async dispatch =>{
    try {
        dispatch({
            type: actionType.DELETE_TUTORIAL_REQUEST_SEND
        })

        const {data} = await requestApi().request(DELETE_TUTORIAL,{
            method: "POST",
            data: tId
        })

        console.log("tutorial delete res", data)

        if(data.status){
            toast.success(data.message, {
                // position: "bottom-right",
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            dispatch({
                type: actionType.DELETE_TUTORIAL_REQUEST_SUCCESS,
                payload: data.data.tutorial
            })
        }else{
            toast.warn(data.error, {
                // position: "bottom-right",
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            dispatch({
                type: actionType.DELETE_TUTORIAL_REQUEST_FAIL,
                paylaod: data.error
            })
        }

    } catch (error) {
        dispatch({
            type: actionType.DELETE_TUTORIAL_REQUEST_FAIL,
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