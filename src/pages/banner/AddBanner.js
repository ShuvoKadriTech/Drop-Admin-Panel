
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row, Modal, Button, CardTitle, CardBody } from 'reactstrap';
import { removeAllSelectedGalleryImage } from '../../store/action/galleryAction';
import ImageSelectionDialog from '../Utility/ImageSelectionDialog';
// Form Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { stateToHTML } from 'draft-js-export-html';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
// import { convertToHTML } from 'draft-convert';
import requestApi from '../../network/httpRequest';
import { ADD_BANNER } from '../../network/Api';
import { useHistory,useParams } from 'react-router-dom';
import { GET_SINGLE_BANNER } from './../../network/Api';
import {editBanner} from "../../store/banner/bannerAction";


const AddBanner = () => {

    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const {list} = useSelector(state => state.bannerReducer)

    const dispatch = useDispatch()
    const route = useHistory();
    const {id} = useParams();

    const [image, setImage] = useState();
    const [title, setTitle] = useState("");
    const [type, setType] = useState(2);
    const [status, setStatus] = useState(1);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    // const [descriptionText, setDescriptionText] = useState("");




    useEffect(()=>{
        if (id) {
            const findBanner = list.find(type => type?.id === id);
            if (findBanner) {
              const { image, title, type,status,description  } = findBanner;
            //   const convertToText =  description.replace(/<[^>]+>/g, '');
              setImage(image);
              setTitle(title);
              setType(type);
              setStatus(status);
            //   setDescriptionText(convertToText)
            //   setEditorState(convertToText)
            }
            else {
              callApi(id);
            }
          } 
    },[id])

    // GET BANNER FROM SERVER 

    const callApi = async (id) =>{
        const {data: {status, data:{banner}}} = await requestApi().request(GET_SINGLE_BANNER + id);
        // console.log(banner)
        if(status){
            const {type, title, image, description, status} = banner;
            // const convertToText =  description.replace(/<[^>]+>/g, '');
            //   console.log(convertToText);
            setImage(image);
              setTitle(title);
              setType(type);
              setStatus(status);
            //   setDescriptionText(convertToText)
        }
        else{
            route.push('/banner', {replace: true})
        }
    }


    const handleEditorChange = (state) => {
        // console.log(state)
        setEditorState(state);
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        // console.log(currentContentAsHTML);
        setDescription(currentContentAsHTML);
    }


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

        if (!image) {
            return toast.warn("add a image ", {
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




        try {

            if(id){
                const data = {
                    id: id,
                    title: title,
                    description: description,
                    image: image,
                    type: type
                }
                dispatch(editBanner(data))
            }

           else{
            const { data } = await requestApi().request(ADD_BANNER, {
                method: "POST",
                data: {
                    title: title,
                    type: type,
                    status: status,
                    description: description,
                    image: image
                }
            })

            if (data.status) {



                route.push(`banner?type=${type}&status=${status}`)




            } else {
                return toast.warn(data.error, {
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
           }


        } catch (error) {
            return toast.warn(error.message, {
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




    }

    const changeType = (e) => {
        // console.log(e.target.value);
        setType(e.target.value)
    }


    const changeStatus = (e) => {
        // console.log(e.target.value);
        setStatus(e.target.value)
    }




    return <React.Fragment>

        <div className="page-content">

            <Container fluid={true}>


                <Row>
                    <Col xl={4}>
                        <div >
                            <h2>IMAGE UPLOAD </h2>
                            <Card style={{ width: '200px', height: '230px' }} className='cursor-pointer' onClick={() => setmodal_fullscreen(!modal_fullscreen)}>
                                <div className='d-flex justify-content-center align-content-center h-100percen' >
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '50px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </Card>

                            <ImageView>
                                {
                                    image && <>
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






                        <Card className='mt-5'>
                            <CardBody>
                                <CardTitle className="h4">Add Banner</CardTitle>


                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Title
                                    </label>
                                    <div className="col-md-10">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder='Enter a Title'
                                        // onError={true}
                                        />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label">Type</label>
                                    <div className="col-md-10">
                                        <select className="form-control" placeholder='Select a Type' value={type} onChange={(e) => changeType(e)}>
                                            <option value={1}>User</option>
                                            <option value={2}>Partner</option>
                                        </select>
                                    </div>
                                </Row>



                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label">Status</label>
                                    <div className="col-md-10">
                                        <select className="form-control" placeholder='Select a Type' value={status} onChange={(e) => changeStatus(e)}>
                                            <option value={1}>Active</option>
                                            <option value={2}>DeActivate</option>
                                        </select>
                                    </div>
                                </Row>



                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label">Description</label>
                                    <div className="col-md-10">

                                        <Editor
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            editorState={editorState}
                                            onEditorStateChange={handleEditorChange}
                                        />
                                    </div>
                                </Row>




                                <Button disabled={loading} color='primary w-100' onClick={submitBanner}> {!loading ? 'Submit' : 'loading....'} </Button>


                            </CardBody>
                        </Card>



                    </Col>
                </Row>

            </Container>

            <Modal
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

                        // console.log(list);
                        // console.log(list[0].path);
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
            </Modal>


        </div>
    </React.Fragment>;
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

export default AddBanner;
