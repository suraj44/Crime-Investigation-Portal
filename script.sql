CREATE DATABASE crime;

use crime;

CREATE TABLE cases(caseid int AUTO_INCREMENT PRIMARY KEY, 
        status bool default 0,
        fir varchar(100),
        eye_witness varchar(100),
        reporting_date datetime,
        officer_id int,
        detective_report varchar(100) default NULL,
        forensic_report varchar(100) default NULL,
        FOREIGN KEY o1(officer_id) REFERENCES Officer(officer_id));




CREATE TABLE Officer(officer_id int AUTO_INCREMENT PRIMARY KEY,
        name varchar(30)
        );

CREATE TABLE Detective(detective_id int AUTO_INCREMENT PRIMARY KEY,
        name varchar(30)
        );

CREATE TABLE Scientist(scientist_id int AUTO_INCREMENT PRIMARY KEY,
        name varchar(30)
        );

CREATE TABLE Lieutenant(lieutenant_id int AUTO_INCREMENT PRIMARY KEY,
        name varchar(30)
        );

CREATE TABLE Scientist_Case_Link (
        scientist_id int,
        caseid int,
        FOREIGN KEY f2(caseid) REFERENCES cases(caseid),
        FOREIGN KEY f3(scientist_id) REFERENCES Scientist(scientist_id)
        );


CREATE TABLE Detective_Case_Link (
        detective_id int,
        caseid int,
        FOREIGN KEY f2(caseid) REFERENCES cases(caseid),
        FOREIGN KEY f3(detective_id) REFERENCES Detective(detective_id)
        );





