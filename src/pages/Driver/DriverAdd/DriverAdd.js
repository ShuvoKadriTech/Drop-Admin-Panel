import React, { useEffect, useMemo } from "react";
import { Button, Card, CardBody, Col, Container, Input, Modal, Row } from "reactstrap";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Flatpickr from "react-flatpickr";
import Breadcrumbs from "../../../components/Common/Breadcrumb";


import {
  Link,
  useLocation
} from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import ImageSelectionDialog from "../../Utility/ImageSelectionDialog";
import { removeAllSelectedGalleryImage } from "../../../store/action/galleryAction";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, TextField } from "@mui/material";
import { getPartners } from "../../../store/partner/partnerActions";
import requestApi from "../../../network/httpRequest";
import { ALL_PARTNER } from "../../../network/Api";


const DriverAdd = () => {

  const dispatch = useDispatch();
  const { search } = useLocation();


  const searchParams = useMemo(() => new URLSearchParams(search), [search]);


  const [partners, setPartners] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [modal_fullscreen, setmodal_fullscreen] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [driverImage, setDriverImage] = useState("");
  const [nidFrontImage, setNidFrontImage] = useState("");
  const [nidBackImage, setNidBackImage] = useState("");
  const [licenseFrontImage, setLicenseFrontImage] = useState("");
  const [licenseBackImage, setLicenseBackImage] = useState("");
  


  const [dateOfBirth, setDateOfBirth] = useState("");
  const [openPartnerSearch, setOpenPartnerSearch] = useState(false);

  const [driverInfo, setDriverInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",
    nid: "",
  });


  useEffect(() => {
    const pID = searchParams.get('pID')
    // console.log("partner Id", pID)
    if (pID) {

    }
    else {
      setOpenPartnerSearch(true)
    }
  }, [searchParams])

  // GET ALL PARTNERS 

  useEffect(() => {

  }, [])

  // INPUT FORM EVENT HANDLE 

  const handleChange = (props) => (event) => {
    setDriverInfo({
      ...driverInfo,
      [props]: event.target.value
    })
    // console.log("input value",driverInfo)
  }


  const searchPartner = async () => {
    console.log(searchKey);
    const { data: { data, status, error } } = await requestApi().request(ALL_PARTNER, {
      params: {
        searchKey: searchKey,
        page: 1,
        pageSize: 50,
      }
    });
    const list = data.partners;
    console.log("list",list);
    setPartners(list)
  }

  useEffect(() => {

    if(searchKey !==""){
      searchPartner();
    }

  },[searchKey])

  const handleImage = id => {

    setImageId(id)
    setmodal_fullscreen(true);
  };

  return (
    <React.Fragment>
      <GlobalWrapper>

        <div className="page-content" >
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Driver"
              breadcrumbItem={"Add"}
              hideSettingBtn={true}
              isRefresh={false}

            />

            <Card>
              <CardBody>
                <Row className="pt-4">
                  <Col lg={6}>
                    <Row>
                      <Col xl={6}>
                        <Input

                          id="partnerId"

                          className="form-control"
                          type="text"
                          placeholder=""
                          readOnly
                        />
                      </Col>
                      <Col xl={6} className="my-4 my-xl-0">
                        <Input

                          value={driverInfo.name}
                          onChange={handleChange('name')}
                          id="name"

                          className="form-control"
                          type="text"
                          placeholder="Enter Full Name"
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="my-xl-4">
                      <Col xl={6}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={driverInfo.nid}
                          onChange={handleChange('nid')}
                          id="nid"
                          className="form-control"
                          type="number"
                          placeholder="Enter  NID Number"

                        />
                      </Col>
                      <Col xl={6} className="my-4 my-xl-0">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={driverInfo.phone}
                          onChange={handleChange('phone')}
                          id="phone"
                          className="form-control"
                          type="number"
                          placeholder="Enter  Phone Number"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={6}>
                        <div className="form-group mb-0">
                          <Flatpickr
                            className="form-control d-block"
                            id='dob'
                            placeholder="Select Driver Date of Birth"
                            // value={dateOfBirth}
                            onChange={(selectedDates, dateStr, instance) => setDateOfBirth(dateStr)}
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </div>
                      </Col>
                      <Col xl={6} className="my-4 my-xl-0">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={driverInfo.phone}
                          onChange={handleChange('licenseNumber')}
                          id="licenseNumber"
                          className="form-control"
                          type="number"
                          placeholder="Enter  Driver License Number"
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="my-4">
                      <Col xl={6} className="d-flex">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={driverInfo.address}
                          onChange={handleChange('address')}
                          id="address"
                          className="form-control"
                          type="text"
                          placeholder="Enter Address"
                          required
                        />
                      </Col>
                      <Col xl={6} className="my-4 my-xl-0">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={driverInfo.email}
                          onChange={handleChange('email')}
                          id="email"
                          className="form-control"
                          type="email"
                          placeholder="Enter  Email "

                        />
                      </Col>
                    </Row>

                    <Row>
                      {/* License Front Image */}
                      <Col xl={6}>
                        <div className="d-flex justify-content-center flex-column">
                          <h6>Upload License Front Image</h6>
                          <Card
                            className="cursor-pointer"
                          >
                            <div className="d-flex justify-content-center align-content-center" style={{ border: "1px solid rgb(207 207 207)", height: "145px" }}>
                              {licenseFrontImage ?
                                <ImageView>
                                  <>
                                    <img
                                      src={licenseFrontImage}
                                      className="img-thumbnail img__view"
                                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                      alt=""
                                    />
                                    <div className="button__wrapper">
                                      <button
                                        className="btn btn-danger "
                                      // onClick={() => handleDelete(item.id)}
                                      // onClick={() => setPartnerImage("")}
                                      ><i className="fa fa-trash" /></button>

                                    </div>
                                  </>
                                </ImageView>
                                : <div
                                  style={{ width: "100%", height: "100%" }}
                                  className="d-flex justify-content-center align-items-center"
                                  onClick={() => handleImage(4)}
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
                              }
                            </div>
                          </Card>
                        </div>
                      </Col>

                      {/* License Front Image */}
                      <Col xl={6}>
                        <div className="d-flex justify-content-center flex-column">
                          <h6>Upload License Back Image</h6>
                          <Card
                            className="cursor-pointer"
                          >
                            <div className="d-flex justify-content-center align-content-center" style={{ border: "1px solid rgb(207 207 207)", height: "145px" }}>
                              {
                                licenseBackImage ?
                                  <ImageView>
                                    <>
                                      <img
                                        src={licenseBackImage}
                                        className="img-thumbnail img__view"
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        alt=""
                                      />
                                      <div className="button__wrapper">
                                        <button
                                          className="btn btn-danger "
                                        // onClick={() => handleDelete(item.id)}
                                        // onClick={() => setPartnerImage("")}
                                        ><i className="fa fa-trash" /></button>

                                      </div>
                                    </>
                                  </ImageView>
                                  : <div
                                    style={{ width: "100%", height: "100%" }}
                                    className="d-flex justify-content-center align-items-center"
                                    onClick={() => handleImage(5)}
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
                              }
                            </div>
                          </Card>
                        </div>
                      </Col>
                    </Row>

                  </Col>
                  <Col lg={6} className="d-flex flex-column align-items-center mt-md-4 mt-lg-0">
                    {/* PARTNER IMAGE */}
                    <div className="d-flex justify-content-center   w-75 flex-column ">
                      <h6>Upload Driver Image</h6>
                      <Card

                        className="cursor-pointer "
                      >
                        <div className="d-flex justify-content-center align-content-center w-100" style={{ border: "1px solid rgb(207 207 207)", height: "145px" }}>
                          {
                            driverImage ?
                              <ImageView>
                                <>
                                  <img
                                    src={driverImage}
                                    className="img-thumbnail img__view"
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    alt=""
                                  />
                                  <div className="button__wrapper">
                                    <button
                                      className="btn btn-danger "
                                    // onClick={() => handleDelete(item.id)}
                                    // onClick={() => setPartnerImage("")}
                                    ><i className="fa fa-trash" /></button>

                                  </div>
                                </>
                              </ImageView>
                              : <div
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
                          }
                        </div>
                      </Card>
                    </div>

                    {/* PARTNER NID FRONT IMAGE */}

                    <div className="d-flex justify-content-center  w-75 flex-column">
                      <h6>Upload Driver NID Front Side</h6>
                      <Card

                        className="cursor-pointer"
                      >
                        <div className="d-flex justify-content-center align-content-center w-100 " style={{ border: "1px solid rgb(207 207 207)", height: "145px" }}>
                          {
                            nidFrontImage ?
                              <ImageView>
                                <>
                                  <img
                                    src={nidFrontImage}
                                    className="img-thumbnail img__view"
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    alt=""
                                  />
                                  <div className="button__wrapper">
                                    <button
                                      className="btn btn-danger "
                                    // onClick={() => handleDelete(item.id)}
                                    // onClick={() => setNidFrontImage("")}
                                    ><i className="fa fa-trash" /></button>

                                  </div>
                                </>
                              </ImageView>
                              : <div
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
                          }
                        </div>
                      </Card>
                    </div>

                    {/* PARTNER NID BACK SIDE */}

                    <div className="d-flex justify-content-center flex-column w-75">
                      <h6>Upload Driver NID Back Side</h6>
                      <Card

                        className="cursor-pointer"
                      >
                        <div className="d-flex justify-content-center align-content-center w-100" style={{ border: "1px solid rgb(207 207 207)", height: "145px" }}>


                          {nidBackImage ?
                            <ImageView>
                              <>
                                <img
                                  src={nidBackImage}
                                  className="img-thumbnail img__view"
                                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                  alt=""
                                />
                                <div className="button__wrapper">
                                  <button
                                    className="btn btn-danger "
                                  // onClick={() => handleDelete(item.id)}
                                  // onClick={() => setNidBackImage("")}
                                  ><i className="fa fa-trash" /></button>

                                </div>
                              </>
                            </ImageView>
                            : <div
                              style={{ width: "100%", height: "100%" }}
                              className="d-flex justify-content-center align-items-center"
                              onClick={() => handleImage(3)}

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
                          }

                        </div>
                      </Card>
                    </div>
                  </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                  <Button
                    // onClick={handleSubmit} 
                    className='mt-5' color="primary" style={{ width: "250px" }}>

                    {/* {loading ?

                      <Spinner animation="border" variant="info" size='sm' />
                      : id ? "Edit" : "Add"

                    } */}
                    Add
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Container>
          {/* IMAGE MODAL */}

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
                lisener={list => {
                  const image = list[0].path;
                  // console.log(list[0].path);

                  if (imageId == 1) {
                    setDriverImage(image);
                  }
                  if (imageId == 2) {
                    setNidFrontImage(image);
                  }
                  if (imageId == 3) {
                    setNidBackImage(image);
                  }
                  if (imageId == 4) {
                    setLicenseFrontImage(image);
                  }
                  if (imageId == 5) {
                    setLicenseBackImage(image);
                  }

                  dispatch(removeAllSelectedGalleryImage());
                  setmodal_fullscreen(!modal_fullscreen);
                }}
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

          <Modal
            isOpen={openPartnerSearch}
            toggle={() => {

            }}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Select Partner
              </h5>
            </div>
            <div className="modal-body">

              <SearchWrapper>


                <div className="search__wrapper">
                  <i className='fa fa-search'></i>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Find Partner by name or email or phone "
                    id="search"
                    value={searchKey}
                    onChange={event => setSearchKey(event.target.value)}
                  />
                </div>


              </SearchWrapper>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
              >
                Save changes
              </button>
            </div>
          </Modal>

        </div>



      </GlobalWrapper>
    </React.Fragment>
  );
};

const SearchWrapper = styled.div`

width: 100%;
border: 1px solid black;
border-radius: 6px;


  .search__wrapper{

    padding: 7px 10px;
    display: flex;
    align-items: center;

    i{
      font-size: 15px;
      
    }
    input{
      border: none;
      color: black !important;
    }
  }

  

`

const ImageView = styled.div`
   width: 100% !important;
  max-width: 300px;


  position: relative;
  width: 100%;

  .img_view {
    
    opacity: 1;
    transition: .5s ease;
    backface-visibility: hidden;
  }

  .button__wrapper {
    transition: .5s ease;
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


export default DriverAdd;