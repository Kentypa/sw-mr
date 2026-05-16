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
import { StarshipUseCases } from '../../application/use-cases/starship.use-case.js';
import { PaginationDto } from '../dtos/pagination.dto.js';
import {
  CreateStarshipDto,
  StarshipResponseDto,
  UpdateStarshipDto,
} from '../dtos/starship.dto.js';

@ApiTags('Starships')
@Controller('starships')
export class StarshipController {
  constructor(private readonly useCases: StarshipUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create starship' })
  @ApiResponse({ status: 201, type: StarshipResponseDto })
  async create(@Body() dto: CreateStarshipDto): Promise<StarshipResponseDto> {
    const starship = await this.useCases.create(dto);
    return new StarshipResponseDto(starship);
  }

  @Get()
  @ApiOperation({ summary: 'Get all starships' })
  @ApiResponse({ status: 200, type: [StarshipResponseDto] })
  async findAll(@Query() query: PaginationDto): Promise<StarshipResponseDto[]> {
    const starships = await this.useCases.getAll(query);
    return starships.map((s) => new StarshipResponseDto(s));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get starship by ID' })
  @ApiResponse({ status: 200, type: StarshipResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<StarshipResponseDto> {
    const starship = await this.useCases.getById(id);
    return new StarshipResponseDto(starship);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update starship' })
  @ApiResponse({ status: 200, type: StarshipResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStarshipDto,
  ): Promise<StarshipResponseDto> {
    const starship = await this.useCases.update(id, dto);
    return new StarshipResponseDto(starship);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete starship' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.useCases.delete(id);
  }
}
