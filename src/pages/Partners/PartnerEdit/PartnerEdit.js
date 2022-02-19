import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";


const PartnerEdit = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>

      <div className="page-content" >
        <Container fluid={true}>
            <h2>Edit partner</h2>
        </Container>
      </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default PartnerEdit;