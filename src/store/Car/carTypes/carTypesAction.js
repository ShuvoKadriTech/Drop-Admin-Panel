import {
  GET_CAR_TYPES_REQUEST_SEND,
  GET_CAR_TYPES_REQUEST_SUCCESS,
  GET_CAR_TYPES_REQUEST_FAIL,
  DELETE_CAR_TYPE_REQUEST_SEND,
  DELETE_CAR_TYPE_REQUEST_SUCCESS,
  DELETE_CAR_TYPE_REQUEST_FAIL,
  EDIT_CAR_TYPE_REQUEST_SEND,
  EDIT_CAR_TYPE_REQUEST_SUCCESS,
  EDIT_CAR_TYPE_REQUEST_FAIL,
  ADD_CAR_TYPE_REQUEST_SEND,
  ADD_CAR_TYPE_REQUEST_SUCCESS,
  ADD_CAR_TYPE_REQUEST_FAIL,
  CLEAR_SUCCESS_MESSAGE,
  GET_UPDATE_CAR_DATA,
  GET_SINGLE_CAR_TYPE_REQUEST_SEND,
  GET_SINGLE_CAR_TYPE_REQUEST_SUCCESS,
  GET_SINGLE_CAR_TYPE_REQUEST_FAIL
} from "../../actionType";
import requestApi from "../../../network/httpRequest";
import * as actionType from "../../actionType";

import {
  EDIT_CAR_TYPE,
  GET_CAR_TYPES,
  ADD_CAR_TYPE,
  GET_CAR_TYPE,
  GET_SINGLE_CAR_TYPE,
  ADD_CAR_BRAND,
  EDIT_CAR_BRAND,
  ADD_MODEL,
  EDIT_MODEL,
  COLORS_YEARS,
  ADD_MODEL_COLOR
} from "../../../network/Api";
import { toast } from "react-toastify";
import { GET_CAR_TYPE_FULL_DETAILS } from "./../../../network/Api";

// ADD CAR TYPES

export const addCarType = carData => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CAR_TYPE_REQUEST_SEND
    });

    const {
      data: { status, message, error, data }
    } = await requestApi().request(ADD_CAR_TYPE, {
      method: "POST",
      data: carData
    });

    if (status) {
      toast.success(data.message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: ADD_CAR_TYPE_REQUEST_SUCCESS,
        payload: { data, message }
      });

      dispatch({
        type: CLEAR_SUCCESS_MESSAGE
      });
    } else {
      toast.warn(data.error, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: ADD_CAR_TYPE_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_CAR_TYPE_REQUEST_FAIL,
      payload: error
    });
  }
};

// GET CAR TYPES

