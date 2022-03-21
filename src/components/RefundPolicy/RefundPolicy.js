import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Button, Card, CardBody, CardTitle, Col, Container, Form, Row } from 'reactstrap'
import GlobalWrapper from '../GlobalWrapper'

const RefundPolicy = ({title}) => {
  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
          <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">{title} Refund Policy</CardTitle>
                    <Form method="post">
                      <Editor
                        onChange={(editorState) => console.log(editorState)}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                      />
                    </Form>

                    <div className="button__wrapper py-4 text-center">
                      <Button color="success" className="btn btn-lg px-5">
                        SUBMIT
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </GlobalWrapper>
    </React.Fragment>
  )
}

export default RefundPolicy