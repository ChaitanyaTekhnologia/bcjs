const { query } = require("../utils/database.js");

const User = {
  findByUsername: (username, callback) => {
    const query1 = 'SELECT * FROM users WHERE username = ?';
    query.execute(query1, [username], callback);
  }
};

module.exports = User;
