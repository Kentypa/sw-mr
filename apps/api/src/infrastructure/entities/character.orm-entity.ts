import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilmOrmEntity } from './film.orm-entity';
import { PlanetOrmEntity } from './planet.orm-entity';
import { SpeciesOrmEntity } from './species.orm-entity';
import { StarshipOrmEntity } from './starship.orm-entity';
import { VehicleOrmEntity } from './vehicle.orm-entity';

@Entity('characters')
export class CharacterOrmEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) swapiId!: string;
  @Column() name!: string;
  @Column() birthYear!: string;
  @Column() eyeColor!: string;
  @Column() gender!: string;
  @Column() hairColor!: string;
  @Column() height!: string;
  @Column() mass!: string;
  @Column() skinColor!: string;

  @ManyToOne(() => PlanetOrmEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld!: PlanetOrmEntity | null;

  @ManyToMany(() => FilmOrmEntity, (film) => film.characters, {
    onDelete: 'CASCADE',
  })
  films!: FilmOrmEntity[];

  @ManyToMany(() => StarshipOrmEntity, (ship) => ship.pilots, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'characters_starships' })
  starships!: StarshipOrmEntity[];

  @ManyToMany(() => VehicleOrmEntity, (vehicle) => vehicle.pilots, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'characters_vehicles' })
  vehicles!: VehicleOrmEntity[];

  @ManyToMany(() => SpeciesOrmEntity, (species) => species.people, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'characters_species' })
  species!: SpeciesOrmEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;
}
