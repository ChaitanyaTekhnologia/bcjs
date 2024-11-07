const jsonwebtoken = require("jsonwebtoken");
const { compareSync, genSaltSync, hashSync } = require("bcrypt");
const { query } = require("../utils/database");

const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields",
      });
    }

    // Check if the email already exists
    const checkExistingEmailQuery = `
        SELECT * FROM user 
        WHERE email = ?
    `;
    const existingUsers = await query(checkExistingEmailQuery, [email]);
    if (existingUsers.length > 0) {
      return res.status(400).send({
        status: false,
        message: "Email already exists",
      });
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const insertUserQuery = `
        INSERT INTO user (userName, email, password) 
        VALUES (?, ?, ?)
    `;
    await query(insertUserQuery, [userName, email, hashedPassword]);

    const jsontoken = jsonwebtoken.sign(
      { email: email },
      "hello",
      { expiresIn: "30m" }
    );

    res.json({ status: true, token: jsontoken });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const checkExistingUserQuery = `
            SELECT * FROM user 
            WHERE email = ?
        `;
    const users = await query(checkExistingUserQuery, [email]);

    if (users.length === 0) {
      return res.status(200).json({
        status:false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];
    const isValidPassword = compareSync(password, user.password);
    if (isValidPassword) {
      const jsontoken = jsonwebtoken.sign(
        { email: email, userName: user.userName },
        "hello",
        { expiresIn: "30m" }
      );

      res.json({ 
         status: true,
        token: jsontoken }); 
    } else {
      return res.status(200).json({
        status: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  register: register,
  login: login,
};
