import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../components/GlobalWrapper";

const DeliverymanAdd = () => {
  return (
    <div>
      <React.Fragment>
        <GlobalWrapper>
          <div className="page-content">
            <Container fluid={true}>
                <h2>Add</h2>
            </Container>
          </div>
        </GlobalWrapper>
      </React.Fragment>
    </div>
  );
};

export default DeliverymanAdd;
