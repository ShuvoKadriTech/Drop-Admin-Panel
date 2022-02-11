// export const API_URL = "http://localhost:5000";
// export const FTP_URL = "http://localhost:1000";

export const API_URL = "https://api.codepadding.com";
export const FTP_URL = "https://ftp.codepadding.com";

// FTP SERVER API
export const MULTIPLE_IMAGE_UPLOAD = FTP_URL + "/api/upload/image/multitples";

const ADMIN_ENDPOINT = "/api/v1/admin";

// ADMIN API

// LOGIN API

export const LOGIN = ADMIN_ENDPOINT + "/auth/login";

// IMAGE UPLOAD
export const IMAGE_UPLOAD = ADMIN_ENDPOINT + "/image/upload";
export const LIST_IMAGE_FOLDER = ADMIN_ENDPOINT + "/image-folder/";
export const CREATE_IMAGE_FOLDER = ADMIN_ENDPOINT + "/image-folder/create";

// GET IMAGE
export const GET_GALLERY_LIST = ADMIN_ENDPOINT + "/image";

// banner
export const BANNER_LIST = ADMIN_ENDPOINT + "/banner";
export const ADD_BANNER = ADMIN_ENDPOINT + "/banner/add";
export const DELETE_BANNER = ADMIN_ENDPOINT + "/banner/delete";
export const GET_SINGLE_BANNER = ADMIN_ENDPOINT + "/banner/";
export const EDIT_BANNER = ADMIN_ENDPOINT + "/banner/edit";

// CAR TYPE

export const ADD_CAR_TYPE = ADMIN_ENDPOINT + "/carType/addNew";
export const GET_CAR_TYPES = ADMIN_ENDPOINT + "/carType/getCarTypes";
export const DELETE_CAR_TYPE_PERMANENTLY =
  ADMIN_ENDPOINT + "/carType/deleteCarTypepParmanently";

export const EDIT_CAR_TYPE = ADMIN_ENDPOINT + "/carType/editCarType";
export const GET_SINGLE_CAR_TYPE = ADMIN_ENDPOINT + "/carType/details";

// COLOR

export const ADD_COLOR = ADMIN_ENDPOINT + "/color/addNew";
export const GET_ALL_COLOR = ADMIN_ENDPOINT + "/color/getColors";
export const EDIT_COLOR = ADMIN_ENDPOINT + "/color/editColor";

// YEAR

export const ADD_YEAR = ADMIN_ENDPOINT + "/year/add";
export const GET_ALL_YEARS = ADMIN_ENDPOINT + "/year/getAll";

export const EDIT_YEAR = ADMIN_ENDPOINT + "/year/update";

// END ADMIN API
