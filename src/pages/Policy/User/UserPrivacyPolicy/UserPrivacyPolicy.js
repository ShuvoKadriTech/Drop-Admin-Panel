import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import PrivacyPolicy from "../../../../components/PrivacyPolicy/PrivacyPolicy";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import Breadcrumb from "../../../../components/Common/Breadcrumb";

const UserPrivacyPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumb
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
