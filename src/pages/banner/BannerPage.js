import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBannerListAction } from "../../store/banner/bannerAction";
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
import SweetAlert from "react-bootstrap-sweetalert";

const BannerPage = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState(1);
  const [status, setStatus] = useState(1);
  const [sortBy, setSortBy] = useState("DESC");
  const [confirm_alert, setconfirm_alert] = useState(false);
  const [success_dlg, setsuccess_dlg] = useState(false);
  const [dynamic_title, setdynamic_title] = useState("");
  const [dynamic_description, setdynamic_description] = useState("");
  const [bannerId, setBannerId] = useState(null);

  const route = useHistory();

  const [viewStyle, setViewStyle] = useState(
    localStorage.getItem("bannerView")
      ? localStorage.getItem("bannerView")
      : "list"
  );

  // useEffect(() => { }, []);

  const { loading, message, list, error } = useSelector(state => state.bannerReducer)

  useEffect(
    () => {
      // dispatch(getBannerListAction({ type: type, status: status, sortBy: sortBy }))
      dispatch(
        getBannerListAction({ type: type, status: status, sortBy: sortBy })
      );
    },
    [type, status, sortBy]
  );

  const handleEdit = () => {
    console.log(bannerId);
  };

  // DELETE BANNER

  const handleDelete = id => {
    // console.log(bannerId)
    dispatch(deleteBanner(bannerId))

  };


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
                          <Td>
                            <button
                              className="btn btn-info "
                              onClick={() => handleEdit(item.id)}
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <button
                              className="btn btn-danger "
                              // onClick={() => handleDelete(item.id)}
                              onClick={() => {
                                setconfirm_alert(true);
                                setBannerId(item.id)
                              }}
                            >
                              <i className="fa fa-trash" />
                            </button>
                            {confirm_alert
                              ? <SweetAlert
                                title="Are you sure?"
                                warning
                                showCancel
                                confirmButtonText="Yes, delete it!"
                                confirmBtnBsStyle="success"
                                cancelBtnBsStyle="danger"
                                onConfirm={() => {
                                  handleDelete();
                                  setconfirm_alert(false);
                                  setsuccess_dlg(true);
                                  setdynamic_title("Deleted");
                                  setdynamic_description("Your file has been deleted.");

                                }}
                                onCancel={() => setconfirm_alert(false)}
                              >
                                You won't be able to revert this!
                              </SweetAlert>
                              : null}
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
          {success_dlg
            ? <SweetAlert
              success
              title={dynamic_title}
              onConfirm={() => {
                setsuccess_dlg(false);
              }}
            >
              {dynamic_description}
            </SweetAlert>
            : null}
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
