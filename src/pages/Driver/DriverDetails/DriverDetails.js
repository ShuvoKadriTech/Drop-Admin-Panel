import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import requestApi from "../../../network/httpRequest";
import { SINGLE_DRIVER } from "../../../network/Api";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Lightbox from "react-image-lightbox";

const DriverDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const { drivers } = useSelector((state) => state.driverReducer);

  const [driver, setDriver] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  // const [driverLicenseImages, setDriverLincenseImages] = useState([]);
  const [isView, setIsView] = useState(false);
  const [driveOthersImages, setDriverOthersImages] = useState([]);
  const [isZoom, setIsZoom] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (id) {
      // console.log("drivers-", drivers);
      const findDriver = drivers.find((driver) => driver.id == id);
      // console.log("find driver=>", findDriver);
      if (findDriver) {
        setDriver(findDriver);
        // let nidImgs = [];
        let imgs = [];
        const { nidBackPic, nidFontPic, licenseBackPic, licenseFontPic,img, partner: {img: partnerImg} } =
          findDriver;
          imgs.push(nidFontPic, nidBackPic, licenseBackPic, licenseFontPic,img,partnerImg);
        // licenseImgs.push(licenseFontPic, licenseBackPic);
        if (imgs.length > 0) {
          setDriverOthersImages(imgs);
        }
      } else {
        callApi(id);
      }
    } else {
      history.push("/drivers", { replace: true });
    }
  }, [id]);

  // FIND DRIVER FROM API

  const callApi = async (driverId) => {
    try {
      const { data } = await requestApi().request(SINGLE_DRIVER + driverId);
      // console.log("single driver", data);
      if (data.status) {
        setDriver(data.data.driver);
        let imgs = [];
        const { nidBackPic, nidFontPic, licenseBackPic, licenseFontPic, img, partner: {img: partnerImg} } =
          data.data.driver;
        imgs.push(nidFontPic, nidBackPic, licenseBackPic, licenseFontPic,img,partnerImg);
        if (imgs.length < 1) {

          setDriverOthersImages(imgs);
        }
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true} />
          <Breadcrumbs
            maintitle="drivers"
            breadcrumbItem="Details"
            // loading={loading}
            isRefresh={true}
          // callList={callPartnerList}
          />

          {/* {isOpen && (
            <Lightbox
              mainSrc={selectedImg}
              enableZoom={true}
              imageCaption="img"
              onCloseRequest={() => {
                setIsOpen(!isOpen);
              }}
            />
          )} */}

          {/*  IMAGES ZOOM */}

          {isZoom ? (
            <Lightbox
              // closeLabel={"close button"}
              // closeButtonAriaLabel={"close button"}
              mainSrc={driveOthersImages[photoIndex]}
              nextSrc={driveOthersImages[(photoIndex + 1) % driveOthersImages.length]}
              prevSrc={
                driveOthersImages[
                (photoIndex + driveOthersImages.length - 1) %
                driveOthersImages.length
                ]
              }
              onCloseRequest={() => setIsZoom(false)}
              onMovePrevRequest={
                () =>
                  setPhotoIndex(
                    (photoIndex + driveOthersImages.length - 1) %
                    driveOthersImages.length
                  )
                // setPhotoIndex({
                //   photoIndex:
                //     (photoIndex + carImageGalley.length - 1) %
                //     carImageGalley.length
                // })
              }
              onMoveNextRequest={
                () => setPhotoIndex((photoIndex + 1) % driveOthersImages.length)
                // setPhotoIndex({
                //   photoIndex: (photoIndex + 1) % carImageGalley.length,
                // })
              }
            />
          ) : null}





          <Row>
            <Col xl={6}>
              <Card>
                <CardBody>
                  <CardTitle>Driver Information</CardTitle>
                  <Row>
                    <Col xl={4} className='d-flex justify-content-center align-items-center'>
                      <div>
                        <img
                          className="rounded-circle avatar-xl cursor-pointer"
                          alt="partner"
                          src={driver?.img}
                          onClick={()=>{setPhotoIndex(4); setIsZoom(true)} }
                        />
                      </div>
                    </Col>
                    <Col xl={8}>
                      <div className="ps-4">
                        <Details>
                          <h5>Name:</h5>
                          <Value>{driver?.name}</Value>
                        </Details>
                        <Details>
                          <h5>Gmail:</h5>
                          <Value>{driver?.email}</Value>
                        </Details>
                        <Details>
                          <h5>Phone:</h5>
                          <Value>{driver?.phone}</Value>
                        </Details>
                        <Details>
                          <h5>NID:</h5>
                          <Value>{driver?.nid}</Value>
                        </Details>
                        <Details>
                          <h5>Date-Of-Birth:</h5>
                          <Value>{new Date(driver?.dob).toDateString()}</Value>
                        </Details>
                        <Details>
                          <h5>Address:</h5>
                          <Value>{driver?.address}</Value>
                        </Details>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={6}>
              <Card style={{ height: "250px" }}>
                <CardBody>
                  <CardTitle>
                    <div className='d-flex justify-content-between align-items-center'>
                      <span>Partner Information</span>
                      <div onClick={() =>
                        history.push(`/partner/${driver.partner.id}`)
                      }>
                        <Button>Details</Button>
                      </div>
                    </div>
                  </CardTitle>
                  <Row>
                    <Col xl={4} className='d-flex justify-content-center align-items-center'>
                      <div>
                        <img
                          className="rounded-circle avatar-xl cursor-pointer"
                          alt="partner"
                          src={driver?.partner?.img}
                          onClick={()=>{setPhotoIndex(5); setIsZoom(true)} }
                        />
                      </div>
                    </Col>
                    <Col xl={8} className="d-flex justify-content-start align-items-center">
                      <div className="ps-4 ">
                        <Details>
                          <h5>Name:</h5>
                          <Value>{driver?.partner?.name}</Value>
                        </Details>
                        <Details>
                          <h5>Phone:</h5>
                          <Value>{driver?.partner?.phone}</Value>
                        </Details>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>


          {/* DRIVER OTHERS IMAGES */}

          <Card>
            <CardBody>
              <CardTitle> Driver Others Images</CardTitle>

              <Row>
                {driveOthersImages.length > 0 && [...driveOthersImages.slice(0,4)].map((img,index) => (

                  <Col md={3} sm={6} className="d-flex justify-content-center align-content-center">
                    <img src={img} alt='image' style={{height: "150px"}} className="img-thumbnail" onClick={()=>{setPhotoIndex(index); setIsZoom(true)} }  />
                  </Col>

                ))}


              </Row>
            </CardBody>
          </Card>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

// const ButtonWrapper = styled.div`
//   .btn {
//     width: 30px;
//     height: 30px;
//     padding: 6px 0px;
//     border-radius: 15px;
//     text-align: center;
//     font-size: 12px;
//     line-height: 1.42857;
//   }
// `;

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

  img {
    object-fit: contain;
    width: 100%;
    height: 90%;
  }
`;

export default DriverDetails;
