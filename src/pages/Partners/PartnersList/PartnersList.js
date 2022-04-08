import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartners,
  updateSearchKey,
  updateStatusKey,
  updateCreatedByKey,
} from "../../../store/partner/partnerActions";
import AppPagination from "../../../components/AppPagination";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Lightbox from "react-image-lightbox";
import { useHistory } from "react-router-dom";

const PartnersList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const [partnerImage, setPartnerImage] = useState(null);

  const {
    loading,
    message,
    error,
    paging,
    hasNextPage,
    currentPage,
    hasPreviousPage,
    partners,
    searchKey,
    statusKey,
    createdByKey,
  } = useSelector((state) => state.partnerReducer);

  // useEffect(
  //   () => {
  //     callPartnerList();
  //   },
  //   []
  // );

  useEffect(() => {
    if (
      (searchKey && statusKey && createdByKey) ||
      (searchKey && statusKey) ||
      (searchKey && createdByKey) ||
      (statusKey && createdByKey) ||
      searchKey ||
      statusKey ||
      createdByKey
    ) {
      callPartnerList(true);
    } else {
      if (open) {
        callPartnerList(true);
      } else {
        callPartnerList();
      }
    }
  }, [searchKey, statusKey, createdByKey]);

  const callPartnerList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(getPartners(refresh));
  };

  const searchKeyListener = (value) => {
    setOpen(true);
    dispatch(updateSearchKey(value));
  };

  // DEBOUNCE SEARCH

  const debounce = (func, delay) => {
    // console.log("yes");
    let timer;
    return () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func();
      }, delay);
    };
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            maintitle="Partner"
            breadcrumbItem="List"
            hideSettingBtn={true}
            loading={loading}
            callList={callPartnerList}
            isAddNew={true}
            addNewRoute="partner/add"
          />

          {isZoom ? (
            <Lightbox
              mainSrc={partnerImage}
              enableZoom={true}
              onCloseRequest={() => {
                setIsZoom(!isZoom);
              }}
            />
          ) : null}

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
                        <MenuItem value={"all"}>
                          All
                        </MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"block"}>Block</MenuItem>
                        <MenuItem value={"permanent-block"}>
                          Permanent Block
                        </MenuItem>
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
                        placeholder="Find Partner by name or email or phone "
                        id="search"
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
                        Created By
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={createdByKey}
                        label="CreatedBy"
                        onChange={(event) =>
                          dispatch(updateCreatedByKey(event.target.value))
                        }
                      >
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"self"}>Self</MenuItem>
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
              <CardTitle className="h4"> Partner List</CardTitle>
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
                  {partners &&
                    partners.map((partner, index) => {
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
                                  setIsZoom(true);
                                  setPartnerImage(partner.img);
                                }}
                                className="img-fluid cursor-pointer"
                                alt=""
                                src={partner.img}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </Th>

                          <Td>{partner.name}</Td>
                          <Td>{partner.email}</Td>
                          <Td>{partner.phone}</Td>
                          <Td>
                            <ButtonWrapper>
                              <button
                                className="btn btn-info me-xl-3"
                                onClick={() =>
                                  history.push(`/partner/edit/${partner.id}`)
                                }
                              >
                                <i className="fa fa-edit" />
                              </button>
                              <button
                                className="btn btn-success "
                                onClick={() =>
                                  history.push(`/partner/details/${partner.id}`)
                                }
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
                  lisener={(page) => dispatch(getPartners(true, page))}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const SearchWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
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

export default PartnersList;
