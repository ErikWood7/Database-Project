CREATE DATABASE  IF NOT EXISTS `kchauhan` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kchauhan`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory_management
-- ------------------------------------------------------
-- Server version	8.0.35
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
    Repair_id int REFERENCES Repair(Repair_id)
	   ON DELETE CASCADE
       ON UPDATE CASCADE,
    PRIMARY KEY (Part_id)
);

CREATE TABLE IF NOT EXISTS Users (
	uid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(200),
    password VARCHAR(100)
);

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('aangell@kent.edu','Austin','LNU','1212121124'),('ewood@kent.edu','Erik','Wook','2093314124'),('jfelger@kent.edu','Jeffrey','Felger','901231231'),('kchauhan@kent.edu','Kapil','Chauhan','798134982');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `part`
--

LOCK TABLES `part` WRITE;
/*!40000 ALTER TABLE `part` DISABLE KEYS */;
INSERT INTO `part` VALUES (3,'Spark Plug for replacement','Received',1),(5,'Radiator ','Ordered',1);
/*!40000 ALTER TABLE `part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `repair`
--

LOCK TABLES `repair` WRITE;
/*!40000 ALTER TABLE `repair` DISABLE KEYS */;
INSERT INTO `repair` VALUES (1,'Spark Plug Replacement','Need to update Price','8H1IK12829L123191'),(2,'Radiator Change','Needs to be ordered','8H1IK12829L123191');
/*!40000 ALTER TABLE `repair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'root','admin'),(2,'kchauhan@kent.edu','test');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES ('2G4BK23114P13123',2020,'Chevrolet','Corvett','KB21/U9','aangell@kent.edu'),('4Y1SL65848Z411439',2013,'Ford','Mustang','L041/K2','kchauhan@kent.edu'),('7K1IK12829L123111',2002,'Hyndai','Verna','LA7Y/K2','jfelger@kent.edu'),('8H1IK12829L123191',2010,'Ford','Escape','KB21/U9','ewood@kent.edu');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

-- Dump completed on 2023-12-02 11:28:50
