import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchemeName } from "../store/winnersSlice";
import { sendDateMessage } from '../store/apiService'; // Assuming this is correctly imported

const Receipt = () => {
  const dispatch = useDispatch();
  const schemeNames = useSelector((state) => state.winners?.schemeNames || []);
  const [value, setValue] = useState({
    sch_name: "",
    date: "",
  });



  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSchemeName());
    };
    fetchData();
  }, [dispatch]);

  const handleSchemeChange = (e) => {
    setValue({
      ...value,
      sch_name: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setValue({
      ...value,
      date: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res= await sendDateMessage({ sch_name: value.sch_name, date: value.date });

    
        setValue({
          sch_name: "",
          date: "",
        });
      
    
    } catch (error) {
   console.log(error)
    }
  };



  return (
    <Container fluid className="px-1 mx-auto">
      <Row className="justify-content-center m-0">
        <Col xl={7} lg={10} md={9} sm={11} xs={12}>
          <div className="card">
            <h1 className="text-center mb-4 Heading_form">
              <strong>Payment</strong>
            </h1>
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between text-left m-0 pb-2">
                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Sheme Name<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="sch_name"
                      value={value.sch_name}
                      onChange={handleSchemeChange}
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

                <Col sm={6} className="flex-column d-flex">
                  <Form.Group>
                    <Form.Label>
                      Date<span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={value.date}
                      onChange={handleDateChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center m-0 pt-3">
                <Col className="d-flex justify-content-center">
                  <Button type="submit" className="btn-block">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      
    </Container>
  );
};

export default Receipt;
