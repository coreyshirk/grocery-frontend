CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`product_name` text NOT NULL,
	`category_id` text NOT NULL,
	`description` text,
	`weight` integer,
	`unit` text,
	`image_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
