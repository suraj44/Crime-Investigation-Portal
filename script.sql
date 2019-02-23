CREATE DATABASE crime;

use crime;

CREATE TABLE cases(caseid int AUTO_INCREMENT PRIMARY KEY, 
        report varchar(5000),
        eye_witness varchar(5000));