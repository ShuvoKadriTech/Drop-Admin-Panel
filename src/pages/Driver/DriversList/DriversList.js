import React, { useEffect } from "react";
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
import AppPagination from "../../../components/AppPagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Lightbox from "react-image-lightbox";
import { useHistory } from "react-router-dom";
import {
  allDrivers,
  updateCreatedByKey,
  updateCurrntStatusKey,
  updateSearchKey,
  updateStatusKey,
} from "../../../store/Driver/driverAction";
import { useDispatch, useSelector } from "react-redux";

const DriversList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    statusKey,
    drivers,
    paging,
    hasNextPage,
    hasPreviousPage,
    currentPage,
    searchKey,
    currentStatusKey,
    loading,
  } = useSelector((state) => state.driverReducer);

  useEffect(() => {
    if (searchKey || statusKey || currentStatusKey) {
      callDriverList(true);
    } else {
      // if (open) {
      //   callPartnerList(true);
      // } else {
      //   callPartnerList();
      // }

      callDriverList();
    }
  }, [searchKey, statusKey, currentStatusKey]);

  const callDriverList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(allDrivers(refresh));
  };

  const searchKeyListener = (value) => {
    // console.log("fatching data...");
    // setOpen(true);
    dispatch(updateSearchKey(value));
  };

  // const handleSearchKey = () => {
  //   // console.log("call");
  //   debounce(searchKeyListener, 1000);
  //   //
  // };

  // DEBOUNCE SEARCH

  // const debounce = (func, delay) => {
  //   //
  //   let timer;

  //   // console.log("yes....");
  //   clearTimeout(timer);

  //   timer = setTimeout(() => {
  //     func();
  //   }, delay);
  // };

  // EDIT PARTNER

  const handleEdit = (driverId, partnerId) => {
    history.push({
      pathname: `/driver/edit/${driverId}`,
      search: `?pID=${partnerId}`,
      // state: { detail: 'some_value' }
    });
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Drivers"
              breadcrumbItem="List"
              hideSettingBtn={true}
              loading={loading}
              callList={callDriverList}
              isAddNew={true}
              addNewRoute="driver/add"
            />

            {/* {isZoom
              ? <Lightbox
                  mainSrc={partnerImage}
                  enableZoom={true}
                  onCloseRequest={() => {
                    setIsZoom(!isZoom);
                  }}
                />
              : null} */}

            <Card>
              <CardBody>
                <Row>
                  <Col md={3}>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={statusKey}
                          label="Status"
                          onChange={(event) =>
                            dispatch(updateStatusKey(event.target.value))
                          }
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
                  <Col md={6} className="d-flex align-items-center">
                    <SearchWrapper>
                      <div className="search__wrapper">
                        <i className="fa fa-search" />
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search"
                          id="search"
                          autoComplete="off"
                          value={searchKey}
                          onChange={(event) =>
                            searchKeyListener(event.target.value)
                          }
                        />
                      </div>
                    </SearchWrapper>
                  </Col>
                  <Col md={3}>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Current Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={currentStatusKey}
                          label="Current Status"
                          onChange={(event) =>
                            dispatch(updateCurrntStatusKey(event.target.value))
                          }
                        >
                          <MenuItem value={"online"}>Online</MenuItem>
                          <MenuItem value={"offline"}>Offline</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col md={3} className="text-end" />
                </Row>
                <CardTitle className="h4"> Drivers List</CardTitle>
                <Table
                  id="tech-companies-1"
                  className="table table__wrapper table-striped table-bordered table-hover text-center"
                >
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody style={{ position: "relative" }}>
                    {drivers.map((driver, index) => {
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
                                //   onClick={() => {
                                //     setIsZoom(true);
                                //     setPartnerImage(partner.img);
                                //   }}
                                className="img-fluid cursor-pointer"
                                alt=""
                                src={driver.img}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </Th>

                          <Td>{driver.name}</Td>
                          <Td>{driver.email}</Td>
                          <Td>{driver.phone}</Td>
                          <Td>
                            <ButtonWrapper>
                              <button
                                className="btn btn-info me-xl-3"
                                onClick={() =>
                                  handleEdit(driver.id, driver.partnerId)
                                }
                              >
                                <i className="fa fa-edit" />
                              </button>
                              <button
                                className="btn btn-success "
                                onClick={() =>
                                  history.push(`/driver/details/${driver.id}`)
                                }
                              >
                                <i className="fa fa-eye" />
                              </button>
                            </ButtonWrapper>
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
                    lisener={(page) => dispatch(allDrivers(true, page))}
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

export default DriversList;
