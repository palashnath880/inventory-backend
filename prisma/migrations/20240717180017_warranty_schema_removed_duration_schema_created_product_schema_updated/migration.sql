/*
  Warnings:

  - You are about to drop the `warranty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_warrantyId_fkey`;

-- DropTable
DROP TABLE `warranty`;

-- CreateTable
CREATE TABLE `Duration` (
    `id` VARCHAR(191) NOT NULL,
    `days` INTEGER NOT NULL DEFAULT 0,
    `months` INTEGER NOT NULL DEFAULT 0,
    `years` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_warrantyId_fkey` FOREIGN KEY (`warrantyId`) REFERENCES `Duration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
