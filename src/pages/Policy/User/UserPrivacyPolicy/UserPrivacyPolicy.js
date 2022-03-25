import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import TextEditor from "../../../../components/TextEditor/TextEditor";

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

          <TextEditor title="User Privacy Policy" type="userPrivacyPolicy" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserPrivacyPolicy;
