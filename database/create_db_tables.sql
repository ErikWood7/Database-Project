CREATE DATABASE IF NOT EXISTS inventory_management;
USE inventory_management;

CREATE TABLE IF NOT EXISTS Customer (
	Customer_email varchar(255) NOT NULL,
    First_Name varchar(255) NOT NULL,
    Last_Name varchar(255) NOT NULL,
    Phone_Num varchar(255),
    PRIMARY KEY (Customer_email)
);

CREATE TABLE IF NOT EXISTS Vehicle (
	VIN varchar(255) NOT NULL,
    Year int NOT NULL,
    Make varchar(255) NOT NULL,
    Model varchar(255) NOT NULL,
    Paint_Code varchar(255) NOT NULL,
    Customer_email varchar(255) REFERENCES Customer(Customer_email)
	   ON DELETE CASCADE
       ON UPDATE CASCADE,
    PRIMARY KEY (VIN)
);

CREATE TABLE IF NOT EXISTS Repair (
	Repair_id int NOT NULL AUTO_INCREMENT,
    Repair_detail varchar(255) NOT NULL,
    Note varchar(255),
    VIN varchar(255) REFERENCES Vehicle(VIN)
	   ON DELETE CASCADE
       ON UPDATE CASCADE,
    PRIMARY KEY (Repair_id)
);

CREATE TABLE IF NOT EXISTS Part (
	Part_id int NOT NULL AUTO_INCREMENT,
    Part_detail varchar(255) NOT NULL,
    OrderStatus varchar(255) NOT NULL,
    Repair_id int REFERENCES Vehicle(VIN)
	   ON DELETE CASCADE
       ON UPDATE CASCADE,
    PRIMARY KEY (Part_id)
);

CREATE TABLE IF NOT EXISTS Users (
	uid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(200),
    password VARCHAR(100)
);

insert into `Users` (username, password) VALUES ('kchauhan@kent.edu', 'test');

Insert into `Customer` (Customer_email, First_Name, Last_Name, Phone_Num) VALUES (
"ewood@kent.edu",
"Erik",
"Wood",
"31134141123");

Insert into `Vehicle` (VIN, Customer_email, Year, Make, Model, Paint_Code) VALUES (
"8H1IK12829L123191", 
"ewood@kent.edu", 
2010, 
"Ford",
"Escape", 
"KB21/U9");

Insert into `Repair` (VIN, Repair_detail, Note) VALUES (
"1H1AL23467I234537", 
"Puncture", 
"Tire replacement");

Insert into `Part` (Repair_id, Part_detail, OrderStatus) VALUES (
1, 
"Spark Plug for replacement", 
"Received");

