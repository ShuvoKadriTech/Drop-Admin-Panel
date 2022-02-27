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
  GET_SUCCESS_MESSAGE,
  CLEAR_SUCCESS_MESSAGE,
  GET_UPDATE_CAR_DATA,
  GET_SINGLE_CAR_TYPE_REQUEST_SEND,
  GET_SINGLE_CAR_TYPE_REQUEST_SUCCESS,
  GET_SINGLE_CAR_TYPE_REQUEST_FAIL
} from "../../actionType";
import * as actionType from "../../actionType";

const initialState = {
  loading: false,
  carTypes: [],
  error: null,
  message: null,
  singleCarType: null, 
  status: false,
  singleBrand: {},
 
};

const carTypesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CAR_TYPES_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case GET_CAR_TYPES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carTypes: payload,
        error: null,
        message: null
      };

    case GET_CAR_TYPES_REQUEST_FAIL:
      return {
        ...state,
        error: payload,
        message: null,
        loading: false
      };

    // EDIT CAR TYPE

    case EDIT_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case EDIT_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null
      };

    case GET_UPDATE_CAR_DATA:

      const oldData = state.carTypes.find(i=>i.id===payload.id)

      const newCarData = {
        ...oldData,
        payload
      }
      const updateData = state.carTypes.map(
        item => (item.id === payload.id ? newCarData : item)
      );
      return {
        ...state,
        loading: false,
        message: null,
        error: null,
        carTypes: updateData
      };

    case EDIT_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null
      };

    // ADD CAR TYPE

    case ADD_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true
      };

    case ADD_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carTypes: [...state.carTypes, payload.data],
        error: null,
        message: payload.message
      };

    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        loading: false,
        error: null,
        message: null
      };

    case ADD_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null
      };

    // GET CAR TYPE

    // case GET_SINGLE_CAR_TYPE_REQUEST_SEND:
    //   return {
    //     ...state,
    //     loading: true
    //   };

    // case GET_SINGLE_CAR_TYPE_REQUEST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     carType: payload,
    //     error: null,
    //     message: null
    //   };

    // case GET_SINGLE_CAR_TYPE_REQUEST_FAIL:
    // return {
    //   ...state,
    //   loading: false,
    //   error: payload,
    //   message: null
    // };

    // ADD CAR TYPE BRAND

    case actionType.ADD_BRAND_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
        status: false
      };
    case actionType.ADD_BRAND_REQUEST_SUCCESS:
      let findCarType = state.carTypes.find(
        type => type.id === payload.carBrand.carTypeId
      );
      findCarType.carBrands.push(payload.carBrand);

      return {
        ...state,
        loading: false,
        status: true,
        singleCarType: findCarType,
        error: null
      };

    case actionType.ADD_BRAND_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: false,
        error: payload
      };

    // EDIT CAR BRAND

    case actionType.EDIT_BRAND_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null, 
        status: false
      };
    case actionType.EDIT_BRAND_REQUEST_SUCCESS:
      // const newData = state.carTypes.map(
      //   item => (item.id === payload.data.id ? payload.data : item)
      // );

      let find = state.carTypes.find(type => type.id ===  payload.carBrand.carTypeId)

      const newData = find?.carBrands.map(
        item => (item.id === payload.carBrand.id ? payload.carBrand : item)
      );

      const data = {...find, carBrands: newData}

      const update = state?.carTypes.map(
        item => (item.id === data.id ? data : item)
      );

    // console.log("find",find)
    // console.log("newData",newData)

      return {
        ...state,
        loading: false,
        status: true,
        carTypes: update,
        singleCarType: data,
        error: null
      };

    case actionType.EDIT_BRAND_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: false,
        error: payload
      };



      // ADD MODEL 

      case actionType.ADD_MODEL_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        status: false,
        error: null
      };

      case actionType.ADD_MODEL_REQUEST_SUCCESS:

      const getCarType = state.carTypes.find(type => type.id == payload.carTypeId)

      let getBrand = getCarType.carBrands.find(b => b.id == payload.carModel.carBrandId)
      console.log("brand",getBrand)

      getBrand.carModels.push(payload.carModel)

      return {
        ...state,
        loading: false,
        status: true,
        singleBrand: getBrand,
        error: null
      };

      case actionType.ADD_MODEL_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: false,
        error: payload
      };

      // EDIT MODEL 

      case actionType.EDIT_MODEL_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null, 
        status: false
      };
    case actionType.EDIT_MODEL_REQUEST_SUCCESS:

      let singleCarType = state.carTypes.find(type => type.id == payload.typeId)

      let singleBrand = singleCarType.carBrands.find(b => b.id == payload.carModel.carBrandId)

      const updateModel = singleBrand.carModels.map(model => model.id == payload.carModel.id ? payload.carModel : model)

      let updatedBrand = {...singleBrand, carModels: updateModel}

      const updatedBrands = singleCarType.carBrands.map(item => item.id == updatedBrand.id ? updatedBrand : item)

      const updatedSingleCarType = {...singleCarType, carBrands: updatedBrands}

      const finalData = state.carTypes.map(type => type.id == updatedSingleCarType.id ?updatedSingleCarType : type  )

      return {
        ...state,
        loading: false,
        status: true,
        carTypes: finalData,
        singleBrand: updatedBrand,
        error: null
      };

    case actionType.EDIT_MODEL_REQUEST_FAIL:

        return{
          ...state,
          loading: false,
          status: false,
          error: payload
        }

    default:
      return state;
  }
};

export default carTypesReducer;
