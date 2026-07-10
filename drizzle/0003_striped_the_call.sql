PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_drinks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`image` text
);
--> statement-breakpoint
INSERT INTO `__new_drinks`("id", "name", "price", "image") SELECT "id", "name", "price", "image" FROM `drinks`;--> statement-breakpoint
DROP TABLE `drinks`;--> statement-breakpoint
ALTER TABLE `__new_drinks` RENAME TO `drinks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;