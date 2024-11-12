import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import CreateSchemeValidation from '../validation/CreateShemeValidation';
import { useDispatch } from "react-redux";
import { createScheme, createBcdate } from "../store/schemeSlice";
import { useNavigate } from "react-router-dom";

const CreateScheme = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    sch_name: "",
  });




  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = CreateSchemeValidation(value);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setModalMessage(response.message);
        setShowModal(true);
        setValue({
          sch_name: "",
        });
      } catch (error) {
        setModalMessage("Error creating scheme: " + error.message);
        setShowModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
    navigate("/agency");
  };

  return (
    <Container fluid className="px-1 py-5 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={8} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Create Scheme</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Scheme Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="sch_name"
                      value={value.sch_name}
                      onChange={handleInput}
                      placeholder="Enter your scheme name"
                      required
                    />
                    {errors.sch_name && (
                      <span className="text-danger">{errors.sch_name}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              {/* Add any other input fields here */}
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </div>
        </Col>
      </Row>

      <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
        <p className="text-center pt-4 fs-4">Message</p>
        <p className="text-center fs-5 pt-2">{modalMessage}</p>
        <div className="d-flex justify-content-center">
          <Button variant="primary" className="w-50" onClick={handleCloseModal}>
            Close
          </Button>
        </div>
        <div className="pb-5"></div>
      </Modal>
    </Container>
  );
};

export default CreateScheme;
