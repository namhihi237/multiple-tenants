import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDbTable1700301926064 implements MigrationInterface {
  name = 'CreateDbTable1700301926064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "db_servers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "host" character varying NOT NULL, "port" integer NOT NULL, "user" character varying NOT NULL, "password" character varying NOT NULL, "db_name" character varying NOT NULL, "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8449a5ff179b536d60f648e1bac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "tenants" ADD "tenantDatabaseId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "UQ_ad7cf8f0648c047062cd1e73d05" UNIQUE ("tenantDatabaseId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "FK_ad7cf8f0648c047062cd1e73d05" FOREIGN KEY ("tenantDatabaseId") REFERENCES "db_servers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_ad7cf8f0648c047062cd1e73d05"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "UQ_ad7cf8f0648c047062cd1e73d05"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "tenantDatabaseId"`);
    await queryRunner.query(`DROP TABLE "db_servers"`);
  }
}
