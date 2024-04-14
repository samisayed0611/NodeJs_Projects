-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2023 at 12:42 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lafemimt_bni`
--

-- --------------------------------------------------------

--
-- Table structure for table `give_ask`
--

CREATE TABLE `give_ask` (
  `give_ask_id` int(100) NOT NULL,
  `member_id` int(100) NOT NULL,
  `date` date NOT NULL,
  `given` varchar(255) NOT NULL,
  `ask` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `give_ask`
--

INSERT INTO `give_ask` (`give_ask_id`, `member_id`, `date`, `given`, `ask`, `remark`) VALUES
(2, 35, '2018-08-23', 'Give', 'ask', 'remark'),
(3, 71, '2018-08-23', 'Dr Bhonsale Radiologist cooper hospital', 'Diabetes patients & Asthma patients', 'patients looking for Alternative Treatments  & Cure through Ayurvedic treatments'),
(4, 77, '2018-08-23', 'krishna sabat - Mahindra Susten', 'purchase dept torrent power', 't'),
(5, 36, '2018-08-23', 'Mr Banerji ,Tide Water I dia', 'Castrol India', 'want connect withe dicision makers'),
(6, 45, '2018-10-04', 'ggg', 'vgh', 'cgh'),
(7, 75, '2018-10-04', 'chgh', 'fuggugu', 'chvjjgjhi'),
(8, 35, '2018-10-04', 'guihhihi', 'chgugugii', 'vjvjbin'),
(9, 1, '2023-08-22', 'hiiiiii', 'hiiiiii', 'hhhhhh'),
(10, 1, '2023-08-23', 'hiiiiii', 'hiiiiii', 'hhhhhh'),
(16, 118, '2023-08-23', 'hiiiiii', 'hiiiiii', 'hhhhhh'),
(17, 118, '2023-11-03', 'test1', 'test1', 'test1'),
(18, 118, '2023-11-03', 'test_2', 'test_2', 'testing'),
(19, 118, '2023-11-06', 'one 6th', 'one 6th ', 'remark 6th'),
(20, 1, '2023-08-22', 'yyyyyyyyy', 'ttttttttttttttttt', 'yes'),
(21, 118, '2023-11-06', 'checking for ask ', 'working on length test which need to get check . need to put at least 52 to length string for it.', 'checking for ask'),
(22, 118, '2023-11-06', 'working on length test which need to get check . need to put at least 52 to length string for it.', 'checking for given', 'checking for given'),
(23, 118, '2023-11-06', 'checking for remark', 'checking for remark', 'working on length test which need to get check . need to put at least 52 to length string for it.'),
(24, 118, '2023-11-06', 'working on length test which need to get check . need to put at least 52 to length string for it.', 'working on length test which need to get check . need to put at least 52 to length string for it.', 'working on length test which need to get check . need to put at least 52 to length string for it.'),
(25, 1, '2023-11-06', 'dance', 'hi there', 'open '),
(26, 1, '2023-11-06', 'testibg', 'working on length test which need to get check . need to put at least 52 to length string for it.', 'testibg'),
(27, 1, '2023-11-06', 'working on length test which need to get check . need to put at least 52 to length string for it.', 'writing', 'working on length test which need to get check . need to put at least 52 to length string for it.'),
(28, 1, '2023-11-07', 'working on length test which need to get check . need to put at least 52 to length string for it.', 'test', 'working on length test which need to get check . need to put at least 52 to length string for it.'),
(29, 2, '2023-11-07', 'test 2', 'welcome', 'rocking'),
(30, 9, '2023-11-08', 'testing application ', 'testing application ', 'testing application '),
(31, 9, '2023-11-08', 'application testing ', 'application testing ', 'application testing '),
(32, 9, '2023-11-01', 'test ', 'test', 'test '),
(33, 9, '2023-11-08', 'test', 'test ', 'test'),
(34, 3, '2023-11-30', 'test ', 'test', 'test '),
(35, 11, '2023-11-10', 'agsbbd', 'qeegehn', 'wbsndnc'),
(36, 11, '2023-11-16', 'fgdnskdmdj\ndhhdjd8fnfmew\nduddieo3w7', 'fhfjfjdmsh', 'gzjsmtbhtie\nfjjrjem'),
(37, 11, '2023-11-17', 'dj3uejd6e7ajb', 'ahshshdhh', 'fsyhwe\ndhdu3kem\ndkdeioq');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`) VALUES
(1, 'admin', 'Administrator'),
(2, 'members', 'General User');

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int(11) UNSIGNED NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `login` varchar(100) NOT NULL,
  `time` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(100) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Mobile` bigint(10) NOT NULL,
  `Profile` blob NOT NULL,
  `DCP` varbinary(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `otp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `Name`, `Mobile`, `Profile`, `DCP`, `email`, `password`, `otp`) VALUES
