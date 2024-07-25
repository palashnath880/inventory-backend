/*
  Warnings:

  - A unique constraint covering the columns `[warrantyId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `warrantyId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `warrantyId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Warranty` (
    `id` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_warrantyId_key` ON `Product`(`warrantyId`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_warrantyId_fkey` FOREIGN KEY (`warrantyId`) REFERENCES `Warranty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
