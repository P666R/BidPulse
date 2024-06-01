/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `status` ENUM('active', 'ended') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
