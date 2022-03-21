import React from 'react'
import { Container } from 'reactstrap';
import GlobalWrapper from '../../../../components/GlobalWrapper';
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import CancellationPolicy from '../../../../components/CancellationPolicy/CancellationPolicy';


const PartnerCancellationPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="Partner"
            breadcrumbItem="Cancellation Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <CancellationPolicy title="Partner" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default PartnerCancellationPolicy;
