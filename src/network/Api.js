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
export const GET_CAR_TYPES = ADMIN_ENDPOINT + "/carType";
export const DELETE_CAR_TYPE_PERMANENTLY =
  ADMIN_ENDPOINT + "/carType/deleteCarTypepParmanently";

export const EDIT_CAR_TYPE = ADMIN_ENDPOINT + "/carType/editCarType";
export const GET_SINGLE_CAR_TYPE = ADMIN_ENDPOINT + "/carType/";
export const GET_CAR_TYPE_FULL_DETAILS = ADMIN_ENDPOINT + "/carType/";

export const SINGLE_CAR_BRAND = ADMIN_ENDPOINT + "/car-brand/";

// COLOR

export const ADD_COLOR = ADMIN_ENDPOINT + "/color/addNew";
export const GET_ALL_COLOR = ADMIN_ENDPOINT + "/color/getColors";
export const EDIT_COLOR = ADMIN_ENDPOINT + "/color/editColor";

// YEAR

export const ADD_YEAR = ADMIN_ENDPOINT + "/year/add";
export const GET_ALL_YEARS = ADMIN_ENDPOINT + "/year/getAll";
export const EDIT_YEAR = ADMIN_ENDPOINT + "/year/update";

// ADMIN ROLE

export const ADD_ADMIN_ROLE = ADMIN_ENDPOINT + "/role/add";
export const GET_ALL_ADMIN_ROLE = ADMIN_ENDPOINT + "/role";
export const EDIT_ADMIN_ROLE = ADMIN_ENDPOINT + "/role/edit";
export const DELETE_ADMIN_ROLE = ADMIN_ENDPOINT + "/role/delete";
export const RESTORE_ADMIN_ROLE = ADMIN_ENDPOINT + "/role/restore";

// PARTNER

export const ADD_PARTNER = ADMIN_ENDPOINT + "/partner/add";
export const ALL_PARTNER = ADMIN_ENDPOINT + "/partner";
export const SINGLE_PARTNER = ADMIN_ENDPOINT + "/partner/";
export const EDIT_PARTNER = ADMIN_ENDPOINT + "/partner/edit";

//  DRIVER

export const ADD_DRIVER = ADMIN_ENDPOINT + "/driver/add";
export const GET_ALL_DRIVERS_BY_PARTNER = ADMIN_ENDPOINT + "/driver/partner/";
export const GET_SINGLE_DRIVER = ADMIN_ENDPOINT + "/driver/";
export const EDIT_DRIVER = ADMIN_ENDPOINT + "/driver/edit";

// CAR BRAND

export const ADD_CAR_BRAND = ADMIN_ENDPOINT + "/car-brand/add-new";
export const EDIT_CAR_BRAND = ADMIN_ENDPOINT + "/car-brand/edit";

// CAR BRAND MODEL

export const ADD_MODEL = ADMIN_ENDPOINT + "/car-model/add-new";
export const EDIT_MODEL = ADMIN_ENDPOINT + "/car-model/edit";

// END ADMIN API
