import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';

export class SeedHost1700295234923 implements MigrationInterface {
  name = 'SeedHost1700295234923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashPassword = await hash(process.env.HOST_ACCOUNT_PASSWORD || 'admin123!@#', 10);

    await queryRunner.query(
      `
    INSERT INTO "users" (user_name, password, email, name, surname, normalize_user_name, normalize_email)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `,
      [
        process.env.HOST_USERNAME,
        hashPassword,
        'host@example.com',
        'host user',
        'host admin',
        'host_user',
        'normalize_email',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
    DELETE FROM "users"
    WHERE username = $1
  `,
      [process.env.HOST_USERNAME],
    );
  }
}
