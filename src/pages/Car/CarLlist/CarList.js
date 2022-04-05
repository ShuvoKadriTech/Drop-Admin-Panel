import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import GlobalWrapper from "../../../components/GlobalWrapper";
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
import styled from "styled-components";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, setCarStatusFalse } from "../../../store/Car/carAction";
import Lightbox from "react-image-lightbox";
import AppPagination from "../../../components/AppPagination";
import { useHistory } from 'react-router-dom';
import { setStatusFalse } from "../../../store/partner/partnerActions";

const CarList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { 
    loading,
     cars,
     paging,
    hasNextPage,
    hasPreviousPage,
    currentPage, } = useSelector((state) => state.carReducer);


  const [isZoom, setIsZoom] = useState(false);
  const [carImageGalley, setCarImageGallery] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    callCarList()
  }, []);


  const callCarList = (refresh = false) =>{
    dispatch(getAllCars(refresh));
  }

  const showImageGallery = (images) =>{
    const newImagePaths = images.map(image => image.path)
    setCarImageGallery(newImagePaths);
    setIsZoom(true)

  }

  // EDIT CAR EVENT 

  const editCar = (carId, id) => {
    history.push({
      pathname: `/car/edit/${carId}`,
      search: `?pID=${id}`,
      // state: { detail: 'some_value' }
    });
    // history.push(`/partner/edit/${partner.id}`)
  };

  useEffect(()=>{
    dispatch(setCarStatusFalse())
  },[])

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              maintitle="Car"
              breadcrumbItem="List"
              loading={loading}
              callList={callCarList}
              isAddNew={true}
              addNewRoute="car/add"
            />

            {isZoom ? (
              <Lightbox
                // closeLabel={"close button"}
                // closeButtonAriaLabel={"close button"}
                mainSrc={carImageGalley[photoIndex]}
                nextSrc={
                  carImageGalley[(photoIndex + 1) % carImageGalley.length]
                }
                prevSrc={
                  carImageGalley[
                    (photoIndex + carImageGalley.length - 1) %
                      carImageGalley.length
                  ]
                }
                onCloseRequest={() => setIsZoom(false)}
                onMovePrevRequest={
                  () =>
                    setPhotoIndex(
                      (photoIndex + carImageGalley.length - 1) %
                        carImageGalley.length
                    )
                  // setPhotoIndex({
                  //   photoIndex:
                  //     (photoIndex + carImageGalley.length - 1) %
                  //     carImageGalley.length
                  // })
                }
                onMoveNextRequest={
                  () => setPhotoIndex((photoIndex + 1) % carImageGalley.length)
                  // setPhotoIndex({
                  //   photoIndex: (photoIndex + 1) % carImageGalley.length,
                  // })
                }
              />
            ) : null}

            {/* Filter */}

            <Card>
              <CardBody>
                <Row>
                  <Col md={4}>
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
                          <MenuItem value={"all"} active>
                            All
                          </MenuItem>
                          <MenuItem value={"pending"}>Pending</MenuItem>
                          <MenuItem value={"active"}>active</MenuItem>
                          <MenuItem value={"cancel"}>cancel</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                  <Col md={8} className="d-flex align-items-center">
                    <SearchWrapper>
                      <div className="search__wrapper">
                        <i className="fa fa-search" />
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search"
                          id="search"
                          autoComplete="off"
                          // value={searchKey}
                          // onChange={(event) =>
                          //   searchKeyListener(event.target.value)
                          // }
                        />
                      </div>
                    </SearchWrapper>
                  </Col>
                  {/* <Col md={3}>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Current Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={currentStatusKey}
                          label="Current Status"
                          // onChange={(event) =>
                          //   dispatch(updateCurrntStatusKey(event.target.value))
                          // }
                        >
                          <MenuItem value={"online"}>Online</MenuItem>
                          <MenuItem value={"offline"}>Offline</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Col> */}
                </Row>
              </CardBody>
            </Card>

            {/* Table */}

            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col md={3} className="text-end" />
                </Row>
                <CardTitle className="h4"> Cars List</CardTitle>
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
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody style={{ position: "relative" }}>
                    {cars.map((car, index) => {
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
                    })}
                  </Tbody>
                  {loading && (
                    <Spinner
                      style={{ position: "fixed", left: "50%", top: "50%" }}
                      animation="border"
                      variant="info"
                    />
                  )}
                </Table>
              </CardBody>
            </Card>

            <Row>
              <Col xl={12}>
                <div className="d-flex justify-content-center">
                  <AppPagination
                    paging={paging}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    currentPage={currentPage}
                    lisener={(page) => dispatch(getAllCars(true, page))}
                  />
                  {/* <h2>Paginate</h2> */}
                </div>
              </Col>
            </Row>

          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const SearchWrapper = styled.div`
  width: 100%;
  border: 1px solid #d3d1d1;
  border-radius: 6px;

  .search__wrapper {
    padding: 7px 10px;
    display: flex;
    align-items: center;

    i {
      font-size: 15px;
    }
    input {
      border: none;
      color: black !important;
    }

  }
`;

export default CarList;
