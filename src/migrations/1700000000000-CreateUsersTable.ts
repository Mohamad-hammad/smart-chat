import { MigrationInterface, QueryRunner, Table, Index } from "typeorm";

export class CreateUsersTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    // Create indexes
    await queryRunner.createIndex(
      "users",
      new Index("IDX_USERS_EMAIL", ["email"])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
