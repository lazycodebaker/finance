CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`category` text,
	`limit` integer,
	`date` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`amount` integer,
	`category` text,
	`description` text,
	`date` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `income` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`amount` integer,
	`source` text,
	`category` text,
	`date` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `investments` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text,
	`name` text,
	`amount` integer,
	`current_value` integer,
	`purchase_date` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `savings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`goal_name` text,
	`target_amount` integer,
	`current_amount` integer,
	`target_date` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text,
	`amount` integer,
	`category` text,
	`description` text,
	`date` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`is_logged` integer DEFAULT false NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `budgets_id_unique` ON `budgets` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `expenses_id_unique` ON `expenses` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `income_id_unique` ON `income` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `investments_id_unique` ON `investments` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `savings_id_unique` ON `savings` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_id_unique` ON `transactions` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);