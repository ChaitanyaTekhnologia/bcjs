const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const winnerData = async (req, res) => {
  const { scheme_id } = req.body;

  if (!scheme_id) {
    return res.status(400).send({
      status: false,
      message: "Please provide the scheme_id",
    });
  }

  try {
    // Query to get total amount and scheme commission from tbl_scheme
    const [schemeResult] = await query(
      `SELECT s_total, s_commission, s_month, s_amount_per_head FROM tbl_scheme WHERE scheme_id = ?`,
      [scheme_id]
    );

    if (!schemeResult) {
      return res.status(404).send({
        status: false,
        message: "Scheme not found",
      });
    }

   const { s_total, s_commission, s_month,s_amount_per_head } = schemeResult;

    // Calculate 24 hours ago timestamp
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Query to get least bidding amount and name from tbl_bidding within the last 24 hours
    const [biddingResult] = await query(
      `SELECT b_name, b_amount
       FROM tbl_bidding
       WHERE created_at >= ? AND scheme_id = ?
       ORDER BY b_amount ASC
       LIMIT 1`,
      [twentyFourHoursAgo, scheme_id]
    );

    if (!biddingResult) {
      return res.status(404).send({
        status: false,
        message: "No bids found for the last 24 hours and the given scheme",
      });
    }

    

    const { b_name, b_amount } = biddingResult;

    const winner_amount = b_amount;
    const remaining_amount = s_total - winner_amount;
    const commission_amount = (remaining_amount * s_commission) / 100;
    const temp =(remaining_amount-commission_amount)/s_month ;
    const amount_to_pay = s_amount_per_head - temp;



    // Get current month name
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    // Insert winner data into tbl_winner
    const insertWinnerQuery = `
      INSERT INTO tbl_winner (scheme_id, w_month, w_name, w_amount, commission, remaining_amount, amount_to_pay)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await query(insertWinnerQuery, [
      scheme_id,
      currentMonth, // Using current month name as the w_month value
      b_name,
      winner_amount,
      commission_amount,
      remaining_amount,
      amount_to_pay,
    ]);

    return res.status(200).send({
      status: true,
      message: "Winner data inserted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

// const getWinnerData = async (req, res) => {
//   const { bid_sch_id, } = req.body;

//   // Define the time range for the last 24 hours

//   const now = new Date();
//   const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

//   try {
//     // Step 2: Get the highest bid amount for the scheme in the last 24 hours using created_at field
//     const findAmountTotalQuery = `
//       SELECT bid_mem_id, bid_amount 
//       FROM tbl_bidding 
//       WHERE bid_sch_id = ? AND created_at BETWEEN ? AND ?
//       ORDER BY bid_amount DESC 
//       LIMIT 1
//     `;
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//       last24Hours,
//       now,
//     ]);

//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No bid found for the provided scheme in the last 24 hours",
//       });
//     }

//     const highestBid = schAmountTotalResult[0];
//     const { bid_mem_id, bid_amount } = highestBid;


   
//     const findSchemeDetailQ = `
//       SELECT sch_total, sch_commission ,sch_status,sch_commission_amount
//       FROM tbl_scheme 
//       WHERE sch_id = ?
//     `;
//     const schemeTotal = await query(findSchemeDetailQ, [bid_sch_id]);

//     if (!schemeTotal || schemeTotal.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No scheme found",
//       });
//     }

//     const { sch_total: schTotal, sch_commission: commission } = schemeTotal[0];



//     const findMember = `
//       SELECT mem_name 
//       FROM tbl_member 
//       WHERE mem_id = ?
//     `;
//     const memberNameResult = await query(findMember, [bid_mem_id]);

//     if (!memberNameResult || memberNameResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No member found",
//       });
//     }

//     const win = memberNameResult[0].mem_name;
//     const winnerAmount=schTotal-bid_amount;
//     const winnerData = [{
//       winner_Name: win,
//       winnerAmount: winnerAmount,
//       total: schTotal,
//       biddingAmount:bid_amount
//     }];

//     return res.status(200).send({
//       status: true,
//       data: winnerData,
//       message: "Winner data retrieved successfully",
//     });
//   } catch (err) {
//     // If an error occurs, log the error and send an error response
//     console.error(err);
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };

// const getWinnerData = async (req, res) => {
//   const { bid_sch_id,bid_bcdate_id } = req.body;

//   // Define the time range for the last 24 hours

//   // const now = new Date();
//   // const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

//   try {
//     // Step 2: Get the highest bid amount for the scheme in the last 24 hours using created_at field
//     const findAmountTotalQuery = `
//       SELECT bid_mem_id, bid_amount 
//       FROM tbl_bidding 
//       WHERE bid_sch_id = ? AND  bid_bcdate_id = ?
//       ORDER BY bid_amount DESC 
//       LIMIT 1
//     `;
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//       bid_bcdate_id
//     ]);

//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No bid found for the provided scheme in the last 24 hours",
//       });
//     }

//     const highestBid = schAmountTotalResult[0];
//     const { bid_mem_id, bid_amount } = highestBid;


   
//     const findSchemeDetailQ = `
//       SELECT sch_total, sch_commission ,sch_status,sch_commission_amount
//       FROM tbl_scheme 
//       WHERE sch_id = ?
//     `;
//     const schemeTotal = await query(findSchemeDetailQ, [bid_sch_id]);

//     if (!schemeTotal || schemeTotal.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No scheme found",
//       });
//     }

//     const { sch_total: schTotal, sch_commission: commission } = schemeTotal[0];



//     const findMember = `
//       SELECT mem_name 
//       FROM tbl_member 
//       WHERE mem_id = ?
//     `;
//     const memberNameResult = await query(findMember, [bid_mem_id]);

//     if (!memberNameResult || memberNameResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No member found",
//       });
//     }

//     const win = memberNameResult[0].mem_name;
//     const winnerAmount=schTotal-bid_amount;
//     const winnerData = [{
//       winner_Name: win,
//       winnerAmount: winnerAmount,
//       total: schTotal,
//       biddingAmount:bid_amount,
//       memId:bid_mem_id,
//       bcdateId:bid_bcdate_id,

//     }];

//     return res.status(200).send({
//       status: true,
//       data: winnerData,
//       message: "Winner data retrieved successfully",
//     });
//   } catch (err) {
//     // If an error occurs, log the error and send an error response
//     console.error(err);
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };




