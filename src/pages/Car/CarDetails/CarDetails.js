import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useSelector } from "react-redux";
import requestApi from "../../../network/httpRequest";
import { SINGLE_CAR } from "../../../network/Api";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import Lightbox from "react-image-lightbox";

const CarDetails = () => {

  const { id } = useParams();
  const { search, pathname } = useLocation();
  const history = useHistory();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);


  // console.log(" first id--------", id)

  const [car, setCar] = useState({})
  const [isZoom, setIsZoom] = useState(false);
  const [carImageGalley, setCarImageGalley] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [smartCardImg, setSmartCardImg] = useState([])
  const [isOpen, setIsOpen] = useState(false);


  const showImageGallery = (images) => {
    // console.log("before images clicked--------");
    const newImages = images.map((image) => image.path);

    setCarImageGalley(newImages);
    // console.log("after images----", carImageGalley);
    setIsZoom(true);
  };

  useEffect(() => {
    if (id) {
      console.log("id------", id)
      const getSingleCar = async () => {
        try {
          const { data } = await requestApi().request(SINGLE_CAR, {
            params: {
              id: id
            }
          })
          console.log("car----", data)
          if (data.status) {
            setCar(data.data.car)
            let smartImgs = []
            const {carSmartCardFont,carSmartCardBack, partner: {img}} = data.data.car;
              smartImgs.push(carSmartCardFont, carSmartCardBack, img)
            if(smartImgs.length > 0){
              setSmartCardImg(smartImgs)
            }
            
          } else {
            console.log(data.error)
          }

        } catch (error) {
          console.log(error)
        }
      }
      getSingleCar();
    }
    else {
      // console.log("call-----------")
      history.push("/partner/list", { replace: true });
    }
  }, [])

  return (
    <React.Fragment>
      <GlobalWrapper>

        <div className="page-content" >
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Partner"
              breadcrumbItem="Details"
              title="Car"
              isRefresh={false}
            />

            {isOpen ? (
              <Lightbox
                // closeLabel={"close button"}
                // closeButtonAriaLabel={"close button"}
                mainSrc={smartCardImg[imgIndex]}
                nextSrc={
                  smartCardImg[(imgIndex + 1) % smartCardImg.length]
                }
                prevSrc={
                  smartCardImg[
                  (imgIndex + smartCardImg.length - 1) %
                  smartCardImg.length
                  ]
                }
                onCloseRequest={() => setIsZoom(false)}
                onMovePrevRequest={
                  () =>
                    setPhotoIndex(
                      (imgIndex + smartCardImg.length - 1) %
                      smartCardImg.length
                    )
                  // setPhotoIndex({
                  //   photoIndex:
                  //     (photoIndex + carImageGalley.length - 1) %
                  //     carImageGalley.length
                  // })
                }
                onMoveNextRequest={
                  () => setPhotoIndex((imgIndex + 1) % smartCardImg.length)
                  // setPhotoIndex({
                  //   photoIndex: (photoIndex + 1) % carImageGalley.length,
                  // })
                }
              />
            ) : null}


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


            <Row>
              <Col xl={6}>
                <Card>
                  <CardBody>
                    <CardTitle>Car Information</CardTitle>
                    <Row>
                      <Col xl={4} className='d-flex justify-content-center align-items-center'>
                        <div>
                          <img
                            className="rounded-circle avatar-xl cursor-pointer"
                            alt="partner"
                            src={car?.car_images?.length > 0 ? car.car_images[0].path : ""}
                            onClick={() => {
                              showImageGallery(car?.car_images);
                              // setIsZoom(true);
                            }}
                          />

                        </div>
                      </Col>
                      <Col xl={8}>
                        <div className="ps-4">
                          <Details>
                            <h5>Car Type:</h5>
                            <Value>{car?.car_type?.name}</Value>
                          </Details>
                          <Details>
                            <h5>Brand:</h5>
                            <Value>{car?.car_brand?.name}</Value>
                          </Details>
                          <Details>
                            <h5>Model:</h5>
                            <Value>{car?.car_model?.name}</Value>
                          </Details>
                          <Details>
                            <h5>Color:</h5>
                            <Value>{car?.color?.name}</Value>
                          </Details>
                          <Details>
                            <h5>year:</h5>
                            <Value>{car?.year?.year}</Value>
                          </Details>
                          <Details>
                            <h5>Fuel:</h5>
                            <Value>{car?.car_fuel_type?.name}</Value>
                          </Details>
                          <Details>
                            <h5>Reg Number:</h5>
                            <Value>{car?.carRegisterNumber}</Value>
                          </Details>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xl={6}>
                <Card style={{ height: "273px" }}>
                  <CardBody>
                    <CardTitle>
                      <div className='d-flex justify-content-between align-items-center'>
                        <span>Partner Information</span>
                        <div onClick={() =>
                          history.push(`/partner/${car.partner.id}`)
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
                            src={car?.partner?.img}
                            onClick={() => { setImgIndex(2); setIsOpen(true) }}
                          />
                        </div>
                      </Col>
                      <Col xl={8} className="d-flex justify-content-start align-items-center">
                        <div className="ps-4 ">
                          <Details>
                            <h5>Name:</h5>
                            <Value>{car?.partner?.name}</Value>
                          </Details>
                          <Details>
                            <h5>Phone:</h5>
                            <Value>{car?.partner?.phone}</Value>
                          </Details>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-center">
              <Card style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
                <CardBody>
                  <CardTitle>Car Smart Car Images</CardTitle>
                  <Row>
                    {smartCardImg.length > 0 && [...smartCardImg.slice(0,2)].map((img, index) => (

                      <Col sm={6} key={index}>
                        <img src={img} alt='smart-image'  className="img-thumbnail cursor-pointer" onClick={() => { setImgIndex(index); setIsOpen(true) }} style={{ height: "200px" }} />
                      </Col>

                    ))}
                    {/* <Col sm={6} >
                      <img src={car?.carSmartCardFont} alt="smart card" style={{ height: "200px" }} className="img-thumbnail" />
                      <p>Front image</p>
                    </Col>
                    <Col sm={6}  >
                      <img src={car?.carSmartCardBack} alt="smart card" style={{ height: "200px" }} className="img-thumbnail" />
                      <p>Back image</p>
                    </Col> */}
                  </Row>
                </CardBody>
              </Card>
            </div>

          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};


const Details = styled.div`
  display: flex;
  /* justify-content: space-evenly; */


`;

const Value = styled.h5`
  color: lightcoral;
  font-style: italic;
  font-weight: 500;
  margin-left: 4px;
  /* padding-left: 5px; */
`;





export default CarDetails;
