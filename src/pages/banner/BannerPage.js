import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannerListAction } from "../../store/banner/bannerAction";
import {
  Button,
  Input,
  Col,
  Container,
  Row,
  Spinner,
  CardBody,
  Card,
  CardTitle
} from "reactstrap";
import BreadcrumbsBanner from "./BreadcrumbsBanner";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import moment from "moment";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";

const BannerPage = () => {
  const dispatch = useDispatch();
  const { loading, list } = useSelector(state => state.bannerReducer);
  const [type, setType] = useState(1);
  const [status, setStatus] = useState(1);
  const [sortBy, setSortBy] = useState("DESC");
  const route = useHistory();

  const [viewStyle, setViewStyle] = useState(
    localStorage.getItem("bannerView")
      ? localStorage.getItem("bannerView")
      : "list"
  );

  useEffect(() => {}, []);

  useEffect(
    () => {
      // dispatch(getBannerListAction({ type: type, status: status, sortBy: sortBy }))
      dispatch(
        getBannerListAction({ type: type, status: status, sortBy: sortBy })
      );
    },
    [type, status, sortBy]
  );

  const listViewBanner = () => {
    return (
      <Col xl={12}>
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Card>
              <CardBody>
                <CardTitle className="h4"> Banner List</CardTitle>
                <Table
                  id="tech-companies-1"
                  className="table table-striped table-bordered"
                >
                  <Thead>
                    <Tr>
                      <Th>Serial No</Th>
                      <Th data-priority="1">title</Th>
                      <Th data-priority="1">Images</Th>
                      <Th data-priority="3">Created At</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {list.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Th>
                            {index + 1}
                          </Th>
                          <Td>
                            {item.title}
                          </Td>
                          <Td>
                            <img src={item.image} style={{ width: "100px" }} />
                          </Td>
                          <Td>
                            {moment(item.createdAt)
                              .utc()
                              .format("YYYY-MM-DD hh:mm:ss")}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>

                {loading &&
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="info" />
                  </div>}
              </CardBody>
            </Card>
          </div>
        </div>
      </Col>
    );
  };

  const girdViewBanner = () => {
    return (
      <Col xl={12}>
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Card>
              <CardBody>
                <CardTitle className="h4"> Banner List</CardTitle>

                <Row>
                  {list.map((item, index) => {
                    return (
                      <Col key={index} xl={4} md={6} sm={12} key={index}>
                        <Card>
                          <img
                            src={item.image}
                            className="img-thumbnail"
                            style={{ width: "100%" }}
                          />
                          <h4>
                            {item.title}
                          </h4>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>

                {loading &&
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="info" />
                  </div>}
              </CardBody>
            </Card>
          </div>
        </div>
      </Col>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <BreadcrumbsBanner
              maintitle="Banner"
              breadcrumbItem="Banner list"
              lisener={vStyle => {
                setViewStyle(vStyle);
              }}
            />
            <Row xl={12} className="d-flex justify-content-between">
              <Col sx={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={e => setType(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <MenuItem value={1}>User</MenuItem>
                  <MenuItem value={2}>Partner</MenuItem>
                </Select>
              </Col>
              <Col sx={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Type"
                  onChange={e => setStatus(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={2}>DeActive</MenuItem>
                </Select>
              </Col>

              <Col sx={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">SortBy</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  label="Type"
                  onChange={e => setSortBy(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="ASC">ASC</MenuItem>
                  <MenuItem value="DESC">DESC</MenuItem>
                </Select>
              </Col>
            </Row>

            {viewStyle == "list" ? listViewBanner() : girdViewBanner()}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BannerPage;
