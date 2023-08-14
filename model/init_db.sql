DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Tasks;

SET foreign_key_checks = 0;
SET foreign_key_checks = 1;

CREATE TABLE Tasks (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    isDone TINYINT(1) NOT NULL,
    category VARCHAR(255) NOT NULL,
    id_user INT NOT NULL
);

CREATE TABLE Users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    description VARCHAR (255) NOT NULL
);



SELECT tasks.*, users.name
FROM tasks
LEFT JOIN users ON tasks.id_user = users.id;

-- ALTER TABLE
--     `table_2` ADD CONSTRAINT `table_2_id_user_foreign` FOREIGN KEY(`id_user`) REFERENCES `Users`(`id`);


