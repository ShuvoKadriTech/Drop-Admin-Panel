import React from "react";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Container } from "reactstrap";
import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";

const UserPrivacyPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="User"
            breadcrumbItem="Privacy Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <PrivacyPolicy title="User" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserPrivacyPolicy;
