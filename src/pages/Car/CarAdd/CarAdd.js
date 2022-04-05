import React, { useEffect, useMemo, useState } from "react";
//@ts-check
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link, useParams } from "react-router-dom";
import ImageSelectionDialog from "./../../Utility/ImageSelectionDialog";
// import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Modal,
  Row,
  Spinner,
  Form,
} from "reactstrap";
import { SINGLE_PARTNER } from "../../../network/Api";
import requestApi from "./../../../network/httpRequest";
import {
  updateSearchKey,
  getPartners,
  addCar,
  selectCarType,
  selectCarBrand,
  selectCarBrandModel,
  selectModelColor,
  selectModelYear,
  selectCarFuel,
  editCar,
  setStatusFalse,
} from "./../../../store/partner/partnerActions";
import { Autocomplete, Box, TextField } from "@mui/material";
import { removeAllSelectedGalleryImage } from "../../../store/action/galleryAction";
import {
  getCarFuelTypes,
  getCarTypes,
} from "../../../store/Car/carTypes/carTypesAction";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";

const CarAdd = () => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  let {
    partners,
    searchKey,
    status,
    selectedCarType,
    selectedCarBrand,
    selectedBrandModel,
    selectedModelColor,
    selectedModelYear,
    selectedCarFuel,
    loading,
  } = useSelector((state) => state.partnerReducer);

  const {status: carListStatus} = useSelector(state => state.carReducer)
  const { carTypes, carFuels } = useSelector((state) => state.carTypesReducer);

  const [openPartnerSearch, setOpenPartnerSearch] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState();
  const [searchCarType, setSearchCarType] = useState("");
  const [searchCarBrand, setSearchCarBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchCarFuel, setSearchCarFuel] = useState("");
  const [carRegisterNumber, setCarRegisterNumber] = useState("");
  const [carSmartCardFont, setCarSmartCardFont] = useState(null);
  const [carSmartCardBack, setCarSmartCardBack] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [modal_fullscreen, setmodal_fullscreen] = useState(false);
  const [carImages, setCarImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // GET PARTNER

  useEffect(() => {
    if (carTypes.length > 0) {
      const pID = searchParams.get("pID");
      // console.log("partner Id ===-", pID);
      if (pID) {
        const findPartner = partners.find((partner) => partner.id == pID);
        if (findPartner) {
          console.log("find partner", findPartner);
          setPartner(findPartner);
        } else {
          console.log("call partner for api");
          callPartner(pID);
        }
      } else {
        setOpenPartnerSearch(true);
      }
    }
  }, [carTypes]);

  //  CALL PARTNER

  const callPartner = async (partnerId) => {
    const data = await requestApi().request(SINGLE_PARTNER + partnerId);
    console.log("single partner", data.data.data.partner);
    if (data.status) {
      // console.log("find partner by api--", data.data.partner)
      // setSelectedPartner(data.data.partner);
      setPartner(data.data.data.partner);
    }
    // else {--
    //   history.goBack();
    // }
  };

  // SELECT PARTNER

  const selectPartner = (partner) => {
    // console.log("id", id)
    setOpenPartnerSearch(false);
    setPartner(partner);
    const params = new URLSearchParams({ pID: partner.id });
    history.replace({ pathname: pathname, search: params.toString() });
  };

  // SEARCH KEY LISTENER

  const searchKeyListener = (value) => {
    dispatch(updateSearchKey(value));
  };

  // CALL PARTNER WITH SEARCH KEY

  useEffect(() => {
    if (searchKey) {
      callPartnerList(true);
    }
  }, [searchKey]);

  // CALL PARTNER LIST

  const callPartnerList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(getPartners(refresh));
  };

  // SET PARTNER
  const setPartner = (partner) => {
    // partner

    setSelectedPartner(partner);

    // console.log("selected partner", partner);

    if (id) {
      // console.log("selectedPartner----------", selectedPartner);
      // console.log("id------", id);
      const findCar = partner?.cars.find((car) => car.id == id);
      console.log("findCar------------------", findCar);
      // selectedCarType = findCar.car_type;
      if (findCar) {
        const {
          car_type,
          car_brand,
          car_fuel_type,
          year,
          color,
          car_model,
          car_images,
          carSmartCardBack,
          carSmartCardFont,
          carRegisterNumber,
        } = findCar;
        // car_type

        const findCarType = carTypes.find((item) => item.id == car_type.id);
        const findBrand = findCarType.carBrands.find(
          (brand) => brand.id == car_brand.id
        );
        const findModel = findBrand.carModels.find(
          (model) => model.id == car_model.id
        );
        const findColor = findModel.colors.find((c) => c.id == color.id);
        const findYear = findModel.years.find((y) => y.id == year.id);
        // console.log("findCarType",findCarType)

        dispatch(selectCarType(findCarType));
        dispatch(selectCarBrand(findBrand));
        dispatch(selectCarBrandModel(findModel));
        dispatch(selectModelColor(findColor));
        dispatch(selectModelYear(findYear));
        dispatch(selectCarFuel(car_fuel_type));
        setCarSmartCardFont(carSmartCardFont);
        setCarSmartCardBack(carSmartCardBack);
        setCarImages(car_images);
        setCarRegisterNumber(carRegisterNumber);
      }
      // selectedCarType = findCar.carType;
    }
  };

  useEffect(() => {
    if (carTypes.length <= 0) {
      dispatch(getCarTypes(true));
    }
    if (carFuels.length <= 0) {
      dispatch(getCarFuelTypes());
    }
  }, [carTypes, carFuels]);

  // const isSelectedCarType = (params) => {
  //   if (selectedCarType !== null) {
  //     return <TextField {...params} label="Select a Color" />;
  //   } else {
  //     return toast.warn("select car type first", {
  //       // position: "bottom-right",
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  // SELECT IMAGE

  const handleImage = (imgId) => {
    // console.log("id---", id);
    const params = new URLSearchParams({ pID: selectedPartner.id });

    history.replace({ pathname: pathname, search: params.toString() });
    setImageId(imgId);
    setmodal_fullscreen(true);
  };

  // REMOVE CAR IMAGE

  const removeSelection = (index) => {
    const list = carImages;
    list.splice(index, 1);
    console.log("rest images", list);
    setCarImages([...list]);

    // dispatch(removeImage(index))
  };

  const handleSubmit = () => {
    if (
      selectedCarType == null ||
      selectedCarBrand == null ||
      selectedBrandModel == null ||
      selectedModelColor == null ||
      selectedModelYear == null ||
      selectedCarFuel == null
    ) {
      return toast.warn("Please Fillup all required Field", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (carRegisterNumber == null || carRegisterNumber == "") {
      return toast.warn("Please add car registration number", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (carSmartCardFont == null || carSmartCardBack == null) {
      return toast.warn("Please add car smart card both side image", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (carImages.length < 3) {
      return toast.warn("Please add minimum 3 images of car", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const carImagesPath = carImages.map((image) => image.path);
    // console.log("path----", carImagesPath);

    const data = {
      partnerId: selectedPartner.id,
      carTypeId: selectedCarType.id,
      carBrandId: selectedCarBrand.id,
      carModelId: selectedBrandModel.id,
      carColorId: selectedModelColor.id,
      carYearId: selectedModelYear.id,
      carFuelId: selectedCarFuel.id,
      carRegisterNumber,
      carSmartCardFont,
      carSmartCardBack,
      carImages: carImagesPath,
    };

    if (id) {
      dispatch(editCar({ ...data, id:id }));
    } else {
      dispatch(addCar(data));
    }

    // console.log("car data-------------------", data);
  };

  // SUCCESS

  useEffect(() => {
    if (status || carListStatus) {
      // const pID = searchParams.get('pID')
      // history.push(`/partner/${pID}`);
      history.goBack();
    }
  }, [status,carListStatus]);


  

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Partner"
              title="Car"
              breadcrumbItem={id ? "Edit" : "Add"}
              //   hideSettingBtn={true}
              isRefresh={false}
            />

            <Card>
              <CardBody>
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-center"
                    style={{ borderRight: "1px solid lightgray" }}
                  >
                    {selectedPartner ? (
                      <div style={{ width: "215px" }}>
                        <img
                          onClick={() => {
                            // setIsZoom(true);
                          }}
                          className="img-fluid cursor-pointer"
                          alt="Partner"
                          src={selectedPartner.img}
                          width="100%"
                        />
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </Col>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-between  align-items-center"
                  >
                    <div className="ps-4">
                      <div>
                        <h5>Partner Name:</h5>
                        <Value>{selectedPartner?.name}</Value>
                      </div>
                      <div>
                        <h5>Phone:</h5>
                        <Value>
                          {selectedPartner ? selectedPartner.phone : "N/A"}
                        </Value>
                      </div>
                      <div>
                        <h5>Gmail:</h5>
                        <Value>
                          {selectedPartner ? selectedPartner.email : "N/A"}
                        </Value>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row>
                  <Col xl={6}>
                    <Autocomplete
                      className="cursor-pointer"
                      value={selectedCarType}
                      onChange={(event, newValue) => {
                        dispatch(selectCarType(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.id == value.id
                      }
                      inputValue={searchCarType}
                      onInputChange={(event, newInputValue) => {
                        setSearchCarType(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={carTypes.length > 0 ? carTypes : []}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select a Car Type" />
                      )}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="60"
                            src={option.image}
                            alt=""
                          />
                          {option.name}
                        </Box>
                      )}
                    />
                  </Col>
                  <Col xl={6} className="py-4 py-xl-0">
                    <Autocomplete
                      disabled={selectedCarType == null}
                      value={selectedCarType !== null && selectedCarBrand}
                      // defaultValue={""}
                      onChange={(event, newValue) => {
                        dispatch(selectCarBrand(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => (option ? option.name : "")}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      inputValue={searchCarBrand}
                      onInputChange={(event, newInputValue) => {
                        setSearchCarBrand(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo2"
                      options={
                        selectedCarType !== null
                          ? selectedCarType.carBrands
                          : []
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select a Car Brand" />
                      )}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}
                        </Box>
                      )}
                    />
                  </Col>
                </Row>

                <Row className="py-xl-4">
                  <Col xl={6}>
                    <Autocomplete
                      // clearOnBlur={true}
                      disabled={selectedCarBrand == null}
                      value={selectedCarBrand !== null && selectedBrandModel}
                      onChange={(event, newValue) => {
                        dispatch(selectCarBrandModel(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => (option ? option.name : "")}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      inputValue={searchModel}
                      onInputChange={(event, newInputValue) => {
                        setSearchModel(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo3"
                      options={
                        selectedCarBrand !== null
                          ? selectedCarBrand.carModels
                          : []
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select a Brand Model" />
                      )}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}
                        </Box>
                      )}
                    />
                  </Col>
                  <Col xl={6} className="py-4 py-xl-0">
                    <Autocomplete
                      disabled={selectedBrandModel == null}
                      value={selectedBrandModel !== null && selectedModelColor}
                      onChange={(event, newValue) => {
                        dispatch(selectModelColor(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => (option ? option.name : "")}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      inputValue={searchColor}
                      onInputChange={(event, newInputValue) => {
                        setSearchColor(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo4"
                      options={
                        selectedBrandModel !== null
                          ? selectedBrandModel.colors
                          : []
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select a Color" />
                      )}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <span style={{ color: `${option.colorCode}` }}>
                            {option.name}
                          </span>
                        </Box>
                      )}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xl={6}>
                    <Autocomplete
                      disabled={selectedBrandModel == null}
                      value={selectedBrandModel !== null && selectedModelYear}
                      onChange={(event, newValue) => {
                        dispatch(selectModelYear(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) =>
                        option.year ? option.year.toString() : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      inputValue={searchYear.toString()}
                      onInputChange={(event, newInputValue) => {
                        setSearchYear(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo5"
                      options={
                        selectedBrandModel !== null
                          ? selectedBrandModel?.years
                          : []
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select a Year" />
                      )}
                      // renderOption={(props, option) => (
                      //   <Box
                      //     component="li"
                      //     sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      //     {...props}
                      //   >
                      //     <span style={{ color: `${option.colorCode}` }}>
                      //       {option.year}
                      //     </span>
                      //   </Box>
                      // )}
                    />
                  </Col>
                  <Col xl={6} className="py-4 py-xl-0">
                    <Autocomplete
                      // disabled={selectedBrandModel == null}
                      value={selectedCarFuel}
                      onChange={(event, newValue) => {
                        dispatch(selectCarFuel(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => (option ? option.name : "")}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      inputValue={searchCarFuel}
                      onInputChange={(event, newInputValue) => {
                        setSearchCarFuel(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo6"
                      options={carFuels.length > 0 ? carFuels : []}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select car fuel type" />
                      )}
                    />
                  </Col>
                </Row>
                {/* CAR SMART CAR IMAGES */}
                <Row className="py-xl-4">
                  <Col xl={6}>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Enter car license number"
                        // defaultValue="Hello World"
                        type="text"
                        style={{ width: "100%" }}
                        value={carRegisterNumber}
                        onChange={(event) =>
                          setCarRegisterNumber(event.target.value)
                        }
                      />
                    </div>
                  </Col>
                </Row>
                {/* CAR SMART CARD IMAGE */}
                <Row>
                  <Col xl={6} className="py-4 py-xl-0">
                    <div className="d-flex justify-content-center flex-column">
                      <h6>Upload Car Smart Card Front Image</h6>
                      <Card className="cursor-pointer">
                        <div
                          className="d-flex justify-content-center align-content-center"
                          style={{
                            border: "1px solid rgb(207 207 207)",
                            height: "145px",
                          }}
                        >
                          {carSmartCardFont ? (
                            <ImageView>
                              <>
                                <img
                                  src={carSmartCardFont}
                                  className="img-thumbnail img__view"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                  alt=""
                                />
                                <div className="button__wrapper">
                                  <button
                                    className="btn btn-danger "
                                    // onClick={() => handleDelete(item.id)}
                                    onClick={() => setCarSmartCardFont(null)}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </div>
                              </>
                            </ImageView>
                          ) : (
                            <div
                              style={{ width: "100%", height: "100%" }}
                              className="d-flex justify-content-center align-items-center"
                              onClick={() => handleImage(1)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "50px" }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div className="d-flex justify-content-center flex-column">
                      <h6>Upload Car Smart Card Back Image</h6>
                      <Card className="cursor-pointer">
                        <div
                          className="d-flex justify-content-center align-content-center"
                          style={{
                            border: "1px solid rgb(207 207 207)",
                            height: "145px",
                          }}
                        >
                          {carSmartCardBack ? (
                            <ImageView>
                              <>
                                <img
                                  src={carSmartCardBack}
                                  className="img-thumbnail img__view"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                  alt=""
                                />
                                <div className="button__wrapper">
                                  <button
                                    className="btn btn-danger "
                                    // onClick={() => handleDelete(item.id)}
                                    onClick={() => setCarSmartCardBack(null)}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </div>
                              </>
                            </ImageView>
                          ) : (
                            <div
                              style={{ width: "100%", height: "100%" }}
                              className="d-flex justify-content-center align-items-center"
                              onClick={() => handleImage(2)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "50px" }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </Col>
                </Row>

                {/* SELECT CAR IMAGE */}

                <Row>
                  <div className="mb-5">
                    <Form>
                      <Dropzone
                      // onDrop={acceptedFiles => {
                      //   handleAcceptedFiles(acceptedFiles)
                      // }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone cursor-pointer">
                            <div
                              className="dz-message needsclick"
                              // {...getRootProps()}
                              onClick={() => handleImage(3)}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="d-flex flex-wrap justify-content-center mt-3"
                        id="file-previews"
                      >
                        {carImages?.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 me-2 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center position-relative">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      // height="80"
                                      style={{
                                        maxWidth: "80px",
                                      }}
                                      className=" bg-light"
                                      alt={"image"}
                                      src={f.path}
                                    />
                                  </Col>
                                  {/* <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.size}</strong>
                                    </p>
                                  </Col> */}

                                  <div
                                    className="position-absolute"
                                    style={{
                                      left: "0px",
                                      top: "0px",
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <i
                                      onClick={() => removeSelection(i)}
                                      className="mdi mdi-delete text-danger "
                                      style={{
                                        fontSize: "25px",
                                        cursor: "pointer",
                                      }}
                                    ></i>
                                  </div>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </Form>
                  </div>
                </Row>

                {/* SUBMIT BUTTON */}

                <div className="d-flex justify-content-center">
                  <Button
                    style={{ width: "40%" }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <Spinner animation="border" variant="info" size="sm" />
                    ) : id ? (
                      "Edit"
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>

        {/* SELECT PARTNER FROM DIALOG */}

        <Modal isOpen={openPartnerSearch} toggle={() => {}}>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Select Partner
            </h5>
          
            <i onClick={()=>history.goBack()} className="fa fa-window-close cursor-pointer" style={{fontSize: "20px"}}></i>
            
          </div>
          <div className="modal-body">
            <SearchWrapper>
              <div className="search__wrapper">
                <i className="fa fa-search"></i>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Find Driver by Name or phone "
                  id="search"
                  autoComplete="off"
                  value={searchKey}
                  onChange={(event) => searchKeyListener(event.target.value)}
                />
              </div>
            </SearchWrapper>
            <PartnerListWrapper>
              {partners ? (
                partners.map((partner, index) => (
                  <div key={index}>
                    <div
                      className=" partner__wrapper"
                      onClick={() => selectPartner(partner)}
                    >
                      <div className="img__wrapper">
                        <img src={partner.img} alt="Partner" />
                      </div>
                      <div className="ms-3 d-flex content__wrapper">
                        <span>{partner.name}</span>
                        <span className="ms-1">{partner.phone}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner animation="border" variant="info" size="lg" />
              )}
            </PartnerListWrapper>
          </div>
          <div className="modal-footer">
            {/* <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
              >
                Save changes
              </button> */}
          </div>
        </Modal>

        {/* SELECT IMAGE FOR CAR SMART CAR */}

        <Modal
          size="xl"
          isOpen={modal_fullscreen}
          toggle={() => {
            setmodal_fullscreen(!modal_fullscreen);
          }}
          className="modal-fullscreen"
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="exampleModalFullscreenLabel">
              Select Image
            </h5>
            <button
              onClick={() => {
                setmodal_fullscreen(false);
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ImageSelectionDialog
              lisener={(list) => {
                const image = list[0];
                // console.log("full image---", carImage);
                // console.log("")
                if (imageId == 1) {
                  setCarSmartCardFont(image.path);
                }
                if (imageId == 2) {
                  setCarSmartCardBack(image.path);
                }
                if (imageId == 3) {
                  setCarImages([...carImages, image]);
                  // console.log("images---", newArray)
                }

                dispatch(removeAllSelectedGalleryImage());
                setmodal_fullscreen(!modal_fullscreen);
              }}
              partnerId={selectedPartner?.id}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                setmodal_fullscreen(!modal_fullscreen);
              }}
              className="btn btn-secondary waves-effect"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </Modal>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default CarAdd;

const SearchWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 6px;

  .search__wrapper {
    padding: 7px 10px;
    display: flex;
    align-items: center;

    i {
      font-size: 15px;
    }
    input {
      border: none;
      color: black !important;
    }
  }
`;

const Value = styled.h5`
  color: #458110;
  font-style: italic;
  font-weight: bold;
  /* padding-left: 5px; */
`;

const PartnerListWrapper = styled.div`
  padding: 20px;

  .partner__wrapper {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    cursor: pointer;
    height: 80px;
    &:hover {
      background-color: #f0f1f2;
    }

    .img__wrapper {
      width: 65px;
      height: 70px;

      img {
        width: 100%;
        object-fit: contain;
        height: 100%;
      }
    }

    .content__wrapper {
      display: flex;
      flex-direction: column;
      span {
        font-size: 17px;
        color: black;
        font-weight: 400;
      }
    }
  }
`;

const CarTypeWrapper = styled.div`
  img {
    width: 80px;
  }
  span {
    margin-left: 15px;
    font-size: 15px;
  }
`;

const ImageView = styled.div`
  width: 100% !important;
  max-width: 300px;

  position: relative;
  width: 100%;

  .img_view {
    opacity: 1;
    transition: 0.5s ease;
    backface-visibility: hidden;
  }

  .button__wrapper {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;

    .remove__btn {
      background-color: yellow;
      font-size: 18px;
      color: red;
    }
  }

  &:hover {
    .img_view {
      opacity: 0.3;
    }
    .button__wrapper {
      opacity: 1;
    }
  }
`;
