import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../store/selectedMemberSlice";
import CreateMemberValidation from "../validation/CreateMemberValidation";
import "./createMember.css";

const EditMember = () => {
  const dispatch = useDispatch();
  const selectedMemberId = useSelector((state) => state.selectedMember.selectedMemberId);
  const members = useSelector((state) => state.member.members);
  const selectedMember = members.find((member) => member.id === selectedMemberId) || {};

  console.log(selectedMemberId);
  
  const [value, setValue] = useState({
    member_id: selectedMemberId,
    m_name: selectedMember.m_name || "",
    m_mobile: selectedMember.m_mobile || "",
    m_address: selectedMember.m_address || "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (selectedMemberId && selectedMember) {
      setValue({
        member_id: selectedMemberId,
        m_name: selectedMember.m_name || "",
        m_mobile: selectedMember.m_mobile || "",
        m_address: selectedMember.m_address || "",
      });
    }
  }, [selectedMemberId, selectedMember]);

  const handleInput = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = CreateMemberValidation(value);
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {




  //     try {

  //       // const formattedValue = {
  //       //   ...value,
  //       //   m_mobile: `+91${value.m_mobile}`,
  //       // };
  

  //       console.log("object",value)
  //       const response = await dispatch(updateMember(value));
  //       setModalMessage(response.message);
  //       setShowModal(true);

  //       if (response.status === true) {
  //         // Reset form values after successful submission
  //         setValue({
  //           member_id: selectedMemberId,
  //           m_name: "",
  //           m_mobile: "",
  //           m_address: "",
  //         });
  //       }
  //     } catch (error) {
  //       // Show modal with error message
  //       setModalMessage("Error updating member: " + error.message);
  //       setShowModal(true);
  //     }
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = CreateMemberValidation(value);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Format the mobile number to include the country code
        const formattedValue = {
          ...value,
          m_mobile: `+91${value.m_mobile}`, // Add +91 prefix to mobile number
        };
  
        console.log("Submitting:", value.m_mobile); // Log the formatted value for debugging
        const response = await dispatch(updateMember(formattedValue));
        setModalMessage(response.message);
        setShowModal(true);
  
        if (response.status === true) {
          // Reset form values after successful submission
          setValue({
            member_id: selectedMemberId,
            m_name: "",
            m_mobile: "",
            m_address: "",
          });
        }
      } catch (error) {
        // Show modal with error message
        setModalMessage("Error updating member: " + error.message);
        setShowModal(true);
      }
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <Container fluid className="px-1 py-5 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={8} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Update Field Member</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Member Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="m_name"
                      value={value.m_name}
                      onChange={handleInput}
                      placeholder="Enter member name"
                      required
                    />
                    {errors.m_name && (
                      <span className="text-danger">{errors.m_name}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Mobile No<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="m_mobile"
                      value={value.m_mobile}
                      onChange={handleInput}
                      placeholder="Enter member mobile no"
                      required
                    />
                    {errors.m_mobile && (
                      <span className="text-danger">{errors.m_mobile}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Address<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="m_address"
                      value={value.m_address}
                      onChange={handleInput}
                      placeholder="Enter member address"
                      required
                    />
                    {errors.m_address && (
                      <span className="text-danger">{errors.m_address}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center m-0 pt-2">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" variant="primary" className="btn-block">
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Modal for success or error message */}
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

export default EditMember;
