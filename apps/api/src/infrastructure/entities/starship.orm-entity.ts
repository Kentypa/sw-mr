import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacterOrmEntity } from './character.orm-entity';
import { FilmOrmEntity } from './film.orm-entity';

@Entity('starships')
export class StarshipOrmEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) swapiId!: string;
  @Column() name!: string;
  @Column() model!: string;
  @Column() starshipClass!: string;
  @Column() manufacturer!: string;
  @Column() costInCredits!: string;
  @Column() length!: string;
  @Column() crew!: string;
  @Column() passengers!: string;
  @Column() maxAtmospheringSpeed!: string;
  @Column() hyperdriveRating!: string;
  @Column() mglt!: string;
  @Column() cargoCapacity!: string;
  @Column() consumables!: string;

  @ManyToMany(() => FilmOrmEntity, (film) => film.starships, {
    onDelete: 'CASCADE',
  })
  films!: FilmOrmEntity[];

  @ManyToMany(() => CharacterOrmEntity, (char) => char.starships, {
    onDelete: 'CASCADE',
  })
  pilots!: CharacterOrmEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt!: Date;
}