// const getWinnerData = async (req, res) => {
//   const { bid_sch_id,bid_bcdate_id } = req.body;
 

//   try {
//     const findAmountTotalQuery = `
//       SELECT bid_mem_id, bid_amount
//       FROM tbl_bidding
//       WHERE bid_sch_id = ? AND  bid_bcdate_id = ?
//       ORDER BY bid_amount DESC
//       LIMIT 1
//     `;
//     const schAmountTotalResult = await query(findAmountTotalQuery, [
//       bid_sch_id,
//       bid_bcdate_id
//     ]);
 
//     if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No bid found for the provided scheme in the last 24 hours",
//       });
//     }
 
//     const highestBid = schAmountTotalResult[0];
//     const { bid_mem_id, bid_amount } = highestBid;
 
//     const bidArray = JSON.parse(bid_mem_id);
   
//     const findSchemeDetailQ = `
//       SELECT sch_fiexd_total, sch_commission ,sch_status,sch_commission_amount
//       FROM tbl_scheme
//       WHERE sch_id = ?
//     `;
//     const schemeTotal = await query(findSchemeDetailQ, [bid_sch_id]);
 
//     if (!schemeTotal || schemeTotal.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No scheme found",
//       });
//     }
 
//     const { sch_fiexd_total: schTotal, sch_commission: commission } = schemeTotal[0];
 
 
//     const findMember = `
//       SELECT mem_name
//       FROM tbl_member
//       WHERE mem_id = ?
//     `;
//     const memberNameResult = await query(findMember, [bid_mem_id]);
 
//     if (!memberNameResult || memberNameResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "No member found",
//       });
//     }
 
//     const win = memberNameResult[0].mem_name;
//     const winnerAmount=schTotal-bid_amount;
//     const winnerData = [{
//       winner_Name: win,
//       winnerAmount: winnerAmount,
//       total: schTotal,
//       biddingAmount:bid_amount,
//       memId:bid_mem_id,
//       bcdateId:bid_bcdate_id,
//     }];
 
