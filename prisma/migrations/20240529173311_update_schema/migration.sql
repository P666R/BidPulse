/*
  Warnings:

  - You are about to drop the column `bidAmount` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `currentPrice` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `startingPrice` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `bid_amount` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starting_price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- AlterTable
ALTER TABLE `Bid` DROP COLUMN `bidAmount`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `itemId`,
    DROP COLUMN `userId`,
    ADD COLUMN `bid_amount` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `item_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `createdAt`,
    DROP COLUMN `currentPrice`,
    DROP COLUMN `endTime`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `startingPrice`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `current_price` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    ADD COLUMN `end_time` DATETIME(3) NOT NULL,
    ADD COLUMN `image_url` VARCHAR(191) NULL,
    ADD COLUMN `starting_price` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `createdAt`,
    DROP COLUMN `isRead`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_read` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
