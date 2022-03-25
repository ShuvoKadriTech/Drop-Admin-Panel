import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../../components/GlobalWrapper";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TextEditor from "../../../../components/TextEditor/TextEditor";

const UserPaymentPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="User"
            breadcrumbItem="Payment Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <TextEditor title="User Payment Policy" type="userPaymentPolicy" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserPaymentPolicy;
