import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap"

const Breadcrumb = props => {

    const [bannerViewStyle, setBannerViewStyle] = useState(localStorage.getItem("bannerView") ? localStorage.getItem("bannerView") : "list");


    const [setting_Menu, setsetting_Menu] = useState(false)


    const changeStyle = (view) => {
        localStorage.setItem("bannerView", view)
        setBannerViewStyle(view)
        props.lisener(view)
    }


    return (
        <Row className="align-items-center">
            <Col sm={6}>
                <div className="page-title-box">
                    <h4 className="font-size-18">{props.breadcrumbItem}</h4>
                    <ol className="breadcrumb mb-0">
                        {
                            (props.maintitle) ?
                                <>
                                    <BreadcrumbItem>
                                        <Link to="/#">{props.maintitle}</Link>
                                    </BreadcrumbItem>
                                </> : ''
                        }

                        {
                            props.title && <BreadcrumbItem>
                                <Link to="/#">{props.title}</Link>
                            </BreadcrumbItem>
                        }


                        <BreadcrumbItem active>
                            {props.breadcrumbItem}
                        </BreadcrumbItem>
                    </ol>
                </div>
            </Col>
            <Col sm={6}>

                <div className="float-end d-none d-md-block">
                    <Dropdown
                        isOpen={setting_Menu}
                        toggle={() => {
                            setsetting_Menu(!setting_Menu)
                        }}
                    >
                        <DropdownToggle color="primary" className="btn btn-primary dropdown-toggle waves-effect waves-light">
                            {bannerViewStyle == "list" ? <i className="mdi mdi- me-2">---</i> : <i className="mdi mdi-grid me-2"></i>}  View
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={() => changeStyle("list")} tag="a" href="#"><i className="mdi mdi-arrow me-2">---</i> Style 1</DropdownItem>
                            <DropdownItem onClick={() => changeStyle("grid")} tag="a" href="#"><i className="mdi mdi-grid me-2"></i>Style 2</DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                </div>



            </Col>
        </Row>
    )
}

Breadcrumb.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.string
}

export default Breadcrumb
