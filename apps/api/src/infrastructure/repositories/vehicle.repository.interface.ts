import { Vehicle } from '../../domain/entities/vehicle.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';

export interface IVehicleRepository {
  findAll(params: PaginationParams): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | null>;
  findBySwapiId(swapiId: string): Promise<Vehicle | null>;
  create(vehicle: Vehicle): Promise<Vehicle>;
  update(id: string, data: Partial<Vehicle>): Promise<Vehicle>;
  delete(id: string): Promise<void>;
  upsertBatch(vehicles: Vehicle[]): Promise<void>;
}