//     return res.status(200).send({
//       status: true,
//       data: winnerData,
//       message: "Winner data retrieved successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };







const getWinnerData = async (req, res) => {
  const { bid_sch_id, bid_bcdate_id } = req.body;

  try {
    // Step 1: Get the highest bid details
    const findAmountTotalQuery = `
      SELECT bid_mem_id, bid_amount
      FROM tbl_bidding
      WHERE bid_sch_id = ? AND  bid_bcdate_id = ?
      ORDER BY bid_amount DESC
      LIMIT 1
    `;
    const schAmountTotalResult = await query(findAmountTotalQuery, [
      bid_sch_id,
      bid_bcdate_id,
    ]);

    if (!schAmountTotalResult || schAmountTotalResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No bid found for the provided scheme in the last 24 hours",
      });
    }

    const highestBid = schAmountTotalResult[0];
    const { bid_mem_id, bid_amount } = highestBid;

    // Parse bid_mem_id to get an array of member IDs
    const bidArray = JSON.parse(bid_mem_id);

    // Step 2: Get scheme details
    const findSchemeDetailQ = `
      SELECT sch_fiexd_total, sch_commission, sch_status, sch_commission_amount
      FROM tbl_scheme
      WHERE sch_id = ?
    `;
    const schemeTotal = await query(findSchemeDetailQ, [bid_sch_id]);

    if (!schemeTotal || schemeTotal.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No scheme found",
      });
    }

    const { sch_fiexd_total: schTotal, sch_commission: commission } = schemeTotal[0];

    // Step 3: Fetch member names for each member in bidArray
    const winnerData = [];

    for (const memberId of bidArray) {
      const findMember = `
        SELECT mem_name
        FROM tbl_member
        WHERE mem_id = ?
      `;
      const memberNameResult = await query(findMember, [memberId]);

      if (memberNameResult && memberNameResult.length > 0) {
        const win = memberNameResult[0].mem_name;
        const winnerAmount = schTotal - bid_amount;

        // Add the winner's data to the result array
        winnerData.push({
          winner_Name: win,
          winnerAmount: winnerAmount / bidArray.length, // Divide equally among members
          total: schTotal,
          biddingAmount: bid_amount,
          memId: memberId,
          bcdateId: bid_bcdate_id,
        });
      }
    }

    return res.status(200).send({
      status: true,
      data: winnerData,
      message: "Winner data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};





























const getWinnerdatascheme = async (req, res) => {
  const { scheme_id } = req.body;
  try {
    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 2);

    // console.log(twentyFourHoursAgo)

    // Construct the SQL query with a condition to delete data created in the last 24 hours
    const fetchwinnerdataschemeQ = `
      SELECT * FROM tbl_winner 
      WHERE  scheme_id = ? 
        AND created_at >= ?`;

    // Execute the query with the provided parameters
    const winnerData = await query(fetchwinnerdataschemeQ, [
      scheme_id,
      twentyFourHoursAgo,
    ]);

    // Send a success response
    return res.status(200).send({
      status: true,
      data: winnerData,
      message: "winner data get successfully",
    });
  } catch (err) {
    // If an error occurs, log the error and send an error response
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};















const getWinnerDataBySchemeMonth = async (req, res) => {
  const { s_name, w_month } = req.body;

  try {
    // Query to get scheme_id based on s_name
    const getSchemeIdQuery =
      "SELECT scheme_id FROM tbl_scheme WHERE s_name = ?";
    const schemeResult = await query(getSchemeIdQuery, [s_name]);

    if (schemeResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "Scheme not found",
      });
    }

    const scheme_id = schemeResult[0].scheme_id;

    // Query to get winner based on scheme_id and w_month
    const getWinnerQuery =
      "SELECT * FROM tbl_winner WHERE scheme_id = ? AND w_month = ?";
    const winnerData = await query(getWinnerQuery, [scheme_id, w_month]);

    if (winnerData.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No winner found for the specified scheme and month",
      });
    }

    return res.status(200).send({
      status: true,
      data: winnerData,
      message: "Winner data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getWinnerDataByScheme = async (req, res) => {
  const { scheme_id } = req.body;
  try {
    const getWinnerBySchemeQuery =
      "SELECT * FROM tbl_winner WHERE scheme_id = ? ";
    const winnerData = await query(getWinnerBySchemeQuery, [scheme_id]);
    console.log(winnerData);

    return res.status(200).send({
      status: true,
      data: winnerData,
      message: "Winner data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Get winner by Month and scheme id
const getWinnerBySchemeidname = async (req, res) => {
  const { w_month, scheme_id } = req.body;
  if (!w_month || !scheme_id) {
    return res.status(400).send({
      status: false,
      message: "Please provide both w_month and scheme_id",
    });
  }
  try {
    const getWinnerBySchemeQuery =
      "SELECT * FROM tbl_winner WHERE scheme_id = ? AND w_month= ? ";
    const winnerData = await query(getWinnerBySchemeQuery, [
      scheme_id,
      w_month,
    ]);
    console.log(winnerData);
    return res.status(200).send({
      status: true,
      data: winnerData,
      message: "Winner data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};



const getWinnerBySchemeidnamebidding = async (req, res) => {
  const { w_month, scheme_id } = req.body;
  if (!w_month || !scheme_id) {
    return res.status(400).send({
      status: false,
      message: "Please provide both w_month and scheme_id",
    });
  }
  try {
    const getWinnerBySchemeQuery =
      "SELECT * FROM tbl_winner WHERE scheme_id = ? AND w_month= ? ";
    const winnerData = await query(getWinnerBySchemeQuery, [
      scheme_id,
      w_month,
    ]);
    console.log(winnerData);
    return res.status(200).send({
      status: true,
      data: winnerData,
      message: "Winner data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};














// const reportData = async (req, res) => {
//   const { scheme_id, month } = req.body;

//   if (!scheme_id || !month) {
//     return res.status(400).json({ error: "scheme_id and month are required" });
//   }

//   try {
//     const rows = await query(
//       `SELECT 
//           tm.m_name,
//           COALESCE(SUM(tp.p_amount), 0) AS p_amount,
//           IFNULL(SUM(IF(tm.m_name = tw.w_name AND tw.w_month = ?, tw.w_amount, 0)), 0) AS w_amount,
//           (SELECT tw.w_month FROM tbl_winner tw WHERE tw.scheme_id = ? AND tw.w_month = ? LIMIT 1) AS w_month,
//           (SELECT commission FROM tbl_winner tw WHERE tw.scheme_id = ? AND tw.w_month = ? LIMIT 1) AS agency_commission
//        FROM 
//           tbl_member tm
//        JOIN 
//           tbl_s ts ON tm.member_id = ts.member_id
//        LEFT JOIN 
//           tbl_payment tp ON ts.scheme_id = tp.scheme_id AND tp.p_m_name = tm.m_name
//        LEFT JOIN 
//           tbl_winner tw ON ts.scheme_id = tw.scheme_id AND tm.m_name = tw.w_name
//        WHERE 
//           ts.scheme_id = ? 
//        GROUP BY
//           tm.m_name`,
//       [month, scheme_id, month, scheme_id, month, scheme_id]
//     );

//     if (rows.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No data found for the provided scheme_id and month" });
//     }

//     res.json(rows);
//   } catch (error) {
//     console.error("Database query error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };




const reportData = async (req, res) => {
  const { scheme_id, month,year } = req.body;

  if (!scheme_id || !month) {
    return res.status(400).json({ error: "scheme_id and month are required" });
  }

  try {
    const rows = await query(
      `SELECT 
          tm.m_name,
          COALESCE(SUM(tp.p_amount), 0) AS p_amount,
          IFNULL(SUM(IF(tm.m_name = tw.w_name AND tw.w_month = ?, tw.w_amount, 0)), 0) AS w_amount,
          (SELECT tw.w_month FROM tbl_winner tw WHERE tw.scheme_id = ? AND tw.w_month = ? LIMIT 1) AS w_month,
          (SELECT commission FROM tbl_winner tw WHERE tw.scheme_id = ? AND tw.w_month = ? LIMIT 1) AS agency_commission
       FROM 
          tbl_member tm
       JOIN 
          tbl_s ts ON tm.member_id = ts.member_id
       LEFT JOIN 
          tbl_payment tp ON ts.scheme_id = tp.scheme_id AND tp.p_m_name = tm.m_name
       LEFT JOIN 
          tbl_winner tw ON ts.scheme_id = tw.scheme_id AND tm.m_name = tw.w_name
       WHERE 
          ts.scheme_id = ? 
       GROUP BY
          tm.m_name`,
      [month, scheme_id, month, scheme_id, month, scheme_id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the provided scheme_id and month" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
























const getWinnerDatatest = async (req, res) => {
  const { bid_sch_id } = req.body;

  try {
    // Your SQL query as a string
    const winnerDataQuery = `
      SELECT 
        tbl_member.mem_name AS member_name,
        tbl_member.mem_mobile AS member_mobile,
        tbl_member.mem_address AS member_address,
        tbl_vaoucher.v_date AS voucher_date,
        tbl_vaoucher.v_amount AS voucher_amount,
        tbl_transaction.t_amount AS transaction_amount,
        tbl_transaction.t_remark AS transaction_remark
      FROM 
        tbl_transaction
      JOIN 
        tbl_member ON tbl_transaction.t_mem_id = tbl_member.mem_id
      JOIN 
        tbl_vaoucher ON tbl_transaction.t_vid = tbl_vaoucher.v_id
      WHERE 
        tbl_transaction.t_sch_id = ? AND
        tbl_transaction.t_remark = '3';
    `;

    // Execute the query using your database connection library
    const winnerDataResult = await query(winnerDataQuery, [bid_sch_id]);

    // Return the result
    return res.status(200).send({
      status: true,
      data: winnerDataResult,
      message: "Winner data retrieved successfully",
    });
  } catch (err) {
    // If an error occurs, log the error and send an error response
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};



const getWinnerDataonmonthscheme = async (req, res) => {
  const { sch_name, month, year } = req.body;

  try {
    if (!sch_name || !month || !year) {
      return res.status(400).send({
        status: false,
        message: "Please provide sch_name, month, and year.",
      });
    }

    const getschemeIdQuery = "SELECT sch_id FROM tbl_scheme WHERE sch_name = ?";
    const schemeIdResult = await query(getschemeIdQuery, [sch_name]);

    if (!schemeIdResult || schemeIdResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No scheme found with the provided name",
      });
    }

    const sch_id = schemeIdResult[0].sch_id;

    const winnerDataQuery = `
      SELECT 
        tbl_member.mem_name AS member_name,
        tbl_member.mem_mobile AS member_mobile,
        tbl_member.mem_address AS member_address,
        tbl_vaoucher.v_date AS voucher_date,
        tbl_vaoucher.v_amount AS voucher_amount,
        tbl_transaction.t_amount AS transaction_amount,
        tbl_transaction.t_remark AS transaction_remark
      FROM 
        tbl_transaction
      JOIN 
        tbl_member ON tbl_transaction.t_mem_id = tbl_member.mem_id
      JOIN 
        tbl_vaoucher ON tbl_transaction.t_vid = tbl_vaoucher.v_id
      WHERE 
        tbl_transaction.t_sch_id = ? AND
        tbl_transaction.t_remark = '3' AND
        MONTH(tbl_vaoucher.v_date) = ? AND
        YEAR(tbl_vaoucher.v_date) = ?
    `;

    const winnerDataResult = await query(winnerDataQuery, [sch_id, month, year]);

    if (!winnerDataResult || winnerDataResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No winner found for the provided scheme and month",
      });
    }

    return res.status(200).send({
      status: true,
      data: winnerDataResult,
      message: "Winner data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  winnerData,
  getWinnerDataByScheme,
  getWinnerBySchemeidname,
  getWinnerdatascheme,
  getWinnerDataBySchemeMonth,
  reportData,
  getWinnerData,getWinnerDatatest,getWinnerDataonmonthscheme
};


