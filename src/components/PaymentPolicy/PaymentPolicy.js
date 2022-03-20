import { Container } from "@mui/material";
import React from "react";
import GlobalWrapper from "../GlobalWrapper";

const PaymentPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <h2>Payment Policy</h2>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default PaymentPolicy;
