import React from 'react'
import { Container } from 'reactstrap';
import GlobalWrapper from '../../../../components/GlobalWrapper';
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import PaymentPolicy from '../../../../components/PaymentPolicy/PaymentPolicy';
 const PartnerPaymentPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="Partner"
            breadcrumbItem="Payment Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <PaymentPolicy title="Partner" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default PartnerPaymentPolicy;
