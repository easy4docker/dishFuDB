#---  App Data -- #
USE DISHFU;

CREATE TABLE IF  NOT EXISTS `users` (
  `id` int NOT NULL,
  `authcode` varchar(128) NOT NULL,
  `address` varchar(256) NOT NULL,
  `roles` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

CREATE TABLE IF  NOT EXISTS `menu` (
  `id` int NOT NULL,
  `authcode` varchar(128) NOT NULL,
  `desc` varchar(256) NOT NULL,
  `et` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `applicqtion` (
  `id` int NOT NULL,
  `type` varchar(16) NOT NULL,
  `visitorFP` varchar(256) NOT NULL,
  `address` varchar(512) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `qualification` varchar(1024) NOT NULL,
  `status` tinyint NOT NULL,
  `updated` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `applicqtion`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `applicqtion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;