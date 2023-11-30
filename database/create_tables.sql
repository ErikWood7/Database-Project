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
    Customer_email varchar(255) REFERENCES Customer(Customer_email),
    PRIMARY KEY (VIN)
);

CREATE TABLE IF NOT EXISTS Repair (
	Repair_id int NOT NULL AUTO_INCREMENT,
    Repair_detail varchar(255) NOT NULL,
    Note varchar(255),
    VIN varchar(255) REFERENCES Vehicle(VIN),
    PRIMARY KEY (Repair_id)
);

CREATE TABLE IF NOT EXISTS Part (
	Part_id int NOT NULL AUTO_INCREMENT,
    Part_detail varchar(255) NOT NULL,
    OrderStatus varchar(255) NOT NULL,
    Repair_id int REFERENCES Vehicle(VIN),
    PRIMARY KEY (Part_id)
);

CREATE TABLE IF NOT EXISTS Users (
	uid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(200),
    password VARCHAR(100)
);

INSERT INTO Users(username, password) values ("root", "admin");
