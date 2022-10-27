-- Departments
INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Administration"), 
    ("Finance"), 
    ("Human Resources"), 
    ("Information Technology"), 
    ("Operations");

-- Employee Roles
INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Manager", 120000.00, 1),
    ("Director", 900000.00, 2),
    ("Admin Manager", 45000.00, 2),
    ("Admin Staff", 30000.00, 2),
    ("Secretary", 30000.00, 2),
    ("Payroll", 45000.00, 3),
    ("Web Developer", 90000.00, 4),
    ("Software Developer", 60000.00, 4);

-- Employee info

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Sally", "Jones", 1, NULL),
    ("Bob", "Smith", 2, NULL),
    ("Becky", "Johnson", 3, NULL),
    ("Ken", "Booth", 8, NULL),
    ("Bob", "Marley", 4, 3),
    ("Mohammed", "Ali", 5, 2),
    ("Ezra", "Tafari", 6, 3),
    ("Jackie", "Jump", 7, 2),
    ("Victoria", "Sticktoria", 5, 4),
    ("Kiran", "Hotdes", 5, 1),
    ("Seth", "Beckford", 5, 2);