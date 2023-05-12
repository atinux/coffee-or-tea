CREATE TABLE `votes` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`username` text NOT NULL,
	`choice` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userIdIndex` ON `votes` (`user_id`);