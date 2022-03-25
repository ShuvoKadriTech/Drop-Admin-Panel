import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "reactstrap";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import TextEditor from "../../../../components/TextEditor/TextEditor";
import requestApi from "./../../../../network/httpRequest";
import { GET_SINGLE_POLICY } from "./../../../../network/Api";

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

          <TextEditor
            title="Partner Privacy Policy"
            type="partnerPrivacyPolicy"
          />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default PartnerPrivacyPolicy;
