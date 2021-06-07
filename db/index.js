const connection = require("./connection");
const cTable = require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          viewDepts();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDept();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}

  function viewDepts() {
    var query = "SELECT name, id FROM employees.department ORDER BY id asc";
    connection.query(query, function (err, res) {
      console.table(res);
      runSearch();
    });
  }

  function viewEmployees() {
    var query = 
    "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;";
    connection.query(query, function (err, res) {
      console.table(res);
      runSearch();
    });
  }