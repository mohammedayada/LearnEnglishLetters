DROP SCHEMA IF EXISTS Web_Project;
create database web2;
use web2;

CREATE TABLE web (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
_Time VARCHAR(100) NOT NULL,
_Type VARCHAR(100) NOT NULL,
_Target VARCHAR(100) NOT NULL,
);

select * from web;