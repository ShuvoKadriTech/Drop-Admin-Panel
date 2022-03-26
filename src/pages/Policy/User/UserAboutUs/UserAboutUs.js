import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TextEditor from "../../../../components/TextEditor/TextEditor";

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
          <TextEditor title="Partner About Us" type="userAppAboutUs" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserAboutUs;
