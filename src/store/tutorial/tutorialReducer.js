import * as actionType from "../actionType"

const initialState = {
    loading: false,
    tutorials: [],
    error: null,
    typeKey: "all",
    status: false
}


const tutorialReducer = (state = initialState, action) =>{
    const {payload, type} = action;
    
    switch (type) {


        // GET ALL TUTORIALS 

        case actionType.GET_ALL_TUTORIAL_REQUEST_SEND:
            return{
                ...state,
                loading: true,
                status: false
            }

            case actionType.GET_ALL_TUTORIAL_REQUEST_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    status: true,
                    tutorials: payload
                }

                case actionType.GET_ALL_TUTORIAL_REQUEST_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: payload
                    }

        // UPDATE TYPE KEY
        case actionType.UPDATE_TUTORIAL_TYPE_KEY:
           return{
               ...state,
               typeKey: payload
           }
    
        default:
            return state
    }
}

export default tutorialReducer;