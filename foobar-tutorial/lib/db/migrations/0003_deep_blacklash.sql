CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`category_name` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
