// import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { sendOtp } from "../../store/forgotPasswordSlice";

// const Forgotpassword = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { status, error,data} = useSelector((state) => state.forgotPassword.data);
//   console.log("first")
//   console.log(data)
//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   const [userEmail, setUserEmail] = useState("");

//   const handleInput = (e) => {
//     setUserEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//         await dispatch(sendOtp({userEmail:userEmail}));
//     //  console.log(resultAction)
//     // if (sendOtp.fulfilled.match(resultAction)) {
//     //   navigate(`/enterotp/${userEmail}`);
//     // }
//     // No need for else block since error handling will be managed by Redux state
//   };

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col lg={5} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Forgot Password</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Enter Email<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={userEmail}
//                       onChange={handleInput}
//                       required
//                       placeholder="Enter Email"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="justify-content-center m-0 pt-3">
//                 <Col className="d-flex justify-content-center">
//                   <Button type="submit" style={bgcolo} className="btn-block" disabled={status === 'loading'}>
//                     {status === 'loading' ? 'Sending...' : 'Send Email'}
//                   </Button>
//                 </Col>
//               </Row>
//               {status === 'failed' && <Alert variant="danger">{error.message}</Alert>}
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Forgotpassword;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { sendOtp } from "../../store/forgotPasswordSlice";

// const Forgotpassword = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { status, error, data } = useSelector((state) => state.forgotPassword);
//   const [userEmail, setUserEmail] = useState("");

//   console.log(data)

//   const handleInput = (e) => {
//     setUserEmail(e.target.value);
//   };

//   const handleSubmit =  (e) => {
//     e.preventDefault();
//    dispatch(sendOtp({ userEmail }));
//    console.log("first")
//    console.log(data)
//    console.log("=")
//     if (data.status === true) {
//       console.log("hc")
//       navigate(`/enterotp/${userEmail}`);
//     }
//   };

//   const bgcolo = {
//     backgroundColor: "#00bcd4", // Background color
//     color: "black", // Text color
//   };

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col lg={5} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Forgot Password</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Enter Email<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={userEmail}
//                       onChange={handleInput}
//                       required
//                       placeholder="Enter Email"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="justify-content-center m-0 pt-3">
//                 <Col className="d-flex justify-content-center">
//                   <Button type="submit" style={bgcolo} className="btn-block" disabled={status === 'loading'}>
//                     {status === 'loading' ? 'Sending...' : 'Send Email'}
//                   </Button>
//                 </Col>
//               </Row>
//               {status === 'failed' && <Alert variant="danger">{error.message}</Alert>}
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Forgotpassword;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../store/forgotPasswordSlice";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.forgotPassword);
  const [userEmail, setUserEmail] = useState("");

  const handleInput = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOtp({ userEmail }));
  };

  useEffect(() => {
    if (status === 'succeeded' && data.status === true) {
      navigate(`/enterotp/${userEmail}`);
    }
  }, [status, data, navigate, userEmail]);

  const bgcolo = {
    backgroundColor: "#00bcd4", // Background color
    color: "black", // Text color
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col lg={5} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Forgot Password</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Enter Email<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={userEmail}
                      onChange={handleInput}
                      required
                      placeholder="Enter Email"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center m-0 pt-3">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" style={bgcolo} className="btn-block" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Email'}
                  </Button>
                </Col>
              </Row>
              {status === 'failed' && <Alert variant="danger">{error.message}</Alert>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Forgotpassword;
