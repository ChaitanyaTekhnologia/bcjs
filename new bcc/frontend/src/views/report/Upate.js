import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCommission ,updatetTotal} from "../store/updateSlice";
import { useNavigate, useParams } from "react-router-dom";


const Upate = () => {
  const { schemeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(schemeId);
  const [value, setValue] = useState({
    sch_status: "",
    sch_commission: "",
    sch_commission: "",
    sch_id: schemeId,
  });
  const bgcolo = {
    backgroundColor: '#00bcd4', // Background color
    color: 'black' // Text color
  };
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    try {
      //   await dispatch(sendAdditionalData()).unwrap();

      await dispatch(updateCommission(value)).unwrap();
      await dispatch(updatetTotal({sch_id:schemeId})).unwrap();
      setShowModal(true);
      setModalMessage("Update value succefully");
      setValue({
        sch_status: "",
        sch_commission: "",
        sch_commission: "",
        sch_id: "schemeId",
      });
    } catch (error) {
      setModalMessage( (error.message || error));
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const handlenavigate = () => {
    navigate(`/agency/beading/${schemeId}`);
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={8} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Change Commission or Amount</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6} className="flex-column d-flex pt-1">
                  <Form.Group>
                    <Form.Label>
                      Select Brokerage or Amount
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="sch_status"
                      value={value.sch_status}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select option</option>
                      {[
                        "Change Brokerage Amount",
                        "Change Scheme Brokerage",
                      ].map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                {value.sch_status === "Change Brokerage Amount" && (
                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Scheme Amount<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="sch_commission_amount"
                        value={value.sch_commission_amount}
                        onChange={handleInput}
                        placeholder="Enter Scheme Amount"
                        required
                      />
                    </Form.Group>
                  </Col>
                )}
                {value.sch_status === "Change Scheme Brokerage" && (
                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Scheme Commission<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="sch_commission"
                        value={value.sch_commission}
                        onChange={handleInput}
                        placeholder="Enter Scheme commisson"
                        required
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <Row className="justify-content-center m-0 pt-2">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" style={bgcolo} className="btn-block">
                    SUBMIT
                  </Button>
                  <div className="ps-3">
                    <Button
                      style={bgcolo}
                      className="btn-block"
                      onClick={handlenavigate}
                    >
                      Back
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center fs-5">{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Upate;
