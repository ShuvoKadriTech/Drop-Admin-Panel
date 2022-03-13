import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import GlobalWrapper from "../../../components/GlobalWrapper";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCarTypes } from "../../../store/Car/carTypes/carTypesAction";

const RideAdd = () => {

    const dispatch = useDispatch();

    const { carTypes, carFuels } = useSelector((state) => state.carTypesReducer);


    useEffect(()=>{
        if(carTypes.length < 1){
            dispatch(getCarTypes(true));
        }
    },[carTypes])

    return (
        <React.Fragment>
            <GlobalWrapper>

                <div className="page-content" >
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
                                            // value={selectedCarType}
                                            // onChange={(event, newValue) => {
                                            //     dispatch(selectCarType(newValue));
                                            //     // console.log("new",newValue)
                                            // }}
                                            getOptionLabel={(option) => option.name ? option.name : ""}
                                            isOptionEqualToValue={(option, value) =>
                                                option.id == value.id
                                            }
                                            // inputValue={searchCarType}
                                            // onInputChange={(event, newInputValue) => {
                                            //     setSearchCarType(newInputValue);
                                            //     // console.log("input value", newInputValue);
                                            // }}
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
                                    <Col xl={6}>
                                        <Autocomplete
                                            className="cursor-pointer"
                                            // value={selectedCarType}
                                            // onChange={(event, newValue) => {
                                            //     dispatch(selectCarType(newValue));
                                            //     // console.log("new",newValue)
                                            // }}
                                            getOptionLabel={(option) => option.name ? option.name : ""}
                                            isOptionEqualToValue={(option, value) =>
                                                option.id == value.id
                                            }
                                            // inputValue={searchCarType}
                                            // onInputChange={(event, newInputValue) => {
                                            //     setSearchCarType(newInputValue);
                                            //     // console.log("input value", newInputValue);
                                            // }}
                                            id="controllable-states-demo"
                                            // options={carTypes.length > 0 ? carTypes : []}
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Select a User" />
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


.heading{
  color: red;
}


`

export default RideAdd;
