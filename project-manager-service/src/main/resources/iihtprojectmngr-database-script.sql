 CREATE TABLE `parent_task` (
  `parent_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_task` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`parent_id`)
);

CREATE TABLE `project` (
  `project_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `end_date` date DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `FKf1va93taog6qokr6sqmtgr93h` (`user_id`),
  CONSTRAINT `FKf1va93taog6qokr6sqmtgr93h` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `task` (
  `task_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `end_date` date DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `task` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `FKksfdm3p03yqyjlnxkb7ixjh2a` (`parent_id`),
  KEY `FKk8qrwowg31kx7hp93sru1pdqa` (`project_id`),
  KEY `FKbhwpp8tr117vvbxhf5sbkdkc9` (`user_id`),
  CONSTRAINT `FKbhwpp8tr117vvbxhf5sbkdkc9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKk8qrwowg31kx7hp93sru1pdqa` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `FKksfdm3p03yqyjlnxkb7ixjh2a` FOREIGN KEY (`parent_id`) REFERENCES `parent_task` (`parent_id`)
);

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `employee_id` bigint(20) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);


