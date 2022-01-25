// export const API_URL = "http://localhost:5000";
// export const FTP_URL = "http://localhost:1000";

export const API_URL = "https://api.codepadding.com";
export const FTP_URL = "https://ftp.codepadding.com";

// FTP SERVER API
export const MULTIPLE_IMAGE_UPLOAD = FTP_URL + "/api/upload/image/multitple";

const ADMIN_ENDPOINT = "/api/v1/admin";

// ADMIN API

// LOGIN API

export const LOGIN = API_URL + ADMIN_ENDPOINT + "/auth/login";

// IMAGE UPLOAD
export const IMAGE_UPLOAD = ADMIN_ENDPOINT + "/image/upload";
export const LIST_IMAGE_FOLDER = ADMIN_ENDPOINT + "/image-folder/";
export const CREATE_IMAGE_FOLDER = ADMIN_ENDPOINT + "/image-folder/create";

// GET IMAGE
export const GET_GALLERY_LIST = ADMIN_ENDPOINT + "/image";

// banner
export const BANNER_LIST = ADMIN_ENDPOINT + "/banner";
export const ADD_BANNER = ADMIN_ENDPOINT + "/banner/add";

// END ADMIN API
