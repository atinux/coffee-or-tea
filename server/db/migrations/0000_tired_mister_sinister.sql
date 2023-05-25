CREATE TABLE `votes` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`username` text NOT NULL,
	`choice` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_index` ON `votes` (`user_id`);