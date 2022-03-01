import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row,  } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import requestApi from "../../../network/httpRequest";
import { GET_SINGLE_CAR_TYPE, SINGLE_PARTNER } from "../../../network/Api";
import Lightbox from "react-image-lightbox";
import { Tbody, Td, Th, Thead, Tr,Table } from "react-super-responsive-table";
import { getAllDriversByPartner } from "../../../store/Driver/driverAction";


const PartnerDetails = () => {


  const dispatch = useDispatch()
  const { id } = useParams();
  const history = useHistory();

  const {  message, error, partners, } = useSelector(
    state => state.partnerReducer
  );

const {loading, drivers} = useSelector(state => state.driverReducer)

  const [partner, setPartner] = useState({});
  const [isZoom, setIsZoom] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);


  useEffect(
    () => {
      if (id) {
        const findPartner = partners.find(type => type?.id === id);
        if (findPartner) {
          setPartner(findPartner)
        }
        else {
          callApi(id);
        }

        dispatch(getAllDriversByPartner(id))
      }else {
        history.push('/partner/list', { replace: true })
      }

      // callApi(id);
    },
    [id]
  );

  // CALL API FOR GET CAR TYPE

  const callApi = async (partnerId) => {
    // console.log("partner Id", partnerId)
    const { data } = await requestApi().request(SINGLE_PARTNER + partnerId)
    // console.log("partner",data)
    if (data.status) {
      setPartner(data.data.partner)
      // console.log("data", partner)
    }
    
  };

// ADD NEW DRIVER 

const addNewDriver = () =>{
  history.push({
    pathname: '/driver/add',
    search: `?pID=${id}`,
    // state: { detail: 'some_value' }
});
}

