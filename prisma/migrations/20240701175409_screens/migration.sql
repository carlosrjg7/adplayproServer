/*
  Warnings:

  - The primary key for the `screen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `screen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `screen` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `post`;
