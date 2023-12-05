CREATE DATABASE IF NOT EXISTS inventory_management;
USE inventory_management;
-- MySQL dump 10.19  Distrib 10.3.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: kchauhan
-- ------------------------------------------------------
-- Server version	10.3.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `Customer_email` varchar(255) NOT NULL,
  `First_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Phone_Num` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Customer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES ('aangell@kent.edu','Austin','LNU','1212121124'),('ewood@kent.edu','Erik','Wook','2093314124'),('jfelger@kent.edu','Jeffrey','Felger','901231231'),('kchauhan@kent.edu','Kapil','Chauhan','798134982');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehicle`
--

DROP TABLE IF EXISTS `Vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vehicle` (
  `VIN` varchar(255) NOT NULL,
  `Year` int(11) NOT NULL,
  `Make` varchar(255) NOT NULL,
  `Model` varchar(255) NOT NULL,
  `Paint_Code` varchar(255) NOT NULL,
  `Customer_email` varchar(255) DEFAULT NULL REFERENCES Customer(`Customer_email`)
	   ON DELETE CASCADE
       ON UPDATE CASCADE,
  PRIMARY KEY (`VIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehicle`
--

LOCK TABLES `Vehicle` WRITE;
/*!40000 ALTER TABLE `Vehicle` DISABLE KEYS */;
INSERT INTO `Vehicle` VALUES ('2G4BK23114P13123',2020,'Chevrolet','Corvett','KB21/U9','aangell@kent.edu'),('4Y1SL65848Z411439',2013,'Ford','Mustang','L041/K2','kchauhan@kent.edu'),('7K1IK12829L123111',2002,'Hyndai','Verna','LA7Y/K2','jfelger@kent.edu'),('8H1IK12829L123191',2010,'Ford','Escape','KB21/U9','ewood@kent.edu');
/*!40000 ALTER TABLE `Vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Repair`
--

DROP TABLE IF EXISTS `Repair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Repair` (
  `Repair_id` int(11) NOT NULL AUTO_INCREMENT,
  `Repair_detail` varchar(255) NOT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `VIN` varchar(255) DEFAULT NULL REFERENCES Vehicle(`VIN`)
	   ON DELETE CASCADE
       ON UPDATE CASCADE,
  PRIMARY KEY (`Repair_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Repair`
--

LOCK TABLES `Repair` WRITE;
/*!40000 ALTER TABLE `Repair` DISABLE KEYS */;
INSERT INTO `Repair` VALUES (1,'Spark Plug Replacement','Need to update Price','8H1IK12829L123191'),(2,'Radiator Change','Needs to be ordered','8H1IK12829L123191');
/*!40000 ALTER TABLE `Repair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Part`
--

DROP TABLE IF EXISTS `Part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Part` (
  `Part_id` int(11) NOT NULL AUTO_INCREMENT,
  `Part_detail` varchar(255) NOT NULL,
  `OrderStatus` varchar(255) NOT NULL,
  `Repair_id` int(11) DEFAULT NULL REFERENCES Repair(Repair_id)
	   ON DELETE CASCADE
       ON UPDATE CASCADE,
  PRIMARY KEY (`Part_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Part`
--

LOCK TABLES `Part` WRITE;
/*!40000 ALTER TABLE `Part` DISABLE KEYS */;
INSERT INTO `Part` VALUES (3,'Spark Plug for replacement','Received',1),(5,'Radiator ','Ordered',1);
/*!40000 ALTER TABLE `Part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'root','admin'),(2,'kchauhan@kent.edu','test');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-02 11:44:18
