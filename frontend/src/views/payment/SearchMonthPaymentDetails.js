// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { apiurl } from "../../Api/apiurl";

// const SearchMonthPaymentDetails = () => {
//   const { schemeId } = useParams();
//   const API_BASE_URL = apiurl;

//   const [bcno, setbcno] = useState([]);
//   const [value, setValue] = useState({
//     bc_no: "",
//     sch_id: schemeId,
//   });
//   const [PaymentData, setPaymentData] = useState([]);

//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   const fetBno = async () => {
//     const response = await axios.post(`${API_BASE_URL}/getbcno`, {
//       sch_id: schemeId,
//     });

//     setbcno(response.data.data);
//   };

//   useEffect(() => {
//     fetBno();
//   }, [schemeId]);

//   useEffect(() => {
//     // Clear payment data when bc_no changes
//     setPaymentData([]);
//   }, [value.bc_no]);

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${API_BASE_URL}/geroutert`, {
//         sch_id: schemeId,
//         bc_no: value.bc_no,
//       });
//       console.log(response.data.data);
//       setPaymentData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };


//   const sendmessage= async(v)=>{
//     try {
//       const response = await axios.post(`${API_BASE_URL}/sendpenddingamount`, {
//         name:v.mem_name,
//         amount:v.remaining_amount,
//         bcno:value.bc_no,
//         mem_id:v.mem_id
//       });
//       console.log(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   } 

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={7} lg={8} md={9} sm={11} xs={12}>
//           <div className="card">
//             <p className="text-center mb-4 Heading_form">
//               <strong>Payment Details BcNO</strong>
//             </p>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Bc NO<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="bc_no"
//                       value={value.bc_no}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Bc NO</option>
//                       {bcno.map((bc, index) => (
//                         <option key={index} value={bc.bc_no}>
//                           {bc.bc_no}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6} className="pt-4">
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

//       {PaymentData.length > 0 ? (
//         <div className="container">
//           <div className="py-4">
//             <div className="table-responsive">
//               <table className="table border shadow">
//                 <thead>
//                   <tr className="text-center p-2">
//                     <th scope="col">SR.NO</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Date</th>
//                     <th scope="col">pay_amount</th>
//                     <th scope="col">amount_to_get</th>
//                     <th scope="col">paid_amount</th>
//                     <th scope="col">Remaining_amount</th>
//                     <th scope="col">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {PaymentData.map((item, index) => (
//                     <tr className="text-center" key={index}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{item.mem_name}</td>
//                       <td>{item.v_date}</td>
//                       <td>{item.pay_amount}</td>
//                       <td>{item.amount_to_get}</td>
//                       <td>{item.paid_amount}</td>
//                       <td>{item.remaining_amount}</td>
//                       <th>
//                         <Button  style={bgcolo} onClick={()=>{sendmessage(item)}}>pendding</Button>
//                       </th>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-4">
//           <h5>No payment data found for the selected BcNO</h5>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default SearchMonthPaymentDetails;import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button,Modal, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../../Api/apiurl";

const SearchMonthPaymentDetails = () => {
  const { schemeId } = useParams();
  const API_BASE_URL = apiurl;
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [bcno, setBcno] = useState([]);
  const [value, setValue] = useState({
    bc_no: "",
    sch_id: schemeId,
  });
  const [paymentData, setPaymentData] = useState([]);
  const [message, setMessage] = useState(null); 

  const [loading, setLoading] = useState(false); 

  const bgcolo = {
    backgroundColor: "#00bcd4", 
    color: "black",
  };

  const fetchBcNo = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/getbcno`, {
        sch_id: schemeId,
      });
      setBcno(response.data.data);
    } catch (error) {
      console.error("Error fetching BC numbers: ", error);


    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBcNo();
  }, [schemeId]);

  useEffect(() => {
    setPaymentData([]);
  }, [value.bc_no]);

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/geroutert`, {
        sch_id: schemeId,
        bc_no: value.bc_no,
      });
      setPaymentData(response.data.data);
      if (response.data.data.length === 0) {

    
      } else {
        setMessage(null);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
  

    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (v) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sendpenddingamount`, {
        name: v.mem_name,
        amount: v.remaining_amount,
        bcno: value.bc_no,
        mem_id: v.mem_id,
      });
      if (response.data.status === true) {

        setModalMessage("Message sent successfully!");
        setShowModal(true);
      
      } else {
        
    
      }
    } catch (error) {
      console.error("Error sending message: ", error);
 
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={8} md={9} sm={11} xs={12}>
          <div className="card">
            <p className="text-center mb-4 fs-3">
              <strong>Payment Details BcNO</strong>
            </p>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
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
                      {bcno.map((bc, index) => (
                        <option key={index} value={bc.bc_no}>
                          {bc.bc_no}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={6} className="pt-4">
                  <Form.Group>
                    <Button type="submit" style={bgcolo} className="btn-block">
                      {loading ? <Spinner animation="border" size="sm" /> : "Search"}
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      {paymentData.length > 0 ? (
        <div className="container">
          <div className="py-4">
            <div className="table-responsive">
              <table className="table border shadow">
                <thead>
                  <tr className="text-center p-2">
                    <th scope="col">SR.NO</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Pay Amount</th>
                    <th scope="col">Amount to Get</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Remaining Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.mem_name}</td>
                      <td>{item.v_date}</td>
                      <td>{item.pay_amount}</td>
                      <td>{item.amount_to_get}</td>
                      <td>{item.paid_amount}</td>
                      <td>{item.remaining_amount}</td>
                      <td>
                        <Button style={bgcolo} onClick={() => sendMessage(item)}>
                          pending
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
         
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <h5>{message || "No payment data found for the selected BcNO"}</h5>
        </div>
      )}

      {/* {message && (
        <div className="text-center py-4">
          <Alert variant={messageType}>{message}</Alert>
        </div>
      )} */}


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

export default SearchMonthPaymentDetails;
