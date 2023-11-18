import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class AddTestTenant1700276059284 implements MigrationInterface {
  name = 'AddTestTenant1700276059284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

    await queryRunner.query(
      `CREATE TABLE ${schema}."tests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions;

    await queryRunner.query(`DROP TABLE  ${schema}."tests"`);
  }
}
