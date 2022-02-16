import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getPartners } from "../../../store/partner/partnerActions";
const PartnersList = () => {
  const dispatch = useDispatch();

  const { loading, message, error, partners } = useSelector(
    state => state.partnerReducer
  );

  const [searchKey, setSearchKey] = useState("");

  useEffect(
    () => {
      callPartnerList();
    },
    [searchKey]
  );

  const callPartnerList = (refresh = false) => {
    // console.log(searchKey);
    dispatch(getPartners(refresh, searchKey));
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
          />

          <Card>
            <CardBody>
              <Row className="mb-3">
                <Col md={3} className="text-end">
                  <label
                    htmlFor="example-search-input"
                    className="col-form-label"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Search
                  </label>
                </Col>
                <Col md={6} className="">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Find Partner by name or email or phone "
                    style={{ borderRadius: "15px" }}
                    id="search"
                    value={searchKey}
                    onChange={event => setSearchKey(event.target.value)}
                  />
                </Col>
                <Col md={3} className="text-end">
                  <Button>Add New</Button>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PartnersList;
