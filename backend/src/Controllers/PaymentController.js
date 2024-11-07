const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const createPayment = async (req, res) => {
  try {
    const { p_m_name, s_name, p_month, p_amount, p_date } = req.body;

    console.log(req.body);

    if (!p_m_name || !s_name || !p_month || !p_amount || !p_date) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide all required fields" });
    }

    const findSchemeQuery = "SELECT scheme_id FROM tbl_scheme WHERE s_name = ?";
    const [scheme] = await query(findSchemeQuery, [s_name]);

    if (!scheme) {
      return res
        .status(200)
        .send({ status: false, message: "Scheme not found" });
    }
    const scheme_id = scheme.scheme_id;
    const insertAgencyQuery =
      "INSERT INTO tbl_payment (p_m_name,scheme_id, p_month, p_amount, p_date) VALUES (?, ?, ?, ?, ?)";
    const result = await query(insertAgencyQuery, [
      p_m_name,
      scheme_id,
      p_month,
      p_amount,
      p_date,
    ]);
    const insertedId = result.insertId;

    return res.status(200).send({
      status: true,
      data: insertedId,
      message: "Payment Detail submited successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getPaymentData = async (req, res) => {
  try {
    const getAllUsersQuery = "SELECT * FROM tbl_payment";
    const userData = await query(getAllUsersQuery);
    console.log(userData);
    return res.status(200).send({
      status: true,
      data: userData,
      message: "Payment data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getPaymentOnUnameBasis = async (req, res) => {
  const { mem_name, sch_id } = req.body;

  try {
    if (!mem_name || !sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }

    const getdataQuery = `
      SELECT 
        m.mem_name, 
        t.t_sch_id, 
        v.v_date, 
        t.t_amount
      FROM 
        tbl_member m
      JOIN 
        tbl_transaction t ON m.mem_id = t.t_mem_id
      JOIN 
        tbl_vaoucher v ON t.t_vid = v.v_id
      WHERE 
        m.mem_name = ? AND 
        t.t_sch_id = ? AND
        t.t_remark = "6"`;

    const getdata = await query(getdataQuery, [mem_name, sch_id]);

    if (!getdata || getdata.length === 0) {
      return res.status(404).send({ status: false, message: "No data found" });
    }

    res.status(200).send({ status: true, data: getdata });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};





















// const getPaymentOnMonthBasis = async (req, res) => {
//   const { sch_id, bc_no } = req.body;
//   console.log(req.body);
//   console.log(sch_id);
//   console.log(bc_no);

//   try {
//     if (!sch_id || !bc_no) {
//       return res.status(400).send({
//         status: false,
//         message: "Please provide all required fields",
//       });
//     }
//     const getbcdateId =
//       "select bcdate_id from tbl_bcdate where bc_no= ? And dc_sch_id = ?";
//     const BcDate = await query(getbcdateId, [bc_no, sch_id]);
//     const bcdate_id = BcDate[0].bcdate_id;

//     const getdataQuery = `
//       SELECT
//         v.v_date,
//         v.v_amount,
//         m.mem_name,
//         m.mem_mobile,
//         m.mem_address,
//         t.t_amount,
//         t.t_remark
   
//       FROM
//         tbl_transaction t
//       INNER JOIN
//         tbl_vaoucher v ON t.t_vid = v.v_id
//       INNER JOIN
//         tbl_member m ON t.t_mem_id = m.mem_id
//       WHERE
//         t.t_sch_id = ? AND t_bcdate_id = ?`;

//     const getdata = await query(getdataQuery, [sch_id, bcdate_id]);

//     if (!getdata || getdata.length === 0) {
//       return res.status(404).send({ status: false, message: "No data found" });
//     }

//     const result = {};

//     getdata.forEach((record) => {
//       if (!result[record.mem_name]) {
//         result[record.mem_name] = {
//           mem_name: record.mem_name,
//           mem_mobile: record.mem_mobile,
//           mem_address: record.mem_address,
//           v_date: record.v_date,
//           pay_amount: 0,
//           paid_amount: 0,
//           winner_amount: 0,
//           amount_to_get: 0,
//           ag_commission: 0,
//           total: 0,
//           remaining_amount: 0,
//         };
//       }

//       if (record.t_remark === "1") {
//         result[record.mem_name].pay_amount = record.t_amount;
//       } else if (record.t_remark === "0") {
//         result[record.mem_name].winner_amount += record.t_amount;
//         result[record.mem_name].remaining_amount = 0; // Set remaining amount to 0 for winners
//       } else if (record.t_remark === "3") {
//         result[record.mem_name].winner_amount += record.t_amount;
//       } else if (record.t_remark === "5") {
//         result[record.mem_name].amount_to_get += record.t_amount;
//       } else if (record.t_remark === "4") {
//         result[record.mem_name].ag_commission = record.t_amount;
//       } else if (record.t_remark === "6") {
//         result[record.mem_name].paid_amount += record.t_amount;
//       } else if (record.t_remark === "7") {
//         result[record.mem_name].paid_amount += record.t_amount;
//       }

//       result[record.mem_name].total =
//         result[record.mem_name].pay_amount +
//         result[record.mem_name].paid_amount;

//       result[record.mem_name].remaining_amount =
//         result[record.mem_name].pay_amount +
//         result[record.mem_name].amount_to_get +
//         result[record.mem_name].paid_amount +
//         result[record.mem_name].winner_amount +
//         result[record.mem_name].ag_commission;
//     });

//     // Convert result object to array
//     const dataArray = Object.values(result);

//     res.status(200).send({ status: true, data: dataArray });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ status: false, message: "Internal Server Error" });
//   }
// };


const getPaymentOnMonthBasis = async (req, res) => {
  const { sch_id, bc_no } = req.body;
  console.log(req.body);
  console.log(sch_id);
  console.log(bc_no);

  try {
    if (!sch_id || !bc_no) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }
    const getbcdateId =
      "select bcdate_id from tbl_bcdate where bc_no= ? And dc_sch_id = ?";
    const BcDate = await query(getbcdateId, [bc_no, sch_id]);
    const bcdate_id = BcDate[0].bcdate_id;

    const getdataQuery = `
      SELECT
        v.v_date,
        v.v_amount,
        m.mem_name,
        m.mem_mobile,
        m.mem_address,
        t.t_amount,
        t.t_remark,
        t.t_mem_id
   
      FROM
        tbl_transaction t
      INNER JOIN
        tbl_vaoucher v ON t.t_vid = v.v_id
      INNER JOIN
        tbl_member m ON t.t_mem_id = m.mem_id
      WHERE
        t.t_sch_id = ? AND t_bcdate_id = ?`;

    const getdata = await query(getdataQuery, [sch_id, bcdate_id]);

    if (!getdata || getdata.length === 0) {
      return res.status(404).send({ status: false, message: "No data found" });
    }

    const result = {};

    getdata.forEach((record) => {
      if (!result[record.mem_name]) {
        result[record.mem_name] = {
          mem_id:record.t_mem_id,
          mem_name: record.mem_name,
          mem_mobile: record.mem_mobile,
          mem_address: record.mem_address,
          v_date: record.v_date,
          pay_amount: 0,
          paid_amount: 0,
          winner_amount: 0,
          amount_to_get: 0,
          ag_commission: 0,
          total: 0,
          remaining_amount: 0,
        };
      }

      if (record.t_remark === "1") {
        result[record.mem_name].pay_amount = record.t_amount;
      } else if (record.t_remark === "0") {
        result[record.mem_name].winner_amount += record.t_amount;
        result[record.mem_name].remaining_amount = 0; // Set remaining amount to 0 for winners
      } else if (record.t_remark === "3") {
        result[record.mem_name].winner_amount += record.t_amount;
      } else if (record.t_remark === "5") {
        result[record.mem_name].amount_to_get += record.t_amount;
      } else if (record.t_remark === "4") {
        result[record.mem_name].ag_commission = record.t_amount;
      } else if (record.t_remark === "6") {
        result[record.mem_name].paid_amount += record.t_amount;
      } else if (record.t_remark === "7") {
        result[record.mem_name].paid_amount += record.t_amount;
      }

      result[record.mem_name].total =
        result[record.mem_name].pay_amount +
        result[record.mem_name].paid_amount;

      result[record.mem_name].remaining_amount =
        result[record.mem_name].pay_amount +
        result[record.mem_name].amount_to_get +
        result[record.mem_name].paid_amount +
        result[record.mem_name].winner_amount +
        result[record.mem_name].ag_commission;
    });

    // Convert result object to array
    const dataArray = Object.values(result);

    res.status(200).send({ status: true, data: dataArray });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};



module.exports = {
  createPayment,
  getPaymentData,
  getPaymentOnUnameBasis,
  getPaymentOnMonthBasis,
};
