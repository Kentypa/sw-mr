import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterUseCases } from '../../application/use-cases/character.use-case.js';
import { CharacterController } from '../../presentation/controllers/character.controller.js';
import { CharacterOrmEntity } from '../entities/character.orm-entity.js';
import { CharacterRepository } from '../repositories/character.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterOrmEntity])],
  controllers: [CharacterController],
  providers: [
    { provide: 'ICharacterRepository', useClass: CharacterRepository },
    {
      provide: CharacterUseCases,
      inject: ['ICharacterRepository'],
      useFactory: (repo) => new CharacterUseCases(repo),
    },
  ],
  exports: ['ICharacterRepository'],
})
export class CharacterModule {}
