import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, sendAdditionalData } from "../store/paymentSlice";
import { fetchAllMembers } from "../store/memberSlice1";
import { fetchSchemeName } from "../store/winnersSlice";
import axios from "axios"; // Ensure axios is imported
import { currentbalance, transferamount } from "../store/apiService";

const TransferAmount = () => {
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member?.members1 || []);

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  const [value, setValue] = useState({
    from_name: "",
    to_name: "",
    amount: "",
    p_date: "",
    remark: "",
  });
  const [name, setName] = useState([]); // For storing the response from the API
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); // Updated state for total amount
  const [searchTerm, setSearchTerm] = useState("");





    
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getFullYear()).slice(-2)}`;

    const month = formattedDate
      ? new Date(formattedDate).toISOString().split("T")[0]
      : "";
    console.log(formattedDate);
    setValue((prevValue) => ({
      ...prevValue,
      p_date: month,
    }));
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllMembers());
      await dispatch(fetchSchemeName());
    };
    fetchData();
  }, [dispatch]);

  const getCurrentAmount = async (name) => {
    // Call the API when the member name is selected
    try {
      const response = await currentbalance({
        mem_name: name,
      });

      const data = response.data || [];
      setName(response);
      console.log(data);
      // Calculate the total amount based on fetched data
      const total = data.reduce((sum, item) => sum + item.amount, 0);
      console.log(total);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching data for selected member:", error);
    }
  };
  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "from_name") {
      getCurrentAmount(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const newvalue = {
            v_date: value.p_date,
            v_amount: value.amount,
          };
    
          await dispatch(sendAdditionalData(newvalue)).unwrap();

      console.log("submited vaues ", value);

        const response= await transferamount({mem_name1:value.from_name,mem_name2:value.to_name,amount:value.amount,remark:value.remark})

        console.log(response)


      setModalMessage("Payment is done");
      setShowModal(true);
      setValue({
        from_name: "",
        to_name: "",
        amount: "",
        p_date: "",
        remark: "",
      });
      setTotalAmount(0);
    } catch (error) {
      setModalMessage("Error creating payment: " + (error.message || error));
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  // Filtered list based on search term
  const filteredMembers = members1.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={10} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>New Payment</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-3">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label className="pb-1">
                      From<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="from_name"
                      value={value.from_name}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Transfer From</option>
                      {members1.map((name1, index) => (
                        <option key={index} value={name1}>
                          {name1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label className="pb-1">
                      To<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="to_name"
                      value={value.to_name}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Transfer To</option>
                      {members1.map((name1, index) => (
                        <option key={index} value={name1}>
                          {name1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-between text-left m-0 pb-3 pt-1">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>
                      Current Amount<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="totalamount"
                      value={totalAmount} // Set from the calculated total
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label>
                      Amount<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={value.amount}
                      onChange={handleInput}
                      placeholder="Enter Amount"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-between text-left m-0 pb-3 pt-1">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Date<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="p_date"
                      value={value.p_date}
                      onChange={handleInput}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Remark<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="remark"
                      value={value.remark}
                      onChange={handleInput}
                      placeholder="Write Remark"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-center m-0 pt-3">
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

export default TransferAmount;
