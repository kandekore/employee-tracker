const Sequelize = require("sequelize");
require("dotenv").config();
const DIALECT = "mysql";
const sql = require("mysql2");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: DIALECT,
//     logging: false,
//   }
// );

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
