import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import requestApi from "../../../network/httpRequest";
import { GET_SINGLE_CAR_TYPE, SINGLE_PARTNER } from "../../../network/Api";
import Lightbox from "react-image-lightbox";


const PartnerDetails = () => {


  const { id } = useParams();
  const history = useHistory();

  const { loading, message, error, partners, } = useSelector(
    state => state.partnerReducer
  );


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
      }

      // callApi(id);
    },
    [id]
  );

  // CALL API FOR GET CAR TYPE

  const callApi = async (partnerId) => {
    const { data } = await requestApi().request(SINGLE_PARTNER + partnerId)
    // console.log(data)
    if (data.status) {
      setPartner(data.data.partner)
      console.log("data", partner)
    }
    else {
      history.push('/partner/list', { replace: true })
    }
  };



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
                    <ImageWrapper>
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
                    </ImageWrapper>
                    <ImageWrapper>
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
                    </ImageWrapper>
                    <ImageWrapper>
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
                    </ImageWrapper>
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

width: 150px;
text-align: center;

img{
  object-fit: cover;
    width: 100%;
    height: 90%;
}




`

export default PartnerDetails;