import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,

} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getPartners, updateSearchKey,updateStatusKey } from "../../../store/partner/partnerActions";
import AppPagination from "../../../components/AppPagination";
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const PartnersList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { loading, message, error, paging, hasNextPage, currentPage, hasPreviousPage, partners, searchKey } = useSelector(
    state => state.partnerReducer
  );



  // useEffect(
  //   () => {
  //     callPartnerList();
  //   },
  //   []
  // );


  useEffect(() => {
    if (searchKey) {
      callPartnerList(true);
    } else {
      if (open) {
        callPartnerList(true);
      } else {
        callPartnerList();
      }

    }
  }, [searchKey]);

  const searchKeyListener = (value) => {

    setOpen(true)
    dispatch(updateSearchKey(value))

  }

  const callPartnerList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(getPartners(refresh));
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

          <Card>
            <CardBody>
              <Row>
                <Col md={3}>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                      onChange={event => dispatch(updateStatusKey(event.target.value))}
                      >
                        <MenuItem value={10} active>All</MenuItem>
                        <MenuItem value={20}>Pending</MenuItem>
                        <MenuItem value={30}>Block</MenuItem>
                        <MenuItem value={30}>Permanent Block</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Col>
                <Col md={6} className="d-flex align-items-center">
                  <SearchWrapper>


                    <div className="search__wrapper">
                      <i className='fa fa-search'></i>
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Find Partner by name or email or phone "
                        id="search"
                        value={searchKey}
                        onChange={event => searchKeyListener(event.target.value)}
                      />
                    </div>


                  </SearchWrapper>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Row className="mb-3">

                <Col md={3} className="text-end">

                </Col>
              </Row>
              <CardTitle className="h4"> Car List</CardTitle>
              <Table bordered hover responsive className="table__wrapper">
                <thead>
                  <tr className="header">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Min Seat</th>
                    <th>Max Seat</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table__data">
                  {partners.map((item, index) =>
                    <tr className="data" key={index}>
                      <td>
                        <img src={item.img} style={{ width: "75px" }} alt="" />
                      </td>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {item.email}
                      </td>
                      <td>
                        {item.phone}
                      </td>
                      <td className="btn__wrapper">
                        <button className="btn  btn-info  me-2">
                          <i className="fa fa-edit" />
                        </button>
                        <button className="btn btn-success ">
                          <i className="fa fa-eye" />
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Row>
            <Col xl={12} >
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


  .search__wrapper{

    padding: 7px 10px;
    display: flex;
    align-items: center;

    i{
      font-size: 15px;
      
    }
    input{
      border: none;
      color: black !important;
    }
  }

  

`

export default PartnersList;
