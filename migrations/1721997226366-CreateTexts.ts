import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTexts1721997226366 implements MigrationInterface {
    name = 'CreateTexts1721997226366';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "text" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" integer, CONSTRAINT "PK_ef734161ea7c326fedf699309f9" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "text" ADD CONSTRAINT "FK_04677d4ae91c83da4dae0211151" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "text" DROP CONSTRAINT "FK_04677d4ae91c83da4dae0211151"`,
        );
        await queryRunner.query(`DROP TABLE "text"`);
    }
}
