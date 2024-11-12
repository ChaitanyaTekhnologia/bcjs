import React, { useState } from "react";

import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {changePassword} from '../../store/forgotapi'

const ChangePassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  const [values, setValues] = useState({
    user_email: email,
    newPassword: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate passwords match
      if (values.newPassword !== values.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
const response=await changePassword( {
  userEmail: values.user_email,
  newPassword: values.newPassword,
})


      // Check response and handle accordingly
      if (response.status === true) {
        // Show success modal
        setShowModal(true);
      } else {
        // Handle error or show message
        alert("Failed to change password.");
      }
    } catch (error) {
      // Handle error
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col lg={5} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Change Password</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col lg={12} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Enter New Password<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleInput}
                      required
                      placeholder="Enter New Password"
                    />
                  </Form.Group>
                </Col>
                <Col className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Confirm Password<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleInput}
                      required
                      placeholder="Confirm Password"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center m-0 pt-3">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" style={bgcolo} className="btn-block">
                    Change Password
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Password Changed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your password has been changed successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ChangePassword;
