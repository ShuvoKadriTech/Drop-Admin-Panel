import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Button, Modal,Spinner, } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { TextField } from "@mui/material";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import ImageSelectionDialog from './../../Utility/ImageSelectionDialog';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllSelectedGalleryImage } from "../../../store/action/galleryAction";
import { toast } from "react-toastify";
import { addUser, editUser } from "../../../store/Users/UsersAction";
import { useHistory, useParams } from "react-router-dom";
import requestApi from "../../../network/httpRequest";
import { SINGLE_USER } from "../../../network/Api";

const AddUser = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [img, setImg] = useState("");
  const [modal_fullscreen, setmodal_fullscreen] = useState(false);

  const { loading, status, users } = useSelector(state => state.usersReducer);


  useEffect(() => {
    if (id) {
      const findUser = users.find(user => user.id == id);
      if (findUser) {
        const { name, email, phoneNumber, img, dob } = findUser;
        setName(name);
        setEmail(email);
        setPhone(phoneNumber);
        setDateOfBirth(dob);
        setImg(img);
      } else {
        callApi(id)
      }
    }
  }, [id])

  // API CALL FOR USER DATA 

  const callApi = async (userId) => {
    const { data: { status, data } } = await requestApi().request(SINGLE_USER, {
      params: {
        id: userId
      }
    });
    if (status) {

      const { name, email, phoneNumber, img, dob } = data.user;
      setName(name);
      setEmail(email);
      setPhone(phoneNumber);
      setDateOfBirth(dob);
      setImg(img);

    }
    else {
      history.push('/users/list', { replace: true })
    }
  }


  // SUBMIT USER DATA 

  const handleSubmit = () => {
    if ((name == "" || name == null) || (dateOfBirth == "" || dateOfBirth == null) || (img == "" || img == null)) {
      return toast.warn("Please Fill Up All Input Field", {
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


    if(id){
      dispatch(editUser({
        id,
        name,
        phoneNumber: phone,
        email,
        img,
        dob: dateOfBirth
      }))
    }else{
      dispatch(addUser({
        name,
        phoneNumber: phone,
        email,
        img,
        dob: dateOfBirth
      }))
    }

  }

  useEffect(() => {
    if (status) {
      if(id){
        history.goBack();
      }else{
        setName("");
      setEmail("");
      setPhone("");
      setDateOfBirth("");
      setImg("")
      }
    }
  }, [status])

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Users"
              breadcrumbItem="Add User"
              isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
            />

            {/* TEXT FIELDS */}

            <Card>
              <CardBody>

                <Row>
                  <Col xl={6} className="py-4">
                    <Row>
                      <Col xl={6}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Name"
                          className="w-100"
                          value={name}
                          onChange={event => setName(event.target.value)}
                        />
                      </Col>
                      <Col xl={6}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Phone Number"
                          // defaultValue="Hello World"
                          className="w-100"
                          value={phone}
                          onChange={event => setPhone((event.target.value).toString())}
                          type="number"
                        />
                      </Col>
                    </Row>

                    <Row className="my-xl-4">
                      <Col xl={6}>
                        <TextField
                          id="outlined-required"
                          label="Email"
                          // defaultValue="Hello World"
                          type="email"
                          value={email}
                          onChange={event => setEmail(event.target.value)}
                          className="w-100"
                        />
                      </Col>
                      <Col xl={6}>
                        <Wrapper className="form-group mb-0">
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
                          // style={{ padding: "15px 12px" }}
                          />
                        </Wrapper>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={6}>

                    <div className="d-flex align-items-center flex-column">
                      <h6>Upload User Image</h6>
                      <Card
                        style={{ width: "385px", height: "160px" }}
                        className="cursor-pointer"
                      >
                        <div className="d-flex justify-content-center align-content-center h-100" style={{ border: "1px solid rgb(207 207 207)" }}>
                          {img
                            ? <ImageView>
                              <>
                                <img
                                  src={img}
                                  className="img-thumbnail img__view"
                                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                  alt=""
                                />
                                <div className="button__wrapper">
                                  <button
                                    className="btn btn-danger "
                                    onClick={() => setImg("")}
                                  ><i className="fa fa-trash" /></button>

                                </div>
                              </>
                            </ImageView>
                            : <div
                              style={{ width: "100%", height: "100%" }}
                              className="d-flex justify-content-center align-items-center"
                              onClick={() => setmodal_fullscreen(true)}
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
                            </div>}

                        </div>
                      </Card>
                    </div>

                  </Col>
                </Row>


                <div className='d-flex justify-content-center'>
                  <Button className='mt-5' onClick={handleSubmit} color="primary" style={{ width: "250px" }}>

                    {loading ?

                      <Spinner animation="border" variant="info" size='sm' />
                      : id ? "Edit" : "Add"

                    }
                   

                  </Button>
                </div>
              </CardBody>
            </Card>

          </Container>
        </div>

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

                setImg(image);

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

      </GlobalWrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  .input{
    padding: 15px 12px !important;
  }
`;


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

export default AddUser;