export const getCarTypes = (refresh = false) => async (dispatch, getState) => {
  try {
    const { carTypes } = getState().carTypesReducer;

    if (carTypes.length <= 0 || refresh) {
      dispatch({
        type: GET_CAR_TYPES_REQUEST_SEND
      });

      const { data: { data, status, error } } = await requestApi().request(
        GET_CAR_TYPES
      );
      console.log("carTypes", data);
      if (status) {
        dispatch({
          type: GET_CAR_TYPES_REQUEST_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: GET_CAR_TYPES_REQUEST_FAIL,
          payload: error
        });
      }
    }
  } catch (error) {
    dispatch({
      type: GET_CAR_TYPES_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// EDIT CAR TYPE

export const editCarType = carData => async dispatch => {
  try {
    dispatch({
      type: EDIT_CAR_TYPE_REQUEST_SEND
    });

    const { data } = await requestApi().request(EDIT_CAR_TYPE, {
      method: "POST",
      data: carData
    });

    console.log(data);

    if (data.status) {
      if (data.message) {
        dispatch({
          type: EDIT_CAR_TYPE_REQUEST_SUCCESS,
          payload: data.message
        });
      }
      if (data.data.carType) {
        dispatch({
          type: GET_UPDATE_CAR_DATA,
          payload: data.data.carType
        });
      }
    } else {
      dispatch({
        type: EDIT_CAR_TYPE_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch(
      dispatch({
        type: EDIT_CAR_TYPE_REQUEST_FAIL,
        payload: error.message
      })
    );
  }
};

// export const getCarTypeDetails = carTypeId => async dispatch => {
//   try {
//     dispatch({
//       type: GET_SINGLE_CAR_TYPE_REQUEST_SEND
//     });

//     const { data } = await requestApi().request(GET_CAR_TYPE_FULL_DETAILS, {
//       params: { id: carTypeId }
//     });
//     // console.log("car type", data);
//     if (data.status) {
//       dispatch({
//         type: GET_SINGLE_CAR_TYPE_REQUEST_SUCCESS,
//         payload: data.data.carType
//       });
//     } else {
//       dispatch({
//         type: GET_SINGLE_CAR_TYPE_REQUEST_FAIL,
//         payload: error
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: GET_SINGLE_CAR_TYPE_REQUEST_FAIL,
//       payload: error.message
//     });
//   }
// };

// ADD CAR TYPE BRAND

export const addCarBrand = carBrand => async dispatch => {
  // console.log("car brand", carBrand);

  try {
    dispatch({
      type: actionType.ADD_BRAND_REQUEST_SEND
    });
    const { data } = await requestApi().request(ADD_CAR_BRAND, {
      method: "POST",
      data: carBrand
    });
    // console.log("car brand", data);
    if (data.status) {
      toast.success(data.message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      dispatch({
        type: actionType.ADD_BRAND_REQUEST_SUCCESS,
        payload: { carBrand: data.data.carBrand }
      });
    } else {
      toast.warn(data.error, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: actionType.ADD_BRAND_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADD_BRAND_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// EDIT CAR BRAND

export const editCarBrand = carBrand => async (dispatch, getState) => {
  // console.log("carTypeId", carBrand);
  try {
    dispatch({
      type: actionType.EDIT_BRAND_REQUEST_SEND
    });

    const {
      data: { status, data, message, error }
    } = await requestApi().request(EDIT_CAR_BRAND, {
      method: "POST",
      data: carBrand
    });

    // console.log("edit car brand", data);
    // const { status, message, data} = data

    if (status) {
      // let findCarType = carTypes.find(type => type.id ===  data.carBrand.carTypeId)

      // const newData = findCarType?.carBrands.map(
      //   item => (item.id === data.carBrand.id ? data.carBrand : item)
      // );

      // const updateCarTypeWithBrand = {...findCarType, carBrands: newData}
      // console.log("update",updateCarTypeWithBrand)

      toast.success(message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      dispatch({
        type: actionType.EDIT_BRAND_REQUEST_SUCCESS,
        payload: { carBrand: data.carBrand }
      });
    } else {
      toast.warn(error, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: actionType.EDIT_BRAND_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.EDIT_BRAND_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// ADD BRAND MODEL

export const addBrandModel = (modelData, carTypeId) => async dispatch => {
  try {
    dispatch({
      type: actionType.ADD_MODEL_REQUEST_SEND
    });

    const { data } = await requestApi().request(ADD_MODEL, {
      method: "POST",
      data: modelData
    });

    console.log("car brand model", data);
    if (data.status) {
      toast.success(data.message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      dispatch({
        type: actionType.ADD_MODEL_REQUEST_SUCCESS,
        payload: { carModel: data.data.carModel, carTypeId }
      });
    } else {
      toast.warn(data.error, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: actionType.ADD_MODEL_REQUEST_FAIL,
        payload: data.error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.ADD_MODEL_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// EDIT MODEL

export const editBrandModel = (model, typeId) => async (dispatch, getState) => {
  console.log("model", model);
  try {
    dispatch({
      type: actionType.EDIT_MODEL_REQUEST_SEND
    });

    const {
      data: { status, data, message, error }
    } = await requestApi().request(EDIT_MODEL, {
      method: "POST",
      data: model
    });

    // console.log("edit car model", data);
    // const { status, message, data} = data

    if (status) {
      toast.success(message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      dispatch({
        type: actionType.EDIT_MODEL_REQUEST_SUCCESS,
        payload: { carModel: data.carModel, typeId }
      });
    } else {
      toast.warn(error, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: actionType.EDIT_MODEL_REQUEST_FAIL,
        payload: error
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.EDIT_MODEL_REQUEST_FAIL,
      payload: error.message
    });
  }
};

// GET ALL COLORS AND YEARS
export const getColorsYears = () => async dispatch => {

  try {
    dispatch({
      type: actionType.GET_COLORS_YEARS_REQUEST_SEND
    })
    const {data} = await requestApi().request(COLORS_YEARS)
    console.log("color and years", data)
    if(data.status){
      dispatch({
        type:actionType.GET_COLORS_YEARS_REQUEST_SUCCESS,
        payload: {colors: data.data.colors, years: data.data.years}
      })
    }
    else{
      dispatch({
        type: actionType.GET_COLORS_YEARS_REQUEST_FAIL,
        payload: data.error
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_COLORS_YEARS_REQUEST_FAIL,
      payload: error.message
    })
  }

}


// ADD COLOR FOR MODEL 

export const addModelColor = (modelColor, brandId, carTypeId) => async dispatch =>{
  // console.log("modelColor, brandId, carTypeId",modelColor, brandId, carTypeId)
  try {
    dispatch({
      type: actionType.ADD_MODEL_COLOR_REQUEST_SEND
    })

    const {data} = await requestApi().request(ADD_MODEL_COLOR,{
      method: 'POST',
      data: modelColor
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
        progress: undefined
      });

      dispatch({
        type: actionType.ADD_MODEL_COLOR_REQUEST_SUCCESS,
        payload: {modelColor: data.data.modelColor, brandId: brandId, carTypeId: carTypeId}
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
        progress: undefined
      });
      dispatch({
        type: actionType.ADD_MODEL_COLOR_REQUEST_FAIL,
        payload: data.error
      })
    }

  } catch (error) {
    
  }
}
