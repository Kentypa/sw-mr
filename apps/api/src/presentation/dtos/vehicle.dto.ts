import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Vehicle } from '../../domain/entities/vehicle.entity';

export class CreateVehicleDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsString() @IsNotEmpty() model!: string;
  @ApiProperty() @IsString() @IsNotEmpty() vehicleClass!: string;
  @ApiProperty() @IsString() @IsNotEmpty() manufacturer!: string;
  @ApiProperty() @IsString() @IsNotEmpty() length!: string;
  @ApiProperty() @IsString() @IsNotEmpty() costInCredits!: string;
  @ApiProperty() @IsString() @IsNotEmpty() crew!: string;
  @ApiProperty() @IsString() @IsNotEmpty() passengers!: string;
  @ApiProperty() @IsString() @IsNotEmpty() maxAtmospheringSpeed!: string;
  @ApiProperty() @IsString() @IsNotEmpty() cargoCapacity!: string;
  @ApiProperty() @IsString() @IsNotEmpty() consumables!: string;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class VehicleResponseDto extends CreateVehicleDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() swapiId!: string;

  constructor(v: Vehicle) {
    super();
    this.id = v.id;
    this.swapiId = v.swapiId;
    this.name = v.name;
    this.model = v.model;
    this.vehicleClass = v.vehicleClass;
    this.manufacturer = v.manufacturer;
    this.length = v.length;
    this.costInCredits = v.costInCredits;
    this.crew = v.crew;
    this.passengers = v.passengers;
    this.maxAtmospheringSpeed = v.maxAtmospheringSpeed;
    this.cargoCapacity = v.cargoCapacity;
    this.consumables = v.consumables;
  }
}
