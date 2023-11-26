import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1700980697359 implements MigrationInterface {
  name = 'InitDb1700980697359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "db_servers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "host" character varying NOT NULL, "port" integer NOT NULL, "user" character varying NOT NULL, "password" character varying, "db_name" character varying NOT NULL, "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8449a5ff179b536d60f648e1bac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_user_id" integer, "last_modification_time" TIMESTAMP, "last_modifier_user_id" integer, "is_deleted" boolean NOT NULL DEFAULT false, "delete_time" TIMESTAMP, "tenancy_name" character varying NOT NULL, "name" character varying NOT NULL, "connection_string" character varying, "is_active" boolean NOT NULL DEFAULT true, "edition_id" integer, "subscription_end_date_utc" TIMESTAMP, "is_trial_period" boolean NOT NULL DEFAULT false, "subscription_payment_type" integer, "tenant_database_id" integer, "tenantDatabaseId" integer, CONSTRAINT "REL_ad7cf8f0648c047062cd1e73d0" UNIQUE ("tenantDatabaseId"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_user_id" integer, "last_modification_time" TIMESTAMP, "last_modifier_user_id" integer, "is_deleted" boolean NOT NULL DEFAULT false, "delete_user_id" integer, "delete_time" TIMESTAMP, "user_name" character varying NOT NULL, "tenant_id" integer, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email_confirmation_code" character varying, "password_reset_code" character varying, "lock_end_date_utc" TIMESTAMP, "access_fail_count" integer NOT NULL DEFAULT '0', "is_lockout_enabled" boolean NOT NULL DEFAULT false, "phone_number" character varying, "is_phone_number_confirmed" boolean NOT NULL DEFAULT false, "security_stamp" character varying, "is_two_factor_enabled" boolean NOT NULL DEFAULT false, "is_email_confirmed" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "normalize_user_name" character varying NOT NULL, "normalize_email" character varying NOT NULL, "concurrency_stamp" character varying, "profile_picture_id" integer, "should_change_password_next_login" boolean NOT NULL DEFAULT false, "sign_in_token_expire_time_utc" TIMESTAMP, "sign_in_token" text, "google_authenticator_key" text, "accept_review_promotion_email" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role_id" integer NOT NULL, "user_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_f10931e7bb05a3b434642ed2797" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "FK_4bfac0e777748308630e6af6ace" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "FK_ad7cf8f0648c047062cd1e73d05" FOREIGN KEY ("tenantDatabaseId") REFERENCES "db_servers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_109638590074998bb72a2f2cf08" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_8f3179ad19825945aee4b463b2b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_8f3179ad19825945aee4b463b2b"`);
    await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
    await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_109638590074998bb72a2f2cf08"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_ad7cf8f0648c047062cd1e73d05"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_4bfac0e777748308630e6af6ace"`);
    await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_f10931e7bb05a3b434642ed2797"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tenants"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "db_servers"`);
  }
}
