const { query } = require("../utils/database");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  try {
    const { user_name, user_mobile, user_pwd } = req.body;

    if (!user_name || !user_mobile || !user_pwd) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide all required fields" });
    }

    const checkAgencyQuery = "SELECT * FROM tbl_user WHERE user_mobile = ?";
    const [existingAgency] = await query(checkAgencyQuery, [user_mobile]);

    if (existingAgency) {
      return res
        .status(400)
        .send({ status: false, message: "Agency already exists" });
    }
    // const hashedPassword = await bcrypt.hash(user_pwd, 10);
    const hashedPassword = await bcrypt.hash(user_pwd, 10);
    //
    const user_ut_id = "1";
    const insertAgencyQuery =
      "INSERT INTO tbl_user ( user_name, user_mobile, user_pwd,user_ut_id) VALUES (?, ?, ?,?)";
    const result = await query(insertAgencyQuery, [
      user_name,
      user_mobile,
      hashedPassword,
      user_ut_id,
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


module.exports = { registerUser };
