-- CreateTable
CREATE TABLE `Acount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(50) NOT NULL,
    `balance` DOUBLE NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Withdraw` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `acountId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Acount` ADD CONSTRAINT `Acount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Withdraw` ADD CONSTRAINT `Withdraw_acountId_fkey` FOREIGN KEY (`acountId`) REFERENCES `Acount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
