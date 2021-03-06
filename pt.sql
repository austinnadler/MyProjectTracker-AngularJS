-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: projecttracker
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL,
  `area` varchar(20) DEFAULT NULL,
  `manager` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (54,'SN SS Portal Concept','Work on getting the front end built in the ServiceNow Environment. Use JSON objects for now.','ITSM','Andy, Steve'),(57,'My Project Tracker','Current objectives include adding fields to the database, JavaScript classes, and forms to break the projects dashboard into different sections and highlight important/favorite projects.','Personal','Me'),(67,'Java and Spring','Get more practice with JavaFX and learn the Spring framework','Edward Jones','N/A'),(80,'Learn The New Angular','No tasks. Don\'t plan on getting to this until after EJ internship. I (hopefully) will be using AngularJS at EJ, so I should focus on that for now.','Personal','N/A'),(82,'AngularJS','Learn more AngularJS concepts. Start with Services, then directives.','Personal','N/A');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project$id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project$id` (`project$id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project$id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (19,67,'Spring research','Figure out what Spring actually is.'),(20,67,'Spring Pre-reqs','Find what I need to know in order to use Spring.'),(34,57,'Add State field to tables','Add State field to show projects that are in backlog, in progress, closed. Show these groups in different sections on the page. Also update forms to include a select input for state.'),(35,57,'Add isFavorite field to proj','Add an isFavorite field to the project table, forms, and JavaScript class. Add a section with an ng-show at the top of the page to hold favorites.'),(36,57,'Create branch for JSON version','I would like to possibly create a version of this app that runs on local JSON data so that I can put it on my SIUE website to have some functional content there.'),(38,54,'Create remaining widgets in SN','My Issues widget completed, was much easier than anticipated. The rest could probably be created in a day or two.'),(39,82,'Learn about Services','Learn about services and potentially refactor this app to use a project and task service.'),(40,57,'Implement Services','Learn about Services and how to implement a Project and Task Services for this app.'),(41,82,'Learn about Directives','Learn about directives. How and when to create customer directives.'),(50,57,'Fix selectTasks','Fix selectTasks.php and tasksController.js.selectTasks() to pass parameters to the php file instead of filtering results of full table select with js'),(51,57,'Combine crud forms','The create and update forms on both pages can be combined. The two cancel buttons can be combined, and both submit buttons can be kept and conditionally shown with ng-show. The input control names can be changed to something less specific.');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-16 14:37:27
