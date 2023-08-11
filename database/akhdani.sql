/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.32 : Database - akhdani
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`akhdani` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `akhdani`;

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `longitude` varchar(25) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `island` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `city` */

insert  into `city`(`id`,`label`,`latitude`,`longitude`,`province`,`country`,`island`) values 
(1,'Pekanbaru','0.508581','101.447737','Riau','Indonesia','Sumatra'),
(3,'Jayapura','-2.591603','140.669006','Papua','Indonesia','Papua'),
(4,'Kepulauan Yapen','-1.75223','136.204956','Papua','Indonesia','Papua');

/*Table structure for table `perdin` */

DROP TABLE IF EXISTS `perdin`;

CREATE TABLE `perdin` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `currency` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `goDate` date DEFAULT NULL,
  `returnDate` date DEFAULT NULL,
  `originCity` json DEFAULT NULL,
  `destinationCity` json DEFAULT NULL,
  `distance` int DEFAULT NULL,
  `pocketMoney` int DEFAULT NULL,
  `status` enum('approve','reject','submit') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'submit',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `perdin` */

insert  into `perdin`(`id`,`currency`,`goDate`,`returnDate`,`originCity`,`destinationCity`,`distance`,`pocketMoney`,`status`,`description`,`createdAt`,`updatedAt`,`userId`) values 
('00b05fc0-cc70-4807-b53d-aed4927785eb','id-IDR','2023-08-11','2023-08-12','{\"id\": 1, \"label\": \"Pekanbaru\", \"island\": \"Sumatra\", \"country\": \"Indonesia\", \"latitude\": \"0.508581\", \"province\": \"Riau\", \"longitude\": \"101.447737\"}','{\"id\": 3, \"label\": \"Jayapura\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": \"-2.591603\", \"province\": \"Papua\", \"longitude\": \"140.669006\"}',4373,299998,'submit','asdasda','2023-08-11 07:43:04','2023-08-11 07:43:04','4c198e5d-edf7-433a-928e-5d4a8a2001e0'),
('3070f122-244b-4fbe-99f2-885f70e52bbd','id-IDR','2023-08-11','2023-08-17','{\"id\": 3, \"label\": \"Kepulauan Yapen\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -1.75223, \"province\": \"Papua\", \"longitude\": 136.204956}','{\"id\": 1, \"label\": \"Jayapura\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -2.591603, \"province\": \"Papua\", \"longitude\": 140.669006}',505,1200000,'approve','ASas','2023-08-11 07:30:26','2023-08-11 07:33:07','4b7fb076-799f-4c87-ab37-c6ef413c6b04'),
('6068b4eb-481f-4c93-85cc-b4f6449e3663','id-IDR','2023-08-11','2023-08-12','{\"id\": 1, \"label\": \"Jayapura\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -2.591603, \"province\": \"Papua\", \"longitude\": 140.669006}','{\"id\": 3, \"label\": \"Kepulauan Yapen\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -1.75223, \"province\": \"Papua\", \"longitude\": 136.204956}',505,200000,'submit','sdasda','2023-08-11 07:32:28','2023-08-11 07:32:28','4b7fb076-799f-4c87-ab37-c6ef413c6b04'),
('85582e5e-9bf9-4442-91e0-1bcc95a3cf99','id-IDR','2023-08-11','2023-08-12','{\"id\": 1, \"label\": \"Jayapura\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -2.591603, \"province\": \"Papua\", \"longitude\": 140.669006}','{\"id\": 3, \"label\": \"Kepulauan Yapen\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -1.75223, \"province\": \"Papua\", \"longitude\": 136.204956}',505,200000,'submit','zczxc','2023-08-11 07:32:04','2023-08-11 07:32:04','4b7fb076-799f-4c87-ab37-c6ef413c6b04'),
('8c62c4f6-dcff-4351-a2e2-3493a1cabed9','id-IDR','2023-08-11','2023-08-15','{\"id\": 3, \"label\": \"Jayapura\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": \"-2.591603\", \"province\": \"Papua\", \"longitude\": \"140.669006\"}','{\"id\": 4, \"label\": \"Kepulauan Yapen\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": \"-1.75223\", \"province\": \"Papua\", \"longitude\": \"136.204956\"}',505,799998,'submit','asdasd','2023-08-11 07:43:15','2023-08-11 07:43:15','4c198e5d-edf7-433a-928e-5d4a8a2001e0'),
('d9d0fdbd-4f3e-445d-8678-3b8280a60b57','id-IDR','2023-08-11','2023-08-31','{\"id\": 1, \"label\": \"Jayapura\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -2.591603, \"province\": \"Papua\", \"longitude\": 140.669006}','{\"id\": 3, \"label\": \"Kepulauan Yapen\", \"island\": \"Papua\", \"country\": \"Indonesia\", \"latitude\": -1.75223, \"province\": \"Papua\", \"longitude\": 136.204956}',505,4000000,'submit','keterangan','2023-08-11 07:25:56','2023-08-11 07:25:56','4b7fb076-799f-4c87-ab37-c6ef413c6b04');

/*Table structure for table `pocket_money` */

DROP TABLE IF EXISTS `pocket_money`;

CREATE TABLE `pocket_money` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('in_province','in_island','in_country','out_country') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `distance` int DEFAULT NULL,
  `nominal` int DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pocket_money` */

insert  into `pocket_money`(`id`,`type`,`distance`,`nominal`,`currency`,`createdAt`,`updatedAt`) values 
('58e95f1d-6136-490b-8671-fa96ba99d4fa','in_province',61,200000,'id-IDR','2023-08-09 21:45:14','2023-08-10 09:58:33'),
('750fdf4b-525d-45e0-b2fe-6db61a0ef32c','out_country',0,50,'us-USD','2023-08-09 22:05:35','2023-08-09 22:05:35'),
('a30d7d96-401d-4f6e-b390-7d3538723aa0','in_island',61,250000,'id-IDR','2023-08-09 22:05:22','2023-08-10 10:02:27'),
('b17776fb-e94f-4dcb-9796-330e7f7b979d','in_country',61,300000,'id-IDR','2023-08-09 21:30:15','2023-08-10 10:02:36');

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `label` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `settings` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(10) COLLATE utf8mb4_general_ci DEFAULT 'employee',
  `status` tinyint(1) DEFAULT '1',
  `token` text COLLATE utf8mb4_general_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`username`,`password`,`role`,`status`,`token`,`createdAt`,`updatedAt`) values 
('4b7fb076-799f-4c87-ab37-c6ef413c6b04','Admin Utama','admin','$2b$10$ThAqfJv.Vt/efzqbq0RobufzXJm6xJviwauE0mJYRs30YvpSCCg56','Admin',1,NULL,'2023-08-10 10:39:12','2023-08-10 10:39:12'),
('4c198e5d-edf7-433a-928e-5d4a8a2001e0','Pegawai','pegawai','$2b$10$xcUEEt/lVPzUsLFWd9DDe.h54hrg4ad.5DK7SjSCMdIvT8.CxzPt.','employee',1,NULL,'2023-08-10 11:41:47','2023-08-10 11:41:47'),
('b995795d-a77a-4edc-a079-a8f13935f9ea','Pegawai 2','pegawai2','$2b$10$7G16zgoP3INb37oqFzE6weLuArrOgjQLV5xAJg.Y1orkUWk6ik0/m','employee',1,NULL,'2023-08-10 13:40:12','2023-08-10 13:40:12');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
