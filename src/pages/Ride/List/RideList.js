import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import FormControl from "@mui/material/FormControl";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import InputLabel from "@mui/material/InputLabel";
import Lightbox from "react-image-lightbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  AllRides,
  updateRideSearchKey,
  updateRideTypeKey,
} from "../../../store/Ride/rideAction";
import AppPagination from "../../../components/AppPagination";

const RideList = () => {
  const dispatch = useDispatch();

  const {
    rides,
    paging,
    hasNextPage,
    currentPage,
    hasPreviousPage,
    typeKey,
    searchKey,
    loading,
  } = useSelector((state) => state.rideReducer);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (searchKey || typeKey) {
      callRideList(true);
    } else {
      if (open) {
        callRideList(true);
      } else {
        callRideList();
      }
    }
  }, [typeKey, searchKey]);

  const callRideList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(AllRides(refresh));
  };

  // SEARCH KEY

  const searchKeyListener = (value) => {
    setOpen(true);
    dispatch(updateRideSearchKey(value));
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Ride"
              breadcrumbItem="List"
              hideSettingBtn={true}
              loading={loading}
              callList={callRideList}
              isAddNew={true}
              addNewRoute="ride/add"
            />

            {/* FILTER OPTIONS */}

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
                          value={typeKey}
                          label="Status"
                          onChange={(event) =>
                            dispatch(updateRideTypeKey(event.target.value))
                          }
                        >
                          <MenuItem value={"all"} active="true">
                            All
                          </MenuItem>
                          <MenuItem value={"send"}>Send</MenuItem>
                          <MenuItem value={"unaccepted"}>Unaccepted</MenuItem>
                          <MenuItem value={"accepted"}>Accepted</MenuItem>
                          <MenuItem value={"cancel"}>Cancel</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                  <Col
                    md={8}
                    className="d-flex align-items-center mt-3 mt-md-0"
                  >
                    <SearchWrapper>
                      <div className="search__wrapper">
                        <i className="fa fa-search" />
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Find Ride by Ride Id "
                          id="search"
                          value={searchKey}
                          onChange={(event) =>
                            searchKeyListener(event.target.value)
                          }
                        />
                      </div>
                    </SearchWrapper>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/* RIDE LIST */}

            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col md={3} className="text-end" />
                </Row>
                <CardTitle className="h4"> Ride List</CardTitle>
                <Table
                  id="tech-companies-1"
                  className="table table__wrapper table-striped table-bordered table-hover text-center"
                >
                  <Thead>
                    <Tr>
                      <Th>Booking Id</Th>
                      <Th>Pickup(Place/Time) </Th>
                      <Th>Drop Off(Place/Time) </Th>
                      <Th>User</Th>
                      <Th>Distance/Duration</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody style={{ position: "relative" }}>
                    {rides.length > 0 &&
                      rides.map((ride, index) => {
                        return (
                          <Tr
                            key={index}
                            className="align-middle"
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            <Th>{ride.bookingId}</Th>

                            <Td style={{ maxWidth: "350px" }}>
                              <div>
                                <p>{ride.pickupLocation.address}</p>
                                <span>{ride.pickUpTimeText}</span>
                              </div>
                            </Td>

                            <Td style={{ maxWidth: "350px" }}>
                              <div>
                                <p>{ride.dropOffLocation.address}</p>
                                <span>{ride.returnTimeText}</span>
                              </div>
                            </Td>
                            <Td>
                              <div>
                                <p>{ride.user.name}</p>
                                <span>{ride.user.phoneNumber}</span>
                              </div>
                            </Td>
                            <Td>
                              <div>
                                <p>{ride.distanceText}</p>
                                <span>{ride.durationText}</span>
                              </div>
                            </Td>
                            <Td>
                              <ButtonWrapper>
                                <button
                                  className="btn btn-info me-xl-3"
                                  //   onClick={() =>
                                  //     history.push(`/partner/edit/${partner.id}`)}
                                >
                                  <i className="fa fa-edit" />
                                </button>
                                <button
                                  className="btn btn-success "
                                  //   onClick={() =>
                                  //     history.push(`/partner/${partner.id}`)}
                                >
                                  <i className="fa fa-eye" />
                                </button>
                              </ButtonWrapper>
                            </Td>
                          </Tr>
                        );
                      })}
                    {loading && (
                      <Tr>
                        <Td>
                          <Spinner
                            style={{
                              position: "fixed",
                              left: "50%",
                              top: "50%",
                            }}
                            animation="border"
                            variant="success"
                          />
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
                {rides.length < 1 && !loading && (
                  <div className="text-center">
                    <h3>No Data Found</h3>
                  </div>
                )}
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
                    lisener={(page) => dispatch(AllRides(true, page))}
                  />
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
  border: 1px solid #c9bfbf;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;

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

export default RideList;
