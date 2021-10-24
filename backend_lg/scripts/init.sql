create database if not exists test;

use test;

CREATE TABLE `pessoa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(120) NOT NULL,
  `nome` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `projeto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_termino` date NOT NULL,
  `risco` int NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `pessoas` (
  `pessoa_id` int NOT NULL,
  `projeto` int NOT NULL,
  PRIMARY KEY (`pessoa_id`,`projeto`),
  KEY `projeto` (`projeto`),
  CONSTRAINT `pessoas_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`),
  CONSTRAINT `pessoas_ibfk_2` FOREIGN KEY (`projeto`) REFERENCES `projeto` (`id`)
);