// EDIT DRIVER 
const editDriver = (driverId) =>{
  history.push({
    pathname: `/driver/edit/${driverId}`,
    search: `?pID=${id}`,
    // state: { detail: 'some_value' }
});
}


  return (
    <React.Fragment>
      <GlobalWrapper>

        <div className="page-content" >
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Partner"
              breadcrumbItem="Details"
              // loading={loading}
              isRefresh={true}
            // callList={callPartnerList}
            />

            {isZoom
              ? <Lightbox
                mainSrc={selectedImg}
                enableZoom={true}
                imageCaption="img"
                onCloseRequest={() => {
                  setIsZoom(!isZoom);
                }}
              />
              : null}

            <Card>
              <CardBody>
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-between flex-wrap "
                    style={{ borderRight: "1px solid lightgray" }}
                  >
                    {partner.img ?<ImageWrapper style={{width : partner.nidFontPic && partner.nidBackPic ? "150px" : "100%", height: "200px", padding: "10px 0px" }}>
                       <img
                        onClick={() => {
                          setIsZoom(true);
                          setSelectedImg(partner.img)
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={partner.img}
                        width="100%"
                      /> 
                      <small>Partner Image</small>
                    </ImageWrapper>: null}
                    {partner.nidFontPic ? <ImageWrapper style={{width : partner.img && partner.nidBackPic ? "150px" : "100%", height: "200px", padding: "10px 0px" }}>
                     
                      <img
                        onClick={() => {
                          setIsZoom(true);
                          setSelectedImg(partner.nidFontPic)
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={partner.nidFontPic}
                        width="100%"
                      />
                      <small>NID Front Image</small>
                   
                      
                    </ImageWrapper>: null}
                    {partner.nidBackPic ? <ImageWrapper style={{width : partner.nidFontPic && partner.img ? "150px" : "100%", height: "200px", padding: "10px 0px" }}>
                  
                      <img
                        onClick={() => {
                          setIsZoom(true);
                          setSelectedImg(partner.nidBackPic)
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={partner.nidBackPic}
                        width="100%"
                      />
                      <small>NID Back Image</small>
                     
                      
                    </ImageWrapper>: null}
                  </Col>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-between  align-items-center mt-5 mt-md-0"
                  >
                    <div className="ps-4">
                      <Details>
                        <h5>Name:</h5>
                        <Value>
                          {partner.name}
                        </Value>
                      </Details>
                      <Details>
                        <h5>Gmail:</h5>
                        <Value>
                          {partner.email}
                        </Value>
                      </Details>
                      <Details>
                        <h5>Phone:</h5>
                        <Value>
                          {partner.phone}
                        </Value>
                      </Details>
                      <Details>
                        <h5>NID:</h5>
                        <Value>
                          {partner.nid}
                        </Value>
                      </Details>
                      <Details>
                        <h5>Date-Of-Birth:</h5>
                        <Value>
                          {partner.dob}
                        </Value>
                      </Details>
                      <Details>
                        <h5>Bidding Percent:</h5>
                        <Value>
                          {partner.biddingPercent}%
                        </Value>
                      </Details>
                    </div>
                    <div className="d-flex align-items-start h-100">
                      <button
                        onClick={() => history.push(`/partner/edit/${id}`)}
                        className="btn btn-success"
                      >
                        Edit
                      </button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>



            <Row>
              <Col xl={6}>

                <div className="table-rep-plugin">
                  <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                  >
                    <Card>
                      <CardBody>
                        <CardTitle className="d-flex justify-content-between"> 
                        
                        <h4>Driver List</h4>
                        <div>
                          <button
                            onClick={addNewDriver}
                            className="btn btn-success"
                          >
                            Add New
                          </button>
                        </div>
                        
                        </CardTitle>
                        
                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered table-hover text-center"
                        >
                          <Thead>
                            <Tr>
                              <Th>Serial No</Th>
                              <Th>Image</Th>
                              <Th>Name</Th>
                              <Th>Phone</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {drivers.map((driver, index) => {
                              return (
                                <Tr
                                  key={index}
                                  className="align-middle"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500"
                                  }}
                                >
                                  <Th>
                                    {index + 1}
                                  </Th>
                                  <Td>
                                  <div style={{ width: "50px", height: "50px" }}>
                            <img
                              onClick={() => {
                                setIsZoom(true);
                                setSelectedImg(driver.img);
                              }}
                              className="img-fluid cursor-pointer"
                              alt=""
                              src={driver.img}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                              }}
                            />
                          </div>
                                  </Td>
                                  <Td>
                                    {driver.name}
                                  </Td>
                                  <Td >
                                    {driver.phone}
                                  </Td>
                                  <Td>
                                    <button
                                      className="btn btn-info btn-circle btn-sm me-0 me-lg-2"
                                      onClick={()=>editDriver(driver.id)}
                                    >
                                      <i className="fa fa-edit" />
                                    </button>
                                    <button
                            className="btn btn-success btn-circle btn-sm"
                            // onClick={() =>
                            //   // history.push(`/partner/${partner.id}`)
                            // }
                          >
                            <i className="fa fa-eye" />
                          </button>
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
              <Col xl={6}>
                <div className="table-rep-plugin">
                  <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                  >
                    <Card>
                      <CardBody>
                        <CardTitle className="h4"> Car List</CardTitle>

                        <Table
                          id="tech-companies-1"
                          className="table table-striped table-bordered table-hover text-center"
                        >
                          <Thead>
                            <Tr>
                              <Th>Serial No</Th>
                              <Th>Color Name</Th>
                              <Th>Color Code</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          {/* <Tbody>
                            {colors.map((color, index) => {
                              return (
                                <Tr
                                  key={index}
                                  className="align-middle"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500"
                                  }}
                                >
                                  <Th>
                                    {index + 1}
                                  </Th>
                                  <Td>
                                    {color.name}
                                  </Td>
                                  <Td style={{ color: `${color.colorCode}` }}>
                                    {color.colorCode}
                                  </Td>
                                  <Td>
                                    <button
                                      className="btn btn-info "
                                      onClick={() => handleEditColor(color.id)}
                                    >
                                      <i className="fa fa-edit" />
                                    </button>
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody> */}
                        </Table>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>



          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};



const Details = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;

const Value = styled.h5`
  color: lightcoral;
  font-style: italic;
  font-weight: 500;
  margin-left: 4px;
  /* padding-left: 5px; */
`;

const ImageWrapper = styled.div`

text-align: center;

img{
  object-fit: contain;
    width: 100%;
    height: 90%;
}




`

export default PartnerDetails;