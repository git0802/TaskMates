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
    description VARCHAR (255)
);

CREATE TABLE bills(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    due_date DATE not null,
    paid_date DATE,
    category VARCHAR(40) not null,
    provider VARCHAR(100) not null,
    notes VARCHAR(255),
    amount INT not null,
    status TINYINT not null,
    id_user INT UNSIGNED,
    id_task INT UNSIGNED
    );

SELECT tasks.*, users.name
FROM tasks
LEFT JOIN users ON tasks.id_user = users.id;

SELECT bills.*, users.name
FROM bills
LEFT JOIN users ON bills.id_user = users.id;

INSERT INTO users(name,lastname,description) VALUES ("Paula","B","organised and clean, overall nice person");
INSERT INTO users(name,lastname,description) VALUES ("Ana","Duncan","likes to cook and read, not too fussy about cleanning");
INSERT INTO users(name,lastname,description) VALUES ("Andrea","M","creative personality, will always make time to decorate a place");
INSERT INTO users(name,lastname,description) VALUES ("Dan","S","fun and easy going, loves traveling and sports");

INSERT INTO bills(due_date,paid_date,category,provider, notes, amount, status) VALUES ("2023-08-31","2023-08-17","water bill", "Water Company Ltd", "-", 23.2, 0);
INSERT INTO bills(due_date,paid_date,category,provider, notes, amount, status) VALUES ("2023-09-10","2023-08-10","electricity", "E-ON Ltd", "electicity bill, needs to be devided by 3 since Dan was away", 133.2, 0);

INSERT INTO bills(due_date,paid_date,category,provider, notes, amount, status) VALUES ("2023-09-01","2023-08-01","internet", "Internet Company Ltd", "-", 28, 1);
INSERT INTO bills(due_date,paid_date,category,provider, notes, amount, status) VALUES ("2023-09-05","2023-08-05","gas", "Gas Company Ltd", "-", 40.5, 1);
