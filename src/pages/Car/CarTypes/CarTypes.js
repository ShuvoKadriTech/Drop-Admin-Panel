import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table
} from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCarTypes } from "../../../store/Car/carTypes/carTypesAction";

import Button from "@mui/material/Button";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { useHistory } from "react-router-dom";
import CarTypesReducer from "./../../../store/Car/carTypes/carTypesReducer";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const CarTypes = () => {
  const dispatch = useDispatch();
  const { loading, carTypes, error, message } = useSelector(
    state => state.CarTypesReducer
  );

  const history = useHistory();

  // const [open, setOpen] = React.useState(false);
  const [typeId, setTypeId] = useState(null);

  // const closeDialog = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    // console.log(carTypes);
    dispatch(getCarTypes());
  }, []);

  // CAR TYPE DELETE EVENT

  // const handleDeleteType = id => {
  //   setOpen(true);
  //   setTypeId(id);
  // };

  // CAR TYPE EDIT EVENT

  const handleEdit = id => {
    history.push(`/edit-car-type/${id}`);
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Wrapper>
            <Row className="top__wrapper">
              <Col lg={6} md={6}>
                <Breadcrumbs
                  maintitle="Car"
                  breadcrumbItem="Car Types"
                  hideSettingBtn={true}
                />
              </Col>
            </Row>

            <Card>
              <CardBody>
                <CardTitle className="h4"> Car List</CardTitle>
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
                    {carTypes.map((type, index) =>
                      <tr className="data" key={index}>
                        <td>
                          <img
                            src={type.image}
                            style={{ width: "75px" }}
                            alt="image"
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
                        <td className="btn__wrapper">
                          <button
                            className="btn btn-info "
                            onClick={() => handleEdit(type.id)}
                          >
                            <i className="fa fa-edit" />
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {loading &&
                  <div className="loading__wrapper">
                    <Spinner animation="border" variant="info" />
                  </div>}

                {/* Confirm Dialog */}
                {/* <ConfirmDialog
                  isOpen={open}
                  title="Delete!"
                  closeDialog={closeDialog}
                  typeId={typeId}
                  dispatchFunc={deleteCarType}
                  error={error}
                  message={message}
                  content="Are You Sure You Want To Delete This Car Type?"
                /> */}
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
    .add__btn {
      height: 50px;
      align-self: center;
    }
  }

  .loading__wrapper {
    position: absolute;
    top: 30%;
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

          &.btn__wrapper {
            .btn {
              width: 30px;
              height: 30px;
              padding: 6px 0px;
              border-radius: 15px;
              text-align: center;
              font-size: 12px;
              line-height: 1.42857;
            }
          }
        }
      }
    }
  }
`;

export default CarTypes;
