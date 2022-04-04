import React, { useState, useEffect } from "react";
import GlobalWrapper from "../../../components/GlobalWrapper";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import ImageSelectionDialog from "./../../Utility/ImageSelectionDialog";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Spinner,
  Modal,
  Label,
  FormGroup
} from "reactstrap";

import { removeAllSelectedGalleryImage } from "../../../store/action/galleryAction";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import { addPartner, editPartner } from "../../../store/partner/partnerActions";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useParams, useHistory } from "react-router-dom"
import requestApi from "../../../network/httpRequest";
import { SINGLE_PARTNER } from "../../../network/Api";

const PartnerAdd = () => {


  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const [modal_fullscreen, setmodal_fullscreen] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [partnerImage, setPartnerImage] = useState("");
  const [nidFrontImage, setNidFrontImage] = useState("");
  const [nidBackImage, setNidBackImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [biddingPercent, setBiddingPercent] = useState("")


  const { loading, message, error, partners } = useSelector(state => state.partnerReducer)


  useEffect(
    () => {
      if (id) {
        const findPartner = partners.find(type => type.id === id);
        // console.log("findPartner",findPartner)
        if (findPartner) {
          const { img, name, email, phone, dob, nid, nidFrontPic, nidBackPic, biddingPercent } = findPartner;
          setName(name);
          setEmail(email);
          setNid(nid);
          setPhone(phone);
          setDateOfBirth(dob);
          setPartnerImage(img);
          setNidFrontImage(nidFrontPic);
          setNidBackImage(nidBackPic);
          setBiddingPercent(biddingPercent);

        }
        else {
          callApi(id);
        }
      }

      // callApi(id);
    },
    [id]
  );

  const callApi = async (partnerId) => {
    const { data: { status, data } } = await requestApi().request(SINGLE_PARTNER + partnerId);
    if (status) {

      const { img, name, email, phone, dob, nid, nidFontPic, nidBackPic, biddingPercent } = data.partner;
      // console.log("data", nidFontPic)
      setName(name);
      setEmail(email);
      setNid(nid);
      setPhone(phone);
      setDateOfBirth(dob);
      setPartnerImage(img);
      setNidFrontImage(nidFontPic);
      setNidBackImage(nidBackPic);
      setBiddingPercent(biddingPercent);
    }
    else {
      history.push('/partners-list', { replace: true })
    }
  }




  const handleImage = id => {

    setImageId(id)
    setmodal_fullscreen(true);
  };

  //   HANDLE SUBMIT 

  const handleSubmit = () => {

    if (name == null || name == "") {
      return toast.warn("Enter Partner Name", {
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
    if (phone == null || phone == "" || phone.length !== 11) {
      return toast.warn("Enter Partner Valid Phone number", {
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

    if (partnerImage == null || partnerImage == "") {
      return toast.warn("Enter Partner Image", {
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

    // console.log(data);

    if (id) {
      dispatch(editPartner({
        id: id,
        name,
        email,
        nid,
        phone,
        dob: dateOfBirth,
        img: partnerImage,
        nidFontPic: nidFrontImage,
        nidBackPic: nidBackImage
      }))
    }
    else {
      dispatch(addPartner(
        {
          name,
          email,
          nid,
          phone,
          dob: dateOfBirth,
          img: partnerImage,
          nidFontPic: nidFrontImage,
          nidBackPic: nidBackImage
        }
      ))
    }


  }

  useEffect(() => {

    if (message) {
      if (id) {
        history.goBack();
      }
      else {
        setName("");
        setEmail("");
        setNid("");
        setPhone("");
        setDateOfBirth("");
        setPartnerImage("");
        setNidFrontImage("");
        setNidBackImage("");
        setBiddingPercent("");
      }

    }


  }, [message])





  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true} className="py-4">
            <Breadcrumbs
              maintitle="Partner"
              breadcrumbItem={id ? "Edit" : "Add"}
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

                          value={name}
                          onChange={event => {
                            setName(event.target.value);
                          }}
                          id="name"

                          className="form-control"
                          type="text"
                          placeholder="Enter Full Name"
                          required
                        />
                      </Col>
                      <Col xl={6} className="my-4 my-xl-0">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={email}
                          onChange={event => {
                            setEmail(event.target.value);
                          }}
                          id="email"
                          className="form-control"
                          type="email"
                          placeholder="Enter  Email"
                        />
                      </Col>
                    </Row>
                    <Row className="my-xl-4">
                      <Col xl={6}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={nid}
                          onChange={event => {
                            setNid(event.target.value);
                          }}
                          id="nid"
                          className="form-control"
                          type="number"
                          placeholder="Enter  NID Number"

                        />
                      </Col>
                      <Col lx={6} className="my-4 my-xl-0">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={phone}
                          onChange={event => {
                            setPhone((event.target.value).toString());
                          }}
                          id="phone"
                          className="form-control"
                          type="number"
                          placeholder="Enter  Phone Number"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col >
                        <div className="form-group mb-0">
                          <Flatpickr
                            className="form-control d-block"
                            id='dateOfBirth'
                            placeholder="Select Partner Date of Birth"
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
                    </Row>

                    {
                      id && <Row className="my-4">
                        <Col lx={6} className="d-flex">
                          <Input
                            // style={{ border: '1px solid red' }}
                            value={biddingPercent}
                            onChange={event => {
                              setBiddingPercent((event.target.value).toString());
                            }}
                            id="biddingPercent"
                            className="form-control"
                            type="number"
                            placeholder="Enter Bidding %"
                            required
                          />
                          <div className="input-group-append">
                            <span className="input-group-text h-100">
                              <i className="fa fa-percent" />
                            </span>
                          </div>
                        </Col>
                      </Row>
                    }

                  </Col>
                  <Col lg={6} className="d-flex flex-column align-items-center mt-md-4 mt-lg-0">
                    {/* PARTNER IMAGE */}
                    <div className="d-flex justify-content-center flex-column">
                      <h6>Upload Partner Image</h6>
                      <Card
                        style={{ width: "385px", height: "160px" }}
                        className="cursor-pointer"
                      >
                        <div className="d-flex justify-content-center align-content-center h-100" style={{ border: "1px solid rgb(207 207 207)" }}>
                          {partnerImage
                            ? <ImageView>
                              <>
                                <img
                                  src={partnerImage}
                                  className="img-thumbnail img__view"
                                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                  alt=""
                                />
                                <div className="button__wrapper">
                                  <button
                                    className="btn btn-danger "
                                    // onClick={() => handleDelete(item.id)}
                                    onClick={() => setPartnerImage("")}
                                  ><i className="fa fa-trash" /></button>

                                </div>
                              </>
                            </ImageView>
                            : <div
                              style={{ width: "100%", height: "100%" }}
                              className="d-flex justify-content-center align-items-center"
                              onClick={() => handleImage(1)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "50px" }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"

                              >
                                <path strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </div>}
                        </div>
                      </Card>
                    </div>

                    {/* PARTNER NID FRONT IMAGE */}

                    <div className="d-flex justify-content-center flex-column">
                      <h6>Upload Partner NID Front Side</h6>
                      <Card
                        style={{ width: "385px", height: "160px" }}
                        className="cursor-pointer"
                      >
                        <div className="d-flex justify-content-center align-content-center h-100" style={{ border: "1px solid rgb(207 207 207)" }}>
                          {nidFrontImage
                            ? <ImageView>
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
                              onClick={() => handleImage(2)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "50px" }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"

                              >
                                <path strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </div>}
                        </div>
                      </Card>
                    </div>

                    {/* PARTNER NID BACK SIDE */}

                    <div className="d-flex justify-content-center flex-column">
                      <h6>Upload Partner NID Back Side</h6>
                      <Card
                        style={{ width: "385px", height: "160px" }}
                        className="cursor-pointer"
                      >
                        <div className="d-flex justify-content-center align-content-center h-100" style={{ border: "1px solid rgb(207 207 207)" }}>
                          {nidBackImage
                            ? <ImageView>
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
                              onClick={() => handleImage(3)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: "50px" }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"

                              >
                                <path strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </div>}
                        </div>
                      </Card>
                    </div>
                  </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                  <Button onClick={handleSubmit} className='mt-5' color="primary" style={{ width: "250px" }}>

                    {loading ?

                      <Spinner animation="border" variant="info" size='sm' />
                      : id ? "Edit" : "Add"

                    }
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Container>

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
                    setPartnerImage(image);
                  }
                  if (imageId == 2) {
                    setNidFrontImage(image);
                  }
                  if (imageId == 3) {
                    setNidBackImage(image);
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
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};


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




export default PartnerAdd;
