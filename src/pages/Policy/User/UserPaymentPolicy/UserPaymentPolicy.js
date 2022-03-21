
import React from 'react'
import { Container } from 'reactstrap';
import GlobalWrapper from '../../../../components/GlobalWrapper';
import PaymentPolicy from '../../../../components/PaymentPolicy/PaymentPolicy';
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const UserPaymentPolicy = () => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}></Container>

          <Breadcrumbs
            maintitle="User"
            breadcrumbItem="Payment Policy"
            isRefresh={false}
            //   loading={loading}
            //   callList={callColorList}
          />

          <PaymentPolicy title="User" />
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default UserPaymentPolicy;