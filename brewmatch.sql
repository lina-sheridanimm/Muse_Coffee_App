-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 09:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brewmatch`
--

-- --------------------------------------------------------

--
-- Table structure for table `brewmatch_cafes`
--

CREATE TABLE `brewmatch_cafes` (
  `cafe_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `distance_category` enum('Any Distance','1 mile','3 mile','5 mile') NOT NULL,
  `ambience` enum('quiet & cozy','modern & lively','classic & refined','artistic & eclectic') NOT NULL,
  `rating` decimal(2,1) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `is_sponsored` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brewmatch_cafes`
--

INSERT INTO `brewmatch_cafes` (`cafe_id`, `name`, `address`, `distance_category`, `ambience`, `rating`, `is_sponsored`) VALUES
(1, 'Bean There Café', '125 Cross Ave, Oakville, ON L6H 2S8', '1 mile', 'quiet & cozy', 4.5, 1),
(2, 'Kerr Street Café', '298 Kerr St, Oakville, ON L6K 3B3', '3 mile', 'classic & refined', 4.8, 0),
(3, 'The Coffee Lab', '168 Reynolds St, Oakville, ON L6J 0A6', '5 mile', 'modern & lively', 4.9, 1),
(4, 'Morning Brew', '240 North Service Rd W, Oakville, ON L6M 2Y1', '3 mile', 'artistic & eclectic', 4.4, 0),
(5, 'Aroma Café', '146 Lakeshore Rd E, Oakville, ON L6J 1H4', '5 mile', 'quiet & cozy', 4.1, 0),
(6, 'The Danish Café', '2290 Trafalgar Rd, Oakville, ON L6H 6K7', '1 mile', 'modern & lively', 4.3, 1),
(7, 'Campus Coffee Hub', '1430 Trafalgar Rd, Oakville, ON L6H 2L1', '1 mile', 'quiet & cozy', 4.0, 0),
(8, 'Tribeca Coffee Works', '499 Cornwall Rd, Oakville, ON L6J 7S8', '5 mile', 'classic & refined', 4.6, 0),
(9, 'Coffee Culture', '2525 Old Bronte Rd, Oakville, ON L6M 4J2', '3 mile', 'artistic & eclectic', 4.2, 1),
(10, 'Pilot Coffee Roasters', '65 Front St W, Toronto, ON M5J 1E6', '5 mile', 'modern & lively', 4.7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `brewmatch_test`
--

CREATE TABLE `brewmatch_test` (
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brewmatch_users`
--

CREATE TABLE `brewmatch_users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `bio` varchar(500) NOT NULL,
  `portrait_image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brewmatch_users`
--

INSERT INTO `brewmatch_users` (`user_id`, `user_name`, `email`, `bio`, `portrait_image`) VALUES
(1, 'nancy_zhu', 'nancy.zhu@mail.utoronto.ca', 'Treat cafés as my fav island.', 'user1.png'),
(2, 'justyne_c', 'justyne.chen@mail.utoronto.ca', 'Living on iced coffee and good vibes!', 'user2.png'),
(3, 'andy_tech', 'andy.sales@techcompany.com', 'Sorry, zero interest in fancy drinks ❄️☕', 'user3.png'),
(4, 'sarah_design', 'sarah.graphics@gmail.com', 'love oat milk in latte and drawing 🎨🥛', 'user4.png'),
(5, 'michael_dev', 'michael.code@outlook.com', 'one Americano at a time 💻⚡', 'user5.png'),
(6, 'bella_student', 'bella.student@sheridan.ca', 'decaf only please ☕✌️', 'user6.png'),
(7, 'genevieve_m', 'genevieve.marketing@gmail.com', 'workout coffee runs into taste adventures.', 'user7.png'),
(8, 'dave_coffee', 'dave.manager@quantumcoffee.com', 'I always want to change my personality 🎭☕', 'user8.png');

-- --------------------------------------------------------

--
-- Table structure for table `cafe_amenities`
--

CREATE TABLE `cafe_amenities` (
  `cafe_id` int(11) DEFAULT NULL,
  `amenity` enum('Offers Delivery','Offers Takeout','Takes Reservation','Free Wi-Fi','Outdoor Seating','Wheelchair Accessible','Charging socket provided','24/7') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafe_amenities`
