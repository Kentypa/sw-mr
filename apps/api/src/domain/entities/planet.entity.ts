export class Planet {
  constructor(
    public readonly id: string,
    public readonly swapiId: string,
    public readonly name: string,
    public readonly diameter: string,
    public readonly rotationPeriod: string,
    public readonly orbitalPeriod: string,
    public readonly gravity: string,
    public readonly population: string,
    public readonly climate: string,
    public readonly terrain: string,
    public readonly surfaceWater: string,
  ) {}
}
