import React from "react";
import { Container } from "reactstrap";

import GlobalWrapper from "../../../../components/GlobalWrapper";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TextEditor from "../../../../components/TextEditor/TextEditor";

const UserCancellationPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="User"
            breadcrumbItem="Ride Cancellation Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <TextEditor
            title="User Ride Cancellation Policy"
            type="userRideCancellationPolicy"
          />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default UserCancellationPolicy;
