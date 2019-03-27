CREATE DATABASE crime;

use crime;

CREATE TABLE Users(userid varchar(30) PRIMARY KEY, password varchar(30), role int NOT NULL);

CREATE TABLE cases(caseid int AUTO_INCREMENT PRIMARY KEY,
 solved_status tinyint DEFAULT 0,
fir varchar(100),
eye_witness varchar(100),
reporting_date datetime, 
userid varchar(30),
FOREIGN KEY u1(userid) REFERENCES Users(userid));

CREATE TABLE Detective_Case_Link(
    userid varchar(30),
    caseid int,
    detective_report varchar(100) DEFAULT NULL,
    FOREIGN KEY u2(userid) REFERENCES Users(userid),
    FOREIGN KEY c1(caseid) REFERENCES cases(caseid));

CREATE TABLE Scientist_Case_Link(
    userid varchar(30),
    caseid int,
    forensic_report varchar(100) DEFAULT NULL,
    FOREIGN KEY u2(userid) REFERENCES Users(userid),
    FOREIGN KEY c1(caseid) REFERENCES cases(caseid));


INSERT INTO Users VALUES("officer1","1234",0);
INSERT INTO Users VALUES("officer2","1234",0);
INSERT INTO Users VALUES("detective1","1234",1);
INSERT INTO Users VALUES("detective2","1234",1);
INSERT INTO Users VALUES("lieutenant1","1234",2);
INSERT INTO Users VALUES("lieutenant2","1234",2);
INSERT INTO Users VALUES("scientist1","1234",3);
INSERT INTO Users VALUES("scientist2","1234",3);
