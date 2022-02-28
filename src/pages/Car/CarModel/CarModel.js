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
import { addModelColor, addModelYear, getCarTypes, getColorsYears } from "../../../store/Car/carTypes/carTypesAction";
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
  const [colorValue, setColorValue] = useState(null);
  const [colorInputValue, setColorInputValue] = useState('');

  const [yearValue, setYearValue]= useState(null);
  const [yearInputValue, setYearInputValue] = useState(0)


  useEffect(()=>{
      if(carTypes.length <=0){
        dispatch(getCarTypes())
      }
  },[carTypes])


  useEffect(
    () => {
      if (id) {
        const { carTypeId, brandId } = state;

        if (carTypeId) {
          const findCarType = carTypes.find(type => type.id == carTypeId);
          // console.log("findCarType",findCarType)
          if (findCarType) {

            const findBrand = findCarType?.carBrands.find(brand => brand.id == brandId);
            console.log("findBrand",findBrand);

            if (findBrand) {
              const findModel = findBrand.carModels.find(model => model.id == id)
              // console.log("Model", findModel)
              setModel(findModel)
            }
            // setBrand(findBrand)
          } 
          else {
            callApi(carTypeId, brandId)
          }
        }else {
          history.push("/car-types", { replace: true });
        }

        dispatch(getColorsYears())

      }
    },
    [id, carTypes]
  );

  // CALL API 

  const callApi = async (carTypeId, brandId) => {
    const {
      data
    } = await requestApi().request(GET_CAR_TYPE_FULL_DETAILS + carTypeId)

    if (data.status) {
      // console.log("car type for model",data)

      const findBrand = data.data.carType?.carBrands?.find(brand => brand.id == brandId);
      console.log("find brand ", findBrand);
      if (findBrand) {
        const findModel = findBrand.carModels.find(model => model.id == id)
        setModel(findModel)
      }
      
      // console.log("brand api", findBrand)
      // setBrand(findBrand);

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

  // SUBMIT YEAR

  const submitYear = () =>{

    

    if(Object.keys(yearValue).length === 0 && yearValue.constructor === Object){
      return toast.warn("Enter a Model Year ", {
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

    dispatch(addModelYear({
      yearId: yearValue.id,
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
                          <Th>Color</Th>
                          <Th>Created At</Th>

                        </Tr>
                      </Thead>
                      <Tbody>
                        {model?.colors?.map((color, index) => {
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
                                {color.name}
                              </Td>
                              <Td>
                                {color.createdAt}
                              </Td>

                            </Tr>
                          );
                        })}
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

                    <Autocomplete
                      value={yearValue}
                      onChange={(event, value) => {
                        setYearValue(value);
                        console.log("new",value)
                      }}
                      getOptionLabel={(option) => option.year ? (option.year).toString() : ""}
                      inputValue={yearInputValue.toString()}
                      onInputChange={(event, inputValue) => {
                        setYearInputValue(inputValue);
                        console.log("input value",inputValue)
                      }}
                      id="controllable-states-demo"
                      options={years}
                      sx={{ width: "100%" }}
                      renderInput={(params) => <TextField {...params} label="Select a Year" />}
                    />



                    <div className="pt-3">
                      <Button color="primary" className="w-100" onClick={submitYear}>
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
                    <CardTitle className="h4"> Year List</CardTitle>

                    <Table
                      id="tech-companies"
                      className="table table__wrapper table-striped table-bordered table-hover text-center"
                    >
                      <Thead>
                        <Tr>
                          <Th>Serial No</Th>
                          <Th>Year</Th>
                          <Th>Created At</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {model?.years?.map((item, index) => {
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
                                {item.year}
                              </Td>
                              <Td>
                                {item.createdAt}
                              </Td>

                            </Tr>
                          );
                        })}
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
