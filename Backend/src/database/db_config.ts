const mysql = require("mysql2");

const db = mysql.createConnection({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  dateStrings: true
});

module.exports = db;
