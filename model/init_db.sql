DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS bills;

SET foreign_key_checks = 0;
SET foreign_key_checks = 1;

CREATE TABLE tasks (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    isDone TINYINT(1) NOT NULL,
    category VARCHAR(255) NOT NULL,
    id_user INT NOT NULL
);

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    description VARCHAR (255) NOT NULL
);

CREATE TABLE bills(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    due_date DATE not null,
    paid_date DATE,
    category VARCHAR(40) not null,
    provider VARCHAR(100) not null,
    notes VARCHAR(255),
    amount INT not null,
    status VARCHAR(40) not null,
    id_task INT
    );

SELECT tasks.*, users.name
FROM tasks
LEFT JOIN users ON tasks.id_user = users.id;

SELECT bills.*, tasks.id
FROM bills
LEFT JOIN tasks ON bills.id_task = tasks.id;
