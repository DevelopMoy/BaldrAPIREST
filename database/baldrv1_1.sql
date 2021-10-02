-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: baldr
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

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
-- Temporary view structure for view `VIEW_lugarCentro`
--

DROP TABLE IF EXISTS `VIEW_lugarCentro`;
/*!50001 DROP VIEW IF EXISTS `VIEW_lugarCentro`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `VIEW_lugarCentro` AS SELECT 
 1 AS `lugarUUID`,
 1 AS `latitud`,
 1 AS `longitud`,
 1 AS `descripcion`,
 1 AS `centro`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `analista`
--

DROP TABLE IF EXISTS `analista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analista` (
  `uid` varchar(38) NOT NULL,
  `nombreUsuario` varchar(60) NOT NULL,
  `clave` varchar(70) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analista`
--

LOCK TABLES `analista` WRITE;
/*!40000 ALTER TABLE `analista` DISABLE KEYS */;
INSERT INTO `analista` VALUES ('44ae49f9-224e-11ec-9467-5cea1dab60f1','yorch','485fc96580791718755bd03cc4b10559dc4965a0',1),('e353ca8e-224d-11ec-9467-5cea1dab60f1','moy','485fc96580791718755bd03cc4b10559dc4965a0',1);
/*!40000 ALTER TABLE `analista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centro`
--

DROP TABLE IF EXISTS `centro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `centro` (
  `uid` varchar(38) NOT NULL,
  `nombre` varchar(70) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centro`
--

LOCK TABLES `centro` WRITE;
/*!40000 ALTER TABLE `centro` DISABLE KEYS */;
INSERT INTO `centro` VALUES ('0737f9a0-ad0f-4419-8e40-9219607df830','Centro de ciencias basicas');
/*!40000 ALTER TABLE `centro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lugar`
--

DROP TABLE IF EXISTS `lugar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lugar` (
  `uid` varchar(38) NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  `descripcion` varchar(70) NOT NULL,
  `centro_uid` varchar(38) NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `lugar_fk1` (`centro_uid`),
  CONSTRAINT `lugar_fk1` FOREIGN KEY (`centro_uid`) REFERENCES `centro` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lugar`
--

LOCK TABLES `lugar` WRITE;
/*!40000 ALTER TABLE `lugar` DISABLE KEYS */;
INSERT INTO `lugar` VALUES ('c0946c5b-3e0c-455c-b722-053086c03727',21.94095078,-102.31401581,'Salon 552b','0737f9a0-ad0f-4419-8e40-9219607df830'),('d689112b-3f03-44cd-bea6-46c1296194f0',21.91095078,-102.31401581,'Laboratorio 5a','0737f9a0-ad0f-4419-8e40-9219607df830');
/*!40000 ALTER TABLE `lugar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pruebaPositiva`
--

DROP TABLE IF EXISTS `pruebaPositiva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pruebaPositiva` (
  `uid` varchar(38) NOT NULL,
  `fechaInicioSintomas` datetime NOT NULL,
  `fechaPrueba` datetime NOT NULL,
  `involucrado_uid` varchar(38) NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `pruebaPositiva_fk1` (`involucrado_uid`),
  CONSTRAINT `pruebaPositiva_fk1` FOREIGN KEY (`involucrado_uid`) REFERENCES `usuario` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pruebaPositiva`
--

LOCK TABLES `pruebaPositiva` WRITE;
/*!40000 ALTER TABLE `pruebaPositiva` DISABLE KEYS */;
/*!40000 ALTER TABLE `pruebaPositiva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `uid` varchar(38) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('2a8ca8bf-c9af-46ed-8462-2bb9d90c999f','1992-06-01'),('33059665-2c1f-4949-a183-8e572ac8c6ec','1992-06-01'),('5163ab2a-989a-4083-b1fe-52e32d50064b','2002-01-06'),('58753e49-61d7-4206-9a29-bebe342958c4','1992-06-01'),('6257ba30-7325-4882-b8ba-2431d972701c','2002-04-01'),('65419071-74c1-41af-a385-7847e89e021a','2001-01-06'),('9b65636b-b6d4-4417-8d67-2a013f9571fb','2001-02-01'),('dc4fe6b2-a8c0-46d1-a080-da0215196214','1999-04-01');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visita`
--

DROP TABLE IF EXISTS `visita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visita` (
  `uid` varchar(38) NOT NULL,
  `visitante_uid` varchar(38) NOT NULL,
  `entrada` datetime NOT NULL,
  `salida` datetime NOT NULL,
  `lugar_uid` varchar(38) NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `visita_fk1` (`visitante_uid`),
  KEY `visita_fk2` (`lugar_uid`),
  CONSTRAINT `visita_fk1` FOREIGN KEY (`visitante_uid`) REFERENCES `usuario` (`uid`),
  CONSTRAINT `visita_fk2` FOREIGN KEY (`lugar_uid`) REFERENCES `lugar` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visita`
--

LOCK TABLES `visita` WRITE;
/*!40000 ALTER TABLE `visita` DISABLE KEYS */;
/*!40000 ALTER TABLE `visita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `VIEW_lugarCentro`
--

/*!50001 DROP VIEW IF EXISTS `VIEW_lugarCentro`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`moy`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `VIEW_lugarCentro` AS select `L`.`uid` AS `lugarUUID`,`L`.`latitud` AS `latitud`,`L`.`longitud` AS `longitud`,`L`.`descripcion` AS `descripcion`,`C`.`nombre` AS `centro` from (`lugar` `L` join `centro` `C` on((`L`.`centro_uid` = `C`.`uid`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-01 20:24:16
