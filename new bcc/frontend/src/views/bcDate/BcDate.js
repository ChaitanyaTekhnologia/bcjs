import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBcDateData, updateBcDate } from '../store/dateSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";


function BcDate() {
  const {schemeId}=useParams()
  const dispatch = useDispatch();
  const bcDateData = useSelector((state) => state.date);
   const navigate=useNavigate();

  useEffect(() => {
    dispatch(fetchBcDateData({sch_id:schemeId}));
  }, [dispatch]);

  const handleDateChange = (id, newDate) => {
    dispatch(updateBcDate({ id, newDate }));
  };
  console.log(bcDateData)


  function formatDateToDDMMYY(dateString) {
    const date = new Date(dateString);
  
    // Extract day, month, and last two digits of year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-4);
  
    return `${day}-${month}-${year}`;
  }
  
  return (
    <div>
    <div>
      <h2 className='text-center'>BC Date</h2> 
      <div className='container'> 
      <div className="d-flex justify-content-end">
       <Button onClick={()=>{navigate(`/agency/bcdatemessge/${schemeId}`)}}>Send BCDate Message</Button>

     </div>
      </div>
      <div className="container">
        <div className="py-4">
          <div className="table-responsive">
            <table className="table border shadow">
              <thead>
                <tr className="text-center p-2">
                  <th scope="col">SR.NO</th>
                  <th scope="col">BC Number</th>
                  <th scope="col">Date</th>
                  <th scope="col">Edit Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {bcDateData.map((item, index) => (
                  <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.bc_no}</td>
                    <td>{formatDateToDDMMYY(item.bc_date)}</td>

                    <td>
                      <input
                        type="date"
                        value={item.bc_date}
                        onChange={(event) => handleDateChange(item.bcdate_id, event.target.value)}
                        // disabled={item.bc_status === 1}
                      />
                    </td>
                    <td>{item.bc_status === 0 ? "Not Done" : "Done"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default BcDate;