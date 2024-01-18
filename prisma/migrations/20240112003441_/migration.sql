-- AlterTable
ALTER TABLE `Withdraw` ADD COLUMN `value` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Deposit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `acountId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transfer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `originAcountId` INTEGER NOT NULL,
    `destinyAcountId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_acountId_fkey` FOREIGN KEY (`acountId`) REFERENCES `Acount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_originAcountId_fkey` FOREIGN KEY (`originAcountId`) REFERENCES `Acount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_destinyAcountId_fkey` FOREIGN KEY (`destinyAcountId`) REFERENCES `Acount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
