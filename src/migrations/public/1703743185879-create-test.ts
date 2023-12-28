import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTest1703743185879 implements MigrationInterface {
  name = 'CreateTest1703743185879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tests"`);
  }
}
