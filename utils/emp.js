const inquirer = require("inquirer");
// const Connection = require("mysql2/typings/mysql/lib/Connection");
const connection = require("../config/connection");
const then = require("mysql2/promise");
// const { SELECT } = require("sequelize/types/query-types");

function viewAllEmployees(dbase, startPrompt) {
  const query =
    "SELECT employee.id as 'Employee ID', employee.first_name as 'First Name', employee.last_name as 'Last Name', role.title as 'Job Title', role.salary as Salary, department.name as Department, concat(e.first_name, ' ',  e.last_name) AS manager FROM employee LEFT    JOIN employee as e ON e.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id  ORDER BY employee.id;";
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
        console.log(answer.id);
        connection.query("SELECT * FROM employee ", (err, employeesAll) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "employeemanager",
                type: "list",
                choices() {
                  const managerArray = [
                    {
                      name: "No Manager",
                      value: null,
                    },
                  ];
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
        });
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
// function updateEmployee(connection, startPrompt) {
//   connection.query("SELECT * FROM employee", (err, results) => {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           name: "employeeedit",
//           type: "list",
//           choices() {
//             const empEditArray = [];
//             for (let i = 0; i < results.length; i++) {
//               empEditArray.push(results[i].first_name);
//             }
//             return empEditArray;
//           },
//           message: "choose employee to edit",
//         },
//       ])
//       .then((answer) => {
//         empNewRole = answer.employeeedit;
//         connection.query("SELECT * FROM role", (err, results) => {
//           if (err) throw err;

//           inquirer.prompt([
//             {
//               name: "rolelist",
//               type: "list",
//               choices() {
//                 const roleArray = [];
//                 for (let i = 0; i < results.length; i++) {
//                   roleArray.push(results[i].name);
//                 }
//                 return roleArray;
//               },
//               message: "choose new role",
//             },
//           ]);
//         });
//       });
//   });
// }

function updateEmployee(connection, startPrompt) {
  const employeeRoleObj = {};

  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, 
      role.title, role.salary, 
      department.name AS department, 
      e.first_name AS manager FROM employee 
      LEFT JOIN employee AS e ON e.id = employee.manager_id 
      JOIN role ON employee.role_id = role.id 
      JOIN department ON role.department_id = department.id 
      ORDER BY employee.id`,
    (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "updateEmployee",
            type: "list",
            choices() {
              const choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                choiceArray.push(
                  `${results[i].first_name} ${results[i].last_name}`
                );
              }
              return choiceArray;
            },
            message: `Choose the employee who's role you'd like to update`,
          },
        ])
        .then((answer) => {
          employeeRoleObj.first_name = answer.updateEmployee.split(" ")[0];

          connection.query("SELECT * FROM role", (err, roleResults) => {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "updateRole",
                  type: "list",
                  choices() {
                    const choiceArray = [];
                    for (let i = 0; i < roleResults.length; i++) {
                      choiceArray.push(roleResults[i].title);
                    }
                    return choiceArray;
                  },
                  message: `Please select the updated role`,
                },
              ])
              .then((ans) => {
                // Translate role to role_id
                connection.query(
                  "SELECT * FROM role WHERE title = ?",
                  ans.updateRole,
                  (err, res) => {
                    if (err) throw err;

                    employeeRoleObj.role_id = res[0].id;

                    connection.query(
                      "UPDATE employee SET role_id = ? WHERE first_name = ?",
                      [employeeRoleObj.role_id, employeeRoleObj.first_name],
                      (err) => {
                        if (err) throw err;
                        console.log("Employee role successfully updated.");
                        startPrompt();
                      }
                    );
                  }
                );
              });
          });
        });
    }
  );
}

function viewByManager(connection, startPrompt) {
  connection.query(
    "SELECT employee.first_name as 'First Name', employee.last_name as 'Last Name', employee.manager_id, e.first_name AS manager FROM employee LEFT JOIN employee AS e ON e.id = employee.manager_id  JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id order BY employee.id",
    (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employeemanager",
            type: "list",
            choices() {
              const groupStaff = [];

              for (let i = 1; i < results.length; i++) {
                if (
                  results[i].manager != null ||
                  groupStaff.includes({
                    name: results[i].manager,
                    value: results[i].manager_id,
                  })
                ) {
                  //             res[i].manager_id,
                  groupStaff.push({
                    name: results[i].manager,
                    value: results[i].manager_id,
                  });
                }
                var mgrIds = [...new Set(groupStaff)];
                console.log(mgrIds);
              }
              return groupStaff;
            },
            message: "Choose Manager",
          },
        ])
        .then((ans, async) => {
          const query = "SELECT * from employee WHERE manager_id = ?";
          connection.query(query, ans.employeemanager, (err, res) => {
            console.log(ans);
            if (err) throw err;
            console.table(res);
            startPrompt();
          });
          console.log("ans", ans);
          console.log("ans.employeemanager", ans.employeemanager);
        });
    }
  );
}

function updateManager(connection, startPrompt) {
  const newManager = {};

  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, 
      role.title, role.salary, 
      department.name AS department, 
      e.first_name AS manager FROM employee 
      LEFT JOIN employee AS e ON e.id = employee.manager_id 
      JOIN role ON employee.role_id = role.id 
      JOIN department ON role.department_id = department.id 
      ORDER BY employee.id`,
    (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employeeSelected",
            type: "list",
            choices() {
              // Create a list of employees
              const choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                choiceArray.push(
                  `${results[i].first_name} ${results[i].last_name}`
                );
              }
              return choiceArray;
            },
            message: "Which employee would you like to update?",
          },
        ])
        .then((answer) => {
          newManager.first_name = answer.employeeSelected.split(" ")[0];

          connection.query(
            `SELECT DISTINCT e.id, e.first_name, e.last_name FROM employee
                      LEFT JOIN employee AS e ON employee.manager_id = e.id 
                      WHERE e.first_name IS NOT NULL`,
            (err, managerList) => {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    name: "managerSelected",
                    type: "list",
                    choices() {
                      const choiceArray = [];
                      for (let i = 0; i < managerList.length; i++) {
                        choiceArray.push(
                          `${managerList[i].first_name} ${managerList[i].last_name}`
                        );
                      }
                      return choiceArray;
                    },
                    message: "Who would you like to change their manager to?",
                  },
                ])
                .then((ans) => {
                  connection.query(
                    "SELECT * FROM employee WHERE first_name = ?",

                    ans.managerSelected.split(" ")[0],
                    (err, managerResults) => {
                      if (err) throw err;

                      newManager.manager_id = managerResults[0].id;

                      connection.query(
                        "UPDATE employee SET manager_id = ? WHERE first_name = ?",
                        [newManager.manager_id, newManager.first_name],
                        (err) => {
                          if (err) throw err;
                          console.log("Employee manager successfully updated.");
                          startPrompt();
                        }
                      );
                    }
                  );
                });
            }
          );
        });
    }
  );
}
function viewByDept(connection, startPrompt) {
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
        console.log(answer.salary);
        const query = `SELECT employee.id, employee.first_name, employee.last_name,
                  role.title, role.salary,
                  department.name AS department,
                  e.first_name AS manager FROM employee
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
            console.log(res[i].salary);
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
  viewAllEmployees,
  addEmployee,
  updateEmployee,
  viewByManager,
  deleteEmployee,
  updateManager,
  viewByDept,
};
