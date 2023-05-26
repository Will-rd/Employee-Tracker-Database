USE company_db;

INSERT INTO department (name)
VALUES ("Kitchen"),
       ("Dining Room");

INSERT INTO role (title, salary, department_id)
VALUES ("Chef", 9000.00, 1),
("Kitchen Manager", 10000.00, 1),
("Waiter", 8000.00, 2),
("General Manager", 30000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, NULL),
("Tracy", "Richards", 1, 1),
("Bill","Hicks", 4, NULL),
("Morgan", "Rogers", 3, 3);