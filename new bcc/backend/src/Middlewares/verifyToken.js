// const jsonwebtoken = require("jsonwebtoken");

// // Middleware function to verify JWT token
// const verifyToken = (req, res, next) => {
//   // Get token from header
//   const token = req.headers["authorization"];

//   // Check if token is present
//   if (!token) {
//     return res.status(401).json({ message: "Access denied. Token is missing." });
//   }

//   try {
//     // Verify token
//     const decoded = jsonwebtoken.verify(token, "hello");

//     // Attach user info to request object
//     req.user = decoded;

//     // Call next middleware or route handler
//     next();
//   } catch (error) {
//     // Token is invalid
//     return res.status(403).json({ message: "Invalid token." });
//   }
// };

// module.exports = verifyToken;





const jsonwebtoken = require("jsonwebtoken");
// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.headers["authorization"];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token is missing." });
  }

  try {
    // Verify token
    const decoded = jsonwebtoken.verify(token, "hello");

    // Attach user info to request object
    req.user = decoded;

    // Call next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
