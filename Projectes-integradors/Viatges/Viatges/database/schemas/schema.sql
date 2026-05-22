-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: viatges
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_experiencia`
--

DROP TABLE IF EXISTS `categoria_experiencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_experiencia` (
  `id_experiencia` bigint unsigned NOT NULL,
  `id_categoria` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_experiencia`,`id_categoria`),
  KEY `categoria_experiencia_id_categoria_foreign` (`id_categoria`),
  CONSTRAINT `categoria_experiencia_id_categoria_foreign` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `categoria_experiencia_id_experiencia_foreign` FOREIGN KEY (`id_experiencia`) REFERENCES `experiencies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_experiencia`
--

LOCK TABLES `categoria_experiencia` WRITE;
/*!40000 ALTER TABLE `categoria_experiencia` DISABLE KEYS */;
INSERT INTO `categoria_experiencia` VALUES (1,1,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(2,2,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(2,3,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(3,3,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(4,4,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(5,5,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(7,2,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(8,3,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(9,4,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(10,5,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(11,6,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(12,7,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(13,8,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(14,9,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(15,10,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(16,11,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(17,12,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(18,1,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(18,6,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(19,2,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(19,7,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(20,3,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(20,10,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(21,4,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(21,8,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(22,5,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(22,11,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(23,9,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(23,12,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(24,1,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(24,2,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(24,12,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(25,3,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(25,4,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(25,7,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(26,5,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(26,8,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(26,10,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(27,1,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(28,2,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(29,3,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(30,4,'2026-04-20 13:28:40','2026-04-20 13:28:40');
/*!40000 ALTER TABLE `categoria_experiencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categorias_nom_unique` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Senderisme','Rutes a peu per muntanyes, boscos i camins naturals.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(2,'Gastronomia','Experiències culinàries, restaurants i productes locals.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(3,'Cultura i patrimoni','Visites a monuments, museus i llocs d\'interès històric.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(4,'Esports d\'aventura','Activitats com escalada, kayak, parapent i ciclisme de muntanya.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(5,'Relax i natura','Parcs naturals, platges i espais per desconnectar.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(6,'Enoturisme','Cellers, tastos de vi i rutes entre vinyes.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(7,'Turisme familiar','Plans adaptats per gaudir amb infants de totes les edats.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(8,'Fotografia','Miradors i localitzacions ideals per capturar paisatges únics.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(9,'Festes locals','Firetes, tradicions i celebracions populars del territori.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(10,'Història viva','Jaciments, rutes medievals i espais amb valor històric.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(11,'Escapades de cap de setmana','Propostes curtes per desconnectar sense fer un viatge llarg.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(12,'Miradors i panoràmiques','Punts elevats amb vistes destacades de costa, vall i muntanya.','2026-04-20 13:28:40','2026-04-20 13:28:40');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentaris`
--

DROP TABLE IF EXISTS `comentaris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentaris` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_usuari` bigint unsigned NOT NULL,
  `id_experiencia` bigint unsigned NOT NULL,
  `contingut` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comentaris_id_usuari_id_experiencia_unique` (`id_usuari`,`id_experiencia`),
  KEY `comentaris_id_experiencia_foreign` (`id_experiencia`),
  CONSTRAINT `comentaris_id_experiencia_foreign` FOREIGN KEY (`id_experiencia`) REFERENCES `experiencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comentaris_id_usuari_foreign` FOREIGN KEY (`id_usuari`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentaris`
--

LOCK TABLES `comentaris` WRITE;
/*!40000 ALTER TABLE `comentaris` DISABLE KEYS */;
INSERT INTO `comentaris` VALUES (1,9,1,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(2,10,1,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(3,13,1,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:40','2026-04-20 13:28:40'),(4,17,1,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(5,9,2,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(6,10,2,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:40','2026-04-20 13:28:40'),(7,13,2,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(8,17,2,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(9,10,3,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:40','2026-04-20 13:28:40'),(10,13,3,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(11,17,3,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(12,4,3,'Ens va encantar l\'itinerari, sobretot el tram final amb les vistes.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(13,17,4,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(14,4,4,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(15,3,4,'Ens va encantar l\'itinerari, sobretot el tram final amb les vistes.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(16,2,4,'Molt bona relació entre esforç i recompensa, repetirem segur.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(17,17,5,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(18,3,5,'Ens va encantar l\'itinerari, sobretot el tram final amb les vistes.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(19,2,5,'Molt bona relació entre esforç i recompensa, repetirem segur.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(20,5,5,'Perfecte per una escapada curta, ben explicat i molt pràctic.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(21,3,7,'Molt bona relació entre esforç i recompensa, repetirem segur.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(22,5,7,'Perfecte per una escapada curta, ben explicat i molt pràctic.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(23,15,7,'Hem seguit les recomanacions i tot ha anat rodat.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(24,7,7,'Experiència completa: paisatge, tranquil·litat i bon ambient.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(25,5,8,'Perfecte per una escapada curta, ben explicat i molt pràctic.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(26,15,8,'Hem seguit les recomanacions i tot ha anat rodat.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(27,7,8,'Experiència completa: paisatge, tranquil·litat i bon ambient.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(28,8,8,'La zona està molt ben conservada, val molt la pena visitar-la.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(29,15,9,'Hem seguit les recomanacions i tot ha anat rodat.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(30,7,9,'Experiència completa: paisatge, tranquil·litat i bon ambient.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(31,8,9,'La zona està molt ben conservada, val molt la pena visitar-la.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(32,6,9,'Informació clara i útil; ens ha ajudat a evitar hores punta.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(33,7,10,'Experiència completa: paisatge, tranquil·litat i bon ambient.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(34,8,10,'La zona està molt ben conservada, val molt la pena visitar-la.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(35,6,10,'Informació clara i útil; ens ha ajudat a evitar hores punta.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(36,12,10,'Planificació ideal per anar-hi en parella o amb amistats.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(37,7,11,'La zona està molt ben conservada, val molt la pena visitar-la.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(38,8,11,'Informació clara i útil; ens ha ajudat a evitar hores punta.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(39,12,11,'Planificació ideal per anar-hi en parella o amb amistats.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(40,14,11,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(41,6,12,'Informació clara i útil; ens ha ajudat a evitar hores punta.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(42,12,12,'Planificació ideal per anar-hi en parella o amb amistats.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(43,14,12,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(44,16,12,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(45,12,13,'Planificació ideal per anar-hi en parella o amb amistats.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(46,14,13,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(47,16,13,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(48,11,13,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(49,14,14,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(50,16,14,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(51,11,14,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(52,1,14,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:40','2026-04-20 13:28:40'),(53,1,16,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(54,9,16,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:40','2026-04-20 13:28:40'),(55,10,16,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(56,13,16,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(57,1,17,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:40','2026-04-20 13:28:40'),(58,9,17,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(59,10,17,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(60,13,17,'Ens va encantar l\'itinerari, sobretot el tram final amb les vistes.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(61,10,18,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(62,13,18,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(63,17,18,'Ens va encantar l\'itinerari, sobretot el tram final amb les vistes.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(64,4,18,'Molt bona relació entre esforç i recompensa, repetirem segur.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(65,13,20,'Ens va encantar l\'itinerari, sobretot el tram final amb les vistes.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(66,17,20,'Molt bona relació entre esforç i recompensa, repetirem segur.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(67,4,20,'Perfecte per una escapada curta, ben explicat i molt pràctic.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(68,2,20,'Hem seguit les recomanacions i tot ha anat rodat.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(69,17,21,'Molt bona relació entre esforç i recompensa, repetirem segur.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(70,3,21,'Perfecte per una escapada curta, ben explicat i molt pràctic.','2026-04-20 13:28:40','2026-04-20 13:28:40'),(71,2,21,'Hem seguit les recomanacions i tot ha anat rodat.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(72,5,21,'Experiència completa: paisatge, tranquil·litat i bon ambient.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(73,4,22,'Perfecte per una escapada curta, ben explicat i molt pràctic.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(74,3,22,'Hem seguit les recomanacions i tot ha anat rodat.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(75,2,22,'Experiència completa: paisatge, tranquil·litat i bon ambient.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(76,15,22,'La zona està molt ben conservada, val molt la pena visitar-la.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(77,3,23,'Hem seguit les recomanacions i tot ha anat rodat.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(78,2,23,'Experiència completa: paisatge, tranquil·litat i bon ambient.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(79,5,23,'La zona està molt ben conservada, val molt la pena visitar-la.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(80,15,23,'Informació clara i útil; ens ha ajudat a evitar hores punta.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(81,5,25,'La zona està molt ben conservada, val molt la pena visitar-la.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(82,15,25,'Informació clara i útil; ens ha ajudat a evitar hores punta.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(83,7,25,'Planificació ideal per anar-hi en parella o amb amistats.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(84,6,25,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(85,7,26,'Informació clara i útil; ens ha ajudat a evitar hores punta.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(86,8,26,'Planificació ideal per anar-hi en parella o amb amistats.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(87,6,26,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(88,12,26,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(89,8,27,'Planificació ideal per anar-hi en parella o amb amistats.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(90,6,27,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(91,12,27,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(92,14,27,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(93,6,28,'Molt bona proposta. L\'he guardat per fer-la aquest cap de setmana.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(94,12,28,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(95,14,28,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(96,16,28,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:41','2026-04-20 13:28:41'),(97,6,29,'Experiència súper recomanable, especialment si hi vas d\'hora.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(98,14,29,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(99,16,29,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:41','2026-04-20 13:28:41'),(100,11,29,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(101,14,30,'Ruta fàcil de seguir i amb molt bons punts per fer fotos.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(102,16,30,'Hi tornaria sens dubte. Gràcies per compartir tots els detalls!','2026-04-20 13:28:41','2026-04-20 13:28:41'),(103,11,30,'La descripció és molt útil, m\'ha ajudat a planificar la sortida.','2026-04-20 13:28:41','2026-04-20 13:28:41'),(104,9,30,'Ambient molt agradable i zona ideal per anar-hi en grup.','2026-04-20 13:28:41','2026-04-20 13:28:41');
/*!40000 ALTER TABLE `comentaris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencies`
--

DROP TABLE IF EXISTS `experiencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_usuari_creador` bigint unsigned NOT NULL,
  `titol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contingut` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imatge` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitud` decimal(10,7) NOT NULL,
  `longitud` decimal(10,7) NOT NULL,
  `ubicacio_nom` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_place_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estat` enum('esborrany','publicat','rebutjat') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'publicat',
  `data_publicacio` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `experiencies_id_usuari_creador_foreign` (`id_usuari_creador`),
  CONSTRAINT `experiencies_id_usuari_creador_foreign` FOREIGN KEY (`id_usuari_creador`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencies`
--

LOCK TABLES `experiencies` WRITE;
/*!40000 ALTER TABLE `experiencies` DISABLE KEYS */;
INSERT INTO `experiencies` VALUES (1,1,'Ascens al Pedraforca','Una de les rutes més espectaculars del Berguedà. El perfil biforcat del Pedraforca és inconfusible des de qualsevol punt de la comarca. La pujada per la canal del Tossals és exigent però el panorama des del cim ho paga tot.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.2395800,1.7024300,'Pedraforca, Berguedà',NULL,'publicat','2026-04-10 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(2,2,'Mercat de la Boqueria, Barcelona','El mercat de Sant Josep de la Boqueria és un dels mercats coberts més antics i emblemàtics d\'Europa. Fruites exòtiques, peixos frescos, embotits artesanals i parades de sucs de colors vibrants el converteixen en una experiència sensorial única.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.3817700,2.1721200,'La Boqueria, Barcelona',NULL,'publicat','2026-04-15 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(3,3,'Visita al Monestir de Poblet','Declarat Patrimoni de la Humanitat per la UNESCO, el Monestir de Poblet és el conjunt monàstic medieval millor conservat del món. La seva arquitectura cistercenca i el panteó dels reis de la Corona d\'Aragó el fan imprescindible.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.3820300,1.0738700,'Monestir de Poblet, Conca de Barberà',NULL,'publicat','2026-04-05 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(4,1,'Kayak pel Delta de l\'Ebre','Recórrer els canals del Delta de l\'Ebre en kayak és una experiència inoblidable. Ànecs, flamencs i agrons reials acompanyen el trajecte entre arrossars i llacunes. Ideal per a tots els nivells i perfecte al sortir el sol.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',40.7235600,0.8699100,'Delta de l\'Ebre, Terres de l\'Ebre',NULL,'publicat','2026-04-17 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(5,4,'Cap de Creus al capvespre','El Cap de Creus és el punt més oriental de la Península Ibèrica. Veure com el sol es pon darrere les Illes Medes des dels seus penya-segats és un moment màgic que no s\'oblida. El parc natural ofereix paisatges lunars de gran bellesa.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.3193900,3.3193900,'Cap de Creus, Alt Empordà',NULL,'publicat','2026-04-12 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(6,5,'Fonts del Llobregat','Un racó poc conegut al Berguedà on neix el riu Llobregat. Accessible en cotxe fins a prop del naixement, és ideal per a una excursió familiar tranquil·la amb els peus a l\'aigua.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.2680000,2.0041000,'Fonts del Llobregat, Berguedà',NULL,'esborrany',NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(7,2,'Escapada de prova 1 a Vall de Núria, Ripollès','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Vall de Núria, Ripollès.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.3983000,2.1537000,'Vall de Núria, Ripollès','ChIJbX6p7VhQpxIRg9x_yY0jw7Q','publicat','2026-04-18 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(8,3,'Escapada de prova 2 a Montserrat, Bages','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Montserrat, Bages.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.5956000,1.8372000,'Montserrat, Bages','ChIJu0QxjQfppBIR1BzjZxv9R6Y','publicat','2026-04-17 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(9,4,'Escapada de prova 3 a Aigüestortes, Alta Ribagorça','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Aigüestortes, Alta Ribagorça.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.5725000,0.9967000,'Aigüestortes, Alta Ribagorça','ChIJ4Qe6t2IUpRIRF2A40mR5cLk','publicat','2026-04-16 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(10,5,'Escapada de prova 4 a Tossa de Mar, Selva','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Tossa de Mar, Selva.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.7200000,2.9323000,'Tossa de Mar, Selva','ChIJW2iMIP6PpBIRYjvYdM5m0C0','publicat','2026-04-15 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(11,6,'Escapada de prova 5 a Besalú, Garrotxa','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Besalú, Garrotxa.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.1993000,2.6997000,'Besalú, Garrotxa','ChIJ_7Z5TH5bpBIRNFR4bdj2aDU','publicat','2026-04-14 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(12,7,'Escapada de prova 6 a Siurana, Priorat','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Siurana, Priorat.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.2581000,0.9316000,'Siurana, Priorat','ChIJW4y3gxQ9pBIRmbgDTVuD06Q','publicat','2026-04-13 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(13,8,'Escapada de prova 7 a Sitges, Garraf','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Sitges, Garraf.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.2351000,1.8116000,'Sitges, Garraf','ChIJ3WhBBfWVpBIRx0gvf9LtL7A','publicat','2026-04-12 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(14,9,'Escapada de prova 8 a Cadaqués, Alt Empordà','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Cadaqués, Alt Empordà.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.2882000,3.2786000,'Cadaqués, Alt Empordà','ChIJL3W8Q03lpBIRdo4x4GZdr0s','publicat','2026-04-11 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(15,10,'Escapada de prova 9 a Rupit i Pruit, Osona','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Rupit i Pruit, Osona.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.0240000,2.4658000,'Rupit i Pruit, Osona','ChIJe5u0e4MhpBIRmjP2G2h-AaA','esborrany',NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(16,11,'Escapada de prova 10 a Pals, Baix Empordà','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Pals, Baix Empordà.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.9712000,3.1481000,'Pals, Baix Empordà','ChIJ56wIqkLfpBIRc6CFp8QxfFQ','publicat','2026-04-09 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(17,12,'Escapada de prova 11 a Camprodon, Ripollès','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Camprodon, Ripollès.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.3129000,2.3648000,'Camprodon, Ripollès','ChIJn-Q5aINXpBIRiPyx1h8QnG8','publicat','2026-04-08 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(18,1,'Escapada de prova 12 a Delta de l\'Ebre, Montsià','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Delta de l\'Ebre, Montsià.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',40.7400000,0.7900000,'Delta de l\'Ebre, Montsià','ChIJH6H8nUb3oRIR9VJzgVJf1dA','publicat','2026-04-07 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(19,2,'Escapada de prova 13 a Parc Güell, Barcelona','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Parc Güell, Barcelona.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.4145000,2.1527000,'Parc Güell, Barcelona','ChIJj61dQgKipBIR4GeTYWZsKWw','rebutjat',NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(20,3,'Escapada de prova 14 a Girona Barri Vell, Girona','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Girona Barri Vell, Girona.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.9869000,2.8249000,'Girona Barri Vell, Girona','ChIJ6a6A0MYXpBIR8fMOWy8uk8w','publicat','2026-04-05 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(21,4,'Escapada de prova 15 a La Molina, Cerdanya','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a La Molina, Cerdanya.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.3310000,1.9384000,'La Molina, Cerdanya','ChIJVwH6edrppRIRtSy6P7A0RmQ','publicat','2026-04-04 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(22,5,'Escapada de prova 16 a L\'Escala, Alt Empordà','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a L\'Escala, Alt Empordà.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.1244000,3.1333000,'L\'Escala, Alt Empordà','ChIJL6g8kjfepBIRR8KnNQ8vNgU','publicat','2026-04-03 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(23,6,'Escapada de prova 17 a PortAventura, Tarragonès','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a PortAventura, Tarragonès.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.0877000,1.1576000,'PortAventura, Tarragonès','ChIJ4-4Pd0NbpBIRiC8OG8N8qE8','publicat','2026-04-02 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(24,7,'Escapada de prova 18 a Santuari de Queralt, Berguedà','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Santuari de Queralt, Berguedà.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.1095000,1.8439000,'Santuari de Queralt, Berguedà','ChIJyfvW2nDspRIRn2PjYt3gQGQ','esborrany',NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(25,8,'Escapada de prova 19 a Llavorsí, Pallars Sobirà','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Llavorsí, Pallars Sobirà.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.4979000,1.2112000,'Llavorsí, Pallars Sobirà','ChIJx0S7D2MUpRIR5vA7T3f9y2E','publicat','2026-03-31 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(26,9,'Escapada de prova 20 a Calella de Palafrugell, Baix Empordà','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Calella de Palafrugell, Baix Empordà.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.8916000,3.1827000,'Calella de Palafrugell, Baix Empordà','ChIJ9Q2x3xrfpBIR6h7m1FBefQ0','publicat','2026-03-30 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(27,10,'Escapada de prova 21 a Peratallada, Baix Empordà','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Peratallada, Baix Empordà.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',41.9755000,3.0896000,'Peratallada, Baix Empordà','ChIJlyv2xQ7fpBIRhSgq6GJ5j58','publicat','2026-03-29 13:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(28,11,'Escapada de prova 22 a Parc Nacional d\'Ordesa','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Parc Nacional d\'Ordesa.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',42.6538000,-0.0516000,'Parc Nacional d\'Ordesa','ChIJX3GqUo1jVQ0R9YQ3Yx8j3ds','publicat','2026-03-28 14:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(29,12,'Escapada de prova 23 a Albufera de València','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Albufera de València.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',39.3558000,-0.3326000,'Albufera de València','ChIJz5x0kQxRYA0R5oH9kVx2mQY','publicat','2026-03-27 14:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40'),(30,1,'Escapada de prova 24 a Picos de Europa','Experiència de prova pensada per validar filtres, paginació i interaccions socials. Inclou informació útil sobre horaris, punts d\'interès i recomanacions de temporada per a Picos de Europa.','https://res.cloudinary.com/dljmrhd6z/image/upload/q_auto/f_auto/v1770647255/cld-sample-2.jpg',43.1871000,-4.8127000,'Picos de Europa','ChIJh9Zj_qxWTg0RPt4t95S0W4U','publicat','2026-03-26 14:28:40','2026-04-20 13:28:40','2026-04-20 13:28:40');
/*!40000 ALTER TABLE `experiencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_usuari` bigint unsigned NOT NULL,
  `id_experiencia` bigint unsigned NOT NULL,
  `valoracio` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `likes_id_usuari_id_experiencia_unique` (`id_usuari`,`id_experiencia`),
  KEY `likes_id_experiencia_foreign` (`id_experiencia`),
  CONSTRAINT `likes_id_experiencia_foreign` FOREIGN KEY (`id_experiencia`) REFERENCES `experiencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_id_usuari_foreign` FOREIGN KEY (`id_usuari`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,9,1,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(2,13,1,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(3,4,1,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(4,2,1,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(5,15,1,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(6,8,1,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(7,12,1,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(8,16,1,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(9,9,2,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(10,13,2,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(11,4,2,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(12,5,2,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(13,7,2,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(14,6,2,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(15,14,2,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(16,11,2,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(17,10,3,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(18,17,3,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(19,2,3,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(20,15,3,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(21,8,3,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(22,12,3,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(23,16,3,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(24,1,3,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(25,17,4,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(26,3,4,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(27,5,4,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(28,7,4,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(29,6,4,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(30,14,4,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(31,11,4,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(32,10,4,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(33,17,5,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(34,2,5,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(35,15,5,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(36,8,5,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(37,12,5,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(38,16,5,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(39,1,5,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(40,10,5,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(41,3,7,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(42,15,7,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(43,8,7,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(44,12,7,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(45,16,7,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(46,1,7,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(47,10,7,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(48,17,7,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(49,5,8,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(50,7,8,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(51,6,8,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(52,14,8,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(53,11,8,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(54,9,8,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(55,13,8,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(56,4,8,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(57,15,9,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(58,8,9,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(59,12,9,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(60,16,9,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(61,1,9,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(62,10,9,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(63,17,9,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(64,2,9,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(65,7,10,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(66,6,10,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(67,14,10,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(68,11,10,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(69,9,10,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(70,13,10,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(71,4,10,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(72,2,10,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(73,7,11,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(74,12,11,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(75,16,11,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(76,1,11,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(77,10,11,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(78,17,11,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(79,3,11,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(80,5,11,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(81,6,12,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(82,14,12,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(83,11,12,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(84,9,12,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(85,13,12,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(86,4,12,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(87,2,12,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(88,15,12,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(89,12,13,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(90,16,13,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(91,1,13,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(92,10,13,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(93,17,13,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(94,3,13,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(95,5,13,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(96,7,13,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(97,14,14,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(98,11,14,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(99,10,14,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(100,17,14,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(101,3,14,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(102,5,14,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(103,7,14,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(104,6,14,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(105,1,16,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(106,10,16,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(107,17,16,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(108,3,16,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(109,5,16,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(110,7,16,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(111,6,16,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(112,14,16,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(113,1,17,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(114,10,17,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(115,17,17,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(116,3,17,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(117,5,17,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(118,7,17,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(119,6,17,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(120,16,17,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(121,10,18,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(122,17,18,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(123,3,18,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(124,5,18,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(125,7,18,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(126,6,18,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(127,14,18,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(128,11,18,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(129,13,20,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(130,4,20,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(131,5,20,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(132,7,20,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(133,6,20,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(134,14,20,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(135,11,20,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(136,9,20,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(137,17,21,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(138,2,21,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(139,15,21,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(140,8,21,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(141,12,21,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(142,16,21,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(143,1,21,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(144,10,21,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(145,4,22,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(146,2,22,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(147,7,22,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(148,6,22,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(149,14,22,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(150,11,22,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(151,9,22,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(152,13,22,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(153,3,23,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(154,5,23,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(155,7,23,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(156,12,23,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(157,16,23,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(158,1,23,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(159,10,23,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(160,17,23,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(161,5,25,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(162,7,25,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(163,12,25,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(164,16,25,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(165,1,25,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(166,10,25,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(167,17,25,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(168,3,25,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(169,7,26,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(170,6,26,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(171,14,26,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(172,11,26,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(173,10,26,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(174,17,26,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(175,3,26,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(176,5,26,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(177,8,27,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(178,12,27,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(179,16,27,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(180,1,27,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(181,13,27,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(182,4,27,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(183,2,27,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(184,15,27,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(185,6,28,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(186,14,28,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(187,1,28,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(188,10,28,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(189,17,28,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(190,3,28,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(191,5,28,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(192,7,28,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(193,6,29,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(194,16,29,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(195,1,29,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(196,10,29,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(197,17,29,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(198,3,29,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(199,5,29,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(200,7,29,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(201,14,30,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(202,11,30,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(203,10,30,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(204,17,30,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(205,3,30,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(206,5,30,1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(207,7,30,-1,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(208,6,30,1,'2026-04-20 13:28:41','2026-04-20 13:28:41');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_08_14_170933_add_two_factor_columns_to_users_table',1),(5,'2026_03_17_163326_create_categorias_table',1),(6,'2026_03_18_175812_create_experiencies_table',1),(7,'2026_03_18_175812_create_likes_table',1),(8,'2026_03_18_175813_create_comentaris_table',1),(9,'2026_03_23_162414_create_reports_table',1),(10,'2026_04_04_192148_migrate_experiencia_categories_to_pivot',1),(11,'2026_04_09_164009_add_google_place_id_to_experiencies_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_usuari` bigint unsigned NOT NULL,
  `id_experiencia` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reports_id_usuari_id_experiencia_unique` (`id_usuari`,`id_experiencia`),
  KEY `reports_id_experiencia_foreign` (`id_experiencia`),
  CONSTRAINT `reports_id_experiencia_foreign` FOREIGN KEY (`id_experiencia`) REFERENCES `experiencies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reports_id_usuari_foreign` FOREIGN KEY (`id_usuari`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,4,6,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(2,15,6,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(3,6,6,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(4,16,6,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(5,9,6,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(6,3,7,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(7,7,7,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(8,14,14,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(9,1,14,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(10,16,15,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(11,9,15,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(12,4,15,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(13,5,15,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(14,8,15,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(15,10,19,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(16,4,19,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(17,15,19,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(18,6,19,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(19,16,19,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(20,17,21,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(21,5,21,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(22,2,24,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(23,8,24,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(24,14,24,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(25,1,24,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(26,13,24,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(27,6,28,'2026-04-20 13:28:41','2026-04-20 13:28:41'),(28,16,28,'2026-04-20 13:28:41','2026-04-20 13:28:41');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Pi5wazJlLCfCTCWF9NjC1yciHUPUj6DyHt4nbLpj',1,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoib1ZIMkc3V2ZRWEN4T216THhlcDlnYjd2UVZnNExUVTNFQWVQdTdRMyI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vbG9jYWxob3N0OjgwMDAvbG9naW4iO3M6NToicm91dGUiO3M6NToibG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1776698942);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_telefon_unique` (`telefon`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Anna Garcia','anna.garcia@example.com','+34600111222',1,'2026-04-20 13:28:37','$2y$12$x1mxlRDjiP6m.mBwJfR.FuHOsYEofnRqY/QeOhR6JXX.zKawbxLVy',NULL,NULL,NULL,NULL,'2026-04-20 13:28:37','2026-04-20 13:28:37'),(2,'Marc López','marc.lopez@example.com','+34600333444',0,'2026-04-20 13:28:37','$2y$12$UeDzcx9pXbyGsMKArs8jV.kRufgKI/2QP2QyQyXP6eFzqJiOecqi6',NULL,NULL,NULL,NULL,'2026-04-20 13:28:37','2026-04-20 13:28:37'),(3,'Laura Martínez','laura.martinez@example.com','+34600555666',0,'2026-04-20 13:28:37','$2y$12$rxl44mS28GObw6.OgdNSK.MMbyIV7lBXEBYF23qT.IY9/65jKYcO.',NULL,NULL,NULL,NULL,'2026-04-20 13:28:38','2026-04-20 13:28:38'),(4,'Jordi Puig','jordi.puig@example.com','+34600777888',0,NULL,'$2y$12$1yxIKr3OTNmwP9r9rqS1Y.hT3jr68fc/9.JRniU7dD0mEFcS6C3Tm',NULL,NULL,NULL,NULL,'2026-04-20 13:28:38','2026-04-20 13:28:38'),(5,'Marta Soler','marta.soler@example.com','+34600999000',1,'2026-04-20 13:28:37','$2y$12$aGT2A4Anq8E4fnb.8Z1eauZ0Wdz9J55G8AbMd8hXss6QxqZrLR7Mm',NULL,NULL,NULL,NULL,'2026-04-20 13:28:38','2026-04-20 13:28:38'),(6,'Pau Roca','pau.roca@example.com','+34611000101',0,'2026-04-20 13:28:37','$2y$12$WOzIj.qQa4O37ummgCFLE.9rhKsDnIo53dtHXKUEp4P.qaPQJ.at2',NULL,NULL,NULL,NULL,'2026-04-20 13:28:38','2026-04-20 13:28:38'),(7,'Núria Vidal','nuria.vidal@example.com','+34611000102',0,'2026-04-20 13:28:37','$2y$12$H22wgEEcOxTHGkgx94M5TetXNWjggK5XKKH4ECgKO2PjVkV2ScFoW',NULL,NULL,NULL,NULL,'2026-04-20 13:28:38','2026-04-20 13:28:38'),(8,'Oriol Serra','oriol.serra@example.com','+34611000103',0,'2026-04-20 13:28:37','$2y$12$5ZiuEOAtl.v3z4gsy.tbHOA6j3OdBdX4sPOePhZQUrQMVD598HSJS',NULL,NULL,NULL,NULL,'2026-04-20 13:28:38','2026-04-20 13:28:38'),(9,'Clàudia Ferrer','claudia.ferrer@example.com','+34611000104',0,'2026-04-20 13:28:37','$2y$12$0Z/uSzMuGE2SWad09iRuIuZkHqg3aOR8M7vjqXpBQF1NZ.V7J5J7u',NULL,NULL,NULL,NULL,'2026-04-20 13:28:39','2026-04-20 13:28:39'),(10,'David Castells','david.castells@example.com','+34611000105',0,'2026-04-20 13:28:37','$2y$12$flD0tRsV7EknSAEwpMeBGuatFEPurxlIzuCM3cmwb5C0Bx97pL.ha',NULL,NULL,NULL,NULL,'2026-04-20 13:28:39','2026-04-20 13:28:39'),(11,'Aina Casas','aina.casas@example.com','+34611000106',0,'2026-04-20 13:28:37','$2y$12$rZV5nC46X/NpzY6BA7WAXuuqthptSohbpEYsRqZo2CJnaAC2oq3o2',NULL,NULL,NULL,NULL,'2026-04-20 13:28:39','2026-04-20 13:28:39'),(12,'Roger Batlle','roger.batlle@example.com','+34611000107',0,'2026-04-20 13:28:37','$2y$12$veQ/BGS9wzM5LjCSbg.D9.ZaOlc8/11fEuVOqBVq7iBEPFqpikuPu',NULL,NULL,NULL,NULL,'2026-04-20 13:28:39','2026-04-20 13:28:39'),(13,'Helena Pons','helena.pons@example.com','+34611000108',0,'2026-04-20 13:28:37','$2y$12$zpjbKlj4NlK/Cdu6NjieIu61JaICUaUIeyUqHim2I2nw4IBEZNR82',NULL,NULL,NULL,NULL,'2026-04-20 13:28:39','2026-04-20 13:28:39'),(14,'Sergi Miró','sergi.miro@example.com','+34611000109',0,'2026-04-20 13:28:37','$2y$12$3w7fTk4gyzDBTRW3BHSVKuNPSJPdzheyhwSvkEXCK0b4hjPaQfiGO',NULL,NULL,NULL,NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(15,'Noa Prats','noa.prats@example.com','+34611000110',0,'2026-04-20 13:28:37','$2y$12$HpCvwC4yaTHAgVEiS38YReHztNjVWpb7uPcUXgjYsVDzTHaDoaAXe',NULL,NULL,NULL,NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(16,'Xavi Costa','xavi.costa@example.com','+34611000111',0,'2026-04-20 13:28:37','$2y$12$jkZudMHoZqXwwSy29k4Uv./H0P04f1l92h3E0n4qwOuWLpx54IzLi',NULL,NULL,NULL,NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40'),(17,'Ivet Solé','ivet.sole@example.com','+34611000112',0,NULL,'$2y$12$1J.sfOyI0fNP73HO2bbRVu6HXVHd7xS0rOeqDSHUXuJbFNkO0m4JS',NULL,NULL,NULL,NULL,'2026-04-20 13:28:40','2026-04-20 13:28:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-20 17:32:50
