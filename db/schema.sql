DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (8) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (department_name) REFERENCES department(name) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_title VARCHAR(50) NOT NULL,
    manager_name VARCHAR(50) NOT NULL,
    salary DECIMAL(8) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (department_name) REFERENCES department(name) ON DELETE SET NULL,
    FOREIGN KEY (role_salary) REFERENCES role(salary) ON DELETE SET NULL,
    FOREIGN KEY (role_title) REFERENCES role(title) ON DELETE SET NULL,
    FOREIGN KEY (manager_name) REFERENCES employee(first_name, " ", last_name) ON DELETE SET NULL
);