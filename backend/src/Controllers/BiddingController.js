const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

// const createBidding = async (req, res) => {
//   const { bid_name, bid_amount, bid_month, bid_sch_id } = req.body;
//   console.log(req.body)
//   try {
//     // Check if all required fields are provided
//     if (!bid_name || !bid_amount || !bid_month || !bid_sch_id) {
//       return res.status(400).send({
//         status: false,
//         message: "Please provide all required fields",
//       });
//     }
//     const findBcDateIdQuery = `
//       SELECT bcdate_id
//       FROM tbl_bcdate
//       WHERE dc_sch_id = ? AND bc_status != 1
//       LIMIT 1
//     `;
//     const bcdateResult = await query(findBcDateIdQuery, [bid_sch_id]);

//     let bcdate_id;
//     console.log("bcdateResult",bcdateResult)

//     if (bcdateResult.length === 0) {
//       const findFirstRecordQuery = `
//         SELECT bcdate_id
//         FROM tbl_bcdate
//         WHERE dc_sch_id = ?
//         LIMIT 1
//       `;
//       const firstRecordResult = await query(findFirstRecordQuery, [bid_sch_id]);

//     console.log(firstRecordResult)
//       if (firstRecordResult.length === 0) {
//         return res
//           .status(404)
//           .send({ status: false, message: "No records found in tbl_bcdate" });
//       }

//       bcdate_id = firstRecordResult[0].bcdate_id;
//     }
//     else {
//       bcdate_id = bcdateResult[0].bcdate_id;

//       console.log("bcdate_id",bcdate_id)

//     }

//     // Find the mem_id from the tbl_member table based on bid_name
//     const findMemberIdQuery = `
//       SELECT mem_id FROM tbl_member
//       WHERE mem_name = ? `;
//     const memberResult = await query(findMemberIdQuery, [bid_name]);

//     if (memberResult.length === 0) {
//       return res.status(404).send({
//         status: false,
//         message: "Member not found",
//       });
//     }

//     const bid_mem_id = memberResult[0].mem_id;

//     console.log("bid_mem_id",bid_mem_id)

//     const checkExistingBiddingQuery = `
//       SELECT * FROM tbl_bidding
//       WHERE bid_mem_id = ? AND bid_bcdate_id = ? AND bid_sch_id = ?
//     `;
//     const existingBidding = await query(checkExistingBiddingQuery, [
//       bid_mem_id,
//       bcdate_id,
//       bid_sch_id,
//     ]);

// console.log("existingBidding",existingBidding);

//     if (existingBidding.length > 0) {
//       const existingRecord = existingBidding[0];

//       console.log("existingRecord.bid_amount",existingRecord.bid_amount);
//       console.log("bid_amount",bid_amount);
//       console.log("bid_mem_id",bid_mem_id);
//        console.log("bcdate_id", bcdate_id);

//       if (bid_amount > existingRecord.bid_amount) {
//         console.log("hello")
//         const updateBiddingQuery = `
//           UPDATE tbl_bidding
//           SET bid_amount = ?
//           WHERE bid_mem_id = ? AND bid_bcdate_id = ? AND bid_sch_id = ?
//         `;
//         await query(updateBiddingQuery, [
//           bid_amount,
//           bid_mem_id,
//           bcdate_id,
//           bid_sch_id,
//         ]);
//         return res.status(200).send({
//           status: true,
//           message:"Bidding updated successfully",
//         });
//       } else {
//         // If the provided bid_amount is not less than the existing bid_amount, do nothing
//         return res.status(200).send({
//           status: true,
//           message: "Bidding already exists with a greater or equal amount",
//         });
//       }
//     }
//     // Insert the new bidding
//     const insertBiddingQuery = `
//       INSERT INTO tbl_bidding (bid_amount, bid_month, bid_sch_id, bid_mem_id, bid_bcdate_id)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const result = await query(insertBiddingQuery, [
//       bid_amount,
//       bid_month,
//       bid_sch_id,
//       bid_mem_id,
//       bcdate_id,
//     ]);

//     return res.status(200).send({
//       status: true,
//       data: result,
//       message: "Bidding created successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };

