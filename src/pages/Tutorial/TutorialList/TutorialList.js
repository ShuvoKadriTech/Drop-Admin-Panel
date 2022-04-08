import React,{useEffect} from "react";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import GlobalWrapper from "./../../../components/GlobalWrapper";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getAllTutorial, updateTutorialTypeKey } from "../../../store/tutorial/tutorialAction";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";


const TutorialList = () => {

    const dispatch = useDispatch();

    const {loading, tutorials, typeKey} = useSelector(state => state.tutorialReducer)


    useEffect(()=>{
        callTutorialList(true)
    },[])

    const callTutorialList = (refresh = false) =>{
        dispatch(getAllTutorial(refresh))
    }

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              maintitle="Quicar"
              title="Tutorials"
              breadcrumbItem="List"
                loading={loading}
                callList={callTutorialList}
              isAddNew={true}
              addNewRoute="tutorials/add"
            />

            <Card>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <FormControl style={{width: '50%'}}>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={typeKey}
                      label="Status"
                      onChange={(event) =>
                        dispatch(updateTutorialTypeKey(event.target.value))
                      }
                    >
                      <MenuItem value={"all"}>
                        All
                      </MenuItem>
                      <MenuItem value={"user"}>User</MenuItem>
                      <MenuItem value={"partner"}>Partner</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </CardBody>
            </Card>

            {/* TUTORIAL LIST TABLE */}

            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col md={3} className="text-end" />
                </Row>
                <CardTitle className="h4"> Tutorial List</CardTitle>
                <Table
                  id="tech-companies-1"
                  className="table table__wrapper table-striped table-bordered table-hover text-center"
                >
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Parnter Name</Th>
                      <Th>Car Type</Th>
                      <Th>Model</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody style={{ position: "relative" }}>
                    {/* {cars.map((car, index) => {
                      return (
                        <Tr
                          key={index}
                          className="align-middle"
                          style={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          <Th>
                            <div style={{ width: "50px", height: "50px" }}>
                              <img
                                  onClick={() => {
                                    showImageGallery(car.car_images)
                                  }}
                                className="img-fluid cursor-pointer"
                                alt=""
                                src={car.car_images[0].path}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </Th>

                          <Td>{car.partner.name}</Td>
                          <Td>{car.car_type.name}</Td>
                          <Td>{car.car_brand.name}</Td>
                          <Td>{car.status}</Td>
                          <Td>
                            <div>
                              <button
                                className="btn btn-info me-3 button"
                                onClick={() =>
                                  editCar(car.id, car.partner.id)
                                }
                              >
                                <i className="fa fa-edit" />
                              </button>
                              <button
                                className="btn btn-success button"
                                onClick={() =>
                                  history.push(
                                    `/car/details/${car.id}`
                                  )
                                }
                              >
                                <i className="fa fa-eye" />
                              </button>
                            </div>
                          </Td>
                        </Tr>
                      );
                    })} */}
                  </Tbody>
                  {/* {loading && (
                    <Spinner
                      style={{ position: "fixed", left: "50%", top: "50%" }}
                      animation="border"
                      variant="info"
                    />
                  )} */}
                </Table>
              </CardBody>
            </Card>


          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default TutorialList;
