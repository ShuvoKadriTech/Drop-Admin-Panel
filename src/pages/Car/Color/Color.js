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
  Spinner
} from "reactstrap";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { addColor, getAllColors } from "../../../store/color/colorActions";
import { toast } from "react-toastify";
import { ADD_COLOR } from "../../../network/Api";
import requestApi from "../../../network/httpRequest";
import styled from "styled-components";

const Color = () => {
  const dispatch = useDispatch();

  const { loading, message, error, colors } = useSelector(
    state => state.colorReducers
  );

  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");

  const handleAddColor = async () => {
    if (!colorName || colorName == "") {
      return toast.warn("Enter a Color Name ", {
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
    if (!colorCode || colorCode == "") {
      return toast.warn("Enter This Color Code ", {
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
      const newColor = {
        name: colorName,
        colorCode: colorCode
      };
      dispatch(addColor(newColor));
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

    // dispatch(addColor(data));
  };

  useEffect(() => {
    dispatch(getAllColors());
  }, []);

  useEffect(
    () => {
      if (message) {
        // color.value = ''
        setColorName("");
        setColorCode("");
        return toast.success(message, {
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
    },
    [message]
  );

  useEffect(
    () => {
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
    },
    [error]
  );

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col xl={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Add Color</CardTitle>

                    <Row className="mb-3">
                      <Col xl={6} sm={12} md={6}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          value={colorName}
                          onChange={event => {
                            setColorName(event.target.value);
                          }}
                          id="color"
                          className="form-control"
                          type="text"
                          placeholder="Enter a Color Name"
                          defaultValue={colorName}
                          required
                        />
                      </Col>
                      <Col xl={6} sm={12} md={6}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          onChange={event => {
                            setColorCode(event.target.value);
                          }}
                          className="form-control"
                          type="text"
                          placeholder="Enter This Color Code"
                          defaultValue={colorCode}
                          value={colorCode}
                          required
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Button color="primary" onClick={handleAddColor}>
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
                        <CardTitle className="h4"> Folder List</CardTitle>
                        <Table
                          bordered
                          hover
                          responsive
                          className="table__wrapper"
                        >
                          <thead>
                            <tr className="header">
                              <th>Serial No</th>
                              <th>Name</th>
                              <th>Color Code</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="table__data">
                            {colors.map((color, index) =>
                              <tr className="data text-center">
                                <td>
                                  {index + 1}
                                </td>
                                <td>
                                  {color.name}
                                </td>
                                <td>
                                  {color.colorCode}
                                </td>
                                <td className="btn__wrapper">
                                  <button className="btn btn-info ">
                                    <i class="fa fa-edit" />
                                  </button>
                                </td>
                              </tr>
                            )}
                          </tbody>
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
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default Color;
