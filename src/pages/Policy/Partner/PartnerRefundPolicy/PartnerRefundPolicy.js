import React from 'react'
import { Container } from 'reactstrap'
import GlobalWrapper from '../../../../components/GlobalWrapper'
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import RefundPolicy from '../../../../components/RefundPolicy/RefundPolicy';

const PartnerRefundPolicy = () => {
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

          <RefundPolicy title="Partner" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default PartnerRefundPolicy