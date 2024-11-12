import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Container, Modal } from "react-bootstrap";
import { fetchMasterData, deleteMember } from "../store/apiService";
import { updateMember } from "../store/selectedMemberSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateMemberValidation from "../validation/CreateMemberValidation";

const MaterDatatable = () => {
  const memberData1 = useSelector((state) => state.selectedMember.memberData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [value, setValue] = useState({
    mem_id: "",
    mem_name: "",
    mem_mobile: "",
    mem_address: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [message, setMessage] = useState();
  const bgcolo = {
    backgroundColor: "#1ddcc7", // Background color
    color: "black", // Text color
  };
  const bgcolor1 = {
    backgroundColor: "red", // Background color
    color: "black", // Text color
  };
  const [errors, setErrors] = useState({});

  const handleDelete = async (id) => {
    setShowDeleteModal(true);
    setMemberToDelete(id);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteMember({ id });
      fetchMemberData(); // Refresh the member data after deletion
      setShowDeleteModal(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error("Error deleting member: ", error);
      setError(error.message);
    }
  };

  const fetchMemberData = async () => {
    try {
      const data = await fetchMasterData();
      setMemberData(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, [memberData1]); // Re-fetch data when memberData1 changes

  const handleUpdate = async (member) => {
    setSelectedMember(member);
    setValue({
      mem_id: member.mem_id,
      mem_name: member.mem_name,
      mem_mobile: member.mem_mobile,
      mem_address: member.mem_address,
    });
  };

  const handleInput = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = CreateMemberValidation(value);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await dispatch(updateMember(value)).unwrap();

        if (response.status === false) {
          setShowModal(true);
          setModalMessage(response.message);
        }

        if (response.status) {
          setModalMessage(response.message);
          setValue({
            mem_id: "",
            mem_name: "",
            mem_mobile: "",
            mem_address: "",
          });
          // setShowModal(true);
          setSelectedMember(null);
          fetchMemberData();
        }
      } catch (error) {
        setModalMessage("Update the field");
      }
    }

    // setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <div className="container">
      {selectedMember ? (
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
                          name="mem_name"
                          value={value.mem_name}
                          onChange={handleInput}
                          placeholder="Enter member name"
                          required
                        />
                        {errors.mem_name && (
                          <span className="text-danger">{errors.mem_name}</span>
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
                          name="mem_mobile"
                          value={value.mem_mobile}
                          onChange={handleInput}
                          placeholder="Enter member mobile no"
                          required
                        />
                        {errors.mem_mobile && (
                          <span className="text-danger">
                            {errors.mem_mobile}
                          </span>
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
                          name="mem_address"
                          value={value.mem_address}
                          onChange={handleInput}
                          placeholder="Enter member address"
                          required
                        />
                        {errors.mem_address && (
                          <span className="text-danger">
                            {errors.mem_address}
                          </span>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center m-0 pt-2">
                    <Col className="d-flex justify-content-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className="btn-block"
                      >
                        SUBMIT
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <Button
                        variant="secondary"
                        className="btn-block"
                        onClick={() => setSelectedMember(null)}
                      >
                        CANCEL
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
              <Button
                variant="primary"
                className="w-50"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </div>
            <div className="pb-5"></div>
          </Modal>
        </Container>
      ) : (
        <div>
          <Row className="m-0">
            <Col lg={12} className="text-center">
              <h2 className="pb-2">All Member Table</h2>
            </Col>
            <Col className="text-end pe-lg-5">
              <Button
                variant="info"
                onClick={() => navigate("/agency/createmember")}
              >
                Add Member
              </Button>
            </Col>
          </Row>
          <div className="py-4">
            <div className="table-responsive">
              {error && <p>Error: {error}</p>}
              <table className="table border shadow">
                <thead>
                  <tr className="text-center">
                    <th className="" scope="col">
                      SR.NO
                    </th>
                    <th className="" scope="col">
                      Name
                    </th>
                    <th className="" scope="col">
                      Mobile NO
                    </th>
                    <th className="" scope="col">
                      Address
                    </th>
                    <th className="" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberData.map((member, index) => (
                    <tr className="text-center" key={member.mem_id}>
                      <th scope="row">{index + 1}</th>
                      <td>{member.mem_name}</td>
                      <td>{member.mem_mobile}</td>
                      <td>{member.mem_address}</td>
                      <td>
                        <Button
                          className="btn mx-2 mb-2 mb-md-0"
                          style={bgcolo}
                          onClick={() => handleUpdate(member)}
                        >
                          Edit
                        </Button>

                        {/* 
                        <Button
                          className="btn mx-2 mb-2 mb-md-0"
                          style={bgcolor1}
                          onClick={() => handleDelete(member.mem_id)}
                        >
                          Delete
                        </Button> */}
                        {!(member.mem_id == 1 || member.mem_id == 2) && (
                          <Button
                            className="btn mx-2 mb-2 mb-md-0"
                            style={bgcolor1}
                            onClick={() => handleDelete(member.mem_id)}
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <div className="fs-3 pt-3">
          <p className="text-center">Confirm Deletion</p>
        </div>

        <div>
          <p className="text-center p-2 fs-5">
            Are you sure you want to delete this member?
          </p>
        </div>

        <div className=" d-flex justify-content-center pb-4">
          <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <span className="pe-3"> </span>
          <Button
            variant="danger"
            onClick={() => handleDeleteConfirm(memberToDelete)}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MaterDatatable;
