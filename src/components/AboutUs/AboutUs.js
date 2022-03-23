import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
} from "reactstrap";
import GlobalWrapper from "../GlobalWrapper";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useDispatch } from "react-redux";
import { addPolicy } from "./../../store/Policy/policyAction";

const AboutUs = ({ title }) => {
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });

  const [value, setValue] = useState("");

  const updateDescription = async (state) => {
    // console.log("state value---", state);
    await setEditorState(state);
    const data = convertToRaw(state.getCurrentContent()).blocks;
    const text = data
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");
    setValue(text);
  };

  const handleSubmit = () => {
    const data = {
      type: title + "AboutUs",
      value: value,
    };

    dispatch(addPolicy(data));
  };

  return (
    <React.Fragment>
      <GlobalWrapper>
        <div className="page-content">
          <Container fluid={true}>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">{title} About Us</CardTitle>
                    <Form method="post">
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={updateDescription}
                      />
                    </Form>

                    <div className="button__wrapper py-4 text-center">
                      <Button
                        color="success"
                        className="btn btn-lg px-5"
                        onClick={handleSubmit}
                      >
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
  );
};

export default AboutUs;
