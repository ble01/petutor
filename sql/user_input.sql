-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2017 at 02:57 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tutor`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_input`
--

CREATE TABLE IF NOT EXISTS `user_input` (
  `user_id` varchar(50) NOT NULL COMMENT 'ID of each user, same as in survey table',
  `query_id` int(5) NOT NULL COMMENT 'ID of current query being evaluated',
  `query_desc` varchar(250) NOT NULL COMMENT 'desc of original query from learner',
  `refined_query` varchar(800) NOT NULL COMMENT 'refined query',
  `docID` varchar(7) NOT NULL COMMENT 'ID of current document being rated',
  `rating` int(5) NOT NULL COMMENT 'star rating given to each document being rated',
  `displayIndex` int(5) NOT NULL COMMENT 'The index which doc is displayed as',
  UNIQUE KEY `user_id` (`user_id`,`query_id`,`docID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table holds the user ratings for documents and respective queries evaluated';

--
-- Dumping data for table `user_input`
--

INSERT INTO `user_input` (`user_id`, `query_id`, `query_desc`, `refined_query`, `docID`, `rating`, `displayIndex`) VALUES
('daf2a34a-f323-4317-8def-799ffbbd3e15', 20, 'what is the difference between logistic regression and linear regression', 'what is the difference between logistic regression and linear regression regression predictor logistic formula linear prior posterior variable distribution squares variables likelihood model odds response conjugate explanatory bayesian predictors logit models inversegamma evidence least effect                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ', 'D177', 4, 2),
('f40a8364-34a6-496a-ad3b-c9d14d005073', 39, 'Why is data mining important', 'Why is data mining important mining web text content analysis usage customer documents analytics analysts business data site exploratory information users messages unstructured document sources view quantitative law opinion technology                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ', 'D374', 4, 3),
('f40a8364-34a6-496a-ad3b-c9d14d005073', 39, 'Why is data mining important', 'Why is data mining important mining web text content analysis usage customer documents analytics analysts business data site exploratory information users messages unstructured document sources view quantitative law opinion technology                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ', 'D386', 5, 1),
('f40a8364-34a6-496a-ad3b-c9d14d005073', 39, 'Why is data mining important', 'Why is data mining important mining web text content analysis usage customer documents analytics analysts business data site exploratory information users messages unstructured document sources view quantitative law opinion technology                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ', 'D390', 3, 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
