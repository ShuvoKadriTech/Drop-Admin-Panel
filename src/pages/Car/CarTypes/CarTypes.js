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

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import carTypesReducer from "./../../../store/Car/carTypes/carTypesReducer";

const CarTypes = () => {
  const dispatch = useDispatch();
  const { loading, carTypes, error, message } = useSelector(
    state => state.carTypesReducer
  );

  const history = useHistory();

  // const [open, setOpen] = React.useState(false);
  const [typeId, setTypeId] = useState(null);

  useEffect(() => {
    // console.log(carTypes);

    callCarList();
  }, []);

  const callCarList = (refresh = false) => {
    dispatch(getCarTypes(refresh));
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Wrapper>
            <Row className="top__wrapper">
              <Col lg={12}>
                <Breadcrumbs
                  maintitle="Car"
                  breadcrumbItem="Car Types"
                  hideSettingBtn={true}
                  loading={loading}
                  callList={callCarList}
                  isRefresh={true}
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
                            alt=""
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
                            onClick={() =>
                              history.push(`/car-type/edit/${type.id}`)}
                          >
                            <i className="fa fa-edit" />
                          </button>
                          <button
                            className="btn btn-info "
                            onClick={() => history.push(`/car-type/${type.id}`)}
                          >
                            <i className="fa fa-eye" />
                          </button>
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
