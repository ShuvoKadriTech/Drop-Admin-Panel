import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR
} from "./actionTypes";



const initialState = {
  error: "",
  loading: false,
  admin:  localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin'))  : null,
  message:"",
  accessToken: localStorage.getItem('accessToken')?localStorage.getItem('accessToken'):null
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true
      };
      break;
    case LOGIN_SUCCESS:
      const { admin, accessToken, message } = action.payload;

      state = {
        ...state,
        loading: false,
         admin,
        accessToken,
        message
      };
      break;
    case LOGOUT_USER:
      state = { ...state };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
