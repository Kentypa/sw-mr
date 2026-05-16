import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class ImageOrmEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() entityType!: string;
  @Column('uuid') entityId!: string;
  @Column() filename!: string;
  @Column() symlink!: string;
  @CreateDateColumn() createdAt!: Date;
}
