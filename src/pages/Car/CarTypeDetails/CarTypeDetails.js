import React, { useEffect, useState } from "react";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  FormGroup,
  Input,
  Row,
  Spinner,
  Table
} from "reactstrap";
import { Col } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
import { Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import {
  getCarType,
  getCarTypes
} from "../../../store/Car/carTypes/carTypesAction";
import requestApi from "../../../network/httpRequest";
import { GET_SINGLE_CAR_TYPE } from "../../../network/Api";

const CarTypeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, carTypes } = useSelector(state => state.carTypesReducer);

  const [carType, setCarType] = useState({});
  const [isZoom, setIsZoom] = useState(false);

  useEffect(
    () => {
      if (id) {
        const carType = carTypes.find(carType => carType.id == id);

        if (carType) {
          setCarType(carType);
        } else {
          callApi(id);
        }
      }
    },
    [id]
  );

  // CALL API FOR GET CAR TYPE

  const callApi = async carTypeId => {
    const {
      data: { status, data }
    } = await requestApi().request(GET_SINGLE_CAR_TYPE, {
      params: { id: carTypeId }
    });
    if (status) {
      setCarType(data.carType);
    } else {
      //   route.push('/car-types', { replace: true })
    }
  };

  const getCarType = () => {
    // console.log(carType);
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Car"
              title="Car Types"
              breadcrumbItem="Details"
              titleRoute="car-types"
              hideSettingBtn={true}
              //   loading={loading}
              //   callList={callCarList}
            />

            {loading &&
              <div className="d-flex justify-content-center py-4">
                <Spinner animation="border" />
              </div>}

            {isZoom
              ? <Lightbox
                  mainSrc={carType.image}
                  enableZoom={true}
                  imageCaption={carType.name}
                  onCloseRequest={() => {
                    setIsZoom(!isZoom);
                  }}
                />
              : null}

            <Card>
              <CardBody>
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-center"
                    style={{ borderRight: "1px solid lightgray" }}
                  >
                    <div style={{ width: "215px" }}>
                      <img
                        onClick={() => {
                          setIsZoom(true);
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={carType.image}
                        width="100%"
                      />
                    </div>
                  </Col>
                  <Col md={6} sm={12} className="d-flex  align-items-center">
                    <div className="ps-4">
                      <Details>
                        <h5>Car Name:</h5>
                        <Value>
                          {carType.name}
                        </Value>
                      </Details>
                      <Details>
                        <h5>Min Seat:</h5>
                        <Value>
                          {carType.minSeat}
                        </Value>
                      </Details>
                      <Details>
                        <h5>Max Seat:</h5>
                        <Value>
                          {carType.maxSeat}
                        </Value>
                      </Details>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/* CAR  BRAND */}

            <Row>
              <Col xl={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Add Brand</CardTitle>

                    <Row className="mb-3">
                      <Col xl={12} sm={12} md={12}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          //   value={colorName}
                          onChange={event => {
                            // setColorName(event.target.value);
                          }}
                          id="color"
                          className="form-control"
                          type="text"
                          placeholder="Enter a Color Name"
                          required
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Button color="primary">
                        {"Add"}
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl={8}>
                <div className="table-rep-plugin">
                  <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                  >
                    <Card>
                      <CardBody>
                        <CardTitle className="h4"> Brand List</CardTitle>

                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered table-hover text-center"
                        >
                          <Thead>
                            <Tr>
                              <Th>Serial No</Th>
                              <Th>Color Name</Th>
                              <Th>Color Code</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {/* {colors.map((color, index) => {
                              return (
                                <Tr
                                  key={index}
                                  className="align-middle"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500"
                                  }}
                                >
                                  <Th>
                                    {index + 1}
                                  </Th>
                                  <Td>
                                    {color.name}
                                  </Td>
                                  <Td style={{ color: `${color.colorCode}` }}>
                                    {color.colorCode}
                                  </Td>
                                  <Td>
                                    <button
                                      className="btn btn-info "
                                      onClick={() => handleEditColor(color.id)}
                                    >
                                      <i className="fa fa-edit" />
                                    </button>
                                  </Td>
                                </Tr>
                              );
                            })} */}
                          </Tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const Details = styled.div``;

const Value = styled.h5`
  color: lightcoral;
  font-style: italic;
  font-weight: bold;
  /* padding-left: 5px; */
`;

export default CarTypeDetails;
