import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPayment1, sendAdditionalData } from "../store/paymentSlice";
import { fetchAllMembers } from "../store/memberSlice1";
import { fetchSchemeName } from "../store/winnersSlice";
import axios from "axios"; // Ensure axios is imported
import { currentbalance } from "../store/apiService";

const Receipt = () => {
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member?.members1 || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // const dropdownRef = useRef(null); // Ref for dropdown
  const [filteredMembers, setFilteredMembers] = useState([]);

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  const [value, setValue] = useState({
    mem_name: "",
    amount: "",
    p_date: "",
    remark: "",
  });
  const [name, setName] = useState([]); // For storing the response from the API
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); // Updated state for total amount









    
  useEffect(() => {
    const today = new Date();

    const formattedDate = `${String(today.getFullYear()).slice(-4)}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;


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

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberChange = async (e) => {
    const mem_name = e.target.value;
    setValue({
      ...value,
      mem_name: mem_name,
    });

    // Call the API when the member name is selected
    try {
      const response = await currentbalance({
        mem_name: mem_name,
      })
      const data = response.data || [];
      setName(data);

      // Calculate the total amount based on fetched data
      const total = data.reduce((sum, item) => sum + item.amount, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching data for selected member:", error);
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

      const newvalue1 = {
        mem_name: value.mem_name,
        amount: value.amount,
        remark: value.remark,
      };

      await dispatch(createPayment1(newvalue1)).unwrap();

      setModalMessage("Payment is done");
      setShowModal(true);
      setValue({
        mem_name: "",
        amount: "",
        p_date: "",
        remark: "",
      });
      setTotalAmount(0)
    } catch (error) {
      setModalMessage("Error creating payment: " + (error.message || error));
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={10} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Receipt</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label className="pb-1">
                      Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="mem_name"
                      value={value.mem_name}
                      onChange={handleMemberChange}
                      required
                    >
                      <option value="">Select Name</option>
                      {members1.map((name1, index) => (
                        <option key={index} value={name1}>
                          {name1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

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
              </Row>

              <Row className="justify-content-between text-left m-0 pb-3 pt-1">
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
              </Row>

              <Row className="justify-content-between text-left m-0 pb-3 pt-1">
                <Col sm={6} lg={12} className="flex-column d-flex">
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

export default Receipt;






// import React, { useEffect, useState, useRef } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { createPayment1, sendAdditionalData } from "../store/paymentSlice";
// import { fetchAllMembers } from "../store/memberSlice1";
// import { fetchSchemeName } from "../store/winnersSlice";
// import { currentbalance } from "../store/apiService";

// const Receipt = () => {
//   const dispatch = useDispatch();
//   const members1 = useSelector((state) => state.member?.members1 || []);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   const [filteredMembers, setFilteredMembers] = useState([]);

//   const bgcolo = {
//     backgroundColor: "#00bcd4",
//     color: "black",
//   };

//   const [value, setValue] = useState({
//     mem_name: "",
//     amount: "",
//     p_date: "",
//     remark: "",
//   });

//   const [name, setName] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(fetchAllMembers());
//       await dispatch(fetchSchemeName());
//     };
//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       const filtered = members1.filter((member) =>
//         member.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredMembers(filtered);
//     }, 300); // Delay for debounce

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm, members1]);

//   const handleInput = (e) => {
//     // Update state based on input field changes
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//   };





//   const handleMemberChange = async (e) => {
//     const mem_name = e.target.value;
//     setValue({
//       ...value,
//       mem_name: mem_name,
//     });
//     setSearchTerm(mem_name); // Set search term for filtering



//     console.log("hello")
//     try {
//       const response = await currentbalance({
//         mem_name: mem_name,
//       });
//       const data = response.data || [];
//       setName(data);

//       // Calculate the total amount based on fetched data
//       const total = data.reduce((sum, item) => sum + item.amount, 0);
//       setTotalAmount(total);
//     } catch (error) {
//       console.error("Error fetching data for selected member:", error);
//     }
//   };





//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newvalue = {
//         v_date: value.p_date,
//         v_amount: value.amount,
//       };

//       await dispatch(sendAdditionalData(newvalue)).unwrap();

//       const newvalue1 = {
//         mem_name: value.mem_name,
//         amount: value.amount,
//         remark: value.remark,
//       };

//       await dispatch(createPayment1(newvalue1)).unwrap();

//       setModalMessage("Payment is done");
//       setShowModal(true);
//       setValue({
//         mem_name: "",
//         amount: "",
//         p_date: "",
//         remark: "",
//       });
//       setTotalAmount(0); // Reset total amount after submission
//     } catch (error) {
//       setModalMessage("Error creating payment: " + (error.message || error));
//       setShowModal(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setModalMessage("");
//   };

//   const handleSelectMember = (member) => {
//     setValue({ ...value, mem_name: member });
//     setSearchTerm(member);
//     setShowDropdown(false);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowDropdown(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={10} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Receipt</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label className="pb-1">
//                       Name<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Search the name"
//                       name="mem_name"
//                       value={value.mem_name}
//                       onChange={handleMemberChange} // Call this for input changes
//                       onClick={() => setShowDropdown(true)}
//                       required
//                     />
//                     {showDropdown && filteredMembers.length > 0 && (
//                       <ul
//                         className="dropdown-list list-unstyled border rounded shadow"
//                         style={{
//                           position: "absolute",
//                           zIndex: 1000,
//                           maxHeight: "160px",
//                           overflowY: "auto",
//                           marginTop: "5px",
//                           width: "45%",
//                           backgroundColor: "black",
//                         }}
//                         ref={dropdownRef}
//                       >
//                         {filteredMembers.map((member, index) => (
//                           <li
//                             className="dropdown-item p-1 ps-3"
//                             key={index}
//                             onClick={() => handleSelectMember(member)}
//                           >
//                             {member}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                     {showDropdown && filteredMembers.length === 0 && (
//                       <div className="text-muted">No members found</div>
//                     )}
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6}>
//                   <Form.Group>
//                     <Form.Label>
//                       Current Amount<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="totalamount"
//                       value={totalAmount} // Set from the calculated total
//                       readOnly
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="justify-content-between text-left m-0 pb-3 pt-1">
//                 <Col sm={6}>
//                   <Form.Group>
//                     <Form.Label>
//                       Amount<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="amount"
//                       value={value.amount}
//                       onChange={handleInput} // This should trigger the handleInput function
//                       placeholder="Enter Amount"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Date<span className="text-danger">*</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="p_date"
//                       value={value.p_date}
//                       onChange={handleInput} // This should trigger the handleInput function
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="justify-content-between text-left m-0 pb-3 pt-1">
//                 <Col sm={6} lg={12} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Remark<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="remark"
//                       value={value.remark}
//                       onChange={handleInput} // This should trigger the handleInput function
//                       placeholder="Write Remark"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="justify-content-center m-0 pt-3">
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

//       <Modal className="p-5" show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Message</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="text-center fs-5">{modalMessage}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Receipt;
