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
import { CharacterUseCases } from '../../application/use-cases/character.use-case';
import {
  CharacterResponseDto,
  CreateCharacterDto,
  UpdateCharacterDto,
} from '../dtos/character.dto';
import { PaginationDto } from '../dtos/pagination.dto';

@ApiTags('Characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly useCases: CharacterUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create character' })
  @ApiResponse({ status: 201, type: CharacterResponseDto })
  async create(@Body() dto: CreateCharacterDto): Promise<CharacterResponseDto> {
    const character = await this.useCases.create(dto);
    return new CharacterResponseDto(character);
  }

  @Get()
  @ApiOperation({ summary: 'Get all characters' })
  @ApiResponse({ status: 200, type: [CharacterResponseDto] })
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<CharacterResponseDto[]> {
    const characters = await this.useCases.getAll(query);
    return characters.map((c) => new CharacterResponseDto(c));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get character by ID' })
  @ApiResponse({ status: 200, type: CharacterResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CharacterResponseDto> {
    const character = await this.useCases.getById(id);
    return new CharacterResponseDto(character);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update character' })
  @ApiResponse({ status: 200, type: CharacterResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCharacterDto,
  ): Promise<CharacterResponseDto> {
    const character = await this.useCases.update(id, dto);
    return new CharacterResponseDto(character);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete character' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.useCases.delete(id);
  }
}
