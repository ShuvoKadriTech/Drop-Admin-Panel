import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCarTypes } from "../../../store/Car/carTypes/carTypesAction";
import {
  addRide,
  selectCarType,
  selectPickupTime,
  selectReturnTime,
  selectTrip,
} from "../../../store/Ride/rideAction";
import { usersList } from "../../../store/Users/UsersAction";
import { selectUser } from "./../../../store/Ride/rideAction";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { toast } from "react-toastify";
// import Directions from "../../../components/Directions";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";
// import { compose, withProps } from "recompose";

const RideAdd = () => {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const { carTypes } = useSelector((state) => state.carTypesReducer);

  const {
    selectedCarType,
    selectedUser,
    selectedTrip,
    selectedPickupTime,
    selectedReturnTime,
    status,
    loading,
  } = useSelector((state) => state.rideReducer);

  const { users } = useSelector((state) => state.usersReducer);

  const [searchCarType, setSearchCarType] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [pickupSelectedAddress, setPickupSelectedAddress] = useState("");
  const [pickupAddress, setPickupAddress] = useState({});
  const [pickupLatLng, setPickupLatLng] = useState({});
  const [dropSelectedAddress, setDropSelectedAddress] = useState("");
  const [dropAddress, setDropAddress] = useState({});
  const [dropLatLng, setDropLatLng] = useState({});
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [pickupFullAddress, setPickupFullAddress] = useState("");
  const [dropFullAddress, setDropFullAddress] = useState("");
  const [pickupPlaceId, setPickupPlaceId] = useState("");
  const [dropPlaceId, setDropPlaceId] = useState("");
  const [note, setNote] = useState("");
  const [map_, setMap] = useState();
  const [directionsRenderer, setdirectionsRenderer] = useState();
  const [directionsService, setdirectionsService] = useState();
  const startRef = useRef();
  const sidebar = useRef();
  const endRef = useRef();
  const floatingPanel = useRef();

  useEffect(() => {
    if (carTypes.length < 1) {
      dispatch(getCarTypes(true));
    }
    if (users.length < 1) {
      dispatch(usersList());
    }
  }, [carTypes, users]);

  // PICKUP ADDRESS CHANGE

  const handlePickupAddressChange = (address) => {
    // console.log("address", address);
    setPickupSelectedAddress(address);
  };

  // PICKUP ADDRESS SELECTED

  const handlePickupAddressSelect = (address, placeId) => {
    // console.log("select-------------", address);
    setPickupSelectedAddress(address);
    geocodeByAddress(address);
    geocodeByPlaceId(placeId)
      .then((results) => setPickupAddress(results[0]))
      // .then((results) => {
      //   setPickupAddress(results[0]);

      //   getLatLng(results[0]);
      // })
      // .then((latLng) => console.log("success", latLng))
      .catch((error) => console.error("Error", error));
  };

  // RETURN ADDRESS CHANGE

  const handleReturnAddressChange = (address) => {
    // console.log("address", address);
    setDropSelectedAddress(address);
  };

  // RETURN ADDRESS SELECTED

  const handleDropAddressSelect = (address, placeId) => {
    // console.log("select-------------", address);
    setDropSelectedAddress(address);
    geocodeByAddress(address);
    geocodeByPlaceId(placeId)
      .then((results) => setDropAddress(results[0]))
      // .then((latLng) => console.log(latLng))
      .catch((error) => console.error("Error", error));
  };

  // GET LAT LNG FROM ADDRESS

  useEffect(() => {
    if (Object.keys(pickupAddress).length > 0) {
      getLatLng(pickupAddress).then((latlng) => setPickupLatLng(latlng));
      const {
        geometry: { location },
        formatted_address,
        address_components,
        place_id,
      } = pickupAddress;
      // console.log("placeId",place_id)
      setPickupFullAddress(formatted_address);
      setPickupPlaceId(place_id);
    }
    if (Object.keys(dropAddress).length > 0) {
      getLatLng(dropAddress).then((latlng) => setDropLatLng(latlng));
      const {
        geometry: { location },
        formatted_address,
        address_components,
        place_id,
      } = dropAddress;
      setDropFullAddress(formatted_address);
      setDropPlaceId(place_id);
    }
  }, [pickupAddress, dropAddress]);

  // SUBMIT RIDE DATA

  const handleSubmit = () => {
    if (selectedCarType == null) {
      return toast.warn("Please Select a Car Type", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (selectedUser == null) {
      return toast.warn("Please Select a User", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (
      Object.keys(pickupAddress).length < 1 &&
      Object.keys(dropAddress).length < 1
    ) {
      return toast.warn("Please Select Pickup and Drop Address", {
        // position: "bottom-right",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // PICKUP DATA

    if (Object.keys(pickupAddress).length > 0) {
      const {
        geometry: { location },
        formatted_address,
        address_components,
        place_id,
      } = pickupAddress;
      // console.log("placeId",place_id)
      // setPickupFullAddress(formatted_address);
      // setPickupPlaceId(place_id)
      var pickup_country_long_name;
      var pickup_country_short_name;
      var pickup_locality_long_name;
      var pickup_sub_locality_long_name;

      address_components.forEach((address_component) => {
        if (address_component.types.includes("country")) {
          pickup_country_long_name = address_component.long_name;
          pickup_country_short_name = address_component.short_name;
        } else if (address_component.types.includes("locality")) {
          pickup_locality_long_name = address_component.long_name;
        } else if (address_component.types.includes("sublocality")) {
          pickup_sub_locality_long_name = address_component.long_name;
        }
      });
    }

    // DROP DATA

    if (Object.keys(dropAddress).length > 0) {
      const {
        geometry: { location },
        formatted_address,
        address_components,
        place_id,
      } = dropAddress;
      // setDropFullAddress(formatted_address)
      // setDropPlaceId(place_id)
      var drop_country_long_name;
      var drop_country_short_name;
      var drop_locality_long_name;
      var drop_sub_locality_long_name;

      address_components.forEach((address_component) => {
        if (address_component.types.includes("country")) {
          drop_country_long_name = address_component.long_name;
          drop_country_short_name = address_component.short_name;
        } else if (address_component.types.includes("locality")) {
          drop_locality_long_name = address_component.long_name;
        } else if (address_component.types.includes("sublocality")) {
          drop_sub_locality_long_name = address_component.long_name;
        }
      });
    }

    const data = {
      carTypeId: selectedCarType.id,
      userId: selectedUser.id,
      pickUpLocation: {
        address: pickupFullAddress,
        placeId: pickupPlaceId,
        latitute: pickupLatLng.lat,
        longitute: pickupLatLng.lng,
        locality: pickup_locality_long_name,
        subLocality: pickup_sub_locality_long_name,
        country: pickup_country_long_name,
        countryCode: pickup_country_short_name,
      },
      dropOffLocation: {
        address: dropFullAddress,
        placeId: dropPlaceId,
        latitute: dropLatLng.lat,
        longitute: dropLatLng.lng,
        locality: drop_locality_long_name,
        subLocality: drop_sub_locality_long_name,
        country: drop_country_long_name,
        countryCode: drop_country_short_name,
      },

      duration: duration,
      distance: distance,
      tripType: selectedTrip,
      pickUpDate: selectedPickupTime,
      returnDate: selectedTrip == 0 ? null : selectedReturnTime,
      extraNote: note,
    };

    dispatch(addRide(data));
  };

  // SUCCESS

  useEffect(() => {
    if (status) {
      setNote("");
      setPickupSelectedAddress("");
      setDropSelectedAddress("");
    }
  }, [status]);

  /* eslint-disable no-undef */
  useEffect(() => {
    if (
      Object.keys(pickupLatLng).length > 0 &&
      Object.keys(dropLatLng).length > 0
    ) {
      const directionsRenderer_ = new google.maps.DirectionsRenderer();
      const directionsService_ = new google.maps.DirectionsService();
      setdirectionsRenderer(directionsRenderer_);
      setdirectionsService(directionsService_);

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 22.328127, lng: 91.805502 },
        zoom: 12,
        disableDefaultUI: true,
        // mapTypeId: 'satellite',
        // heading: 90,
        // tilt: 45,
      });

      directionsRenderer_.setMap(map);
      directionsRenderer_.setPanel(sidebar.current);

      const control = floatingPanel.current;
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

      calculateAndDisplayRoute(directionsService_, directionsRenderer_);
    }
  }, [pickupLatLng, dropLatLng]);

  // const onChangeHandler = function () {
  //   calculateAndDisplayRoute(directionsService, directionsRenderer);
  // };

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
      .route({
        origin: pickupLatLng,
        destination: dropLatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        // console.log(response);

        const route = response.routes[0];
        // console.log("route", route);

        // console.log(route.legs[i].end_address);

        // console.log(route.legs[i].distance.text);

        directionsRenderer.setDirections(response);

        setDistance(route.legs[0].distance.value.toString());
        setDuration(route.legs[0].duration.value.toString());

        // console.log(route.legs[0].distance);
        // console.log(route.legs[0].duration);
        // console.log(route.legs[0].start_address);
        // console.log(route.legs[0].end_address);
        // console.log(route.legs[0].steps);

        // var summaryPanel;
        // for (let i = 0; i < route.legs.length; i++) {
        //     const routeSegment = i + 1;

        //     summaryPanel +=
        //         "<b>Route Segment: " + routeSegment + "</b><br>";
        //         summaryPanel += route.legs[i].start_address + " to ";
        //         summaryPanel += route.legs[i].end_address + "<br>";
        //         summaryPanel += route.legs[i].distance.text + "<br><br>";
        // }

        // console.log(summaryPanel);

        // console.log(directionsRenderer.getPanel());
      })
      .catch((e) =>
        window.alert("Directions request failed due to " + e.message)
      );

    // directionsService
    //   .route({
    //     origin: start,
    //     destination: end,
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   })
    //   .then((response) => {

    //     console.log(response);

    //     directionsRenderer.setDirections(response);

    //     console.log(directionsRenderer.getPanel());

    //   })
    //   .catch((e) => window.alert("Directions request failed due to " + e.message));
  }
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              maintitle="Ride"
              breadcrumbItem="Add"
              isRefresh={false}
              //   loading={loading}
              //   callList={callColorList}
            />

            <Card>
              <CardBody>
                <Row>
                  <Col xl={6}>
                    <Autocomplete
                      className="cursor-pointer"
                      value={selectedCarType}
                      onChange={(event, newValue) => {
                        dispatch(selectCarType(newValue));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.id == value.id
                      }
                      inputValue={searchCarType}
                      onInputChange={(event, newInputValue) => {
                        setSearchCarType(newInputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={carTypes.length > 0 ? carTypes : []}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select a Car Type"
                          required
                        />
                      )}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="60"
                            src={option.image}
                            alt=""
                          />
                          {option.name}
                        </Box>
                      )}
                    />
                  </Col>
                  <Col xl={6} className="my-4 my-xl-0">
                    <Autocomplete
                      clearOnBlur
                      className="cursor-pointer"
                      value={selectedUser}
                      onChange={(event, value) => {
                        dispatch(selectUser(value));
                        // console.log("new",newValue)
                      }}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.id == value.id
                      }
                      inputValue={searchUser}
                      onInputChange={(event, inputValue) => {
                        setSearchUser(inputValue);
                        // console.log("input value", newInputValue);
                      }}
                      id="controllable-states"
                      options={users.length > 0 ? users : []}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select a User" required />
                      )}
                      renderOption={(props, option, index) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                          key={option.id}
                        >
                          <div style={{width:"40px", height: "60px", marginRight: "10px"}}>
                            <img
                              loading="lazy"
                              style={{width: "100%", height: "100%"}}
                              src={option.img}
                              alt=""
                            />
                          </div>
                          {option.name}
                        </Box>
                      )}
                    />
                  </Col>
                </Row>

                {/* PICKUP AND DROP LOCATION */}

                <Row className="my-xl-4 my-0">
                  <Col xl={6}>
                    <PlacesAutocomplete
                      value={pickupSelectedAddress}
                      onChange={handlePickupAddressChange}
                      onSelect={handlePickupAddressSelect}
                      onError={(error) => {
                        console.log(error);
                      }}
                      clearItemsOnError={true}
                      shouldFetchSuggestions={pickupSelectedAddress.length > 3}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <TextField
                            {...getInputProps({
                              placeholder: "Search Places ...",
                              className: "location-search-input",
                              //
                            })}
                            type="text"
                            required
                            id="outlined-required"
                            label="Pickup Location"
                            className="w-100"
                            value={pickupSelectedAddress}
                          />
                          <div
                            className="autocomplete-dropdown-container"
                            style={{
                              fontSize: "14px",
                              fontFamily: "emoji",
                              color: "black",
                            }}
                          >
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";

                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  // style={{padding: "20px 0px !important"}}
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                  key={index}
                                >
                                  <i
                                    className="ti-location-pin me-1"
                                    style={{ color: "black" }}
                                  />
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </Col>

                  <Col xl={6} className="my-4 my-xl-0">
                    <PlacesAutocomplete
                      value={dropSelectedAddress}
                      onChange={handleReturnAddressChange}
                      onSelect={handleDropAddressSelect}
                      onError={(error) => {
                        console.log(error);
                      }}
                      clearItemsOnError={true}
                      shouldFetchSuggestions={dropSelectedAddress.length > 3}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <TextField
                            {...getInputProps({
                              placeholder: "Search Places ...",
                              className: "location-search-input",
                              //
                            })}
                            type="text"
                            required
                            id="outlined-required"
                            label="Drop Location"
                            className="w-100"
                            value={dropSelectedAddress}
                          />
                          <div
                            className="autocomplete-dropdown-container"
                            style={{
                              fontSize: "14px",
                              fontFamily: "emoji",
                              color: "black",
                            }}
                          >
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";

                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#fafafa",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                  key={index}
                                >
                                  <i
                                    className="ti-location-pin me-1"
                                    style={{ color: "black" }}
                                  />
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </Col>
                </Row>

                {/* TRIP TYPE AND PICKUP TIME */}

                <Row>
                  <Col xl={6}>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Trip Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedTrip}
                          label="Select Trip"
                          onChange={(event) =>
                            dispatch(selectTrip(event.target.value))
                          }
                        >
                          <MenuItem value={"0"}>Single</MenuItem>
                          <MenuItem value={"1"}>Round</MenuItem>
                          <MenuItem value={"2"}>Round with Car Body</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Col>
                  <Col xl={6} className="my-4 my-xl-0">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} className="w-100" />
                        )}
                        label="Pickup Date and Time"
                        value={selectedPickupTime}
                        onChange={(newValue) => {
                          dispatch(selectPickupTime(newValue));
                        }}
                      />
                    </LocalizationProvider>
                  </Col>
                </Row>

                {/* RETURN DATE AND NOTE */}
                <Row className="my-xl-4 my-0">
                  {selectedTrip != 0 && (
                    <Col xl={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => (
                            <TextField {...props} className="w-100" />
                          )}
                          label="Return Date and Time"
                          value={selectedReturnTime}
                          onChange={(newValue) => {
                            dispatch(selectReturnTime(newValue));
                          }}
                        />
                      </LocalizationProvider>
                    </Col>
                  )}

                  <Col xl={6} className="my-4 my-xl-0">
                    <TextField
                      id="outlined-required"
                      label="Note"
                      className="w-100"
                      multiline
                      maxRows={4}
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  <Button
                    className="mt-5"
                    onClick={handleSubmit}
                    color="success"
                    style={{ width: "250px" }}
                  >
                    {loading ? (
                      <Spinner animation="border" variant="info" size="sm" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* <MyMapComponent isMarkerShown></MyMapComponent> */}
            {/* {Object.keys(pickupLatLng).length > 0 &&
              Object.keys(dropLatLng).length > 0 && <Directions pickupLatLng={pickupLatLng} dropLatLng={dropLatLng}></Directions>} */}

            <Row>
              <Col md={12}>
                <div
                  ref={mapRef}
                  className="map"
                  style={{ width: "100%", height: "250px" }}
                ></div>
              </Col>
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  .heading {
    color: red;
  }
`;

export default RideAdd;
