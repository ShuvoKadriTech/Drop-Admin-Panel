import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import uploadImageReducer from "./reducer/uploadImage.reducer";

//Calendar
import calendar from "./calendar/reducer";
import galleryReducer from "./reducer/imageGallery.reducer";
import imageReducer from "./reducer/image/imageFolder.reducer";
import folderCreateReducer from "./reducer/image/folderCreate.reducer";
import bannerReducer from "./banner/bannerReducer";
import carTypesReducer from "./carTypes/carTypesReducer";
import { colorReducers } from "./color/colorReducers";

const rootReducer = combineReducers({
  // public
  Layout,
  Login: Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  uploadImage: uploadImageReducer,
  galleryReducer: galleryReducer,
  imageReducer,
  createFolder: folderCreateReducer,
  bannerReducer,
  carTypesReducer,
  colorReducers
});

export default rootReducer;
