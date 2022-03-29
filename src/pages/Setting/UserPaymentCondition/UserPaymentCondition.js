import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addUserPaymentCondition,
  getAllPaymentConditions,
  editPaymentCondition
} from "../../../store/UserPaymentCondition/UserPaymentConditionAction";


const UserPaymentCondition = () => {
  const dispatch = useDispatch();

  const { loading, userPaymentConditions, status } = useSelector(
    (state) => state.userPaymentConditionReducer
  );

  const [minKilometer, setMinKilometer] = useState("");
  const [maxKilometer, setMaxKilometer] = useState("");
  const [percentage, setPercentage] = useState("");
  const [conditionId, setConditionId] = useState(null);

  const submitConditon = () => {
    if (minKilometer == null || minKilometer == "") {
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
    if (maxKilometer == null || maxKilometer == "") {
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
    if (percentage == null || percentage == "") {
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

    if(conditionId){
      dispatch(editPaymentCondition({
        id: conditionId,
        minKilometer,
        maxKilometer,
        percentage,
      }))
    }else{
      dispatch(
        addUserPaymentCondition({
          minKilometer,
          maxKilometer,
          percentage,
        })
      );
    }

    
  };

  useEffect(() => {
    if (status) {
      setMinKilometer("");
      setMaxKilometer("");
      setPercentage("");
      setConditionId(null)
        }
  }, [status]);

  // GET ALL CONDITIONS

  useEffect(() => {
    callConditionsList();
  }, []);

  const callConditionsList = (refresh = false) => {
    dispatch(getAllPaymentConditions(refresh));
  };

  // EDIT CONDITON EVENT

  const handleEditCondition = (id) => {
    const find = userPaymentConditions.find((item) => item.id == id);
    const { maxKilometer, minKilometer, percentage } = find;
    setMinKilometer(minKilometer.toString());
    setMaxKilometer(maxKilometer.toString());
    setPercentage(percentage.toString());
    setConditionId(id);
   
    window.scroll(0, 0);
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
              loading={loading}
              callList={callConditionsList}
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
                        <span>Min Kilometer</span>
                        <Input
                          value={minKilometer}
                          onChange={(event) => {
                            setMinKilometer(event.target.value);
                          }}
                          id="minKilometer"
                          className="form-control"
                          type="text"
                          placeholder="Enter minimum Kilometer"
                          required
                        />
                      </Col>

                      <Col xl={12} sm={12} md={12} className="my-4">
                        <span>Max Kilometer</span>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={maxKilometer}
                          onChange={(event) => {
                            setMaxKilometer(event.target.value);
                          }}
                          id="maxKilometer"
                          className="form-control"
                          type="text"
                          placeholder="Enter a Max Kilometer"
                          required
                        />
                      </Col>

                      <Col xl={12} sm={12} md={12}>
                        <span>Percentage</span>
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
                        {loading ? (
                          <Spinner animation="border" size="sm" variant="info" />
                        ) : conditionId ? (
                          "Edit"
                        ) : (
                          "Add"
                        )}
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
                        <CardTitle className="h4"> Payment Condition List</CardTitle>

                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered table-hover text-center"
                        >
                          <Thead>
                            <Tr>
                              <Th>Serial No</Th>
                              <Th>Min KM</Th>
                              <Th>Max KM</Th>
                              <Th>Percentage</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {userPaymentConditions &&
                              userPaymentConditions.map((item, index) => {
                                return (
                                  <Tr
                                    key={index}
                                    className="align-middle"
                                    style={{
                                      fontSize: "15px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    <Th>{index + 1}</Th>
                                    <Td>{item.minKilometer}</Td>
                                    <Td>{item.maxKilometer}</Td>
                                    <Td>{item.percentage}</Td>
                                    <Td>
                                      <button
                                        className="btn btn-info "
                                        onClick={() =>
                                          handleEditCondition(item.id)
                                        }
                                      >
                                        <i className="fa fa-edit" />
                                      </button>
                                    </Td>
                                  </Tr>
                                );
                              })}
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
