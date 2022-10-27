const Sequelize = require("sequelize");
require("dotenv").config();
const DIALECT = "mysql";
const sql = require("mysql2");

const dbase = sql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});
dbase.connect((err) => {
  if (err) throw err;
});

module.exports = dbase;
