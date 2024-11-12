const { query } = require("../utils/database");

const getreport = async (req, res) => {
  const { mem_name } = req.body;

  try {
    if (!mem_name) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }

    const getmemberIdQuery = `
    SELECT mem_id FROM tbl_member 
    WHERE mem_name = ?`;

    const getMember = await query(getmemberIdQuery, [mem_name]);

    if (!getMember || getMember.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No mem_id found" });
    }

    const memberId = getMember[0].mem_id;

    const getdataQuery = `
    SELECT 
      tbl_member.mem_name AS name,
      tbl_vaoucher.v_date AS date,
      tbl_transaction.t_amount AS amount,
      tbl_transaction.t_remark1 AS remark
    FROM tbl_member
    JOIN tbl_transaction ON tbl_member.mem_id = tbl_transaction.t_mem_id
    JOIN tbl_vaoucher ON tbl_transaction.t_vid = tbl_vaoucher.v_id
    WHERE tbl_member.mem_id = ?;
  `;


    const getdata = await query(getdataQuery, [memberId]);

    if (!getdata || getdata.length === 0) {
      return res.status(404).send({ status: false, message: "No data found" });
    }

    res.status(200).send({ status: true, data: getdata });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};


const gettotalbalanceofagency = async (req, res) => {
  // const { mem_name } = req.body;

  try {
    // if (!mem_name) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Please provide all required fields",
    //   });
    // }

    const getmemberIdQuery = `
    SELECT mem_id FROM tbl_member 
    WHERE mem_name = ?`;

    const getMember = await query(getmemberIdQuery, ['agency']);

    if (!getMember || getMember.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No mem_id found" });
    }

    const memberId = getMember[0].mem_id;

    const getdataQuery = `
    SELECT 
      tbl_member.mem_name AS name,
      tbl_vaoucher.v_date AS date,
      tbl_transaction.t_amount AS amount,
      tbl_transaction.t_remark1 AS remark
    FROM tbl_member
    JOIN tbl_transaction ON tbl_member.mem_id = tbl_transaction.t_mem_id
    JOIN tbl_vaoucher ON tbl_transaction.t_vid = tbl_vaoucher.v_id
    WHERE tbl_member.mem_id = ?;
  `;


    const getdata = await query(getdataQuery, [memberId]);




  const total = getdata.reduce((sum, item) => sum + item.amount, 0);



    if (!getdata || getdata.length === 0) {
      return res.status(404).send({ status: false, message: "No data found" });
    }

    res.status(200).send({ status: true, data: total });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const getreport1 = async (req, res) => {
  const { sch_id } = req.body;

  try {
    if (!sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }

    const getdataQuery = `
      SELECT
        t.t_id,
        CASE WHEN t.t_remark IN ('1', '4', '7') THEN v.v_date ELSE NULL END as v_date,  -- Include v_date only when t_remark is '1', '4', or '7'
        v.v_amount,
        m.mem_name,
        m.mem_mobile,
        m.mem_address,
        t.t_amount,
        t.t_remark,
        t.created_at
      FROM
        tbl_transaction t
      INNER JOIN
        tbl_vaoucher v ON t.t_vid = v.v_id
      INNER JOIN
        tbl_member m ON t.t_mem_id = m.mem_id
      WHERE
        t.t_sch_id = ? `;

    const getdata = await query(getdataQuery, [sch_id]);

    if (!getdata || getdata.length === 0) {
      return res.status(404).send({ status: false, message: "No data found" });
    }

    const result = {};

    getdata.forEach(record => {
      if (!result[record.mem_name]) {
        result[record.mem_name] = {
          mem_name: record.mem_name,
          mem_mobile: record.mem_mobile,
          mem_address: record.mem_address,
          pay_amount: 0,
          winner_amount: 0,
          amount_to_get: 0,
          ag_commission: 0,
          paid_amount: 0,
          paid_amount1: 0,
          total: 0
        };

        // Add created_at date if mem_name contains "agency" or "agency_commission"
        if (record.mem_name.toLowerCase().includes("agency") || record.mem_name.toLowerCase().includes("agency_commission")) {
          // result[record.mem_name].v_date = record.created_at;
          const formattedDate = record.created_at ? new Date(record.created_at).toISOString().split('T')[0] : null;
          result[record.mem_name].v_date = formattedDate || '2024-06-14';
        }
      }

      if (record.t_remark === "1") {
        result[record.mem_name].pay_amount = record.t_amount;
        result[record.mem_name].amount_to_get += record.t_amount;
        // Include v_date only when t_remark is '1'
        result[record.mem_name].v_date = record.v_date;
      }

      if (record.t_remark === "3") {
        result[record.mem_name].winner_amount += record.t_amount;
      }

      if (record.t_remark === "5") {
        result[record.mem_name].amount_to_get = record.t_amount;
      }

      if (record.t_remark === "4") {
        result[record.mem_name].ag_commission = record.t_amount;
      }

      if (record.t_remark === "6") {
        result[record.mem_name].paid_amount += record.t_amount;
      }

      if (record.t_remark === "7") {
        result[record.mem_name].paid_amount1 += record.t_amount; 
      }

      // Calculate the total after all fields are updated
      result[record.mem_name].total = 
        result[record.mem_name].pay_amount +
        result[record.mem_name].winner_amount +
        result[record.mem_name].amount_to_get +
        result[record.mem_name].ag_commission +
        result[record.mem_name].paid_amount +
        result[record.mem_name].paid_amount1; // Assuming paid_amount and paid_amount1 should be subtracted from the total
    });

    // Convert result object to array
    const dataArray = Object.values(result);

    res.status(200).send({ status: true, data: dataArray });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const getreport2 = async (req, res) => {
  const { sch_id } = req.body;

  try {
    if (!sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }

    const getdataQuery = `
      SELECT
        t.t_id,
        CASE WHEN t.t_remark IN ('1', '4', '7') THEN v.v_date ELSE NULL END as v_date,
        v.v_amount,
        m.mem_name,
        m.mem_mobile,
        m.mem_address,
        t.t_amount,
        t.t_remark,
        t.t_bcdate_id,
        t.created_at
      FROM
        tbl_transaction t
      INNER JOIN
        tbl_vaoucher v ON t.t_vid = v.v_id
      INNER JOIN
        tbl_member m ON t.t_mem_id = m.mem_id
      WHERE
        t.t_sch_id = ?`;

    const getdata = await query(getdataQuery, [sch_id]);

    if (!getdata || getdata.length === 0) {
      return res.status(404).send({ status: false, message: "No data found" });
    }

    const result = {};

    getdata.forEach(record => {
      const bcdateId = record.t_bcdate_id;

      if (!result[bcdateId]) {
        result[bcdateId] = {};
      }

      if (!result[bcdateId][record.mem_name]) {
        result[bcdateId][record.mem_name] = {
          mem_name: record.mem_name,
          mem_mobile: record.mem_mobile,
          mem_address: record.mem_address,
          pay_amount: 0,
          winner_amount: 0,
          amount_to_get: 0,
          ag_commission: 0,
          paid_amount: 0,
          paid_amount1: 0,
          total: 0
        };

        // Add created_at date if mem_name contains "agency" or "agency_commission"
        if (record.mem_name.toLowerCase().includes("agency") || record.mem_name.toLowerCase().includes("agency_commission")) {
          const formattedDate = record.created_at ? new Date(record.created_at).toISOString().split('T')[0] : null;
          result[bcdateId][record.mem_name].v_date = formattedDate ;
        }
      }

      if (record.t_remark === "1"  ) {
        result[bcdateId][record.mem_name].pay_amount += record.t_amount;
        // result[bcdateId][record.mem_name].amount_to_get += record.t_amount;
        result[bcdateId][record.mem_name].v_date = record.v_date;
      }

      if (record.t_remark === "3") {
        result[bcdateId][record.mem_name].winner_amount += record.t_amount;
      }

      if (record.t_remark === "5") {
        result[bcdateId][record.mem_name].amount_to_get += record.t_amount;
      }

      if (record.t_remark === "4") {
        result[bcdateId][record.mem_name].ag_commission = record.t_amount;
      }

      if (record.t_remark === "6") {
        result[bcdateId][record.mem_name].paid_amount += record.t_amount;
      }

      if (record.t_remark === "7") {
        result[bcdateId][record.mem_name].paid_amount1 += record.t_amount; 
      }

      // Calculate the total after all fields are updated
      result[bcdateId][record.mem_name].total = 
        result[bcdateId][record.mem_name].pay_amount +
        result[bcdateId][record.mem_name].winner_amount +
        result[bcdateId][record.mem_name].amount_to_get +
        result[bcdateId][record.mem_name].ag_commission +
        result[bcdateId][record.mem_name].paid_amount +
        result[bcdateId][record.mem_name].paid_amount1;
    });

    // Convert result object to array of bcdateId grouped data
    const dataArray = Object.entries(result).map(([bcdateId, records]) => ({
      bcdateId,
      records: Object.values(records)
    }));

    res.status(200).send({ status: true, data: dataArray });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const getreportlastmonth = async (req, res) => {
  const { sch_id } = req.body;

  try {
    if (!sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }

    const getHighestBcdateIdQuery = 'SELECT t_bcdate_id FROM tbl_transaction WHERE t_sch_id = ? ORDER BY t_bcdate_id DESC LIMIT 1';
    const highestBcdateIdResult = await query(getHighestBcdateIdQuery, [sch_id]);
    
    if (!highestBcdateIdResult || highestBcdateIdResult.length === 0) {
      return res.status(200).send({ status: false, message: "No highest t_bcdate_id found for the given school ID" });
    }
    
    const highestBcdateId = highestBcdateIdResult[0].t_bcdate_id;

    const getdataQuery = `
      SELECT
        t.t_id,
        CASE WHEN t.t_remark IN ('1', '4', '7') THEN COALESCE(v.v_date, t.created_at) ELSE NULL END as v_date,
        v.v_amount,
        m.mem_name,
        m.mem_mobile,
        m.mem_address,
        t.t_amount,
        t.t_remark,
        t.created_at
      FROM
        tbl_transaction t
      INNER JOIN
        tbl_vaoucher v ON t.t_vid = v.v_id
      INNER JOIN
        tbl_member m ON t.t_mem_id = m.mem_id
      WHERE
        t.t_sch_id = ? AND t_bcdate_id = ?`;

    const getdata = await query(getdataQuery, [sch_id, highestBcdateId]);

    if (!getdata || getdata.length === 0) {
      return res.status(200).send({ status: false, message: "No data found for the highest t_bcdate_id" });
    }

    const result = {};

    // Process the data and add to result object
    getdata.forEach(record => {
      if (!result[record.mem_name]) {
        result[record.mem_name] = {
          mem_name: record.mem_name,
          mem_mobile: record.mem_mobile,
          mem_address: record.mem_address,
          pay_amount: 0,
          winner_amount: 0,
          amount_to_get: 0,
          ag_commission: 0,
          paid_amount: 0,
          paid_amount1: 0,
          total: 0
        };
      }

      if (record.t_remark === "1") {
        result[record.mem_name].pay_amount = record.t_amount;
        result[record.mem_name].amount_to_get += record.t_amount;
        result[record.mem_name].v_date = record.v_date;
      }

      if (record.t_remark === "3") {
        result[record.mem_name].winner_amount += record.t_amount;
      }

      if (record.t_remark === "5") {
        result[record.mem_name].amount_to_get = record.t_amount;
      }

      if (record.t_remark === "4") {
        result[record.mem_name].ag_commission = record.t_amount;
      }

      if (record.t_remark === "6") {
        result[record.mem_name].paid_amount += record.t_amount;
      }

      if (record.t_remark === "7") {
        result[record.mem_name].paid_amount1 += record.t_amount; 
      }

      // Calculate the total after all fields are updated
      result[record.mem_name].total = 
        result[record.mem_name].pay_amount +
        result[record.mem_name].winner_amount +
        result[record.mem_name].amount_to_get +
        result[record.mem_name].ag_commission +
        result[record.mem_name].paid_amount +
        result[record.mem_name].paid_amount1;
    });

    // Convert result object to array
    const dataArray = Object.values(result);

    res.status(200).send({ status: true, data: dataArray });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};



///////////////////////////////////////////////Day wise report ///////////////////////////////////////////////////////


// const getreportofdays = async (req, res) => {
//   const { date } = req.body;

//   try {
//     // Fetching transactions for the given date
//     const transactions = await query(
//       `SELECT * FROM tbl_transaction WHERE DATE(created_at) = ?`,
//       [date]
//     );
//     console.log((transactions))

//     // Sending the result back to the client
//     res.status(200).send({ status: true, data: transactions });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ status: false, message: "Internal Server Error" });
//   }
// };


const getreportofdays = async (req, res) => {
  const { date } = req.body;

  try {
    // Fetching transactions for the given date with only member name
    const results = await query(
      `SELECT 
          t.*,        -- Select all columns from tbl_transaction
          m.mem_name  -- Select only the member name from tbl_member
       FROM 
          tbl_transaction t
       JOIN 
          tbl_member m ON t.t_mem_id = m.mem_id
       WHERE 
          DATE(t.created_at) = ?`,
      [date]
    );

    // Sending the result back to the client
    res.status(200).send({ status: true, data: results });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};




module.exports = {
  getreport,
  getreport1,getreportlastmonth,getreport2,gettotalbalanceofagency,getreportofdays
};
