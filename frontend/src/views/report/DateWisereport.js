// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllMembers } from "../store/memberSlice1";
// import { fetchdreportdatadatewise } from "../store/apiService";

// const DateWisereport = () => {
//   const [totalAmount, setTotalAmount] = useState(0);

//   const dispatch = useDispatch();
//   const members1 = useSelector((state) => state.member.members1);

//   const [reportData, setReportData] = useState([]);

//   const [value, setValue] = useState("");

//   const bgcolo = {
//     backgroundColor: "#00bcd4",
//     color: "black",
//   };





    
//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
//       today.getMonth() + 1
//     ).padStart(2, "0")}-${String(today.getFullYear()).slice(-2)}`;

//     const month = formattedDate
//       ? new Date(formattedDate).toISOString().split("T")[0]
//       : "";
//     console.log(formattedDate);
//     setValue((prevValue) => ({
//       ...prevValue,
//       value.date: month,
//     }));
//   }, []);


//   useEffect(() => {
//     dispatch(fetchAllMembers());
//   }, [dispatch]);

//   // Handle input changes and update date value

//   useEffect(() => {
//     const total = reportData.reduce((sum, item) => sum + item.t_amount, 0);
//     setTotalAmount(total);
//   }, [reportData]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetchdreportdatadatewise(value);
//       setReportData(response.data);
//       console.log("object", response);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setReportData([]);
//     }
//   };

//   return (
//     <Container fluid className="px-1 mx-auto">
//       <Row className="justify-content-center m-0">
//         <Col lg={8} md={9} sm={11}>
//           <div className="card">
//             <h1 className="text-center mb-4 Heading_form">
//               <strong>Datewise Report</strong>
//             </h1>
//             <Form onSubmit={handleSubmit}>
//               <Row className="justify-content-between text-left m-0 pb-2">
//                 <Col lg={6} className="flex-column d-flex">
//                   <Form.Group>
//                     <Form.Label>
//                       Select Date<span className="text-danger"> *</span>
//                     </Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="date"
//                       value={value.date}
//                       onChange={(e) =>
//                         setValue({ ...value, date: e.target.value })
//                       }
//                       required
//                     />
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
//                 <p className="ps-5 pe-5 pt-2">
//                   <span className="fw-bold fs-5 text-dark">
//                     Current Amount: {totalAmount}
//                   </span>
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
//                       <td>{item.mem_name}</td>
//                       <td>
//                         {item.created_at
//                           ? new Date(item.created_at).toLocaleDateString(
//                               "en-GB",
//                               {
//                                 day: "2-digit",
//                                 month: "2-digit",
//                                 year: "2-digit",
//                               }
//                             )
//                           : ""}
//                       </td>
//                       <td>{item.t_amount}</td>
//                       <td>{item.t_remark1}</td>
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

// export default DateWisereport;
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMembers } from "../store/memberSlice1";
import { fetchdreportdatadatewise } from "../store/apiService";

const DateWisereport = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [value, setValue] = useState({ date: "" });
  const [reportData, setReportData] = useState([]);

  const dispatch = useDispatch();
  const members1 = useSelector((state) => state.member.members1);

  const bgcolo = {
    backgroundColor: "#00bcd4",
    color: "black",
  };

  // Set the current date when the component loads
  useEffect(() => {
    const today = new Date();
    console.log(today)

    
    const formattedDate = `${String(today.getFullYear()).slice(-4)}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;



    // const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
    //   today.getMonth() + 1
    // ).padStart(2, "0")}-${String(today.getFullYear()).slice(-4)}`;



console.log(formattedDate)
    const month = formattedDate? new Date(formattedDate).toISOString().split("T")[0] : "";
    setValue((prevValue) => ({
      ...prevValue,
      date: month,
    }));
  }, []);

  // Fetch all members when the component mounts
  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  // Calculate the total amount whenever the reportData changes
  useEffect(() => {
    const total = reportData.reduce((sum, item) => sum + item.t_amount, 0);
    setTotalAmount(total);
  }, [reportData]);

  // Handle form submission to fetch report data based on the selected date
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchdreportdatadatewise(value);
      setReportData(response.data);
      console.log("Fetched report data:", response);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setReportData([]);
    }
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col lg={8} md={9} sm={11}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Datewise Report</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col lg={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Select Date<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={value.date}
                      onChange={(e) =>
                        setValue({ ...value, date: e.target.value })
                      }
                      required
                    />
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
                  <span className="fw-bold fs-5 text-dark">
                    Current Amount: {totalAmount}
                  </span>
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
                      <td>{item.mem_name}</td>
                      <td>
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              }
                            )
                          : ""}
                      </td>
                      <td>{item.t_amount}</td>
                      <td>{item.t_remark1}</td>
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

export default DateWisereport;
