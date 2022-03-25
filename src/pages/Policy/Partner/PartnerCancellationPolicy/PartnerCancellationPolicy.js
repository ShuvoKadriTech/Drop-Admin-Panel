import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TextEditor from "../../../../components/TextEditor/TextEditor";

const PartnerCancellationPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="Partner"
            breadcrumbItem="Ride Cancellation Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <TextEditor
            title="Partner Ride Cancellation Policy"
            type="partnerRideCancellationPolicy"
          />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default PartnerCancellationPolicy;
