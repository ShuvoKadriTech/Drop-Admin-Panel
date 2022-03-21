import React from 'react'
import { Container } from 'reactstrap'
import CancellationPolicy from '../../../../components/CancellationPolicy/CancellationPolicy';
import GlobalWrapper from '../../../../components/GlobalWrapper'
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const UserCancellationPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="User"
            breadcrumbItem="Cancellation Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <CancellationPolicy title="User" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default UserCancellationPolicy