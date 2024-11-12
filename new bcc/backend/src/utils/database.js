const { createPool } = require('mysql2');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Root@pass1712',
    database: 'fintek'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database');
        connection.release();
    }
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (err, results) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    });
};

module.exports = { query };
