import React from "react";
import { Container } from "reactstrap";
import Breadcrumb from "../../../../components/Common/Breadcrumb";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import TextEditor from "../../../../components/TextEditor/TextEditor";

const UserRefundPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumb
            maintitle="User"
            breadcrumbItem="Refund Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <TextEditor
            title="User Refund Policy"
            type="userPaymentRefundPolicy"
          />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserRefundPolicy;
