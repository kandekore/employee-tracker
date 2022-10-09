const inquirer = require("inquirer");
const sql = require("mysql2");
const connection = require("../config/connection");

function viewAllRoles(dbase, startPrompt) {
  const query = "SELECT * FROM role";
  dbase.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function addRole(dbase, startPrompt) {
  const newRole = {};
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "role_name",
          type: "input",

          message: "Role Name?",
          validate: function (text) {
            if (isNaN(text)) {
              return true;
            } else {
              console.log(".  Please enter a valid role name");
              return false;
            }
          },
        },
        {
          name: "salary",
          type: "input",

          message: "What is the roles salary",
          validate: function (number) {
            if (!isNaN(number)) {
              return true;
            } else {
              console.log(".  Please enter a valid salary");
              return false;
            }
          },
        },
        {
          name: "dept_name",
          type: "list",
          choices() {
            const deptNameArray = [];
            for (let i = 0; i < results.length; i++) {
              deptNameArray.push(results[i].name);
            }
            return deptNameArray;
          },
          message: "Which department does the role belong to?",
        },
      ])
      .then((answer) => {
        newRole.title = answer.role_name;
        newRole.salary = answer.salary;

        // Translate manager_name to id
        connection.query(
          "SELECT id FROM department WHERE name = ?",
          answer.dept_name,
          (err, departmentResults) => {
            if (err) throw err;
            newRole.department_id = departmentResults[0].id;
            console.log("Adding new role: ", newRole);

            connection.query("INSERT INTO role SET ?", newRole, (err) => {
              if (err) throw err;
              console.log("Role successfully added.");
              startPrompt();
            });
          }
        );
      });
  });
}

function deleteRole(dbase, startPrompt) {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "roledelete",
          type: "list",
          choices() {
            const roleArray = [];
            for (let i = 0; i < results.length; i++) {
              roleArray.push(results[i].title);
            }
            return roleArray;
          },
          message: "Which role would you like to delete?",
        },
      ])
      .then((answer) => {
        const query = "DELETE FROM role WHERE title = ?";
        connection.query(query, answer.roledelete, (err) => {
          if (err) throw err;
          console.log("Role deleted");
          startPrompt();
        });
      });
  });
}

module.exports = { viewAllRoles, addRole, deleteRole };
