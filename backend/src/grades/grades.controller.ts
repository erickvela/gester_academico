import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../common/auth.types.js';
import { AccessTokenGuard } from '../common/access-token.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { CreateGradeDto, UpdateGradeDto } from './dto/grade.dto.js';
import { GradesService } from './grades.service.js';

@ApiTags('Calificaciones')
@ApiBearerAuth()
@Controller('grades')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles('ADMIN', 'TEACHER')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Get()
  @ApiOperation({ summary: 'Consultar calificaciones de un curso' })
  list(
    @Query('courseId', new ParseUUIDPipe()) courseId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.gradesService.list(courseId, request.user);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una calificación' })
  create(@Body() input: CreateGradeDto, @Req() request: AuthenticatedRequest) {
    return this.gradesService.create(input, request.user, request.ip);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una calificación' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateGradeDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.gradesService.update(id, input, request.user, request.ip);
  }
}
