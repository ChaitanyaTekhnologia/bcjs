// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import "./createMember.css";
// import CreateMemberValidation from "../validation/CreateMemberValidation";
// import { useDispatch } from "react-redux";
// import { createMember } from "../store/memberSlice"; // Ensure the correct import for the createMember action
// import { useNavigate } from "react-router-dom";

// const CreateMember = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [value, setValue] = useState({
//     mem_name: "",
//     mem_mobile: "",
//     mem_address: "",
//   });
//   const bgcolo = {
//     backgroundColor: '#00bcd4', // Background color
//     color: 'black' // Text color
//   };
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const handleInput = (e) => {
//     setValue((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = CreateMemberValidation(value);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await dispatch(createMember(value)).unwrap();

//         // Show modal with success or error message
//         setModalMessage(response.message);
//         setShowModal(true);

//         if (response.status === true) {
//           setValue({
//             mem_name: "",
//             mem_mobile: "",
//             mem_address: "",
//           });

//           // Navigate to a different page if needed
//           // navigate('/agency/createmember')
//         }
//       } catch (error) {
//         // Show modal with error message
//         setModalMessage("Error creating member: " + error.message);
//         setShowModal(true);
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setModalMessage("");
//   };

//   return (
//     <Container fluid className="px-1 py-5 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={8} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Create Member</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Member Name<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mem_name"
//                       value={value.mem_name}
//                       onChange={handleInput}
//                       placeholder="Enter member name"
//                       required
//                     />
//                     {errors.mem_name && (
//                       <span className="text-danger">{errors.mem_name}</span>
//                     )}
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Mobile No<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mem_mobile"
//                       value={value.mem_mobile}
//                       onChange={handleInput}
//                       placeholder="Enter member mobile no"
//                       required
//                     />
//                     {errors.mem_mobile && (
//                       <span className="text-danger">{errors.mem_mobile}</span>
//                     )}
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Address<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mem_address"
//                       value={value.mem_address}
//                       onChange={handleInput}
//                       placeholder="Enter member address"
//                       required
//                     />
//                     {errors.mem_address && (
//                       <span className="text-danger">{errors.mem_address}</span>
//                     )}
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="justify-content-center m-0 pt-2">
//                 <Col className="d-flex justify-content-center">
//                   <Button type="submit" style={bgcolo} className="btn-block">
//                     SUBMIT
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Col>
//       </Row>

//       {/* Modal for success or error message */}
      
//       <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
//         <p className="text-center pt-4 fs-4">Message</p>

//         <p className="text-center fs-5 pt-2">{modalMessage}</p>
//         <div className="d-flex justify-content-center">
//           {" "}
//           <Button variant="primary" className="w-50" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </div>

//         <div className="pb-5"></div>
//       </Modal>
//     </Container>
//   );
// };

// export default CreateMember;


// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import "./createMember.css";
// import CreateMemberValidation from "../validation/CreateMemberValidation";
// import { useDispatch } from "react-redux";
// import { createMember } from "../store/memberSlice"; // Ensure the correct import for the createMember action
// import { useNavigate } from "react-router-dom";

// const CreateMember = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [value, setValue] = useState({
//     mem_name: "",
//     mem_mobile: "",
//     mem_address: "",
//   });
//   const bgcolo = {
//     backgroundColor: '#00bcd4', // Background color
//     color: 'black' // Text color
//   };
//   const [errors, setErrors] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const handleInput = (e) => {
//     setValue((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = CreateMemberValidation(value);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       const formattedValue = {
//         ...value,
//         mem_mobile: `+91${value.mem_mobile}`,
//       };
//       try {



//         const response = await dispatch(createMember(value)).unwrap();

//         // Show modal with success or error message
//         setModalMessage(response.message);
//         setShowModal(true);

//         if (response.status === true) {
//           setValue({
//             mem_name: "",
//             mem_mobile: "",
//             mem_address: "",
//           });

//           // Navigate to a different page if needed
//           // navigate('/agency/createmember')
//         }
//       } catch (error) {
//         // Show modal with error message
//         setModalMessage("Error creating member: " + error.message);
//         setShowModal(true);
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setModalMessage("");
//   };

//   return (
//     <Container fluid className="px-1 py-5 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={8} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Create Member</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Member Name<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mem_name"
//                       value={value.mem_name}
//                       onChange={handleInput}
//                       placeholder="Enter member name"
//                       required
//                     />
//                     {errors.mem_name && (
//                       <span className="text-danger">{errors.mem_name}</span>
//                     )}
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Mobile No<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mem_mobile"
//                       value={value.mem_mobile}
//                       onChange={handleInput}
//                       placeholder="Enter member mobile no"
//                       required
//                     />
//                     {errors.mem_mobile && (
//                       <span className="text-danger">{errors.mem_mobile}</span>
//                     )}
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Address<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mem_address"
//                       value={value.mem_address}
//                       onChange={handleInput}
//                       placeholder="Enter member address"
//                       required
//                     />
//                     {errors.mem_address && (
//                       <span className="text-danger">{errors.mem_address}</span>
//                     )}
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="justify-content-center m-0 pt-2">
//                 <Col className="d-flex justify-content-center">
//                   <Button type="submit" style={bgcolo} className="btn-block">
//                     SUBMIT
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Col>
//       </Row>

//       {/* Modal for success or error message */}
      
//       <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
//         <p className="text-center pt-4 fs-4">Message</p>

//         <p className="text-center fs-5 pt-2">{modalMessage}</p>
//         <div className="d-flex justify-content-center">
//           {" "}
//           <Button variant="primary" className="w-50" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </div>

//         <div className="pb-5"></div>
//       </Modal>
//     </Container>
//   );
// };

// export default CreateMember;











import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "./createMember.css";
import CreateMemberValidation from "../validation/CreateMemberValidation";
import { useDispatch } from "react-redux";
import { createMember } from "../store/memberSlice";
import { useNavigate } from "react-router-dom";

const CreateMember = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    mem_name: "",
    mem_mobile: "",
    mem_address: "",
  });
  const bgcolo = {
    backgroundColor: '#00bcd4',
    color: 'black',
  };
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      const formattedValue = {
        ...value,
        mem_mobile: value.mem_mobile ? value.mem_mobile : null,
      };

      try {
        const response = await dispatch(createMember(formattedValue)).unwrap();

        setModalMessage(response.message);
        setShowModal(true);

        if (response.status === true) {
          setValue({
            mem_name: "",
            mem_mobile: "",
            mem_address: "",
          });
        }
      } catch (error) {
        setModalMessage("Error creating member: " + error.message);
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
              <strong>Create Member</strong>
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
                    <Form.Label>Mobile No</Form.Label>
                    <Form.Control
                      type="text"
                      name="mem_mobile"
                      value={value.mem_mobile}
                      onChange={handleInput}
                      placeholder="Enter member mobile no"
                    />
                    {errors.mem_mobile && (
                      <span className="text-danger">{errors.mem_mobile}</span>
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
                      <span className="text-danger">{errors.mem_address}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
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

export default CreateMember;





































