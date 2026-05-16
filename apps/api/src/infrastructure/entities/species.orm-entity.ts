import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacterOrmEntity } from './character.orm-entity';
import { FilmOrmEntity } from './film.orm-entity';
import { PlanetOrmEntity } from './planet.orm-entity';

@Entity('species')
export class SpeciesOrmEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) swapiId!: string;
  @Column() name!: string;
  @Column() classification!: string;
  @Column() designation!: string;
  @Column() averageHeight!: string;
  @Column() averageLifespan!: string;
  @Column() eyeColors!: string;
  @Column() hairColors!: string;
  @Column() skinColors!: string;
  @Column() language!: string;

  @ManyToOne(() => PlanetOrmEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'homeworld_id' })
  homeworld!: PlanetOrmEntity | null;

  @ManyToMany(() => FilmOrmEntity, (film) => film.species, {
    onDelete: 'CASCADE',
  })
  films!: FilmOrmEntity[];

  @ManyToMany(() => CharacterOrmEntity, (char) => char.species, {
    onDelete: 'CASCADE',
  })
  people!: CharacterOrmEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;
}
