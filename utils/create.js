const inquirer = require("inquirer");
const sql = require("mysql2");
const dbasecon = sql.createConnection({
  user: "root",
  password: "@6UHnuk9d@123",
  database: "employee_db",
  multipleStatements: true,
});

dbasecon.connect((err) => {
  if (err) throw err;
  startPrompt();
});

function addEmployee(dbasecon, questions) {
  const newEmployee = {};
  dbasecon.sql("SELECT * FROM role", (err, roles) => {
    if (err) console.log("There has been an error");
    inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "First Name?",
        validate: function (text) {
          if (isNaN(text)) {
            return true;
          } else {
            console.log(".  Please enter a valid name");
            return false;
          }
        },
      },
      {
        name: "last_name",
        type: "input",
        message: "Surname?",
        validate: function (text) {
          if (isNaN(text)) {
            return true;
          } else {
            console.log(".  Please enter a valid name");
            return false;
          }
        },
      },
      {
        name: "employee_role",
        type: "list",
        choices() {
          const roleArray = [];
          for (let i = 0; i < roles.length; i++) {
            roleArray.push(roles[i].title);
            return roleArray;
          }
        },
        message: "Role?",
      },
    ]);
  });
}

addEmployee();
