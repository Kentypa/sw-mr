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

@Entity('vehicles')
export class VehicleOrmEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) swapiId!: string;
  @Column() name!: string;
  @Column() model!: string;
  @Column() vehicleClass!: string;
  @Column() manufacturer!: string;
  @Column() length!: string;
  @Column() costInCredits!: string;
  @Column() crew!: string;
  @Column() passengers!: string;
  @Column() maxAtmospheringSpeed!: string;
  @Column() cargoCapacity!: string;
  @Column() consumables!: string;

  @ManyToMany(() => FilmOrmEntity, (film) => film.vehicles, {
    onDelete: 'CASCADE',
  })
  films!: FilmOrmEntity[];

  @ManyToMany(() => CharacterOrmEntity, (char) => char.vehicles, {
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
