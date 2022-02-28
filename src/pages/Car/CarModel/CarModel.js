import React, { useEffect, useMemo, useState } from "react";
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
import { GET_CAR_TYPE_FULL_DETAILS } from './../../../network/Api';
import requestApi from './../../../network/httpRequest';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { addModelColor, getColorsYears } from "../../../store/Car/carTypes/carTypesAction";
import { toast } from "react-toastify";



const CarModel = () => {


  const { id } = useParams();
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { carTypes, loading, status, colors, years } = useSelector(
    state => state.carTypesReducer
  );

  const [model, setModel] = useState({})
  const [colorValue, setColorValue] = useState({});
  const [colorInputValue, setColorInputValue] = useState('');

  useEffect(
    () => {
      if (id) {
        const { carTypeId, brandId } = state;

        if (carTypeId) {
          const findCarType = carTypes.find(type => type.id == carTypeId);
          // console.log("findCarType",findCarType)
          if (findCarType) {

            const findBrand = findCarType?.carBrands.find(brand => brand.id == brandId);
            // console.log("findBrand",findBrand);

            if (findBrand) {
              const findModel = findBrand.carModels.find(model => model.id == id)
              console.log("Model", findModel)
              setModel(findModel)
            }
            // setBrand(findBrand)
          } else {
            callApi(carTypeId, brandId)
          }
        }

        dispatch(getColorsYears())

      }
    },
    [id]
  );

  // CALL API 

  const callApi = async (carTypeId, brandId) => {
    const {
      data
    } = await requestApi().request(GET_CAR_TYPE_FULL_DETAILS + carTypeId)

    if (data.status) {
      // console.log("car type for model",data)

      const findBrand = data.carType?.carBrands?.find(brand => brand.id == brandId);

      if (findBrand) {
        const findModel = findBrand.carModels.find(model => model.id == id)
        setModel(findModel)
      }
      
      // console.log("brand api", findBrand)
      // setBrand(findBrand);

    }
    else {
      history.push("/car-types", { replace: true });
    }
  };

  // SUBMIT COLOR 

  const handleColorSubmit = () =>{
    // console.log(colorValue)
    if(Object.keys(colorValue).length === 0 && colorValue.constructor === Object){
      return toast.warn("Enter a Model Color ", {
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
    const { carTypeId, brandId } = state;

    dispatch(addModelColor({
      colorId: colorValue.id,
      carModelId: id
    },brandId,carTypeId))
  }

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

            <ModelTitle>Model Name: {model.name}</ModelTitle>

            <Row>
              {/* COLOR */}
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <CardTitle>Color</CardTitle>

                    <Autocomplete
                      value={colorValue}
                      onChange={(event, newValue) => {
                        setColorValue(newValue);
                        console.log("new",newValue)
                      }}
                      getOptionLabel={(option) => option.name ? option.name : ""}
                      inputValue={colorInputValue}
                      onInputChange={(event, newInputValue) => {
                        setColorInputValue(newInputValue);
                        console.log("input value",newInputValue)
                      }}
                      id="controllable-states-demo"
                      options={colors}
                      sx={{ width: "100%" }}
                      renderInput={(params) => <TextField {...params} label="Select a Color" />}
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
                      <Button color="primary" className="w-100" onClick={handleColorSubmit}>
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
                    <CardTitle>Year</CardTitle>

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
