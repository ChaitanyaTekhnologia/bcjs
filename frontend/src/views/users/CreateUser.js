
      import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./createUsers.css";
import { CFormControlValidation } from "@coreui/react";
import CreateAgencyValidation from "../validation/CreateAgencyValidation";

const CreateUser = () => {
  const [value, setValue] = useState({
    name: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const handleInput = (e) => {
    setValue((pre) => ({
      ...pre,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(CreateAgencyValidation(value));
  };
  return (
    <Container fluid className="px-1 py-5 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={8} md={9} sm={11} xs={12} className="">
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Create Users</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      First Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="fname"
                      name="fname"
                      onChange={handleInput}
                      placeholder="Enter your Agency name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                    Last Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Enter your last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-between text-left m-0 pb-2 ">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Business email<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                    {error.email && (
                      <span className="text-danger">{error.email}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Phone number<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="mob"
                      name="mob"
                      placeholder="Enter your phone number"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-between text-left m-0">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Amount<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="job"
                      name="job"
                      placeholder="Enter your job title"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-center m-0 pt-2">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" variant="primary" className="btn-block">
                    CREATE AGENCY
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;

   