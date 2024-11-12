// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllMembers } from "../store/memberSlice1";
// import { apiurl } from "../../Api/apiurl";

// const Tmreport = () => {
//   const dispatch = useDispatch();
//   const members1 = useSelector((state) => state.member.members1);
//   const { schemeId } = useParams();
//   const [reportData, setReportData] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0); // State for total amount

//   const [value, setValue] = useState({
//     mem_name: "",
//   });
  
//   const API_BASE_URL = apiurl;

//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   useEffect(() => {
//     dispatch(fetchAllMembers());
//   }, [dispatch]);

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${API_BASE_URL}/reportmember`, value);
//       setReportData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setReportData([]); // Clear report data on error
//     }
//   };

//   // Calculate the total amount when reportData is updated
//   useEffect(() => {
//     const total = reportData.reduce((sum, item) => sum + item.amount, 0);
//     setTotalAmount(total);
//   }, [reportData]);

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col lg={8} md={9} sm={11}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Member Details</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col lg={5} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Name<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="mem_name"
//                       value={value.mem_name}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Member</option>
//                       {members1.map((scheme, index) => (
//                         <option key={index} value={scheme}>
//                           {scheme}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col lg={3} className="pt-4">
//                   <Form.Group>
//                     <Button type="submit" style={bgcolo} className="btn-block">
//                       Search
//                     </Button>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Col>
//       </Row>
      
//       {reportData.length > 0 && (
//         <div className="container">
//           <div className="py-4">
//             <div className="d-flex justify-content-end">
//               <div className="border bg-info">
//                 <p className="ps-5 pe-5 pt-2 ">
//                   <span className="fw-bold fs-5 text-dark">Current Amount : {totalAmount} </span>
//                 </p>
//               </div>
//             </div>

//             <div className="table-responsive">
//               <table className="table border shadow">
//                 <thead>
//                   <tr className="text-center p-2">
//                     <th scope="col">SR.NO</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Date</th>
//                     <th scope="col">Amount</th>
//                     <th scope="col">Remark</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reportData.map((item, index) => (
//                     <tr className="text-center" key={index}>
//                       <td>{index + 1}</td>
//                       <td>{item.name}</td>
//                       <td>{item.date}</td>
//                       <td>{item.amount}</td>
//                       <td>{item.remark}</td>
//                     </tr>
//                   ))}
//                   <tr className="text-center">
//                     <td colSpan="3">Total:</td>
//                     <td>{totalAmount}</td>
//                     <td></td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default Tmreport;



















import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMembers } from "../store/memberSlice1";
import { apiurl } from "../../Api/apiurl";

const Tmreport = () => {
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member.members1);
  // const { schemeId } = useParams();
  const [reportData, setReportData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const dropdownRef = useRef(null); // Ref for dropdown

  const [value, setValue] = useState({
    mem_name: "",
  });

  const API_BASE_URL = apiurl;

  const bgcolo = {
    backgroundColor: "#00bcd4",
    color: "black",
  };

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  // Handle input changes and update search term
  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setSearchTerm(e.target.value); // Update search term for filtering
    setShowDropdown(true); // Open dropdown when user types
  };

  // Filter members based on search term
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = members1.filter((member) =>
        member.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    }, 300); // Delay for debounce

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout
  }, [searchTerm, members1]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/reportmember`, value);
      setReportData(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setReportData([]);
    }
  };

  useEffect(() => {
    const total = reportData.reduce((sum, item) => sum + item.amount, 0);
    setTotalAmount(total);
  }, [reportData]);

  const handleSelectMember = (member) => {
    setValue({ ...value, mem_name: member });
    setSearchTerm(member);
    setShowDropdown(false); // Close dropdown on selection
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false); // Close dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col lg={8} md={9} sm={11}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Member Details</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col lg={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search the name"
                      name="mem_name"
                      value={value.mem_name}
                      onChange={handleInput}
                      onClick={() => setShowDropdown(true)} // Open dropdown when clicked
                      required
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
                <Col lg={3} className="pt-4">
                  <Form.Group>
                    <Button type="submit" style={bgcolo} className="btn-block">
                      Search
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      {reportData.length > 0 && (
        <div className="container">
          <div className="py-4">
            <div className="d-flex justify-content-end">
              <div className="border bg-info">
                <p className="ps-5 pe-5 pt-2">
                  <span className="fw-bold fs-5 text-dark">Current Amount : {totalAmount} </span>
                </p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table border shadow">
                <thead>
                  <tr className="text-center p-2">
                    <th scope="col">SR.NO</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.remark}</td>
                    </tr>
                  ))}
                  <tr className="text-center">
                    <td colSpan="3">Total:</td>
                    <td>{totalAmount}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Tmreport;
