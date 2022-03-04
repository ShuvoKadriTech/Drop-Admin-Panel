import React, { useEffect, useMemo, useState } from "react";
//@ts-check
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Modal,
  Row,
  Spinner,
} from "reactstrap";
import { SINGLE_PARTNER } from "../../../network/Api";
import requestApi from "./../../../network/httpRequest";
import {
  updateSearchKey,
  getPartners,
} from "./../../../store/partner/partnerActions";
import { Autocomplete, Box, TextField } from "@mui/material";
import {
  getCarTypes,
  selectCarBrand,
  selectCarBrandModel,
  selectCarType,
  selectModelColor,
  selectModelYear,
} from "../../../store/Car/carTypes/carTypesAction";
import { toast } from "react-toastify";

const CarAdd = () => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const { partners, searchKey, status, loading } = useSelector(
    (state) => state.partnerReducer
  );
  const {
    carTypes,
    selectedCarType,
    selectedCarBrand,
    selectedBrandModel,
    selectedModelColor,
    selectedModelYear,
  } = useSelector((state) => state.carTypesReducer);

  const [openPartnerSearch, setOpenPartnerSearch] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState();
  const [searchCarType, setSearchCarType] = useState("");
  const [searchCarBrand, setSearchCarBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [searchYear, setSearchYear] = useState("");

  // GET PARTNER

  useEffect(() => {
    const pID = searchParams.get("pID");
    console.log("partner Id ===-", pID);
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
  }, []);

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

  const searchKeyListener = (value) => {
    dispatch(updateSearchKey(value));
  };

  useEffect(() => {
    if (searchKey) {
      callPartnerList(true);
    }
  }, [searchKey]);

  const callPartnerList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(getPartners(refresh));
  };

  const setPartner = (partner) => {
    setSelectedPartner(partner);

    console.log("selected partner", partner);

    // if (id) {
    //   console.log("selected partner-----", partner);
    //   if (partner) {
    //     // const findDriver = partner.drivers.find((driver) => driver.id == id);
    //     // if (findDriver) {
    //     //   const {
    //     //     name,
    //     //     email,
    //     //     phone,
    //     //     dob,
    //     //     img,
    //     //     address,
    //     //     licenseNumber,
    //     //     nid,
    //     //     nidFontPic,
    //     //     nidBackPic,
    //     //     licenseFontPic,
    //     //     licenseBackPic,
    //     //   } = findDriver;
    //     //   setDriverInfo({ name, email, phone, address, licenseNumber, nid });
    //     //   setDateOfBirth(dob.toLocaleString());
    //     //   setDriverImage(img);
    //     //   setNidFrontImage(nidFontPic);
    //     //   setNidBackImage(nidBackPic);
    //     //   setLicenseFrontImage(licenseFontPic);
    //     //   setLicenseBackImage(licenseBackPic);
    //     // }
    //   }
    // }
  };

  useEffect(() => {
    if (carTypes.length <= 0) {
      dispatch(getCarTypes(true));
    }
  }, [carTypes]);

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

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Car"
              breadcrumbItem={"Add"}
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
                      value={selectedCarType}
                      onChange={(event, newValue) => {
                        dispatch(selectCarType(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => option.name}
                      inputValue={searchCarType}
                      onInputChange={(event, newInputValue) => {
                        setSearchCarType(newInputValue);
                        console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={carTypes}
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
                      value={selectedCarBrand}
                      onChange={(event, newValue) => {
                        dispatch(selectCarBrand(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => option.name}
                      inputValue={searchCarBrand}
                      onInputChange={(event, newInputValue) => {
                        setSearchCarBrand(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo2"
                      options={selectedCarType?.carBrands}
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
                      value={selectedBrandModel}
                      onChange={(event, newValue) => {
                        dispatch(selectCarBrandModel(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => option.name}
                      inputValue={searchModel}
                      onInputChange={(event, newInputValue) => {
                        setSearchModel(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo3"
                      options={selectedCarBrand?.carModels}
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
                      value={selectedModelColor}
                      onChange={(event, newValue) => {
                        dispatch(selectModelColor(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => option.name}
                      inputValue={searchColor}
                      onInputChange={(event, newInputValue) => {
                        setSearchColor(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo4"
                      options={selectedBrandModel?.colors}
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
                      value={selectedModelYear}
                      onChange={(event, newValue) => {
                        dispatch(selectModelYear(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) =>
                        option ? option.year.toString() : ""
                      }
                      inputValue={searchYear.toString()}
                      onInputChange={(event, newInputValue) => {
                        setSearchYear(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo5"
                      options={selectedBrandModel?.years}
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
                  <Col xl={6}></Col>
                </Row>
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
