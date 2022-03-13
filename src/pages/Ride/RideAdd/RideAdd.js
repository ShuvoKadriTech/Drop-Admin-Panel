import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCarTypes } from "../../../store/Car/carTypes/carTypesAction";
import { selectCarType } from "../../../store/Ride/rideAction";
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

const RideAdd = () => {
  const dispatch = useDispatch();

  const { carTypes } = useSelector((state) => state.carTypesReducer);

  const { selectedCarType, selectedUser } = useSelector(
    (state) => state.rideReducer
  );

  const { users } = useSelector((state) => state.usersReducer);

  const [searchCarType, setSearchCarType] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (carTypes.length < 1) {
      dispatch(getCarTypes(true));
    }
    if (users.length < 1) {
      dispatch(usersList());
    }
  }, [carTypes, users]);

  const handleChange = (address) => {
    // console.log("address", address);
    setAddress(address);
  };

  const handleSelect = (address, placeId, suggestion) => {
    // console.log("select-------------", address, placeId, suggestion);
    geocodeByAddress(address);
    geocodeByPlaceId(placeId)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

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
                      value={address}
                      onChange={handleChange}
                      onSelect={handleSelect}
                      shouldFetchSuggestions={address.length > 3}
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
                            })}
                            type="text"
                            required
                            id="outlined-required"
                            label="Pickup"
                            className="w-100"
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
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
                  <Col></Col>
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
                          // value={statusKey}
                          label="Select Trip"
                          // onChange={(event) =>
                          //   dispatch(updateStatusKey(event.target.value))
                          // }
                        >
                          <MenuItem value={"1"}>Single</MenuItem>
                          <MenuItem value={"2"}>Round</MenuItem>
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
                        // value={value}
                        // onChange={(newValue) => {
                        //   setValue(newValue);
                        // }}
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
                        // value={value}
                        // onChange={(newValue) => {
                        //   setValue(newValue);
                        // }}
                      />
                    </LocalizationProvider>
                  </Col>
                  <Col xl={6} className="my-4 my-xl-0">
                    <TextField
                      required
                      id="outlined-required"
                      label="Note"
                      className="w-100"
                      multiline
                      maxRows={4}
                    />
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

const Wrapper = styled.div`
  .heading {
    color: red;
  }
`;

export default RideAdd;
