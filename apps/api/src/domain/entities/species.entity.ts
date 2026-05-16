import { Planet } from './planet.entity';

export class Species {
  constructor(
    public readonly id: string,
    public readonly swapiId: string,
    public readonly name: string,
    public readonly classification: string,
    public readonly designation: string,
    public readonly averageHeight: string,
    public readonly averageLifespan: string,
    public readonly eyeColors: string,
    public readonly hairColors: string,
    public readonly skinColors: string,
    public readonly language: string,
    public readonly homeworld: Planet | null,
  ) {}
}
