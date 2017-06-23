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
-- Table structure for table `result`
--

CREATE TABLE IF NOT EXISTS `result` (
  `result_id` int(3) NOT NULL AUTO_INCREMENT,
  `method_id` int(3) NOT NULL,
  `query_id` int(3) NOT NULL,
  `docID` varchar(10) NOT NULL,
  `rank` int(3) NOT NULL,
  PRIMARY KEY (`result_id`),
  UNIQUE KEY `method_id` (`method_id`,`query_id`,`docID`),
  KEY `query_id` (`query_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=773 ;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`result_id`, `method_id`, `query_id`, `docID`, `rank`) VALUES
(33, 1, 3, 'D409', 1),
(34, 1, 3, 'D177', 2),
(35, 1, 3, 'D292', 3),
(36, 1, 3, 'D342', 4),
(37, 1, 3, 'D330', 5),
(38, 1, 2, 'D69', 3),
(39, 1, 2, 'D401', 2),
(40, 1, 2, 'D76', 4),
(41, 1, 2, 'D74', 5),
(42, 1, 2, 'D225', 1),
(43, 1, 1, 'D401', 1),
(44, 1, 1, 'D103', 2),
(45, 1, 1, 'D335', 3),
(46, 1, 1, 'D69', 4),
(47, 1, 1, 'D74', 5),
(63, 1, 5, 'D401', 1),
(64, 1, 5, 'D66', 2),
(65, 1, 5, 'D76', 3),
(66, 1, 5, 'D75', 4),
(67, 1, 5, 'D69', 5),
(71, 1, 4, 'D401', 1),
(74, 1, 4, 'D335', 2),
(75, 1, 4, 'D345', 4),
(76, 1, 4, 'D103', 3),
(77, 1, 4, 'D338', 5),
(78, 1, 11, 'D401', 1),
(79, 1, 11, 'D345', 2),
(80, 1, 11, 'D140', 3),
(81, 1, 11, 'D335', 4),
(82, 1, 11, 'D338', 5),
(83, 1, 7, 'D319', 1),
(84, 1, 7, 'D190', 2),
(85, 1, 7, 'D31', 4),
(86, 1, 7, 'D170', 5),
(87, 1, 7, 'D23', 3),
(88, 1, 6, 'D147', 1),
(89, 1, 6, 'D43', 2),
(90, 1, 6, 'D173', 3),
(91, 1, 6, 'D19', 4),
(92, 1, 6, 'D385', 5),
(93, 1, 9, 'D177', 1),
(94, 1, 9, 'D292', 2),
(95, 1, 9, 'D119', 3),
(96, 1, 9, 'D100', 4),
(97, 1, 9, 'D330', 5),
(98, 1, 10, 'D100', 1),
(99, 1, 10, 'D177', 2),
(100, 1, 10, 'D119', 3),
(101, 1, 10, 'D291', 4),
(102, 1, 10, 'D292', 5),
(103, 1, 15, 'D390', 1),
(104, 1, 15, 'D121', 2),
(105, 1, 15, 'D15', 3),
(106, 1, 15, 'D178', 4),
(107, 1, 15, 'D386', 5),
(108, 1, 14, 'D440', 1),
(109, 1, 14, 'D343', 2),
(110, 1, 14, 'D107', 5),
(111, 1, 14, 'D276', 4),
(112, 1, 14, 'D496', 3),
(113, 1, 12, 'D359', 2),
(114, 1, 12, 'D330', 3),
(115, 1, 12, 'D345', 4),
(116, 1, 12, 'D195', 5),
(117, 1, 12, 'D277', 1),
(118, 1, 8, 'D351', 1),
(119, 1, 8, 'D183', 2),
(120, 1, 8, 'D395', 3),
(121, 1, 8, 'D192', 5),
(122, 1, 13, 'D173', 1),
(123, 1, 8, 'D324', 4),
(124, 1, 13, 'D498', 4),
(125, 1, 13, 'D325', 2),
(126, 1, 13, 'D30', 3),
(127, 1, 16, 'D390', 2),
(128, 1, 13, 'D314', 5),
(129, 1, 16, 'D386', 1),
(130, 1, 16, 'D374', 3),
(131, 1, 16, 'D178', 4),
(132, 1, 21, 'D100', 5),
(133, 1, 21, 'D254', 1),
(134, 1, 21, 'D49', 2),
(135, 1, 21, 'D331', 4),
(136, 1, 21, 'D177', 3),
(137, 1, 16, 'D373', 5),
(138, 1, 23, 'D469', 1),
(139, 1, 23, 'D319', 2),
(140, 1, 23, 'D190', 3),
(141, 1, 23, 'D23', 4),
(142, 1, 23, 'D29', 5),
(143, 1, 19, 'D386', 1),
(144, 1, 19, 'D373', 5),
(145, 1, 19, 'D390', 2),
(146, 1, 19, 'D178', 4),
(147, 1, 18, 'D323', 1),
(148, 1, 19, 'D374', 3),
(149, 1, 18, 'D429', 2),
(150, 1, 18, 'D479', 3),
(151, 1, 22, 'D149', 1),
(152, 1, 22, 'D386', 2),
(153, 1, 18, 'D52', 4),
(154, 1, 18, 'D255', 5),
(155, 1, 22, 'D389', 3),
(156, 1, 22, 'D384', 5),
(157, 1, 22, 'D111', 4),
(158, 1, 25, 'D200', 2),
(159, 1, 25, 'D472', 3),
(160, 1, 25, 'D470', 1),
(161, 1, 25, 'D42', 4),
(162, 1, 17, 'D7', 1),
(163, 1, 25, 'D15', 5),
(164, 1, 17, 'D386', 3),
(165, 1, 17, 'D285', 4),
(166, 1, 17, 'D3', 2),
(167, 1, 17, 'D372', 5),
(168, 1, 26, 'D386', 1),
(169, 1, 26, 'D111', 3),
(170, 1, 26, 'D389', 2),
(171, 1, 26, 'D124', 4),
(172, 1, 26, 'D116', 5),
(173, 1, 27, 'D4', 1),
(174, 1, 27, 'D3', 2),
(175, 1, 27, 'D29', 3),
(176, 1, 27, 'D428', 5),
(177, 1, 27, 'D469', 4),
(178, 1, 24, 'D386', 1),
(179, 1, 24, 'D389', 2),
(180, 1, 24, 'D380', 3),
(181, 1, 24, 'D111', 4),
(182, 1, 24, 'D384', 5),
(183, 1, 28, 'D49', 1),
(184, 1, 28, 'D101', 2),
(185, 1, 28, 'D102', 3),
(186, 1, 28, 'D100', 5),
(187, 1, 28, 'D177', 4),
(188, 1, 29, 'D65', 1),
(189, 1, 29, 'D362', 3),
(190, 1, 29, 'D266', 2),
(191, 1, 29, 'D270', 5),
(192, 1, 29, 'D104', 4),
(193, 1, 30, 'D192', 1),
(194, 1, 30, 'D351', 4),
(195, 1, 30, 'D481', 3),
(196, 1, 30, 'D324', 2),
(197, 1, 31, 'D440', 1),
(198, 1, 30, 'D395', 5),
(199, 1, 31, 'D343', 2),
(200, 1, 31, 'D107', 5),
(201, 1, 31, 'D352', 4),
(202, 1, 31, 'D496', 3),
(203, 1, 20, 'D119', 3),
(204, 1, 20, 'D292', 2),
(205, 1, 20, 'D177', 1),
(206, 1, 33, 'D469', 1),
(207, 1, 20, 'D291', 5),
(208, 1, 20, 'D100', 4),
(209, 1, 33, 'D29', 3),
(210, 1, 33, 'D126', 2),
(211, 1, 33, 'D319', 4),
(212, 1, 33, 'D3', 5),
(213, 1, 34, 'D429', 2),
(214, 1, 34, 'D323', 1),
(215, 1, 34, 'D94', 5),
(216, 1, 34, 'D52', 3),
(217, 1, 34, 'D169', 4),
(218, 1, 37, 'D386', 1),
(219, 1, 37, 'D390', 2),
(220, 1, 37, 'D374', 3),
(221, 1, 37, 'D178', 4),
(222, 1, 37, 'D373', 5),
(233, 1, 36, 'D301', 3),
(234, 1, 36, 'D149', 2),
(235, 1, 36, 'D386', 1),
(236, 1, 36, 'D375', 4),
(237, 1, 36, 'D382', 5),
(243, 1, 35, 'D10', 1),
(244, 1, 35, 'D311', 3),
(245, 1, 35, 'D193', 4),
(246, 1, 35, 'D194', 2),
(247, 1, 35, 'D131', 5),
(248, 1, 41, 'D469', 1),
(249, 1, 41, 'D386', 2),
(250, 1, 41, 'D29', 4),
(251, 1, 41, 'D389', 3),
(252, 1, 41, 'D126', 5),
(253, 1, 47, 'D7', 1),
(254, 1, 47, 'D297', 2),
(255, 1, 47, 'D285', 3),
(256, 1, 47, 'D298', 4),
(257, 1, 47, 'D386', 5),
(258, 1, 40, 'D390', 1),
(259, 1, 40, 'D386', 3),
(260, 1, 40, 'D374', 4),
(261, 1, 40, 'D15', 2),
(262, 1, 40, 'D178', 5),
(263, 1, 38, 'D386', 1),
(264, 1, 38, 'D390', 2),
(265, 1, 38, 'D13', 4),
(266, 1, 38, 'D389', 3),
(267, 1, 38, 'D374', 5),
(268, 1, 43, 'D351', 1),
(269, 1, 43, 'D395', 2),
(270, 1, 43, 'D13', 4),
(271, 1, 43, 'D474', 3),
(272, 1, 43, 'D280', 5),
(273, 1, 42, 'D409', 1),
(274, 1, 42, 'D342', 2),
(275, 1, 42, 'D402', 3),
(276, 1, 42, 'D398', 4),
(277, 1, 42, 'D337', 5),
(278, 1, 49, 'D297', 2),
(279, 1, 49, 'D7', 1),
(280, 1, 49, 'D285', 3),
(281, 1, 49, 'D298', 4),
(282, 1, 49, 'D386', 5),
(283, 1, 53, 'D125', 1),
(284, 1, 53, 'D393', 2),
(285, 1, 53, 'D392', 3),
(286, 1, 53, 'D239', 5),
(287, 1, 53, 'D102', 4),
(288, 1, 48, 'D284', 2),
(289, 1, 48, 'D3', 3),
(290, 1, 48, 'D7', 1),
(291, 1, 48, 'D386', 4),
(292, 1, 48, 'D382', 5),
(293, 1, 58, 'D401', 1),
(294, 1, 58, 'D335', 2),
(295, 1, 54, 'D260', 1),
(296, 1, 58, 'D338', 5),
(297, 1, 58, 'D103', 3),
(298, 1, 58, 'D61', 4),
(299, 1, 54, 'D36', 3),
(300, 1, 54, 'D109', 2),
(301, 1, 54, 'D359', 5),
(302, 1, 54, 'D277', 4),
(303, 1, 52, 'D178', 1),
(304, 1, 52, 'D71', 2),
(305, 1, 52, 'D390', 3),
(306, 1, 52, 'D13', 4),
(307, 1, 52, 'D315', 5),
(308, 1, 39, 'D390', 2),
(309, 1, 39, 'D374', 3),
(310, 1, 39, 'D386', 1),
(311, 1, 39, 'D178', 4),
(312, 1, 39, 'D373', 5),
(313, 1, 57, 'D469', 1),
(314, 1, 57, 'D18', 2),
(315, 1, 57, 'D24', 3),
(316, 1, 57, 'D29', 4),
(317, 1, 57, 'D386', 5),
(318, 1, 51, 'D346', 1),
(319, 1, 51, 'D355', 2),
(320, 1, 51, 'D340', 3),
(321, 1, 51, 'D345', 4),
(322, 1, 51, 'D338', 5),
(323, 1, 63, 'D440', 1),
(324, 1, 63, 'D343', 2),
(325, 1, 63, 'D395', 3),
(326, 1, 63, 'D496', 4),
(327, 1, 63, 'D409', 5),
(328, 1, 50, 'D71', 1),
(329, 1, 50, 'D74', 2),
(330, 1, 50, 'D312', 4),
(331, 1, 50, 'D316', 3),
(332, 1, 50, 'D272', 5),
(333, 1, 62, 'D331', 1),
(334, 1, 62, 'D92', 2),
(335, 1, 62, 'D101', 4),
(336, 1, 62, 'D100', 3),
(337, 1, 62, 'D104', 5),
(338, 1, 44, 'D469', 2),
(339, 1, 44, 'D3', 1),
(340, 1, 44, 'D4', 3),
(341, 1, 44, 'D29', 5),
(342, 1, 44, 'D126', 4),
(343, 1, 32, 'D362', 2),
(344, 1, 32, 'D361', 4),
(345, 1, 32, 'D65', 1),
(346, 1, 32, 'D104', 3),
(347, 1, 45, 'D167', 1),
(348, 1, 32, 'D395', 5),
(349, 1, 45, 'D17', 5),
(350, 1, 45, 'D16', 4),
(351, 1, 45, 'D25', 2),
(352, 1, 45, 'D377', 3),
(353, 1, 46, 'D470', 2),
(354, 1, 46, 'D200', 1),
(355, 1, 46, 'D121', 3),
(356, 1, 46, 'D472', 4),
(357, 1, 46, 'D15', 5),
(358, 1, 55, 'D7', 1),
(359, 1, 55, 'D298', 2),
(360, 1, 55, 'D285', 3),
(361, 1, 61, 'D49', 1),
(362, 1, 55, 'D173', 5),
(363, 1, 61, 'D177', 2),
(364, 1, 55, 'D297', 4),
(365, 1, 68, 'D57', 1),
(366, 1, 61, 'D331', 5),
(367, 1, 61, 'D100', 3),
(368, 1, 61, 'D101', 4),
(369, 1, 68, 'D398', 5),
(370, 1, 68, 'D487', 3),
(371, 1, 56, 'D330', 2),
(372, 1, 56, 'D277', 1),
(373, 1, 68, 'D328', 2),
(374, 1, 68, 'D352', 4),
(375, 1, 56, 'D359', 3),
(376, 1, 56, 'D261', 4),
(377, 1, 56, 'D337', 5),
(378, 1, 59, 'D177', 1),
(379, 1, 59, 'D119', 2),
(380, 1, 59, 'D292', 4),
(381, 1, 67, 'D240', 1),
(382, 1, 59, 'D100', 3),
(383, 1, 59, 'D330', 5),
(384, 1, 67, 'D13', 2),
(385, 1, 67, 'D395', 5),
(386, 1, 67, 'D113', 3),
(387, 1, 67, 'D348', 4),
(388, 1, 69, 'D31', 1),
(389, 1, 69, 'D494', 3),
(390, 1, 69, 'D319', 2),
(391, 1, 69, 'D190', 4),
(392, 1, 66, 'D400', 1),
(393, 1, 69, 'D23', 5),
(394, 1, 66, 'D102', 2),
(395, 1, 66, 'D237', 4),
(396, 1, 66, 'D221', 3),
(397, 1, 66, 'D392', 5),
(398, 1, 60, 'D341', 2),
(399, 1, 60, 'D49', 1),
(400, 1, 60, 'D93', 3),
(401, 1, 60, 'D398', 4),
(402, 1, 60, 'D402', 5),
(403, 1, 65, 'D204', 1),
(404, 1, 65, 'D277', 2),
(405, 1, 65, 'D107', 3),
(406, 1, 65, 'D343', 4),
(407, 1, 65, 'D440', 5),
(408, 1, 64, 'D401', 1),
(409, 1, 64, 'D76', 2),
(410, 1, 64, 'D335', 5),
(411, 1, 70, 'D7', 1),
(412, 1, 64, 'D103', 4),
(413, 1, 64, 'D75', 3),
(414, 1, 70, 'D285', 2),
(415, 1, 70, 'D386', 3),
(416, 1, 70, 'D359', 4),
(417, 1, 70, 'D297', 5),
(418, 2, 6, 'D147', 1),
(419, 2, 6, 'D173', 3),
(420, 2, 7, 'D320', 1),
(421, 2, 6, 'D385', 2),
(422, 2, 6, 'D325', 4),
(423, 2, 6, 'D60', 5),
(424, 2, 7, 'D21', 2),
(425, 2, 7, 'D319', 3),
(426, 2, 7, 'D190', 5),
(427, 2, 12, 'D312', 2),
(428, 2, 12, 'D359', 1),
(429, 2, 7, 'D290', 4),
(430, 2, 12, 'D195', 3),
(431, 2, 12, 'D165', 5),
(432, 2, 8, 'D183', 1),
(433, 2, 8, 'D395', 4),
(434, 2, 8, 'D192', 3),
(435, 2, 8, 'D324', 2),
(436, 2, 12, 'D275', 4),
(437, 2, 8, 'D481', 5),
(438, 2, 1, 'D335', 4),
(439, 2, 1, 'D229', 5),
(440, 2, 1, 'D61', 1),
(441, 2, 1, 'D103', 2),
(442, 2, 1, 'D313', 3),
(443, 2, 10, 'D100', 1),
(444, 2, 10, 'D177', 3),
(445, 2, 10, 'D291', 4),
(446, 2, 10, 'D119', 5),
(447, 2, 10, 'D10', 2),
(448, 2, 5, 'D401', 1),
(449, 2, 5, 'D66', 2),
(450, 2, 5, 'D75', 3),
(451, 2, 2, 'D61', 1),
(452, 2, 2, 'D313', 2),
(453, 2, 5, 'D76', 4),
(454, 2, 5, 'D69', 5),
(455, 2, 2, 'D293', 3),
(456, 2, 2, 'D69', 4),
(457, 2, 3, 'D292', 1),
(458, 2, 2, 'D34', 5),
(459, 2, 3, 'D342', 3),
(460, 2, 3, 'D409', 2),
(461, 2, 3, 'D177', 4),
(462, 2, 3, 'D100', 5),
(463, 2, 9, 'D292', 1),
(464, 2, 9, 'D177', 2),
(465, 2, 9, 'D100', 4),
(466, 2, 9, 'D119', 3),
(467, 2, 9, 'D49', 5),
(468, 2, 11, 'D335', 1),
(469, 2, 11, 'D44', 2),
(470, 2, 11, 'D103', 5),
(471, 2, 11, 'D246', 3),
(472, 2, 22, 'D187', 1),
(473, 2, 11, 'D104', 4),
(474, 2, 22, 'D4', 2),
(475, 2, 22, 'D478', 3),
(476, 2, 22, 'D111', 4),
(477, 2, 22, 'D137', 5),
(478, 2, 20, 'D292', 1),
(479, 2, 20, 'D177', 2),
(480, 2, 20, 'D291', 3),
(481, 2, 20, 'D49', 4),
(482, 2, 24, 'D447', 1),
(483, 2, 20, 'D100', 5),
(484, 2, 24, 'D449', 2),
(485, 2, 24, 'D111', 3),
(486, 2, 24, 'D17', 4),
(487, 2, 24, 'D375', 5),
(488, 2, 13, 'D173', 1),
(489, 2, 13, 'D325', 2),
(490, 2, 13, 'D122', 4),
(491, 2, 13, 'D30', 3),
(492, 2, 13, 'D331', 5),
(493, 2, 19, 'D370', 1),
(494, 2, 23, 'D319', 1),
(495, 2, 19, 'D11', 3),
(496, 2, 19, 'D284', 2),
(497, 2, 19, 'D371', 4),
(498, 2, 19, 'D191', 5),
(499, 2, 23, 'D190', 2),
(500, 2, 23, 'D234', 3),
(501, 2, 23, 'D170', 4),
(502, 2, 23, 'D33', 5),
(503, 2, 17, 'D473', 1),
(504, 2, 17, 'D386', 2),
(505, 2, 17, 'D296', 4),
(506, 2, 17, 'D285', 3),
(507, 2, 15, 'D416', 1),
(508, 2, 15, 'D191', 2),
(509, 2, 15, 'D390', 3),
(510, 2, 17, 'D417', 5),
(511, 2, 15, 'D377', 4),
(512, 2, 14, 'D276', 1),
(513, 2, 15, 'D14', 5),
(514, 2, 14, 'D44', 2),
(515, 2, 14, 'D440', 3),
(516, 2, 14, 'D496', 4),
(517, 2, 16, 'D191', 1),
(518, 2, 14, 'D343', 5),
(519, 2, 16, 'D11', 2),
(520, 2, 16, 'D371', 4),
(521, 2, 16, 'D298', 5),
(522, 2, 16, 'D386', 3),
(523, 2, 18, 'D479', 1),
(524, 2, 18, 'D429', 3),
(525, 2, 18, 'D323', 2),
(526, 2, 18, 'D52', 4),
(527, 2, 18, 'D255', 5),
(528, 2, 4, 'D345', 1),
(529, 2, 4, 'D145', 2),
(530, 2, 4, 'D247', 3),
(531, 2, 4, 'D386', 4),
(532, 2, 26, 'D111', 1),
(533, 2, 26, 'D478', 2),
(534, 2, 4, 'D177', 5),
(535, 2, 26, 'D124', 3),
(536, 2, 26, 'D116', 4),
(537, 2, 26, 'D112', 5),
(538, 2, 27, 'D4', 3),
(539, 2, 27, 'D3', 2),
(540, 2, 25, 'D19', 1),
(541, 2, 27, 'D428', 1),
(542, 2, 27, 'D17', 4),
(543, 2, 27, 'D29', 5),
(544, 2, 25, 'D280', 2),
(545, 2, 25, 'D35', 5),
(546, 2, 25, 'D135', 4),
(547, 2, 30, 'D182', 1),
(548, 2, 25, 'D15', 3),
(549, 2, 30, 'D196', 2),
(550, 2, 30, 'D226', 4),
(551, 2, 30, 'D17', 3),
(552, 2, 30, 'D3', 5),
(553, 2, 36, 'D297', 1),
(554, 2, 36, 'D154', 2),
(555, 2, 36, 'D345', 3),
(556, 2, 34, 'D41', 2),
(557, 2, 34, 'D172', 3),
(558, 2, 34, 'D374', 4),
(559, 2, 36, 'D296', 5),
(560, 2, 34, 'D301', 1),
(561, 2, 36, 'D23', 4),
(562, 2, 35, 'D311', 1),
(563, 2, 35, 'D272', 2),
(564, 2, 35, 'D147', 3),
(565, 2, 35, 'D398', 5),
(566, 2, 35, 'D312', 4),
(567, 2, 34, 'D297', 5),
(568, 2, 37, 'D370', 1),
(569, 2, 37, 'D284', 2),
(570, 2, 37, 'D371', 4),
(571, 2, 37, 'D191', 5),
(572, 2, 37, 'D11', 3),
(573, 2, 41, 'D373', 1),
(574, 2, 41, 'D497', 4),
(575, 2, 41, 'D384', 5),
(576, 2, 41, 'D417', 2),
(577, 2, 41, 'D7', 3),
(578, 2, 38, 'D389', 1),
(579, 2, 38, 'D373', 2),
(580, 2, 38, 'D191', 5),
(581, 2, 38, 'D172', 4),
(582, 2, 38, 'D371', 3),
(583, 2, 47, 'D301', 1),
(584, 2, 47, 'D297', 2),
(585, 2, 47, 'D296', 3),
(586, 2, 47, 'D394', 4),
(587, 2, 47, 'D24', 5),
(588, 2, 44, 'D3', 1),
(589, 2, 44, 'D4', 2),
(590, 2, 44, 'D81', 4),
(591, 2, 44, 'D428', 3),
(592, 2, 40, 'D15', 1),
(593, 2, 44, 'D91', 5),
(594, 2, 40, 'D13', 3),
(595, 2, 40, 'D390', 2),
(596, 2, 40, 'D497', 5),
(597, 2, 40, 'D386', 4),
(598, 2, 39, 'D191', 2),
(599, 2, 39, 'D172', 1),
(600, 2, 39, 'D295', 3),
(601, 2, 39, 'D386', 5),
(602, 2, 43, 'D13', 1),
(603, 2, 39, 'D387', 4),
(604, 2, 43, 'D119', 2),
(605, 2, 43, 'D395', 3),
(606, 2, 42, 'D409', 1),
(607, 2, 42, 'D417', 2),
(608, 2, 43, 'D315', 4),
(609, 2, 43, 'D118', 5),
(610, 2, 42, 'D372', 3),
(611, 2, 42, 'D342', 4),
(612, 2, 42, 'D386', 5),
(613, 2, 45, 'D167', 1),
(614, 2, 45, 'D371', 2),
(615, 2, 45, 'D380', 3),
(616, 2, 45, 'D370', 4),
(617, 2, 45, 'D382', 5),
(618, 2, 46, 'D472', 1),
(619, 2, 46, 'D470', 2),
(620, 2, 46, 'D454', 3),
(621, 2, 46, 'D111', 4),
(622, 2, 46, 'D102', 5),
(623, 2, 50, 'D71', 1),
(624, 2, 50, 'D316', 2),
(625, 2, 53, 'D78', 1),
(626, 2, 50, 'D131', 5),
(627, 2, 50, 'D296', 4),
(628, 2, 50, 'D74', 3),
(629, 2, 53, 'D347', 2),
(630, 2, 53, 'D202', 5),
(631, 2, 53, 'D125', 3),
(632, 2, 53, 'D251', 4),
(633, 2, 52, 'D71', 1),
(634, 2, 52, 'D315', 2),
(635, 2, 52, 'D316', 3),
(636, 2, 52, 'D13', 4),
(637, 2, 52, 'D178', 5),
(638, 2, 48, 'D284', 1),
(639, 2, 48, 'D231', 3),
(640, 2, 48, 'D124', 2),
(641, 2, 48, 'D111', 4),
(642, 2, 48, 'D112', 5),
(643, 2, 51, 'D346', 1),
(644, 2, 51, 'D355', 2),
(645, 2, 51, 'D332', 3),
(646, 2, 51, 'D38', 4),
(647, 2, 57, 'D18', 1),
(648, 2, 51, 'D331', 5),
(649, 2, 57, 'D388', 2),
(650, 2, 57, 'D385', 4),
(651, 2, 57, 'D24', 3),
(652, 2, 57, 'D122', 5),
(653, 2, 56, 'D60', 1),
(654, 2, 56, 'D359', 2),
(655, 2, 56, 'D85', 3),
(656, 2, 56, 'D195', 4),
(657, 2, 58, 'D155', 1),
(658, 2, 58, 'D296', 2),
(659, 2, 58, 'D152', 4),
(660, 2, 58, 'D394', 3),
(661, 2, 56, 'D58', 5),
(662, 2, 58, 'D126', 5),
(663, 2, 54, 'D359', 4),
(664, 2, 54, 'D345', 5),
(665, 2, 54, 'D397', 1),
(666, 2, 54, 'D408', 2),
(667, 2, 54, 'D195', 3),
(668, 2, 49, 'D112', 1),
(669, 2, 49, 'D177', 4),
(670, 2, 55, 'D359', 1),
(671, 2, 49, 'D237', 3),
(672, 2, 49, 'D298', 2),
(673, 2, 49, 'D297', 5),
(674, 2, 55, 'D60', 2),
(675, 2, 55, 'D195', 3),
(676, 2, 55, 'D275', 4),
(677, 2, 55, 'D279', 5),
(678, 2, 60, 'D341', 2),
(679, 2, 60, 'D49', 1),
(680, 2, 60, 'D276', 4),
(681, 2, 59, 'D291', 2),
(682, 2, 60, 'D63', 5),
(683, 2, 59, 'D399', 3),
(684, 2, 59, 'D177', 1),
(685, 2, 60, 'D93', 3),
(686, 2, 59, 'D410', 5),
(687, 2, 62, 'D477', 2),
(688, 2, 62, 'D331', 1),
(689, 2, 62, 'D101', 3),
(690, 2, 59, 'D100', 4),
(691, 2, 62, 'D60', 4),
(692, 2, 62, 'D100', 5),
(693, 2, 66, 'D221', 1),
(694, 2, 66, 'D202', 4),
(695, 2, 66, 'D353', 2),
(696, 2, 66, 'D303', 3),
(697, 2, 66, 'D400', 5),
(698, 2, 64, 'D209', 1),
(699, 2, 64, 'D76', 3),
(700, 2, 64, 'D335', 5),
(701, 2, 64, 'D401', 4),
(702, 2, 69, 'D319', 1),
(703, 2, 64, 'D103', 2),
(704, 2, 69, 'D190', 2),
(705, 2, 69, 'D170', 4),
(706, 2, 69, 'D359', 3),
(707, 2, 61, 'D344', 2),
(708, 2, 69, 'D60', 5),
(709, 2, 61, 'D52', 3),
(710, 2, 61, 'D65', 4),
(711, 2, 61, 'D49', 5),
(712, 2, 70, 'D359', 1),
(713, 2, 70, 'D60', 2),
(714, 2, 70, 'D81', 3),
(715, 2, 61, 'D264', 1),
(716, 2, 70, 'D195', 4),
(717, 2, 70, 'D455', 5),
(718, 2, 65, 'D204', 1),
(719, 2, 65, 'D195', 4),
(720, 2, 68, 'D328', 2),
(721, 2, 65, 'D312', 5),
(722, 2, 65, 'D60', 3),
(723, 2, 68, 'D57', 1),
(724, 2, 65, 'D359', 2),
(725, 2, 68, 'D487', 3),
(726, 2, 67, 'D221', 3),
(727, 2, 68, 'D352', 4),
(728, 2, 67, 'D303', 2),
(729, 2, 67, 'D226', 1),
(730, 2, 67, 'D202', 4),
(731, 2, 68, 'D398', 5),
(732, 2, 67, 'D353', 5),
(733, 2, 63, 'D440', 1),
(734, 2, 63, 'D399', 2),
(735, 2, 63, 'D398', 3),
(736, 2, 63, 'D343', 4),
(737, 2, 63, 'D496', 5),
(738, 2, 21, 'D254', 1),
(739, 2, 21, 'D49', 3),
(740, 2, 21, 'D369', 2),
(741, 2, 21, 'D345', 4),
(742, 2, 21, 'D394', 5),
(743, 2, 28, 'D404', 1),
(744, 2, 28, 'D49', 4),
(745, 2, 28, 'D344', 2),
(746, 2, 28, 'D450', 3),
(747, 2, 28, 'D394', 5),
(753, 2, 29, 'D65', 1),
(754, 2, 29, 'D266', 3),
(755, 2, 29, 'D361', 2),
(756, 2, 29, 'D66', 5),
(757, 2, 29, 'D362', 4),
(758, 2, 32, 'D65', 1),
(759, 2, 32, 'D362', 2),
(760, 2, 32, 'D265', 3),
(761, 2, 32, 'D260', 4),
(762, 2, 32, 'D104', 5),
(763, 2, 31, 'D440', 1),
(764, 2, 31, 'D343', 2),
(765, 2, 31, 'D496', 3),
(766, 2, 31, 'D352', 5),
(767, 2, 31, 'D107', 4),
(768, 2, 33, 'D319', 1),
(769, 2, 33, 'D190', 2),
(770, 2, 33, 'D469', 3),
(771, 2, 33, 'D492', 5),
(772, 2, 33, 'D170', 4);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
