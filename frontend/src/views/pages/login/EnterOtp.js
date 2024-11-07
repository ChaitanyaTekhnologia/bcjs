import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {verifyotp} from '../../store/forgotapi'

const EnterOtp = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  
  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  const [value, setValue] = useState({
    user_otp: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const newvalue={
        userEmail: email,
        otp: value.user_otp,
      }

      // const res = await axios.post('http://localhost:3002/verifyotp', newvalue);

      const res=await verifyotp(newvalue)

      if (res.status === true) {
        navigate(`/changepassword/${email}`);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col lg={5} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Forgot Password</strong>
            </h1>
            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Enter OTP <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="user_otp"
                      value={value.user_otp}
                      onChange={handleInput}
                      required
                      placeholder="Enter OTP"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center m-0 pt-3">
                <Col className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    style={bgcolo}
                    className="btn-block"
                    disabled={!value.user_otp.trim()}
                  >
                    Confirm
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

export default EnterOtp;
