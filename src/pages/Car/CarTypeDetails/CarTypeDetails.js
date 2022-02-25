import React, { useEffect, useState } from "react";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  FormGroup,
  Input,
  Row,
  Spinner
} from "reactstrap";
import { Col } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import {
  addCarBrand,
  getCarType,
  getCarTypeDetails,
  getCarTypes,
  editCarBrand
} from "../../../store/Car/carTypes/carTypesAction";
import requestApi from "../../../network/httpRequest";
import { GET_CAR_TYPE_FULL_DETAILS } from "../../../network/Api";
import { toast } from "react-toastify";

const CarTypeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, carType, message, error } = useSelector(
    state => state.carTypesReducer
  );

  // const [carType, setCarType] = useState({});
  const [isZoom, setIsZoom] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [activeStatus, setActiveStatus] = useState(0);


  const options = [
    { label: "Active", value: 1 },
    { label: "Deactive", value: 2 }
  ];

  useEffect(
    () => {
      if (id) {
        dispatch(getCarTypeDetails(id));
      }
    },
    [id]
  );

  // CALL API FOR GET CAR TYPE

  // const callApi = async carTypeId => {
  //   const {
  //     data: { status, data }
  //   } = await requestApi().request(GET_CAR_TYPE_FULL_DETAILS, {
  //     params: { id: carTypeId }
  //   });
  //   if (status) {
  //     setCarType(data.carType);
  //     // console.log("data", data.carType);
  //     setBrands(data.carType.carBrands);
  //   } else {
  //     //   route.push('/car-types', { replace: true })
  //   }
  // };

  // SUBMIT CAR BRAND

  const submitCarBrand = () => {
    if (brandName == "" || brandName == null) {
      return toast.warn("Enter a Brand  Name ", {
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

    if(brandId){
     dispatch(editCarBrand({
    id:brandId,
    name: brandName,
    status: activeStatus

     }))
    }else{
      dispatch(
        addCarBrand({
          name: brandName,
          carTypeId: carType.id
        })
      );
    }
  };

  useEffect(
    () => {
      if (message) {
        setBrandName("");
        setActiveStatus(false);
        setBrandId(null)
        
      }
      if (error) {
        toast.warn(error, {
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
    },
    [message, error]
  );

  // EDIT BRAND 

 const handleEdit = (brandId) =>{
  if(brandId){
    setBrandId(brandId);
    const {name} = carType.carBrands.find(brand => brand.id == brandId)
    setBrandName(name);
    window.scrollTo(1, 1);
  }
 }

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
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-between  align-items-center"
                  >
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
                    <div className="d-flex align-items-start h-100">
                      <button
                        onClick={() => history.push(`/car-type/edit/${id}`)}
                        className="btn btn-success"
                      >
                        Edit
                      </button>
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
                      <Col>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={brandName}
                          onChange={event => setBrandName(event.target.value)}
                          id="brand"
                          className="form-control"
                          type="text"
                          placeholder="Enter a Brand Name"
                          required
                        />
                      </Col>
                    </Row>

                    {brandId && <Row className="mb-3">
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
                      <Button color="primary" onClick={submitCarBrand}>
                        {brandId ? "Edit" : "Add"}
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl={8}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4"> Brand List</CardTitle>

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
                        {carType?.carBrands?.map((brand, index) => {
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
                                {brand.name}
                              </Td>
                              <Td>
                                {brand.createdAt}
                              </Td>
                              <Td>
                                <button className="btn btn-sm btn-info"

                                  onClick={()=>handleEdit(brand.id)}
                                
                                >
                                  <i className="fa fa-edit" />
                                </button>

                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                      {loading &&
                        <Spinner
                          style={{
                            position: "fixed",
                            left: "50%",
                            top: "50%"
                          }}
                          animation="border"
                          variant="success"
                        />}
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

const Details = styled.div``;

const Value = styled.h5`
  color: lightcoral;
  font-style: italic;
  font-weight: bold;
  /* padding-left: 5px; */
`;

export default CarTypeDetails;
