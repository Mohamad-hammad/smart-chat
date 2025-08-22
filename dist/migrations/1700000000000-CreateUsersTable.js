"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1700000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1700000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "firstName",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "lastName",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "isEmailVerified",
                    type: "boolean",
                    default: false,
                    isNullable: false,
                },
                {
                    name: "emailVerificationToken",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "passwordResetToken",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "passwordResetExpires",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "role",
                    type: "varchar",
                    default: "'user'",
                    isNullable: false,
                },
                {
                    name: "isActive",
                    type: "boolean",
                    default: true,
                    isNullable: false,
                },
                {
                    name: "lastLoginAt",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
            ],
        }), true);
        // Create indexes
        await queryRunner.createIndex("users", new typeorm_1.Index("IDX_USERS_EMAIL", ["email"]));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.CreateUsersTable1700000000000 = CreateUsersTable1700000000000;
