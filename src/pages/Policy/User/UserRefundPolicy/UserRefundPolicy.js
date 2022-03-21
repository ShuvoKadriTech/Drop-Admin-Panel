import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from '../../../../components/Common/Breadcrumb'
import GlobalWrapper from '../../../../components/GlobalWrapper'
import RefundPolicy from '../../../../components/RefundPolicy/RefundPolicy'

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

          <RefundPolicy title="User" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default UserRefundPolicy