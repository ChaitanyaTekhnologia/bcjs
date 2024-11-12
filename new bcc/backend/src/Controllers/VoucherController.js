const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const createvoucher = async (req, res) => {
    try {
      const { v_date, v_amount } = req.body; 
      console.log(req.body);
  
      if (!v_date || !v_amount) {
        return res.status(400).send({ status: false, message: "Please provide all required fields" });
      }
      // Insert the voucher data
      const insertVoucherQuery = "INSERT INTO tbl_vaoucher (v_date, v_amount) VALUES (?, ?)";
      const result = await query(insertVoucherQuery, [v_date, v_amount]);
  
      return res.status(200).send({
        status: true,
        data: result.insertId,
        message: "Voucher created successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ status: false, message: err.message });
    }
  };



  const checkTotalNo = async (req, res) => {
    try {
      const { sch_id } = req.body; 
      console.log(req.body);
  
      if (!sch_id) {
        return res.status(400).send({ status: false, message: "Please provide all required fields" });
      }
  
      // Query to get scheme month
      const getTotalMemberQuery = "SELECT sch_month FROM tbl_scheme WHERE sch_id = ?";
      const result1 = await query(getTotalMemberQuery, [sch_id]);
      
      if (result1.length === 0) {
        return res.status(404).send({ status: false, message: "Scheme not found" });
      }
  
      const value = result1[0].sch_month;
      console.log(value);
  
      // Query to get scheme members
      const getTotalMemberSchemeQuery = "SELECT * FROM tbl_schememember WHERE schmem_sch_id = ?";
      const result = await query(getTotalMemberSchemeQuery, [sch_id]);
      const totalRecords = result.length;
      console.log(result);
      console.log(`Total number of records: ${totalRecords}`);

      if(value===totalRecords)
      {
      return res.status(200).send({
        status: true,
        totalRecords: totalRecords,
        message: "Records retrieved successfully",
      });
      
      }else{
      return res.status(200).send({
        status: false,
        totalRecords: totalRecords,
        message: "Records retrieved successfully",
      });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({ status: false, message: err.message });
    }
  };





  // const checkWinnerPresentFormonth = async (req, res) => {
  //   try {
  //     const { sch_id } = req.body;
  
  //     if (!sch_id) {
  //       return res.status(400).send({ status: false, message: "Please provide the scheme ID" });
  //     }
  
  //     // Query to check if a winner is present for the current month and year
  //     const today = new Date();
  //     const currentMonth = today.getMonth() + 1; // Adding 1 because months are zero-based
  //     const currentYear = today.getFullYear();
  
  //     const getTotalMemberQuery = "SELECT * FROM tbl_transaction WHERE t_sch_id = ? AND MONTH(created_at) = ? AND YEAR(created_at) = ? AND t_remark = 3";
  //     const result1 = await query(getTotalMemberQuery, [sch_id, currentMonth, currentYear]);
  
  //     if (result1.length === 0) {
  //       return res.status(200).send({ status: false, message: "Winner not found for the current month and year" });
  //     }
  
  //     const totalRecords = result1.length;

  
  //     return res.status(200).send({
  //       status: true, // Assuming you want to send 'true' if a winner is found
  //       totalRecords: totalRecords,
  //       message: "Records retrieved successfully",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send({ status: false, message: error.message });
  //   }
  // };
  


  const checkWinnerPresentFormonth = async (req, res) => {
    try {
      const { sch_id } = req.body;
  
      if (!sch_id) {
        return res.status(400).send({ status: false, message: "Please provide the scheme ID" });
      }
  
      const getTotalMemberQuery1 = "SELECT * FROM tbl_bcdate WHERE dc_sch_id = ? AND bc_status = ? ORDER BY bcdate_id LIMIT 1";
      const result = await query(getTotalMemberQuery1, [sch_id, false]);
  
      return res.status(200).send({
        status: true,
        Data: result[0], // Assuming you want to send the first record if found
        message: "Winner record retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  


  
  const checkbcdatestatus = async (req, res) => {
    try {
      const { sch_id } = req.body;
  
      if (!sch_id) {
        return res.status(400).send({ status: false, message: "Please provide the scheme ID" });
      }
  
      const getTotalMemberQuery1 = "SELECT bc_status FROM tbl_bcdate WHERE dc_sch_id = ? ORDER BY bcdate_id LIMIT 1";
      const result = await query(getTotalMemberQuery1, [sch_id]);
  
      if (result.length > 0) {
        return res.status(200).send({
          status: true,
          data:result, // Sending the first record if found
          message: "bc is",
        });
      } else {
        return res.status(404).send({ status: false, message: "No records found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  



















 module.exports = {createvoucher,checkTotalNo,checkWinnerPresentFormonth,checkbcdatestatus};



