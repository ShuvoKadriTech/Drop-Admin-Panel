import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCarTypes } from "../../../store/Car/carTypes/carTypesAction";
import { selectCarType, selectPickupTime, selectReturnTime, selectTrip } from "../../../store/Ride/rideAction";
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
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";
// import { compose, withProps } from "recompose";

const RideAdd = () => {
  const dispatch = useDispatch();

  const { carTypes } = useSelector((state) => state.carTypesReducer);

  const { selectedCarType, selectedUser, selectedTrip, selectedPickupTime, selectedReturnTime } = useSelector(
    (state) => state.rideReducer
  );

  const { users } = useSelector((state) => state.usersReducer);

  const [searchCarType, setSearchCarType] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [pickupSelectedAddress, setPickupSelectedAddress] = useState("");
  const [pickupAddress, setPickupAddress] = useState({});
  const [pickupLatLng, setPickupLatLng] = useState({});
  const [dropSelectedAddress, setDropSelectedAddress] = useState("");
  const [dropAddress, setDropAddress] = useState({});
  const [dropLatLng, setDropLatLng] = useState({});
  


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
      // .then((results) => getLatLng(results[0]))
      .then((results) => {

        setPickupAddress(results[0])

        getLatLng(results[0])

      })
      .then((latLng) => setPickupLatLng(latLng))
      .catch((error) => console.error("Error", error));
  };

  // RETURN ADDRESS CHANGE 

  const handleReturnAddressChange = (address) => {
    // console.log("address", address);
    setDropSelectedAddress(address);
  };

  // RETURN ADDRESS SELECTED

  const handleReturnAddressSelect = (address, placeId) => {
    console.log("select-------------", address);
    setDropSelectedAddress(address);
    geocodeByAddress(address);
    geocodeByPlaceId(placeId)
      .then((results) => {
        setDropAddress(results[0])

        getLatLng(results[0])
        // console.log("drop address", results)
      })
      .then((latLng) => console.log(latLng))
      .catch((error) => console.error("Error", error));
  };


  // useEffect(()=>{
  //   if(Object.keys(dropLatLng).length > 0  && Object.keys(pickupLatLng).length > 0 ){
  //     console.log("pickup and drop ",pickupLatLng, dropLatLng)
  //   }
  // },[dropLatLng,pickupLatLng])

  const  calcdistance = (lat1, lon1, lat2, lon2) =>{
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }


  // SUBMIT RIDE DATA 

  const handleSubmit = () => {
    console.log("pickup latlng", pickupLatLng);
    console.log("drop latlng", dropLatLng);

  }


  // const MyMapComponent = compose(
  //   withProps({
  //     /**
  //      * Note: create and replace your own key in the Google console.
  //      * https://console.developers.google.com/apis/dashboard
  //      * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
  //      */
  //       googleMapURL: 
  //       "https://maps.googleapis.com/maps/api/js?key=AIzaSyAIs4-oHUknPIC3Aq0fcnKUEB1IhWQD31s&v=3.exp&libraries=geometry,drawing,places",
  //     loadingElement: <div style={{ height: `100%` }} />,
  //     containerElement: <div style={{ height: `400px` }} />,
  //     mapElement: <div style={{ height: `100%` }} />
  //   }),
  //   withScriptjs,
  //   withGoogleMap
  // )(props => (
  //   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
  //     {props.isMarkerShown && (
  //       <Marker position={{ lat: -34.397, lng: 150.644 }} />
  //     )}
  //   </GoogleMap>
  // ));


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
                        <TextField {...params} label="Select a Car Type" />
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
                        <TextField {...params} label="Select a User" />
                      )}
                      renderOption={(props, option, index) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                          key={option.id}
                        >
                          <img
                            loading="lazy"
                            width="60"
                            src={option.img}
                            alt=""
                          />
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
                      onError={error => {
                        console.log(error)
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
                          <div className="autocomplete-dropdown-container" style={{ fontSize: "14px", fontFamily: "emoji" }}>
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
                      onSelect={handleReturnAddressSelect}
                      onError={error => {
                        console.log(error)
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
                          <div className="autocomplete-dropdown-container" style={{ fontSize: "14px", fontFamily: "emoji" }}>
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
                          <MenuItem value={"1"}>Single</MenuItem>
                          <MenuItem value={"2"}>Round</MenuItem>
                          <MenuItem value={"3"}>Round with Car Body</MenuItem>
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
                  <Col xl={6} className="my-4 my-xl-0">
                    <TextField
                      id="outlined-required"
                      label="Note"
                      className="w-100"
                      multiline
                      maxRows={4}
                    />
                  </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                  <Button className='mt-5' onClick={handleSubmit} color="success" style={{ width: "250px" }}>

                    {/* {loading ?

                      <Spinner animation="border" variant="info" size='sm' />
                      : id ? "Edit" : "Add"

                    } */}
                    Add

                  </Button>
                </div>
              </CardBody>
            </Card>

              {/* <MyMapComponent isMarkerShown></MyMapComponent> */}

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
