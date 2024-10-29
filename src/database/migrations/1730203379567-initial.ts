import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1730203379567 implements MigrationInterface {
    name = 'Initial1730203379567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`configs\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` timestamp(6) NULL, \`config\` enum ('version') NOT NULL, \`stringValue\` varchar(255) NULL, \`numberValue\` float NULL, \`jsonValue\` json NULL, \`booleanValue\` tinyint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_logs\` (\`id\` varchar(36) NOT NULL, \`ip\` varchar(255) NULL, \`url\` varchar(255) NULL, \`action\` varchar(255) NOT NULL, \`snapshot\` json NULL, \`endpoint\` varchar(255) NOT NULL, \`method\` enum ('GET', 'POST', 'PATCH', 'PUT', 'DELETE') NULL, \`exception\` json NULL, \`sessionId\` varchar(255) NULL, \`byId\` varchar(255) NULL, \`userId\` varchar(255) NULL, \`vendorTypeId\` varchar(255) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` timestamp(6) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`status\` enum ('active', 'inactive', 'pending', 'suspended', 'deleted') NOT NULL DEFAULT 'active', \`phone\` varchar(255) NULL, \`role\` enum ('admin', 'user', 'vendor', 'planner') NOT NULL DEFAULT 'user', \`client\` json NULL, \`vendor\` json NULL, \`planner\` json NULL, \`vendorTypeId\` varchar(255) NULL, \`createdById\` varchar(36) NULL, \`updatedById\` varchar(36) NULL, \`deletedById\` varchar(36) NULL, UNIQUE INDEX \`UNIQUE_user_phone\` (\`phone\`), UNIQUE INDEX \`UNIQUE_user_email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vendor_types\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`createdById\` varchar(36) NULL, \`updatedById\` varchar(36) NULL, \`deletedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_logs\` ADD CONSTRAINT \`FK_2ce833fd6b70e5d2f686b977fd5\` FOREIGN KEY (\`byId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_logs\` ADD CONSTRAINT \`FK_21c46c2b3ab66ef0773e5db3464\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_logs\` ADD CONSTRAINT \`FK_19023fdeef8e6797c7b0fa71573\` FOREIGN KEY (\`vendorTypeId\`) REFERENCES \`vendor_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_029a1f7036ce0dc47b043c93d09\` FOREIGN KEY (\`vendorTypeId\`) REFERENCES \`vendor_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_51d635f1d983d505fb5a2f44c52\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_52e97c477859f8019f3705abd21\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e9d50c91bd84f566ce0ac1acf44\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vendor_types\` ADD CONSTRAINT \`FK_727ba49e62b74ebb22818b97c76\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vendor_types\` ADD CONSTRAINT \`FK_af76b4152a4948b5f87c7e282f4\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vendor_types\` ADD CONSTRAINT \`FK_3d11cdcc3283f43dd9c22472358\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendor_types\` DROP FOREIGN KEY \`FK_3d11cdcc3283f43dd9c22472358\``);
        await queryRunner.query(`ALTER TABLE \`vendor_types\` DROP FOREIGN KEY \`FK_af76b4152a4948b5f87c7e282f4\``);
        await queryRunner.query(`ALTER TABLE \`vendor_types\` DROP FOREIGN KEY \`FK_727ba49e62b74ebb22818b97c76\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e9d50c91bd84f566ce0ac1acf44\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_52e97c477859f8019f3705abd21\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_51d635f1d983d505fb5a2f44c52\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_029a1f7036ce0dc47b043c93d09\``);
        await queryRunner.query(`ALTER TABLE \`user_logs\` DROP FOREIGN KEY \`FK_19023fdeef8e6797c7b0fa71573\``);
        await queryRunner.query(`ALTER TABLE \`user_logs\` DROP FOREIGN KEY \`FK_21c46c2b3ab66ef0773e5db3464\``);
        await queryRunner.query(`ALTER TABLE \`user_logs\` DROP FOREIGN KEY \`FK_2ce833fd6b70e5d2f686b977fd5\``);
        await queryRunner.query(`DROP TABLE \`vendor_types\``);
        await queryRunner.query(`DROP INDEX \`UNIQUE_user_email\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`UNIQUE_user_phone\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`user_logs\``);
        await queryRunner.query(`DROP TABLE \`configs\``);
    }

}
