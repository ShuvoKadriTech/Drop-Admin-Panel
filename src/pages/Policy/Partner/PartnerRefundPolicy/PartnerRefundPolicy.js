import React from "react";
import { Container } from "reactstrap";
import GlobalWrapper from "../../../../components/GlobalWrapper";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import TextEditor from "../../../../components/TextEditor/TextEditor";

const PartnerRefundPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="Partner"
            breadcrumbItem="Refund Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <TextEditor
            title="Partner Refund Policy"
            type="partnerPaymentRefundPolicy"
          />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

export default PartnerRefundPolicy;
