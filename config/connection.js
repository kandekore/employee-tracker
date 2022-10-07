const Sequelize = require("sequelize");
require("dotenv").config();
const DIALECT = "mysql";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: DIALECT,
    logging: false,
  }
);

module.exports = sequelize;
