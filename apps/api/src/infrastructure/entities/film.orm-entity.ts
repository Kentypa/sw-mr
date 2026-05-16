import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacterOrmEntity } from './character.orm-entity';
import { PlanetOrmEntity } from './planet.orm-entity';
import { SpeciesOrmEntity } from './species.orm-entity';
import { StarshipOrmEntity } from './starship.orm-entity';
import { VehicleOrmEntity } from './vehicle.orm-entity';

@Entity('films')
export class FilmOrmEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) swapiId!: string;
  @Column() title!: string;
  @Column() episodeId!: number;
  @Column('text') openingCrawl!: string;
  @Column() director!: string;
  @Column() producer!: string;
  @Column('date') releaseDate!: string;

  @ManyToMany(() => CharacterOrmEntity, (char) => char.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_characters' })
  characters!: CharacterOrmEntity[];

  @ManyToMany(() => PlanetOrmEntity, (planet) => planet.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_planets' })
  planets!: PlanetOrmEntity[];

  @ManyToMany(() => StarshipOrmEntity, (ship) => ship.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_starships' })
  starships!: StarshipOrmEntity[];

  @ManyToMany(() => VehicleOrmEntity, (vehicle) => vehicle.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_vehicles' })
  vehicles!: VehicleOrmEntity[];

  @ManyToMany(() => SpeciesOrmEntity, (species) => species.films, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'films_species' })
  species!: SpeciesOrmEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;
}
