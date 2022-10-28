const inquirer = require("inquirer");
const sql = require("mysql2/promise");
const {
  viewAllDepartment,
  addDepartment,
  deleteDept,
  deptBudget,
} = require("./utils/dept");

const { viewAllRoles, addRole, deleteRole } = require("./utils/role");
const {
  viewAllEmployees,
  addEmployee,
  updateEmployee,
  viewByManager,
  deleteEmployee,
  updateManager,
  viewByDept,
} = require("./utils/emp");
const dbase = require("./config/connection");
const Sequelize = require("sequelize");

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
        "View Employee By Manager",
        "View Employee By Department",
        "Update Employee's Role",
        "Update Employee's Manager",
        "Delete Employee",
        "Delete department",
        "Delete role",
        "View Department Budgets",
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
          addEmployee(dbase, startPrompt);
          break;
        case "Update Employee's Role":
          updateEmployee(dbase, startPrompt);
          break;
        case "Update Employee's Manager":
          updateManager(dbase, startPrompt);
          break;
        case "Delete Employee":
          deleteEmployee(dbase, startPrompt);
          break;
        case "Delete department":
          deleteDept(dbase, startPrompt);
          break;
        case "Delete role":
          deleteRole(dbase, startPrompt);
          break;
        case "View Employee By Manager":
          viewByManager(dbase, startPrompt);
          break;
        case "View Employee By Department":
          viewByDept(dbase, startPrompt);
          break;
        case "View Department Budgets":
          deptBudget(dbase, startPrompt);
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
