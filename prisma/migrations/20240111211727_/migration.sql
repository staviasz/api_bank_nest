/*
  Warnings:

  - You are about to drop the column `agencia` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `Bank` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Bank` table. All the data in the column will be lost.
  - Added the required column `agency` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Bank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bank` DROP COLUMN `agencia`,
    DROP COLUMN `nome`,
    DROP COLUMN `numero`,
    DROP COLUMN `senha`,
    ADD COLUMN `agency` VARCHAR(20) NOT NULL,
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `number` VARCHAR(20) NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthDate` DATE NOT NULL,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
