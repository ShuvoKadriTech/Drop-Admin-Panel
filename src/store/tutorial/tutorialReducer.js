import * as actionType from "../actionType";

const initialState = {
  loading: false,
  tutorials: [],
  error: null,
  typeKey: "all",
  status: false,
};

const tutorialReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    // GET ALL TUTORIALS

    case actionType.GET_ALL_TUTORIAL_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        status: false,
      };

    case actionType.GET_ALL_TUTORIAL_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: false,
        tutorials: payload,
      };

    case actionType.GET_ALL_TUTORIAL_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionType.ADD_TUTORIAL_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        status: false,
      };

    case actionType.ADD_TUTORIAL_REQUEST_SUCCESS: 
      return{
          ...state,
          loading: false,
          tutorials: [...state.tutorials, payload],
          status: true
      }

    case actionType.ADD_TUTORIAL_REQUEST_FAIL: 
      return{
          ...state,
          loading: false,
          error: payload
      }

    //   DELETE TUTORIAL 

    case actionType.DELETE_TUTORIAL_REQUEST_SEND:
        return{
            ...state,
            loading: true
        }

    case actionType.DELETE_TUTORIAL_REQUEST_SUCCESS:
        const restTutorial = state.tutorials.filter(item => item.id != payload.id)
        return{
            ...state,
            loading: false,
            tutorials: restTutorial
        }

        case actionType.DELETE_TUTORIAL_REQUEST_FAIL: 
        return{
            ...state,
            loading: false,
            error: payload
        }

    // UPDATE TYPE KEY
    case actionType.UPDATE_TUTORIAL_TYPE_KEY:
      return {
        ...state,
        typeKey: payload,
      };

    default:
      return state;
  }
};

export default tutorialReducer;
