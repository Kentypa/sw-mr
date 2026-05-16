import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778919559887 implements MigrationInterface {
    name = 'Init1778919559887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_f7e93a1974cc86fd87ce6777319"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_91fc27446e66aadf01721cc0da8"`);
        await queryRunner.query(`ALTER TABLE "films_characters" DROP CONSTRAINT "FK_aab95cc3bdd164b4d2c95b7e9d0"`);
        await queryRunner.query(`ALTER TABLE "films_planets" DROP CONSTRAINT "FK_56eec3c43f5246c6a26f4e61d81"`);
        await queryRunner.query(`ALTER TABLE "films_starships" DROP CONSTRAINT "FK_98904c9cab6a9c3c11aeacf768b"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" DROP CONSTRAINT "FK_4465b1c1a89520616f3c6ccad73"`);
        await queryRunner.query(`ALTER TABLE "films_species" DROP CONSTRAINT "FK_b5b68c8f3779bcdaa9afda0378e"`);
        await queryRunner.query(`ALTER TABLE "characters_starships" DROP CONSTRAINT "FK_a2fa3f2050b847e2f0f42ac1fb1"`);
        await queryRunner.query(`ALTER TABLE "characters_vehicles" DROP CONSTRAINT "FK_422ca902043af1d215fae69b204"`);
        await queryRunner.query(`ALTER TABLE "characters_species" DROP CONSTRAINT "FK_a8bd10be950b26aa885088e1656"`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_f7e93a1974cc86fd87ce6777319" FOREIGN KEY ("homeworld_id") REFERENCES "planets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_91fc27446e66aadf01721cc0da8" FOREIGN KEY ("homeworld_id") REFERENCES "planets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_characters" ADD CONSTRAINT "FK_aab95cc3bdd164b4d2c95b7e9d0" FOREIGN KEY ("charactersId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_planets" ADD CONSTRAINT "FK_56eec3c43f5246c6a26f4e61d81" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_starships" ADD CONSTRAINT "FK_98904c9cab6a9c3c11aeacf768b" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" ADD CONSTRAINT "FK_4465b1c1a89520616f3c6ccad73" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_species" ADD CONSTRAINT "FK_b5b68c8f3779bcdaa9afda0378e" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters_starships" ADD CONSTRAINT "FK_a2fa3f2050b847e2f0f42ac1fb1" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters_vehicles" ADD CONSTRAINT "FK_422ca902043af1d215fae69b204" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters_species" ADD CONSTRAINT "FK_a8bd10be950b26aa885088e1656" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters_species" DROP CONSTRAINT "FK_a8bd10be950b26aa885088e1656"`);
        await queryRunner.query(`ALTER TABLE "characters_vehicles" DROP CONSTRAINT "FK_422ca902043af1d215fae69b204"`);
        await queryRunner.query(`ALTER TABLE "characters_starships" DROP CONSTRAINT "FK_a2fa3f2050b847e2f0f42ac1fb1"`);
        await queryRunner.query(`ALTER TABLE "films_species" DROP CONSTRAINT "FK_b5b68c8f3779bcdaa9afda0378e"`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" DROP CONSTRAINT "FK_4465b1c1a89520616f3c6ccad73"`);
        await queryRunner.query(`ALTER TABLE "films_starships" DROP CONSTRAINT "FK_98904c9cab6a9c3c11aeacf768b"`);
        await queryRunner.query(`ALTER TABLE "films_planets" DROP CONSTRAINT "FK_56eec3c43f5246c6a26f4e61d81"`);
        await queryRunner.query(`ALTER TABLE "films_characters" DROP CONSTRAINT "FK_aab95cc3bdd164b4d2c95b7e9d0"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_91fc27446e66aadf01721cc0da8"`);
        await queryRunner.query(`ALTER TABLE "species" DROP CONSTRAINT "FK_f7e93a1974cc86fd87ce6777319"`);
        await queryRunner.query(`ALTER TABLE "characters_species" ADD CONSTRAINT "FK_a8bd10be950b26aa885088e1656" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters_vehicles" ADD CONSTRAINT "FK_422ca902043af1d215fae69b204" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters_starships" ADD CONSTRAINT "FK_a2fa3f2050b847e2f0f42ac1fb1" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_species" ADD CONSTRAINT "FK_b5b68c8f3779bcdaa9afda0378e" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_vehicles" ADD CONSTRAINT "FK_4465b1c1a89520616f3c6ccad73" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_starships" ADD CONSTRAINT "FK_98904c9cab6a9c3c11aeacf768b" FOREIGN KEY ("starshipsId") REFERENCES "starships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_planets" ADD CONSTRAINT "FK_56eec3c43f5246c6a26f4e61d81" FOREIGN KEY ("planetsId") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_characters" ADD CONSTRAINT "FK_aab95cc3bdd164b4d2c95b7e9d0" FOREIGN KEY ("charactersId") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_91fc27446e66aadf01721cc0da8" FOREIGN KEY ("homeworld_id") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "species" ADD CONSTRAINT "FK_f7e93a1974cc86fd87ce6777319" FOREIGN KEY ("homeworld_id") REFERENCES "planets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
