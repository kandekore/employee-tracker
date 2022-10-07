const inquirer = require("inquirer");
const sql = require("mysql2");
const viewAllDepartment = require("./utils/dept");
const addDepartment = require("./utils/dept");
const viewAllRoles = require("./utils/role");
const viewAllEmployees = require("./utils/emp");
// const connection = require("./config/connection");
const Sequelize = require("sequelize");
const dbase = sql.createConnection({
  user: "root",
  password: "@6UHnuk9d@123",
  database: "employee_db",
  multipleStatements: true,
});

function startPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update Employee's Role",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Departments":
          viewAllDepartment(dbase, startPrompt);
          break;
        case "View All Roles":
          viewAllRoles(dbase, startPrompt);
          break;
        case "View All Employees":
          viewAllEmployees(dbase, startPrompt);
          break;
        case "Add A Department":
          addDepartment(dbase, startPrompt);
          break;
        case "Add A Role":
          createRole(dbase, startPrompt);
          break;
        case "Add An Employee":
          createEmployee(dbase, startPrompt);
          break;
        case "Update Employee's Role":
          updateRole(dbase, startPrompt);
          break;
        default:
          break;
      }
    });
}

startPrompt();
// Start application
// connection.connect((err) => {
//   if (err) throw err;
//   startPrompt();
// });
