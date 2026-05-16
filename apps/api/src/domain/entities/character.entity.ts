import { Planet } from './planet.entity';
import { Species } from './species.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';

export class Character {
  constructor(
    public readonly id: string,
    public readonly swapiId: string,
    public readonly name: string,
    public readonly birthYear: string,
    public readonly eyeColor: string,
    public readonly gender: string,
    public readonly hairColor: string,
    public readonly height: string,
    public readonly mass: string,
    public readonly skinColor: string,
    public readonly homeworld: Planet | null,
    public readonly species: Species[],
    public readonly starships: Starship[],
    public readonly vehicles: Vehicle[],
  ) {}
}
