
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Col, Container, Row, Modal, Button, CardTitle, CardBody } from 'reactstrap';
import { removeAllSelectedGalleryImage } from '../../store/action/galleryAction';
import ImageSelectionDialog from '../Utility/ImageSelectionDialog';
// Form Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


const BannerPage = () => {


    return <React.Fragment>

        <div className="page-content">

            <Container fluid={true}>

              <Row>
              banner list
              </Row>

            </Container>


        </div>
    </React.Fragment>;
};

export default BannerPage;
