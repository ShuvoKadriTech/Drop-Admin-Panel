import React, { useEffect, useState } from "react";
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
import {
  addColor,
  editColor,
  getAllColors
} from "../../../store/Car/color/colorActions";
import { toast } from "react-toastify";
import { ADD_COLOR } from "../../../network/Api";
import requestApi from "../../../network/httpRequest";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import ColorPicker from "@vtaits/react-color-picker";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const Color = () => {
  const dispatch = useDispatch();

  const { loading, message, error, colors } = useSelector(
    state => state.colorReducers
  );

  const [colorName, setColorName] = useState("");
  const [simple_color1, setsimple_color1] = useState(0);
  const [colorRgb, setcolorRgb] = useState("red");
  const [colorId, setColorId] = useState(null);

  // Add Color
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
    if (!colorRgb || colorRgb == null) {
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
        colorCode: colorRgb
      };
      // console.log(newColor);
      if (colorId) {
        dispatch(editColor(colorId, newColor));
      } else {
        dispatch(addColor(newColor));
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
        setcolorRgb("red");
        setColorId(null);
        dispatch(getAllColors());
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
      if (error) {

        return toast.success(error, {
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
    [message || error]
  );

  const onDragRgb = c1 => {
    setcolorRgb(c1);
  };

  // HANDLE EDIT COLOR

  const handleEditColor = colorId => {
    if (colorId) {
      setColorId(colorId);
      const { name, colorCode } = colors.find(color => color.id == colorId);
      setColorName(name);
      setcolorRgb(colorCode);
      window.scrollTo(0, 0);
    }
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Car"
              breadcrumbItem="Color"
              hideSettingBtn={true}
            />
            <Row>
              <Col xl={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Add Color</CardTitle>

                    <Row className="mb-3">
                      <Col xl={12} sm={12} md={12}>
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
                          required
                        />
                      </Col>
                      <Col xl={12} lg={12} sm={12} md={12} className="mt-3">
                        <FormGroup className="m-b-0">
                          <div
                            className="input-group colorpicker-default"
                            title="Using format option"
                          >
                            <input
                              readOnly
                              value={colorRgb}
                              type="text"
                              className="form-control input-lg"
                            />
                            <span className="input-group-append">
                              <span
                                className="input-group-text colorpicker-input-addon"
                                onClick={() => {
                                  setsimple_color1(!simple_color1);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <i
                                  style={{
                                    height: "16px",
                                    width: "16px",
                                    background: colorRgb
                                  }}
                                />
                              </span>
                            </span>
                          </div>

                          {simple_color1
                            ? <ColorPicker
                              saturationHeight={100}
                              saturationWidth={100}
                              value={colorRgb}
                              onDrag={onDragRgb}
                            />
                            : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Button color="primary" onClick={handleAddColor}>
                        {colorId ? "Edit" : "Add"}
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
                              <Th >Color Name</Th>
                              <Th >Color Code</Th>
                              <Th >Action</Th>

                            </Tr>
                          </Thead>
                          <Tbody>
                            {colors.map((color, index) => {
                              return (
                                <Tr key={index} className="align-middle" style={{ fontSize: '15px', fontWeight: '500' }}>
                                  <Th>
                                    {index + 1}
                                  </Th>
                                  <Td>{color.name}</Td>
                                  <Td style={{ color: `${color.colorCode}` }}>{color.colorCode}</Td>
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
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default Color;
