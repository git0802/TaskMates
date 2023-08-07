--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists students;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE students(
    id INT NOT NULL AUTO_INCREMENT, 
    firstname VARCHAR(40) not null, 
    lastname VARCHAR(40) not null, 
    PRIMARY KEY (id)
    );
