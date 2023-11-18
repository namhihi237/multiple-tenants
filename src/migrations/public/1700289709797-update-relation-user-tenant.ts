import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationUserTenant1700289709797 implements MigrationInterface {
  name = 'UpdateRelationUserTenant1700289709797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_109638590074998bb72a2f2cf08"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fdb0081b8a032125282add5dfee"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_fdb0081b8a032125282add5dfe"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_109638590074998bb72a2f2cf0"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_4bfac0e777748308630e6af6ace"`);
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "UQ_4bfac0e777748308630e6af6ace"`);
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "FK_4bfac0e777748308630e6af6ace" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_4bfac0e777748308630e6af6ace"`);
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "UQ_4bfac0e777748308630e6af6ace" UNIQUE ("creator_user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tenants" ADD CONSTRAINT "FK_4bfac0e777748308630e6af6ace" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_109638590074998bb72a2f2cf0" UNIQUE ("tenant_id")`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "REL_fdb0081b8a032125282add5dfe" UNIQUE ("creator_user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_fdb0081b8a032125282add5dfee" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_109638590074998bb72a2f2cf08" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
