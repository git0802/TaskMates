-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS tasks;
-- DROP TABLE IF EXISTS bills;

SET foreign_key_checks = 0;
SET foreign_key_checks = 1;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    adress VARCHAR(255) NOT NULL,
    description VARCHAR (255),
    email VARCHAR(40) NOT NULL, 
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    isDone TINYINT(1) NOT NULL,
    category VARCHAR(255) NOT NULL,
    user_id INT NOT NULL
);

CREATE TABLE bills (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(40) NOT NULL,
    amount INT NOT NULL,
    due_date DATE NOT NULL,
    provider VARCHAR(100) NOT NULL,
    notes VARCHAR(255),
    status TINYINT NOT NULL,
    user_id INT UNSIGNED,
    task_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


SELECT tasks.*, users.name
FROM tasks
LEFT JOIN users ON tasks.user_id = users.id;

SELECT bills.*, users.name
FROM bills
LEFT JOIN users ON bills.user_id = users.id;


