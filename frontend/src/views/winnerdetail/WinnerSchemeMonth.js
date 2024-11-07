// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchWinnerDetailsMS, fetchSchemeName } from "../store/winnersSlice";

// const WinnerSchemeMonth = () => {
//   const dispatch = useDispatch();
//   const winnerSM = useSelector((state) => state.winners.winnerSM);
//   const schemeNames = useSelector((state) => state.winners.schemeNames);


// useEffect(() => {
//   let isMounted = true; 
//   dispatch(fetchSchemeName());
//   return () => { isMounted = false }; 
// }, [dispatch]);


//   const [value, setValue] = useState({
//     sch_name: "",
//     month: "",
//     year: "",
//   });

//   const handleInput = (e) => {
//     setValue({
//       ...value,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(fetchWinnerDetailsMS(value));
//       setValue({
//         sch_name: "",
//         month: "",
//         year: "",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col xl={10} lg={10} md={9} sm={11} xs={12}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Winner Detail</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col sm={4} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Scheme<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="sch_name"
//                       value={value.sch_name}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Scheme</option>
//                       {schemeNames.map((scheme, index) => (
//                         <option key={index} value={scheme}>
//                           {scheme}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={4} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Month<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="month"
//                       value={value.month}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Month</option>
//                       {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//                         <option key={month} value={month < 10 ? `0${month}` : month}>
//                           {month < 10 ? `${month}` : month}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={4} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Year<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       as="select"
//                       name="year"
//                       value={value.year}
//                       onChange={handleInput}
//                       required
//                     >
//                       <option value="">Select Year</option>
//                       {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
//                         <option key={year} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={12} className="pt-4 justify-content-center d-flex">
//                   <Form.Group>
//                     <Button
//                       type="submit"
//                       variant="primary"
//                       className="btn-block"
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
//       {winnerSM.length > 0 && (
//         <div className="container">
//           <div className="py-4">
//             <div className="table-responsive">
//               <table className="table border shadow">
//                 <thead>
//                   <tr className="text-center p-2">
//                     <th scope="col">SR.NO</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Amount</th>
//                     <th scope="col">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {winnerSM.map((item, index) => (
//                     <tr className="text-center" key={index}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{item.member_name}</td>
//                       <td>{item.transaction_amount}</td>
//                       <td>{item.voucher_date}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default WinnerSchemeMonth;



// WinnerSchemeMonth.js

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchWinnerDetailsMS, fetchSchemeName, clearState } from "../store/winnersSlice";

const WinnerSchemeMonth = () => {
  const dispatch = useDispatch();
  const winnerSM = useSelector((state) => state.winners.winnerSM);
  const schemeNames = useSelector((state) => state.winners.schemeNames);
  const status = useSelector((state) => state.winners.status);
  const bgcolo = {
    backgroundColor: '#00bcd4', // Background color
    color: 'black' // Text color
  };
  useEffect(() => {
    dispatch(fetchSchemeName());

    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  const [value, setValue] = useState({
    sch_name: "",
    month: "",
    year: "",
  });

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(fetchWinnerDetailsMS(value));
      setValue({
        sch_name: "",
        month: "",
        year: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={10} lg={10} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Winner Detail</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={4} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Scheme<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="sch_name"
                      value={value.sch_name}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select Scheme</option>
                      {schemeNames.map((scheme, index) => (
                        <option key={index} value={scheme}>
                          {scheme}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={4} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Month<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="month"
                      value={value.month}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month < 10 ? `0${month}` : month}>
                          {month < 10 ? `${month}` : month}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={4} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Year<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="year"
                      value={value.year}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={12} className="pt-4 justify-content-center d-flex">
                  <Form.Group>
                    <Button
                      type="submit"
                      style={bgcolo}
                      className="btn-block"
                      disabled={status === 'loading'} // Disable the button during loading state
                    >
                      Search
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      {status === 'succeeded' && winnerSM.length > 0 && ( // Render only if data fetching is successful and there is data
        <div className="container">
          <div className="py-4">
            <div className="table-responsive">
              <table className="table border shadow">
                <thead>
                  <tr className="text-center p-2">
                    <th scope="col">SR.NO</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {winnerSM.map((item, index) => (
                    <tr className="text-center" key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.member_name}</td>
                      <td>{item.transaction_amount}</td>
                      <td>{item.voucher_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {status === 'succeeded' && winnerSM.length === 0 && ( // Render only if data fetching is successful but there is no data
        <div className="container">
          <div className="py-4">
            <div className="text-center">
              No data found.
            </div>
          </div>
        </div>
      )}
      {status === 'loading' && ( // Render loading spinner while data is being fetched
        <div className="container">
          <div className="py-4 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {status === 'failed' && ( // Render error message if data fetching fails
        <div className="container">
          <div className="py-4 text-center ">
            <div className="alert alert-danger" role="alert">
               Don't have any Winner.
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default WinnerSchemeMonth;
