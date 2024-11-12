

import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMembers,
  addMember,
  fetchAllMembers,
  clearMembers,
  deletememberScheme,
} from "../store/memberSlice1";
import { checkstatus, fetchnoofmember } from "../store/apiService";

const CreateMember1 = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member.members1);
  const members = useSelector((state) => state.member.members);
  const status1 = useSelector((state) => state.member.status);
  const error = useSelector((state) => state.member.error);

  const [checkvalue, setCheckvalue] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(members1);
  const [value, setValue] = useState({
    mem_name: "",
    sch_id: schemeId,
  });
  const [showForm, setShowForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);


  const [noofmonthe,setNoofmonth]=useState(0)

  const dropdownRef = useRef(null);

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };
const fetchNOofmember=async()=>{
  const response=await fetchnoofmember(value)
  console.log(response.data)
  setNoofmonth(response.data)
}



useEffect(()=>{
  fetchNOofmember({ sch_id: schemeId})
},[])

  const statuscheck = async () => {
    const res = await checkstatus(schemeId);
    setCheckvalue(res[0].bc_status);
  };

  useEffect(() => {
    statuscheck();
  }, [schemeId]);

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  useEffect(() => {
    if (schemeId) {
      dispatch(clearMembers());
      dispatch(fetchMembers({ sch_id: schemeId }));
    }
  }, [schemeId, dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = members1.filter((member) =>
        member.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
      setShowDropdown(filtered.length > 0);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, members1]);

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      const value1 = {
        schmem_id: id,
      };
      await dispatch(deletememberScheme(value1));
      dispatch(fetchMembers({ sch_id: schemeId }));
    } catch (error) {
      console.error("Error deleting member: ", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const existingMember = members.some(
  //     (member) => member.mem_name === value.mem_name
  //   );

  //   if (existingMember) {
  //     setModalMessage("Member already exists. Do you want to add anyway?");
  //     setConfirmModal(true);
  //   } else {
  //     await addNewMember();
  //   }
  // };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Check if mem_name is empty
  //   if (!value.mem_name) {
  //     setModalMessage("Please select a member before adding.");
  //     setShowModal(true);
  //     return;
  //   }
  
  //   const existingMember = members.some(
  //     (member) => member.mem_name === value.mem_name
  //   );
  
  //   if (existingMember) {
  //     setModalMessage("Member already exists. Do you want to add anyway?");
  //     setConfirmModal(true);
  //   } else {
  //     await addNewMember();
  //   }
  // };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the limit has been reached
    if (members.length >= noofmonthe) {
      setModalMessage("Member limit reached. Cannot add more members.");
      setShowModal(true);
      return;
    }
  
    // Check if mem_name is empty
    if (!value.mem_name) {
      setModalMessage("Please select a member before adding.");
      setShowModal(true);
      return;
    }
  
    const existingMember = members.some(
      (member) => member.mem_name === value.mem_name
    );
  
    if (existingMember) {
      setModalMessage("Member already exists. Do you want to add anyway?");
      setConfirmModal(true);
    } else {
      await addNewMember();
    }
  };
  
  const addNewMember = async () => {
    await dispatch(addMember(value)).then(() => {
      if (status1 === "succeeded") {
        setModalMessage("Member added successfully!");
      } else if (status1 === "failed") {
        setModalMessage("Failed to add member. Please try again.");
      }
      setShowModal(true);
    });

    dispatch(fetchMembers({ sch_id: schemeId }));
    setValue({
      mem_name: "",
      sch_id: schemeId,
    });
    setSearchTerm("");
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleSelectMember = (member) => {
    setValue({ ...value, mem_name: member });
    setSearchTerm(member);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirmModal = () => setConfirmModal(false);
  const handleConfirmAdd = async () => {
    setConfirmModal(false);
    await addNewMember();
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <div className="container">
        <Row>
          <Col className="text-end pe-lg-5">
            <Button style={{ backgroundColor: "#00bcd4", color: "black" }} onClick={toggleForm}>
              {showForm ? "Hide Form" : "Add Member"}
            </Button>
          </Col>
        </Row>
      </div>

      {showForm && (
        <Row className="justify-content-center m-0">
          <Col xl={10} lg={12} md={10} sm={11} xs={12}>
            <div className="card">
              <h1 className="text-center mb-4 Heading_form">
                <strong>Add Member</strong>
              </h1>
              <Form onSubmit={handleSubmit}>
                <Row className="justify-content-between text-left m-0 pb-2">
                  <Col sm={6} className="flex-column d-flex">
                    <Form.Group>
                      <Form.Label>
                        Search Name<span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Search Member Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={() => setShowDropdown(true)}
                      />
                      {showDropdown && (
                        <ul
                          className="dropdown-list list-unstyled border rounded shadow"
                          style={{
                            position: "absolute",
                            zIndex: 1000,
                            maxHeight: "160px",
                            overflowY: "auto",
                            marginTop: "5px",
                            width: "45%",
                            backgroundColor: "#202020",
                          }}
                          ref={dropdownRef}
                        >
                          {filteredMembers.map((member, index) => (
                            <li
                              className="dropdown-item p-1 ps-3"
                              key={index}
                              onClick={() => handleSelectMember(member)}
                            >
                              {member}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Form.Group>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <div className="pt-4 d-flex justify-content-center">
                      <div className="d-flex flex-wrap">
                        {checkvalue === 0 && (
                          <Button
                            type="submit"
                            style={{ backgroundColor: "#00bcd4", color: "black" }}
                            className="btn-block mb-2 me-2"
                          >
                            ADD MEMBER
                          </Button>
                        )}
                        <Button
                          type="button"
                          style={{ backgroundColor: "#00bcd4", color: "black" }}
                          className="btn-block mb-2"
                          onClick={() => navigate("/agency/createmember")}
                        >
                          CREATE
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      )}

      {/* Confirmation Modal */}
      <Modal show={confirmModal} onHide={handleCloseConfirmModal}>
    
          <Modal.Title className="text-center pt-3">Confirm</Modal.Title>

        <Modal.Body className="text-center">{modalMessage}</Modal.Body>
        <div className=" d-flex justify-content-center pe-4 pb-2  ">
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancel
          </Button>
          <span className="ps-2"/>
          <Button style={bgcolo}  onClick={handleConfirmAdd}>
            Add 
          </Button>
          </div>
      </Modal>

      {/* Success/Error Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>

          <Modal.Title className="text-center pt-3">Confirm</Modal.Title>
  
        <Modal.Body className="text-center">{modalMessage}</Modal.Body>

        <div className=" d-flex justify-content-center pe-4 pb-2  ">
          <Button style={bgcolo} onClick={handleCloseModal}>
            Close
          </Button>
          </div>
      </Modal>

      <div className="container">
        <div className="py-4">
          <div className="table-responsive">
            {members.length === 0 ? (
              <div className="text-center">No data available</div>
            ) : (
              <table className="table border shadow">
                <thead>
                  <tr className="text-center p-2">
                    <th scope="col">SR.NO</th>
                    <th scope="col">Member Name</th>

                    {checkvalue === 0 && (
                    <th scope="col">Action</th>
                    )}
                    

                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr className="text-center" key={member.mem_id}>
                      <td>{index + 1}</td>
                      <td>{member.mem_name}</td>
                      <td>




      
                      

             {checkvalue === 0 && (
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(member.schmem_id)}
                        >
                          Delete
                        </Button>  )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateMember1;
