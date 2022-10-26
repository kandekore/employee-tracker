const inquirer = require("inquirer");
const sql = require("mysql2");
const connection = require("../config/connection");

function viewAllDepartment(dbase, startPrompt) {
  const query = "SELECT * FROM department";
  dbase.query(query, (err, res) => {
    if (err) throw err;

    console.table(res);
    startPrompt();
  });
}

function addDepartment(connection, startPrompt) {
  inquirer
    .prompt([
      {
        name: "dept_name",
        type: "input",
        message: "Department Name",
        validate: function (text) {
          if (isNaN(text)) {
            return true;
          } else {
            console.log(".  Please enter a valid department name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        answer.dept_name,
        (err) => {
          if (err) throw err;
          console.log("Department added.");
          startPrompt();
        }
      );
    });
}

function deleteDept(dbase, startPrompt) {
  dbase.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "deletedept",
          type: "list",
          choices() {
            const deptArray = [];
            for (let i = 0; i < results.length; i++) {
              deptArray.push(results[i].name);
            }
            return deptArray;
          },
          message: "Which department would you like to delete?",
        },
      ])
      .then((answer) => {
        const query = "DELETE FROM department WHERE name = ?";
        connection.query(query, answer.deletedept, (err) => {
          if (err) throw err;
          console.log("Department deleted");
          startPrompt();
        });
      });
  });
}
function deptBudget(connection, startPrompt) {
  // Query the database for all available departments to prompt user
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "department",
          type: "list",
          choices() {
            const choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].name);
            }
            return choiceArray;
          },
          message: "What department would you like to search by?",
        },
      ])
      .then((answer) => {
        const query = `SELECT employee.id, role.title, role.salary,  SUM(role.salary) as sum_score,
        department.name AS department FROM employee
        LEFT JOIN employee as e ON e.id = employee.manager_id
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        WHERE department.name = ?
                  ORDER BY employee.id`;
        connection.query(query, answer.department, (err, res) => {
          if (err) throw err;
          console.table(res);
          // function budget() {
          const calc = [];
          var total = 0;
          for (let i = 0; i < res.length; i++) {
            calc.push(res[i].salary);
            console.log("£", res[i].sum_score);
            // total + res[i].salary;
          }
          console.log(calc);
          // }

          startPrompt();
        });
      });
  });
}
module.exports = {
  deptBudget,
  viewAllDepartment,
  addDepartment,
  deleteDept,
};
