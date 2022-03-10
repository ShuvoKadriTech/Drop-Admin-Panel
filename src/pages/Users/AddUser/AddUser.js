import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const AddUser = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Users"
              breadcrumbItem="Add User"
              isRefresh={false}
              //   loading={loading}
              //   callList={callColorList}
            />
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  .heading {
    color: red;
  }
`;

export default AddUser;
