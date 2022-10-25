const inquirer = require("inquirer");
// const Connection = require("mysql2/typings/mysql/lib/Connection");
const connection = require("../config/connection");
const then = require("mysql2/promise");

function viewAllEmployees(dbase, startPrompt) {
  const query = "SELECT * FROM employee";
  dbase.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}
///ADDING MANAGER ISSUE
function addEmployee(dbase, startPrompt) {
  const newEmployee = {};
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Employee First Name?",
          validate: function (text) {
            if (isNaN(text)) {
              return true;
            } else {
              console.log(".  Please enter a valid 'first name'");
              return false;
            }
          },
        },
        {
          name: "last_name",
          type: "input",
          message: "Employee Last Name?",
          validate: function (text) {
            if (isNaN(text)) {
              return true;
            } else {
              console.log(".  Please enter a valid 'last name'");
              return false;
            }
          },
        },
        {
          name: "role_name",
          type: "list",
          choices() {
            const roleNameArray = [];
            for (let i = 0; i < results.length; i++) {
              roleNameArray.push({
                name: results[i].title,
                value: results[i].id,
              });
            }
            return roleNameArray;
          },
          message: "Which role does the employee belong to?",
        },
      ])
      .then((answer) => {
        newEmployee.first_name = answer.first_name;
        newEmployee.last_name = answer.last_name;
        newEmployee.role_id = answer.role_name;

        connection.query(
          "SELECT * FROM employee WHERE manager_id IS NOT NULL",
          (err, employeesAll) => {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "employeemanager",
                  type: "list",
                  choices() {
                    const managerArray = [];
                    for (let i = 0; i < employeesAll.length; i++) {
                      managerArray.push({
                        name:
                          employeesAll[i].first_name +
                          " " +
                          employeesAll[i].last_name,
                        value: employeesAll[i].id,
                      });
                    }
                    return managerArray;
                  },
                  message: "Choose Manager",
                },
              ])
              .then((chosenManager) => {
                newEmployee.manager_id = chosenManager.employeemanager;

                connection.query(
                  "INSERT INTO employee SET ?",
                  newEmployee,
                  (err) => {
                    if (err) throw err;
                    console.log("Employee successfully added.");
                    startPrompt();
                  }
                );
              });
          }
        );
      });
  });
}
///DELETE WORKAROUND
function deleteEmployee(dbase, startPrompt) {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeedelete",
          type: "list",
          choices() {
            const empArray = [];
            for (let i = 0; i < results.length; i++) {
              empArray.push(
                results[i].id +
                  " " +
                  results[i].first_name +
                  " " +
                  results[i].last_name
              );
              idNumber = results[i].id;
            }
            return empArray;
          },
          message: "Which employee would you like to delete?",
        },
      ])
      .then((answer, idNo) => {
        console.log(
          answer.employeedelete.split("")[0] +
            answer.employeedelete.split("")[1]
        );
        // console.log(answer.employeedelete.split("")[1]);
        // console.log(answer.employeedelete.split("")[4]);
        // console.log(answer.employeedelete.split("")[15]);
        const query = "DELETE FROM employee WHERE id = ?";

        connection.query(
          query,
          answer.employeedelete.split("")[0] +
            answer.employeedelete.split("")[1],
          (err) => {
            if (err) throw err;
            console.log("Employee deleted");
            startPrompt();
          }
        );
      });
  });
}
///UPDATE ISSUE
function updateEmployee(connection, startPrompt) {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeeedit",
          type: "list",
          choices() {
            const empEditArray = [];
            for (let i = 0; i < results.length; i++) {
              empEditArray.push(results[i].first_name);
            }
            return empEditArray;
          },
          message: "choose employee to edit",
        },
      ])
      .then((answer) => {
        empNewRole = answer.employeeedit;
        connection.query("SELECT * FROM role", (err, results) => {
          if (err) throw err;

          inquirer.prompt([
            {
              name: "rolelist",
              type: "list",
              choices() {
                const roleArray = [];
                for (let i = 0; i < results.length; i++) {
                  roleArray.push(results[i].name);
                }
                return roleArray;
              },
              message: "choose new role",
            },
          ]);
        });
      });
  });
}

///NEED TO FETCH ID FROM ROLE

///
function viewByManager(connection, startPrompt) {
  const groupStaff = [];

  connection.query(
    "SELECT * FROM employee WHERE manager_id > 0",
    (err, res) => {
      if (err) throw err;

      for (let i = 0; i < res.length; i++) {
        groupStaff.push(res[i].manager_id);
      }

      return groupStaff;
    }
  );
  const uniqueChars = [...new Set(groupStaff)];
  console.log(uniqueChars);
}

// function viewByManager(connection, startPrompt) {
//   // connection.query("SELECT * ")
//   managerIdArray();
// }

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployee,
  viewByManager,
  deleteEmployee,
};