(1, 'tejas', 9819535276, 0x75706c6f6164732f70686f746f2f77616c6c7061706572666c6172652e636f6d5f77616c6c7061706572202831292e6a7067, 0x557365722067756964652e706466, 'developer2@sublimetechnocorp.com', 'test', 950062),
(2, 'test dev ', 9819186241, 0x75706c6f6164732f70686f746f2f696d6167655f63726f707065725f313639393333363837363039352e6a7067, '', 'tejas.sublimetechnocorp@gmail.com', 'test2', 649109),
(10, 'Ankita ', 8511800905, 0x75706c6f6164732f70686f746f2f64656661756c742e706e67, '', 'ankita@gmail.con', 'Asdf@1234', NULL),
(11, 'Ankita ', 8511800906, 0x75706c6f6164732f70686f746f2f64656661756c742e706e67, 0x7373632d63676c2d616e737765722d6b65792d31372d372d323032332d73686966742d342e706466, 'ankita.sublimetechnocorp@gmail.com', 'Asdf@1234', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `activation_code` varchar(40) DEFAULT NULL,
  `forgotten_password_code` varchar(40) DEFAULT NULL,
  `forgotten_password_time` int(11) UNSIGNED DEFAULT NULL,
  `remember_code` varchar(40) DEFAULT NULL,
  `created_on` int(11) UNSIGNED NOT NULL,
  `last_login` int(11) UNSIGNED DEFAULT NULL,
  `active` tinyint(1) UNSIGNED DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `ip_address`, `username`, `password`, `salt`, `email`, `activation_code`, `forgotten_password_code`, `forgotten_password_time`, `remember_code`, `created_on`, `last_login`, `active`, `first_name`, `last_name`, `company`, `phone`) VALUES
(1, '127.0.0.1', 'administrator', '$2a$07$SeBknntpZror9uyftVopmu61qg0ms8Qv1yV6FG.kQOSM.9QhmTo36', '', 'admin@admin.com', '', NULL, NULL, NULL, 1268889823, 1537763605, 1, 'Admin', 'istrator', 'ADMIN', '0'),
(2, '', 'tej', '123456', '31', 'jay@2023', '546', '45', 5415, '62626', 0, 5615, 6, '65', '56', 'njwek', '12113333333333444445'),
(3, '', 'jay', '123456', '31', 'jay@2023', '546', '45', 5415, '62626', 0, 5615, 6, '65', '56', 'njwek', '1234564561'),
(22, '', 'jayshri', '1123', NULL, 'jay@123', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(27, '', 'jayshri', '1123', NULL, 'jay@123', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(28, '', 'jayshri', '1123', NULL, 'jay@123', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_groups`
--

CREATE TABLE `users_groups` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `group_id` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users_groups`
--

INSERT INTO `users_groups` (`id`, `user_id`, `group_id`) VALUES
(1, 1, 1),
(2, 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `give_ask`
--
ALTER TABLE `give_ask`
  ADD PRIMARY KEY (`give_ask_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_groups`
--
ALTER TABLE `users_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_users_groups` (`user_id`,`group_id`),
  ADD KEY `fk_users_groups_users1_idx` (`user_id`),
  ADD KEY `fk_users_groups_groups1_idx` (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `give_ask`
--
ALTER TABLE `give_ask`
  MODIFY `give_ask_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users_groups`
--
ALTER TABLE `users_groups`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users_groups`
--
ALTER TABLE `users_groups`
  ADD CONSTRAINT `fk_users_groups_groups1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_groups_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
