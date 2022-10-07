const inquirer = require("inquirer");

function viewAllEmployees(dbase, startPrompt) {
  const query = "SELECT * FROM employee";
  dbase.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

module.exports = viewAllEmployees;
