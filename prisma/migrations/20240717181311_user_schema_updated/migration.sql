/*
  Warnings:

  - A unique constraint covering the columns `[phoneNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `phoneNo` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_phoneNo_key` ON `User`(`phoneNo`);
