import React from "react";
import GlobalWrapper from './../../../components/GlobalWrapper';
import { Container } from 'reactstrap';

const SellerAdd = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
              <h2>Seller Add</h2>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default SellerAdd;
