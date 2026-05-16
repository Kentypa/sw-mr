import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleUseCases } from '../../application/use-cases/vehicle.use-case.js';
import { PaginationDto } from '../dtos/pagination.dto.js';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleResponseDto,
} from '../dtos/vehicle.dto.js';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly useCases: VehicleUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create vehicle' })
  @ApiResponse({ status: 201, type: VehicleResponseDto })
  async create(@Body() dto: CreateVehicleDto): Promise<VehicleResponseDto> {
    const vehicle = await this.useCases.create(dto);
    return new VehicleResponseDto(vehicle);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: 200, type: [VehicleResponseDto] })
  async findAll(@Query() query: PaginationDto): Promise<VehicleResponseDto[]> {
    const vehicles = await this.useCases.getAll(query);
    return vehicles.map((v) => new VehicleResponseDto(v));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  @ApiResponse({ status: 200, type: VehicleResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<VehicleResponseDto> {
    const vehicle = await this.useCases.getById(id);
    return new VehicleResponseDto(vehicle);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update vehicle' })
  @ApiResponse({ status: 200, type: VehicleResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateVehicleDto,
  ): Promise<VehicleResponseDto> {
    const vehicle = await this.useCases.update(id, dto);
    return new VehicleResponseDto(vehicle);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vehicle' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.useCases.delete(id);
  }
}
