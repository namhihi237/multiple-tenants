import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenant1700227471274 implements MigrationInterface {
  name = 'AddTenant1700227471274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_user_id" integer, "last_modification_time" TIMESTAMP, "last_modifier_user_id" integer, "is_delete" boolean NOT NULL DEFAULT false, "delete_time" TIMESTAMP, "tenancy_name" character varying NOT NULL, "name" character varying NOT NULL, "connection_string" character varying, "is_active" boolean NOT NULL DEFAULT true, "edition_id" integer, "subscription_end_date_utc" TIMESTAMP, "is_trial_period" boolean NOT NULL DEFAULT false, "subscription_payment_type" integer, "tenant_database_id" integer, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tenants"`);
  }
}
