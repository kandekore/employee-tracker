const inquirer = require("inquirer");
const sql = require("mysql2");
const {
  viewAllDepartment,
  addDepartment,
  deleteDept,
} = require("./utils/dept");

// const  = require("./utils/dept");
const { viewAllRoles, addRole, deleteRole } = require("./utils/role");
const viewAllEmployees = require("./utils/emp");
const dbase = require("./config/connection");
const Sequelize = require("sequelize");
// const dbase = sql.createConnection({
//   user: "root",
//   password: "@6UHnuk9d@123",
//   database: "employee_db",
//   multipleStatements: true,
// });

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
        "Delete department",
        "Delete role",
        "Quit",
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
          addRole(dbase, startPrompt);
          break;
        case "Add An Employee":
          createEmployee(dbase, startPrompt);
          break;
        case "Update Employee's Role":
          updateRole(dbase, startPrompt);
          break;
        case "Delete department":
          deleteDept(dbase, startPrompt);
          break;
        case "Delete role":
          deleteRole(dbase, startPrompt);
          break;
        case "QUIT":
          dbase.end();
          break;
        default:
          break;
      }
    });
}

startPrompt();
// // Start application
// dbase.connect((err) => {
//   if (err) throw err;
//   startPrompt();
// });
