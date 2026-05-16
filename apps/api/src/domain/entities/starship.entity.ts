export class Starship {
  constructor(
    public readonly id: string,
    public readonly swapiId: string,
    public readonly name: string,
    public readonly model: string,
    public readonly starshipClass: string,
    public readonly manufacturer: string,
    public readonly costInCredits: string,
    public readonly length: string,
    public readonly crew: string,
    public readonly passengers: string,
    public readonly maxAtmospheringSpeed: string,
    public readonly hyperdriveRating: string,
    public readonly mglt: string,
    public readonly cargoCapacity: string,
    public readonly consumables: string,
  ) {}
}
