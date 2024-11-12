const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");





const createBcDateRecord = async (req, res) => {
  try {
    // Fetch the latest scheme record
    const fetchSchemeQuery =
      "SELECT sch_id, sch_month, sch_starting_date FROM tbl_scheme ORDER BY sch_id DESC LIMIT 1";
    const lastSchemeRecord = await query(fetchSchemeQuery);

    // Check if the scheme record exists
    if (lastSchemeRecord.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No records found in tbl_scheme" });
    }

    // Extract scheme details
    const { sch_id, sch_month, sch_starting_date } = lastSchemeRecord[0];
    const bc_no = req.body.bc_no || sch_month;
    const bc_status = false;

    // Validate bc_no
    if (!bc_no || bc_no <= 0) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid bc_no provided" });
    }

    // Prepare insert query
    const insertVoucherQuery =
      "INSERT INTO tbl_bcdate (bc_date, dc_sch_id, bc_no, bc_status) VALUES (?, ?, ?, ?)";
    const startDate = new Date(sch_starting_date);

    // Insert records in a loop
    for (let i = 0; i < bc_no; i++) {
      const bc_date = new Date(startDate);
      bc_date.setMonth(bc_date.getMonth() + i);

      // Execute the insert query
      await query(insertVoucherQuery, [
        bc_date.toISOString().split("T")[0],
        sch_id,
        i + 1,
        bc_status,
      ]);
    }

    // Send success response
    return res.status(200).send({
      status: true,
      message: `${bc_no} BC date records created successfully`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const fetchBcDateRecord = async (req, res) => {
  try {
    const fetchBcDateQuery = "SELECT * FROM tbl_bcdate";
    const bcDateRecords = await query(fetchBcDateQuery);

    if (bcDateRecords.length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "No records found in tbl_bcdate" });
    }

    return res.status(200).send({
      status: true,
      data: bcDateRecords,
      message: `${bcDateRecords.length} BC date records found`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const fetchBcDateRecordschemeId = async (req, res) => {
  try {
    const { sch_id } = req.body;
    const fetchBcDateQuery = "SELECT * FROM tbl_bcdate WHERE dc_sch_id = ?";
    const bcDateRecords = await query(fetchBcDateQuery, [sch_id]);

    if (bcDateRecords.length === 0) {
      return res
        .status(404)
        .send({
          status: false,
          message: "No records found in tbl_bcdate for the specified scheme ID",
        });
    }

    return res.status(200).send({
      status: true,
      data: bcDateRecords,
      message: `${bcDateRecords.length} BC date records found for the specified scheme ID`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const updatedate = async (req, res) => {
  try {
    const { bcdate_id, date } = req.body;

    const updateBcDateQuery =
      "UPDATE tbl_bcdate SET bc_date = ? WHERE bcdate_id = ?";
    const updateResult = await query(updateBcDateQuery, [date, bcdate_id]);

    if (updateResult.affectedRows === 0) {
      return res
        .status(404)
        .send({
          status: false,
          message: "No records updated for the specified bcdate_id",
        });
    }

    return res.status(200).send({
      status: true,
      message: `BC date updated successfully for bcdate_id ${bcdate_id}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getid = async (req, res) => {
  try {
    const { bid_sch_id } = req.body;

    const findBcDateIdQuery = `
        SELECT bcdate_id 
        FROM tbl_bcdate 
        WHERE dc_sch_id = ? AND bc_status != 1
        LIMIT 1
      `;
    const bcdateResult = await query(findBcDateIdQuery, [bid_sch_id]);

    let bcdate_id;

    if (bcdateResult.length === 0) {
      const findFirstRecordQuery = `
          SELECT bcdate_id 
          FROM tbl_bcdate 
          WHERE dc_sch_id = ? 
          LIMIT 1
        `;
      const firstRecordResult = await query(findFirstRecordQuery, [bid_sch_id]);

      if (firstRecordResult.length === 0) {
        return res
          .status(404)
          .send({ status: false, message: "No records found in tbl_bcdate" });
      }

      bcdate_id = firstRecordResult[0].bcdate_id;
    } else {
      bcdate_id = bcdateResult[0].bcdate_id;
    }

    return res.status(200).send({
      status: true,
      data: bcdate_id,
      message: "BC date ID retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const updateBcDateStatus = async (req, res) => {
  try {
    const { sch_id, bid_bcdate_id } = req.body;
    if (!sch_id || !bid_bcdate_id) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide both the scheme ID and the bidding date ID",
        });
    }
    // SQL query to update the bc_status in tbl_bcdate where dc_sch_id matches sch_id and bid_bcdate_id matches
    const updateStatusQuery =
      "UPDATE tbl_bcdate SET bc_status = ? WHERE dc_sch_id = ? AND bcdate_id = ?";
    const result = await query(updateStatusQuery, [
      true,
      sch_id,
      bid_bcdate_id,
    ]);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res
        .status(200)
        .send({ status: false, message: "No records found to update" });
    }

    return res.status(200).send({
      status: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

// const updateBcDateStatus = async (req, res) => {
//   try {
//     const { sch_id } = req.body;

//     if (!sch_id) {
//       return res.status(400).send({ status: false, message: "Please provide the scheme ID" });
//     }

//     // SQL query to select all records from tbl_bcdate for the given dc_sch_id
//     const selectAllBcDatesQuery = "SELECT bc_no, bc_status FROM tbl_bcdate WHERE dc_sch_id = ? ORDER BY some_column"; // Use the appropriate column to order records chronologically
//     const allRecords = await query(selectAllBcDatesQuery, [sch_id]);

//     // Variable to check if we have encountered a record with bc_status = true
//     let foundTrueStatus = false;

//     // Loop through all records to find the first false status record after a true status record
//     let targetRecord = null;
//     for (let i = 0; i < allRecords.length; i++) {
//       const record = allRecords[i];
//       if (record.bc_status) {
//         foundTrueStatus = true;
//       } else if (foundTrueStatus) {
//         targetRecord = allRecords[i];
//         break;
//       }
//     }

//     // Check if we found the target record
//     if (!targetRecord) {
//       return res.status(200).send({ status: false, message: "No appropriate record found to update" });
//     }

//     return res.status(200).send({
//       status: true,
//       bc_no: targetRecord.bc_no,
//       message: "Record retrieved successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ status: false, message: error.message });
//   }
// };

const Dropdown = async (req, res) => {
  try {
    const { sch_name } = req.body;
    if (!sch_name) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide the scheme name" });
    }

    // Query to get the scheme ID based on the scheme name
    const selectSchemeIdQuery =
      "SELECT sch_id FROM tbl_scheme WHERE sch_name = ? ";
    const schemeIdRow = await query(selectSchemeIdQuery, [sch_name]);
    const sch_id = schemeIdRow[0].sch_id;

    if (!sch_id) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid scheme name" });
    }

    // Query to select all records from tbl_bcdate for the given scheme ID
    const selectAllBcDatesQuery =
      "SELECT bc_no, bc_status FROM tbl_bcdate WHERE dc_sch_id = ? ";
    const allRecords = await query(selectAllBcDatesQuery, [sch_id]);

    return res.status(200).send({
      status: true,
      bc_no: allRecords,
      message: "Records retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getreceiptbcdateId = async (req, res) => {
  try {
    const { sch_name, bc_no } = req.body;

    if (!sch_name || !bc_no) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide the scheme name" });
    }

    // Query to get the scheme ID based on the scheme name
    const selectSchemeIdQuery =
      "SELECT sch_id FROM tbl_scheme WHERE sch_name = ?";
    const schemeIdRow = await query(selectSchemeIdQuery, [sch_name]);

    if (schemeIdRow.length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid scheme name" });
    }

    const sch_id = schemeIdRow[0].sch_id;

    // Query to get the bcdate ID based on the sch_id and bc_no
    const selectSchemeIdQuery1 =
      "SELECT bcdate_id FROM tbl_bcdate WHERE dc_sch_id = ? AND bc_no = ?";
    const schemeIdRow1 = await query(selectSchemeIdQuery1, [sch_id, bc_no]);

    if (schemeIdRow1.length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid scheme name or bc_no" });
    }

    const bcdate_id = schemeIdRow1[0].bcdate_id;

    return res.status(200).send({
      status: true,
      data: bcdate_id,
      message: "Records retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getbc_no = async (req, res) => {
  try {
    const { sch_id } = req.body;
    if (!sch_id) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide the scheme name" });
    }

    // Query to get the scheme ID based on the scheme name
    const selectSchemeIdQuery =
      "SELECT bc_no FROM tbl_bcdate WHERE dc_sch_id = ?";
    const schemeIdRow = await query(selectSchemeIdQuery, [sch_id]);

    if (!schemeIdRow) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid scheme name" });
    }

    return res.status(200).send({
      status: true,
      data: schemeIdRow,
      message: "Records retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};


const getbcstatus = async (req, res) => {
  try {
    const { sch_id } = req.body;
    if (!sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide the scheme ID",
      });
    }

    // Query to check if all bc_status values for this sch_id are 1
    const checkAllStatusQuery =
      "SELECT COUNT(*) as total, SUM(CASE WHEN bc_status = 1 THEN 1 ELSE 0 END) as trueCount FROM tbl_bcdate WHERE dc_sch_id = ?";
    const statusResult = await query(checkAllStatusQuery, [sch_id]);
console.log(statusResult)
    if (statusResult.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No records found for the given scheme ID",
      });
    }

    const { total, trueCount } = statusResult[0];

    // If all records have bc_status as 1, return 1, otherwise return 0
    const allTrue = total == trueCount ? 1 : 0;

    return res.status(200).send({
      status: true,
      allTrue,
      message: "Status check completed successfully",
    });
  } catch (error) {
    console.error("Error in getbcstatus:", error);
    return res.status(500).send({ status: false, message: error.message });
  }
};


const getbcdateandbcno = async (req, res) => {
  try {
    const { sch_id } = req.body;
    if (!sch_id) {
      return res.status(400).send({
        status: false,
        message: "Please provide the scheme ID",
      });
    }

    // Query to fetch the first record with bc_status = 0 for the given sch_id
    const getPendingStatusQuery = `
      SELECT * 
      FROM tbl_bcdate 
      WHERE dc_sch_id = ? AND bc_status = 0 
      ORDER BY bcdate_id ASC 
      LIMIT 1
    `;
    const pendingStatusResult = await query(getPendingStatusQuery, [sch_id]);

    // Check if a record with bc_status = 0 exists
    const recordFound = pendingStatusResult ? true : false;

    return res.status(200).send({
      status: true,
      recordFound,
      data: pendingStatusResult,
      message: recordFound
        ? "First record with bc_status = 0 retrieved successfully"
        : "No record found with bc_status = 0",
    });
  } catch (error) {
    console.error("Error in getbcstatus:", error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createBcDateRecord,
  fetchBcDateRecord,
  fetchBcDateRecordschemeId,
  updatedate,
  getid,
  updateBcDateStatus,
  Dropdown,
  getreceiptbcdateId,
  getbc_no,
  getbcstatus,getbcdateandbcno
};
