import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import requestApi from "../../../network/httpRequest";
import { GET_SINGLE_CAR_TYPE, SINGLE_PARTNER } from "../../../network/Api";

import { Tbody, Td, Th, Thead, Tr, Table } from "react-super-responsive-table";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
// import { getAllDriversByPartner } from "../../../store/partner/partnerActions";

const PartnerDetails = () => {
  // const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { message, error, partners, drivers } = useSelector(
    (state) => state.partnerReducer
  );

  // const {loading, } = useSelector(state => state.driverReducer)

  const [partner, setPartner] = useState({});
  const [isZoom, setIsZoom] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [carImageGalley, setCarImageGalley] = useState([]);
  // const [othersImageGalley, setOIthersImageGalley] = useState([]);

  const showImageGallery = (images) => {
    console.log("before images clicked--------");
    const newImages = images.map((image) => image.path);

    setCarImageGalley(newImages);
    console.log("after images----", carImageGalley);
    setIsZoom(true);
  };

  useEffect(() => {
    if (id) {
      const findPartner = partners.find((type) => type?.id === id);
      if (findPartner) {
        setPartner(findPartner);
      } else {
        callApi(id);
      }

      // dispatch(getAllDriversByPartner(id));
    } else {
      history.push("/partner/list", { replace: true });
    }

    // callApi(id);
  }, [id]);

  // CALL API FOR GET CAR TYPE

  const callApi = async (partnerId) => {
    // console.log("partner Id", partnerId)
    const { data } = await requestApi().request(SINGLE_PARTNER + partnerId);
    // console.log("partner",data)
    if (data.status) {
      setPartner(data.data.partner);
      // console.log("data", partner)
    }
  };

  // ADD NEW DRIVER

  const addNewDriver = () => {
    history.push({
      pathname: "/driver/add",
      search: `?pID=${id}`,
      // state: { detail: 'some_value' }
    });
  };

  // EDIT DRIVER
  const editDriver = (driverId) => {
    history.push({
      pathname: `/driver/edit/${driverId}`,
      search: `?pID=${id}`,
      // state: { detail: 'some_value' }
    });
  };

  // ADD CAR EVENT

  const addNewCar = () => {
    history.push({
      pathname: "/car/add",
      search: `?pID=${id}`,
      // state: { detail: 'some_value' }
    });
  };

  // EDIT CAR EVENT

  const editCar = (carId) => {
    history.push({
      pathname: `/car/edit/${carId}`,
      search: `?pID=${id}`,
      // state: { detail: 'some_value' }
    });
    // history.push(`/partner/edit/${partner.id}`)
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Partner"
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

            {isZoom ? (
              <Lightbox
                // closeLabel={"close button"}
                // closeButtonAriaLabel={"close button"}
                mainSrc={carImageGalley[photoIndex]}
                nextSrc={
                  carImageGalley[(photoIndex + 1) % carImageGalley.length]
                }
                prevSrc={
                  carImageGalley[
                    (photoIndex + carImageGalley.length - 1) %
                      carImageGalley.length
                  ]
                }
                onCloseRequest={() => setIsZoom(false)}
                onMovePrevRequest={
                  () =>
                    setPhotoIndex(
                      (photoIndex + carImageGalley.length - 1) %
                        carImageGalley.length
                    )
                  // setPhotoIndex({
                  //   photoIndex:
                  //     (photoIndex + carImageGalley.length - 1) %
                  //     carImageGalley.length
                  // })
                }
                onMoveNextRequest={
                  () => setPhotoIndex((photoIndex + 1) % carImageGalley.length)
                  // setPhotoIndex({
                  //   photoIndex: (photoIndex + 1) % carImageGalley.length,
                  // })
                }
              />
            ) : null}

            <Card>
              <CardBody>
                <Row>
                  <div className="d-flex justify-content-end w-100">
                    <button
                      onClick={() => history.push(`/partner/edit/${id}`)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                  </div>
                </Row>
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    className="d-flex justify-content-between flex-wrap "
                    // style={{  borderRight: width > 1200 ?  "1px solid lightgray" : "none"}}
                  >
                    {partner.img ? (
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
                            setSelectedImg(partner.img);
                          }}
                          className="img-fluid cursor-pointer"
                          alt="Veltrix"
                          src={partner.img}
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
                        <Value>{partner.name}</Value>
                      </Details>
                      <Details>
                        <h5>Gmail:</h5>
                        <Value>{partner.email}</Value>
                      </Details>
                      <Details>
                        <h5>Phone:</h5>
                        <Value>{partner.phone}</Value>
                      </Details>
                      <Details>
                        <h5>NID:</h5>
                        <Value>{partner.nid}</Value>
                      </Details>
                      <Details>
                        <h5>Date-Of-Birth:</h5>
                        <Value>{partner.dob}</Value>
                      </Details>
                      <Details>
                        <h5>Bidding Percent:</h5>
                        <Value>{partner.biddingPercent}%</Value>
                      </Details>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {partner.nidFontPic || partner.nidBackPic ? (
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      {partner.nidFontPic ? (
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
                              setSelectedImg(partner.nidFontPic);
                            }}
                            className="img-fluid cursor-pointer"
                            alt="Veltrix"
                            src={partner.nidFontPic}
                            width="100%"
                          />
                          <small>NID Front Image</small>
                        </ImageWrapper>
                      ) : null}
                    </Col>
                    <Col md={6}>
                      {partner.nidBackPic ? (
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
                              setSelectedImg(partner.nidBackPic);
                            }}
                            className="img-fluid cursor-pointer"
                            alt="Veltrix"
                            src={partner.nidBackPic}
                            width="100%"
                          />
                          <small>NID Back Image</small>
                        </ImageWrapper>
                      ) : null}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ) : null}

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
                            {partner?.drivers?.map((driver, index) => {
                              return (
                                <Tr
                                  key={index}
                                  className="align-middle"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                  }}
                                >
                                  <Th>{index + 1}</Th>
                                  <Td>
                                    <div
                                      style={{ width: "50px", height: "50px" }}
                                    >
                                      <img
                                        onClick={() => {
                                          setIsOpen(true);
                                          setSelectedImg(driver.img);
                                        }}
                                        className="img-fluid cursor-pointer"
                                        alt=""
                                        src={driver.img}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "contain",
                                        }}
                                      />
                                    </div>
                                  </Td>
                                  <Td>{driver.name}</Td>
                                  <Td>{driver.phone}</Td>
                                  <Td>
                                    <ButtonWrapper>
                                      <button
                                        className="btn btn-info me-xl-0"
                                        onClick={() => editDriver(driver.id)}
                                      >
                                        <i className="fa fa-edit" />
                                      </button>
                                      <button
                                        className="btn btn-success "
                                        onClick={() =>
                                          history.push(
                                            `/driver/details/${driver.id}`
                                          )
                                        }
                                      >
                                        <i className="fa fa-eye" />
                                      </button>
                                    </ButtonWrapper>
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
                        <CardTitle className="d-flex justify-content-between">
                          <h4>Car List</h4>
                          <div>
                            <button
                              onClick={addNewCar}
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
                              <Th>Image</Th>
                              <Th>Car Type Name</Th>
                              <Th>Brand Name</Th>
                              <Th>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {partner?.cars?.map((car, index) => {
                              return (
                                <Tr
                                  key={index}
                                  className="align-middle"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "500",
                                  }}
                                >
                                  <Td>
                                    <div
                                      style={{ width: "50px", height: "50px" }}
                                    >
                                      <img
                                        onClick={() => {
                                          showImageGallery(car?.car_images);
                                          // setIsZoom(true);
                                        }}
                                        className="img-fluid cursor-pointer"
                                        alt=""
                                        src={car?.car_images[0].path}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "contain",
                                        }}
                                      />
                                    </div>
                                  </Td>
                                  <Td>{car?.car_type?.name}</Td>
                                  <Td>{car?.car_brand?.name}</Td>
                                  <Td>
                                    <ButtonWrapper>
                                      <button
                                        className="btn btn-info me-xl-3"
                                        onClick={() => editCar(car.id)}
                                      >
                                        <i className="fa fa-edit" />
                                      </button>
                                      <button
                                        className="btn btn-success "
                                        // onClick={() =>
                                        //   history.push(`/partner/${partner.id}`)}
                                      >
                                        <i className="fa fa-eye" />
                                      </button>
                                    </ButtonWrapper>
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
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const ButtonWrapper = styled.div`
  .btn {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
  }
`;

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

export default PartnerDetails;
