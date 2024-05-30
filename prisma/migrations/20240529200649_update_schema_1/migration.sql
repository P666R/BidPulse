/*
  Warnings:

  - You are about to drop the column `bid_amount` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `current_price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `starting_price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `is_read` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - Added the required column `bidAmount` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPrice` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingPrice` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_user_id_fkey`;

-- AlterTable
ALTER TABLE `Bid` DROP COLUMN `bid_amount`,
    DROP COLUMN `created_at`,
    DROP COLUMN `item_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `bidAmount` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `itemId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `created_at`,
    DROP COLUMN `current_price`,
    DROP COLUMN `end_time`,
    DROP COLUMN `image_url`,
    DROP COLUMN `starting_price`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currentPrice` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `startingPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `created_at`,
    DROP COLUMN `is_read`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isRead` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `created_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
