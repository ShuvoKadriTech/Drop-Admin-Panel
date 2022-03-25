import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const UserAboutUs = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="User"
            breadcrumbItem="About Us"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          {/* <AboutUs title="User" /> */}
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserAboutUs;
