const nodemailer = require('nodemailer');
const { query } = require("../utils/database");
const bcrypt = require('bcrypt');

// In-memory storage for OTPs
const otpStore = {};

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

// Function to send OTP via email
async function sendOTPEmail(userEmail, otp) {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'chaitanyank06.tekhnologia@gmail.com', // Your email
      pass: 'ptak zuak pvgr zxsd', // Your email password
    },
  });

  let mailOptions = {
    from: 'chaitanyank06.tekhnologia@gmail.com', // Sender address
    to: userEmail, // List of recipients
    subject: 'Fintek Bc', // Subject line
    text: `Your OTP code is ${otp}`, // Plain text body
  };

  await transporter.sendMail(mailOptions);
}

// Endpoint to send OTP
const sendOtp = async (req, res) => {
  try {
    const { userEmail } = req.body;
    console.log(req.body);

    if (!userEmail) {
      return res.status(400).send({ status: false, message: "Please provide all required fields" });
    }

    const checkEmailidPresent = "SELECT * FROM user WHERE email = ?";
    const result = await query(checkEmailidPresent, [userEmail]);

    if (result.length > 0) {
      console.log("Email ID is present.");

      const otp = generateOTP();

      // Store the email and OTP in the object
      otpStore[userEmail] = otp;

      // Optionally, set a timeout to remove the OTP after a certain period
      setTimeout(() => {
        delete otpStore[userEmail];
      }, 300000); // 5 minutes

      await sendOTPEmail(userEmail, otp);

      return res.status(200).send({
        status: true,
        message: "OTP sent successfully.",
      });
    } else {
      console.log("Email ID is not present.");
      return res.status(404).send({
        status: false,
        message: "Email ID not found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Endpoint to verify OTP
const verifyOtp = async (req, res) => {
  const { userEmail, otp } = req.body;

  console.log(req.body)

  if (!userEmail || !otp) {
    console.log("hello")
    return res.status(200).send({ status: false, message: "Please provide all required fields" });
  }

  try {

    if (otpStore[userEmail] && otpStore[userEmail] == otp) {
      // OTP is correct
      delete otpStore[userEmail]; // Optionally, remove the OTP after successful verification
      return res.status(200).send({ status: true, message: "OTP verified successfully." });
    } else {
      // OTP is incorrect or not found
      return res.status(200).send({ status: false, message: "Invalid OTP." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};




const changePassword = async (req, res) => {
  const { userEmail, newPassword } = req.body;

  if (!userEmail || !newPassword) {
    return res.status(400).send({ status: false, message: "Please provide all required fields" });
  }

  try {
    // Encrypt the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    const updatePasswordQuery = "UPDATE user SET password = ? WHERE email = ?";
    await query(updatePasswordQuery, [hashedPassword, userEmail]);

    return res.status(200).send({ status: true, message: "Password changed successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { sendOtp, verifyOtp,changePassword };








