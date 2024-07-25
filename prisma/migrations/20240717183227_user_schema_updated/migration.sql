/*
  Warnings:

  - Made the column `phoneNo` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phoneNo` VARCHAR(191) NOT NULL;
