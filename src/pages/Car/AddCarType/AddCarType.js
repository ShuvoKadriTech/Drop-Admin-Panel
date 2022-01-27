import React, { useState } from "react";
import styled from "styled-components";

import GlobalWrapper from "../../../components/GlobalWrapper";
import { Card, Col, Container, Row, Modal, Button, CardTitle, CardBody } from 'reactstrap';
import ImageSelectionDialog from './../../Utility/ImageSelectionDialog';
import { Editor, EditorState } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import requestApi from "../../../network/httpRequest";
import { ADD_BANNER } from "../../../network/Api";
import { removeAllSelectedGalleryImage } from "../../../store/action/galleryAction";

const AddCarType = () => {


  const dispatch = useDispatch();



  const route = useHistory()

  const [modal_fullscreen, setmodal_fullscreen] = useState(false)

  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [minSeat, setMinSeat] = useState(0);
  const [maxSeat, setMaxSeat] = useState(0);
  const [loading, setLoading] = useState(false);





  const submitBanner = async () => {
    if (!title || title == "") {
      return toast.warn("enter a title ", {
        // position: "bottom-right",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // if (!image) {
    //   return toast.warn("add a image ", {
    //     // position: "bottom-right",
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }




    // try {


    //   const { data } = await requestApi().request(ADD_BANNER, {
    //     method: "POST",
    //     data: {
    //       title: title,
    //       type: type,
    //       status: status,
    //       description: description,
    //       image: image
    //     }
    //   })


    //   console.log(data);


    //   if (data.status) {



    //     route.push(`banner?type=${type}&status=${status}`)




    //   } else {
    //     return toast.warn(data.error, {
    //       // position: "bottom-right",
    //       position: toast.POSITION.BOTTOM_RIGHT,
    //       autoClose: 3000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }


    // } catch (error) {
    //   return toast.warn(error.message, {
    //     // position: "bottom-right",
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     autoClose: 3000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }




  }







  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content my-3">


          <Container fluid={true}>


            <Row>
              <Col xl={4}>
                <div >
                  <h2>IMAGE UPLOAD </h2>
                  <Card style={{ width: '200px', height: '230px' }} className='cursor-pointer' >
                    <div className='d-flex justify-content-center align-content-center h-100percen' >
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '50px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </Card>

                  <div>
                    {
                      image && <img className='img-100' src={image} alt="banner image" style={{ width: "100%" }} />
                    }

                  </div>
                </div>
              </Col>
              <Col xl={8} md={12} sm={12}>






                <Card className='mt-5'>
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
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder='Enter a Name'
                          defaultValue=""
                          onError={true}
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
                          type="text"
                          value={minSeat}
                          onChange={(e) => setMinSeat(e.target.value)}
                          placeholder='Enter a Min Seat'
                          defaultValue=""
                          onError={true}
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
                          type="text"
                          value={maxSeat}
                          onChange={(e) => setMaxSeat(e.target.value)}
                          placeholder='Enter a Max Seat'
                          defaultValue=""
                          onError={true}
                        />
                      </div>
                    </Row>






                    <Button disabled={loading} color='primary w-100' onClick={submitBanner}> {!loading ? 'Submit' : 'loading....'} </Button>


                  </CardBody>
                </Card>



              </Col>
            </Row>

          </Container>

          {/* <Modal
            size="xl"
            isOpen={modal_fullscreen}
            toggle={() => {
              setmodal_fullscreen(!modal_fullscreen)
            }}
            className="modal-fullscreen"
          >
            <div className="modal-header">
              <h5
                className="modal-title mt-0"
                id="exampleModalFullscreenLabel"
              >
                Select Image
              </h5>
              <button
                onClick={() => {
                  setmodal_fullscreen(false)
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
              <ImageSelectionDialog lisener={(list) => {

                console.log(list);
                console.log(list[0].path);
                setImage(list[0].path)

                dispatch(removeAllSelectedGalleryImage())
                setmodal_fullscreen(!modal_fullscreen)
              }} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  setmodal_fullscreen(!modal_fullscreen)
                }}
                className="btn btn-secondary waves-effect"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </Modal> */}


        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};


const ImageVew = styled.img`
    width:100% !important;
    max-width: 300px;
`

export default AddCarType;
