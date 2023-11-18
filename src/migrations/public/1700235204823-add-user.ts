import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1700235204823 implements MigrationInterface {
  name = 'AddUser1700235204823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_user_id" integer, "last_modification_time" TIMESTAMP, "last_modifier_user_id" integer, "is_deleted" boolean NOT NULL DEFAULT false, "delete_user_id" integer, "delete_time" TIMESTAMP, "user_name" character varying NOT NULL, "tenant_id" integer, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email_confirmation_code" character varying, "password_reset_code" character varying, "lock_end_date_utc" TIMESTAMP, "access_fail_count" integer NOT NULL DEFAULT '0', "is_lockout_enabled" boolean NOT NULL DEFAULT false, "phone_number" character varying, "is_phone_number_confirmed" boolean NOT NULL DEFAULT false, "security_stamp" character varying, "is_two_factor_enabled" boolean NOT NULL DEFAULT false, "is_email_confirmed" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "normalize_user_name" character varying NOT NULL, "normalize_email" character varying NOT NULL, "concurrency_stamp" character varying, "profile_picture_id" integer, "should_change_password_next_login" boolean NOT NULL DEFAULT false, "sign_in_token_expire_time_utc" TIMESTAMP, "sign_in_token" text, "google_authenticator_key" text, "accept_review_promotion_email" boolean NOT NULL DEFAULT true, CONSTRAINT "REL_109638590074998bb72a2f2cf0" UNIQUE ("tenant_id"), CONSTRAINT "REL_fdb0081b8a032125282add5dfe" UNIQUE ("creator_user_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "UQ_4bfac0e777748308630e6af6ace" UNIQUE ("creator_user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "FK_4bfac0e777748308630e6af6ace" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_109638590074998bb72a2f2cf08" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_fdb0081b8a032125282add5dfee" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fdb0081b8a032125282add5dfee"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_109638590074998bb72a2f2cf08"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_4bfac0e777748308630e6af6ace"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "UQ_4bfac0e777748308630e6af6ace"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
