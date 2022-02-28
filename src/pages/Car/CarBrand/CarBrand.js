import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import requestApi from "../../../network/httpRequest";
import { GET_CAR_TYPE_FULL_DETAILS, SINGLE_CAR_BRAND } from "../../../network/Api";
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
import { toast } from "react-toastify";
import { addBrandModel,editBrandModel } from "../../../store/Car/carTypes/carTypesAction";

const CarBrand = () => {

    const {id} = useParams();
    const { search } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const {carTypes, loading, status} = useSelector(state => state.carTypesReducer)

    const searchParams = useMemo(() => new URLSearchParams(search), [search]);
    

    const [brand, setBrand] = useState({});
    const [modelName, setModelName] = useState("");
    const [activeStatus, setActiveStatus] = useState(0);
    const [modelId, setModelId] = useState("")


    const options = [
      { label: "Active", value: 1 },
      { label: "Deactive", value: 2 }
    ];

    // GET CAR TYPE

    useEffect(() => {
        
        // console.log("partner Id", pID)
        if(id){
            const carTypeId = searchParams.get('carTypeID')
            // console.log("carTypeId",carTypeId);
            if (carTypeId) {
                const findCarType = carTypes.find(type => type.id == carTypeId);
                // console.log("findCarType",findCarType)
                if(findCarType){
                   
                    const findBrand = findCarType?.carBrands.find(brand => brand.id == id);
                    // console.log("findBrand",findBrand);
                    setBrand(findBrand)
                }else{
                  callApi(id, carTypeId)
                }
            }
        }
        
      
      }, [id, searchParams,carTypes])


      const callApi = async (brandId,carTypeId) => {
        const {
          data
        } = await requestApi().request(GET_CAR_TYPE_FULL_DETAILS + carTypeId)
    
        if (data.status) {
          // console.log("car type for model",data)
          
          const findBrand = data.carType?.carBrands?.find(brand => brand.id == brandId);
          // console.log("brand api", findBrand)
          setBrand(findBrand);
    
        } else {
          history.push("/car-types", { replace: true });
        }
      };


    //   CALL API FOR CAR BRAND

    // const callApiForCarBrand = async(typeId) =>{
    //     const {
    //         data
    //       } = await requestApi().request(SINGLE_CAR_BRAND + typeId)
      
    //       if (data.status) {
    //         // console.log(data)
    //         setBrand(data.data.carBrands);
      
    //       } else {
    //         history.goBack();
    //       }
    // }


    // SUBMIT MODEL DATA 

    const handleSubmit = () =>{

        if (modelName == "" || modelName == null) {
            return toast.warn("Enter a Model  Name ", {
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

          const carTypeId = searchParams.get('carTypeID')

          if(modelId){
            dispatch(editBrandModel(
              {id: modelId, name: modelName,
                 status: activeStatus },carTypeId))
          }else{
            dispatch(addBrandModel({
              name: modelName,
              carBrandId: id,
          },carTypeId))
          }

    }

    // SUCCESS

    useEffect(()=>{
      if(status){
        setModelName("");
        setModelId("");
        setActiveStatus(false);
      }
    },[status])

    // EDIT MODEL 

  const handleEdit = (modelId) =>{
      setModelId(modelId)
       const {name, status} = brand.carModels.find(model => model.id == modelId);
       setModelName(name);
       setActiveStatus(status);
       window.scroll(1,1);
  }

  // MODEL DETAILS 

  const modelDetails = (mId) => {
    const carTypeId = searchParams.get('carTypeID')
    history.push({
      pathname: `model/${mId}`,
      state: {carTypeId: carTypeId, brandId: brand.id}
    })

  }


  return (
    <React.Fragment>
      <GlobalWrapper>

      <div className="page-content" >
        <Container fluid={true}>
        <Breadcrumbs
              maintitle="Car"
              title="Car Type"
              breadcrumbItem="Car Brand"
              titleRoute="car-types"

              isRefresh= {false}
            //   loading={loading}
            //   callList={callCarList}
            />

            {/* BRAND MODEL */}

            <BrandTitle>Brand Name: {brand.name}</BrandTitle>

            <Row>
              <Col xl={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">{modelId ?"Edit" : "Add"} Model</CardTitle>

                    <Row className="mb-3">
                      <Col>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={modelName}
                          onChange={event => setModelName(event.target.value)}
                          id="brand"
                          className="form-control"
                          type="text"
                          placeholder="Enter a Model Name"
                          autoComplete="off"
                          required
                        />
                      </Col>
                    </Row>

                    {modelId &&
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
                      </Row>}

                    <Row>
                   
                      <Button color="primary" onClick={handleSubmit}>
                        {loading ?
                          <Spinner
                            size="sm"
                            animation="border"
                            variant="success"
                          /> :modelId ? "Edit" : "Add"}

                      

                      </Button>
                     
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl={8}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4"> Models List</CardTitle>

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
                        {brand?.carModels?.map((model, index) => {
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
                                    onClick={() => handleEdit(model.id)}
                                  >
                                    <i className="fa fa-edit" />
                                  </button>
                                  <button
                                    className="btn btn-success "
                                    onClick={() => modelDetails(model.id)}
                                  >
                                    <i className="fa fa-eye" />
                                  </button>
                                </ButtonWrapper>
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


const BrandTitle = styled.h2`

font-size: 23px;

    padding-bottom: 15px;
    font-family: serif;
    color: black;
`


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
`

export default CarBrand;
