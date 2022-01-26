import React from "react";
import styled from "styled-components";
import GlobalWrapper from './../components/GlobalWrapper';

const BlankPage = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>

      <div className="page-content" >

      </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};


const Wrapper = styled.div`


.heading{
  color: red;
}


`

export default BlankPage;
