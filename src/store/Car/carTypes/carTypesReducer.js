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
  GET_SINGLE_CAR_TYPE_REQUEST_FAIL,
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
  colors: [],
  years: [],
  singleModel: {},
  
  carFuels: [],

};

const carTypesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CAR_TYPES_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case GET_CAR_TYPES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carTypes: payload,
        error: null,
        message: null,
      };

    case GET_CAR_TYPES_REQUEST_FAIL:
      return {
        ...state,
        error: payload,
        message: null,
        loading: false,
      };

    // EDIT CAR TYPE

    case EDIT_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };


    case GET_UPDATE_CAR_DATA:
      
      const updateData = state.carTypes.map((item) =>
        item.id == payload.carType.id ? payload.carType : item
      );
      return {
        ...state,
        loading: false,
        message: payload.message,
        error: null,
        carTypes: updateData,

      };

    case EDIT_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };

    // ADD CAR TYPE

    case ADD_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case ADD_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carTypes: [...state.carTypes, payload.data],
        error: null,
        message: payload.message,
      };

    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
      };

    case ADD_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };

    // GET SINGLE CAR TYPE_ID
    case GET_SINGLE_CAR_TYPE_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        status: false,
        error: null,
      };

    case GET_SINGLE_CAR_TYPE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        status: true,
        singleCarType: payload,
        error: null,
      };

    case GET_SINGLE_CAR_TYPE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
      };

    // ADD CAR TYPE BRAND

    case actionType.ADD_BRAND_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
        status: false,
      };

    case actionType.ADD_BRAND_REQUEST_SUCCESS:
      let findCarType = state.carTypes.find(
        (type) => type.id === payload.carBrand.carTypeId
      );
      findCarType.carBrands.push(payload.carBrand);

      return {
        ...state,
        loading: false,
        status: true,
        singleCarType: findCarType,
        error: null,
      };

    case actionType.ADD_BRAND_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: false,
        error: payload,
      };

    // EDIT CAR BRAND

    case actionType.EDIT_BRAND_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
        status: false,
      };
    case actionType.EDIT_BRAND_REQUEST_SUCCESS:
      // const newData = state.carTypes.map(
      //   item => (item.id === payload.data.id ? payload.data : item)
      // );

      let find = state.carTypes.find(
        (type) => type.id === payload.carBrand.carTypeId
      );

      const newData = find?.carBrands.map((item) =>
        item.id === payload.carBrand.id ? payload.carBrand : item
      );

      const data = { ...find, carBrands: newData };

      const update = state?.carTypes.map((item) =>
        item.id === data.id ? data : item
      );

      // console.log("find",find)
      // console.log("newData",newData)

      return {
        ...state,
        loading: false,
        status: true,
        carTypes: update,
        singleCarType: data,
        error: null,
      };

    case actionType.EDIT_BRAND_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: false,
        error: payload,
      };

    // ADD MODEL

    case actionType.ADD_MODEL_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        status: false,
        error: null,
      };

    case actionType.ADD_MODEL_REQUEST_SUCCESS:
      const getCarType = state.carTypes.find(
        (type) => type.id == payload.carTypeId
      );
      console.log("car type", getCarType);
      let getBrand = getCarType.carBrands.find(
        (b) => b.id == payload.carModel.carBrandId
      );
      console.log("brand", getBrand);

      getBrand.carModels.push(payload.carModel);

      return {
        ...state,
        loading: false,
        status: true,
        singleBrand: getBrand,
        error: null,
      };

    case actionType.ADD_MODEL_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        status: false,
        error: payload,
      };

    // EDIT MODEL

    case actionType.EDIT_MODEL_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
        status: false,
      };
    case actionType.EDIT_MODEL_REQUEST_SUCCESS:
      let singleCarType = state.carTypes.find(
        (type) => type.id == payload.typeId
      );

      let singleBrand = singleCarType.carBrands.find(
        (b) => b.id == payload.carModel.carBrandId
      );

      const updateModel = singleBrand.carModels.map((model) =>
        model.id == payload.carModel.id ? payload.carModel : model
      );

      let updatedBrand = { ...singleBrand, carModels: updateModel };

      const updatedBrands = singleCarType.carBrands.map((item) =>
        item.id == updatedBrand.id ? updatedBrand : item
      );

      const updatedSingleCarType = {
        ...singleCarType,
        carBrands: updatedBrands,
      };

      const finalData = state.carTypes.map((type) =>
        type.id == updatedSingleCarType.id ? updatedSingleCarType : type
      );

      return {
        ...state,
        loading: false,
        status: true,
        carTypes: finalData,
        singleBrand: updatedBrand,
        error: null,
      };

    case actionType.EDIT_MODEL_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
      };

    // GET COLORS AND YEAR

    case actionType.GET_COLORS_YEARS_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case actionType.GET_COLORS_YEARS_REQUEST_SUCCESS:
      // console.log("payload", payload)
      return {
        ...state,
        loading: false,
        colors: payload.colors,
        years: payload.years,
        error: null,
      };

    case actionType.GET_COLORS_YEARS_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    // ADD MODEL COLOR

    case actionType.ADD_MODEL_COLOR_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        status: false,
        error: null,
      };

    case actionType.ADD_MODEL_COLOR_REQUEST_SUCCESS:
      const type = state.carTypes.find((type) => type.id == payload.carTypeId);
      console.log("type", type);

      const brand = type.carBrands.find((b) => b.id == payload.brandId);
      console.log("brand", brand);
      let model = brand.carModels.find(
        (m) => m.id == payload.modelColor.car_colors.carModelId
      );
      console.log("before add model", model);
      model.colors.push(payload.modelColor);
      console.log("after add model", model);
      return {
        ...state,
        loading: false,
        status: true,
        singleModel: model,
        error: null,
      };

    case actionType.ADD_MODEL_COLOR_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
      };

    // ADD MODEL YEAR

    case actionType.ADD_MODEL_YEAR_REQUEST_SEND:
      return {
        ...state,
        loading: true,
        message: null,
        status: false,
        error: null,
      };

    case actionType.ADD_MODEL_YEAR_REQUEST_SUCCESS:
      // console.log("typeId", payload.typeId);
      const singleType = state.carTypes.find(
        (type) => type.id == payload.typeId
      );
      // console.log("type", singleType);

      const item = singleType.carBrands.find((b) => b.id == payload.bId);
      // console.log("brand", item);
      let getModel = item.carModels.find(
        (m) => m.id == payload.modelYear.car_years.carModelId
      );
      console.log("before add model", getModel);
      getModel.years.push(payload.modelYear);
      console.log("after add model", getModel);
      return {
        ...state,
        loading: false,
        status: true,
        singleModel: getModel,
        error: null,
      };

    case actionType.ADD_MODEL_YEAR_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        status: false,
        error: payload,
      };


    // GET CAR FUEL TYPES

    case actionType.GET_CAR_FUEL_TYPES_REQUEST_SEND:
      return {
        ...state,
        loading: true,
      };

    case actionType.GET_CAR_FUEL_TYPES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        carFuels: payload,
      };

    case actionType.GET_CAR_FUEL_TYPES_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionType.SELECT_CAR_FUEL_TYPE:
      return {
        ...state,
        loading: false,
        selectedCarFuel: payload,
      };

 
    default:
      return state;
  }
};

export default carTypesReducer;
