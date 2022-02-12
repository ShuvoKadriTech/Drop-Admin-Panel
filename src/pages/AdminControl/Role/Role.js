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
  FormGroup,
  Form
} from "reactstrap";

import GlobalWrapper from "../../../components/GlobalWrapper";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Select from "react-select";
import {
  addAdmin,
  deleteRole,
  editRole,
  getAllRoles
} from "../../../store/AdminControl/Role/roleAction";
import SweetAlert from "react-bootstrap-sweetalert";

const Role = () => {
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [activeStatus, setActiveStatus] = useState(0);
  const [confirm_alert, setconfirm_alert] = useState(false);
  const [success_dlg, setsuccess_dlg] = useState(false);
  const [dynamic_title, setdynamic_title] = useState("");
  const [dynamic_description, setdynamic_description] = useState("");

  const dispatch = useDispatch();

  const { loading, roles, message, error } = useSelector(
    state => state.roleReducer
  );

  const options = [
    { label: "Active", value: 1 },
    { label: "Deactive", value: 2 }
  ];

  //   SUBMIT DATA

  const handleSubmit = () => {
    if (!role || role == "") {
      return toast.warn("Enter a Role Name ", {
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

    if (roleId) {
      dispatch(
        editRole({
          id: roleId,
          name: role,
          status: activeStatus
        })
      );
    }

    if (!roleId) {
      dispatch(addAdmin({ name: role }));
    }
  };

  useEffect(() => {
    // console.log(carTypes);

    callRoleList();
  }, []);

  const callRoleList = (refresh = false) => {
    dispatch(getAllRoles(refresh));
  };

  // EDIT ROLE

  const handleEdit = id => {
    if (id) {
      setRoleId(id);
      const { status, name } = roles.find(role => role.id === id);
      setRole(name);
      setActiveStatus(status);
      console.log(role, activeStatus);
      window.scrollTo(0, 0);
    }
  };

  useEffect(
    () => {
      if (message) {
        setRole("");
        setActiveStatus(0);
        setRoleId(null);
        toast.warn(message, {
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
        toast.warn(error, {
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
    [message, error]
  );

  const handleDelete = () => {
    // console.log(roleId);
    dispatch(deleteRole(roleId));
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid>
            {success_dlg
              ? <SweetAlert
                  success
                  title={dynamic_title}
                  onConfirm={() => {
                    setsuccess_dlg(false);
                  }}
                >
                  {dynamic_description}
                </SweetAlert>
              : null}

            <Breadcrumbs
              maintitle="Admin Controls"
              breadcrumbItem="Role"
              loading={loading}
              callList={callRoleList}
            />
            <Row>
              <Col xl={4}>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Add Role</CardTitle>

                    <Row className="mb-3">
                      <Col xl={12} sm={12} md={12}>
                        <Input
                          // style={{ border: '1px solid red' }}
                          id="role"
                          value={role}
                          className="form-control"
                          type="text"
                          placeholder="Enter a Role Name"
                          onChange={event => setRole(event.target.value)}
                          required
                        />
                      </Col>

                      {roleId &&
                        <Col xl={12} sm={12} md={12} className="mt-3">
                          <select
                            style={{
                              width: "100%",
                              border: "1px solid lightgray",
                              padding: "8px 0px",
                              borderRadius: "6px"
                            }}
                            value={activeStatus}
                            onChange={event =>
                              setActiveStatus(event.target.value)}
                          >
                            {options.map((option, index) =>
                              <option value={option.value} key={index}>
                                {option.label}
                              </option>
                            )}
                          </select>
                        </Col>}
                    </Row>

                    <Row>
                      <Button color="primary" onClick={handleSubmit}>
                        {roleId ? "Edit" : "Add"}
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
                        <CardTitle className="h4"> Admin Role List</CardTitle>

                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered table-hover text-center"
                        >
                          <Thead>
                            <Tr>
                              <Th>Serial No</Th>
                              <Th>Role Name</Th>
                              <Th>Created at</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {roles.map((role, index) => {
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
                                    {role.name}
                                  </Td>
                                  <Td>
                                    {role.createdAt.toLocaleString()}
                                  </Td>
                                  <Td>
                                    <button
                                      className="btn btn-info "
                                      onClick={() => handleEdit(role.id)}
                                    >
                                      <i className="fa fa-edit" />
                                    </button>
                                    <button
                                      className="btn btn-danger "
                                      // onClick={() => handleDelete(item.id)}
                                      onClick={() => {
                                        setconfirm_alert(true);
                                        setRoleId(role.id);
                                      }}
                                    >
                                      <i className="fa fa-trash" />
                                    </button>
                                    {confirm_alert
                                      ? <SweetAlert
                                          title="Are you sure?"
                                          warning
                                          showCancel
                                          confirmButtonText="Yes, delete it!"
                                          confirmBtnBsStyle="success"
                                          cancelBtnBsStyle="danger"
                                          onConfirm={() => {
                                            handleDelete();
                                            setconfirm_alert(false);
                                            setsuccess_dlg(true);
                                            setdynamic_title("Deleted");
                                            setdynamic_description(
                                              "Your file has been deleted."
                                            );
                                          }}
                                          onCancel={() =>
                                            setconfirm_alert(false)}
                                        >
                                          You won't be able to revert this!
                                        </SweetAlert>
                                      : null}
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

export default Role;
