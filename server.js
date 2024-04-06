const express = require('express');
const mysql = require('mysql2');

const cTable = require('console.table');
const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//connecting to the db

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'company_db'
    },
    console.log('Connected to the customer_db database!')
);


const viewDept = () => {
    // Query database department table
    db.query('SELECT * FROM department', function (err, results) {
        console.table("This is the department table", results);
    });
}

const viewRoles = () => {
    // Query database roles table
    db.query('SELECT * FROM role', function (err, results) {
        console.table("This is the role table", results);
    });
}

const viewEmpl = () => {
    // Query database employee table
    db.query('SELECT * FROM employee', function (err, results) {
        console.table("This is the employee table", results);
    });
}

const joinEmpl = () => {
    db.query("", function (err, results) {
        console.table("This is the employee table", results);
    });
}

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the new department?'
        },
    ])
        .then((response) => {
            db.query(`INSERT INTO department (title) VALUES ("${response.newDept}");`, function (err, results) {
                console.log('New department added!', results);
                cliResponse();
            });
        });
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new role?'
        },
        {
            type: 'input',
            name: 'roleSal',
            message: 'What is the salary agreed upon for this new role?'
        },
        {
            type: 'input',
            name: 'roleDept',
            message: 'What is the department id associated with this role?'
        },
    ])
        .then((responses) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${responses.newRole}", ${responses.roleSal}, ${responses.roleDept});`, function (err, results) {
                console.log('New role added!', results);
                cliResponse();
            });
        })
}

const addEmpl = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the new employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the new employees last name?'
        },
        {
            type: 'input',
            name: 'empRole',
            message: 'What is the new employees role id?'
        },
        {
            type: 'input',
            name: 'manager',
            message: "Enter the employee id of the new employee's manager?(enter NULL if the new employee is a manager)"
        },
    ])
        .then((responses) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${responses.firstName}", "${responses.lastName}", ${responses.empRole}, ${responses.manager});`, function (err, results) {
                console.log("New employee added!", results);
                cliResponse();

            });
        })
}


const cliResponse = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'deptChoice',
            message: 'Welcome to the company database. See options below!',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'Add a department',
                'Add a role',
                'Add an employee'
            ],
            loop: false,
        },
    ])
        .then((responses) => {
            console.log(responses.deptChoice);
            if (responses.deptChoice === 'View departments') {
                viewDept();
                cliResponse();
            } else if (responses.deptChoice === 'View roles') {
                viewRoles();
                cliResponse();
            } else if (responses.deptChoice === 'View employees') {
                viewEmpl();
                cliResponse();
            } else if (responses.deptChoice === 'Add a department') {
                addDept();
                return
            } else if (responses.deptChoice === 'Add a role') {
                addRole();
                return
            } else if (responses.deptChoice === 'Add an employee') {
                addEmpl();
                return
            } else {
                console.log('Something has gone terribly wrong me lord')
                cliResponse();
            }

        })

}

cliResponse();


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});