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

const addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the new department?'
        },
    ])
    .then((response) => {
        db.query(`INSERT INTO department (name) VALUES ("${response.newDept}");`, function (err, results) {
            console.log('New department added!', results);
            cliResponse();
        });
    });
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

            } else {
                console.log('Something has gone terribly wrong me lord')

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