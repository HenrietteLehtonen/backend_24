-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS test;
CREATE DATABASE test;
USE test;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_level_id INT,
)

CREATE TILAUS (
    tilaus_id INT AUTO_INCREMENT PRIMARY KEY,
    tilattu_aika TIMESTAMP,
    user_id INT AUTO_INCREMENT FOREIGN KEY,
    annos_id INT 
)

