const connection = require("./connection.js");
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

        case "Quit":
          quit();
          break;
      }
    });
}

//view by department
  function viewDepts() {
    var query = "SELECT name, id FROM employees.department ORDER BY id asc";
    connection.query(query, function (err, res) {
      console.table(res);
      runSearch();
    });
  }

// view employees 
  function viewEmployees() {
    var query = 
    "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;";
    connection.query(query, function (err, res) {
      console.table(res);
      runSearch();
    });
  }

// view various roles
  function viewRoles() {
    var query =
    "SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;";
    connection.query(query, function(err, res) {
      console.table(res);
      runSearch();
    });
  }

// creates a new employee 
  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "roleID",
          type: "input",
          message: "What is the employee's role ID?",
        },
        {
          name: "managerID",
          type: "input",
          message: "What is your manager ID?",
        },
      ])
      .then(function (answer) {
        var query = 
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(
          query,
          [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
          function (err, res) {
            if (err) throw err;
            console.log(`Successfully Added Employee: ${answer.firstName} ${answer.lastName}`);
            runSearch();
          }
        );
      });
  }

// creates a new role 

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What title would you like to assign the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "departmentID",
        type: "input",
        message: "What is the Department ID for this role? Please select 1 for Sales, 2 for Engineering, 3 for Finance, or 4 for Legal.",
        choices: [1, 2, 3, 4],
      },
    ])
    .then(function (answer) {
      var query = 
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(
        query,
        [answer.title, answer.salary, answer.departmentID],
        function (err, res) {
          if (err) throw err;
          console.log(`Successfully Added Role: ${answer.title}`);
          runSearch();
        }
      )
    })
  }

function addDept() {
  inquirer
  .prompt([
    {
      name: "departmentName",
      type: "input",
      message: "What is the name of the department you would like to add?",
    },
  ])
  .then(function (answer) {
    var query = "INSERT INTO department (name) VALUE (?)";
    connection.query(query, answer.departmentName, function (err, res) {
      if (err) throw err;
      console.log(`Successfully Added Department!`);
      runSearch();
    })
  });
}

function updateEmployeeRole() {
  inquirer
  .prompt([
    {
    name: "currentEmployeeID",
    type: "input",
    message: "What is the ID of the employee you would like to update?",
    },
    {
      name: "newRoleTitle",
      type: "input",
      message: "What is the title of the their new role?",
    },
    {
      name: "newRoleSalary",
      type: "input",
      message: "What is their new salary?",
    },
    {
      name: "newRoleDeptID",
      type: "list",
      message: "What department will they belong to? Select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal.",
      choices: [1, 2, 3, 4]
    },
  ])
  .then(function (answer) {
    var query = "UPDATE role SET title = ?,  salary = ?, department_id = ? WHERE id = ?";
    connection.query(query, [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDeptID, parseInt(answer.currentEmployeeID)], function(err, res) {
      if (err) throw (err);
      console.log("Succesfully updated!");
      runSearch();
    })
  })

  }

function quit() {
  process.quit();
}

module.exports = runSearch;