import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../components/GlobalWrapper";
import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const PartnerPrivacyPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="Partner"
            breadcrumbItem="Privacy Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <PrivacyPolicy title="Partner" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default PartnerPrivacyPolicy;
