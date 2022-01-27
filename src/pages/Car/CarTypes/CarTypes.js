import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCarTypes } from "../../../store/carTypes/carTypesAction";
import { CircularProgress } from "@mui/material";

const CarTypes = () => {
  const dispatch = useDispatch();
  const { loading, carTypes, error } = useSelector(
    state => state.carTypesReducer
  );

  useEffect(() => {
    // console.log(carTypes);
    dispatch(getCarTypes());
  }, []);

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Wrapper>
            {loading &&
              <div class="loading__wrapper">
                <CircularProgress />
              </div>}
            <Row className="top__wrapper">
              <Col lg={6} md={6}>
                <h3>Car Types</h3>
              </Col>
              <Col lg={6} md={6} className="d-flex justify-content-end">
                <Button
                  variant="contained"
                  color="primary"
                  className="btn btn-success"
                  component={Link}
                  to="/add-car-type"
                >
                  Add New
                </Button>
              </Col>
            </Row>

            <Card>
              <CardBody>
                <CardTitle className="h4"> Banner List</CardTitle>
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
                    {carTypes.map(type =>
                      <tr className="data">
                        <td>
                          <img
                            src={type.image}
                            style={{ width: "75px" }}
                            alt="Image"
                          />
                        </td>
                        <td>
                          {type.name}
                        </td>
                        <td>
                          {type.minSeat}
                        </td>
                        <td>
                          {type.maxSeat}
                        </td>
                        <td>
                          <Button>Delete</Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Wrapper>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 20px 0px;
  position: relative;
  .top__wrapper {
    padding-bottom: 20px;
  }

  .loading__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .table__wrapper {
    .table__data {
      .header {
        th {
          text-align: center;
          font-size: 20px;
          font-weight: 500;
        }
      }
      .data {
        cursor: pointer;

        td {
          text-align: center;
          font-size: 17px;
          font-weight: 500;
          vertical-align: middle;
        }
      }
    }
  }
`;

export default CarTypes;
