import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../common/auth.types.js';
import { AccessTokenGuard } from '../common/access-token.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto.js';
import { CoursesService } from './courses.service.js';

@ApiTags('Cursos')
@ApiBearerAuth()
@Controller('courses')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles('ADMIN', 'TEACHER')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Consultar cursos' })
  list(
    @Req() request: AuthenticatedRequest,
    @Query('offset') offset?: string,
    @Query('limit') limit?: string,
  ) {
    return this.coursesService.list(request.user, offset, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un curso' })
  create(@Body() input: CreateCourseDto, @Req() request: AuthenticatedRequest) {
    return this.coursesService.create(input, request.user, request.ip);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un curso' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateCourseDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.coursesService.update(id, input, request.user, request.ip);
  }
}
