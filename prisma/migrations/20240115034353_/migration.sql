-- DropForeignKey
ALTER TABLE `Acount` DROP FOREIGN KEY `Acount_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Acount` ADD CONSTRAINT `Acount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
