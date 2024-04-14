const mysql = require('mysql2/promise');

// Setup a simple MySQL connection without caching

console.log(process.env.DB_HOST)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 1000,
  database: process.env.DATABASE
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if we can't connect to the database
  } else {
    console.log('Connected to the database.');
    connection.release(); // Release the connection back to the pool
  }
});

// Export a simple query function
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
