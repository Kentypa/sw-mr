import { Character } from './character.entity';
import { Planet } from './planet.entity';
import { Species } from './species.entity';
import { Starship } from './starship.entity';
import { Vehicle } from './vehicle.entity';

export class Film {
  constructor(
    public readonly id: string,
    public readonly swapiId: string,
    public readonly title: string,
    public readonly episodeId: number,
    public readonly openingCrawl: string,
    public readonly director: string,
    public readonly producer: string,
    public readonly releaseDate: string,
    public readonly characters: Character[],
    public readonly planets: Planet[],
    public readonly starships: Starship[],
    public readonly vehicles: Vehicle[],
    public readonly species: Species[],
  ) {}
}
