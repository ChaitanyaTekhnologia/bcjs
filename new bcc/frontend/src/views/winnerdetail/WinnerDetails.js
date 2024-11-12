import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWinnerDetails } from "../store/winnersSlice";

function WinnerDetails() {
  
  const { schemeId } = useParams();
  const dispatch = useDispatch();
  const winners = useSelector((state) => state.winners.winners);
  const status = useSelector((state) => state.winners.status);
  const error = useSelector((state) => state.winners.error);
console.log(winners)
  useEffect(() => {
    dispatch(fetchWinnerDetails({ bid_sch_id: schemeId }));
  }, [dispatch, schemeId]);
  const bgcolo = {
    backgroundColor: '#82cafa', // Background color
    color: 'black' // Text color
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="winner-details-container">
      <Row>
        <Col>
          <h2 className="text-center bold winner-details-title">
            Winner Details
          </h2>
        </Col>
      </Row>
      {winners.map((winner, index) => (
        <div className="p-4" key={index}>
          <Row className="justify-content-center ">
            <Col lg={10} className="winner-details-card " style={bgcolo}>
              <Row className="justify-content-center pb-3 pt-4">
                <Col lg={6} className="d-flex justify-content-center">
                  <h5 className="winner-details-label">
                    Winner Name: {winner.member_name}
                  </h5>
                </Col>
                <Col lg={6}>
                  <h5 className="winner-details-text">
                    Date of Win: {winner.voucher_date}
                  </h5>
                </Col>
              </Row>
              <Row className="justify-content-center pb-3">
                <Col lg={6} className="d-flex justify-content-center">
                  <h5 className="winner-details-label">
                    Amount: {winner.transaction_amount}
                  </h5>
                </Col>
                <Col lg={6}>
                  <h5 className="winner-details-label">
                    Total Amount: {winner.voucher_amount}
                  </h5>
                </Col>
              </Row>
              <Row className="  pb-3">
                {/* <Col lg={6}>
                  <h5 className="winner-details-label">
                    Agency Commission: {winner.commission}
                  </h5>
                </Col> */}
                {/* <Col lg={6}>
                  <h5 className="winner-details-label">
                    Agency Commission: {winner.agencyCommission}
                  </h5>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default WinnerDetails;