--

INSERT INTO `cafe_amenities` (`cafe_id`, `amenity`) VALUES
(1, 'Free Wi-Fi'),
(1, 'Charging socket provided'),
(1, 'Offers Takeout'),
(2, 'Outdoor Seating'),
(2, 'Wheelchair Accessible'),
(2, 'Takes Reservation'),
(3, 'Offers Delivery'),
(3, 'Free Wi-Fi'),
(3, 'Offers Takeout'),
(4, 'Charging socket provided'),
(4, 'Free Wi-Fi'),
(5, 'Wheelchair Accessible'),
(5, 'Offers Takeout'),
(6, 'Free Wi-Fi'),
(6, '24/7'),
(7, 'Offers Delivery'),
(7, 'Offers Takeout'),
(8, 'Free Wi-Fi'),
(8, 'Wheelchair Accessible'),
(9, 'Takes Reservation'),
(9, 'Outdoor Seating'),
(10, 'Free Wi-Fi'),
(10, 'Charging socket provided');

-- --------------------------------------------------------

--
-- Table structure for table `cafe_drinks`
--

CREATE TABLE `cafe_drinks` (
  `cafe_id` int(11) DEFAULT NULL,
  `drink_type` enum('Seasonal/Themed Menu','Non-coffee Options','Pour-over coffee','Hand-drip Options') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafe_drinks`
--

INSERT INTO `cafe_drinks` (`cafe_id`, `drink_type`) VALUES
(1, 'Pour-over coffee'),
(1, 'Non-coffee Options'),
(2, 'Seasonal/Themed Menu'),
(2, 'Hand-drip Options'),
(3, 'Pour-over coffee'),
(3, 'Seasonal/Themed Menu'),
(4, 'Non-coffee Options'),
(4, 'Hand-drip Options'),
(5, 'Seasonal/Themed Menu'),
(5, 'Non-coffee Options'),
(6, 'Pour-over coffee'),
(6, 'Hand-drip Options'),
(7, 'Non-coffee Options'),
(8, 'Pour-over coffee'),
(8, 'Hand-drip Options'),
(9, 'Seasonal/Themed Menu'),
(9, 'Non-coffee Options'),
(10, 'Pour-over coffee'),
(10, 'Hand-drip Options');

-- --------------------------------------------------------

--
-- Table structure for table `cafe_good_for`
--

CREATE TABLE `cafe_good_for` (
  `cafe_id` int(11) DEFAULT NULL,
  `good_for` enum('Pet','Kids','Groups','Event','Study','Work') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafe_good_for`
--

INSERT INTO `cafe_good_for` (`cafe_id`, `good_for`) VALUES
(1, 'Study'),
(1, 'Work'),
(2, 'Groups'),
(2, 'Event'),
(2, 'Pet'),
(3, 'Kids'),
(3, 'Groups'),
(4, 'Work'),
(4, 'Study'),
(5, 'Pet'),
(5, 'Kids'),
(6, 'Work'),
(6, 'Event'),
(7, 'Study'),
(7, 'Work'),
(8, 'Kids'),
(8, 'Groups'),
(9, 'Work'),
(9, 'Event'),
(10, 'Study'),
(10, 'Groups');

-- --------------------------------------------------------

--
-- Table structure for table `cafe_hours`
--

CREATE TABLE `cafe_hours` (
  `hour_id` int(11) NOT NULL,
  `cafe_id` int(11) NOT NULL,
  `day_of_week` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafe_hours`
--

INSERT INTO `cafe_hours` (`hour_id`, `cafe_id`, `day_of_week`, `open_time`, `close_time`) VALUES
(1, 1, 'monday', '07:00:00', '19:00:00'),
(2, 1, 'tuesday', '07:00:00', '19:00:00'),
(3, 1, 'wednesday', '07:00:00', '19:00:00'),
(4, 1, 'thursday', '07:00:00', '19:00:00'),
(5, 1, 'friday', '07:00:00', '19:00:00'),
(6, 1, 'saturday', '08:00:00', '18:00:00'),
(7, 1, 'sunday', '08:00:00', '17:00:00'),
(8, 2, 'monday', '06:00:00', '18:00:00'),
(9, 2, 'tuesday', '06:00:00', '18:00:00'),
(10, 2, 'wednesday', '06:00:00', '18:00:00'),
(11, 2, 'thursday', '06:00:00', '18:00:00'),
(12, 2, 'friday', '06:00:00', '18:00:00'),
(13, 2, 'saturday', '07:00:00', '16:00:00'),
(14, 2, 'sunday', '00:00:00', '00:00:00'),
(15, 3, 'monday', '08:00:00', '22:00:00'),
(16, 3, 'tuesday', '08:00:00', '22:00:00'),
(17, 3, 'wednesday', '08:00:00', '22:00:00'),
(18, 3, 'thursday', '08:00:00', '22:00:00'),
(19, 3, 'friday', '08:00:00', '23:00:00'),
(20, 3, 'saturday', '08:00:00', '23:00:00'),
(21, 3, 'sunday', '09:00:00', '21:00:00'),
(22, 4, 'monday', '07:00:00', '23:00:00'),
(23, 4, 'tuesday', '07:00:00', '23:00:00'),
(24, 4, 'wednesday', '07:00:00', '23:00:00'),
(25, 4, 'thursday', '07:00:00', '23:00:00'),
(26, 4, 'friday', '07:00:00', '23:00:00'),
(27, 4, 'saturday', '08:00:00', '20:00:00'),
(28, 4, 'sunday', '08:00:00', '20:00:00'),
(29, 5, 'monday', '00:00:00', '00:00:00'),
(30, 5, 'tuesday', '10:00:00', '20:00:00'),
(31, 5, 'wednesday', '10:00:00', '20:00:00'),
(32, 5, 'thursday', '10:00:00', '20:00:00'),
(33, 5, 'friday', '10:00:00', '20:00:00'),
(34, 5, 'saturday', '09:00:00', '21:00:00'),
(35, 5, 'sunday', '09:00:00', '19:00:00'),
(36, 6, 'monday', '05:30:00', '16:00:00'),
(37, 6, 'tuesday', '05:30:00', '16:00:00'),
(38, 6, 'wednesday', '05:30:00', '16:00:00'),
(39, 6, 'thursday', '05:30:00', '16:00:00'),
(40, 6, 'friday', '05:30:00', '16:00:00'),
(41, 6, 'saturday', '07:00:00', '15:00:00'),
(42, 6, 'sunday', '07:00:00', '15:00:00'),
(43, 7, 'monday', '07:00:00', '19:00:00'),
(44, 7, 'tuesday', '07:00:00', '19:00:00'),
(45, 7, 'wednesday', '07:00:00', '19:00:00'),
(46, 7, 'thursday', '07:00:00', '19:00:00'),
(47, 7, 'friday', '07:00:00', '22:00:00'),
(48, 7, 'saturday', '07:00:00', '22:00:00'),
(49, 7, 'sunday', '08:00:00', '18:00:00'),
(50, 8, 'monday', '11:00:00', '21:00:00'),
(51, 8, 'tuesday', '11:00:00', '21:00:00'),
(52, 8, 'wednesday', '11:00:00', '21:00:00'),
(53, 8, 'thursday', '11:00:00', '21:00:00'),
(54, 8, 'friday', '11:00:00', '21:00:00'),
(55, 8, 'saturday', '11:00:00', '21:00:00'),
(56, 8, 'sunday', '11:00:00', '21:00:00'),
(57, 9, 'monday', '08:00:00', '17:00:00'),
(58, 9, 'tuesday', '08:00:00', '17:00:00'),
(59, 9, 'wednesday', '08:00:00', '17:00:00'),
(60, 9, 'thursday', '08:00:00', '17:00:00'),
(61, 9, 'friday', '08:00:00', '17:00:00'),
(62, 9, 'saturday', '07:00:00', '22:00:00'),
(63, 9, 'sunday', '07:00:00', '22:00:00'),
(64, 10, 'monday', '10:00:00', '21:00:00'),
(65, 10, 'tuesday', '10:00:00', '21:00:00'),
(66, 10, 'wednesday', '10:00:00', '21:00:00'),
(67, 10, 'thursday', '10:00:00', '21:00:00'),
(68, 10, 'friday', '10:00:00', '22:00:00'),
(69, 10, 'saturday', '10:00:00', '22:00:00'),
(70, 10, 'sunday', '11:00:00', '19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cafe_meals`
--

CREATE TABLE `cafe_meals` (
  `cafe_id` int(11) DEFAULT NULL,
  `meal_type` enum('Good for Breakfast','Good for Brunch','Good for Lunch','Good for Dessert') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafe_meals`
--

INSERT INTO `cafe_meals` (`cafe_id`, `meal_type`) VALUES
(1, 'Good for Breakfast'),
(1, 'Good for Brunch'),
(1, 'Good for Dessert'),
(2, 'Good for Breakfast'),
(2, 'Good for Lunch'),
(2, 'Good for Dessert'),
(3, 'Good for Brunch'),
(3, 'Good for Lunch'),
(4, 'Good for Breakfast'),
(4, 'Good for Brunch'),
(4, 'Good for Lunch'),
(4, 'Good for Dessert'),
(5, 'Good for Lunch'),
(5, 'Good for Dessert'),
(6, 'Good for Breakfast'),
(6, 'Good for Brunch'),
(6, 'Good for Dessert'),
(7, 'Good for Breakfast'),
(7, 'Good for Dessert'),
(8, 'Good for Brunch'),
(8, 'Good for Lunch'),
(9, 'Good for Breakfast'),
(9, 'Good for Lunch'),
(9, 'Good for Dessert'),
(10, 'Good for Breakfast'),
(10, 'Good for Brunch'),
(10, 'Good for Dessert');

-- --------------------------------------------------------

--
-- Table structure for table `personality_types`
--

CREATE TABLE `personality_types` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `type_description` text DEFAULT NULL,
  `type_badge_image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personality_types`
--

INSERT INTO `personality_types` (`type_id`, `type_name`, `type_description`, `type_badge_image`) VALUES
(1, 'Arabica Adventurer', 'Characteristics: \r\n- Strengths: Naturally charismatic, adaptable, brings people together\r\n- Growth Areas: Can be restless, sometimes sacrifices depth for breadth\r\n- Hidden Depths: Though appearing carefree, they deeply value authentic connections\r\n- Relationship with Coffee: See every cup as a story waiting to be discovered and try to enjoy coffee in different places with different people.', 'Arabica-badge.png'),
(2, 'Matcha Mystic', 'Characteristics: \r\n- Strengths: Intuitive, mindful, brings balance to chaos\r\n- Growth Areas: Can become too absorbed in ideals, occasionally disconnected from practical matters\r\n- Hidden Depths: Beneath their calm exterior lies a passionate advocate for meaningful change\r\n- Relationship with Coffee: Value the ceremony as much as the drink itself, sipping coffee gives you calmness and mental cure.', 'Matcha-badge.png'),
(3, 'Espresso Emperor', 'Characteristics: \r\n- Strengths: Precise, passionate about quality, inspirational\r\n- Growth Areas: Can be overly critical, sometimes misses the forest for the trees\r\n- Hidden Depths: Their perfectionism stems from a deep desire to share excellence with others\r\n- Relationship with Coffee: Sees craftsmanship as a path to excellence and seeks original and natural coffee flavor.', 'Espresso-badge.png'),
(4, 'Mocha Muse', 'Characteristics: \r\n- Strengths: Creative, empathetic, finds beauty in unexpected places\r\n- Growth Areas: Can get lost in possibilities, sometimes struggles with decisions\r\n- Hidden Depths: Their creativity is driven by a desire to make the world more beautiful\r\n- Relationship with Coffee: Believes in coffee\'s power to inspire and comfort, enjoys the ambience of a coffee shop and consider cafe is a place to create and enrich life.', 'Mocha-badge.png');

-- --------------------------------------------------------

--
-- Table structure for table `test_answers`
--

CREATE TABLE `test_answers` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `answer_text` text NOT NULL,
  `answer_code` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_answers`
--

INSERT INTO `test_answers` (`answer_id`, `question_id`, `answer_text`, `answer_code`) VALUES
(1, 1, 'A lively board game group, lost in laughter over cold coffee', 'a'),
(2, 1, 'A solitary artist sketching by rainy window with ceramic mug', 'b'),
(3, 1, 'A skilled barista crafting coffee with perfect precision', 'c'),
(4, 1, 'Someone photographing artful latte against wall mural', 'd'),
(5, 2, 'Colombian farmer sharing family heritage in coffee fields', 'a'),
(6, 2, 'Traditional Japanese tea house frozen in time', 'b'),
(7, 2, 'Modern coffee lab developing new techniques', 'c'),
(8, 2, 'Late-night café with artists in deep discussion', 'd'),
(9, 3, 'Organize community harvest festival to bring together farmers and coffee buyers', 'a'),
(10, 3, 'Design a sustainable farming practice that honors both tradition and the environment', 'b'),
(11, 3, 'Develop a new method for sorting beans to ensure maximum quality', 'c'),
(12, 3, 'Create an innovative way to showcase the farm\'s unique story and coffee varieties', 'd'),
(13, 4, 'Finding friendship in a distant cafe by travel across the world', 'a'),
(14, 4, 'Waking up to perfect your morning coffee ritual, finding peace in the quiet moments', 'b'),
(15, 4, 'Competing in a coffee championship, mastering championship coffee techniques', 'c'),
(16, 4, 'Experimenting with unusual ingredients to create a signature drink', 'd'),
(17, 5, 'I want to dive into these magical pages right now and watch the stories unfold', 'a'),
(18, 5, 'Curiosity about preserving ancient coffee traditions while embracing modern evolution', 'b'),
(19, 5, 'Determination to master every detail and technique from coffee\'s rich history', 'c'),
(20, 5, 'We could blend traditional coffee wisdom with contemporary artistic expression', 'd'),
(21, 6, 'A welcoming guide for coffee tastings that brings diverse people together', 'a'),
(22, 6, 'A meditation track of coffee sounds - from grinding beans to steaming milk', 'b'),
(23, 6, 'A mystical menu that reads moods and suggests perfect coffee pairings', 'c'),
(24, 6, 'An innovative cup design that dances on the page, transforming coffee rituals', 'd');

-- --------------------------------------------------------

--
-- Table structure for table `test_questions`
--

CREATE TABLE `test_questions` (
  `question_id` int(11) NOT NULL,
  `question_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_questions`
--

INSERT INTO `test_questions` (`question_id`, `question_text`) VALUES
(1, 'Before we begin, the barista says, gesturing to four customers in the café, tell me, which scene catches your attention?'),
(2, 'The barista leads you to a magical brewing station where four coffee beans float in mid-air. Each one shows a different scene when you look closely. What do you see in yours?'),
(3, 'Suddenly, your coffee cup begins to ripple, and you are transported to a coffee farm at harvest time. The farm owner needs help and you want to:'),
(4, 'Back in La Magia, you discover a torn page from the recipe book. When you touch it, you experience a memory of:'),
(5, 'The barista reveals that the magical recipe book\' pages shift and renew themselves, reflecting the ever-evolving relationship between humans and coffee across the world. You feel compelled to:'),
(6, 'The final test requires you to add your own magic to the recipe book. You create:');

-- --------------------------------------------------------

--
-- Table structure for table `user_personality_results`
--

CREATE TABLE `user_personality_results` (
  `result_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `personality_type_id` int(11) DEFAULT NULL,
  `test_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_personality_results`
--

INSERT INTO `user_personality_results` (`result_id`, `user_id`, `personality_type_id`, `test_date`) VALUES
(1, 1, 1, '2024-11-06 22:07:58'),
(2, 2, 2, '2024-11-06 22:07:58'),
(3, 3, 3, '2024-11-06 22:07:58'),
(4, 4, 4, '2024-11-06 22:07:58'),
(5, 5, 1, '2024-11-06 22:07:58'),
(6, 6, 2, '2024-11-06 22:07:58'),
(7, 7, 3, '2024-11-06 22:07:58'),
(8, 8, 4, '2024-11-06 22:07:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_test_responses`
--

CREATE TABLE `user_test_responses` (
  `response_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `answer_choice` char(1) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_test_responses`
--

INSERT INTO `user_test_responses` (`response_id`, `user_id`, `question_id`, `answer_choice`, `timestamp`) VALUES
(1, 1, 1, 'A', '2024-11-06 22:07:58'),
(2, 1, 2, 'A', '2024-11-06 22:07:58'),
(3, 1, 3, 'A', '2024-11-06 22:07:58'),
(4, 1, 4, 'B', '2024-11-06 22:07:58'),
(5, 1, 5, 'A', '2024-11-06 22:07:58'),
(6, 1, 6, 'A', '2024-11-06 22:07:58'),
(7, 2, 1, 'B', '2024-11-06 22:07:58'),
(8, 2, 2, 'B', '2024-11-06 22:07:58'),
(9, 2, 3, 'B', '2024-11-06 22:07:58'),
(10, 2, 4, 'B', '2024-11-06 22:07:58'),
(11, 2, 5, 'A', '2024-11-06 22:07:58'),
(12, 2, 6, 'B', '2024-11-06 22:07:58'),
(13, 3, 1, 'C', '2024-11-06 22:07:58'),
(14, 3, 2, 'C', '2024-11-06 22:07:58'),
(15, 3, 3, 'C', '2024-11-06 22:07:58'),
(16, 3, 4, 'C', '2024-11-06 22:07:58'),
(17, 3, 5, 'B', '2024-11-06 22:07:58'),
(18, 3, 6, 'C', '2024-11-06 22:07:58'),
(19, 4, 1, 'D', '2024-11-06 22:07:58'),
(20, 4, 2, 'D', '2024-11-06 22:07:58'),
(21, 4, 3, 'D', '2024-11-06 22:07:58'),
(22, 4, 4, 'D', '2024-11-06 22:07:58'),
(23, 4, 5, 'D', '2024-11-06 22:07:58'),
(24, 4, 6, 'A', '2024-11-06 22:07:58'),
(25, 5, 1, 'A', '2024-11-06 22:07:58'),
(26, 5, 2, 'A', '2024-11-06 22:07:58'),
(27, 5, 3, 'B', '2024-11-06 22:07:58'),
(28, 5, 4, 'A', '2024-11-06 22:07:58'),
(29, 5, 5, 'A', '2024-11-06 22:07:58'),
(30, 5, 6, 'A', '2024-11-06 22:07:58'),
(31, 6, 1, 'B', '2024-11-06 22:07:58'),
(32, 6, 2, 'B', '2024-11-06 22:07:58'),
(33, 6, 3, 'B', '2024-11-06 22:07:58'),
(34, 6, 4, 'C', '2024-11-06 22:07:58'),
(35, 6, 5, 'B', '2024-11-06 22:07:58'),
(36, 6, 6, 'B', '2024-11-06 22:07:58'),
(37, 7, 1, 'C', '2024-11-06 22:07:58'),
(38, 7, 2, 'C', '2024-11-06 22:07:58'),
(39, 7, 3, 'C', '2024-11-06 22:07:58'),
(40, 7, 4, 'B', '2024-11-06 22:07:58'),
(41, 7, 5, 'C', '2024-11-06 22:07:58'),
(42, 7, 6, 'C', '2024-11-06 22:07:58'),
(43, 8, 1, 'D', '2024-11-06 22:07:58'),
(44, 8, 2, 'D', '2024-11-06 22:07:58'),
(45, 8, 3, 'D', '2024-11-06 22:07:58'),
(46, 8, 4, 'D', '2024-11-06 22:07:58'),
(47, 8, 5, 'C', '2024-11-06 22:07:58'),
(48, 8, 6, 'D', '2024-11-06 22:07:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brewmatch_cafes`
--
ALTER TABLE `brewmatch_cafes`
  ADD PRIMARY KEY (`cafe_id`);

--
-- Indexes for table `brewmatch_users`
--
ALTER TABLE `brewmatch_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `cafe_amenities`
--
ALTER TABLE `cafe_amenities`
  ADD KEY `cafe_id` (`cafe_id`);

--
-- Indexes for table `cafe_drinks`
--
ALTER TABLE `cafe_drinks`
  ADD KEY `cafe_id` (`cafe_id`);

--
-- Indexes for table `cafe_good_for`
--
ALTER TABLE `cafe_good_for`
  ADD KEY `cafe_id` (`cafe_id`);

--
-- Indexes for table `cafe_hours`
--
ALTER TABLE `cafe_hours`
  ADD PRIMARY KEY (`hour_id`),
  ADD UNIQUE KEY `unique_cafe_day` (`cafe_id`,`day_of_week`);

--
-- Indexes for table `cafe_meals`
--
ALTER TABLE `cafe_meals`
  ADD KEY `cafe_id` (`cafe_id`);

--
-- Indexes for table `personality_types`
--
ALTER TABLE `personality_types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `test_answers`
--
ALTER TABLE `test_answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `test_questions`
--
ALTER TABLE `test_questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `user_personality_results`
--
ALTER TABLE `user_personality_results`
  ADD PRIMARY KEY (`result_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `personality_type_id` (`personality_type_id`);

--
-- Indexes for table `user_test_responses`
--
ALTER TABLE `user_test_responses`
  ADD PRIMARY KEY (`response_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `question_id` (`question_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brewmatch_users`
--
ALTER TABLE `brewmatch_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `cafe_hours`
--
ALTER TABLE `cafe_hours`
  MODIFY `hour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `personality_types`
--
ALTER TABLE `personality_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `test_answers`
--
ALTER TABLE `test_answers`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user_personality_results`
--
ALTER TABLE `user_personality_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_test_responses`
--
ALTER TABLE `user_test_responses`
  MODIFY `response_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cafe_amenities`
--
ALTER TABLE `cafe_amenities`
  ADD CONSTRAINT `cafe_amenities_ibfk_1` FOREIGN KEY (`cafe_id`) REFERENCES `brewmatch_cafes` (`cafe_id`);

--
-- Constraints for table `cafe_drinks`
--
ALTER TABLE `cafe_drinks`
  ADD CONSTRAINT `cafe_drinks_ibfk_1` FOREIGN KEY (`cafe_id`) REFERENCES `brewmatch_cafes` (`cafe_id`);

--
-- Constraints for table `cafe_good_for`
--
ALTER TABLE `cafe_good_for`
  ADD CONSTRAINT `cafe_good_for_ibfk_1` FOREIGN KEY (`cafe_id`) REFERENCES `brewmatch_cafes` (`cafe_id`);

--
-- Constraints for table `cafe_hours`
--
ALTER TABLE `cafe_hours`
  ADD CONSTRAINT `cafe_hours_ibfk_1` FOREIGN KEY (`cafe_id`) REFERENCES `brewmatch_cafes` (`cafe_id`) ON DELETE CASCADE;

--
-- Constraints for table `cafe_meals`
--
ALTER TABLE `cafe_meals`
  ADD CONSTRAINT `cafe_meals_ibfk_1` FOREIGN KEY (`cafe_id`) REFERENCES `brewmatch_cafes` (`cafe_id`);

--
-- Constraints for table `test_answers`
--
ALTER TABLE `test_answers`
  ADD CONSTRAINT `test_answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `test_questions` (`question_id`);

--
-- Constraints for table `user_personality_results`
--
ALTER TABLE `user_personality_results`
  ADD CONSTRAINT `user_personality_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `brewmatch_users` (`user_id`),
  ADD CONSTRAINT `user_personality_results_ibfk_2` FOREIGN KEY (`personality_type_id`) REFERENCES `personality_types` (`type_id`);

--
-- Constraints for table `user_test_responses`
--
ALTER TABLE `user_test_responses`
  ADD CONSTRAINT `user_test_responses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `brewmatch_users` (`user_id`),
  ADD CONSTRAINT `user_test_responses_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `test_questions` (`question_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
