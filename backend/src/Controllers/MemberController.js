const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const cretaeMember = async (req, res) => {
  try {
    const { mem_name, mem_mobile, mem_address } = req.body;

    if (!mem_name || !mem_mobile || !mem_address) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide all required fields" });
    }

    const checkAgencyQuery = "SELECT * FROM tbl_member WHERE mem_mobile = ?";
    const [existingAgency] = await query(checkAgencyQuery, [mem_mobile]);

    if (existingAgency) {
      return res.status(200).send({
        status: false,
        message: "Mobile number already Use ",
      });
    }

    const insertAgencyQuery =
      "INSERT INTO tbl_member ( mem_name, mem_mobile, mem_address) VALUES (?, ?, ?)";
    const result = await query(insertAgencyQuery, [
      mem_name,
      mem_mobile,
      mem_address,
    ]);
    const insertedId = result.insertId;
    return res.status(200).send({
      status: true,
      data: insertedId,
      message: "Register user successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getMemberData = async (req, res) => {
  try {
    const getAllUsersQuery = "SELECT * FROM tbl_member";
    const userData = await query(getAllUsersQuery);
    console.log(userData);
    return res.status(200).send({
      status: true,
      data: userData,
      message: "User data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

const deleteMember = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res
        .status(400)
        .send({ status: false, message: "Member ID is required" });
    }

    // Check if member exists
    const checkMemberQuery = "SELECT * FROM tbl_member WHERE mem_id = ?";
    const [existingMember] = await query(checkMemberQuery, [id]);

    if (!existingMember) {
      return res
        .status(404)
        .send({ status: false, message: "Member not found" });
    }

    // Delete related records from tbl_schememember
    const deleteSchemeMemberQuery =
      "DELETE FROM tbl_schememember WHERE schmem_mem_id = ?";
    await query(deleteSchemeMemberQuery, [id]);

    // Delete member
    const deleteMemberQuery = "DELETE FROM tbl_member WHERE mem_id = ?";
    await query(deleteMemberQuery, [id]);

    return res.status(200).send({
      status: true,
      message: "Member deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting member:", err);
    return res.status(500).send({
      status: false,
      message: "An error occurred while deleting the member",
    });
  }
};










// const updateMember = async (req, res) => {
//   const { mem_id, mem_name, mem_mobile, mem_address } = req.body;

//   try {
//     let updateFields = {};
//     if (mem_name) updateFields.mem_name = mem_name;
//     if (mem_mobile) updateFields.mem_mobile = mem_mobile;
//     if (mem_address) updateFields.mem_address = mem_address;

//     if (Object.keys(updateFields).length === 0) {
//       return res
//         .status(400)
//         .send({ status: false, message: "No fields to update" });
//     }


//     const checkAgencyQuery = "SELECT * FROM tbl_member WHERE mem_mobile = ?";
//     const [existingAgency] = await query(checkAgencyQuery, [mem_mobile]);

//     if (existingAgency) {
//       return res.status(200).send({
//         status: false,
//         message: "Mobile number already Use ",
//       });
//     }




//     const updateUserQuery = "UPDATE tbl_member SET ? WHERE mem_id = ?";
//     const result = await query(updateUserQuery, [updateFields, mem_id]);

//     if (result.changedRows === 1) {
//       return res.status(200).send({
//         status: true,
//         message: "User updated successfully",
//       });
//     } else {
//       return res.status(404).send({ status: false, message: "User not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ status: false, message: err.message });
//   }
// };


const updateMember = async (req, res) => {
  const { mem_id, mem_name, mem_mobile, mem_address } = req.body;
  console.log(req.body);
  
  try {
    let updateFields = {};

    // Validate and add fields to updateFields if they are not null or empty
    if (mem_name !== undefined && mem_name !== null && mem_name.trim() !== '') {
      updateFields.mem_name = mem_name;
    }
    if (mem_mobile !== undefined && mem_mobile !== null && mem_mobile.trim() !== '') {
      updateFields.mem_mobile = mem_mobile;
    }
    if (mem_address !== undefined && mem_address !== null && mem_address.trim() !== '') {
      updateFields.mem_address = mem_address;
    }

    // Check if there are any fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({ status: false, message: "No valid fields to update" });
    }



    console.log("hello",req.body)
    // Check for existing mobile numbers across all users except the current user
    if (mem_mobile) {
      const checkAgencyQuery = "SELECT * FROM tbl_member WHERE mem_mobile = ? AND mem_id != ?";
      const existingAgency = await query(checkAgencyQuery, [mem_mobile, mem_id]);

  
      if (existingAgency.length > 0) {
        return res.status(200).send({
          status: false,
          message: "Mobile number already in use",
        });
      }
    }



    // console.log("object",existingAgency.length)

    const updateUserQuery = "UPDATE tbl_member SET ? WHERE mem_id = ?";
    const result = await query(updateUserQuery, [updateFields, mem_id]);

    if (result.affectedRows === 1) {
      return res.status(200).send({
        status: true,
        message: "User updated successfully",
      });
    } else {
      return res.status(404).send({ status: false, message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};









const getMemberName = async (req, res) => {
  try {
    const getAllUsersQuery = "SELECT mem_name FROM tbl_member";
    const userData = await query(getAllUsersQuery);
    const memberNames = userData.map((user) => user.mem_name);
    console.log(memberNames);
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

module.exports = {
  cretaeMember,
  getMemberData,
  deleteMember,
  updateMember,
  getMemberName,
};
