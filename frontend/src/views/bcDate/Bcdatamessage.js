import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getbcNo, sendbcdatemessge } from "../store/apiService";

const Bcdatamessage = () => {
  const [data, setData] = useState([]);
  const { schemeId } = useParams();

  console.log(schemeId);

  const bgcolo = {
    backgroundColor: "#00bcd4",
    color: "black",
  };

  const [value, setValue] = useState({
    bc_date: "",
    bc_no: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getbcNo({ sch_id: schemeId });
        setData(res.data); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching BC numbers:", error);
      }
    };

    if (schemeId) {
      fetchData();
    }
  }, [schemeId]);

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendbcdatemessge({
        sch_id: schemeId,
        bcno: value.bc_no,
        date: value.bc_date,
      });
      setValue({
        bc_date: "",
        bc_no: "",
      });
     
    } catch (error) {
      console.log(error);
    }

    setModalMessage("Messge send successfully!");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={10} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Send BCDate Message</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-3 pt-3">
                <Col sm={12} lg={6} className="flex-column d-flex pt-1">
                  <Form.Group>
                    <Form.Label>
                      Bc NO<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="bc_no"
                      value={value.bc_no}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select Bc NO</option>
                      {data.map((bc, index) => (
                        <option key={index} value={bc.bc_no}>
                          {bc.bc_no}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col sm={12} lg={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Date<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="bc_date"
                      value={value.bc_date}
                      onChange={handleInput}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-center m-0 pt-3">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" style={bgcolo} className="btn-block">
                    Send Message
                  </Button>
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

export default Bcdatamessage;
