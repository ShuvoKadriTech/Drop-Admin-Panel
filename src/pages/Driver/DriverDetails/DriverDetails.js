import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
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
  const [driverLicenseImages, setDriverLincenseImages] = useState([]);
  const [isView, setIsView] = useState(false);
  const [driveNidImages, setDriverNidImages] = useState([]);
  const [isZoom, setIsZoom] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (id) {
      // console.log("drivers-", drivers);
      const findDriver = drivers.find((driver) => driver.id == id);
      // console.log("find driver=>", findDriver);
      if (findDriver) {
        setDriver(findDriver);
        let nidImgs = [];
        let licenseImgs = [];
        const { nidBackPic, nidFontPic, licenseBackPic, licenseFontPic } =
          findDriver;
        nidImgs.push(nidBackPic, nidFontPic);
        licenseImgs.push(licenseFontPic, licenseBackPic);
        if (licenseImgs.length > 0) {
          setDriverLincenseImages(licenseImgs);
        }
        if (nidImgs.length > 0) {
          setDriverNidImages(nidImgs);
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
        let nidImgs = [];
        let licenseImgs = [];
        const { nidBackPic, nidFontPic, licenseBackPic, licenseFontPic } =
          data.data.driver;
        nidImgs.push(nidFontPic, nidBackPic);
        licenseImgs.push(licenseFontPic, licenseBackPic);
        if (nidImgs.length > 0) {
          setDriverNidImages(nidImgs);
        }
        if (licenseImgs.length > 0) {
          setDriverLincenseImages(licenseImgs);
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

          {isOpen && (
            <Lightbox
              mainSrc={selectedImg}
              enableZoom={true}
              imageCaption="img"
              onCloseRequest={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}

          {/* NID IMAGES ZOOM */}

          {isZoom ? (
            <Lightbox
              // closeLabel={"close button"}
              // closeButtonAriaLabel={"close button"}
              mainSrc={driveNidImages[photoIndex]}
              nextSrc={driveNidImages[(photoIndex + 1) % driveNidImages.length]}
              prevSrc={
                driveNidImages[
                  (photoIndex + driveNidImages.length - 1) %
                    driveNidImages.length
                ]
              }
              onCloseRequest={() => setIsZoom(false)}
              onMovePrevRequest={
                () =>
                  setPhotoIndex(
                    (photoIndex + driveNidImages.length - 1) %
                      driveNidImages.length
                  )
                // setPhotoIndex({
                //   photoIndex:
                //     (photoIndex + carImageGalley.length - 1) %
                //     carImageGalley.length
                // })
              }
              onMoveNextRequest={
                () => setPhotoIndex((photoIndex + 1) % driveNidImages.length)
                // setPhotoIndex({
                //   photoIndex: (photoIndex + 1) % carImageGalley.length,
                // })
              }
            />
          ) : null}

          {/* LICENSE IMAGE VIEW */}

          {isView ? (
            <Lightbox
              // closeLabel={"close button"}
              // closeButtonAriaLabel={"close button"}
              mainSrc={driverLicenseImages[photoIndex]}
              nextSrc={
                driverLicenseImages[
                  (photoIndex + 1) % driverLicenseImages.length
                ]
              }
              prevSrc={
                driverLicenseImages[
                  (photoIndex + driverLicenseImages.length - 1) %
                    driverLicenseImages.length
                ]
              }
              onCloseRequest={() => setIsView(false)}
              onMovePrevRequest={
                () =>
                  setPhotoIndex(
                    (photoIndex + driverLicenseImages.length - 1) %
                      driverLicenseImages.length
                  )
                // setPhotoIndex({
                //   photoIndex:
                //     (photoIndex + carImageGalley.length - 1) %
                //     carImageGalley.length
                // })
              }
              onMoveNextRequest={
                () =>
                  setPhotoIndex((photoIndex + 1) % driverLicenseImages.length)
                // setPhotoIndex({
                //   photoIndex: (photoIndex + 1) % carImageGalley.length,
                // })
              }
            />
          ) : null}

          {/* PARTNER INFORMATION */}

          <Card>
            <CardBody>
              <CardTitle>Partner Details</CardTitle>
              <Row>
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-between flex-wrap "
                  // style={{  borderRight: width > 1200 ?  "1px solid lightgray" : "none"}}
                >
                  {driver?.partner?.img ? (
                    <ImageWrapper
                      style={{
                        width: "100%",
                        height: "200px",
                        padding: "10px 0px",
                      }}
                    >
                      <img
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedImg(driver?.partner?.img);
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={driver?.partner?.img}
                        width="100%"
                      />
                      <small>Partner Image</small>
                    </ImageWrapper>
                  ) : null}
                </Col>
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-between  align-items-center mt-5 mt-md-0"
                >
                  <div className="ps-4">
                    <Details>
                      <h5>Name:</h5>
                      <Value>{driver?.partner?.name}</Value>
                    </Details>
                    <Details>
                      <h5>Gmail:</h5>
                      <Value>{driver?.partner?.email}</Value>
                    </Details>
                    <Details>
                      <h5>Phone:</h5>
                      <Value>{driver?.partner?.phone}</Value>
                    </Details>
                    <Details>
                      <h5>NID:</h5>
                      <Value>{driver?.partner?.nid}</Value>
                    </Details>
                    <Details>
                      <h5>Date-Of-Birth:</h5>
                      <Value>{driver?.partner?.dob}</Value>
                    </Details>
                    <Details>
                      <h5>Bidding Percent:</h5>
                      <Value>{driver?.partner?.biddingPercent}%</Value>
                    </Details>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          {/* DRIVER INFORMATION  */}

          <Card>
            <CardBody>
              <CardTitle>Driver Information</CardTitle>
              <Row>
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-between flex-wrap "
                  // style={{  borderRight: width > 1200 ?  "1px solid lightgray" : "none"}}
                >
                  {driver?.img ? (
                    <ImageWrapper
                      style={{
                        width: "100%",
                        height: "200px",
                        padding: "10px 0px",
                      }}
                    >
                      <img
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedImg(driver?.img);
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={driver?.img}
                        width="100%"
                      />
                      <small>Driver Image</small>
                    </ImageWrapper>
                  ) : null}
                </Col>
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-between  align-items-center mt-5 mt-md-0"
                >
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

          {/* DRIVER OTHERS IMAGES */}

          <Card>
            <CardBody>
              <CardTitle> Driver Others Images</CardTitle>

              <Row>
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-between flex-wrap "
                  // style={{  borderRight: width > 1200 ?  "1px solid lightgray" : "none"}}
                >
                  {driveNidImages ? (
                    <ImageWrapper
                      style={{
                        width: "100%",
                        height: "200px",
                        padding: "10px 0px",
                      }}
                    >
                      <img
                        onClick={() => {
                          setIsZoom(true);
                          // setSelectedImg(driver?.licenseFontPic);
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={driveNidImages[0]}
                        width="100%"
                      />
                      <small>Driver NID Images</small>
                    </ImageWrapper>
                  ) : null}
                </Col>
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-between flex-wrap "
                  // style={{  borderRight: width > 1200 ?  "1px solid lightgray" : "none"}}
                >
                  {driverLicenseImages ? (
                    <ImageWrapper
                      style={{
                        width: "100%",
                        height: "200px",
                        padding: "10px 0px",
                      }}
                    >
                      <img
                        onClick={() => {
                          setIsView(true);
                          // setSelectedImg(driver?.licenseBackPic);
                        }}
                        className="img-fluid cursor-pointer"
                        alt="Veltrix"
                        src={driverLicenseImages[0]}
                        width="100%"
                      />
                      <small>Driver Lincense Images</small>
                    </ImageWrapper>
                  ) : null}
                </Col>
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
