import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacterOrmEntity } from './character.orm-entity';
import { FilmOrmEntity } from './film.orm-entity';

@Entity('planets')
export class PlanetOrmEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) swapiId!: string;
  @Column() name!: string;
  @Column() diameter!: string;
  @Column() rotationPeriod!: string;
  @Column() orbitalPeriod!: string;
  @Column() gravity!: string;
  @Column() population!: string;
  @Column() climate!: string;
  @Column() terrain!: string;
  @Column() surfaceWater!: string;

  @OneToMany(() => CharacterOrmEntity, (char) => char.homeworld, {
    onDelete: 'CASCADE',
  })
  residents!: CharacterOrmEntity[];

  @ManyToMany(() => FilmOrmEntity, (film) => film.planets, {
    onDelete: 'CASCADE',
  })
  films!: FilmOrmEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;
}
