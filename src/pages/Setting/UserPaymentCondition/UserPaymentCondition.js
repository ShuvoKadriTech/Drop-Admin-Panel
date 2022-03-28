import React, { useState } from "react";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import GlobalWrapper from "../../../components/GlobalWrapper";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Spinner,
  Label,
  FormGroup,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUserPaymentCondition } from "../../../store/UserPaymentCondition/UserPaymentConditionAction";

const UserPaymentCondition = () => {
  const dispatch = useDispatch();

  const [minKilometer, setMinKilometer] = useState(0);
  const [maxKilometer, setMaxKilometer] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const submitConditon = () => {
    if (minKilometer == null || minKilometer == 0) {
      return toast.warn("Enter Min Kilometer ", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (maxKilometer == null || maxKilometer == 0) {
      return toast.warn("Enter Max Kilometer ", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (percentage == null || percentage == 0) {
      return toast.warn("Enter Percentage ", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    dispatch(
      addUserPaymentCondition({
        minKilometer,
        maxKilometer,
        percentage,
      })
    );
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb
              maintitle="Setting"
              breadcrumbItem="User Payment Condition"
              hideSettingBtn={true}
              // loading={loading}
              // callList={callColorList}
            />

            <Row>
              <Col xl={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">
                      Add User Payment Condition
                    </CardTitle>

                    <Row className="mb-3">
                      <Col xl={12} sm={12} md={12}>
                        <Input
                          value={minKilometer}
                          onChange={(event) => {
                            setMinKilometer(event.target.value);
                          }}
                          id="minKilometer"
                          className="form-control"
                          type="number"
                          placeholder="Enter minimum Kilometer"
                          required
                        />
                      </Col>

                      <Col xl={12} sm={12} md={12} className="my-4">
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={maxKilometer}
                          onChange={(event) => {
                            setMaxKilometer(event.target.value);
                          }}
                          id="maxKilometer"
                          className="form-control"
                          type="number"
                          placeholder="Enter a Max Kilometer"
                          required
                        />
                      </Col>

                      <Col xl={12} sm={12} md={12}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={percentage}
                          onChange={(event) => {
                            setPercentage(event.target.value);
                          }}
                          id="percentage"
                          className="form-control"
                          type="text"
                          placeholder="Enter Percentage"
                          required
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Button color="primary" onClick={submitConditon}>
                        {/* {colorId ? "Edit" : "Add"} */}
                        Add
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col xl={8}>
                <div className="table-rep-plugin">
                  <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                  >
                    <Card>
                      <CardBody>
                        <CardTitle className="h4"> Color List</CardTitle>

                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered table-hover text-center"
                        >
                          <Thead>
                            <Tr>
                              <Th>Serial No</Th>
                              <Th>Color Name</Th>
                              <Th>Color Code</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {/* {colors.map((color, index) => {
                              return (
                                <Tr
                                  key={index}
                                  className="align-middle"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500"
                                  }}
                                >
                                  <Th>
                                    {index + 1}
                                  </Th>
                                  <Td>
                                    {color.name}
                                  </Td>
                                  <Td style={{ color: `${color.colorCode}` }}>
                                    {color.colorCode}
                                  </Td>
                                  <Td>
                                    <button
                                      className="btn btn-info "
                                      onClick={() => handleEditColor(color.id)}
                                    >
                                      <i className="fa fa-edit" />
                                    </button>
                                  </Td>
                                </Tr>
                              );
                            })} */}
                          </Tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserPaymentCondition;
