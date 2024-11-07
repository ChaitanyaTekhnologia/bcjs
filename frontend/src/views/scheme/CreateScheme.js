import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import CreateSchemeValidation from '../validation/CreateShemeValidation'
import { useDispatch } from "react-redux";
import { createScheme, createBcdate } from "../store/schemeSlice";
import { useNavigate } from "react-router-dom";

const CreateScheme = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    sch_name: "",
    sch_starting_date: "",
    sch_month: "",
    sch_amount_per_head: "",
    sch_commission: "",
    sch_total: 0, // Initialize with 0
    sch_fiexd_total: 0, // Initialize with 0
    sch_status: "",
    sch_commission_amount: "",
  });

  const bgcolo = {
    backgroundColor: '#00bcd4',
    color: 'black'
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [value.sch_month, value.sch_amount_per_head]);

  const calculateTotalAmount = () => {
    const months = parseInt(value.sch_month) || 0;
    const amountPerHead = parseFloat(value.sch_amount_per_head) || 0; // Use parseFloat for decimal values
    const total = months * amountPerHead;
    setTotalAmount(total);
    setValue(prev => ({
      ...prev,
      sch_total: total,
      sch_fiexd_total: total,
    }));
  };

  const handleInput = (e) => {
    const { name, value: inputValue, type } = e.target;
    setValue(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(inputValue) : inputValue,
      sch_total: totalAmount,
      sch_fiexd_total: totalAmount,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = CreateSchemeValidation(value);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {



        console.log("object")
        console.log(value);
        console.log("object")
        
        const response = await dispatch(createScheme(value)).unwrap();
        setModalMessage(response.message);
        setShowModal(true);

        // Reset form values after successful submission
        await dispatch(createBcdate()).unwrap();
        setValue({
          sch_name: "",
          sch_starting_date: "",
          sch_month: "",
          sch_amount_per_head: "",
          sch_commission: "",
          sch_total: 0,
          sch_fiexd_total: 0,
          sch_status: "",
          sch_commission_amount: "",
        });
      } catch (error) {
        setModalMessage("Error creating scheme: " + error.message);
        setShowModal(true);
      }
    } else {

      // setModalMessage( JSON.stringify(validationErrors));
      // setShowModal(true);
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
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Starting Date<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="sch_starting_date"
                      value={value.sch_starting_date}
                      onChange={handleInput}
                      placeholder="Enter starting date"
                      required
                    />
                    {errors.sch_starting_date && (
                      <span className="text-danger">
                        {errors.sch_starting_date}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Number Of Months<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="sch_month"
                      value={value.sch_month}
                      onChange={handleInput}
                      placeholder="Enter number of months"
                      required
                    />
                    {errors.sch_month && (
                      <span className="text-danger">{errors.sch_month}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Amount Per Head<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="sch_amount_per_head"
                      value={value.sch_amount_per_head}
                      onChange={handleInput}
                      placeholder="Enter amount per head"
                      required
                    />
                    {errors.sch_amount_per_head && (
                      <span className="text-danger">
                        {errors.sch_amount_per_head}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={totalAmount}
                      placeholder="Total Amount"
                      readOnly
                    />
                  </Form.Group>
                </Col>

                <Col sm={6} className="flex-column d-flex pt-1">
                  <Form.Group>
                    <Form.Label>
                      Select Commission or Amount<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="sch_status"
                      value={value.sch_status}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select option</option>
                      {["Scheme Brokerage Amount", "Scheme Brokerage"].map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              {value.sch_status === "Scheme Brokerage Amount" && (
                <Row className="justify-content-between text-left m-0 pb-2">
                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Scheme Brokerage Amount<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="sch_commission_amount"
                        value={value.sch_commission_amount}
                        onChange={handleInput}
                        placeholder="Enter Brokerage Amount"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}
              {value.sch_status === "Scheme Brokerage" && (
                <Row className="justify-content-between text-left m-0 pb-2">
                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Scheme Brokerage<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="sch_commission"
                        value={value.sch_commission}
                        onChange={handleInput}
                        placeholder="Enter Scheme Commission"
                        required
                      />
                        {errors.sch_commission && (
                      <span className="text-danger">
                        {errors.sch_commission}
                      </span>
                    )}
                    </Form.Group>
                  </Col>
                </Row>
              )}

              <Row className="justify-content-center m-0 pt-2">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" style={bgcolo} className="btn-block">
                    SUBMIT
                  </Button>
                </Col>
              </Row>
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

export default CreateScheme
