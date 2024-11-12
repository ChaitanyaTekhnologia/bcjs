
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../../Api/apiurl";
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Report = () => {

  const { schemeId } = useParams();
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState({
    month: "",
    year: "",
    scheme_id: schemeId,
  });
  const API_BASE_URL = apiurl;
  const bgcolo = {
    backgroundColor: '#00bcd4', // Background color
    color: 'black' // Text color
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/reportmember1`, { sch_id: schemeId });
        console.log(response.data);
        setReportData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Clear report data on error
        setReportData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, [schemeId]);

  const handleInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { month, year } = value;
      const filtered = reportData.map(group => ({
        ...group,
        records: group.records.filter(record => {
          const recordMonth = new Date(record.v_date).getMonth() + 1;
          const recordYear = new Date(record.v_date).getFullYear();
          return (
            recordMonth === parseInt(month, 10) &&
            recordYear === parseInt(year, 10)
          );
        })
      })).filter(group => group.records.length > 0);

      setFilteredData(filtered);
    } catch (error) {
      console.error("Error filtering data: ", error);
      // Clear filtered data on error
      setFilteredData([]);
    }
  };

  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col lg={8} md={8} sm={11}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Report</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col lg={5} className="flex-column d-flex">
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
                      {months.map((month,index) => (
                        <option key={month} value={index+1}>
                          {month}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={5} className="flex-column d-flex">
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
                <Col lg={2} className="pt-4">
                  <Form.Group>
                    <Button
                      type="submit"
                      style={bgcolo}
                      className="btn-block"
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

      <div className="container">
        <div className="py-4">
          {filteredData.length > 0 ? (
            filteredData.map((monthYearGroup, monthYearIndex) => (
              <div key={monthYearIndex}>
                <h2 className="text-center">{`${value.year}-${value.month}`}</h2>
                <div className="table-responsive">
                  <table className="table border shadow">
                    <thead>
                      <tr className="text-center p-2">
                        <th scope="col">SR.NO</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Date</th>
                        <th scope="col">pay_amount</th>
                        <th scope="col">winner_amount</th>
                        <th scope="col">amount_to_get</th>
                        <th scope="col">ag_commission</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthYearGroup.records.map((item, index) => (
                        <tr className="text-center" key={index}>
                          <td>{index + 1}</td>
                          <td>{item.mem_name}</td>
                          <td>{item.mem_mobile}</td>
                          <td>{item.v_date}</td>
                          <td>{item.pay_amount}</td>
                          <td>{item.winner_amount}</td>
                          <td>{item.amount_to_get}</td>
                          <td>{item.ag_commission}</td>
                          <td>{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <h6 className="text-center">No data available for the selected month and year.</h6>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Report;
