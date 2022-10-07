const inquirer = require("inquirer");
const sql = require("mysql2");

function viewAllRoles(dbase, startPrompt) {
  const query = "SELECT * FROM role";
  dbase.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

module.exports = viewAllRoles;
