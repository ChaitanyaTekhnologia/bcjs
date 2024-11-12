import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HistoryAmount() {
  const navigate = useNavigate();
  const historyAmount = [
    {
      id: 1,
      name: "John",
      month: "January",
      totalAmount: 100,
      biddingAmount: 80,
      winnerName: "Abhijit pawar",
      agencyCommission: 5,
    },
    {
      id: 2,
      name: "Alice",
      month: "February",
      totalAmount: 150,
      biddingAmount: 120,
      winnerName: "Tushar leo",
      agencyCommission: 8,
    },
  ];

  return (
    <div className="container">
      <Row className="pb-2">
        <Col>
          <h1 className="text-center mt-5">
            Information of winner and About Distributed
          </h1>
        </Col>
      </Row>
      <div className="py-4">
        <div className="table-responsive">
          <table className="table border shadow">
            <thead>
              <tr className="text-center">
                <th scope="col" style={{ fontSize: "18px" }}>
                  SR.NO
                </th>
                <th scope="col" style={{ fontSize: "18px" }}>
                  Month
                </th>
                <th scope="col" style={{ fontSize: "18px" }}>
                  Total Amount
                </th>
                <th scope="col" style={{ fontSize: "18px" }}>
                  Bidding Amount
                </th>
                <th scope="col" style={{ fontSize: "18px" }}>
                  Winner Name
                </th>
                <th scope="col" style={{ fontSize: "18px" }}>
                  Agency Commission
                </th>
                <th scope="col" style={{ fontSize: "18px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {historyAmount.map((item) => (
                <tr className="text-center" key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.month}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.biddingAmount}</td>
                  <td>{item.winnerName}</td>
                  <td>{item.agencyCommission}</td>
                  <td>
                    <Button onClick={() => navigate("/agency")}>
                      Payment Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryAmount;
