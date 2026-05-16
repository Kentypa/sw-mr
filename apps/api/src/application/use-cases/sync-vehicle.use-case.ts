import { AxiosInstance } from 'axios';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { IVehicleRepository } from '../../infrastructure/repositories/vehicle.repository.interface';
import { SwapiResponse } from '../contracts/swapi-response.interface';
import { SwapiVehicle } from '../contracts/swapi-vehicle.interface';

export class SyncVehiclesUseCase {
  constructor(
    private readonly repo: IVehicleRepository,
    private readonly http: AxiosInstance,
  ) {}

  async execute(): Promise<void> {
    let url: string | null = 'https://swapi.dev/api/vehicles/';
    while (url) {
      const { data }: { data: SwapiResponse<SwapiVehicle> } =
        await this.http.get(url);
      const vehicles = data.results.map(
        (v) =>
          new Vehicle(
            crypto.randomUUID(),
            v.url,
            v.name,
            v.model,
            v.vehicle_class,
            v.manufacturer,
            v.length,
            v.cost_in_credits,
            v.crew,
            v.passengers,
            v.max_atmosphering_speed,
            v.cargo_capacity,
            v.consumables,
          ),
      );
      await this.repo.upsertBatch(vehicles);
      url = data.next;
    }
  }
}
