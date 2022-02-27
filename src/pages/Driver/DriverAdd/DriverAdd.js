import React, { useEffect, useMemo } from "react";
import { Button, Card, CardBody, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Flatpickr from "react-flatpickr";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import  Lightbox  from 'react-image-lightbox';

import {
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import ImageSelectionDialog from "../../Utility/ImageSelectionDialog";
import { removeAllSelectedGalleryImage } from "../../../store/action/galleryAction";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, TextField } from "@mui/material";
import { addPartner, getPartners, updateSearchKey } from "../../../store/partner/partnerActions";
import requestApi from "../../../network/httpRequest";
import { ALL_PARTNER, GET_SINGLE_DRIVER } from "../../../network/Api";
import { toast } from "react-toastify";
import { addDriver, editDriver } from "../../../store/Driver/driverAction";


const DriverAdd = () => {

  const dispatch = useDispatch();
  const { search,pathname } = useLocation();
  const history = useHistory();
  const {id } = useParams();
  


  const searchParams = useMemo(() => new URLSearchParams(search), [search]);


  const {
  partners,
    searchKey
 
  } = useSelector(state => state.partnerReducer);

  const {loading, status, drivers} = useSelector(state => state.driverReducer)




  const [modal_fullscreen, setmodal_fullscreen] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [driverImage, setDriverImage] = useState("");
  const [nidFrontImage, setNidFrontImage] = useState("");
  const [nidBackImage, setNidBackImage] = useState("");
  const [licenseFrontImage, setLicenseFrontImage] = useState("");
  const [licenseBackImage, setLicenseBackImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [openPartnerSearch, setOpenPartnerSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState({});
  const [isZoom, setIsZoom] = useState(false);
 

  const [driverInfo, setDriverInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",
    nid: "",
  });

// PARTNER ID
  useEffect(() => {
    const pID = searchParams.get('pID')
    // console.log("partner Id", pID)
    if (pID) {
      const findPartner = partners.find(partner => partner.id == pID);
      if(findPartner){
        setSelectedPartner(findPartner)
      }
    }
    else {
      setOpenPartnerSearch(true)
    }
  }, [searchParams])

  // DRIVER ID BY EDIT 

  useEffect(() => {
    const pID = searchParams.get('pID')
    // console.log("partner Id", pID)
    if (id) {
      const findDriver = drivers.find(driver => driver.id == id && driver.partnerId == pID);
      if(findDriver){

        const {name,email,phone,dob,img,address,licenseNumber,nid,nidFontPic,nidBackPic,licenseFontPic,licenseBackPic} = findDriver;
 
      setDriverInfo({name,  email, phone,address,licenseNumber,nid});
      setDateOfBirth(dob.toLocaleString());
      setDriverImage(img);
      setNidFrontImage(nidFontPic);
      setNidBackImage(nidBackPic);
      setLicenseFrontImage(licenseFontPic);
      setLicenseBackImage(licenseBackPic);
      
        
      }
      else{
        callApi(id)
      }
    }
    else {
      setOpenPartnerSearch(true)
    }
  }, [id])

  // CALL API FOR DRIVER FOR EDIT 

  const callApi = async(driverId) =>{
    const { data } = await requestApi().request(GET_SINGLE_DRIVER + driverId)
    if (data.status) {
      // console.log(data)
      const {name,email,phone,dob,img,address,licenseNumber,nid,nidFontPic,nidBackPic,licenseFontPic,licenseBackPic} = data.data.driver;
      console.log("dob",dob)
      setDriverInfo({name,  email, phone,address,licenseNumber,nid});
      setDateOfBirth(dob.toLocaleString());
      setDriverImage(img);
      setNidFrontImage(nidFontPic);
      setNidBackImage(nidBackPic);
      setLicenseFrontImage(licenseFontPic);
      setLicenseBackImage(licenseBackPic);
      
    }
    else {
      history.goBack();
    }
  }

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



  useEffect(
    () => {
      if (searchKey) {
        callPartnerList(true);
      }
    },
    [searchKey]
  );


  const callPartnerList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(getPartners(refresh));
  };

  const searchKeyListener = value => {
    dispatch(updateSearchKey(value));
  };

  const handleImage = id => {
    const params = new URLSearchParams({"pID": selectedPartner.id });
     history.replace({ pathname: pathname, search: params.toString() }); 
    setImageId(id)
    setmodal_fullscreen(true);
  };

  // SELECT PARTNER 

  const selectPartner = (id) =>{
    // console.log("id", id)
    setOpenPartnerSearch(false);
  
     const params = new URLSearchParams({"pID": id });
     history.replace({ pathname: pathname, search: params.toString() });  

  }

  // SUCCESS 

  useEffect(()=>{
    if(status){
      history.goBack();
    }
  },[status])

  const handleSubmit = () =>{
    if(driverInfo.name == "" || driverInfo.nid == "" || driverInfo.phone == "" || driverInfo.address == "" || driverInfo.licenseNumber== ""  || dateOfBirth == ""){
      return toast.warn("Fill up All Required Field", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    if ( driverInfo.phone.length !== 11) {
      return toast.warn("Enter Driver Valid Phone number", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    if (driverImage == "" || nidFrontImage == "" || nidBackImage == "" || licenseFrontImage == "" || licenseBackImage == "" ) {
      return toast.warn("Please Select Driver Required  Images", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    if(id){
      dispatch(editDriver({
        id,
        ...driverInfo,
        partnerId: selectedPartner.id,
        img: driverImage,
        dob:dateOfBirth,
        nidFontPic: nidFrontImage,
        nidBackPic: nidBackImage,
        licenseFontPic: licenseFrontImage,
        licenseBackPic: licenseBackImage,
      }))
    }else{
      dispatch(addDriver({
        ...driverInfo,
        partnerId: selectedPartner.id,
        img: driverImage,
        dob:dateOfBirth,
        nidFontPic: nidFrontImage,
        nidBackPic: nidBackImage,
        licenseFontPic: licenseFrontImage,
        licenseBackPic: licenseBackImage,
      }))
    }

    
  }

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

              {isZoom
              ? <Lightbox
                  mainSrc={selectedPartner.img}
                  enableZoom={true}
                  imageCaption={selectedPartner.name}
                  onCloseRequest={() => {
                    setIsZoom(!isZoom);
                  }}
                />
              : null}

            {/* Partner Details */}

            <Card>
              <CardBody>
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-center"
                    style={{ borderRight: "1px solid lightgray" }}
                  >
                    {selectedPartner.img ? <div style={{ width: "215px" }}>
                      <img
                        onClick={() => {
                          setIsZoom(true);
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Partner"
                        src={selectedPartner.img}
                        width="100%"
                      />
                    </div>: <Spinner animation="border" variant="info" size='lg' />}
                  </Col>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-between  align-items-center"
                  >
                    <div className="ps-4">
                      <div>
                        <h5>Partner Name:</h5>
                        <Value>
                          {selectedPartner.name}
                        </Value>
                      </div>
                      <div>
                        <h5>Phone:</h5>
                        <Value>
                          {selectedPartner.phone ? selectedPartner.phone : "N/A"}
                        </Value>
                      </div>
                      <div>
                        <h5>Gmail:</h5>
                        <Value>
                          {selectedPartner.email ? selectedPartner.email : "N/A"}
                        </Value>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row className="pt-4">
                  <Col lg={6}>
                    <Row>
                      <Col xl={6} className="mt-4 my-xl-0">
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
                      <Col xl={6} className="mt-4 my-xl-0">
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
                    <Row className="my-xl-4">
                      <Col xl={6} className="mt-4 my-xl-0">
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
                      <Col xl={6} className="mt-4 my-xl-0">
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
                      <Col xl={6} className="mt-4 my-xl-0">
                        <div className="form-group mb-0">
                          <Flatpickr
                            className="form-control d-block"
                            id='dateOfBirth'
                            placeholder="Select Driver Date of Birth"
                            value={dateOfBirth}
                            onChange={(selectedDates, dateStr, instance) => setDateOfBirth(dateStr)}
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </div>
                      </Col>
                      <Col xl={6} className="mt-4 mt-xl-0">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={driverInfo.licenseNumber}
                          onChange={handleChange('licenseNumber')}
                          id="licenseNumber"
                          className="form-control"
                          type="number"
                          placeholder="Enter  Driver License Number"
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col  className="d-flex">
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
                      
                    </Row>

                    <Row className="mt-4">
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
                                      onClick={() => setLicenseFrontImage("")}
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
                                        onClick={() => setLicenseBackImage("")}
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
                                    onClick={() => setDriverImage("")}
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
                                    onClick={() => setNidFrontImage("")}
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
                                  onClick={() => setNidBackImage("")}
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
                    onClick={handleSubmit} 
                    className='mt-5' color="primary" style={{ width: "250px" }}>

                    {loading ?

                      <Spinner animation="border" variant="info" size='sm' />
                      :  id ? "Edit" : "Add"

                    }
                    
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
                partnerId={selectedPartner.id}
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
                    placeholder="Find Driver by Name or phone "
                    id="search"
                    autoComplete="off"
                    value={searchKey}
                    onChange={event =>
                      searchKeyListener(event.target.value)}
                  />
                </div>
              </SearchWrapper>
              <PartnerListWrapper >
                  {partners.map((partner,index) =>(
                    <div key={index} >
                    <div className=" partner__wrapper" onClick={()=>selectPartner(partner.id)}>
                      <div className="img__wrapper" >
                        <img src={partner.img} alt="Partner"  />
                      </div>
                      <div className="ms-3 d-flex content__wrapper">
                        <span>{partner.name}</span>
                        <span className="ms-1">{partner.phone}</span>
                      </div>
                      
                    </div>
                    </div>
                  ))}
                </PartnerListWrapper>
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

const PartnerListWrapper = styled.div`
 
  padding: 20px;
  
  .partner__wrapper{
    display: flex;
    align-items: center;
    padding: 10px 0px;
    cursor: pointer;
    height: 80px;
    &:hover{
        background-color: #f0f1f2;
    }

    .img__wrapper{
      width: 65px;
      height: 70px;

      img{
        width: 100%;
        object-fit: contain;
        height: 100%;
      }
    }

    .content__wrapper{
      display: flex;
      flex-direction: column;
      span{
        font-size: 17px;
        color: black;
        font-weight: 400;
      }
    }
  }
`

const Value = styled.h5`
  color: #458110;
  font-style: italic;
  font-weight: bold;
  /* padding-left: 5px; */
`;


export default DriverAdd;