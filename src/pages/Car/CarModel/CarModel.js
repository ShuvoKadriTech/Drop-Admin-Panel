import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Spinner,
  Col
} from "reactstrap";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const CarModel = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { carTypes, loading, status } = useSelector(
    state => state.carTypesReducer
  );

  useEffect(
    () => {
      if (id) {
        const { carTypeId, brandId } = state;
      }
    },
    [id]
  );

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Car Types"
              title="Brand"
              breadcrumbItem="Model Details"
              //   titleRoute="car-types"
              // loading={loading}
              // callList={callCarList}
              isRefresh={false}
            />

            {/* BRAND MODEL */}

            <ModelTitle>Brand Name:</ModelTitle>

            <Row>
              {/* COLOR */}
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <CardTitle>Brand Name</CardTitle>

                    <Input
                      // style={{ border: '1px solid red' }}
                      //   value={modelName}
                      //   onChange={event => setModelName(event.target.value)}
                      id="brand"
                      className="form-control"
                      type="text"
                      placeholder="Enter a Model Name"
                      autoComplete="off"
                      required
                    />

                    {/* {modelId &&
                      <Row className="mb-3">
                        <Col>
                          <select
                            style={{
                              width: "100%",
                              border: "1px solid lightgray",
                              padding: "8px 0px",
                              borderRadius: "6px"
                            }}
                            value={activeStatus}
                            onChange={event =>
                              setActiveStatus(event.target.value)}
                          >
                            {options.map((option, index) =>
                              <option value={option.value} key={index}>
                                {option.label}
                              </option>
                            )}
                          </select>
                        </Col>
                      </Row>} */}

                    <div className="pt-3">
                      <Button color="primary" className="w-100">
                        {loading
                          ? <Spinner
                              size="sm"
                              animation="border"
                              variant="success"
                            />
                          : "Add"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                {/* COLOR TABLE */}

                <Card>
                  <CardBody>
                    <CardTitle className="h4"> Color List</CardTitle>

                    <Table
                      id="tech-companies"
                      className="table table__wrapper table-striped table-bordered table-hover text-center"
                    >
                      <Thead>
                        <Tr>
                          <Th>Serial No</Th>
                          <Th>Name</Th>
                          <Th>Created At</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {/* {brand?.carModels?.map((model, index) => {
                          return (
                            <Tr
                              key={index}
                              className="align-middle"
                              style={{
                                fontSize: "15px",
                                fontWeight: "500"
                              }}
                            >
                              <Td>
                                {index + 1}
                              </Td>

                              <Td>
                                {model.name}
                              </Td>
                              <Td>
                                {model.createdAt}
                              </Td>
                              <Td>
                                <ButtonWrapper>
                                  <button
                                    className="btn btn-info me-xl-3"
                                    // onClick={() => handleEdit(model.id)}
                                  >
                                    <i className="fa fa-edit" />
                                  </button>
                                  <button
                                    className="btn btn-success "
                                    // onClick={() => modelDetails(model.id)}
                                  >
                                    <i className="fa fa-eye" />
                                  </button>
                                </ButtonWrapper>
                              </Td>
                            </Tr>
                          );
                        })} */}
                      </Tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>

              {/* YEAR */}
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <CardTitle>Brand Name</CardTitle>

                    <Input
                      // style={{ border: '1px solid red' }}
                      //   value={modelName}
                      //   onChange={event => setModelName(event.target.value)}
                      id="brand"
                      className="form-control"
                      type="text"
                      placeholder="Enter a Model Name"
                      autoComplete="off"
                      required
                    />

                    {/* {modelId &&
                      <Row className="mb-3">
                        <Col>
                          <select
                            style={{
                              width: "100%",
                              border: "1px solid lightgray",
                              padding: "8px 0px",
                              borderRadius: "6px"
                            }}
                            value={activeStatus}
                            onChange={event =>
                              setActiveStatus(event.target.value)}
                          >
                            {options.map((option, index) =>
                              <option value={option.value} key={index}>
                                {option.label}
                              </option>
                            )}
                          </select>
                        </Col>
                      </Row>} */}

                    <div className="pt-3">
                      <Button color="primary" className="w-100">
                        {loading
                          ? <Spinner
                              size="sm"
                              animation="border"
                              variant="success"
                            />
                          : "Add"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                {/* COLOR TABLE */}

                <Card>
                  <CardBody>
                    <CardTitle className="h4"> Color List</CardTitle>

                    <Table
                      id="tech-companies"
                      className="table table__wrapper table-striped table-bordered table-hover text-center"
                    >
                      <Thead>
                        <Tr>
                          <Th>Serial No</Th>
                          <Th>Name</Th>
                          <Th>Created At</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {/* {brand?.carModels?.map((model, index) => {
                          return (
                            <Tr
                              key={index}
                              className="align-middle"
                              style={{
                                fontSize: "15px",
                                fontWeight: "500"
                              }}
                            >
                              <Td>
                                {index + 1}
                              </Td>

                              <Td>
                                {model.name}
                              </Td>
                              <Td>
                                {model.createdAt}
                              </Td>
                              <Td>
                                <ButtonWrapper>
                                  <button
                                    className="btn btn-info me-xl-3"
                                    // onClick={() => handleEdit(model.id)}
                                  >
                                    <i className="fa fa-edit" />
                                  </button>
                                  <button
                                    className="btn btn-success "
                                    // onClick={() => modelDetails(model.id)}
                                  >
                                    <i className="fa fa-eye" />
                                  </button>
                                </ButtonWrapper>
                              </Td>
                            </Tr>
                          );
                        })} */}
                      </Tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const ModelTitle = styled.h2`
  font-size: 23px;

  padding-bottom: 15px;
  font-family: serif;
  color: black;
`;

const ButtonWrapper = styled.div`
  .btn {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
  }
`;
export default CarModel;
