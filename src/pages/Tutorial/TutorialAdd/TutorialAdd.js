import React from "react";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import GlobalWrapper from "../../../components/GlobalWrapper";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TutorialAdd = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              maintitle="Quicar"
              title="Tutorials"
              breadcrumbItem="Add"
              isRefresh={false}
              // loading={loading}
              // callList={callTutorialList}
            />

            <Card>
              <CardBody>
                <Row>
                  <Col lg={6}>
                  <TextField
                      id="outlined-required"
                      label="Title"
                      className="w-100"
                      multiline
                      maxRows={4}
                      // value={note}
                      // onChange={(event) => setNote(event.target.value)}
                    />
                  </Col>
                  <Col lg={6} className="mt-3 mt-lg-0">
                  <TextField
                      id="outlined-required"
                      label="Serial"
                      className="w-100"
                      multiline
                      maxRows={4}
                      // value={note}
                      // onChange={(event) => setNote(event.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="my-lg-3">
                  <Col lg={6} className="mt-3 mt-lg-0">
                  <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={statusKey}
                          label="Status"
                          // onChange={(event) =>
                          //   dispatch(updateStatusKey(event.target.value))
                          // }
                        >

                          <MenuItem value={"partner"}>Partner</MenuItem>
                          <MenuItem value={"user"}>User</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                  <Col lg={6} className="mt-3 mt-lg-0">
                  <TextField
                      id="outlined-required"
                      label="Youtube Id"
                      className="w-100"
                      multiline
                      maxRows={4}
                      // value={note}
                      // onChange={(event) => setNote(event.target.value)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col >
                  <div className="d-flex justify-content-center flex-column">
                      <h6>Thumbnil</h6>
                      <Card
                        style={{ width: "385px", height: "160px" }}
                        className="cursor-pointer"
                      >
                        <div className="d-flex justify-content-center align-content-center h-100" style={{ border: "1px solid rgb(207 207 207)" }}>
                          
                             {/* <ImageView>
                              <>
                                <img
                                  // src={partnerImage}
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
                            </ImageView> */}
                             <div
                              style={{ width: "100%", height: "100%" }}
                              className="d-flex justify-content-center align-items-center"
                              // onClick={() => handleImage(1)}
                              
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
                        </div>
                      </Card>
                    </div>
                  </Col>
                </Row>

              </CardBody>
            </Card>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default TutorialAdd;
