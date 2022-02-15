import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap"
import { Spinner, Button, Tooltip } from "reactstrap";


const Breadcrumb = ({ breadcrumbItem, maintitle, title, hideSettingBtn, loading, callList, titleRoute, isRefresh = true }) => {
  const [setting_Menu, setsetting_Menu] = useState(false)



  {/* <Tooltip
autohide={false}
isOpen
target="refreshBtn"
toggle={function noRefCheck(){}}
>

</Tooltip>
   */}

  return (
    <Row className="align-items-center">
      <Col sm={6}>
        <div className="page-title-box">
          <h4 className="font-size-18">{breadcrumbItem}</h4>
          <ol className="breadcrumb mb-0">
            {
              (maintitle) ?
                <>
                  <BreadcrumbItem>
                    <Link to="/">{maintitle}</Link>
                  </BreadcrumbItem>
                </> : ''
            }

            {
              title && <BreadcrumbItem>
                <Link to={`/${titleRoute}`}>{title}</Link>
              </BreadcrumbItem>
            }


            <BreadcrumbItem active>
              {breadcrumbItem}
            </BreadcrumbItem>
          </ol>
        </div>
      </Col>
      {isRefresh &&
        <Col sm={6} className="d-flex justify-content-end cursor-pointer">

         
          

            <Button variant="primary" id="refreshBtn" onClick={() => callList(true)} >
              {loading ? <Spinner
          animation="border"
          variant="info"
          style={{ width: "20px", height: "20px" }}
        />: <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        width="20px"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>}
              
            </Button>



        

        


        {/* {
          hideSettingBtn === true ?  <div></div> : <div className="float-end d-none d-md-block">
            <Dropdown
              isOpen={setting_Menu}
              toggle={() => {
                setsetting_Menu(!setting_Menu)
              }}
            >
              <DropdownToggle color="primary" className="btn btn-primary dropdown-toggle waves-effect waves-light">
                <i className="mdi mdi-cog me-2"></i> Settings
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a" href="#">Action</DropdownItem>
                <DropdownItem tag="a" href="#">Another action</DropdownItem>
                <DropdownItem tag="a" href="#">Something else here</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag="a" href="#">Separated link</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        } */}


      </Col>
      }
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb
