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

module.exports = {
  viewAllDepartment,
  addDepartment,
  deleteDept,
};
