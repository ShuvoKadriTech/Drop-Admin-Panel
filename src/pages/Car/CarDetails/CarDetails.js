import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useHistory, useParams } from "react-router-dom";

const CarDetails = () => {

const {id} = useParams;


  return (
    <React.Fragment>
      <GlobalWrapper>

      <div className="page-content" >
        <Container fluid={true}>
            <h2>Car Details</h2>
        </Container>
      </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};





export default CarDetails;
