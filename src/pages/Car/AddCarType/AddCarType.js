import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import GlobalWrapper from "../../../components/GlobalWrapper";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Button,
  FormGroup,
  Input,
  InputGroup,
  Label
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeImage,
  selectImage
} from "../../../store/action/uploadImage.action";
import { Link } from "react-router-dom";

const AddCarType = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();

  const {
    loading,
    selectedFiles,
    error,
    folderList,
    selectedFolder,
    uploadedImages
  } = useSelector(state => state.uploadImage);

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  //   UPLOAD IMAGE

  function handleAcceptedFiles(files) {
    // console.log(files);
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size)
      })
    );
    // setselectedFiles([...selectedFiles, ...files])

    dispatch(selectImage(files));
  }

  //   REMOVE IMAGE

  const removeSelection = index => {
    dispatch(removeImage(index));
  };

  const onSubmit = () => {};

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content my-3">
          <h4>Add Car Type</h4>
          <form className="p-5 form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                name="name"
                className="form-control"
                placeholder="Enter Car Type Name"
                {...register("name", { required: true })}
              />
              {errors.name && <p>This field is required</p>}
            </div>
            <Row className="py-3">
              <Col lg={6} sm={12} className="form-group">
                <input
                  name="minSeat"
                  className="form-control"
                  placeholder="Enter Min Seat"
                  {...register("minSeat", { required: true })}
                />
                {errors.minSeat && <p>This field is required</p>}
              </Col>
              <Col lg={6} sm={12} className="form-group">
                <input
                  name="maxSeat"
                  className="form-control"
                  placeholder="Enter Max Seat"
                  {...register("maxSeat", { required: true })}
                />
                {errors.maxSeat && <p>This field is required</p>}
              </Col>
            </Row>

            <Dropzone
              onDrop={acceptedFiles => {
                handleAcceptedFiles(acceptedFiles);
              }}
            >
              {({ getRootProps, getInputProps }) =>
                <div className="dropzone">
                  <div className="dz-message needsclick" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="mb-3">
                      <i className="mdi mdi-cloud-upload display-2 text-muted" />
                    </div>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </div>}
            </Dropzone>

            <div className="dropzone-previews mt-3" id="file-previews">
              {selectedFiles.map((f, i) => {
                return (
                  <Card
                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                    key={i + "-file"}
                  >
                    <div className="p-2">
                      <Row className="align-items-center position-relative">
                        <Col className="col-auto">
                          <img
                            data-dz-thumbnail=""
                            // height="80"
                            style={{
                              maxWidth: "80px"
                            }}
                            className=" bg-light"
                            alt={f.name}
                            src={f.preview}
                          />
                        </Col>
                        <Col>
                          <Link to="#" className="text-muted font-weight-bold">
                            {f.name}
                          </Link>
                          <p className="mb-0">
                            <strong>
                              {f.formattedSize}
                            </strong>
                          </p>
                        </Col>

                        <div
                          className="position-absolute"
                          style={{
                            left: "0px",
                            top: "0px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end"
                          }}
                        >
                          <i
                            onClick={() => removeSelection(i)}
                            className="mdi mdi-delete text-danger "
                            style={{ fontSize: "25px", cursor: "pointer" }}
                          />
                        </div>
                      </Row>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="form-group mt-5">
              <input
                type="submit"
                className="btn btn-info  text-white text-uppercase"
              />
            </div>
          </form>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default AddCarType;
