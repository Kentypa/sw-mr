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
import { PlanetUseCases } from '../../application/use-cases/planet.use-case.js';
import { PaginationDto } from '../dtos/pagination.dto.js';
import {
  CreatePlanetDto,
  PlanetResponseDto,
  UpdatePlanetDto,
} from '../dtos/planet.dto.js';

@ApiTags('Planets')
@Controller('planets')
export class PlanetController {
  constructor(private readonly useCases: PlanetUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create planet' })
  @ApiResponse({ status: 201, type: PlanetResponseDto })
  async create(@Body() dto: CreatePlanetDto): Promise<PlanetResponseDto> {
    const planet = await this.useCases.create(dto);
    return new PlanetResponseDto(planet);
  }

  @Get()
  @ApiOperation({ summary: 'Get all planets' })
  @ApiResponse({ status: 200, type: [PlanetResponseDto] })
  async findAll(@Query() query: PaginationDto): Promise<PlanetResponseDto[]> {
    const planets = await this.useCases.getAll(query);
    return planets.map((p) => new PlanetResponseDto(p));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get planet by ID' })
  @ApiResponse({ status: 200, type: PlanetResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PlanetResponseDto> {
    const planet = await this.useCases.getById(id);
    return new PlanetResponseDto(planet);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update planet' })
  @ApiResponse({ status: 200, type: PlanetResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePlanetDto,
  ): Promise<PlanetResponseDto> {
    const planet = await this.useCases.update(id, dto);
    return new PlanetResponseDto(planet);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete planet' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.useCases.delete(id);
  }
}
