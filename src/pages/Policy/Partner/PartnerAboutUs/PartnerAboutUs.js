import React from 'react'
import { Container } from 'reactstrap'
import GlobalWrapper from '../../../../components/GlobalWrapper';
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import AboutUs from '../../../../components/AboutUs/AboutUs';
const PartnerAboutUs = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="Partner"
            breadcrumbItem="About Us"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <AboutUs title="Partner" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default PartnerAboutUs