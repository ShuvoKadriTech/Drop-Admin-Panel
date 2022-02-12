import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalWrapper from "../../../components/GlobalWrapper";
import {
  Card,
  Col,
  Container,
  Row,
  Modal,
  Button,
  CardTitle,
  CardBody,
  Spinner
} from "reactstrap";
import ImageSelectionDialog from "./../../Utility/ImageSelectionDialog";
import { Editor, EditorState } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import requestApi from "../../../network/httpRequest";
import { ADD_CAR_TYPE, GET_SINGLE_CAR_TYPE } from "../../../network/Api";
import { removeAllSelectedGalleryImage } from "../../../store/action/galleryAction";
import {
  addCarType,
  editCarType,
} from "../../../store/Car/carTypes/carTypesAction";

const AddCarType = () => {


  const dispatch = useDispatch();


  const route = useHistory();
  const { id } = useParams();

  const { carTypes, message, error } = useSelector(
    state => state.carTypesReducer
  );

  const [modal_fullscreen, setmodal_fullscreen] = useState(false);

  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [minSeat, setMinSeat] = useState(0);
  const [maxSeat, setMaxSeat] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      if (id) {
        const findCarType = carTypes.find(type => type?.id === id);
        if (findCarType) {
          const { image, name, minSeat, maxSeat } = findCarType;
          setName(name);
          setMinSeat(minSeat);
          setMaxSeat(maxSeat);
          setImage(image);
        }
        else {
          callApi(id);
        }
      }

      // callApi(id);
    },
    [id]
  );

  // CALL API FOR GET CAR TYPE

  const callApi = async (carTypeId) => {
    const { data: { status, data } } = await requestApi().request(GET_SINGLE_CAR_TYPE, { params: { id: carTypeId } })
    if (status) {
      // console.log(data)
      const { image, name, minSeat, maxSeat } = data.carType;
      setName(name);
      setMinSeat(minSeat);
      setMaxSeat(maxSeat);
      setImage(image);
    }
    else {
      route.push('/car-types', { replace: true })
    }
  };

  const addNewCarType = async () => {

    dispatch(addCarType({
      name: name,
        minSeat: minSeat,
        maxSeat: maxSeat,
        image: image
    }))

  };

  const editCarTypeById = () => {
    dispatch(editCarType({
      id: id,
      data: {
        name: name,
      minSeat: minSeat,
      maxSeat: maxSeat,
      image: image
      }
    }));

  };

  useEffect(() => {
    if (message) {
      toast.warn(message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      route.push("/car-types");
    }
    if (error) {
      return toast.warn(error, {
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
  }, [message || error])

  const submitCarType = async () => {
    if (!name || name == "") {
      return toast.warn("Enter a Name ", {
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

    if (!minSeat || minSeat == "") {
      return toast.warn("Enter Min Seat ", {
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

    if (!maxSeat || maxSeat == "") {
      return toast.warn("Enter Max Seat ", {
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

    if (!image) {
      return toast.warn("add a image ", {
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

    try {
      if (id) {
        editCarTypeById();
      } else {
        addNewCarType();
      }
    } catch (error) {
      return toast.warn(error.message, {
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
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content my-3">
          <Container fluid={true}>
            <Row>
              {/* {loading &&
                <div className="display: flex; justify-content-center; align-items-center">
                  <Spinner animation="border" variant="info" />
                </div>} */}
              <Col xl={4}>
                <div>
                  <h2>IMAGE UPLOAD </h2>
                  <Card
                    style={{ width: "200px", height: "230px" }}
                    className="cursor-pointer"
                  >
                    <div className="d-flex justify-content-center align-content-center h-100percen">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "50px" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => setmodal_fullscreen(!modal_fullscreen)}
                      >
                        <path strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </Card>

                  <ImageView>
                    {image &&
                      <>
                      <img
                        className="img_view"
                        src={image}
                        alt="banner image"
                        style={{ width: "100%" }}
                      />
                      <div className="button__wrapper">
                      <Button
                        variant="contained"
                        color="danger"
                        onClick={() => setImage(null)}
                      >
                        Delete
                      </Button>
                    </div>
                      </>
                      }

                    
                  </ImageView>
                </div>
              </Col>
              <Col xl={8} md={12} sm={12}>
                <Card className="mt-5">
                  <CardBody>
                    <CardTitle className="h4">Add Car Type</CardTitle>

                    {/* TITLE */}

                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Name
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Enter a Name"
                        // onError={true}
                        />
                      </div>
                    </Row>

                    {/* MIN SEAT */}

                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Min Seat
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="number"
                          value={minSeat}
                          onChange={e => setMinSeat(e.target.value)}
                          placeholder="Enter a Min Seat"
                        // onError={true}
                        />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Max Seat
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="number"
                          value={maxSeat}
                          onChange={e => setMaxSeat(e.target.value)}
                          placeholder="Enter a Max Seat"
                        // onError={true}
                        />
                      </div>
                    </Row>

                    <Button
                      disabled={isLoading}
                      color="primary w-100"
                      onClick={submitCarType}
                    >
                      {" "}{"Submit"}{" "}
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
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
                  // console.log(list);
                  // console.log(list[0].path);
                  setImage(list[0].path);

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
  /* width: 100% !important;
  max-width: 300px; */
  position: relative;
  

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
      /* background-color: yellow; */
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

export default AddCarType;
