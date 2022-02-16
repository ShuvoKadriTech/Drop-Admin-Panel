import React from "react";
import { Container } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
const PartnersList = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
        <Breadcrumbs
              maintitle="Partner"
              breadcrumbItem="List"
              hideSettingBtn={true}
            

            />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PartnersList;
