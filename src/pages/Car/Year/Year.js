import React, { useEffect, useState } from "react";
import { Tbody, Td, Th, Thead, Tr, Table } from "react-super-responsive-table";
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
  FormGroup
} from "reactstrap";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { toast } from 'react-toastify';
import { addYear, editYear, getAllYears } from "../../../store/Car/year/yearActions";
import moment from 'moment';
import styled from 'styled-components';

const Year = () => {


  const dispatch = useDispatch();
  const { loading, years, message, error } = useSelector(state => state.yearReducer)

  const [year, setYear] = useState("");
  const [yearId, setYearId] = useState(null);

  const handleSubmit = () => {
    if (year == null || year == "") {
      return toast.warn("Enter a Year ", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

    try {
      if (yearId) {
        dispatch(editYear(yearId, year))
      }
      else {
        dispatch(addYear(year))
      }
    } catch (error) {
      return toast.warn(error, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }

  useEffect(() => {
    dispatch(getAllYears())
  }, [])

  // EDIT YEAR EVENT 

  const handleEditYear = (id) => {
    if (id) {
      setYearId(id);
      const { year } = years.find(year => year.id === id);
      setYear(year);
      window.scroll(0, 0);
    }
  }

  useEffect(() => {

    if (message) {
      setYear("");
      setYearId(null)
      dispatch(getAllYears());
      return toast.warn(message, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
    if (error) {
      return toast.warn(error, {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }

  }, [message || error])

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Car"
              breadcrumbItem="Year"
              hideSettingBtn={true}
            />
            <Row>
              <Col xl={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Year</CardTitle>

                    <Row className="mb-3">
                      <Col xl={12} sm={12} md={12}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={year}
                          onChange={event => setYear(event.target.value)}
                          className="form-control"
                          type="number"
                          placeholder="Enter a Year"
                          required
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Button color="primary" onClick={handleSubmit}>
                        {yearId ? "Edit" : "Add"}
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
                    <CardWrapper>
                      <Card>
                        <CardBody>
                          <CardTitle className="h4"> Years</CardTitle>

                          <Table
                            id="tech-companies-1"
                            className="table table-striped table-bordered table-hover text-center"
                          >
                            <Thead>
                              <Tr>
                                <Th>Serial No</Th>
                                <Th >Year</Th>
                                <Th >Created At</Th>
                                <Th >Action</Th>

                              </Tr>
                            </Thead>
                            <Tbody>
                              {years.map((item, index) => {
                                return (
                                  <Tr key={index} className="align-middle" style={{ fontSize: '15px', fontWeight: '500' }}>
                                    <Th>
                                      {index + 1}
                                    </Th>
                                    <Td>{item.year}</Td>
                                    <Td>{moment(item.createdAt)
                                      .utc()
                                      .format("YYYY-MM-DD hh:mm:ss")}</Td>
                                    <Td>
                                      <button
                                        className="btn btn-info "
                                        onClick={() => handleEditYear(item.id)}
                                      >
                                        <i className="fa fa-edit" />
                                      </button>
                                    </Td>


                                  </Tr>
                                );
                              })}


                            </Tbody>
                          </Table>

                          {loading &&
                            <div className=" spinner">
                              <Spinner animation="border" variant="info" />
                            </div>}
                        </CardBody>
                      </Card>
                    </CardWrapper>
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

const CardWrapper = styled.div`

  position: relative;

  .spinner{
    position: absolute;
    top: 50%;
    left: 50%;
  }

`


export default Year;
