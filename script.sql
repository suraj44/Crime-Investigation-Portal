CREATE DATABASE crime;

use crime;

CREATE TABLE Officer(officer_id int AUTO_INCREMENT PRIMARY KEY,
        officer_name varchar(30)
        );

CREATE TABLE Detective(detective_id int AUTO_INCREMENT PRIMARY KEY,
        detective_name varchar(30)
        );

CREATE TABLE Scientist(scientist_id int AUTO_INCREMENT PRIMARY KEY,
        scientist_name varchar(30)
        );

CREATE TABLE Lieutenant(lieutenant_id int AUTO_INCREMENT PRIMARY KEY,
        lieutenant_name varchar(30)
        );


CREATE TABLE cases(caseid int AUTO_INCREMENT PRIMARY KEY, 
        solved_status bool default 0,
        fir varchar(100),
        eye_witness varchar(100),
        reporting_date datetime,
        officer_id int,
        detective_report varchar(100) default NULL,
        forensic_report varchar(100) default NULL,
        FOREIGN KEY o1(officer_id) REFERENCES Officer(officer_id));


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

-- Insert data about hired officials.

INSERT INTO Officer (officer_name) VALUES("Officer1");
INSERT INTO Detective (detective_name) VALUES("Detective1");
INSERT INTO Scientist (scientist_name) VALUES("Scientist1");
INSERT INTO Lieutenant (lieutenant_name) VALUES("Lieutenant1");



-- Case: A person has just arrived and filed a complaint, so we need to make an entry.

INSERT INTO cases(fir, eye_witness, reporting_date, officer_id) VALUES ("TestFIR","ABC XYZ","2019-02-24 17:00:00",1);

-- Mark a case with particular caseid as solved. Following query is for caseid = 1.

UPDATE cases SET solved_status = 1 WHERE caseid = 1;

-- Reopen a case that was thought to be solved. Following query is for caseid = 1.

UPDATE cases SET solved_status = 0 WHERE caseid = 1;


-- Assigning a detective to a case

INSERT INTO Detective_Case_Link VALUES(1,1);

-- Scientist taking up a case

INSERT INTO Scientist_Case_Link VALUES(1,1);

-- Scientist creating a forensic report for a particular case. Updation of the report is basically updating the file, path will not change anyway.
-- This will be a one-time activity per case.

UPDATE cases SET forensic_report = "/home/forensic_reports/case1/report.txt" WHERE caseid = 1;

-- Creating a case-findings report for a particular case. Updation of the report is basically updating the file, path will not change anyway.
-- This will be a one-time activity per case.

UPDATE cases SET detective_report = "/home/detective_reports/case1/report.txt" WHERE caseid = 1;

-- Lieutenant wants to find the detective and scientist working on a given caseid.

SELECT a.detective_name as "Detective", b.scientist_name as "Forensic Scientist" from Detective a, Scientist b, Detective_Case_Link c, Scientist_Case_Link d, cases e
WHERE a.detective_id = c.detective_id AND b.scientist_id = d.scientist_id AND e.caseid = 1;

-- Dropping a detective from a given case

DELETE FROM Detective_Case_Link WHERE detective_id = 1 AND caseid = 1;















