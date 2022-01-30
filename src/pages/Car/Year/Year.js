import React, { useEffect, useState } from "react";
import { Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Table,
  Spinner,
  Label,
  FormGroup
} from "reactstrap";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const Year = () => {
  const dispatch = useDispatch();

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
                          value={""}
                          id="color"
                          className="form-control"
                          type="text"
                          placeholder="Enter a Year"
                          defaultValue=""
                          required
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Button color="primary">
                        {"Add"}
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
                        <CardTitle className="h4"> Years</CardTitle>

                        {/* {loading &&
                          <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="info" />
                          </div>} */}
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

export default Year;
