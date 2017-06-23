-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2017 at 02:55 PM
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
-- Table structure for table `query`
--

CREATE TABLE IF NOT EXISTS `query` (
  `query_id` int(3) NOT NULL AUTO_INCREMENT,
  `query_desc` varchar(250) NOT NULL,
  PRIMARY KEY (`query_id`),
  FULLTEXT KEY `query_desc` (`query_desc`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=72 ;

--
-- Dumping data for table `query`
--

INSERT INTO `query` (`query_id`, `query_desc`) VALUES
(1, 'A question about neural net error computation'),
(2, 'Build a Recurrent Neural Net'),
(3, 'Calculating gradient descent for logistic regression'),
(4, 'Could someone please help explain the Cost Function'),
(5, 'Deep Learning and Unsupervised Feature Learning'),
(6, 'Feature Scaling'),
(7, 'k-means clustering for image compression'),
(8, 'Meaning of resulting features after dimensionality reduction'),
(9, 'Simplified Cost Function for Logistic Regression'),
(10, 'Using discrete features for Linear Regression'),
(11, 'vectorization of sigmoid function '),
(12, 'common tools available for machine learning'),
(13, 'Feature selection algorithms'),
(14, 'how SVM works'),
(15, 'Precision and recall in data mining'),
(16, 'What are the basic workflow for a data mining operation'),
(17, 'what are the different ways to create value from my data'),
(18, 'What is a Decision Tree'),
(19, 'What is Data Mining'),
(20, 'what is the difference between logistic regression and linear regression'),
(21, 'What is an intuitive explanation of overfitting'),
(22, 'How can I learn data analysis from scratch'),
(23, 'What are some well-known clustering methods'),
(24, 'What are the advantages of functional data analysis'),
(25, 'How do I choose similarity algorithms in a recommender system'),
(26, 'What is the difference between data collection and data analysis'),
(27, 'How does cluster analysis work'),
(28, 'How can I avoid overfitting'),
(29, 'Is it possible to use reinforcement learning to solve any supervised or unsupervised problem'),
(30, 'Principal Component Analysis What is the intuitive meaning of a covariance matrix'),
(31, 'What is a primal and a dual problem in support vector machines'),
(32, 'What is the difference between supervised and unsupervised learning algorithms'),
(33, 'Which clustering algorithms can be run on a dataset of 3 million samples'),
(34, 'How does one calculate the expected value of a data set'),
(35, 'What is a good algorithm to extract relevant n-grams from multiple texts'),
(36, 'What is a good way to know the trending of a set of data'),
(37, 'What is data mining'),
(38, 'Which statistical tool is best for data mining'),
(39, 'Why is data mining important'),
(40, 'What is an explanation of web data mining'),
(41, 'What are the many different types of big data'),
(42, 'I’m a beginner in data science and now need to implement a gradient decent algorithm. From where should I start'),
(43, 'What are the prominent alternatives to the vector space model for representing and modeling text data'),
(44, 'How can I cluster data with various dimensions'),
(45, 'What are the various data mining techniques for fraud detection'),
(46, 'How can I calculate precision and recall in R for a dataset with books and ratings'),
(47, 'What is the purpose of a partitioned data set'),
(48, 'What is the data and method of ethics'),
(49, 'What are the methods of accessing data'),
(50, 'As a beginner in Natural Language processing, from where should I start '),
(51, 'Explain VC dimension and shattering in lucid Way'),
(52, 'Natural Language Processing: What is the best approach for text categorization'),
(53, 'What are some limitations of a Bayesian approach'),
(54, 'What are the basic concepts of machine learning'),
(55, 'What are the most common data normalization methods used in machine learning '),
(56, 'What is hypothesis in machine learning'),
(57, 'What is the best algorithms for privacy preserving data set'),
(58, 'What is a cost function'),
(59, 'What the least square regression'),
(60, 'What is regularization'),
(61, 'How to avoid overfitting'),
(62, 'How to compute folds for cross validation'),
(63, 'What does solving in the dual form mean'),
(64, 'What is parameter sharing in convolutional networks'),
(65, 'How to train a boltzmann machine'),
(66, 'What is Gibbs sampling'),
(67, 'How to do topic modelling without sampling'),
(68, 'What is the kernel trick'),
(69, 'Clustering in machine learning'),
(70, 'dealing with missing data in machine learning');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
