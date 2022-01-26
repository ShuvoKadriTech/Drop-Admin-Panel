import React, { useState } from "react";
import { Col, Row, Table } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const CarTypes = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Wrapper>
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

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Wrapper>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  padding: 20px 0px;

  .top__wrapper {
    padding-bottom: 20px;
  }
`;

export default CarTypes;