const createBidding = async (req, res) => {
  const { bid_name, bid_amount, bid_month, bid_sch_id } = req.body;
  console.log(req.body);
  try {
    // Check if all required fields are provided
    if (!bid_name || !bid_amount || !bid_month || !bid_sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }

    const findBcDateIdQuery = `
      SELECT bcdate_id 
      FROM tbl_bcdate 
      WHERE dc_sch_id = ? AND bc_status != 1
      LIMIT 1
    `;

    const bcdateResult = await query(findBcDateIdQuery, [bid_sch_id]);

    let bcdate_id;
    console.log("bcdateResult", bcdateResult);

    if (bcdateResult.length === 0) {
      const findFirstRecordQuery = `
        SELECT bcdate_id 
        FROM tbl_bcdate 
        WHERE dc_sch_id = ? 
        LIMIT 1
      `;
      const firstRecordResult = await query(findFirstRecordQuery, [bid_sch_id]);

      console.log(firstRecordResult);

      if (firstRecordResult.length === 0) {
        return res
          .status(404)
          .send({ status: false, message: "No records found in tbl_bcdate" });
      }

      bcdate_id = firstRecordResult[0].bcdate_id;
    } else {
      bcdate_id = bcdateResult[0].bcdate_id;

      console.log("bcdate_id", bcdate_id);
    }

    // Find the mem_id from the tbl_member table based on bid_name
    // const findMemberIdQuery = `
    //   SELECT mem_id FROM tbl_member
    //   WHERE mem_name = ? `;
    // const memberResult = await query(findMemberIdQuery, [bid_name]);

    // if (memberResult.length === 0) {
    //   return res.status(404).send({
    //     status: false,
    //     message: "Member not found",
    //   });
    // }
    // const bid_mem_id = memberResult[0].mem_id;
    // console.log("bid_mem_id", bid_mem_id);
    // const checkExistingBiddingQuery = `
    //   SELECT * FROM tbl_bidding
    //   WHERE bid_mem_id = ? AND bid_bcdate_id = ? AND bid_sch_id = ?
    // `;
    // const existingBidding = await query(checkExistingBiddingQuery, [
    //   bid_mem_id,
    //   bcdate_id,
    //   bid_sch_id,
    // ]);

    const bid_mem_id = bid_name;
    console.log("bid_mem_id", bid_mem_id);

    const checkExistingBiddingQuery = `
  SELECT * FROM tbl_bidding 
  WHERE  bid_mem_id = ? 
  AND bid_bcdate_id = ? 
  AND bid_sch_id = ?
`;

    const existingBidding = await query(checkExistingBiddingQuery, [
      bid_mem_id,
      bcdate_id,
      bid_sch_id,
    ]);

    const getMaxBidAmountQuery = `
    SELECT MAX(bid_amount) as max_bid_amount 
    FROM tbl_bidding 
    WHERE bid_bcdate_id = ? AND bid_sch_id = ?
  `;
    const maxBidAmountResult = await query(getMaxBidAmountQuery, [
      bcdate_id,
      bid_sch_id,
    ]);
    const max_bid_amount = maxBidAmountResult[0]?.max_bid_amount || 0;

    // Get the scheme's total amount (sch_total)
    const getSchemeTotalQuery = `
    SELECT sch_total 
    FROM tbl_scheme
    WHERE sch_id = ?
  `;
    const schemeTotalResult = await query(getSchemeTotalQuery, [bid_sch_id]);
    const sch_total = schemeTotalResult[0]?.sch_total || 0;

    // Check if the provided bid_amount is greater than the maximum bid_amount
    if (bid_amount <= max_bid_amount) {
      return res.status(400).send({
        status: false,
        message: `Bid amount should be greater than the current maximum bid amount of ${max_bid_amount}`,
      });
    }

    // Check if the provided bid_amount exceeds the scheme's total amount
    if (bid_amount > sch_total) {
      return res.status(400).send({
        status: false,
        message: `Bid amount should not be more than the scheme total amount of ${sch_total}`,
      });
    }

    if (existingBidding.length > 0) {
      const existingRecord = existingBidding[0];

      console.log("existingRecord.bid_amount", existingRecord.bid_amount);
      console.log("bid_amount", bid_amount);
      console.log("bid_mem_id", bid_mem_id);
      console.log("bcdate_id", bcdate_id);

      if (bid_amount > existingRecord.bid_amount) {
        console.log("hello");
        const updateBiddingQuery = `
          UPDATE tbl_bidding 
          SET bid_amount = ?
          WHERE bid_mem_id = ? AND bid_bcdate_id = ? AND bid_sch_id = ?
        `;
        await query(updateBiddingQuery, [
          bid_amount,
          bid_mem_id,
          bcdate_id,
          bid_sch_id,
        ]);
        return res.status(200).send({
          status: true,
          message: "Bidding updated successfully",
        });
      } else {
        // If the provided bid_amount is not less than the existing bid_amount, do nothing
        return res.status(200).send({
          status: true,
          message: "Bidding already exists with a greater or equal amount",
        });
      }
    }

    // Insert the new bidding
    const insertBiddingQuery = `
      INSERT INTO tbl_bidding (bid_amount, bid_month, bid_sch_id, bid_mem_id, bid_bcdate_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await query(insertBiddingQuery, [
      bid_amount,
      bid_month,
      bid_sch_id,
      bid_mem_id,
      bcdate_id,
    ]);

    return res.status(200).send({
      status: true,
      data: result,
      message: "Bidding created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

// const createBidding = async (req, res) => {
//   const { bid_name, bid_amount, bid_month, bid_sch_id } = req.body;
//   console.log(req.body);
//   try {
//     // Check if all required fields are provided
//     if (!bid_name || !bid_amount || !bid_month || !bid_sch_id) {
//       return res.status(400).send({
//         status: false,
//         message: "Please provide all required fields",
//       });
//     }

//     // Query to find the active bcdate_id
//     const findBcDateIdQuery = `
//       SELECT bcdate_id
//       FROM tbl_bcdate
//       WHERE dc_sch_id = ? AND bc_status != 1
//       LIMIT 1
//     `;

//     const bcdateResult = await query(findBcDateIdQuery, [bid_sch_id]);
//     let bcdate_id;
//     console.log("bcdateResult", bcdateResult);

//     // If no active bcdate is found, fetch the first record in tbl_bcdate
//     if (bcdateResult.length === 0) {
//       const findFirstRecordQuery = `
//         SELECT bcdate_id
//         FROM tbl_bcdate
//         WHERE dc_sch_id = ?
//         LIMIT 1
//       `;
//       const firstRecordResult = await query(findFirstRecordQuery, [bid_sch_id]);

//       if (firstRecordResult.length === 0) {
//         return res.status(404).send({
//           status: false,
//           message: "No records found in tbl_bcdate",
//         });
//       }

//       bcdate_id = firstRecordResult[0].bcdate_id;
//     } else {
//       bcdate_id = bcdateResult[0].bcdate_id;
//       console.log("bcdate_id", bcdate_id);
//     }

//     // Using bid_name as the bid_mem_id (assuming it's an array like [1,2,3])
//     const bid_mem_id = bid_name;
//     console.log("bid_mem_id", bid_mem_id);

//     // Query to check if the bidding already exists
//     const checkExistingBiddingQuery = `
//       SELECT * FROM tbl_bidding
//       WHERE (JSON_CONTAINS(bid_mem_id, ?, '$') OR JSON_EQUALS(bid_mem_id, ?))
//       AND bid_bcdate_id = ?
//       AND bid_sch_id = ?
//     `;

//     const existingBidding = await query(checkExistingBiddingQuery, [
//       JSON.stringify(bid_mem_id),  // Convert the array to JSON format for partial match
//       JSON.stringify(bid_mem_id),  // Convert the array to JSON format for exact match
//       bcdate_id,
//       bid_sch_id,
//     ]);

//     // Query to get the maximum bid amount for the bcdate and scheme
//     const getMaxBidAmountQuery = `
//       SELECT MAX(bid_amount) as max_bid_amount
//       FROM tbl_bidding
//       WHERE bid_bcdate_id = ? AND bid_sch_id = ?
//     `;
//     const maxBidAmountResult = await query(getMaxBidAmountQuery, [
//       bcdate_id,
//       bid_sch_id,
//     ]);
//     const max_bid_amount = maxBidAmountResult[0]?.max_bid_amount || 0;

//     // Query to get the total amount of the scheme
//     const getSchemeTotalQuery = `
//       SELECT sch_total
//       FROM tbl_scheme
//       WHERE sch_id = ?
//     `;
//     const schemeTotalResult = await query(getSchemeTotalQuery, [bid_sch_id]);
//     const sch_total = schemeTotalResult[0]?.sch_total || 0;

//     // Ensure the provided bid amount is greater than the current maximum bid amount
//     if (bid_amount <= max_bid_amount) {
//       return res.status(400).send({
//         status: false,
//         message: `Bid amount should be greater than the current maximum bid amount of ${max_bid_amount}`,
//       });
//     }

//     // Ensure the provided bid amount does not exceed the scheme's total amount
//     if (bid_amount > sch_total) {
//       return res.status(400).send({
//         status: false,
//         message: `Bid amount should not exceed the scheme's total amount of ${sch_total}`,
//       });
//     }

//     // If the bidding already exists, update the bid if the new amount is higher
//     if (existingBidding.length > 0) {
//       const existingRecord = existingBidding[0];

//       if (bid_amount > existingRecord.bid_amount) {
//         const updateBiddingQuery = `
//           UPDATE tbl_bidding
//           SET bid_amount = ?
//           WHERE (JSON_CONTAINS(bid_mem_id, ?, '$') OR JSON_EQUALS(bid_mem_id, ?))
//           AND bid_bcdate_id = ?
//           AND bid_sch_id = ?
//         `;
//         await query(updateBiddingQuery, [
//           bid_amount,
//           JSON.stringify(bid_mem_id),
//           JSON.stringify(bid_mem_id),
//           bcdate_id,
//           bid_sch_id,
//         ]);
//         return res.status(200).send({
//           status: true,
//           message: "Bidding updated successfully",
//         });
//       } else {
//         return res.status(200).send({
//           status: true,
//           message: "Bidding already exists with an equal or higher amount",
//         });
//       }
//     }

//     // Insert the new bidding if it doesn't already exist
//     const insertBiddingQuery = `
//       INSERT INTO tbl_bidding (bid_amount, bid_month, bid_sch_id, bid_mem_id, bid_bcdate_id)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const result = await query(insertBiddingQuery, [
//       bid_amount,
//       bid_month,
//       bid_sch_id,
//       JSON.stringify(bid_mem_id),  // Store the bid_mem_id as JSON
//       bcdate_id,
//     ]);

//     return res.status(200).send({
//       status: true,
//       data: result,
//       message: "Bidding created successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({
//       status: false,
//       message: err.message,
//     });
//   }
// };

const getMemberName = async (req, res) => {
  const { sch_id } = req.query;
  if (!sch_id) {
    return res.status(400).send({
      status: false,
      message: "sch_idis required",
    });
  }
  try {
    const getUsersBySchemeQuery =
      "SELECT mem_name FROM tbl_member WHERE sch_id= ?";
    const userData = await query(getUsersBySchemeQuery, [sch_id]);
    const memberNames = userData.map((user) => user.mem_name);
    // console.log(memberNames);
    return res.status(200).send({
      status: true,
      data: memberNames,
      message: "User data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getlastbcdateId = async (req, res) => {
  const { bid_sch_id } = req.body;
  try {
    // Check if bid_sch_id is provided
    if (!bid_sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide bid_sch_id",
      });
    }

    // SQL query to get the last inserted bid_bcdate_id for the given bid_sch_id
    const getPaymentQuery = `
      SELECT bid_bcdate_id
      FROM tbl_bidding
      WHERE bid_sch_id = ?
      ORDER BY bid_bcdate_id DESC
      LIMIT 1
    `;

    // Execute the query with the provided bid_sch_id
    const [bidbcdate] = await query(getPaymentQuery, [bid_sch_id]);

    // Log the retrieved data
    console.log(bidbcdate);

    // Send a success response with the data
    return res.status(200).send({
      status: true,
      data: bidbcdate,
      message: "Bidding data retrieved successfully",
    });
  } catch (err) {
    // Handle any errors that occur during the execution
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

///CORRECT/////

// const getBiddingMonthBasis = async (req, res) => {
//   const { bid_sch_id } = req.body;
//   try {
//     // Check if bid_sch_id is provided
//     if (!bid_sch_id) {
//       return res.status(400).send({
//         status: false,
//         message: "Please provide bid_sch_id",
//       });
//     }

//     const getBiddingQuery =
//       "SELECT bcdate_id FROM tbl_bcdate WHERE dc_sch_id = ? AND bc_status = ? ORDER BY bcdate_id LIMIT 1";
//     const result = await query(getBiddingQuery, [bid_sch_id, false]);
//     const bcdate_id = result[0].bcdate_id;

//     // SQL query to get bidding data with specific fields along with member names
//     const getPaymentQuery = `
//       SELECT b.bid_id, b.bid_amount, b.bid_month,b.bid_bcdate_id, m.mem_name
//       FROM tbl_bidding b
//       JOIN tbl_member m ON b.bid_mem_id = m.mem_id
//       WHERE b.bid_sch_id = ?
//       AND b.bid_bcdate_id = ?`;

//     // Execute the query with the provided bid_sch_id
//     const biddingData = await query(getPaymentQuery, [bid_sch_id, bcdate_id]);

//     // Log the retrieved data
//     console.log(biddingData);

//     // Send a success response with the data
//     return res.status(200).send({
//       status: true,
//       data: biddingData,
//       message: "Bidding data retrieved successfully",
//     });
//   } catch (err) {
//     // Handle any errors that occur during the execution
//     console.error(err);
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };

/////CORRECT/////

const getBiddingMonthBasis = async (req, res) => {
  const { bid_sch_id } = req.body;
  try {
    if (!bid_sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide bid_sch_id",
      });
    }

    const getBiddingQuery =
      "SELECT bcdate_id FROM tbl_bcdate WHERE dc_sch_id = ? AND bc_status = ? ORDER BY bcdate_id LIMIT 1";
    const result = await query(getBiddingQuery, [bid_sch_id, false]);
    const bcdate_id = result[0].bcdate_id;
    console.log(bcdate_id);

    const getAllUsersQuery =
      "SELECT bid_mem_id FROM tbl_bidding WHERE bid_sch_id = ? AND bid_bcdate_id = ? ";
    const result1 = await query(getAllUsersQuery, [bid_sch_id, bcdate_id]);
    console.log(result1);

    const convertedData = result1.map((item) => ({
      ...item,
      bid_mem_id: JSON.parse(item.bid_mem_id), // Convert string to array
    }));

    console.log(convertedData);

    const getmemnber = "SELECT * FROM tbl_member  ";
    const members = await query(getmemnber);

    //   const members = [
    //     { id: 1, mem_name: "Alice" },
    //     { id: 2, mem_name: "Bob" },
    //     { id: 3, mem_name: "Charlie" }
    // ];

    // Your bid_mem_id data
    // const bidMemIds = [
    //     { bid_mem_id: [1, 2] },
    //     { bid_mem_id: [1, 2, 3] }
    // ];

    // Function to get member names based on bid_mem_id
    const getMemberNames = (convertedData) => {
      return members
        .filter((member) => convertedData.includes(member.mem_id)) // Filter members based on IDs
        .map((member) => member.mem_name) // Map to member names
        .join(", "); // Combine names into a single string
    };

    // Combine member names for each bid_mem_id
    const result2 = convertedData.map((item) => ({
      bid_mem_id: item.bid_mem_id,
      member_names: getMemberNames(item.bid_mem_id), // Fetch member names
    }));

    console.log(result2);

    const getPaymentQuery = `
      SELECT b.bid_id, b.bid_amount, b.bid_month,b.bid_bcdate_id, b.bid_mem_id
      FROM tbl_bidding b
      WHERE b.bid_sch_id = ?
      AND b.bid_bcdate_id = ?`;
    const biddingData = await query(getPaymentQuery, [bid_sch_id, bcdate_id]);

    console.log(biddingData);

    const combinedData = biddingData.map((bid) => {
      // Parse bid_mem_id from string to array
      const parsedBidMemId = JSON.parse(bid.bid_mem_id);

      // Find corresponding member_names
      const foundMember = result2.find((item) => {
        // Check if the bid_mem_id matches
        return (
          JSON.stringify(item.bid_mem_id) === JSON.stringify(parsedBidMemId)
        );
      });

      // Return a new object with member_names replacing bid_mem_id
      return {
        ...bid,
        bid_mem_id: foundMember ? foundMember.member_names : bid.bid_mem_id, // Replace if found, otherwise keep original
      };
    });

    return res.status(200).send({
      status: true,
      data: combinedData,
      message: "Bidding data retrieved successfully",
    });
  } catch (err) {
    // Handle any errors that occur during the execution
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteBidding = async (req, res) => {
  const { bid_id, sch_id } = req.body;

  try {
    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 4);

    // Construct the SQL query with a condition to delete data created in the last 24 hours
    const deleteBiddingQuery = `
      DELETE FROM tbl_bidding 
      WHERE bid_id = ? 
        AND sch_id= ? 
        AND created_at >= ?`;

    // Execute the query with the provided parameters
    await query(deleteBiddingQuery, [bid_id, sch_id, twentyFourHoursAgo]);

    // Send a success response
    return res.status(200).send({
      status: true,
      message: "Bidding deleted successfully",
    });
  } catch (err) {
    // If an error occurs, log the error and send an error response
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createBidding,
  getMemberName,
  getBiddingMonthBasis,
  deleteBidding,
  getlastbcdateId,
};
