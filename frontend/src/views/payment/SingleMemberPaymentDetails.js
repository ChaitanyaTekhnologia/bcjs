// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPaymentsonunamescheme, clearState } from "../store/paymentSlice";
// import { fetchSchemewiseName } from "../store/bSlice"; // Assuming clearState action is in bSlice

// const SingleMemberPaymentDetails = () => {
//   const { schemeId } = useParams();
//   const memberName = useSelector((state) => state.bSlice.memberName);
//   const payments = useSelector((state) => state.payments?.payments || []);
//   const dispatch = useDispatch();

//   const [he, setHe] = useState([]);
//   const [value, setValue] = useState({
//     mem_name: "",
//     sch_id: schemeId,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   useEffect(() => {
//     dispatch(fetchSchemewiseName({ sch_id: schemeId }));
//   }, [dispatch, schemeId]);

//   useEffect(() => {
//     setHe(payments);
//   }, [payments]);

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//     setSearched(false); // Reset searched flag when input changes
//     setNotFound(false); // Reset notFound flag when input changes
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     if (!value.mem_name) {
//       dispatch(clearState()); // Clear state if mem_name is empty
//       setIsSubmitting(false);
//       return;
//     }
//     try {
//       const result = await dispatch(fetchPaymentsonunamescheme(value)).unwrap();
//       if (result.length === 0) {
//         setNotFound(true); // Set notFound flag if mem_name is not found
//       } else {
//         setHe(result);
//         setSearched(true); // Set searched flag after successful search
//       }
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={8} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Single Member Payment Details</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
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
//                       <option value="">Select Name</option>
//                       {memberName.map((name, index) => (
//                         <option key={index} value={name}>
//                           {name}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6} className="pt-4">
//                   <Form.Group>
//                     <Button
//                       type="submit"
//                       style={bgcolo}
//                       className="btn-block"
//                       disabled={isSubmitting}
//                     >
//                       Search
//                     </Button>
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Col>
//       </Row>

//       {searched && !notFound ? (
//         <div className="container">
//           <div className="py-4">
//             <div className="table-responsive">
//               <table className="table border shadow">
//                 <thead>
//                   <tr className="text-center p-2">
//                     <th scope="col">SR.NO</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">p_date</th>
//                     <th scope="col">Payment</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {he.map((item, index) => (
//                     <tr className="text-center" key={index}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{item.mem_name}</td>
//                       <td>{item.v_date}</td>
//                       <td>{item.t_amount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ) : searched && notFound ? (
//         <div className="container">
//           <div className="py-4 text-center">
//             <h3>No data found for the selected name</h3>
//           </div>
//         </div>
//       ) : null}
//     </Container>
//   );
// };

// export default SingleMemberPaymentDetails;





import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMembers } from "../store/memberSlice1";
import { apiurl } from "../../Api/apiurl";

const Tmreport = () => {
  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member.members1);
  const { schemeId } = useParams();
  const [reportData, setReportData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  const [value, setValue] = useState({
    mem_name: "",
  });
  
  const API_BASE_URL = apiurl;

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/reportmember`, value);
      setReportData(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setReportData([]); // Clear report data on error
    }
  };

  // Calculate the total amount when reportData is updated
  useEffect(() => {
    const total = reportData.reduce((sum, item) => sum + item.amount, 0);
    setTotalAmount(total);
  }, [reportData]);

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
                <Col lg={5} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="mem_name"
                      value={value.mem_name}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select Member</option>
                      {members1.map((scheme, index) => (
                        <option key={index} value={scheme}>
                          {scheme}
                        </option>
                      ))}
                    </Form.Control>
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
                <p className="ps-5 pe-5 pt-2 ">
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
