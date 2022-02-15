
import React, { useState } from 'react';
import GlobalWrapper from '../../../components/GlobalWrapper';
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import ImageSelectionDialog from './../../Utility/ImageSelectionDialog';
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
import { useDispatch } from 'react-redux';

const PartnerAdd = () => {

    const dispatch = useDispatch()

    const [modal_fullscreen, setmodal_fullscreen] = useState(false);
    const [image, setImage] = useState();


    return (
        <React.Fragment>
            <GlobalWrapper>

                <div className="page-content" >
                    <Container fluid={true} className="py-4">
                        <Card>
                            <CardBody>
                                <h3>Add Partner</h3>
                                <Row className='pt-4'>
                                    <Col lg={6}>
                                        <Row>
                                            <Col lg={6}>
                                                <Input
                                                    // style={{ border: '1px solid red' }}
                                                    // value={colorName}
                                                    // onChange={event => {
                                                    //     setColorName(event.target.value);
                                                    // }}
                                                    id="name"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter Partner Name"
                                                    required
                                                />
                                            </Col>
                                            <Col lg={6} className="my-2 my-lg-0">
                                                <Input
                                                    // style={{ border: '1px solid red' }}
                                                    // value={colorName}
                                                    // onChange={event => {
                                                    //     setColorName(event.target.value);
                                                    // }}
                                                    id="email"
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="Enter Partner Email"
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='my-lg-4'>
                                            <Col lg={6}>
                                                <Input
                                                    // style={{ border: '1px solid red' }}
                                                    // value={colorName}
                                                    // onChange={event => {
                                                    //     setColorName(event.target.value);
                                                    // }}
                                                    id="nid"
                                                    className="form-control"
                                                    type="number"
                                                    placeholder="Enter Partner NID Number"
                                                    required
                                                />
                                            </Col>
                                            <Col lg={6} className="my-2 my-lg-0">
                                                <Input
                                                    // style={{ border: '1px solid red' }}
                                                    // value={colorName}
                                                    // onChange={event => {
                                                    //     setColorName(event.target.value);
                                                    // }}
                                                    id="phone"
                                                    className="form-control"
                                                    type="number"
                                                    placeholder="Enter Partner Phone Number"
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="form-group mb-0">
                                                    <Flatpickr
                                                        className="form-control d-block"
                                                        placeholder="Select Partner Date of Birth"
                                                        options={{
                                                            altInput: true,
                                                            altFormat: "F j, Y",
                                                            dateFormat: "Y-m-d",
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={6} className="d-flex flex-column align-items-center">

                                        {/* PARTNER IMAGE */}
                                        <div className="d-flex justify-content-center flex-column">
                                            <h6>Upload Partner Image</h6>
                                            <Card
                                                style={{ width: "385px", height: "160px" }}
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
                                        </div>

                                        {/* PARTNER NID FRONT IMAGE */}

                                        <div className="d-flex justify-content-center flex-column">
                                            <h6>Upload Partner NID Front Side</h6>
                                            <Card
                                                style={{ width: "385px", height: "160px" }}
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
                                        </div>

                                        {/* PARTNER NID BACK SIDE */}

                                        <div className="d-flex justify-content-center flex-column">
                                            <h6>Upload Partner NID Back Side</h6>
                                            <Card
                                                style={{ width: "385px", height: "160px" }}
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
                                        </div>

                                    </Col>
                                </Row>
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
}

export default PartnerAdd;
