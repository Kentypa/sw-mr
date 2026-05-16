import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleUseCases } from '../../application/use-cases/vehicle.use-case.js';
import { VehicleController } from '../../presentation/controllers/vehicle.controller.js';
import { VehicleOrmEntity } from '../entities/vehicle.orm-entity.js';
import { VehicleRepository } from '../repositories/vehicle.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleOrmEntity])],
  controllers: [VehicleController],
  providers: [
    { provide: 'IVehicleRepository', useClass: VehicleRepository },
    {
      provide: VehicleUseCases,
      inject: ['IVehicleRepository'],
      useFactory: (repo) => new VehicleUseCases(repo),
    },
  ],
  exports: ['IVehicleRepository'],
})
export class VehicleModule {}
